# Pandas 绘图

## 学习目标

- 熟悉 `Series.plot()` 和 `DataFrame.plot()`
- 掌握常见图表类型
- 理解 `Pandas` 绘图和 `Matplotlib` 的关系

## 1. `Pandas` 绘图的定位

`Pandas` 绘图本质上是对 `Matplotlib` 的封装。

优点是：

- 写法更短
- 和 `Series`、`DataFrame` 结合自然
- 适合快速做探索式分析

## 2. 基本用法

```python
import pandas as pd
import matplotlib.pyplot as plt

s = pd.Series([10, 15, 12], index=["1月", "2月", "3月"])
s.plot(kind="line", title="月销售额")
plt.show()
```

`DataFrame` 也一样：

```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.DataFrame(
    {
        "month": ["1月", "2月", "3月"],
        "sales": [100, 120, 90],
        "profit": [20, 35, 18],
    }
)

df.plot(x="month", y=["sales", "profit"], kind="line")
plt.show()
```

## 3. 常见图表类型

### 3.1 柱状图

```python
df.plot(x="month", y="sales", kind="bar")
```

### 3.2 折线图

```python
df.plot(x="month", y="sales", kind="line")
```

### 3.3 面积图

```python
df.plot(x="month", y=["sales", "profit"], kind="area")
```

### 3.4 直方图

```python
df["sales"].plot(kind="hist", bins=5)
```

### 3.5 饼图

```python
s.plot(kind="pie", autopct="%.1f%%")
```

### 3.6 散点图

```python
df.plot(kind="scatter", x="sales", y="profit")
```

## 4. 继续使用 `Matplotlib` 调整细节

虽然 `Pandas` 写法简单，但底层还是 `Matplotlib`，所以可以混合使用：

```python
import matplotlib.pyplot as plt

ax = df.plot(x="month", y="sales", kind="bar", color="steelblue")
ax.set_title("月销售额")
ax.set_ylabel("金额")
plt.show()
```

## 5. 小结

- `Pandas` 绘图适合快速探索数据
- 想要更细的控制时，再回到 `Matplotlib`
- `line`、`bar`、`hist`、`scatter` 是最常用的一组图表类型
