// 每次去对比中间的数，如果等于中间的数则返回， 如果中间的数比目标数字小，则去中间下边的右边去找，否则去中间数的左边去找
// 数组必须是升序或者降序
let arr = [-9, -5, -3, 0 , 5 , 8, 10]
const target = 8
function findNum(arr, target) {
  let left = 0
  let right = arr.length -1
  while(left <= right) {
    const mid = parseInt(( right + left ) / 2)
    if(arr[mid] === target) {
      return mid
    }else if (arr[mid] < target) {
      left = mid +1
    }else {
      right = mid -1
    }
  }
  return -1
}

console.log(findNum(arr, target));


const fn=()=>{} 