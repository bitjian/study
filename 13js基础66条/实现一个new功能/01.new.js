// new的实现主要就是
// 创建一个临时对象， 将临时对象的 __proto__ 指向 对应对象的 prototype 然后返回临时对象
// 使用new关键词可以少做四件事

// 1.不用创建临时对象
// 2.不用绑定原型
// 3.不用return临时对象
// 4.不用给原型想名字了 obj.prototype = {属性1：value,属性2：value2}
// 
let obj = {}
// 对象的原型
obj.prototype = {
    name: '',
    type: 'human'  
}
const objFactory = function(name) {
  // 临时对象
  let _obj = {}
  // 将临时对象的原型指向 对象的原型
  _obj.__proto__ = obj.prototype
  _obj.name = name
  // 返回临时对象
  return _obj
}
// new 实现
function ObjCreate(name) {
  this.name = name
}
ObjCreate.prototype = {
  type:'human'
}
const o1 = new ObjCreate('zzj')
// new 的操作其实给prototype 增加了一个 constructor 属性
 ObjCreate.prototype = {
  constructor: ObjCreate,
  type:'human'
}


export {}

