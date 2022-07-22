const debounce = function(fn, time) {
  let timer = null
  return function(...args) {
  let context = this
    if(timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(()=> {
      fn.apply(context,args )
    }, time);
  }
}