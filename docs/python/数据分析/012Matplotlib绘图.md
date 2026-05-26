# Matplotlib 绘图

## 学习目标

- 了解数据可视化的基本价值
- 掌握 `Matplotlib` 的基本绘图流程
- 知道 `Matplotlib`、`Pandas`、`Seaborn` 的分工

## 1. 为什么要做可视化

可视化不是分析的装饰，而是分析的一部分。它可以帮助我们：

- 发现异常值和趋势
- 比较不同类别
- 解释分析结果

## 2. 常见绘图库

课件提到的常见选择有：

- `Matplotlib`：基础绘图库，控制粒度最细
- `Pandas`：对 `Matplotlib` 的常用场景封装
- `Seaborn`：统计图更方便，默认样式更好
- `pyecharts`：更偏展示型、交互型图表

## 3. 最基本的绘图流程

```python
import matplotlib.pyplot as plt

x = [1, 2, 3, 4]
y = [10, 15, 12, 18]

plt.plot(x, y)
plt.title("Sales Trend")
plt.xlabel("Day")
plt.ylabel("Sales")
plt.show()
```

常见步骤：

1. 准备数据
2. 选择图表类型
3. 设置标题、坐标轴和图例
4. 显示或保存图片

## 4. 常见图表

### 4.1 折线图

```python
plt.plot([1, 2, 3], [3, 5, 4])
```

适合观察趋势。

### 4.2 柱状图

```python
plt.bar(["A", "B", "C"], [10, 20, 15])
```

适合比较类别。

### 4.3 散点图

```python
plt.scatter([1, 2, 3, 4], [5, 7, 6, 9])
```

适合观察相关性和分布。

### 4.4 直方图

```python
plt.hist([1, 2, 2, 3, 3, 3, 4], bins=4)
```

适合观察数值分布。

## 5. 中文显示

在中文环境里常见两个设置：

```python
import matplotlib.pyplot as plt

plt.rcParams["font.sans-serif"] = ["SimHei"]
plt.rcParams["axes.unicode_minus"] = False
```

## 6. 小结

- `Matplotlib` 是 Python 可视化的基础设施
- 先掌握折线图、柱状图、散点图和直方图
- 图表是否有解释力，通常比“图做得多复杂”更重要
