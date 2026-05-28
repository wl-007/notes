# conda 使用指南

## 1. `conda` 是什么

`conda` 既是包管理器，也是环境管理器。它和 `pip` 的区别在于：

- 不只管 Python 包
- 更擅长管理独立环境
- 对科学计算和数据分析生态更友好

如果你的目标是数据分析、机器学习、Notebook 实验环境，`conda` 很常见。

## 2. 安装方式

常见选择：

- `Anaconda`：预装很多常用科学计算包，体积较大
- `Miniconda`：更轻量，只带核心环境
- `Miniforge`：社区里也很常见，默认更贴近 `conda-forge`

如果你只是想要环境管理能力，通常装轻量版本就够了。

## 3. 创建和激活环境

创建环境并指定 Python 版本：

```bash
conda create -n py312 python=3.12
```

激活环境：

```bash
conda activate py312
```

退出环境：

```bash
conda deactivate
```

查看已有环境：

```bash
conda env list
```

## 4. 安装、更新、删除包

安装包：

```bash
conda install pandas matplotlib jupyter
```

更新某个包：

```bash
conda update pandas
```

更新当前环境里的所有包：

```bash
conda update --all
```

删除包：

```bash
conda remove pandas
```

搜索包：

```bash
conda search numpy
```

## 5. 使用 channel

`conda` 的包通常来自不同 channel。常见的是官方源和 `conda-forge`。

指定 channel 安装：

```bash
conda install -c conda-forge jupyterlab
```

什么时候需要关心 channel：

- 默认源里没有你要的包
- 某些库在 `conda-forge` 更新更快
- 团队要求统一来源

一般来说，一个环境尽量保持包来源一致，避免混装造成冲突。

## 6. 导出和复用环境

导出环境配置：

```bash
conda export --format=environment-yaml --file=environment.yaml
```

如果你只想保留手动安装过的依赖历史：

```bash
conda export --from-history --format=environment-yaml --file=environment.yaml
```

老一些的写法也很常见：

```bash
conda env export > environment.yml
```

根据配置文件创建环境：

```bash
conda env create --file environment.yaml
```

这套流程很适合团队协作或换电脑恢复环境。

## 7. 删除环境

删除整个环境：

```bash
conda remove -n py312 --all
```

清理缓存：

```bash
conda clean --all
```

如果磁盘空间越来越大，这个命令很有用。

## 8. 常见工作流

### 8.1 创建一个数据分析环境

```bash
conda create -n pydata python=3.12
conda activate pydata
conda install pandas matplotlib jupyter
```

### 8.2 安装 `jupyterlab`

```bash
conda install -c conda-forge jupyterlab
```

### 8.3 共享环境给别人

```bash
conda export --from-history --format=environment-yaml --file=environment.yaml
```

然后别人执行：

```bash
conda env create --file environment.yaml
```

## 9. 什么时候适合用 `conda`

- 做数据分析、机器学习、科研实验
- 依赖里不只有纯 Python 包
- 需要稳定隔离多个 Python 版本和工具链
- 想配合 `jupyter` 使用

## 10. 注意点

- `conda` 环境里可以再用 `pip`，但最好少混用，尤其不要无计划地反复交叉安装。
- 如果必须混用，通常先装 `conda` 包，再装 `pip` 包更稳一些。
- 团队协作时，建议统一 channel 策略，不然不同机器可能解出不同依赖结果。
