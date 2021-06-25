const PENDDING = 'pendding'
const RESOLVE = 'resolve'
const REJECT = 'reject'
class myPromise {
  // 在构造函数里运行执行器
  constructor(excutor) {
    excutor(this.resolve, this.reject)
  }
  status = PENDDING
  value = ''
  reason = ''

  resolve = (value) => {
    if(this.status === PENDDING) {
      this.value = value
      this.status = RESOLVE
    }
  }

  reject = (value) => {
    if(this.status === PENDDING) {
      this.value = value
      this.status = REJECT
    }
  }

  /**then 实现链式调用 */
  then(onFullfilled, onRejected) {
    const promise2 = new myPromise((resolve, reject) => {
      if(this.status === RESOLVE) {
        const x =  onFullfilled(this.value)
        resolvePromise(x, resolve, reject)
      }
      else if(this.status === REJECT) {
        onRejected(this.reason)
      }
    })
    return promise2
  }
}

function resolvePromise(x, resolve, reject) {
  if(x instanceof myPromise) {
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
}