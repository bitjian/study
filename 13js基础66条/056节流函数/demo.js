// 节流函数，在规定时间内只触发一次
// let timer 
// function throttle(func, time) {
//   return function() {
//     let context = this
//     let arg = arguments
//     if (timer) {
//       return;
//   }
//     if(!timer) {
//       timer = setTimeout(() => {
//         func.apply(context, arg)
//         timer = null
//       }, time);
//     }
//   }
// }

const { table } = require("console");


// throttle((message) => {console.log(message),2000})('123')
// throttle((message) => {console.log(message)},2000)('123')
// throttle((message) => {console.log(message)},2000)('123')

function throttleDate(func, delay) {
  let timer;
  let prev = 0;
  return function () {
      let context = this, args = arguments;
      let now = Date.now();
      if (now - prev > delay) {
          prev = now;
          func.apply(context, args);
      }
  }
}

let t1 = throttleDate((message) => {console.log(message)},1000)
t1('1')
setTimeout(() => {
t1('2')
}, 1000);
t1('3')