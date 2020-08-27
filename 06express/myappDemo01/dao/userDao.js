var login = require('./login');
var regist = require('./regist');
var loginDo = function(username, password, callback) {
    login.login(username, password, res => {
        callback(res);
    })
}
var registDo = function(username, password, callback) {
    regist.regist(username, password, res => {
        callback(res);
    })
}
exports.login = loginDo;
exports.regist = registDo;