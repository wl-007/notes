# 基础 CRUD、软删除与字段白名单

对应提交：`54bbec8`（2026-11-03，新增基础 CRUD）。

之前系统用户的增删改查重复处理了查询、刷新和删除。这个提交把通用数据库操作放进 `CRUDBase[ModelType]`，用户模块保留业务特有的条件与排序。

```python
class UserCRUD(CRUDBase[UserModel]):
    def __init__(self, db: AsyncSession) -> None:
        super().__init__(model=UserModel, db=db)
```

泛型帮助编辑器追踪模型类型；真正执行的仍是 SQLAlchemy 查询，不是 Python 运行时自动生成所有业务能力。

## 哪些能力适合复用

| 基础方法 | 作用 |
| --- | --- |
| `get_one(*conditions)` | 按条件查询第一条可见记录 |
| `get_by_id(model_id)` | 按主键查询 |
| `count(*conditions)` | 统计可见记录数 |
| `list(offset, limit, conditions, order_by)` | 分页查询 |
| `create(**values)` | 创建、flush、refresh |
| `update(obj, changes)` | 校验字段、赋值、flush、refresh |
| `delete(obj)` | 有软删除字段则标记，否则物理删除 |

基础类共享请求级 Session，不负责 commit。用户名唯一性、密码哈希、本人权限和缓存失效仍在 Service。

## 把软删除过滤收敛到一个位置

```python
def _visible_conditions(self):
    deleted = getattr(self.model, "is_deleted", None)
    return (deleted.is_(False),) if deleted is not None else ()
```

读取时先添加统一过滤条件，再拼接业务条件：

```python
stmt = select(self.model).where(
    *self._visible_conditions(), *conditions
)
```

因此系统用户删除后，普通列表、详情、用户名查询和认证都会忽略它。直接绕过基础类执行 SQL，仍需要自行添加条件；这个方法不是数据库行级权限，也不是全局 ORM 拦截器。

软删除记录仍占用表内唯一索引，所以删掉 `alice` 后重新注册同名账号，仍可能触发用户名冲突。恢复账号、彻底清理和用户名复用需要另行设计，当前没有实现。

## 更新字段为什么还要校验

`update()` 从 mapper 取得映射列，并排除主键、`is_deleted`、`created_at`、`updated_at`。未知或受保护字段会抛出 `ValueError`。

这种校验防止把任意键盲目赋给 ORM 对象，但它不是完整的业务字段白名单：模型中其他映射列可能仍在允许集合里。

当前 Service 只构造 `nickname` 和哈希后的 `password_hash`，Controller 又使用输入 Schema；这几层共同约束更新范围。不要为了方便把整个客户端字典直接送进通用 CRUD。

## 系统用户特有的筛选与排序

```python
SORT_COLUMNS = {
    "id": UserModel.id,
    "username": UserModel.username,
    "nickname": UserModel.nickname,
    "created_at": UserModel.created_at,
    "updated_at": UserModel.updated_at,
}
```

排序字段从白名单取 SQLAlchemy 列，再调用 `asc()/desc()`。无效字段被忽略，没有有效排序时回退到 ID 降序。

搜索使用 `contains(value, autoescape=True)`，将输入中的 `%`、`_` 按字面匹配处理。使用参数绑定避免 SQL 注入，与“是否把通配符当作普通字符”是两个不同问题。

## 什么时候不要继续抽象

复杂关联查询、批量写入、聚合统计和锁定读取，通常需要专门方法。基础类可以减少重复操作，但不应变成一个接收任意字符串、条件、权限和业务规则的万能接口。

当前 `test/user` 没有改成继承基础类，仍保留教学版 CRUD。阅读时应分别看待：

```bash
git diff 7101210 54bbec8 -- backend/app/api/sys/user/crud.py
git show 54bbec8 -- backend/app/core/base_crud.py
```

源码：`backend/app/core/base_crud.py`、`backend/app/api/sys/user/crud.py`、`backend/app/api/sys/user/service.py`。

参考：[SQLAlchemy ORM 持久化](https://docs.sqlalchemy.org/en/21/orm/session_basics.html#adding-new-or-existing-items)、[映射检查 API](https://docs.sqlalchemy.org/en/21/orm/mapping_styles.html#runtime-introspection-of-mapped-classes-instances-and-mappers)。
