"""Python 字符串常见示例。

运行方式：
python 字符串.py
"""

# 1. 字符串的定义
# name = "Alice"
# city = 'Shanghai'
# message = """这是多行字符串。
# 可以保存多行文本。"""

# print("1. 字符串定义")
# print(name)
# print(city)
# print(message)
# print("-" * 30)


# # 2. 字符串拼接

# first_name = "张"
# last_name = "三"
# full_name = first_name + last_name

# print("2. 字符串拼接")
# print(full_name)
# print("你好，" + full_name)
# print("-" * 30)


# # 3. 重复字符串
# print("3. 重复字符串")
# print("ha" * 3)  # 输出 hahaha
# print("-" * 30)


# # 4. 获取字符串长度
# text = "Python"
# print("4. 获取长度")
# print(len(text))  # 6
# print("-" * 30)


# 5. 索引：通过下标取字符
# 下标从 0 开始，负数表示从后往前数
# print("5. 索引")
# print(text[0])   # 第一个字符：P
# print(text[1])   # 第二个字符：y
# print(text[-1])  # 最后一个字符：n
# print("-" * 30)


# # 6. 切片：取出一部分字符串
# # 格式：字符串[开始:结束:步长]
# print("6. 切片")
# print(text[0:2])   # Py
# print(text[2:])    # thon
# print(text[:4])    # Pyth
# print(text[::2])   # Pto
# print(text[::-1])  # 反转字符串：nohtyP
# print(text[1:5:2]) # 从下标为1开始，取到下标为5的前一个元素，步长为2（不包括结束位本身）
# print("-" * 30)


# # 7. 判断字符串中是否包含某个内容
# sentence = "I love Python"
# print("7. 包含判断")
# print("Python" in sentence)      # True
# print("Java" not in sentence)    # True
# print("-" * 30)


# # 8. 常见字符串方法
# lang = " python is great "
# print("8. 常见方法")
# print(lang.upper())        # 全部转大写
# print(lang.lower())        # 全部转小写
# print(lang.strip())        # 去掉两端空格
# print(lang.replace("python", "Java"))  # 替换内容
# print(lang.strip().split(" "))  # 按空格分割成列表
# print("-" * 30)


# # 9. 查找字符串
# article = "hello python"
# print("9. 查找")
# print(article.find("python"))  # 找到返回下标，找不到返回 -1
# print(article.startswith("he"))  # 是否以 he 开头
# print(article.endswith("on"))    # 是否以 on 结尾
# print("-" * 30)


# # 10. 字符串格式化
# name = "wl"
# age = 18
# print("10. 字符串格式化")

# # 旧写法：%s 和 %d
# print("我叫 %s，今年 %d 岁" % (name, age))

# # format 写法
# print("我叫 {}，今年 {} 岁".format(name, age))

# # # f-string：最常用，推荐
# print(f"我叫{name}，今年{age}岁")
# print("-" * 30)


# # 11. 转义字符
# print("11. 转义字符")
# print("第一行\n第二行")   # \n 表示换行
# print("姓名\t年龄")       # \t 表示制表符
# print("他说：\"你好\"")    # \" 表示双引号
# print("-" * 30)


# # 12. 原始字符串
# # 在字符串前面加 r，可以让反斜杠不再作为转义字符
# path = r"C:\Users\name\Desktop"
# print("12. 原始字符串")
# print(path)
# print("-" * 30)


# 13. 字符串是不可变类型
# 不能直接修改某个位置的字符，只能生成一个新字符串
# word = "hello"
# new_word = "H" + word[1:]
# word = word.replace('h', "a")
# print("13. 不可变")
# print(word)
# print(new_word)
# print("-" * 30)


# # 14. 大小写判断和内容判断
# sample1 = "ABC"
# sample2 = "123"
# sample3 = "abc123"

# print("14. 判断方法")
# print(sample1.isupper())   # 是否全是大写字母
# print(sample2.isdigit())   # 是否全是数字
# print(sample3.isalnum())   # 是否只包含字母和数字
# print("-" * 30)


# # 15. 小练习：统计某个字符出现次数
# demo = "banana"
# print("15. 统计字符次数")
# print(demo.count("a"))  # a 出现了 3 次
