var http = require('http');
var url = require('url');
var util = require('util');

// 创建一个服务器
http.createServer((req, res) => {
    // 返回状态码
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    // 获取参数
    let params = url.parse(req.url, true).query;
    res.write('网站名：' + params.name + '\n');
    res.write('网站url:' + params.url)
    res.end();
}).listen(3000);