// 原型式继承，就是基于已有对象，创建一个新对象和Object.create类似
// 创建父类
function Object(sup) {
  // 创建一个中间函数
  function Fn() {}
  // 将函数的原型指向sup
  Fn.prototype = sup
  // 返回函数的实例
  return new Fn()
}

let person = {
  name: 'super',
  arr: ['a', 'b'],
  sayName() {
    console.log(this.name)
  },
  sayArr() {
    console.log(this.arr)
  }
};
let newObj = Object(person)
let newObj2 = Object(person)
newObj.name = 'newObj'
newObj2.name = 'newObj2'
newObj2.sayName() // newObj2
newObj.sayName() // newObj
// 修改 newObj里的数组会影响到其他实例
newObj.arr.push('c') 
newObj2.sayArr() // [ 'a', 'b', 'c' ]

// 缺点和原型链继承一样

export {}