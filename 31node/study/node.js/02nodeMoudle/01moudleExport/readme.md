### 1.node模块
node模块有：内置模块，第三方模块，和自定义文件模块
### 2.模块的导出
主要了解 exports 和 module.exports的关系
exports是对 module.exports的引用 ,也就是 exports指向module.export
exports -> module.exports
如果直接给exports赋值，则改变了 exports的引用，也就获取不到导出的值了
```javascript
const a = 'a'
// exports.a = a // ===  module.exports = {a:a}
// exports = a  //  exports -> a
module.exports = {a:a}
```
### 3.模块的相互引用
a.js
```javascript
exports.done = false
const b = require('./b.js')
console.log('in a, b.done = %j', b.done)
exports.done = true
console.log('a done')
```
b.js
```javascript
console.log('b starting')
exports.done = false
const a = require('./a.js')
console.log('in b, a.done = %j', a.done)
exports.done = true
console.log('b done')
```
main.js
```javascript
console.log('main starting')
const a = require('./a.js')
const b = require('./b.js')
console.log('in main, a.done = %j, b.done = %j', a.done, b.done)
```
> 一开始进入a.js 在a中导出了export.done = false, <br>引入了b.js进入b.js则 执行console.log('b starting') && const a = require('./a.js') 此时a = {done:false}<br>再执行 console.log('in b, a.done = %j', a.done) a.done 为 false, 导出 export.done = true && 执行 console.log('b done') ，<br> 执行完进入a.js ,const b = require('./b.js') 此时b已经执行完了，导出的对象为{done: true}，console.log('in b, a.done = %j', a.done) done为 true,<br>再执行exports.done = true && console.log('b done')，a执行完后 进入 主函数 a = require('./a.js')， 已经执行完a.js和b.js ， 此时导出的对象都为 {done:true},同理 b= require('./b.js'), console.log('in main, a.done = %j, b.done = %j', a.done, b.done) ，输出 true, true
