// 防抖函数，在某一时间范围内，如果继续触发了这个方法，则重新计时,直到没有触发执行
// 防抖函数是 取消前面的操作，重新计时，在时间结束后， 执行最后一个函数，节流是在时间范围内执行第一个函数，阻止后面的操作
function debounce(func, time) {
  let timer = null
  return function() {
    let context = this
    let arg = arguments
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(context, arg)
    }, time);
  }
}

let d1 = debounce((message) => {console.log(message),3000})
d1(1)
d1(2)
d1(2.1)
d1(2.3)
setTimeout(() => {
  d1(3)
}, 1000);
setTimeout(() => {
  d1(4)
}, 1000);
