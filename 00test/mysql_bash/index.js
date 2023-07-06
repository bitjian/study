const xlsx = require('node-xlsx')
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '../cgb.xlsx')
const datasheet = xlsx.parse(filePath)
const dict = {}
const dict2 = {}
const codeList = datasheet[2].data.splice(1).map(item => dict[item[13]] = item[16])
const data2List = datasheet[3].data
data2List.forEach((item,index) => {
  if(index === 0) return
  const reg = new RegExp(('.{0,6}'+[...item[0]].join('.{0,5}'))+'.{0,5}')
  const dicctkeyList = Object.keys(dict)
  dicctkeyList.forEach(dictkey => {
    const reg2 = new RegExp(('.{0,6}'+[...dictkey].join('.{0,5}'))+'.{0,5}')
    if(reg.test(dictkey) || reg2.test(item[0])) {
      if(item[9]) return
      item[9] = dict[dictkey]
      dict2[item[0]] = item[9]
    }
  })
})

console.log(dict2,Object.keys(dict2).length, dict, Object.keys(dict).length)

// 将数据转换为Excel文件
const buffer = xlsx.build([{name: 'Sheet1', data: data2List}]);

// 将Excel文件保存到本地
const localPath = path.join(__dirname, 'datadict.xlsx')
fs.writeFile(localPath, buffer, (err) => {
  if (err) throw err;
  console.log('Excel文件已生成');
});