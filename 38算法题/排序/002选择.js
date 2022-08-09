let arr = [6,2,8,9,0,1,4]
let temp = ''
// 找到每次查询的最小或者最大的数,然后替换掉第一次遍历的i个数组，然后进行下一次寻找
for(let i = 0; i < arr.length-1; i++) {
let minIndex = i;
  for(let j = i+1; j < arr.length; j++) {
    if(arr[j] > arr[minIndex]) {
      minIndex = j
    }
  }
  temp = arr[i]
  arr[i] = arr[minIndex]
  arr[minIndex] = temp

}
console.log(arr)