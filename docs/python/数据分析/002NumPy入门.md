# NumPy 入门

## 学习目标

- 了解 `NumPy` 的定位
- 掌握 `ndarray` 的创建方式
- 掌握常见数组运算、统计和矩阵运算

## 1. `NumPy` 是什么

`NumPy` 是高性能科学计算和数据分析的基础包。核心对象是 `ndarray`，也就是多维数组。

它的优势主要有两点：

- 比 Python 原生列表更节省内存，计算更快
- 支持向量化运算，很多计算不需要手写循环

## 2. 创建数组

```python
import numpy as np

arr1 = np.array([1, 2, 3, 4])
arr2 = np.zeros((2, 3))
arr3 = np.ones((2, 2))
arr4 = np.arange(0, 10, 2)
```

常见创建函数：

- `np.array()`
- `np.zeros()`
- `np.ones()`
- `np.empty()`
- `np.arange()`

## 3. 数据类型

`ndarray` 要求同一数组中的元素类型尽量统一。

```python
import numpy as np

arr = np.array([1, 2, 3], dtype="float64")
print(arr.dtype)

arr2 = arr.astype("int32")
print(arr2.dtype)
```

常见类型有：

- `int32`
- `int64`
- `float32`
- `float64`
- `bool`

## 4. 形状与维度

```python
import numpy as np

arr = np.arange(12).reshape(3, 4)

print(arr.shape)   # (3, 4)
print(arr.ndim)    # 2
print(arr.size)    # 12
```

- `shape` 表示每个维度长度
- `ndim` 表示维度数
- `size` 表示元素总数

## 5. 基本运算

```python
import numpy as np

arr = np.array([1, 2, 3, 4])

print(arr + 10)
print(arr * 2)
print(arr > 2)
```

这些操作会对数组中的每个元素逐一生效，这就是向量化计算。

## 6. 常用统计函数

```python
import numpy as np

arr = np.array([2, 4, 6, 8])

print(arr.sum())
print(arr.mean())
print(arr.max())
print(arr.min())
print(arr.std())
```

课件里把这类函数作为最常用的一组基础工具，后面的 `Pandas` 统计分析也会频繁用到。

## 7. 排序、去重、比较

```python
import numpy as np

arr = np.array([3, 1, 2, 3, 2])

print(np.sort(arr))
print(np.unique(arr))
print(arr == 2)
```

## 8. 矩阵运算

```python
import numpy as np

a = np.array([[1, 2], [3, 4]])
b = np.array([[5, 6], [7, 8]])

print(a * b)      # 对应元素相乘
print(a @ b)      # 矩阵乘法
print(np.dot(a, b))
```

要区分两种乘法：

- `a * b`：逐元素相乘
- `a @ b` 或 `np.dot(a, b)`：矩阵乘法

## 9. 小结

- `NumPy` 是后续数据分析库的底层基础
- 重点先掌握数组创建、数据类型、形状和向量化运算
- 看到“批量数值计算”时，优先想到 `NumPy`
