const http = require('http')
http.createServer((req, res) =>{
  res.writeHead(200, {
    "content-type": "text/plain"
  })
  res.write(req.url)
  res.end()
} ).listen(3008)
console.log('Server running at http://127.0.0.1:3008/');