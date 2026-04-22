"""Python 生成器与正则示例。

运行方式：
python3 生成器与正则.py
"""

import re


def show(title):
    print(f"\n{title}")
    print("-" * 40)


def get_numbers():
    for i in range(1, 6):
        yield i


def batch_loader(data, batch_size):
    for i in range(0, len(data), batch_size):
        yield data[i:i + batch_size]


class Student:
    def __init__(self):
        self.__name = "张三"

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, value):
        self.__name = value


def main():
    # show("1. yield 生成器")
    # numbers = get_numbers()
    # print(next(numbers))
    # print(next(numbers))
    # for num in numbers:
    #     print(num)

    # show("2. 批量生成数据")
    # data = list(range(1, 11))
    # for batch in batch_loader(data, 3):
    #     print(batch)

    # show("3. property")
    # stu = Student()
    # print(stu.name)
    # stu.name = "李四"
    # print(stu.name)

    # show("4. 正则匹配和搜索")
    # print(re.match(r"\d{3}", "123abc").group())
    # print(re.search(r"python", "i love python").group())

    show("5. 正则替换和分组")
    text = "欢迎关注 python 和 java"
    print(re.sub(r"python|java", "*", text))
    result = re.match(r"(?P<label>qq):(?P<number>\d+)", "qq:123456")
    print(result.group("label"))
    print(result.group("number"))


if __name__ == "__main__":
    main()
