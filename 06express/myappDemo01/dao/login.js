var connection = require('../configs/connection');

var login = function(username, password, callback) {
    let data = {};
    let sql = `select * from user_info where username = '${username}';` //注意给参数添加单引号
    connection.getConnection.query(sql, (err, rows, fields) => {
        if(err || !rows[0]) {
            data.type = 'fail';
            data.msg = '用户名不存在';
            callback(data);
        }else {
            if(rows[0].password == password) {
                data.type = 'success';
                data.msg = '登录成功';
                callback(data);
            }else {
                data.type = 'fail';
                data.msg = '密码错误';
                callback(data);
            }
        }
    })
}
exports.login = login