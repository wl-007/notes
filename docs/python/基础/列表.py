"""Python 列表示例。

运行方式：
python 列表.py
"""


def show(title):
    print(f"\n{title}")
    print("-" * 40)


# 1. 列表的定义
# show("1. 列表的定义")
names = ["张三", "李四", "王五"]
numbers = [10, 20, 30]
mixed = ["Python", 18, 3.14, True]
# print(names)
# print(numbers)
# print(mixed)


# 2. 通过下标访问元素
# show("2. 通过下标访问元素")
# print(names[0])   # 第一个元素
# print(names[1])   # 第二个元素
# print(names[-1])  # 最后一个元素


# # 3. 切片
# show("3. 切片")
# print(numbers[0:2])   # 取前两个
# print(numbers[1:])    # 从下标 1 到末尾
# print(numbers[:2])    # 从开头到下标 2 前
# print(numbers[::-1])  # 反转


# # 4. 修改元素
# show("4. 修改元素")
# scores = [60, 70, 80]
# print("修改前：", scores)
# scores[0] = 100
# print("修改后：", scores)


# # 5. 添加元素
# show("5. 添加元素")
# fruits = ["苹果", "香蕉"]
# print("原列表：", fruits)

# fruits.append("橘子")
# print("append 后：", fruits)

# fruits.insert(1, "葡萄")
# print("insert 后：", fruits)

# fruits.extend(["西瓜", "芒果"])
# print("extend 后：", fruits)


# # 6. 删除元素
# show("6. 删除元素")
# cities = ["北京", "上海", "广州", "深圳", "上海"]
# print("原列表：", cities)

# cities.remove("上海")  # 删除第一个匹配项
# print("remove 后：", cities)

# deleted = cities.pop()  # 默认删除最后一个
# print("pop 删除的元素：", deleted)
# print("pop 后：", cities)

# del cities[0]
# print("del 后：", cities)


# # 7. 查找元素
# show("7. 查找元素")
# letters = ["a", "b", "c", "b", "d"]
# print("列表：", letters)
# print("'b' 是否存在：", "b" in letters)
# print("'x' 是否不存在：", "x" not in letters)
# print("'b' 第一次出现的位置：", letters.index("b"))
# print("'b' 出现次数：", letters.count("b"))
# print("列表长度：", len(letters))


# # 8. 遍历列表
# show("8. 遍历列表")
# students = ["小明", "小红", "小刚"]

# print("for 遍历：")
# for student in students:
#     print(student)

# print("\nwhile 遍历：")
# i = 0
# while i < len(students):
#     print(students[i])
#     i += 1


# # 9. 排序和反转
# show("9. 排序和反转")
# nums = [5, 2, 9, 1, 7]
# print("原列表：", nums)

# nums.sort()
# print("升序排序：", nums)

# nums.sort(reverse=True)
# print("降序排序：", nums)

# nums.reverse()
# print("reverse 后：", nums)


# # 10. 列表拷贝
# show("10. 列表拷贝")
# list_a = [1, 2, 3]
# list_b = list_a          # 指向同一个列表
# list_c = list_a.copy()   # 复制一个新列表

# list_a.append(4)
# print("list_a：", list_a)
# print("list_b：", list_b)
# print("list_c：", list_c)


# # 11. 二维列表
# show("11. 二维列表")
# matrix = [
#     [1, 2, 3],
#     [4, 5, 6],
#     [7, 8, 9],
# ]
# print(matrix)
# print("第一行：", matrix[0])
# print("第二行第三列：", matrix[1][2])


# # 12. 列表推导式
# show("12. 列表推导式")
# squares = [x * x for x in range(1, 6)]
# evens = [x for x in range(1, 11) if x % 2 == 0]
# print("1 到 5 的平方：", squares)
# print("1 到 10 的偶数：", evens)


# # 13. 常见易错点
# show("13. 常见易错点")
# data = [10, 20, 30]
# print("原列表：", data)

# result = data.append(40)
# print("append 的返回值：", result)  # append 返回 None
# print("append 后的列表：", data)


# # 14. 小练习
# show("14. 小练习")
# prices = [19, 28, 35, 12, 8]
# print("商品价格：", prices)
# print("最高价：", max(prices))
# print("最低价：", min(prices))
# print("总价：", sum(prices))
# print("平均价：", sum(prices) / len(prices))


tuple2 = (10, 20, ['aa', 'bb', 'cc'], 50, 30)
print(tuple2[2])  # 访问到列表

# 结果：(10, 20, ['aaaaa', 'bb', 'cc'], 50, 30)
tuple2[2][0] = 'aaaaa'
print(tuple2)