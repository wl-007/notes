"""DataFrame 入门示例。

运行方式：
python3 004DataFrame入门.py
"""

import pandas as pd


def show(title):
    print(f"\n{title}")
    print("-" * 40)


def main():
    df = pd.DataFrame(
        {
            "name": ["Ada", "Bob", "Cindy"],
            "country": ["CN", "US", "CN"],
            "score": [91, 87, 95],
        }
    )

    show("1. 查看数据概况")
    print(df)
    print("shape:", df.shape)
    print("columns:", list(df.columns))
    print("dtypes:\n", df.dtypes)

    show("2. 按列取数据")
    print(df["name"])
    print(df[["name", "score"]])

    show("3. 按行取数据")
    print(df.loc[1])
    print(df.iloc[:2])

    show("4. 分组统计")
    print(df.groupby("country")["score"].mean())


if __name__ == "__main__":
    main()
