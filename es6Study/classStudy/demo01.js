class A {
  x = 1
  print() {
    console.log(this.x)
  }
}

class B extends A{
  constructor() {
    super()
    this.x = 2
    super.x =5  // 改变的是子类实例的x
    super.y = 10
    console.log(this.x, this.y, super.x,super.y)
  }
  m() {
    super.print()
  }
}

let b = new B()

b.print()  // 2

// b.m() // 2 子类通过super调用的方法,方法里的this指向子类的实例

