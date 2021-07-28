const moment = require('moment')
const year = 2021
let a = moment()
console.log(a.month(0).format(`${year}-MM`),a.format(`${year}-MM`));

console.log(moment('202101').quarters(2).subtract(1,'months').format(`${year}-MM`));