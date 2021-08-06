// 装饰者设计模式：在软件开发过程中，有时想用一些现存的组件。这些组件可能只是完成了一些核心功能。但在不改变其结构的情况下，可以动态地扩展其功能。所有这些都可以釆用装饰器模式来实现。
// 装饰器（Decorator）模式的定义：指在不改变现有对象结构的情况下，动态地给该对象增加一些职责（即增加其额外功能）的模式，它属于对象结构型模式。
// 我：男，24岁，178cm
// 比如 上班的我：敲代码，改BUG，木头人
// 下班的我：会做饭，弹尤克里里，健身
// 这就可以用装饰者来装饰一下我

interface Jian {
  display():void
}

class OriginJian implements Jian{
  display() {
    console.log('男，24岁，178cm');
  }
}
// 装饰器
class Decorator implements Jian{
  jian:Jian
  constructor(jian:Jian) {
    this.jian = jian
  }
  display() {
    this.jian.display()
  }
}

// 在家的我
class HomeJian extends Decorator {
  display() {
    console.log('在家里的时候');
    super.display()
    this.keepFit()
    this.cooking()
    this.ukulele()
  }
  // 健身
  keepFit():void {
    console.log("晚上8点跑步");
  }
  cooking():void {
    console.log("双休煲鸡汤");
  }
  ukulele():void {
    console.log("弹尤克里里");
  }
}

// 工作的我
class BitJian extends Decorator {
  display() {
    console.log('工作的时候');
    super.display()
    this.fixBug()
    this.coding()
    this.thinking()
  }
  // 健身
  fixBug():void {
    console.log("改BUG");
  }
  coding():void {
    console.log("写代码");
  }
  thinking():void {
    console.log("思考人生");
  }
}

(function mainFunc() {
    const jian:Jian = new OriginJian()
    jian.display()
    const homeJian:Jian = new HomeJian(jian)
    homeJian.display()
    const bitJian:Jian = new BitJian(jian)
    bitJian.display()
})()

export {}