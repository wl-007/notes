"""Python 数据结构与算法示例。

运行方式：
python3 数据结构与算法.py
"""


def show(title):
    print(f"\n{title}")
    print("-" * 40)


class SingleNode:
    def __init__(self, item):
        self.item = item
        self.next = None


class SingleLinkedList:
    def __init__(self):
        self.head = None

    def append(self, item):
        new_node = SingleNode(item)
        if self.head is None:
            self.head = new_node
            return

        cur = self.head
        while cur.next is not None:
            cur = cur.next
        cur.next = new_node

    def travel(self):
        items = []
        cur = self.head
        while cur is not None:
            items.append(cur.item)
            cur = cur.next
        return items


def bubble_sort(nums):
    nums = nums.copy()
    for i in range(len(nums) - 1):
        for j in range(len(nums) - 1 - i):
            if nums[j] > nums[j + 1]:
                nums[j], nums[j + 1] = nums[j + 1], nums[j]
    return nums


def quick_sort(nums):
    if len(nums) <= 1:
        return nums
    pivot = nums[0]
    left = [x for x in nums[1:] if x <= pivot]
    right = [x for x in nums[1:] if x > pivot]
    return quick_sort(left) + [pivot] + quick_sort(right)


def binary_search(nums, target):
    left = 0
    right = len(nums) - 1

    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] > target:
            right = mid - 1
        else:
            left = mid + 1
    return -1


def main():
    show("1. 单向链表")
    linked_list = SingleLinkedList()
    linked_list.append("A")
    linked_list.append("B")
    linked_list.append("C")
    print(linked_list.travel())

    show("2. 冒泡排序")
    nums = [5, 2, 8, 1, 3]
    print(bubble_sort(nums))

    show("3. 快速排序")
    print(quick_sort(nums))

    show("4. 二分查找")
    sorted_nums = quick_sort(nums)
    print("索引：", binary_search(sorted_nums, 3))


if __name__ == "__main__":
    main()
