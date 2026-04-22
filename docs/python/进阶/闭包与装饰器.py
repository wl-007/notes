"""Python 闭包与装饰器示例。

运行方式：
python3 闭包与装饰器.py
"""

from functools import wraps


def show(title):
    print(f"\n{title}")
    print("-" * 40)


def make_counter():
    count = 0

    def inner():
        nonlocal count
        count += 1
        print("当前计数：", count)

    return inner


def curry(fn, expected_args=None):
    if expected_args is None:
        expected_args = fn.__code__.co_argcount

    def curried(*args):
        if len(args) >= expected_args:
            return fn(*args)

        def next_curried(*next_args):
            return curried(*(args + next_args))

        return next_curried

    return curried


def multiply(a, b, c):
    return a * b * c



        

def log(fn):
    @wraps(fn)
    def inner(*args, **kwargs):
        print(f"开始执行：{fn.__name__}")
        result = fn(*args, **kwargs)
        print(f"执行结束：{fn.__name__}")
        return result

    return inner


def tag(symbol):
    def decorator(fn):
        @wraps(fn)
        def inner(*args, **kwargs):
            print(f"[{symbol}] 调用前")
            result = fn(*args, **kwargs)
            print(f"[{symbol}] 调用后")
            return result

        return inner

    return decorator


@log
def add(a, b):
    return a + b


@tag("VIP")
def comment(text):
    print("发表评论：", text)


def main():
    show("1. 闭包保存状态")
    counter = make_counter()
    counter()
    counter()
    counter()

    # show("2. 科里化函数")
    # curried_multiply = curry(multiply)
    # print("multiply(2)(3)(4) =", curried_multiply(2)(3)(4))
    # print("multiply(2, 3)(4) =", curried_multiply(2, 3)(4))

    # show("2. 通用装饰器")
    # print("结果：", add(10, 20))

    # show("3. 带参数的装饰器")
    # comment("这节课很好理解")


if __name__ == "__main__":
    main()
