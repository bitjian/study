const EventEmit = require('events')
// 继承 events方法
class MyEventEmitter extends EventEmit {

}

const myEvent = new MyEventEmitter()

myEvent.on('play',(project)=> {
  console.log(`night play ${project}`)
})

myEvent.emit('play','Honor of Kings')

myEvent.emit('play','code veryGood')