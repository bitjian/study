// setTimeout(function() {
//   console.log(1)
// }, 0);
// new Promise(function(resolve, reject) {
//   console.log(2);
//   resolve()
// }).then(function() {
//   console.log(3)
// });
// process.nextTick(function () {
//   console.log(4)
// })
// console.log(5)

process.nextTick(function() {           // 微任务1-1 [2 10 1]
  console.log('1');                   
})

new Promise(function (resolve) {      // [2]
  console.log('2');                   
  resolve();                          
}).then(function () {             // 微任务1-2  [2 10 1 3]         
  console.log('3');                   
  setTimeout(function () {      // 宏任务（2-1） [2 10 1 3 5 6 4]
    console.log('4')
  });
});

setTimeout(function () {          // 宏任务 1-1    [2 10 1 3 5]
  console.log('5')                    
});

new Promise(function (resolve) { // 宏任务 1-2  [2 10 1 3 5 6]
  setTimeout(function () {            
    console.log('6')                  
  });
  resolve()
}).then(function () {             // 微任务 1-3       
  setTimeout(function () {            // 宏任务 2-2  [ 2 10 1 3 5 6 4 7]
    console.log('7')
    new Promise(function (resolve) {
      setTimeout(function () {  // 宏任务 3-1 [ 2 10 1 3 5 6 4 7 8]
        console.log('8')
      });
      resolve()
    }).then(function () {
      setTimeout(function () { // 宏任务 4 - 1 [ 2 10 1 3 5 6 4 7 8 9]
        console.log('9')
      });
    });
  });
});
console.log('10')         // [2 10]

// const fun1 = (cb) => {
//   cb()
//   console.log(1)
// }

// const fun2 = () => {
//   console.log(2)
// }

// const fun3 = () => {
//   console.log(3)
//   fun2()
// }
// const fun4 = () => {
//   console.log(4)
// }
// fun3()
// fun1(fun4)


// console.log('开始111');

// setTimeout(function () {
//   console.log('timeout111');
// });

// new Promise(resolve => {
//   console.log('promise111');
//   resolve();
//   setTimeout(() => console.log('timeout222'));
// }).then(function () {
//   console.log('promise222')
// })

// console.log('开始222');