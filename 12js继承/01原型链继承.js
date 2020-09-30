// 创建父类
function Super() {
  this.supArr = ['a', 'b']
  this.name = 'super'
}
// 为父类原型添加方法
Super.prototype.sayName = function() {
  console.log(this.name)
}

// 创建子类
function Sub() {
}
// 为子类原型添加方法, 改变子类原型对象后获取不到此方法
Sub.prototype.saySubName1 = function() {
  console.log('saySubName1')
}
// 将子类的原型对象指向父类实例
Sub.prototype = new Super()
// 改变子类原型后，为子类原型添加方法
Sub.prototype.saySubName2 = function() {
  console.log('saySubName2')
}
Sub.prototype.sayArr = function() {
  console.log(this.supArr)
}

// 创建子类实例
let sub1 = new Sub()
let sub2 = new Sub()

// 缺点，1.修改父类引用类型，所有子类实例都会受到影响
// 2.不能实现多继承 3.不能向父类构造函数传参
sub1.name ='aaa'
sub2.name = 'bbb'
sub1.sayName() // aaa
sub2.sayName() // bbb
sub1.supArr.push('c') // ['a', 'b'] -> ['a', 'b', 'c']
sub2.sayArr() // -> ['a', 'b', 'c']

// export {}