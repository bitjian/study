// 通过express框架输出"Hello World"
var express = require('express');
var app = express();
// 使用express.static 来设置静态文件路径
app.use('/public', express.static('public'));
// 配置路由 主页输出Hello, World
app.get('/', (req, res) => {
    res.send('<h1>Hello, World</h1>');
});

// post路由请求
app.post('/', (req, res) => {
    res.send('Hello POST');
})

//  配置 /list_user 路由
app.get('/list_user', (req, res) => {
    res.send('用户列表页面')
})
// 使用正则配置路由
app.get('/ab*cd', (req, res) => {
    res.send('正则匹配');
})

var server = app.listen(8081, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log('访问地址 http://%s:%s', host, port);
})