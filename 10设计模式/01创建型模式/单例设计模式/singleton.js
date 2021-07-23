class Singleton {
  static getInstance() {
    if(!Singleton.instance) {
      Singleton.instance = new Singleton()
    } 
    return Singleton.instance
  }
}

let s1 = Singleton.getInstance()

let s2 = Singleton.getInstance()

console.log(s1 === s2);