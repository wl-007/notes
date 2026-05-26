"""Pandas 数据结构示例。

运行方式：
python3 003Pandas数据结构.py
"""

import pandas as pd


def show(title):
    print(f"\n{title}")
    print("-" * 40)


def main():
    show("1. Series")
    s = pd.Series([88, 92, 95], index=["语文", "数学", "英语"])
    print(s)
    print("index:", list(s.index))
    print("values:", s.values)

    show("2. DataFrame")
    df = pd.DataFrame(
        {
            "name": ["Ada", "Bob", "Cindy"],
            "age": [18, 20, 19],
            "score": [91, 87, 95],
        }
    )
    print(df)

    show("3. loc 和布尔索引")
    print(df.loc[0])
    print(df[df["score"] >= 90])

    show("4. 修改列")
    df["level"] = ["A", "B", "A"]
    df = df.rename(columns={"score": "math_score"})
    print(df)


if __name__ == "__main__":
    main()
