# jupyter 使用指南

## 1. `jupyter` 是什么

`jupyter` 是一套交互式计算工具。对 Python 用户来说，最常见的是两种界面：

- `Jupyter Notebook`
- `JupyterLab`

它适合这些场景：

- 数据探索
- 可视化实验
- 教学演示
- 记录分析过程

它不是完整的依赖管理器，通常要配合 `uv`、`conda` 或 `poetry` 一起使用。

## 2. 安装方式

如果你用 `pip` 或 `uv`：

```bash
pip install jupyter
pip install jupyterlab
```

如果你用 `conda`：

```bash
conda install jupyter
conda install -c conda-forge jupyterlab
```

如果你用 `uv` 管项目，也可以：

```bash
uv add jupyterlab
```

## 3. 启动

启动经典 Notebook：

```bash
jupyter notebook
```

启动 JupyterLab：

```bash
jupyter lab
```

如果你是用 `uv` 或 `poetry` 的项目环境，建议这样启动：

```bash
uv run jupyter lab
poetry run jupyter lab
```

这样更不容易串到错误的 Python 环境。

## 4. 内核和环境的关系

`Jupyter` 最容易踩坑的地方，是“页面打开了，但用的不是你当前项目环境里的 Python”。

解决思路是：在目标环境里安装 `ipykernel`，再把这个环境注册成一个 kernel。

先安装：

```bash
pip install ipykernel
```

然后注册：

```bash
python -m ipykernel install --user --name py312 --display-name "Python (py312)"
```

这样你在 Notebook 或 Lab 里就能明确选择这个内核。

查看已有 kernel：

```bash
jupyter kernelspec list
```

## 5. 在 Notebook 里安装包

原则上，最好在启动 Notebook 的那个环境里装包，而不是随手在系统环境里装。

更稳妥的做法：

- 如果你用 `uv`，在终端执行 `uv add 包名`
- 如果你用 `conda`，在终端执行 `conda install 包名`
- 如果你用 `poetry`，在终端执行 `poetry add 包名`

如果一定要在 Notebook 单元里装，建议写成：

```python
%pip install pandas
```

而不是直接写 `!pip install pandas`，因为 `%pip` 更接近当前 kernel 的解释器。

## 6. 常见命令

查看配置目录：

```bash
jupyter --paths
```

查看可用子命令：

```bash
jupyter --help
```

命令总入口形式：

```bash
jupyter <subcommand>
```

## 7. 运行和转换 Notebook

把 notebook 转成 HTML：

```bash
jupyter nbconvert --to html report.ipynb
```

转成 Python 脚本：

```bash
jupyter nbconvert --to script report.ipynb
```

这在归档分析结果、发给别人或纳入项目仓库时很有用。

## 8. 常见工作流

### 8.1 数据分析环境

```bash
conda create -n pydata python=3.12
conda activate pydata
conda install pandas matplotlib jupyter
python -m ipykernel install --user --name pydata --display-name "Python (pydata)"
jupyter lab
```

### 8.2 用 `uv` 启动 Notebook

```bash
uv init notebook-demo
cd notebook-demo
uv add pandas matplotlib jupyterlab ipykernel
uv run python -m ipykernel install --user --name notebook-demo --display-name "Python (notebook-demo)"
uv run jupyter lab
```

## 9. 什么时候适合用 `jupyter`

- 你需要边写边看结果
- 你要调试数据清洗流程
- 你要画图、做实验记录、写教学示例
- 你暂时不需要完整前后端工程结构

## 10. 常见问题

### 10.1 明明装了包，但 Notebook 里导入失败

大概率是当前 Notebook kernel 和你装包的环境不是同一个。

### 10.2 为什么推荐 `JupyterLab`

因为它比经典 Notebook 更像一个完整工作台，文件管理、多标签页、终端和扩展能力都更好。

### 10.3 Notebook 能替代正式项目结构吗

不能。它更适合探索、实验和分析，不适合替代完整工程组织。
