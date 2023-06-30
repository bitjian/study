const { default: axios } = require('axios')
const fs = require('fs')
const path = require("path")
const filePath = path.join(__dirname,'./test.txt')
const fileInfo = fs.statSync(filePath)
const urlList = fs.readFileSync(filePath).toString().split(/\r\n/).filter(Boolean).map(item => item.replace('http://', 'http://xxx.qq.com/'))
// urlList.map(async () => {

// })
let successList = [], errorList = []
const a = async() => {
  for(let url of urlList) {
    try {
      const data = await axios.head(url)
      if(data.status===200) {
        successList.push(url)
      }else {
        errorList.push(url)
      }
      
    }catch(err){
      errorList.push(url)
    }
  }
  console.log(successList.length, errorList.length)
  return 
}
const data = new Promise(async resolve=> {
 const data = await a()
  resolve()
}) 
// http://xxx.psf	
// let sql = `update patch_day_log set status=1 where p_url in (${urlList.join(',')})`
// console.log(urlList.length)
// fs.writeFileSync('url2sList.sql',urlList.join('\r\n'))

