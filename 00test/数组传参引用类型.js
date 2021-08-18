const getArr = () => {
  let arr = [1,2,3,4,5,6]
  while(arr.length) {
    arrFun(arr)
  }
  console.log(arr)
  return arr
}

const arrFun = (arr) => {
  console.log(arr.shift())
}

getArr()