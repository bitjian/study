// 有这么一个求和函数dynamicAdd()，接受任意个参数。
function dynamicAdd() {
  return [...arguments].reduce((prev, curr) => {
    return prev + curr
  }, 0)
}
// 函数柯里化
function curry(fn, firstArg) {
  // 返回一个新函数
  return function() {
    // 新函数调用时会继续传参
    var restArgs = [].slice.call(arguments)
    console.log(arguments)
    // 参数合并，通过apply调用原函数
    return fn.apply(this, [firstArg, ...restArgs])
  }
}

// 柯里化，预置参数10
var add10 = curry(dynamicAdd, 10)
// 此时的add10为下面的函数， 还未开始求值
// function() {
//   // 新函数调用时会继续传参
//   var restArgs = [].slice.call(arguments)
//   console.log(arguments)
//   // 参数合并，通过apply调用原函数
//   return dynamicAdd.apply(this, [10, ...restArgs])
// }
// 也可以对一个已经柯里化的函数add10继续柯里化，此时预置参数10即可
var anotherAdd20 = curry(add10, 10);
// 此时的anotherAdd20为下面的函数，还未开始求值
// function() {
//   // 新函数调用时会继续传参
//   var restArgs = [].slice.call(arguments)
//   console.log(arguments)
//   // 参数合并，通过apply调用原函数
//   return add10.apply(this, [10, ...restArgs])
// }
anotherAdd20(5); // 25
// 传入5后还是调用 anotherAdd20函数 
// 调用后返回
// add10.apply(this, [10, 5])
// 调用add10后返回
// dynamicAdd.apply(this, [10, ...[10, 5]])
// 最后执行
// [10,10,5].reduce((prev, curr) => {
//   return prev + curr
// }, 0)  ========》 25