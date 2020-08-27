function myCall(context) {
  if(typeof context !== 'function') {
    console.error("type error")
  }else {
    // 获取第一个参数后面的参数
    let args = arguments.slice(1)
    // 如果context没有传入则默认window
    context = context || window
    // 将调用的方法赋值给 fn
    context.fn = this
    // 调用方法获取结果
    let result = context.fn(args)
    delete context.fn
    return result
  }
}