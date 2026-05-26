"""NumPy 入门示例。

运行方式：
python3 002NumPy入门.py
"""

import numpy as np


def show(title):
    print(f"\n{title}")
    print("-" * 40)


def main():
    show("1. 创建数组")
    arr = np.array([1, 2, 3, 4])
    print(arr)

    show("2. 形状和类型")
    matrix = np.arange(12).reshape(3, 4)
    print(matrix)
    print("shape:", matrix.shape)
    print("dtype:", matrix.dtype)

    show("3. 向量化运算")
    print(arr + 10)
    print(arr * 2)
    print(arr > 2)

    show("4. 统计函数")
    print("sum:", arr.sum())
    print("mean:", arr.mean())
    print("max:", arr.max())

    show("5. 矩阵乘法")
    a = np.array([[1, 2], [3, 4]])
    b = np.array([[5, 6], [7, 8]])
    print("逐元素相乘:\n", a * b)
    print("矩阵乘法:\n", a @ b)


if __name__ == "__main__":
    main()
