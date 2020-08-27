// 登录路由
var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao') // 请求数据处理包

router.post('/', (req, res, callback) => {
    console.log(req.body);
    
    userDao.login(req.body.username, req.body.password, result => {
        console.log(result);
        
        if(result.type == 'success') {
            res.render('main', { username: req.body.username });
        }else {
            console.log(111);
            
            res.send(`<script>alert('${result.msg}');location.href='/'</script>`);
        }
    
    })
})

module.exports = router;