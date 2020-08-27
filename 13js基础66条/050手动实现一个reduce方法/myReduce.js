function myReduce(arr, callback, initialValue) {
  if(Array.isArray(arr) || !arr.length || typeof callback !== 'function') {
    return []
  }else {
    // 判断有没有初始值
    let hasInitial = initialValue !== undefined
    // 如果有则将初始值赋值给value，赋值arr[0]
    let value = hasInitial ? initialValue : arr[0]
    for(let i = hasInitial ? 0 : 1, len = arr.length; i < len; i++) {
      value = callback(value, arr[i], i, arr)
    }
    return value
  }
}