function myMap(arr, callBack) {
  if(!(arr instanceof Array) || !arr.length || typeof callBack !== 'function' ) {
    return []
  }else {
    let result = []
    for(let i = 0; i < arr.length; i++) {
      result.push(callBack(arr[i], i, arr))
    }
    return result
  }
}