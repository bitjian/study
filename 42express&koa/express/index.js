// 如果都是同步逻辑，express和koa的执行顺序是一样的，都是 // koa洋葱模型具有处理异步的能力，所以不管是否有异步任务，koa的执行顺序都是 next前逻辑 -> next() -> 下一个中间件next前逻辑 -> 最后一个中间件 next 后逻辑 -> 上一个中间件 next 后逻辑 -> 第一个 next 后逻辑
// 但如果有异步，express执行顺序就是按 next前逻辑 next() 下一个中间件next前宏任务逻辑， 宏任务队列执行完再执行promise微任务队列
// middleware1 start
// test
// middleware1 end
// async middleware start
// middleware2 start
// middleware2 end
// async middleware end
// async middleware2 end
const express = require('express')
const app = express()
// app.use((req, res, next) => {
//   console.log("middleware1 start")
//   next()
//   console.log("middleware1 end")
// })

// app.use((req, res, next) => {
//   console.log("middleware2 start")
//   next()
//   console.log("middleware2 end")
// }) 
// middleware1
app.use(async (req, res, next) => {
  console.log("middleware1 start")
  await next()
  console.log("middleware1 end")
})
// async middleware
app.use(async (req, res, next) => {
  console.log('test')
  const resstart = await new Promise(resolve => {
    setTimeout(() => {
      resolve('async middleware start')
    }, 1000);
  })
  console.log(resstart)
  await next()
  const resend = await new Promise(resolve => {
    setTimeout(() => {
      resolve('async middleware end')
    }, 1000);
  })
  console.log(resend)
})

// middleware2
app.use(async (req, res, next) => {
  console.log("middleware2 start")
  await next()
  console.log("middleware2 end")
  const resend = await new Promise(resolve => {
    setTimeout(() => {
      resolve('async middleware2 end')
    }, 2000);
  })
  console.log(resend)
})

app.get('/hello', (req,res) => {
  res.send("hello")
})  

app.listen(3000, () => {
  console.log('express server listen on 3000')
})