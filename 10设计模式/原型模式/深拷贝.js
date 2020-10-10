// 原型模式，object.create就是原型模式的实现
// js的继承都是通过原型链实现的
// 一个简单的深拷贝
function deepCope(value) {
  // 判断传入的对象是否是值类型
  if (typeof value !== 'object' || value === null) {
    return value
  }
  // 否则是引用类型
  let obj = {}
  if (value.constructor === Array) {
    obj = []
  }
  for (let key in value) {
    // 取出原型上的属性
    if (value.hasownProperty(key)) {
      obj[key] = deepCope(value[key])
    }
  }
  return obj
}