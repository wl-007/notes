"""Python 文件操作示例。

运行方式：
python 文件.py
"""

from pathlib import Path
import json
import shutil


def show(title):
    print(f"\n{title}")
    print("-" * 40)


# 脚本自己的 dist 目录
BASE_DIR = Path(__file__).resolve().parent
DIST_DIR = BASE_DIR / "dist"


def main():
    show("1. 创建 dist 目录")
    DIST_DIR.mkdir(exist_ok=True)
    print("dist 目录：", DIST_DIR)

    # show("2. 写入文本文件")
    note_file = DIST_DIR / "demo.txt"
    # note_file.write_text("第一行：你好，Python 文件操作\n", encoding="utf-8")
    # print("已写入：", note_file)

    # show("3. 追加内容")
    # with note_file.open("a", encoding="utf-8") as f:
    #     f.write("第二行：这是追加进去的内容\n")
    #     f.write("第三行：文件可以继续写入\n")
    # print("追加完成")

    # show("4. 读取文件内容")
    # content = note_file.read_text(encoding="utf-8")
    # print(content)

    # show("5. 按行读取")
    # with note_file.open("r", encoding="utf-8") as f:
    #     for index, line in enumerate(f, start=1):
    #         print(f"第 {index} 行：{line.strip()}")

    # show("6. 写入 JSON 文件")
    user_file = DIST_DIR / "user.json"
    # user_data = {
    #     "name": "wl",
    #     "age": 18,
    #     "skills": ["Python", "文件操作"],
    # }
    # user_file.write_text(
    #     json.dumps(user_data, ensure_ascii=False, indent=2),
    #     encoding="utf-8",
    # )
    # print("已写入：", user_file)

    # show("7. 读取 JSON 文件")
    # loaded_user = json.loads(user_file.read_text(encoding="utf-8"))
    # print(loaded_user)

    # show("8. 文件是否存在")
    # print(note_file.exists())
    # print(user_file.exists())

#     show("9. 获取文件信息")
#     print("文件名：", note_file.name)
#     print("后缀：", note_file.suffix)
#     print("绝对路径：", note_file.resolve())
#     print("文件大小：", note_file.stat().st_size, "字节")

    # show("10. 复制文件")
    # copy_file = DIST_DIR / "demo_copy.txt"
    # shutil.copy(note_file, copy_file)
    # print("复制到：", copy_file)

    # show("11. 重命名文件")
    # renamed_file = DIST_DIR / "demo_renamed.txt"
    # if renamed_file.exists():
    #     renamed_file.unlink()
    # copy_file.rename(renamed_file)
    # print("重命名后：", renamed_file)

#     show("12. 列出 dist 目录内容")
    # for path in DIST_DIR.iterdir():
    #     print(path.name)

    show("13. 删除文件")
    temp_file = DIST_DIR / "temp.txt"
    temp_file.write_text("这是一个临时文件", encoding="utf-8")
    print("创建临时文件：", temp_file.name)
    temp_file.unlink()
    print("已删除临时文件：", temp_file.name)


if __name__ == "__main__":
    main()
