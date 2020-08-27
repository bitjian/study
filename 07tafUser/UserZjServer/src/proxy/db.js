// 引入
const mysql = require('mysql2');
// 创建数据库连接
// 使用异步
const conn  = mysql.createConnection({
    host: '192.168.6.170',
    user: 'root',
    password:'root',
    database: 'test_zzj',
    charset:'utf8',
  });
export default conn.promise();
