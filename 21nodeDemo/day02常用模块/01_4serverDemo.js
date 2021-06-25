// 实现一个文件服务器

var fs = require('fs'),     //文件系统读写模块
    http = require('http'), // 操作服务器模块
    url = require('url');   // 解析网址模块
    path = require('path'); //处理本地文件路径模块

// 创建一个服务器

// 从命令行参数获取root目录，process.argv[2]不存在就是当前目录的绝对路径
var root = path.resolve(process.argv[2] || '.')
// console.log(root); 
// 创建一个服务器
var server = http.createServer(function(req, resp) {
    // 解析网址，获取端口号后的路径
    console.log(req.url, url.parse(req.url)); //url.parse 返回的是一个Url对象
    var pathname = url.parse(req.url).pathname;  // 访问的目录路径 /xxx 前面会加上/
    // 获取本地对应路径
    var filepath = path.join(root, pathname);
    console.log(filepath); //文件的绝对路径
    // 获取文件状态
    fs.stat(filepath, function(err, stats) {
        // 如果没有错误，并且该路径是一个文件
        if(!err && stats.isFile()) {
            // console.log('200' + req.url);
            // 发送200响应
            resp.writeHead(200);
            // 创建一个读取流 导入 相应body resp本身就是一个写入流
            fs.createReadStream(filepath).pipe(resp);
        }else {
            // 如果错误发送404响应
            resp.writeHead('404');
            resp.end('<h1>404 Not Found</h1>')
        }
    })
})
// 设置监听端口
server.listen(8080);
console.log("server running at http://127.0.0.1:8888/");