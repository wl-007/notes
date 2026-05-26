"""数据分组示例。

运行方式：
python3 009数据分组.py
"""

import pandas as pd


def show(title):
    print(f"\n{title}")
    print("-" * 40)


def main():
    tips = pd.DataFrame(
        {
            "sex": ["Female", "Female", "Male", "Male"],
            "time": ["Lunch", "Dinner", "Lunch", "Dinner"],
            "total_bill": [12.5, 35.6, 18.0, 40.2],
            "tip": [2.5, 5.0, 3.0, 6.5],
        }
    )

    show("1. 单字段分组")
    print(tips.groupby("sex")["tip"].mean())

    show("2. 多聚合函数")
    print(tips.groupby("time")["total_bill"].agg(["mean", "max", "min"]))

    show("3. transform")
    tips["group_mean_tip"] = tips.groupby("sex")["tip"].transform("mean")
    print(tips)


if __name__ == "__main__":
    main()
