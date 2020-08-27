var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');

router.post('/', (req, res, callback) => {
    console.log(req.body.username, req.body.password);
    userDao.regist(req.body.username, req.body.password, result => {
        // res.json({status: 200, result});
        res.send(`<script>alert('${result.msg}');location.href='/'</script>`);
    })
})

module.exports = router;