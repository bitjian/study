function myFilter(arr, callback) {
  if (!Array.isArray(arr) || !arr.length || !(callback instanceof Function)) {
    return []
  } else {
    let result = []
    for (let i = 0, len = arr.length; i < len; i++) {
      if (callback(arr[i], i, arr)) {
        result.push(arr[i])
      }
    }
    return result
  }
}