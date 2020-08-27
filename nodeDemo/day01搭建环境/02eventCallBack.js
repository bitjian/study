// ajax提交服务器的处理过程

var http = require('http');
// 这是什么模块
var querystring = require('querystring');

// 侦听服务器的request时间
http.createServer(function(req, res) {
    var postData = '';
    req.setEncoding('utf-8');
    // 侦听请求的data事件
    req.on('data', function(trunk) {
        postData += trunk;
    })
    // 侦听请求的end事件
    req.on('end', function() {
        res.end(postData);
    })
}).listen(8888);

console.log('服务器启动完成');