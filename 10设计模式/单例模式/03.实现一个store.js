// 利用闭包模式
function StoreClose() { }
// 通过原型链方法
StoreClose.prototype.setItem = function (key, value) {
  localStorage.setItem(key, value)
}
StoreClose.prototype.getItem = function (key) {
  localStorage.getItem(key)
}
// 通过闭包创建实例
const store = (function () {
  let instance = null
  return function () {
    if (!instance) {
      instance = new StoreClose()
    }
    return instance
  }
})()

// 利用类的静态函数创建实例
class Store {
  static getInstance() {
    if (!Store.instance) {
      Store.instance = new Store()
    }
    return Store.instance
  }
  setItem(key, value) {
    localStorage.setItem(key, value)
  }
  getItem(key) {
    localStorage.getItem(key)
  }
}

// 单例模式说白了，就是用一个可以持续访问的变量（只有内部函数能改变）去接受一个实例，如果变量不为空就返回变量，变量为空就给变量赋值
