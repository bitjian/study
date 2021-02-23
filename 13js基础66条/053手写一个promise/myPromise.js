function myPromise(constructor) {
  let self = this
  self.status = 'pendding' // 定义初始状态
  self.resolveVal = undefined
  self.rejectVal = undefined

  // 编写 resolev方法
  function resolve(value) {
    if (self.status === 'pendding') {
      self.resolveVal = value
      self.status = 'resolved'
    }
  }
  // 编写 reject方法
  function reject(value) {
    if (self.status === 'pendding') {
      self.rejectVal = value
      self.status = 'rejected'
    }
  }
  // 构造函数
  try {
    constructor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}
// 编写then方法
myPromise.prototype.then = function (onFullfilled, onRejected) {
  let self = this
  // 根据状态，进行对应的处理
  switch (self.status) {
    case 'resolved':
      onFullfilled(self.resolveVal)
      break;
    case 'rejected':
      onRejected(self.rejectVal)
      break;
    default:
  }
}

new myPromise((resolve, reject) => {
  console.log('myPromise')
  resolve('resolve')
}).then(value => {
  console.log(value)
})

