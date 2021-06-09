// 绑定和监听实例
// 引入event模块
var events = require('events');
// 创建对象
var eventEmitter = new events.EventEmitter();
// 监听 connect连接事件
eventEmitter.on('connection', function(){
    console.log('连接成功过');
    // 触发数据接收事件
    eventEmitter.emit('data-received');
});
// 监听 data-receuved 事件
eventEmitter.on('data-received', function() {
    console.log('获取数据成功');
})
// 触发连接事件
eventEmitter.emit('connection');

console.log('程序执行完毕');