const {sqlVal} = require('./sqlStr')
let sql = 'insert into strategy values '
sqlVal.forEach(item => {
  const  {id, name, risk_level, currency_rate_min, currency_rate_max, bond_rate_min, bond_rate_max, merch_rate_min, merch_rate_max, other_rate_min, other_rate_max, cash_rate_min, cash_rate_max, turnover_rate, create_time, update_time, creator} = item
  sql += `(${id}, ${name}, ${risk_level}, ${currency_rate_min}, ${currency_rate_max}, ${bond_rate_min}, {bond_rate_max}, {merch_rate_min}, {merch_rate_max}, {other_rate_min}, {other_rate_max}, {cash_rate_min}, {cash_rate_max}, {turnover_rate}, {create_time}, {update_time}, {creator}}),`
})
console.log(sql) 