var { Test, proxy } = require('../proxy/proxy');
var express = require('express');
var router = express.Router();
var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.send('err');
    } else {
        console.log(ret);
        res.send(ret);
    }
}
// 登录用户
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const stReq = new Test.LoginReq();
    stReq.readFromObject({
        username,
        password,
    });
    proxy.login(stReq).then(ret => {
        jsonWrite(res, ret.response.arguments.stRsp.toObject());
    }, ret => {
        console.log('error');
    });
});

// 获取用户列表
router.get('/getUserList', (req, res) => {
    const { pageNum, pageSize } = req.query;
    const stReq = new Test.PageInfoReq();
    stReq.readFromObject({
        pageNum,
        pageSize
    });
    proxy.getUserList(stReq).then(ret => {
        jsonWrite(res, ret.response.arguments.stRsp.toObject());
    }, ret => {
        console.log('error');
    });
});
// 用户详细
router.get('/getUserDetail', (req, res) => {
    const { uid } = req.query;
    const stReq = new Test.QueryIdReq();
    stReq.readFromObject({
        uid
    });
    proxy.getUserDetail(stReq).then(ret => {
        jsonWrite(res, ret.response.arguments.stRsp.toObject());
    }, ret => {
        console.log('error');
    });

});
// 增加用户接口
router.post('/saveUser', (req, res) => {
    const { username, password, tel, gender, age } = req.body;
    const stReq = new Test.SaveUserInfoReq();
    stReq.readFromObject({
        userinfo: {
            username,
            password,
            gender,
            tel,
            age
        }
    });
    proxy.saveUser(stReq).then(ret => {
        jsonWrite(res, ret.response.arguments.stRsp.toObject());
    }, ret => {
        console.log('error');
    });
});


module.exports = router;
