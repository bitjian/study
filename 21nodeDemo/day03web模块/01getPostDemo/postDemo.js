var http = require('http');
var querystring = require('querystring');

// 没有数据默认返回一个表单界面
var postHTML =
  '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
  '<body>' +
  '<form method="post">' +
  '网站名： <input name="name"><br>' +
  '网站 URL： <input name="url"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';

http.createServer((req, res) => {
  let body = '';
  // 监听 data事件，获取post提交的数据
  req.on('data', chunk => {
    body += chunk;
  });
  // 监听end事件
  req.on('end', () => {
    // 解析获取的参数
    body = querystring.parse(body);
    console.log(body)
    // 设置响应头部信息 和 编码
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
    if(body.name && body.url) {
      // 输出提交的数据
      res.write('网站名：' + body.name + '<br>');
      res.write('网站：' + body.url);
      res.end();
    }else {
      res.write(postHTML);
    }
    res.end();
  })
}).listen(3000)