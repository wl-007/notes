# 用户 CRUD、Schema 与业务分层

对应提交：`94140a9`（2026-10-14，连接 MySQL）。系统用户模块于 `7101210` 引入，后续抽取基础 CRUD。

当前学习模块的调用链：

```text
POST /apiCommon/test/user
  → UserCreateSchema：验证 JSON
  → Controller：取得 DbSession
  → UserService.create_user：检查用户名
  → UserCRUD.create：写入 test_user
  → UserOutSchema：转换 ORM，不输出密码
  → ResponseSchema：包装响应
```

::: warning 示例模块的用途
`test/user` 用于学习分层，密码存明文、接口未接账号认证，不应作为实际账号系统复用。系统账号采用 `sys/user` 的 bcrypt 和 JWT 流程，见下一组章节。
:::

## 五种文件各管什么

| 文件 | 职责 | 不宜承担的内容 |
| --- | --- | --- |
| `controller.py` | 路径、方法、入参、依赖、响应模型 | 复杂 SQL 和重复业务规则 |
| `schema.py` | 输入、查询、输出数据契约 | 数据库会话和权限判断 |
| `service.py` | 业务校验、权限和操作编排 | HTTP 请求细节的到处传递 |
| `crud.py` | SQL 表达式、对象读写 | 决定 HTTP 状态或擅自提交共享事务 |
| `model.py` | 表、列、索引、约束 | 面向客户端的敏感字段过滤 |

分层的目的在于稳定职责，不是每个函数必须多包一层。Schema 可以让 API 保持稳定，即使数据库字段名或表结构发生变化。

## 创建用户

Controller 的核心：

```python
@UserRouter.post("", response_model=ResponseSchema[UserOutSchema])
async def create_user(db: DbSession, data: UserCreateSchema):
    user = await UserService.create_user(db, data)
    return SuccessResponse(data=user)
```

CRUD 中：

```python
obj = UserModel(**data.model_dump())
self.db.add(obj)
await self.db.flush()
await self.db.refresh(obj)
return obj
```

`flush()` 取得自增字段，事务由依赖提交。Service 检查重复用户名，但教学模块没有像系统用户一样捕获并发插入的唯一约束冲突。

## 分页、筛选与排序

```bash
curl -G "http://127.0.0.1:8801/apiCommon/test/user" \
  --data-urlencode "page_no=1" \
  --data-urlencode "page_size=10" \
  --data-urlencode "username=alice" \
  --data-urlencode "order_by=id:desc"
```

需要已准备好 `test_user` 表。返回结构：

```json
{"code": 1, "msg": "成功", "data": {"total": 0, "items": []}}
```

`total` 是过滤后的总数，`items` 是当前页。SQL 使用 `offset` 和 `limit`，不是先把所有记录读到 Python 再切片。

OFFSET 分页便于直接跳页，但页码很大时可能变慢；数据不断变化时还可能发生重复或遗漏。大数据量场景可以考虑基于稳定排序键的游标分页，项目当前没有实现。

系统用户通过显式列白名单构造排序表达式；教学模块使用 `getattr(UserModel, field, None)`，约束较弱。不要把用户输入直接拼成 SQL `ORDER BY`。

## 更新：没传与 null 是两种意图

教学模块使用：

```python
changes = data.model_dump(exclude_unset=True)
for key, value in changes.items():
    setattr(obj, key, value)
```

| 请求内容 | 含义 |
| --- | --- |
| `{}` | 不更新任何字段 |
| `{"full_name":"Alice"}` | 更新姓名 |
| `{"full_name":null}` | 显式清空可空姓名 |

字段允许 `None`，并不代表对应数据库列也允许 NULL。比如教学更新 Schema 的 `password` 可空，但数据库密码列非空；显式传 null 会暴露契约不一致。实际实现应对非空字段拒绝 null，或明确忽略策略。

系统用户采用“值不是 None 才更新”的另一种语义，不能把两种更新方式当成完全一致。当前路由用 PUT 承载部分更新；设计新 API 时也可以评估用 PATCH 更直接地表达部分修改。

## 删除：物理删除与软删除

教学模块执行 `await session.delete(obj)`，真正删除记录；即使继承的模型有 `is_deleted` 字段，这条路径也不会自动变成软删除。

系统用户基础 CRUD 则设置 `is_deleted=True`，并在读取时统一过滤。软删除有利于保留记录，但会影响唯一约束、查询条件、数据保留和后续清理，不是“加一个布尔字段”就全部完成。

`Session.get()` 可以利用当前会话的身份映射：相同主键的对象通常对应同一个 Python 实例。它不是跨请求缓存，也不应与 Redis 命中混淆。

## ORM、DTO 与序列化

ORM 对象包含持久化状态和数据库字段，输出 Schema 只表达 API 契约。当前 `UserOutSchema` 用 `from_attributes=True` 读取属性，不包含密码。

异步 ORM 访问未加载关系时可能需要 I/O，序列化器不能自动等待所有属性；涉及关联关系时，应显式选择预加载或单独查询，避免隐式加载、N+1 查询和会话关闭后的访问错误。

源码：`backend/app/api/test/user/` 下的五个文件。

参考：[SQLAlchemy ORM 查询](https://docs.sqlalchemy.org/en/21/orm/queryguide/select.html)、[Pydantic 序列化](https://docs.pydantic.dev/latest/concepts/serialization/)。
