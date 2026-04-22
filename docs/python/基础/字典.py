"""Python 字典示例。

运行方式：
python 字典.py
"""


def show(title):
    print(f"\n{title}")
    print("-" * 40)


# 1. 字典的定义
# show("1. 字典的定义")
# student = {"name": "小明", "age": 18, "score": 95}
# empty_dict = {}
# print(student)
# print(empty_dict)


# # 2. 通过键访问值
# show("2. 通过键访问值")
# print(student["name"])
# print(student["age"])


# # 3. 修改字典内容
# show("3. 修改字典内容")
# print("修改前：", student)
# student["score"] = 100
# print("修改后：", student)


# # 4. 添加键值对
# show("4. 添加键值对")
# student["city"] = "上海"
# student["gender"] = "男"
# print(student)


# # 5. 删除键值对
# show("5. 删除键值对")
# user = {"name": "张三", "age": 20, "city": "北京"}
# print("原字典：", user)

# removed_age = user.pop("age")
# print("pop 删除的值：", removed_age)
# print("pop 后：", user)

# del user["city"]
# print("del 后：", user)


# # 6. 查找和判断
# show("6. 查找和判断")
# info = {"name": "李四", "age": 22, "hobby": "篮球"}
# print(info)
# print("'name' 是否存在：", "name" in info)
# print("'score' 是否存在：", "score" in info)
# print("get 获取存在的键：", info.get("name"))
# print("get 获取不存在的键：", info.get("score"))
# print("get 设置默认值：", info.get("score", 0))


# # 7. 常见方法 keys values items
# show("7. 常见方法")
# book = {"title": "Python 入门", "price": 59, "author": "wl"}
# print("keys：", book.keys())
# print("values：", book.values())
# print("items：", book.items())
# print("长度：", len(book))


# # 8. 遍历字典
# show("8. 遍历字典")
# person = {"name": "王五", "age": 25, "job": "程序员"}

# print("遍历键：")
# for key in person:
#     print(key)

# print("\n遍历值：")
# for value in person.values():
#     print(value)

# print("\n遍历键和值：")
# for key, value in person.items():
#     print(key, "=>", value)


# # 9. update 更新字典
# show("9. update 更新字典")
# dict1 = {"a": 1, "b": 2}
# dict2 = {"b": 20, "c": 30}
# print("更新前：", dict1)
# dict1.update(dict2)
# print("更新后：", dict1)


# # 10. copy 拷贝
# show("10. copy 拷贝")
# config = {"host": "localhost", "port": 3306}
# config_copy = config.copy()
# config["port"] = 3307
# print("原字典：", config)
# print("拷贝字典：", config_copy)


# # 11. 嵌套字典
# show("11. 嵌套字典")
# classroom = {
#     "teacher": "老张",
#     "students": {
#         "s1": "小明",
#         "s2": "小红",
#     },
#     "room": 305,
# }
# print(classroom)
# print("老师：", classroom["teacher"])
# print("1号学生：", classroom["students"]["s1"])


# # 12. 字典推导式
# show("12. 字典推导式")
# squares = {x: x * x for x in range(1, 6)}
# print(squares)


# # 13. 常见易错点
# show("13. 常见易错点")
# demo = {"name": "Python"}
# print("原字典：", demo)

# result = demo.update({"version": 3})
# print("update 的返回值：", result)  # None
# print("update 后：", demo)


# # 14. clear 清空字典
# show("14. clear 清空字典")
# temp = {"x": 1, "y": 2}
# print("清空前：", temp)
# temp.clear()
# print("清空后：", temp)


# # 15. 小练习
# show("15. 小练习")
# product = {
#     "name": "键盘",
#     "price": 199,
#     "count": 3,
# }
# print("商品信息：", product)
# total = product["price"] * product["count"]
# print("总价：", total)
