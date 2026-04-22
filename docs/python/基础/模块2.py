"""Python 模块 2 示例。

运行方式：
python3 模块2.py
"""


city = "上海"


def greet(name):
    print(f"你好，{name}")


def multiply(a, b):
    return a * b


if __name__ == "__main__":
    print("模块2被直接运行")
    greet("小明")
    print("6 * 8 =", multiply(6, 8))
