// 原型式函数
function ObjectCreate(sup) {
  function Fn() {}
  Fn.prototype = sup.prototype;
  return new Fn();
}
// 寄生函数
function inherit(sub, sup) {
  var prototype = ObjectCreate(sup); // 创建对象
  prototype.constructor = sub; // 增强对象
  sub.prototype = prototype; // 指定对象
}
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
  Super.call(this, name)
}

// 定义子类原型方法不能在 寄生组合继承操作之前， 因为子类的原型指向被改变了
// Sub.prototype.sayArr = function() {
//   console.log(this.supArr)
// }

// 将子类的原型对象指向父类实例
// Sub.prototype = new Super()
// 不采用上面的方法，采用寄生原型式
inherit(Sub, Super)
// 定义子类原型方法应该在寄生组合继承操作之后
Sub.prototype.sayArr = function() {
  console.log(this.supArr)
}

let sub1 = new Sub('zzj')
let sub2 = new Sub('sjj')

sub1.sayName() // zzj
sub2.sayName()  // sjj
// 在 sub1里push c
sub1.supArr.push('c')
// console.log(sub1)
// console.log(sub2)
// sub2里的arr不会受到影响
sub1.sayArr()
sub2.sayArr() // [ 'a', 'b' ]
// 优点： 完美
// 缺点： 踩的坑有点多， 1.在Object函数中 应该是将父类原型赋值给 中间函数，而不是父类构造函数， 2. 定义子类原型方法应该在寄生组合操作之后
// export {}
