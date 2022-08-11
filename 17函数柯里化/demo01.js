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

// // 支持多参数传递
function progressCurrying(fn, args) {
  // fn函数参数的个数
  var args = args || [];

  return function () {
    var _args =[...arguments];
    Array.prototype.push.apply(args, _args);

    // 如果参数个数小于最初的fn.length，则递归调用，继续收集参数
    // 参数收集完毕，则执行fn
    return fn.apply(this, args);
  }
}
let add = function (addArr) {
  return addArr.reduce((pre,cur => {
    return pre + cur
  }),0)
}
let sum = progressCurrying(add, 0)(1)(2)(3)(4,5)
console.log(sum)
// https://www.jianshu.com/p/2975c25e4d71

function add() {
  // 第一次执行时，定义一个数组专门用来存储所有的参数
  var _args = Array.prototype.slice.call(arguments);

  // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
  var _adder = function() {
      _args.push(...arguments);
      return _adder;
  };

  // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
  _adder.toString = function () {
      return _args.reduce(function (a, b) {
          return a + b;
      });
  }
  return _adder;
}

let sum1 = add(2,5) + ''

let sum2 = add(2)(5) + ''

console.log(sum1, sum2);

// function add(x) {
//   const args = [...arguments]
//   if ((args.length === 1)) {
//     return function (y) {
//       return x + y
//     }
//   }else {
//     return args.reduce((pre,cur)=> {
//       return pre+cur
//     },0)
//   }
// }
// let sum1 = add(2,5)
// let sum2 = add(2)(5)
// console.log(sum1, sum2);