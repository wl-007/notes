# MySQL、SQLAlchemy 与异步会话

对应提交：`94140a9`（2026-10-14，连接 MySQL）。

```text
FastAPI 路由
  → AsyncSession：当前请求的工作单元
  → AsyncEngine / 连接池
  → asyncmy：异步 MySQL 驱动
  → MySQL：执行 SQL、约束和事务
```

SQLAlchemy 不是数据库，asyncmy 也不是连接池的业务替代品。先区分这几层，才能理解为什么异步函数里仍需要事务。

## 异步数据库访问解决什么问题

请求等待网络和数据库 I/O 时，事件循环可以调度其他协程。它不会让单条慢 SQL 自动变快，也不会减少数据库需要执行的查询次数。

索引、执行计划、分页方式、锁竞争仍决定数据库效率。在异步路由里使用同步驱动，也不会因为外面写了 `async def` 就自动避免阻塞。

## 连接地址与连接池

项目连接地址形态：

```text
mysql+asyncmy://user:password@127.0.0.1:3306/fastapi_template?charset=utf8mb4
```

密码中的 `@`、`#` 等需要 URL 转义，项目使用 `quote_plus()`。也可以用 SQLAlchemy 的结构化 URL API 构造地址，避免手工拼接。不要把包含凭据的完整 URI 写到日志。

`database.py` 在进程内创建一个引擎：

```python
async_engine = create_async_engine(
    url=settings.ASYNC_DB_URI,
    echo=settings.DATABASE_ECHO,
    pool_pre_ping=settings.POOL_PRE_PING,
    pool_recycle=settings.POOL_RECYCLE,
    pool_size=settings.POOL_SIZE,
    max_overflow=settings.MAX_OVERFLOW,
    pool_timeout=settings.POOL_TIMEOUT,
)
```

| 参数 | 项目默认值 | 含义 |
| --- | --- | --- |
| `pool_size` | 10 | 池可保留的常规连接容量，不会启动时立刻建立全部连接 |
| `max_overflow` | 20 | 高峰期允许额外创建的连接 |
| `pool_timeout` | 30 秒 | 连接耗尽时等待可用连接的上限 |
| `pool_recycle` | 1800 秒 | 连接借出时，超龄连接被替换 |
| `pool_pre_ping` | True | 借出前检测连接是否存活 |

一个进程最多可能占用约 `pool_size + max_overflow` 个池连接；增加 worker 会增加总量，需要结合 MySQL 连接数预算。探活不能挽救已经执行到一半的事务；断线后是否重试要考虑幂等性，不能无条件重放写操作。

## 会话工厂与请求会话

```python
async_db_session = async_sessionmaker(
    bind=async_engine,
    class_=AsyncSession,
    autoflush=False,
    expire_on_commit=False,
)
```

- Engine 和连接池通常进程级共享。
- 每次调用会话工厂创建独立 Session，用于一组相关数据库操作。
- Session 可以延迟到真正执行 SQL 时才借连接，不等于每次创建对象都会立即联网。
- `autoflush=False` 关闭部分自动刷新行为，CRUD 因而显式 `flush()`。
- `expire_on_commit=False` 避免提交后自动过期已加载属性；它不保证对象始终反映数据库最新状态。

AsyncSession 是有状态的事务对象，同一实例不要同时给多个并发任务使用。

## add、flush、refresh、commit 的区别

| 操作 | 做什么 | 是否已经提交事务 |
| --- | --- | --- |
| `session.add(obj)` | 将对象纳入会话管理 | 否 |
| `await session.flush()` | 将待处理变化发到数据库，可获得自增 ID并触发约束检查 | 否 |
| `await session.refresh(obj)` | 重新查询指定对象属性 | 否 |
| `await session.commit()` | 提交事务，通常先执行必要的 flush | 是 |
| `await session.rollback()` | 回滚当前事务 | 否 |

拿到 ID 不代表新增已经永久生效。`flush()` 之后出现异常，事务仍可以回滚。

当前项目用依赖统一控制事务：

```python
async def db_getter():
    async with async_db_session() as session:
        async with session.begin():
            yield session
```

正常退出事务上下文时提交，异常退出时回滚。CRUD 只负责 `flush/refresh`，不自行提交。块内手动 `commit/rollback` 会提前结束事务，之后再执行 SQL 可能报“closed transaction inside context manager”。

### 提交发生在响应之前还是之后

项目 `DbSession = Annotated[AsyncSession, Depends(db_getter)]` 使用默认 request scope。在当前 FastAPI 版本的语义下，依赖退出在响应发送之后，因此也可能在这时才提交。

这意味着提交阶段失败不一定还能改成客户端可见的错误响应。需要“成功响应前确认提交”时，应设计 function scope 等事务边界，例如评估：

```python
# 后续改造的候选写法；当前源码尚未采用。
DbSession = Annotated[
    AsyncSession,
    Depends(db_getter, scope="function"),
]
```

调整时还要检查子依赖 scope、输出模型转换和流式响应是否依赖会话。不能只改一个参数就假设所有链路都已正确。

## 事务、约束和并发

事务将一组操作作为整体；唯一约束等由数据库最终执行。先查用户名再插入仍存在并发窗口，系统用户模块在数据库唯一索引之外还捕获 `IntegrityError`，将冲突转成 409。

InnoDB 的事务隔离和锁会影响并发读取与写入。常见隔离级别包括 READ COMMITTED、REPEATABLE READ 等；应用要明确部署实例的实际配置，不能用“用了 ORM”推断隔离级别。

分页中的 `count` 与 `list` 是两条 SQL，不天然等于整个业务期间数据不变。更新涉及库存、余额等条件时，还需要锁、条件更新或版本号等并发控制设计。

## 服务退出后数据在哪里

FastAPI 进程退出会丢失进程内对象和连接池，不会主动删除 MySQL 中已经提交的数据。MySQL 自身的崩溃恢复由数据库处理。

InnoDB 使用 redo 等机制恢复已记录的修改，undo 支持回滚和多版本读取；binlog 主要用于复制和时间点恢复，不能把它与 redo 当成同一种日志。持久性还与刷盘策略、磁盘和存储可靠性有关，不是 Python 的 `await` 提供的保证。

客户端在提交附近断线时，可能不知道事务是否已经提交。重试写接口要考虑唯一业务键或幂等令牌，而不是简单再次创建一份数据。

## ORM 基类与时间默认值

项目用 `MappedBase(AsyncAttrs, DeclarativeBase)` 汇总 metadata，`ModelMixin` 提供：

```text
id / created_at / updated_at / is_deleted
```

`Mapped[T]` 描述映射属性类型，`mapped_column()` 描述表字段。`server_default=func.now()` 是服务端默认值；`default=False` 是 SQLAlchemy 插入时的客户端默认行为，直接执行 SQL 时不会自动采用它。

`onupdate=func.now()` 参与 SQLAlchemy 发出的更新，不等同于数据库已经创建通用触发器。手写 SQL 建表时，要自行设计 `DEFAULT` 和 `ON UPDATE`，不能把 Python 模型注释当作数据库保证。

## 本地准备与排查

当前没有启动自动建表，也没有仓库内 Compose 文件。先准备数据库：

```sql
CREATE DATABASE IF NOT EXISTS fastapi_template
  DEFAULT CHARACTER SET utf8mb4;
```

表结构需按模型和迁移策略准备，见下一篇。连接失败优先检查服务地址、端口、账号权限、库是否存在；表不存在与连接失败是不同问题。

`SQL_DB_ENABLE` 当前主要用于关闭时是否释放连接池，不是整个数据库模块的总开关：引擎仍在导入时创建，用户路由仍注入会话，不能认为设为 False 后数据库接口会自动使用内存。

源码：`backend/app/core/database.py`、`backend/app/core/dependencies.py`、`backend/app/core/base_model.py`、`backend/app/config/setting.py`。

参考：[SQLAlchemy AsyncIO](https://docs.sqlalchemy.org/en/21/orm/extensions/asyncio.html)、[Session 基础](https://docs.sqlalchemy.org/en/21/orm/session_basics.html)、[连接池](https://docs.sqlalchemy.org/en/21/core/pooling.html)、[InnoDB 事务模型](https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-model.html)、[InnoDB redo](https://dev.mysql.com/doc/refman/8.4/en/innodb-redo-log.html)。
