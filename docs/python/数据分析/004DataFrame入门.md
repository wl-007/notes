# DataFrame 入门

## 学习目标

- 掌握加载数据文件的常见方式
- 知道如何按行按列提取部分数据
- 理解分组聚合的基本思路

## 1. 为什么先学 `DataFrame`

在真实数据分析场景中，大多数数据都天然接近二维表：

- 数据库查询结果
- Excel 表格
- CSV 文件

因此 `DataFrame` 往往是分析工作的起点。

## 2. 加载数据

```python
import pandas as pd

df = pd.read_csv("data.csv")
```

初步查看数据时，通常先看这些内容：

```python
print(type(df))
print(df.shape)
print(df.columns)
print(df.dtypes)
print(df.head())
```

这一步的目标是先回答三个问题：

1. 有多少行多少列
2. 每一列叫什么
3. 每一列是什么类型

## 3. 按列取数据

```python
import pandas as pd

df = pd.DataFrame(
    {
        "name": ["Ada", "Bob", "Cindy"],
        "country": ["CN", "US", "CN"],
        "score": [91, 87, 95],
    }
)

print(df["name"])
print(df[["name", "score"]])
```

- `df["列名"]` 返回一个 `Series`
- `df[["列1", "列2"]]` 返回一个 `DataFrame`

## 4. 按行取数据

```python
print(df.loc[0])
print(df.loc[[0, 2]])
print(df.iloc[1])
print(df.iloc[:2])
```

区别：

- `loc` 按标签取
- `iloc` 按位置取

## 5. 同时按行和列取数据

```python
print(df.loc[0:1, ["name", "score"]])
print(df.iloc[0:2, 0:2])
```

这是日常分析里最常见的“切子集”操作。

## 6. 分组聚合

课件把 `groupby` 作为 `DataFrame` 的一个重要进阶能力。

```python
import pandas as pd

df = pd.DataFrame(
    {
        "country": ["CN", "CN", "US", "US"],
        "score": [91, 87, 88, 95],
        "age": [18, 20, 19, 21],
    }
)

result = df.groupby("country")["score"].mean()
print(result)
```

基本思路是：

1. 按某个字段切分成若干组
2. 对每组做统计计算

## 7. 简单绘图

`DataFrame` 可以直接调用 `plot()`：

```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.DataFrame({"month": ["1月", "2月", "3月"], "sales": [100, 120, 90]})
df.plot(x="month", y="sales", kind="bar")
plt.show()
```

这也是后面 `Pandas` 绘图专题的基础。

## 8. 小结

- 看到表格数据时，优先把它读成 `DataFrame`
- 先用 `shape`、`columns`、`dtypes` 和 `head()` 建立数据概览
- `loc`、`iloc`、`groupby` 是最常用的一组操作
