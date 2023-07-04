const xlsx = require('node-xlsx')
const path = require('path')
const fs = require('fs')
const xlsxpath = path.join(__dirname, './确认广告.xlsx')
const dataList = xlsx.parse(xlsxpath)
const rules = dataList[0].data.map(item => `'${item}'`)
const sqlStr = `update t_intercept_rules set is_wlad=1 where Frule_id in (${rules.join(',')})`
fs.writeFileSync(path.join(__dirname, 'wlad.sql'),sqlStr)