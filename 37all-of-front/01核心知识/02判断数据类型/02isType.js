// js原生的typeof使用限制太大 ，自己编写一个isType 加强版typeOf功能
// 通过Object.prototype.toString 来判断该对象是什么类型
// 映射变量
let class2Type = {}
let toString = Object.prototype.toString
"Boolean Number String Function Array Date RegExp Object Error Null Undefined".split(" ").map(item => {
  // 遍历并形成映射 如 [object Boolean] = boolean
  class2Type[`[object ${item}]`] = item.toLowerCase()
})

let isType = (obj) => {
  return typeof obj === 'object' || typeof obj === 'function'
    ? class2Type[toString.call(obj)] || 'object' : typeof obj
}

console.log(isType(undefined),isType(123), isType(new Date()))
// 已经可以进行大部分对象的判断 但是注意，在 IE6 !!!! 中，null 和 undefined 会被 Object.prototype.toString 识别成 [object Object]！

// 针对ie6进行改造
let isType2 = (obj) => {
  // null + '' = 'null'
  //  undefined + '' = 'undefined'
  if(obj == null) {
    obj = obj + ''
  }
  return typeof obj === 'object' || typeof obj === 'function'
    ? class2Type[toString.call(obj)] || 'object' : typeof obj
}

