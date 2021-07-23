class Computer {
  size
  constructor(size){
    this.size = size
  }
  show() {}
}
class Pad extends Computer{
  // constructor(size){
  //   super(size)
  // }
  show() {
    console.log(`this's pad ,it size is ${this.size}GB`);
  }
}
class Laptop extends Computer{
  // constructor(size) {
  //   super(size)
  // }
  show() {
    console.log(`this's pad ,it size is ${this.size}GB`);
  }
}

class ComputerFactory {
  static getInstance(type) {
    switch(type) {
      case 'pad':
        return new Pad(128)
      case 'laptop':
        return new Laptop(512)
    }
  }
}

let c1 = ComputerFactory.getInstance('pad')
let c2 = ComputerFactory.getInstance('laptop')
c1.show()
c2.show()