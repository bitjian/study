// 创建父类
function Super(name) {
  this.supArr = ['a', 'b']
  this.name = name
}
// 为父类原型添加方法
Super.prototype.sayName = function() {
  console.log(this.name)
}

// 通过 call 或者 apply 调用父类构造函数
function Sub(name) {
  // 第二次调用
  Super.call(this, name)
}
// 将子类的原型对象指向父类实例
// 第一次调用
Sub.prototype = new Super()
Sub.prototype.sayArr = function() {
  console.log(this.supArr)
}

let sub1 = new Sub('zzj')
let sub2 = new Sub('sjj')
sub1.sayName() // zzj
sub2.sayName()  // sjj
// 在 sub1里push c
sub1.supArr.push('c')
// sub2里的arr不会受到影响
sub2.sayArr() // [ 'a', 'b' ]

// 优点： 1.结合了 原型链继承 和构造函数继承，弥补了各自的缺陷
// 缺点： 调用了两次父类构造函数，导致子类实例和原型上都有父类实例上的属性

export {}