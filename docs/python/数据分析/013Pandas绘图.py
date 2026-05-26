"""Pandas 绘图示例。

运行方式：
python3 013Pandas绘图.py
"""

import matplotlib

matplotlib.use("Agg")

import matplotlib.pyplot as plt
import pandas as pd


def main():
    df = pd.DataFrame(
        {
            "month": ["1月", "2月", "3月"],
            "sales": [100, 120, 90],
            "profit": [20, 35, 18],
        }
    )

    ax = df.plot(x="month", y=["sales", "profit"], kind="bar", figsize=(6, 4))
    ax.set_title("Monthly Overview")
    ax.set_ylabel("Amount")
    plt.tight_layout()
    plt.savefig("013_pandas_plot_demo.png")
    print("已生成图片: 013_pandas_plot_demo.png")


if __name__ == "__main__":
    main()
