"""Python 数据分析简介与环境搭建示例。

运行方式：
python3 001Python数据分析简介与环境搭建.py
"""

import platform

import pandas as pd


def main():
    print("Python 数据分析环境检查")
    print("-" * 40)
    print("系统:", platform.system(), platform.release())
    print("pandas 版本:", pd.__version__)

    scores = pd.DataFrame(
        {
            "name": ["张三", "李四", "王五"],
            "math": [88, 92, 79],
            "english": [90, 85, 95],
        }
    )
    scores["avg"] = scores[["math", "english"]].mean(axis=1)

    print("\n最小数据分析示例")
    print("-" * 40)
    print(scores)


if __name__ == "__main__":
    main()
