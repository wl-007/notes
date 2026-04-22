"""Python 函数示例。

运行方式：
python 函数.py
"""


def show(title):
    print(f"\n{title}")
    print("-" * 40)


# 1. 最简单的函数
show("1. 最简单的函数")


# def say_hello():
#     print("你好，欢迎学习 Python 函数")


# say_hello()


# # 2. 函数的重复调用
# show("2. 函数的重复调用")
# say_hello()
# say_hello()


# # 3. 带参数的函数
# show("3. 带参数的函数")


# def greet(name):
#     print(f"你好，{name}")


# greet("小明")
# greet("小红")


# # 4. 多个参数
# show("4. 多个参数")


# def introduce(name, age):
#     print(f"我叫{name}，今年{age}岁")


# introduce("张三", 18)


# # 5. 返回值
# show("5. 返回值")


# def add(a, b):
#     return a + b


# result = add(10, 20)
# print("结果：", result)


# # 6. 返回多个值
# show("6. 返回多个值")


# def get_user():
#     return "李四", 20


# name, age = get_user()
# print("姓名：", name)
# print("年龄：", age)


# # 7. 默认参数
# show("7. 默认参数")


# def register(name, city="上海"):
#     print(f"{name} 来自 {city}")


# register("王五")
# register("赵六", "北京")


# # 8. 关键字参数
# show("8. 关键字参数")


# def student_info(name, age, score):
#     print(f"name={name}, age={age}, score={score}")


# student_info(name="小刚", age=19, score=96)
# student_info("小美", score=98, age=20)


# # 9. 可变位置参数 *args
# show("9. 可变位置参数 *args")


# def total_sum(*args):
#     print("接收到的参数：", args)
#     print("总和：", sum(args))


# total_sum(1, 2, 3)
# total_sum(10, 20, 30, 40)


# # 10. 可变关键字参数 **kwargs
show("10. 可变关键字参数 **kwargs")


# def print_user(**kwargs):
#     print("接收到的数据：", kwargs)


# print_user(name="小明", age=18, city="杭州")


# # 11. 函数嵌套调用
# show("11. 函数嵌套调用")


# def buy():
#     return 3


# def calc(price, count):
#     return price * count


# count = buy()
# money = calc(15, count)
# print("总价：", money)


# # 12. 局部变量和全局变量
# show("12. 局部变量和全局变量")
# num = 100


# def test_scope():
#     local_num = 50
#     print("函数内部的局部变量：", local_num)
#     print("函数内部访问全局变量：", num)


# test_scope()
# print("函数外部访问全局变量：", num)


# # 13. 修改全局变量
# show("13. 修改全局变量")
# count = 0


# def change_count():
#     global count
#     count = 10
#     print("函数内部 count：", count)


# change_count()
# print("函数外部 count：", count)


# # 14. 匿名函数 lambda
# show("14. 匿名函数 lambda")
# multiply = lambda a, b: a * b
# print("lambda 结果：", multiply(3, 5))


# # 15. 把函数当参数传递
# show("15. 把函数当参数传递")


# def compute(a, b, fn):
#     print("计算结果：", fn(a, b))


# compute(10, 5, add)
# compute(10, 5, lambda x, y: x - y)


# # 16. 小练习：求三个数最大值
show("16. 小练习：求三个数最大值")


def max_of_three(a, b, c):
    return max(a, b, c)


print(max_of_three(8, 15, 12))
