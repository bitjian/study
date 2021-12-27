//实现一个完整的new功能
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.type = "灵长类"

const ObjFactory= function() {
  // 创建一个临时对象
  let obj = new Object()
  // 获取原始对象的prototype
  const Constructor = [].shift.call(arguments)
  // 将临时对象的__proto__ 指向原来对象的 prototype
  obj.__proto__ = Constructor.prototype
  // 或者 obj = Object.create(Constructor.prototype)
  // 调用构造函数方法 并传递其他参数
  const ret = Constructor.call(obj, arguments)
  // 返回临时对象
  return typeof ret === "object" ? ret : obj

}