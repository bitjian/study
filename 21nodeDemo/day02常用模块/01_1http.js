'use strict';

var http = require('http');

// 创建http server,并传入回调函数

var server = http.createServer(function(req, resp) {
    console.log(req, resp);
    // 得到请求的method, url
    console.log(req.method + ':' + req.url);
    // 将状态码200和相应类型 写入相应头
    resp.writeHead(200, {'Content-Type' : 'text/html'});
    // 将HTTP响应的HTML内容写入response
    resp.end('<h1>Hello World</h1>')
});

server.listen(8080);
console.log('Server is running at http://127.0.0.1.8080');