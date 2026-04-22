"""Python 模块 1 示例。

运行方式：
python3 模块1.py
"""


name = "模块1"
price = 19.9


def show_info():
    print(f"这里是{name}")
    print(f"price = {price}")


def add(a, b):
    return a + b


if __name__ == "__main__":
    print("模块1被直接运行")
    show_info()
    print("10 + 20 =", add(10, 20))
