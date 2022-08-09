let arr = [6,2,8,9,0,1,4]
let current , preIndex
// 从后面选择一个数，依次与前面的比较，如果比这个数大，前面的整体往后挪，如果没有就插入这个数
for(let i = 1; i < arr.length; i++) {
  preIndex = i -1
  current = arr[i]
  while(preIndex >= 0 && arr[preIndex] > current) {
    arr[preIndex + 1] = arr[preIndex]
    preIndex--
  }
  arr[preIndex + 1] = current
}
console.log(arr);