"""Matplotlib 绘图示例。

运行方式：
python3 012Matplotlib绘图.py
"""

import matplotlib

matplotlib.use("Agg")

import matplotlib.pyplot as plt


def main():
    x = [1, 2, 3, 4]
    y = [10, 15, 12, 18]

    plt.figure(figsize=(6, 4))
    plt.plot(x, y, marker="o")
    plt.title("Sales Trend")
    plt.xlabel("Day")
    plt.ylabel("Sales")
    plt.tight_layout()
    plt.savefig("012_matplotlib_demo.png")
    print("已生成图片: 012_matplotlib_demo.png")


if __name__ == "__main__":
    main()
