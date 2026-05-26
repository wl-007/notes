# Pandas 数据分析入门

## 学习目标

- 掌握常见统计指标的计算方式
- 熟练使用排序、筛选和去重
- 能完成简单的数据分析任务

## 1. 常见统计量

数据分析开始阶段，最常见的动作是先做整体描述。

```python
import pandas as pd

movie = pd.DataFrame(
    {
        "title": ["A", "B", "C", "D"],
        "score": [8.1, 7.5, 9.0, 8.7],
        "budget": [10, 30, 25, 15],
    }
)

print(movie["score"].max())
print(movie["score"].min())
print(movie["score"].mean())
print(movie["score"].quantile(0.5))
print(movie["score"].var())
```

也可以直接用：

```python
print(movie.describe().T)
print(movie.info())
```

## 2. 排序

```python
print(movie.sort_values(by="score", ascending=False))
print(movie.nlargest(2, "score"))
print(movie.nsmallest(2, "budget"))
```

课件中的典型问题是“先找分数最高的 N 个，再从中挑预算最小的几部”，本质就是多步排序与筛选。

## 3. 去重

```python
movie2 = pd.DataFrame(
    {
        "year": [2022, 2022, 2023, 2023],
        "title": ["A", "B", "C", "D"],
        "score": [8.1, 8.5, 9.0, 8.7],
    }
)

result = (
    movie2.sort_values(["year", "score"], ascending=[True, False])
    .drop_duplicates(subset=["year"])
)
print(result)
```

这个模式常用于：

- 每年评分最高的电影
- 每个地区最便宜的商品
- 每个班级成绩最好的学生

## 4. 查看数据结构

```python
print(movie.shape)
print(movie.head())
print(movie.info())
print(movie.describe())
```

这几行代码几乎是所有分析任务的固定起手式。

## 5. 一个小练习

```python
import pandas as pd

house = pd.DataFrame(
    {
        "district": ["A区", "A区", "B区", "B区"],
        "price": [3200, 4500, 2800, 3900],
        "area": [40, 55, 35, 48],
        "views": [120, 90, 180, 140],
    }
)

house["price_per_area"] = house["price"] / house["area"]

print(house.sort_values("price").head(1))
print(house.sort_values("views", ascending=False).head(1))
print(house.groupby("district")["price_per_area"].mean())
```

这个例子同时包含了：

- 新建指标列
- 排序找极值
- 分组统计

## 6. 小结

- `describe()` 和 `info()` 用来快速摸清数据概况
- `sort_values()`、`nlargest()`、`nsmallest()` 用来找重点记录
- `drop_duplicates()` 在“每组保留最优记录”时非常高频
