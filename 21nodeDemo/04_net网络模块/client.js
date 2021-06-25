const net = require('net')

const client = net.createConnection({
  host: '127.0.0.1',
  port: '5001'
})

client.on('connect', () => {
  client.write('我是客户端')
  // let i = 0
  // let studyArr = ['JavaScript ','TypeScript ','Python ']
  setTimeout(() => {
    client.write('JavaScript ');
    client.write('TypeScript ');
    client.write('Python ');
    client.write('Java ');
    client.write('C ');
    client.write('PHP ');
    client.write('ASP.NET ');
}, 1000);
})

client.on('data', buffer => {
  console.log(buffer.toString())
})

// 例如监听一个未开启的端口就会报 ECONNREFUSED 错误
client.on('error', err => {
  console.error('服务器异常：', err);
});

client.on('close', err => {
  console.log('客户端链接断开！', err);
});