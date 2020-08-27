// JSON.parse(JSON.stringify()) 会忽略 undefined symbol 函数， 不能解决循环引用， 不能处理正则、new Date()
// WeakMap 的键只能是对象， 不能查看 size
function deepCopy(target, map = new WeakMap()) {
  // null, Array, Objec 都为 object
  // 判断是 array\Object 还是基本类型
  if(typeof target === 'object' && target !== null) {
    let cloneTarget = Array.isArray(target) ? [] : {}
    // 如果存在相同对象，就直接返回了
    if(map.get(target)) {
      console.log(target)
      return target
    }
    map.set(target, cloneTarget)
    for(key in target) {
      if(target.hasOwnProperty(key))
      cloneTarget[key] = deepCopy(target[key], map)
    }
    return cloneTarget
  }else {
    // 是基本类型直接返回值
    return target
  }
}
let d = {a:123}
let c = function() { this.k = 'kkk'}
c.prototype.i = '55555'
let o = new c()
let a = {a: d,b: d, o, d}
a.i = '555'
let b = [2,[3],[4]]
let e = null
console.log(deepCopy(a))