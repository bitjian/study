const  express =  require('express') 

const app1 = express()
app1.use(express.static(__dirname))
app1.listen(90)
console.log('app1 listen to 127.0.0.1:90');

const app2 = express()
app2.get('/', (req, res)=> {
  const { callback, ...rest } = req.query
  const str = `${callback}(${ rest ? JSON.stringify(rest) : '你好'})`
  res.send(str)
})
// const app2 = express()
// app2.get('/', (req, res)=> {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.send("你好")
// })
app2.listen(91)
console.log('app2 listen to 127.0.0.1:91');