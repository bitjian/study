class EventEmiter {
  static instance
  constructor() {
    this.handlers = {}
  }
  addHandler(eventName, callback) {
    if(this.handlers[eventName]) {
      this.handlers[eventName].push(callback)
    }else {
      this.handlers[eventName] = [callback]
    }
  }
  fire(eventName,...rest) {
    if(this.handlers[eventName]) {
      this.handlers[eventName].forEach((item) => {
        item.apply(this, rest)
      })
    }
  }
  removeHandler(eventName, callback) {
    if(this.handlers[eventName]) {
      this.handlers[eventName] = this.handlers[eventName].filter(item => item !== callback)
    }
  }
  static getInstance() {
    if(!this.instance) {
      this.instance = new EventEmiter()
      return this.instance
    }else {
      return this.instance
    }
  }
}