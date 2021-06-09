let a = 1
console.log("a1",a)
onMounted= function(calc) {
  calc()
}
onMounted(() => {
  a = 2
  console.log('a2',a)
})
console.log('a3', a)

console.log('window.a', global.a)