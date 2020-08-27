var mysql = require('mysql');

var connection = {};

connection.createConnection = mysql.createConnection({
    host: '192.168.6.170',
    user: 'root',
    password: 'root',
    database: 'test_zzj',
    prot: '3306'
})

exports.getConnection = connection.createConnection;