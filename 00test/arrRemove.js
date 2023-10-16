let arr = [1,2,3,4,5,6,7];
const removeData = (rowIndexs)=>{
    if(Array.isArray(rowIndexs)){
      rowIndexs.forEach((index)=>{
            arr.splice(index,1)
        })
    }
}
const remove2 = (indexArr, originArr) => {
  arr = [...originArr].reduce((pre,cur,index) => {
    console.log(index,cur)
    if(indexArr.includes(index)) return pre
     pre.push(cur)
     return pre
  }, [])
}

const remove3 = (indexArr, originArr) => {
  const data = indexArr.map(idx => originArr[idx])
}  
// removeData([1,4]); 
// console.log(arr)
// const newArr = remove2([1,4], arr)
const newArr = remove2([1,4], arr)
console.log(arr); 