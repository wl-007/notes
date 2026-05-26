# Python 数据分析简介与环境搭建

## 学习目标

- 了解 Python 做数据分析的优势
- 知道数据分析常用的开源库
- 掌握 `Anaconda`、虚拟环境和 `Jupyter Notebook` 的基本使用

## 1. 为什么用 Python 做数据分析

课件中把 Python 的优势概括为几类：

- 工具链完整：从数据清洗、统计分析到建模和可视化都能覆盖
- 开源生态成熟：常见库包括 `NumPy`、`Pandas`、`Matplotlib`、`Seaborn`、`scikit-learn`
- 工程能力强：除了分析本身，还能做爬虫、接口、自动化脚本和 Web 服务
- 跨平台：`Windows`、`macOS`、`Linux` 都可运行

和纯表格工具相比，Python 更适合处理更大规模、更复杂、可重复的数据任务。

## 2. 常见数据分析库

### 2.1 `NumPy`

- 提供高性能多维数组 `ndarray`
- 支持向量化运算、线性代数、随机数生成

### 2.2 `Pandas`

- `Series` 处理一维数据
- `DataFrame` 处理表格型数据
- 适合加载、清洗、统计和转换结构化数据

### 2.3 `Matplotlib` 与 `Seaborn`

- `Matplotlib` 是基础绘图库，控制能力强
- `Seaborn` 基于 `Matplotlib` 封装，更适合快速做统计图

### 2.4 `scikit-learn`

- 常见机器学习算法库
- 构建在 `NumPy`、`SciPy` 和 `Matplotlib` 之上

## 3. 使用 `Anaconda`

`Anaconda` 适合初学阶段，原因很直接：

- 自带大量常用科学计算库
- 自带 `conda` 包管理器和环境管理器
- 安装和维护版本比手动逐个装包更省事

常见命令：

```bash
conda create -n pydata python=3.12
conda activate pydata
conda install pandas matplotlib jupyter
```

## 4. 为什么要用虚拟环境

不同项目的依赖版本可能不一样。虚拟环境的作用是隔离：

- Python 版本
- 第三方库版本
- 不同项目之间的运行环境

一个项目一个环境是更稳妥的习惯。

## 5. `Jupyter Notebook` 入门

`Jupyter Notebook` 适合做探索式分析，因为它把代码、结果和说明写在同一个页面里。

启动方式：

```bash
jupyter notebook
```

常见快捷键：

- `Y`：切换为代码单元
- `M`：切换为 Markdown 单元
- `A`：在当前单元上方新增单元
- `B`：在当前单元下方新增单元
- `DD`：删除当前单元

## 6. 第一个数据分析示例

```python
import pandas as pd

scores = pd.DataFrame(
    {
        "name": ["张三", "李四", "王五"],
        "math": [88, 92, 79],
        "english": [90, 85, 95],
    }
)

scores["avg"] = scores[["math", "english"]].mean(axis=1)
print(scores)
```

这个例子已经体现了数据分析最基础的流程：

1. 构造或加载数据
2. 查看结构
3. 计算指标
4. 输出结果

## 7. 小结

- Python 的优势不只是“能分析数据”，而是可以形成完整的数据处理流程
- 初学阶段建议优先掌握 `Anaconda + Jupyter Notebook`
- 后续学习重点会落到 `NumPy` 和 `Pandas`
