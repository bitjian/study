var connection = require('../configs/connection');

var regist = function(username, password, callback) {
    let data = {};
    let sql = `insert into user_info(username,password) values('${username}','${password}');`;
    connection.getConnection.query(sql, (err, rows, field) => {
        if(rows != undefined) {
            data.type = 'success';
            data.msg = '注册成功';
            callback(data);
        }else {
            data.type = 'fail';
            data.msg = '信息填写有误';
            callback(data);
        }
    })
}
exports.regist = regist;