/**
 * 节流函数 在某一段时间内，重复的调用 只执行第一次调用的，知道该时间段结束
 */
function throttle(func, time) {

  let timer = null

  return function () {

    if (!timer) {
      timer = setTimeout(() => {
        func.apply(context, arg)
        clearTimeout(timer)
      }, time);
    }
  }
}


function throttle2(func, time) {
  let prev = 0
  let context = this
  let arg = argument
  return function () {
    now = Date.now()
    if (now - prev > time) {
      func.apply(context, arg)
      prev = now
    }
  }
}