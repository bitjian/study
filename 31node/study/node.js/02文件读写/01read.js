const fs = require('fs')
// 可以读写文件
fs.writeFileSync('./logFile','123')
// 设置了 utf-8编码 可以直接获取字符串 ， 不然返回buffer需要toString()
const str = fs.readFileSync('./logFile',{encoding:'utf-8'})
console.log(str)
// fs.readFile('./logFile', 'utf-8', (err, content) => {
//   console.log(content)
// })