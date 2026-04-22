"""Python 学生管理系统与拷贝示例。

运行方式：
python3 学生管理系统与拷贝.py
"""

import copy


def show(title):
    print(f"\n{title}")
    print("-" * 40)


class Student:
    def __init__(self, name, age, gender, mobile, desc):
        self.name = name
        self.age = age
        self.gender = gender
        self.mobile = mobile
        self.desc = desc

    def __str__(self):
        return (
            f"姓名：{self.name}，年龄：{self.age}，性别：{self.gender}，"
            f"手机号：{self.mobile}，备注：{self.desc}"
        )


class StudentCMS:
    def __init__(self):
        self.students = []

    def add_student(self, student):
        self.students.append(student)

    def search_student(self, name):
        for student in self.students:
            if student.name == name:
                return student
        return None

    def update_mobile(self, name, new_mobile):
        student = self.search_student(name)
        if student:
            student.mobile = new_mobile

    def delete_student(self, name):
        student = self.search_student(name)
        if student:
            self.students.remove(student)

    def show_all(self):
        for student in self.students:
            print(student)


def main():
    show("1. 学生管理系统基本操作")
    cms = StudentCMS()
    cms.add_student(Student("张三", 18, "男", "13800000001", "班长"))
    cms.add_student(Student("李四", 19, "女", "13800000002", "学习委员"))
    cms.show_all()

    show("2. 查询和修改")
    print("查询结果：", cms.search_student("张三"))
    cms.update_mobile("张三", "13912345678")
    print("修改后：", cms.search_student("张三"))

    show("3. 对象转字典")
    student = cms.search_student("李四")
    print(student.__dict__)

    show("4. 浅拷贝和深拷贝")
    data1 = ["python", ["闭包", "装饰器"]]
    data2 = copy.copy(data1)
    data3 = copy.deepcopy(data1)

    data2[1][0] = "生成器"
    print("原数据：", data1)
    print("浅拷贝：", data2)
    print("深拷贝：", data3)

    show("5. 删除学生")
    cms.delete_student("张三")
    cms.show_all()


if __name__ == "__main__":
    main()
