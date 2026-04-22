"""Python 网络编程与并发示例。

运行方式：
python3 网络编程与并发.py
"""

import socket
import threading
from pathlib import Path


def show(title):
    print(f"\n{title}")
    print("-" * 40)


BASE_DIR = Path(__file__).resolve().parent
DIST_DIR = BASE_DIR / "dist"


def socket_demo():
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_message = "你好，客户端"
    client_message = "你好，服务器"
    result = {
        "socket_family": client_socket.family,
        "socket_type": client_socket.type,
        "client_send_bytes": client_message.encode("utf-8"),
        "server_send_bytes": server_message.encode("utf-8"),
    }
    result["client_decode"] = result["server_send_bytes"].decode("utf-8")
    result["server_decode"] = result["client_send_bytes"].decode("utf-8")
    client_socket.close()
    return result


def thread_demo():
    values = []
    lock = threading.Lock()

    def worker(name):
        for i in range(3):
            with lock:
                values.append(f"{name}-{i}")

    t1 = threading.Thread(target=worker, args=("A",))
    t2 = threading.Thread(target=worker, args=("B",))
    t1.start()
    t2.start()
    t1.join()
    t2.join()
    return values


class MyFile:
    def __init__(self, path, mode, encoding="utf-8"):
        self.path = path
        self.mode = mode
        self.encoding = encoding
        self.file = None

    def __enter__(self):
        self.file = open(self.path, self.mode, encoding=self.encoding)
        return self.file

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file:
            self.file.close()


def main():
    # show("1. socket 对象和编码解码")
    # socket_result = socket_demo()
    # print("family =", socket_result["socket_family"])
    # print("type =", socket_result["socket_type"])
    # print("客户端发送字节：", socket_result["client_send_bytes"])
    # print("服务端接收后解码：", socket_result["server_decode"])
    # print("服务端发送字节：", socket_result["server_send_bytes"])
    # print("客户端接收后解码：", socket_result["client_decode"])

    show("2. 多线程和互斥锁")
    print(thread_demo())

    # show("3. 自定义上下文管理器")
    # DIST_DIR.mkdir(exist_ok=True)
    # demo_file = DIST_DIR / "context_demo.txt"
    # with MyFile(demo_file, "w") as f:
    #     f.write("这是 with 语句写入的内容")
    # with MyFile(demo_file, "r") as f:
    #     print(f.read())


if __name__ == "__main__":
    main()
