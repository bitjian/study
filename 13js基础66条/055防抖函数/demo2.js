function debounceUp(fn, wait, immediate=false) {
  let context, args, timer, result, timestamp

  const later = function() {
    let passTime = +new Date() - timestamp
    if(passTime < wait && passTime > 0) {
      timer = setTimeout(later, wait - passTime);
    }else {
      timer == null
      if(!immediate) {
        result = fn.apply(context , args)
        if(!timer) {
          context = args = null
        }
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timer
    if(!timer) timer = setTimeout(later, wait);
    if(callNow) {
      result =  fn.apply(context, args)
      context = args = null
    }
    return result
  }
}