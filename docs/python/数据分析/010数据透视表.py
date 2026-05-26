"""数据透视表示例。

运行方式：
python3 010数据透视表.py
"""

import pandas as pd


def show(title):
    print(f"\n{title}")
    print("-" * 40)


def main():
    sales = pd.DataFrame(
        {
            "region": ["华东", "华东", "华北", "华北"],
            "channel": ["线上", "线下", "线上", "线下"],
            "amount": [120, 90, 150, 80],
        }
    )

    show("1. 基本透视表")
    table = pd.pivot_table(
        sales,
        index="region",
        columns="channel",
        values="amount",
        aggfunc="sum",
    )
    print(table)

    show("2. 多统计指标")
    table2 = pd.pivot_table(
        sales,
        index="region",
        values="amount",
        aggfunc=["sum", "mean", "count"],
    )
    print(table2)


if __name__ == "__main__":
    main()
