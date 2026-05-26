"""数据组合示例。

运行方式：
python3 006数据组合.py
"""

import pandas as pd


def show(title):
    print(f"\n{title}")
    print("-" * 40)


def main():
    df1 = pd.DataFrame({"name": ["Ada", "Bob"], "score": [95, 88]})
    df2 = pd.DataFrame({"name": ["Cindy"], "score": [91]})

    show("1. concat 按行拼接")
    print(pd.concat([df1, df2], ignore_index=True))

    show("2. concat 按列拼接")
    left = pd.DataFrame({"name": ["Ada", "Bob"]})
    right = pd.DataFrame({"city": ["上海", "北京"]})
    print(pd.concat([left, right], axis=1))

    show("3. merge 按键合并")
    orders = pd.DataFrame({"user_id": [1, 2, 1], "amount": [100, 200, 150]})
    users = pd.DataFrame({"user_id": [1, 2], "name": ["Ada", "Bob"]})
    print(pd.merge(orders, users, on="user_id", how="left"))


if __name__ == "__main__":
    main()
