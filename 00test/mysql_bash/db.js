const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '',
    port : 3306,
    user : '',
    password : '',
    database : 'test_zizi'
  }
});
module.exports = knex