"""Python 异常处理示例。

运行方式：
python 异常.py
"""


def show(title):
    print(f"\n{title}")
    print("-" * 40)


# 1. 不处理异常时，程序会直接报错并停止
# show("1. 不处理异常")
# print(10 / 0)  # ZeroDivisionError


# # 2. 最基础的 try except
# show("2. try except")
# try:
#     result = 10 / 0
#     print(result)
# except:
#     print("发生了异常")


# # 3. 捕获指定异常
# show("3. 捕获指定异常")
# try:
#     numbers = [10, 20, 30]
#     print(numbers[5])
# except IndexError:
#     print("下标超出范围")


# # 4. 同时捕获多个异常
# show("4. 同时捕获多个异常")
# try:
#     print(int("abc"))
# except (ValueError, TypeError):
#     print("数据类型不正确")


# # 5. 获取异常对象
# show("5. 获取异常信息")
# try:
#     print(1 / 0)
# except ZeroDivisionError as error:
#     print("异常类型：", type(error).__name__)
#     print("异常信息：", error)


# # 6. else：没有异常时才执行
# show("6. else 的使用")
# try:
#     num = int("18")
# except ValueError:
#     print("转换失败")
# else:
#     print("转换成功：", num)


# # 7. finally：有没有异常都会执行
# show("7. finally 的使用")
# file = None
# try:
#     file = open("demo.txt", "r", encoding="utf-8")
# except FileNotFoundError:
#     print("文件不存在")
# finally:
#     print("finally 一定会执行")
#     if file:
#         file.close()


def divide(a, b):
    if b == 0:
        raise ValueError("除数不能为 0")
    return a / b


class AgeError(Exception):
    """年龄不合法时抛出的异常。"""


def check_age(age):
    if age < 0 or age > 120:
        raise AgeError("年龄必须在 0 到 120 之间")
    return f"年龄 {age} 合法"


def main():
    show("8. raise 主动抛出异常")
    try:
        print(divide(10, 2))
        print(divide(10, 0))
    except ValueError as error:
        print("捕获到异常：", error)

    show("9. 自定义异常")
    try:
        print(check_age(18))
        print(check_age(150))
    except AgeError as error:
        print("捕获到异常：", error)

    show("10. 综合示例：try except else finally")
    samples = ["20", "abc", "0", "5"]
    for text in samples:
        try:
            num = int(text)
            result = 100 / num
        except ValueError:
            print(f"{text} 不是数字")
        except ZeroDivisionError:
            print("除数不能为 0")
        else:
            print(f"100 / {num} = {result}")
        finally:
            print(f"本次处理结束：{text}")


if __name__ == "__main__":
    main()
