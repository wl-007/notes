"""Pandas 数据分析入门示例。

运行方式：
python3 005Pandas数据分析入门.py
"""

import pandas as pd


def show(title):
    print(f"\n{title}")
    print("-" * 40)


def main():
    movie = pd.DataFrame(
        {
            "title": ["A", "B", "C", "D"],
            "year": [2022, 2022, 2023, 2023],
            "score": [8.1, 8.5, 9.0, 8.7],
            "budget": [10, 30, 25, 15],
        }
    )

    show("1. describe 和 info")
    print(movie.describe(include="all"))
    movie.info()

    show("2. 排序和筛选")
    print(movie.sort_values("score", ascending=False))
    print(movie.nlargest(2, "score"))
    print(movie.nsmallest(2, "budget"))

    show("3. 每年分数最高的电影")
    result = (
        movie.sort_values(["year", "score"], ascending=[True, False])
        .drop_duplicates(subset=["year"])
    )
    print(result)


if __name__ == "__main__":
    main()
