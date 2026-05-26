"""datetime 数据类型示例。

运行方式：
python3 011datetime数据类型.py
"""

import pandas as pd


def show(title):
    print(f"\n{title}")
    print("-" * 40)


def main():
    df = pd.DataFrame(
        {
            "date": pd.date_range("2024-01-01", periods=10, freq="D"),
            "count": [1, 3, 2, 5, 4, 6, 3, 2, 1, 4],
        }
    )

    show("1. 转换和索引")
    df["date"] = pd.to_datetime(df["date"])
    df = df.set_index("date")
    print(df.head())

    show("2. 按日期切片")
    print(df.loc["2024-01-01":"2024-01-04"])

    show("3. 重采样")
    print(df.resample("W").sum())


if __name__ == "__main__":
    main()
