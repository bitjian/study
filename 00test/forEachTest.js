let arr = ['1', '2', '3']

let a = arr.forEach(item => {
  if(item == '2') return '2'
  return console.log(item)
})
console.log(a)
// 1，3 这里的return 相当于 continue