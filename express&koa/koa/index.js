
// koa洋葱模型具有处理异步的能力，所以不管是否有异步任务，koa的执行顺序都是 next前逻辑 -> next() -> 下一个中间件next前逻辑 -> 最后一个中间件 next 后逻辑 -> 上一个中间件 next 后逻辑 -> 第一个 next 后逻辑
const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

app.use(async (ctx, next) => {
  console.log("middleware1 start")
  await next()
  console.log("middleware1 end")
})
app.use(async (ctx, next) => {
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
app.use(async (ctx, next) => {
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

router.get('/hello',(ctx, next)=> {
  ctx.body = "hello world"
})

app.use(router.routes())

app.listen(3001, ()=> {
  console.log("koa server start on 3001");
})