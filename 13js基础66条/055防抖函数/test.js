/**
 * 防抖：在一定时间内，有相同调用，则重置定时器，重新计时调用，知道这段时间没有新的调用
 */

function debounce(func, time) {
  let timer = null
  return function () {
    let context = this
    let arg = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(context, arg)
    }, time);
  }
}

var d1 = debounce((message) => { console.log(message), 3000 })
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

