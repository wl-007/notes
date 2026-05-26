# Pandas 数据结构

## 学习目标

- 掌握 `Series` 和 `DataFrame` 的基本概念
- 熟悉常见属性、方法和布尔索引
- 掌握常见的增删改与导入导出方式

## 1. `Series` 和 `DataFrame`

`Pandas` 最核心的两个数据结构是：

- `Series`：一维带索引的数据结构
- `DataFrame`：二维表格型数据结构

可以把 `DataFrame` 理解成由多个 `Series` 组成的表。

## 2. 创建 `Series`

```python
import pandas as pd

s1 = pd.Series([18, 20, 22])
s2 = pd.Series([88, 92, 95], index=["语文", "数学", "英语"])

print(s1)
print(s2)
```

常用属性：

- `index`
- `values`
- `shape`
- `dtype`

## 3. 创建 `DataFrame`

```python
import pandas as pd

df = pd.DataFrame(
    {
        "name": ["Ada", "Bob", "Cindy"],
        "age": [18, 20, 19],
        "score": [91, 87, 95],
    },
    index=["a", "b", "c"],
)

print(df)
```

创建时可以指定：

- 列数据
- 行索引
- 列顺序

## 4. `Series` 的常见操作

```python
import pandas as pd

s = pd.Series([90, 85, 90, None, 76], index=list("abcde"))

print(s.count())
print(s.value_counts(dropna=False))
print(s.describe())
print(s[s > 80])
```

常见方法包括：

- `count()`
- `value_counts()`
- `describe()`
- `sort_values()`
- `isna()`

## 5. `DataFrame` 的常见操作

```python
import pandas as pd

df = pd.DataFrame(
    {
        "name": ["Ada", "Bob", "Cindy"],
        "age": [18, 20, 19],
        "score": [91, 87, 95],
    }
)

print(df.shape)
print(df.columns)
print(df.dtypes)
print(df.head(2))
print(df.loc[0])
print(df[df["score"] >= 90])
```

常见访问方式：

- `loc`：按标签取数据
- `iloc`：按位置取数据

## 6. 运算与对齐

`Pandas` 做运算时会自动按索引对齐。

```python
import pandas as pd

s1 = pd.Series([1, 2, 3], index=["a", "b", "c"])
s2 = pd.Series([10, 20, 30], index=["b", "c", "d"])

print(s1 + s2)
```

结果中索引对不上的位置会出现 `NaN`。

## 7. 修改索引和列名

```python
import pandas as pd

df = pd.DataFrame({"name": ["Ada"], "score": [95]})

df = df.rename(columns={"score": "math_score"})
df = df.set_index("name")
df = df.reset_index()
```

常见方法：

- `rename()`
- `set_index()`
- `reset_index()`

## 8. 添加、删除、插入列

```python
import pandas as pd

df = pd.DataFrame({"name": ["Ada", "Bob"], "score": [95, 88]})

df["level"] = ["A", "B"]
df.insert(1, "age", [18, 19])
df = df.drop(columns=["level"])
```

## 9. 导入导出数据

课件重点提到了几类格式：

- `CSV`
- `Excel`
- `pickle`

```python
import pandas as pd

df = pd.DataFrame({"name": ["Ada"], "score": [95]})

df.to_csv("scores.csv", index=False)
df.to_excel("scores.xlsx", index=False)
df.to_pickle("scores.pkl")
```

## 10. 小结

- `Series` 适合处理单列数据
- `DataFrame` 适合处理表格型数据
- `loc`、`iloc`、布尔索引和索引对齐是 `Pandas` 的基础能力
