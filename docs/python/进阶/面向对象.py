"""Python 面向对象示例。

运行方式：
python3 面向对象.py
"""


def show(title):
    print(f"\n{title}")
    print("-" * 40)


class Animal:
    count = 0

    def __init__(self, name):
        self.name = name
        Animal.count += 1

    def speak(self):
        pass

    @classmethod
    def show_count(cls):
        print("当前对象数量：", cls.count)

    @staticmethod
    def is_animal(obj):
        return isinstance(obj, Animal)


class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)
        self.breed = breed

    def speak(self):
        print(f"{self.name} 在汪汪叫")

    def __str__(self):
        return f"Dog(name={self.name}, breed={self.breed})"


class Cat(Animal):
    def speak(self):
        print(f"{self.name} 在喵喵叫")


def make_noise(animal):
    animal.speak()


def main():
    show("1. 类和对象")
    dog = Dog("旺财", "柴犬")
    print(dog)
    print("name =", dog.name)
    print("breed =", dog.breed)

    show("2. 继承和 super")
    dog.speak()

    show("3. 多态")
    cat = Cat("咪咪")
    make_noise(dog)
    make_noise(cat)

    show("4. 类方法和静态方法")
    Animal.show_count()
    print("dog 是 Animal 吗：", Animal.is_animal(dog))


if __name__ == "__main__":
    main()
