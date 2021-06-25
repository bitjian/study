var http = require('http');
var fs = require('fs');
var url = require('url');

//创建服务器
http.createServer((req, res) => {
    // 解析路径
    var pathname = url.parse(req.url).pathname;
    // 创建一个流，根据路径获取本地文件
    fs.readFile(pathname.substr(1), (err, data) => {
        if(err) {
            // 失败则返回404
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('<h1>服务器未访问<h1>');
        }else {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.write(data.toString());
            res.end();
        }
    })
}).listen(8080);
console.log('Server running at http://127.0.0.1:8080/');