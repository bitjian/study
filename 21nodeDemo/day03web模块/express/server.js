var express = require('express');
var app = express();
var fs = require("fs");
// post请求需要引入的模块
var bodyParser = require('body-parser');
// 上传文件需要引入的模块
var multer  = require('multer');

// 创建 application/x-www-form-urlencoded 编码解析
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.urlencoded({ extended: false }));
// 使用上传文件模块
app.use(multer({ dest: '/tmp/'}).array('image'));

const port = process.env.HTTP_PORT || 3000;
const host = process.env.HTTP_IP || '0.0.0.0';


// 设置静态文件
app.use('/public', express.static('public'));

// 设置主页路由
app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/' + 'index.html');
})
// 设置表单get请求路由
app.get('/process_get', (req, res) => {
    // 获取参数
    var response = {    //get请求通过 query获取提交的数据
        "first_name": req.query.first_name,
        "last_name": req.query.last_name
    };
    res.end(JSON.stringify(response));
});
// 设置表单post请求路由
app.post('/process_post', function (req, res) {
 
    // 输出 JSON 格式
    var response = {
        "first_name":req.body.first_name,
        "last_name":req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
 })
// 文件上传路由
app.post('/file_upload', function (req, res) {
    
    console.log(req.files[0]);  // 上传的文件信息
  
    var des_file = __dirname + "/" + req.files[0].originalname;
    fs.readFile( req.files[0].path, function (err, data) {
         fs.writeFile(des_file, data, function (err) {
          if( err ){
            console.log( err );
          }else{
                response = {
                    message:'File uploaded successfully', 
                    filename:req.files[0].originalname
               };
           }
           console.log( response );
           res.end( JSON.stringify( response ) );
        });
    });
 })
// 设置监听端口
app.listen(8081, () => {
   console.log( `express app started at http://${host}:${port}`);
});

