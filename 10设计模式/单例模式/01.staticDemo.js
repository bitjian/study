class Demo {
  static getInstace() {
    if(!Demo.instance) {
      Demo.instance = new Demo()
    }
    return Demo.instance
  }
}
let d1 = Demo.getInstace()
let d2 = Demo.getInstace()
console.log(d1===d2)