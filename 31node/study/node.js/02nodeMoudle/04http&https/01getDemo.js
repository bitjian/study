const http = require("http")
const https = require("https")

const server = http.createServer((request, response) => {
  const url = request.url.substr(1)
  console.log(request.url,url);
  let data = ""
  // 设置响应头 可以跨域
  response.writeHead(200, {
    'content-type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  })
  // 通过get方法，获取响应数据
  // 需要通过 res.on('data)接受数据
  // 需要通过 res.on('end') 等待流写入完
  https.get(`https://m.lagou.com/listmore.json${url}`, (res)=> {
    res.on('data',(chunk)=> {
      data+=chunk
    })
    res.on('end',()=> {
      response.end(JSON.stringify({
        ret:true,
        data
      }))
    })
  })
})
server.listen(8000,()=> {
  console.log('server start in localhost:8080');
})