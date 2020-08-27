const changeFunc = (item) => { item.a = 3 }
let arrobj = [{ a: 1, b: 2 }]
arrobj.forEach(item => {
  changeFunc(item)
})

console.log(arrobj)