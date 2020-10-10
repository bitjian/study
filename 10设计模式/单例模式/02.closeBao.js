class Demo2{}
const GetInstace = (function() {
  let instance = null 
  return function() {
    if(!instance) {
      instance = new Demo2()
    }
    return instance
  }
})()
let c1 = new GetInstace()
let c2 = new GetInstace()
console.log(c1 === c2)