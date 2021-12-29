const { sqlStr } = require('./sqlStr')

let valArr = sqlStr.split(',')
// 是否是新的一行
let column = ''
let columnFlag = true
let valStr = ''
let columnStr = '('
valArr.forEach(item => {
  if (columnFlag && item.includes('id')) {
    columnFlag = false
  }

  if (!columnFlag) {
    // 获取列名
    if (!column.includes('creator')) {
      column += `${item.split('=')[0]}`
    }
    if (item.includes('creator')) {
      // 获取列值
      columnStr += `${item.split('=')[1]}`
    } else {
      columnStr += `${item.split('=')[1]},`
    }
  }
  if (item.includes('creator')) {
    columnFlag = true
    columnStr += ')'
    valStr += `${columnStr},`
    columnStr = '('
  }
})

// console.log(valStr, column)
let insertSql = `insert into strategy (${column}) ${valStr}`
console.log(insertSql)
