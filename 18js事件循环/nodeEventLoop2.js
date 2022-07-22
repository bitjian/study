// 新版的node事件循环 微任务执行完，回取一个宏任务去执行而不是所有队列中的宏任务，这点和浏览器事件循环相似
// 旧版本的node事件循环是 微任务执行完毕，会取宏任务队列中的所有宏任务去执行
// node事件循环机制是基于v8引擎 libuv模块执行
// 它的队列有 poll -> timmer -> check -> io -> collback -> ideal -> poll
console.log('start');
let timer1 = setTimeout(() => {
    console.log(`settimeout 0`)
    process.nextTick(() => {
        console.log('settimeout process nextTick');  
    })
    clearTimeout(timer1);
}, 0);
let timer2 = setTimeout(() => {
    console.log(`settimeout 300`)
    clearTimeout(timer2);
}, 300);
let interval = setInterval(() => {
    console.log(`setInterval`)
    clearInterval(interval);
}, 0);


process.nextTick(() => {
    console.log('process nextTick');
})
const fs = require('fs')
fs.readFile('./test.js', () => {
    console.log('poll');
    setImmediate(() => {
        console.log(`poll setImmediate`)
    });
})
setImmediate(() => {
    console.log(`setImmediate`);
});
new Promise(resolve => {
    console.log('promise start');
    resolve();
    console.log('promise end');
}).then(() =>{
    console.log('promise result');
})
console.log('end');
