# uv 使用指南

## 1. `uv` 是什么

`uv` 是一个现代化的 Python 包和项目管理工具，可以把下面这些事情合在一起做：

- 创建虚拟环境
- 安装和锁定依赖
- 运行项目命令
- 安装命令行工具
- 管理 Python 版本

如果你现在准备开一个新的 Python 项目，`uv` 通常值得优先考虑。

## 2. 安装

常见安装方式：

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

安装后先确认版本：

```bash
uv --version
```

## 3. 创建虚拟环境

在当前目录创建默认虚拟环境：

```bash
uv venv
```

指定 Python 版本：

```bash
uv venv --python 3.12
```

激活环境：

```bash
source .venv/bin/activate
```

很多时候其实不用手动激活，因为 `uv run` 会直接在项目环境里执行命令。

## 4. 初始化项目

创建一个新项目：

```bash
uv init demo-app
cd demo-app
```

初始化后通常会看到：

- `pyproject.toml`
- 项目目录
- 基础元信息

如果你已经在现有目录里，也可以直接初始化：

```bash
uv init
```

## 5. 安装和管理依赖

添加依赖：

```bash
uv add requests
uv add pandas matplotlib
```

添加开发依赖：

```bash
uv add --dev pytest ruff
```

移除依赖：

```bash
uv remove requests
```

根据锁文件同步环境：

```bash
uv sync
```

刷新锁文件：

```bash
uv lock
```

常见理解方式：

- `uv add`：修改项目依赖并安装
- `uv lock`：更新锁文件
- `uv sync`：让当前环境和锁文件保持一致

## 6. 运行命令

在项目环境中运行 Python：

```bash
uv run python main.py
```

运行测试或代码检查：

```bash
uv run pytest
uv run ruff check
```

它的好处是不用先手动激活环境，也不用担心命令跑到了系统 Python 上。

## 7. 安装和运行工具

临时运行一个工具：

```bash
uvx ruff check
```

也可以写成：

```bash
uv tool run ruff check
```

全局安装工具：

```bash
uv tool install ruff
uv tool install black
```

查看已安装工具：

```bash
uv tool list
```

这个场景很像 `npm i -g` 或 `pnpm dlx` 的组合。

## 8. Python 版本管理

`uv` 也能配合 Python 版本使用。

例如用指定版本创建环境：

```bash
uv venv --python 3.11
```

用指定解释器运行命令：

```bash
uv run --python 3.12 python --version
```

如果本机没有对应版本，`uv` 在一些场景下会自动处理下载和使用。

## 9. 常见工作流

### 9.1 新建一个脚本项目

```bash
uv init hello-uv
cd hello-uv
uv add requests
uv run python
```

### 9.2 做一个数据分析环境

```bash
uv init pydata-demo
cd pydata-demo
uv add pandas matplotlib jupyterlab
uv run jupyter lab
```

### 9.3 拉下别人的项目后恢复依赖

```bash
uv sync
```

## 10. 什么时候适合用 `uv`

- 新开 Python 项目
- 想统一虚拟环境、依赖和命令运行
- 希望比 `pip + venv` 更顺手
- 希望比传统工具更快

## 11. 注意点

- 团队如果已经统一使用 `poetry` 或 `conda`，不要随意在同一项目里改主工具链。
- 一些历史项目可能还保留 `requirements.txt` 工作流，这时要先看团队约定。
- `uv` 很适合新项目，但迁移老项目前最好先确认当前依赖和发布流程。
