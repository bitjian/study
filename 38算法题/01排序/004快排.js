let arr = [6,2,8,9,0,1,4]

// 选取一个范围，进行基准对比
function quickSort(arr, left, right) {
  let len = arr.length
  // 左边开始的位置
  let leftIndex =typeof left === 'number' ?  left : 0
  // 右边结束的位置
  let rightIndex = typeof right === 'number' ? right : len -1
  let partitionIndex
  if(leftIndex < rightIndex) {
    // 获取与基准对比完后 交换数字的结束位置
    partitionIndex = partition(arr, leftIndex ,rightIndex) 
    // 以借宿位置为坐标 仅需进行快速排序
    quickSort(arr, leftIndex, partitionIndex - 1)
    quickSort(arr,partitionIndex + 1 , rightIndex)
  }
  return arr
}

function partition(arr, left, right) {
  // 选取最左边的数为基准， 遍历用后面的数与基准进行对比，比基准的小的数，将当前坐标的数值与基准前面的index进行交换,交换后index需要+1，遍历完，需要将基准与最后一个index-1() 的数值进行交换,(因为都比基准小，所以需要将基准放到最后面去)， 返回最后一个index位置，进行下一轮快速排序  [leftIndex, index-1], [index + 1, rightIndex] ，下一轮已经分成两部分了
  let privot = left
  let index = privot + 1
  for(let i = index; i <= right; i++) {
    if(arr[i] < arr[privot]) {
      swap(arr, i, index)
      index++
    }
  }
  swap(arr, privot, index - 1)
  return index - 1
}

function swap(arr, i, j) {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

let arr1 = quickSort(arr)
console.log(arr1)