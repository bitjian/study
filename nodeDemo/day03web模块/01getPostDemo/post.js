var http = require('http');
var querystring = require('querystring');
var util = require('util');

// 创建一个服务器
http.createServer((req, res) => {
    // 定义一个变量,存储post传入的参数
    let post = '';
    // 监听data事件，获取参数
    req.on('data', chunk => {
        post += chunk;
    });
    // req监听end事件，解析post提交的参数，返回给客户端
    req.on('end', () => {
        console.log(post);
        // 解析post
        post = querystring.parse(post);
        console.log(post);
        // 将对象转换成字符串
        console.log(util.inspect(post));
        res.end(util.inspect(post));
    })
}).listen(3000)