const xlsx = require('node-xlsx')
const path = require('path')
const fs = require("fs")
const { iteratee } = require('lodash')
const fileDir = path.resolve(__dirname, './list.xlsx')
const sqlDir =  path.resolve(__dirname, './white.sql')
console.log(fileDir)
const dataList = xlsx.parse(fileDir)

const parseLocation = (val) => {
  let result = undefined;
  switch (val) {
    case '右下':
      result = 1;
      break;
    case '居中':
      result = 2;
      break;
    case '左下':
      result = 3;
      break;
    case '其他':
      result = 4;
      break;
    case '左上':
      result = 5;
      break;
    case '右上':
      result = 6;
      break;
    case '全屏':
      result = 7;
      break;
    case '托盘':
      result = 8;
      break;
    case '未知':
        result = 0;
        break;
    default:
      result = undefined
  }
  return result;
};

const strList = dataList.map(item => {
    const sqlHead = item.data[0]
    const headLength = sqlHead.length
    let str = `insert into t_ad_win_whitelist (__UniqueKey, ${sqlHead}) values `
    const sqlData = item.data.slice(1)
    sqlData.forEach((data, index) => {
      if(data.length === 0) return
      let newData =[]
      if(item.name === 'combin' ){
        data[3] = parseLocation(data[3])
      } 
      for(let i=0; i<headLength; i++) {
     
        newData.push(data[i])
      }
      if(index === 0) {
        str += ` (concat('CUSTOM_', UUID()),${newData.map(item => typeof item === 'undefined' ?"null" : `'${item}'`  ).join(',')})`
      }else {
        str += `,(concat('CUSTOM_', UUID()),${newData.map(item =>  typeof item === 'undefined' ? "null" :`'${item}'`).join(',')})`
      }
    })
    fs.writeFileSync(sqlDir, str+';\n', {flag: 'a+'})
})