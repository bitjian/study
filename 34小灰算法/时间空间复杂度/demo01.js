// 有一个数组 [3,1,2,5,4,9,7,2] , 找出里面有相同的数字

// 不考虑时间复杂度 双重循环
const arr = [3,1,2,5,4,9,7,2,11,12,13,14,15,16,17,1819,20] 
// 函数实现，参数 delay 单位 毫秒 ；
function sleep(delay) {
  var start = (new Date()).getTime();
  while ((new Date()).getTime() - start < delay) {
      // 使用  continue 实现；
      continue; 
  }
}
const a = Date.now()
for(let i=0; i<arr.length; i++ ) {
  for(let j = i+1; j<arr.length; j++) { 
    sleep(50)
    if(arr[i] === arr[j]) {
      const b = Date.now() 
      console.log(arr[i], (b - a))
      return
    }
  }
}

// 考虑时间复杂度，不考虑空间复杂度，用一个对象存储，如果有一个值为2则返回
const obj = {}

for(let i = 0 ; i< arr.length; i++) {
  sleep(50)
  obj[arr[i]] = obj[arr[i]] ? (obj[arr[i]] + 1) : 1
  if(obj[arr[i]] === 2) {
    const b = Date.now() 
    console.log(arr[i], (b - a))
    return
  }
}

