console.log(1)
setTimeout(() => {
  console.log(2)
  (
    new Promise((r) => {
        console.log(3)
        r()
      })
    )
    .then((r) => {
      console.log(4)
    })
})
console.log(5)
