const val = 'global'
const o1 = {
  val: 'o1',
  fun: function() {
    return this.val
  }
}

console.log(o1.fun())

const o2 = {
  val: 'o2',
  fun: o1.fun
}
const fun = o2.fun
console.log(o2.fun(),fun())