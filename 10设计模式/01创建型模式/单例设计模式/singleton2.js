class Singleton2 { }

Singleton2.getInstance = function () {
  let instance = null
  return function () {
    if (!instance) {
      instance = new Singleton2()
    }
    return instance
  }
}()

let ss1 = Singleton2.getInstance()
let ss2 = Singleton2.getInstance()

console.log(ss1 === ss2);