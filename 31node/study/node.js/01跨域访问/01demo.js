const https = require('https')
// 可以跨域请求
https.get("https://maoyan.com/films/1319", (res) => {
  console.log(res)
})