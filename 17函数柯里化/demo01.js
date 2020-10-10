// // 有这么一个求和函数dynamicAdd()，接受任意个参数。
// function dynamicAdd() {
//   return [...arguments].reduce((prev, curr) => {
//     return prev + curr
//   }, 0)
// }
// // 函数柯里化
// function curry(fn, firstArg) {
//   // 返回一个新函数
//   return function() {
//     // 新函数调用时会继续传参
//     var restArgs = [].slice.call(arguments)
//     console.log(arguments)
//     // 参数合并，通过apply调用原函数
//     return fn.apply(this, [firstArg, ...restArgs])
//   }
// }

// // 柯里化，预置参数10
// var add10 = curry(dynamicAdd, 10)
// // 此时的add10为下面的函数， 还未开始求值
// // function() {
// //   // 新函数调用时会继续传参
// //   var restArgs = [].slice.call(arguments)
// //   console.log(arguments)
// //   // 参数合并，通过apply调用原函数
// //   return dynamicAdd.apply(this, [10, ...restArgs])
// // }
// // 也可以对一个已经柯里化的函数add10继续柯里化，此时预置参数10即可
// var anotherAdd20 = curry(add10, 10);
// // 此时的anotherAdd20为下面的函数，还未开始求值
// // function() {
// //   // 新函数调用时会继续传参
// //   var restArgs = [].slice.call(arguments)
// //   console.log(arguments)
// //   // 参数合并，通过apply调用原函数
// //   return add10.apply(this, [10, ...restArgs])
// // }
// anotherAdd20(5); // 25
// // 传入5后还是调用 anotherAdd20函数 
// // 调用后返回
// // add10.apply(this, [10, 5])
// // 调用add10后返回
// // dynamicAdd.apply(this, [10, ...[10, 5]])
// // 最后执行
// // [10,10,5].reduce((prev, curr) => {
// //   return prev + curr
// // }, 0)  ========》 25


// https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch4.html#%E4%B8%8D%E4%BB%85%E4%BB%85%E6%98%AF%E5%8F%8C%E5%85%B3%E8%AF%AD%E5%92%96%E5%96%B1

// 支持多参数传递
function progressCurrying(fn, args) {
  var _this = this
  var len = fn.length;
  var args = args || [];

  return function () {
    var _args = Array.prototype.slice.call(arguments);
    Array.prototype.push.apply(args, _args);

    // 如果参数个数小于最初的fn.length，则递归调用，继续收集参数
    if (_args.length < len) {
      console.log(_args, len, args)
      return progressCurrying.call(_this, fn, _args);
    }

    // 参数收集完毕，则执行fn
    return fn.apply(this, _args);
  }
}
let add = function (x, y) { return x + y }
let sum = progressCurrying(add, 0)(1)(2)(3)(4)(4,5,6)
console.log(sum)
// https://www.jianshu.com/p/2975c25e4d71