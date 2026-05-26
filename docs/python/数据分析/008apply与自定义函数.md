# apply 与自定义函数

## 学习目标

- 掌握 `apply` 的基本用法
- 理解对 `Series` 和 `DataFrame` 使用 `apply` 的差异
- 知道什么时候考虑向量化函数

## 1. `Series.apply()`

`apply()` 可以把一个函数应用到 `Series` 的每个元素上。

```python
import pandas as pd

s = pd.Series([1, 2, 3, 4])

def square(x):
    return x * x

print(s.apply(square))
```

也可以传额外参数：

```python
def add_num(x, n):
    return x + n

print(s.apply(add_num, n=10))
```

## 2. `DataFrame.apply()`

`DataFrame` 是二维结构，因此 `apply()` 可以按列或按行运行。

```python
import pandas as pd

df = pd.DataFrame(
    {
        "math": [88, 92, 79],
        "english": [90, 85, 95],
    }
)

print(df.apply(sum))           # 默认按列
print(df.apply(sum, axis=1))   # 按行
```

参数 `axis` 很关键：

- `axis=0`：对每一列执行
- `axis=1`：对每一行执行

## 3. 行级函数示例

```python
import pandas as pd

df = pd.DataFrame(
    {
        "math": [88, 92, 79],
        "english": [90, 85, 95],
    }
)

def level(row):
    avg = (row["math"] + row["english"]) / 2
    return "A" if avg >= 90 else "B"

df["level"] = df.apply(level, axis=1)
print(df)
```

## 4. `lambda` 表达式

函数很简单时，可以直接写成匿名函数：

```python
import pandas as pd

s = pd.Series([1, 2, 3, 4])
print(s.apply(lambda x: x * 10))
```

## 5. 什么时候不用 `apply`

如果能直接用向量化表达式，通常更快，也更清晰。

```python
import pandas as pd

df = pd.DataFrame({"price": [10, 20, 30], "count": [2, 3, 1]})
df["total"] = df["price"] * df["count"]
```

这类计算不需要 `apply(axis=1)`。

## 6. 向量化函数

课件里也提到可以借助 `np.vectorize` 包装函数：

```python
import numpy as np

def classify(x):
    return "high" if x >= 60 else "low"

v_classify = np.vectorize(classify)
print(v_classify(np.array([30, 60, 90])))
```

## 7. 小结

- `Series.apply()` 面向单列元素
- `DataFrame.apply()` 要明确 `axis`
- 能直接写向量化表达式时，优先不用 `apply`
