"""Python 模块使用示例。

运行方式：
python3 模块.py
"""


def show(title):
    print(f"\n{title}")
    print("-" * 40)


import 模块1
import 模块2 as m2
from 模块1 import add
from 模块2 import city


def main():
    show("1. import 导入整个模块")
    模块1.show_info()
    print("模块1中的 name：", 模块1.name)

    show("2. 使用模块中的函数")
    print("add(3, 5) =", add(3, 5))
    print("multiply(4, 6) =", m2.multiply(4, 6))

    show("3. 使用 as 起别名")
    m2.greet("小红")
    print("模块2中的 city：", city)

    show("4. __name__ 的作用")
    print("当前文件作为主程序运行")
    print("__name__ =", __name__)
    print("导入模块1时，不会执行它的测试代码")


if __name__ == "__main__":
    main()
