const express = require('express');
const path = require('path');
const service = require('./service');

const app = express();

// 指定/static 对应的文件夹 
app.use('/static', express.static(path.join(__dirname, './public')));

const port = process.env.HTTP_PORT || 3000;
const host = process.env.HTTP_IP || '0.0.0.0';

// 设置监听的端口 和启动成功的提示信息
app.listen(port, host, () => console.log(`express app started at http://${host}:${port}`));

// 指定模板文件的位置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 使用express的render Api 渲染views/index.ejs 模板
app.get('/', (req, res) => {
    
    res.render('index', {
        message: 'Hello Express',
        time: dateFormat(new Date().getTime())
    });
});
app.get('/hello', (req, res) => {
    // 创建一个入参对象
    let stReq = new service.Test.HelloWorldReq();
    // 通过readFromObject 传入参数，并转成对象
    stReq.readFromObject({
        data: req.query.data,
    });
    console.log(stReq);
    // 通过代理调用接口并传入入参，根据返回结果进行处理
    service.prx.helloWorld(stReq).then(ret => {
        // 获取返回的出参
        res.json(ret.response.arguments.stRsp.toObject())
    }, ret => {
        console.log(ret);
        res.json(res.response)
    })
});
function dateFormat(time) {
    let date = new Date(time + 8 * 3600000);
    let str = date.toISOString().replace('T',' ');
    return str.substr(0, str.lastIndexOf('.'));
}