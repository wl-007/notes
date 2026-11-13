# Alembic、元数据与数据库迁移

对应提交：`94140a9`（2026-10-14，连接 MySQL）。

修改 `model.py` 不会自动修改已有 MySQL 表。迁移用于把模型变化转换成可审核、可追踪的数据库结构变更。

::: warning 当前项目状态
`backend/app/alembic/env.py` 默认直接退出，要求显式设置 `ALEMBIC_ENABLED=true` 才继续。当前提交中的 `versions/` 只有 `.gitkeep`，没有已提交迁移。因此不能把“有迁移命令”理解为已经存在可应用的建表脚本。
:::

## 三个对象分别记录什么

| 对象 | 描述 |
| --- | --- |
| ORM metadata | Python 模型声明的目标表结构 |
| 迁移脚本 | 从一个版本变成下一个版本的操作 |
| 数据库 `alembic_version` | 目标数据库已应用到哪个迁移版本 |

`revision --autogenerate` 比较数据库结构和 metadata，生成候选脚本；`upgrade` 执行脚本。生成与执行是两个动作，前者也通常需要访问数据库。

`create_all()` 适合按 metadata 创建缺失表，不负责完整地演进已有表结构。它不能代替有版本的迁移。

## 项目的迁移入口

```text
backend/
  main.py                  # revision / upgrade 命令
  alembic.ini
  app/alembic/
    env.py                 # 加载环境、metadata 和数据库连接
    script.py.mako         # 脚本模板
    versions/              # 迁移文件
```

Typer 命令先调用 `load_settings(env)`，再构造 Alembic Config，并用绝对路径设置 `script_location`。这样不会因为终端切换目录就找错迁移目录。

`env.py` 的关键步骤：

1. 检查是否允许执行 Alembic。
2. 检查 `ENVIRONMENT`，决定读取哪个 dotenv。
3. 扫描并导入 ORM 模型。
4. 设置 `target_metadata = MappedBase.metadata`。
5. 注入配置中的异步连接地址。
6. 使用异步连接的 `run_sync()` 执行 Alembic 同步迁移逻辑。

`run_sync()` 是 SQLAlchemy 提供的适配入口，不能用任意同步阻塞 I/O 替换它。

## 模型发现为什么需要 import

声明式类在模块执行后才会注册到 metadata。目录里有一个 `model.py` 文件，并不代表 Alembic 已经知道里面的表。

项目 `ImportUtil.find_models(MappedBase)` 扫描 `model.py/models.py`，排除虚拟环境、迁移、测试目录等，再导入并识别有效映射类，按类和表名去重。

当前至少有两张不同用途的表：`test_user` 和 `user`。重复使用相同表名不应靠扫描器去重来掩盖；同一 metadata 中重复声明可能在导入阶段就发生冲突。

## 启用后的学习命令

以下命令仅用于你明确选择启用迁移的本地环境，不是当前默认行为：

```bash
cd /path/to/fastapi_template/backend

ALEMBIC_ENABLED=true uv run main.py revision --env=dev -m "create user tables"
# 先阅读新生成脚本，再执行：
ALEMBIC_ENABLED=true uv run main.py upgrade --env=dev
```

PowerShell 可以先设置 `$env:ALEMBIC_ENABLED="true"`，再执行对应命令。该开关在 Python 导入配置前直接通过 `os.environ` 检查，不要只写进 dotenv 就期待它一定生效。

查看历史和当前版本可使用 Alembic 原生命令，但必须自行提供环境：

```bash
ALEMBIC_ENABLED=true ENVIRONMENT=dev uv run alembic history
ALEMBIC_ENABLED=true ENVIRONMENT=dev uv run alembic current
```

当前 Typer 只封装了生成和升级，没有封装 downgrade。回退脚本是否可逆、是否损失数据，需要逐个审核。

## 自动生成不是自动正确

新增列和约束通常能得到候选变更，但改名可能被识别为删除旧列并新增列；数据迁移、复杂约束、默认值和索引变化都需要人工核对。

重点检查：

- `upgrade()` 是否符合预期，是否包含误删表或列。
- `downgrade()` 是否可执行，能否接受回退导致的数据损失。
- 非空字段的历史数据如何补齐。
- 操作大表时的锁、执行时间和部署顺序。

项目开启 `compare_type`、`compare_server_default`，并通过回调跳过空迁移，但这些设置不能替代审核。

## 已有表与手写 SQL 怎么办

当前代码明确采用“默认手写 SQL”的策略。按模型建表时还需检查 ORM 的客户端默认值和数据库默认值差异，例如 `is_deleted`。

已有数据库不能为了让迁移通过就删除业务表。`stamp` 只标记迁移版本，不执行对应结构变化，只有确认现有结构与基线完全一致后才适用。

如果以后启用团队迁移，应把审核后的版本脚本与对应模型改动一同纳入版本控制，让不同环境可以按相同顺序升级，而不是只在某台机器生成脚本。

源码：`backend/app/alembic/env.py`、`backend/main.py`、`backend/app/utils/import_util.py`。

参考：[Alembic 教程](https://alembic.sqlalchemy.org/en/latest/tutorial.html)、[自动生成的边界](https://alembic.sqlalchemy.org/en/latest/autogenerate.html)、[异步迁移](https://alembic.sqlalchemy.org/en/latest/cookbook.html#using-asyncio-with-alembic)。
