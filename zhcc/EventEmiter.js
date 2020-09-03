class EventEmiter {
  static instance;
  constructor() {
    this._events = {};
  }

  on(eventName, callback) {
    if (this._events[eventName]) {
      this._events[eventName].push(callback);
    } else {
      this._events[eventName] = [callback];
    }
  }

  emit(eventName, ...rest) {
    if (this._events[eventName]) {
      this._events[eventName].forEach((item) => {
        item.apply(this, rest);
      });
    }
  }

  removeListener(eventName, callback) {
    if (this._events[eventName]) {
      this._events[eventName] = this._events[eventName].filter(item => item !== callback);
    }
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new EventEmiter();
      return this.instance;
    }
  }
}

export default EventEmiter;