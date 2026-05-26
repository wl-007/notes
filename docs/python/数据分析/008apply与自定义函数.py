"""apply 与自定义函数示例。

运行方式：
python3 008apply与自定义函数.py
"""

import pandas as pd


def show(title):
    print(f"\n{title}")
    print("-" * 40)


def square(x):
    return x * x


def level(row):
    avg = (row["math"] + row["english"]) / 2
    return "A" if avg >= 90 else "B"


def main():
    s = pd.Series([1, 2, 3, 4])

    show("1. Series.apply")
    print(s.apply(square))
    print(s.apply(lambda x: x + 10))

    show("2. DataFrame.apply")
    df = pd.DataFrame(
        {
            "math": [88, 92, 79],
            "english": [90, 85, 95],
        }
    )
    print(df.apply(sum))
    print(df.apply(sum, axis=1))

    show("3. 行级自定义函数")
    df["level"] = df.apply(level, axis=1)
    print(df)


if __name__ == "__main__":
    main()
