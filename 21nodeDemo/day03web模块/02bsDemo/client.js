var http = require('http');

// 用于请求的选项
var options = {
    host: 'localhost',
    port: '8080',
    path: '/index.html'
}

// 向服务发送请求,并处理响应的回调
var req = http.request(options, resp => {
    let body = '';
    // 客户端是通过resp监听data
    resp.on('data', (data) => {
        body += data
    })
    resp.on('end', () => {
        console.log(body);
    })
})
req.end();