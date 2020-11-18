### 同步和异步
同步就代码之上而下的执行，比如一般的逻辑处理，一般的函数调用 
异步：就是代码不会立即执行，会放到异步队列中，等主程序执行完，再来调用

### 事件循环
事件循环EventLoop，就是等待主程序执行完毕了，再去调用异步队列中的任务，放到主程序中运行，这样的反复循环，就是时间循环

### 宏观任务和微观任务
在异步任务队列中，又有微观任务（Micro Task）和宏观任务(Macro Task),
事件循环会先执行微观任务，再去执行宏观任务
宏观任务：setTimeout, setInterval,setImmediate script(整体代码)、 I/O、 UI交互
微观任务：Promise.then, process.nextTick(Node.js环境)，MutaionObserver

### 分析代码
```javascript
console.log('开始111');

setTimeout(function () {
   console.log('timeout111');
});

new Promise(resolve => {
   console.log('promise111');
   resolve();
   setTimeout(() => console.log('timeout222'));
}).then(function () {
   console.log('promise222')
})

console.log('开始222');

```
分析一下：
1、遇到同步代码，先打印 “开始111” 。
2、遇到setTimeout异步，放入队列，等待执行 。
3、中途遇到Promise函数，函数直接执行，打印 “promise111”。
4、遇到setTimeout ，属于异步，放入队列，等待执行。
5、遇到Promise的then等待成功返回，异步，放入队列。
6、遇到同步，打印 “开始222”。
7、执行完，返回，将异步队列中的代码，按顺序执行。有一个微观任务，then后的，所以打印 “promise222”，再执行两个宏观任务 “timeout111” “timeout222”。
所以，打印的顺序为：开始111 、 promise111 、 开始222 、 promise222 、 timeout111 、 timeout222 .

```javascript

process.nextTick(function() {           // 微任务1-1 [2 10 1]
  console.log('1');                   
})

new Promise(function (resolve) {      // 主程序 [2]
  console.log('2');                   
  resolve();                          
}).then(function () {             // 微任务1-2  [2 10 1 3]         
  console.log('3');                   
  setTimeout(function () {      // 宏任务（2-1） [2 10 1 3 5 6 4]
    console.log('4')
  });
});

setTimeout(function () {        // 宏任务 1-1    [2 10 1 3 5]
  console.log('5')                    
});

new Promise(function (resolve) { 
  setTimeout(function () {       // 宏任务 1-2  [2 10 1 3 5 6]    
    console.log('6')                  
  });
  resolve()
}).then(function () {             // 微任务 1-3       
  setTimeout(function () {            // 宏任务 2-2
    console.log('7')
    new Promise(function (resolve) {
      console.log('12')            // 这也是宏任务 2-2  [ 2 10 1 3 5 6 4 7 12]
      setTimeout(function () {  // 宏任务 3-1 [ 2 10 1 3 5 6 4 7 12 11 8]
        console.log('8')
      });
      resolve()
    }).then(function () {
      console.log('11')        // 微任务 2-1  [ 2 10 1 3 5 6 4 7 12 11]
      setTimeout(function () { // 宏任务 4 - 1 [ 2 10 1 3 5 6 4 7 12 11 8 9]
        console.log('9')
      });
    });
  });
});
console.log('10')         // 主程序 [2 10]

```
分析一下：
7、最后输出顺序 [ 2 10 1 3 5 6 4 7 12 11 8 9]

### 总结

先执行主任务，把异步任务放入循环队列当中，等待主任务执行完，再执行队列中的异步任务。异步任务先执行微观任务，再执行宏观任务。一直这样循环，反复执行，就是事件循环机制。

### 参考
https://www.cnblogs.com/tangjianqiang/p/13470363.html
https://juejin.im/post/6844903843197616136