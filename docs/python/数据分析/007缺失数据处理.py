"""缺失数据处理示例。

运行方式：
python3 007缺失数据处理.py
"""

import pandas as pd


def show(title):
    print(f"\n{title}")
    print("-" * 40)


def main():
    df = pd.DataFrame(
        {
            "name": ["Ada", "Bob", "Cindy"],
            "age": [18, None, 20],
            "score": [95, 88, None],
        }
    )

    show("1. 检测缺失值")
    print(df.isna())
    print(df.isna().sum())

    show("2. 删除缺失值")
    print(df.dropna())

    show("3. 填充缺失值")
    filled = df.copy()
    filled["age"] = filled["age"].fillna(filled["age"].mean())
    filled["score"] = filled["score"].fillna(0)
    print(filled)


if __name__ == "__main__":
    main()
