function Object(o) {
  function F() {}
  F.prototype = o.prototype;
  return new F();
}

function inheritPrototype(subType,SuperType) {
  var prototype = Object(SuperType); // 创建对象
  prototype.constructor = subType; // 增强对象
  subType.prototype = prototype; // 指定对象
}

function SuperType(name) {
  this.name = name;
  this.colors = ["red","blue","green"]
}
SuperType.prototype.sayName = function() {
  console.log(this.name);
}

function SubType(name,age) {
  SuperType.call(this,name);
  this.age = age;
}
// 寄生组合
inheritPrototype(SubType,SuperType);
// 不能直接将子类原型对象 指向 父类原型, 否则修改子类实例的原型方法会改变其他实例
// SubType.prototype = SuperType.prototype

SubType.prototype.sayAge = function() {
  console.log(this.age);
}
// let middle = Object(SuperType)
// console.log(middle)
// SubType.prototype = middle
// middle.constructor = SubType


let subType1 = new SubType('zzj', 22)
let subType2 = new SubType('sjj', 23)
// console.log(subType1.prototype)
subType1.sayAge()

export {}