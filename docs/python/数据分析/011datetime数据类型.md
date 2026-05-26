# datetime 数据类型

## 学习目标

- 了解 `Pandas` 中时间序列数据的表示方式
- 掌握时间转换、索引和重采样的基本用法
- 能基于日期做简单统计

## 1. 时间类型的意义

很多分析任务都和时间有关：

- 每周销量
- 每月新增用户
- 每季度投诉数

因此把字符串正确转换成时间类型，是时间分析的前提。

## 2. 转换为时间类型

```python
import pandas as pd

df = pd.DataFrame({"date": ["2024-01-01", "2024-01-03", "2024-01-05"]})
df["date"] = pd.to_datetime(df["date"])
print(df.dtypes)
```

也可以直接构造 `Timestamp`：

```python
import pandas as pd

ts = pd.Timestamp("2024-01-01 10:30:00")
print(ts.year, ts.month, ts.day)
```

## 3. 设置时间索引

```python
import pandas as pd

df = pd.DataFrame(
    {
        "date": ["2024-01-01", "2024-01-03", "2024-01-05"],
        "value": [10, 20, 15],
    }
)

df["date"] = pd.to_datetime(df["date"])
df = df.set_index("date")
print(df)
```

时间列做成索引后，按日期切片会方便很多。

## 4. 按时间筛选

```python
print(df.loc["2024-01-01":"2024-01-04"])
```

## 5. 时间差

```python
import pandas as pd

start = pd.Timestamp("2024-01-01")
end = pd.Timestamp("2024-01-05")
delta = end - start
print(delta.days)
```

两个时间相减会得到 `Timedelta`。

## 6. 重采样

重采样适合把原始数据按周、按月、按季度重算。

```python
import pandas as pd

df = pd.DataFrame(
    {
        "date": pd.date_range("2024-01-01", periods=10, freq="D"),
        "count": [1, 3, 2, 5, 4, 6, 3, 2, 1, 4],
    }
).set_index("date")

print(df.resample("W").sum())
print(df.resample("M").mean())
```

常见频率：

- `D`：天
- `W`：周
- `M`：月
- `Q`：季度

## 7. 小结

- 时间分析的第一步是 `pd.to_datetime()`
- 时间列设置为索引后，切片和重采样会更顺手
- `datetime64`、`Timestamp`、`Timedelta` 是时间分析的基础概念
