function Super(name) {
  this.name = name
  this.supArr = ['a', 'b']
}
// 为父类原型添加方法,通过构造函数继承，子类并不能获取到父类的原型
// Super.prototype.sayName = function() {
//   console.log(this.name)
// }
// Super.prototype.sayArr = function() {
//   console.log(this.supArr)
// }

// 通过 call 或者 apply 调用父类构造函数
function Sub(name) {
    Super.call(this, name)
}
Sub.prototype.sayName = function() {
  console.log(this.name)
}
Sub.prototype.sayArr = function() {
  console.log(this.supArr)
}
let sub1 = new Sub('zzj')
let sub2 = new Sub('sjj')
sub1.sayName()
sub2.sayName()
// 在 sub1里push c
sub1.supArr.push('c')
// sub2里的arr不会受到影响
sub2.sayArr()

// 优点：1.可以向父类构造函数传参， 2. 引用类型不会受到其他实例的影响
// 缺点： 1. 定义的方法不能复用，每个实例都会重新声明原型上的方法

export {}



