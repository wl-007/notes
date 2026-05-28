# poetry 使用指南

## 1. `poetry` 是什么

`poetry` 是一个偏工程化的 Python 项目管理工具，核心能力主要包括：

- 管理项目依赖
- 生成和维护锁文件
- 管理虚拟环境
- 构建和发布 Python 包

如果你做的是一个更完整的 Python 应用或库，而不是一次性脚本，`poetry` 会比较顺手。

## 2. 安装

官方常见安装方式：

```bash
curl -sSL https://install.python-poetry.org | python3 -
```

确认安装：

```bash
poetry --version
```

## 3. 初始化项目

在已有目录里初始化：

```bash
poetry init
```

创建一个新项目：

```bash
poetry new demo-lib
cd demo-lib
```

初始化后通常重点看这两个文件：

- `pyproject.toml`
- `poetry.lock`

## 4. 添加和移除依赖

添加依赖：

```bash
poetry add requests
poetry add pandas matplotlib
```

添加开发依赖：

```bash
poetry add --group dev pytest ruff
```

移除依赖：

```bash
poetry remove requests
```

更新依赖：

```bash
poetry update
```

只更新某个包：

```bash
poetry update requests
```

## 5. 安装和同步环境

安装当前项目依赖：

```bash
poetry install
```

如果锁文件已经存在，`poetry install` 会按锁定结果装依赖。

重新生成锁文件：

```bash
poetry lock
```

在较新的工作流里，也常见用同步命令让环境和锁文件完全一致：

```bash
poetry sync
```

可以把它理解成更严格的环境对齐。

## 6. 运行命令

在项目虚拟环境中执行命令：

```bash
poetry run python main.py
poetry run pytest
```

进入虚拟环境 shell：

```bash
poetry shell
```

如果你的 Poetry 版本或插件配置没有提供 `shell`，优先用 `poetry run` 即可。

## 7. 虚拟环境管理

查看环境信息：

```bash
poetry env info
```

列出环境：

```bash
poetry env list
```

指定 Python 创建环境：

```bash
poetry env use python3.12
```

删除环境：

```bash
poetry env remove python3.12
```

## 8. 构建和发布

构建分发包：

```bash
poetry build
```

发布到包仓库：

```bash
poetry publish
```

如果要先构建再发布：

```bash
poetry publish --build
```

这个能力更适合做库、SDK 或内部复用组件。

## 9. 常见工作流

### 9.1 创建一个后端项目

```bash
poetry init
poetry add fastapi uvicorn
poetry add --group dev pytest ruff
poetry install
```

### 9.2 运行测试

```bash
poetry run pytest
```

### 9.3 准备发包

```bash
poetry lock
poetry build
poetry publish
```

## 10. 什么时候适合用 `poetry`

- 做需要长期维护的 Python 项目
- 需要比较清晰的依赖锁定
- 需要构建和发布 Python 包
- 团队已经基于 `pyproject.toml` 工作

## 11. 注意点

- 如果团队已经全面转到 `uv`，就没必要新项目再上 `poetry`。
- `poetry` 和 `conda` 都能碰环境管理，但一般不建议它们同时主导同一个项目。
- 如果只是写几个简单脚本，`poetry` 可能会显得比实际需要更重。
