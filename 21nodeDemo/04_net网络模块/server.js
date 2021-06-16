const net = require('net');
const { hostname } = require('os');

const [host,port] = ['127.0.0.1','5001']

// 创建一个server实例
const server = net.createServer();

// 监听端口
server.listen(port,host)

// server 监听listening
server.on('listening',() => {
  console.log(`服务已经开启在:${host}:${port}`)
})

// connection 每次客户端建立连接就会触发回调， 参数socker是server实例
server.on('connection', socker => {
  // 客户端发送数据（write方法）就会触发data事件接收
  console.log('1111111111connection')
  socker.on('data', buffer => {
    const msg = buffer.toString();
    // console.log(msg);
    socker.write(Buffer.from('你好 '+ msg))
  })
})

// 客户端会话结束 退出的时候触发
server.on('close', () => {
  console.log("Server Close!")
})

server.on('error', err => {
  if (err.code === 'EADDRINUSE') {
    console.log('地址正被使用，重试中...');

    setTimeout(() => {
        server.close();
        server.listen(PORT, HOST);
    }, 1000);
} else {
    console.error('服务器异常：', err);
}
})