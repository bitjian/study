// 观察者设计模式由两类对象组成：主体和观察者
// 主体负责发布事件，就是我们接下来要写的对象，他独立存在即使观察者不存在
// 观察者能订阅事件,并知道主体能注册事件的回调函数，使用主体的对象，事件处理代码便是观察者
// 这样做在有助于解耦相关对象，保持功能的隔绝，在很多情况中，触发事件的代码和监听事件的代码是完全分离的
// 写一个主体
function EventTarget() {
  // 主体实例，用来存放各种事件
  this.handers = {}
}
// 编写主体的原型方法，注册事件、触发事件、移除事件
EventTarget.prototype = {
  // 原型的构造函数指向自己的构造函数
  constructor: EventTarget,
  //注册事件(将事件加入到当前实例的handers中) 参数： 事件名称 和 处理函数
  addHandler: function(type, handler) {
    // 如果事件不存在，没有注册过
    if(!this.handers[type]) {
      // 则初始化为一个数组
      this.handers[type] = []
    }
    // 再将处理函数push到数组尾部
    this.handers[type].push(handler)
    console.log('-------注册事件----------')
  },
  // 触发事件 参数 一个带有触发事件名称和处理函数参数的对象
  fire: function(event) {
    // 如果target没有被指定，则指向当前实例
    if(!event.target) {
      event.target = this
    }
    // 如果该事件是一个数组实例（该事件存在）
    if(this.handers[event.type] instanceof Array) {
      // 定义一个变量存储该事件(方便,好看)
      var handerls = this.handers[event.type]
      // 遍历事件依次处理里面的处理函数
      for(var i = 0, len = handerls.length; i < len; i++) {
        handerls[i](event)
      }
    }
    console.log('-------触发事件----------')
  },
  // 移除事件 参数 事件名称，处理函数名
  removeHandler: function(type, handler) {
    // 如果该事件被注册过
    if(this.handers[type] instanceof Array) {
      // 遍历找到该事件对应的处理函数
      var handerls = this.handers[type]
      for(var i = 0, len = handerls.length; i < len; i++) {
        if(handerls[i] === handler) {
          // 如果找到了则跳出循环
          break
        }
      }
      // 找到就移除该函数，没找到就移除个屁
      handerls.splice(i,1)
      console.log('-------移除事件\n'+handler+'\n----------')
    }
  }
}

// -----------使用主体-------------
// 这是一个处理函数，参数 是封装有要处理参数的event
// function handlerMessage(event) {
//   console.log("收到消息:" + event.message)
// }
// function handlerMessageEN(event) {
//   console.log("Message Received:" + event.message)
// }
// // 创建主体对象
// var target = new EventTarget()
// // 注册一个事件处理函数
// target.addHandler('sendMessage', handlerMessage)
// target.addHandler('sendMessage', handlerMessageEN)
// // 触发事件实例函数
// target.fire({type: 'sendMessage', message: '哦嗨呦'})
// // 收到消息:哦嗨呦
// // Message Received:哦嗨呦
// // 移除事件处理函数
// target.removeHandler('sendMessage', handlerMessageEN)
// target.fire({type: 'sendMessage', message: '哦嗨呦'})
// // Message Received:哦嗨呦
// -----------继承主体---------
function Person(name, age) {
  EventTarget.call(this)
  this.name = name
  this.age = age
}
// 寄生组合继承
Person.prototype = EventTarget.prototype
Person.prototype.constructor = Person
// 调用say会触发注册的 introduce函数
Person.prototype.say = function() {
  this.fire({type: 'introduce', name: this.name, age: this.age})
}
// 事件处理函数
function handleIntroduce(event) {
  console.log('Hello,My name is ' + event.name + ',I am '+event.age+' years old')
}
// 创建父类实例，并注册事件处理函数
var person = new Person('zzj', 22)
person.addHandler('introduce', handleIntroduce)
// 调用say方法，会触发handleIntroduce
person.say()
// let handleIntroduceCN = function(event) {
//   console.log('大家好，俺是 ' + event.name + ',俺今年 '+event.age+' 啦')
// }
var person2 = new Person('sjj', 23)
// 如果不注册 则不会调用
// person2.addHandler('introduce', handleIntroduceCN)
// 调用say方法，会触发handleIntroduce
person2.say()
// 总结
// 观察者设计模式应用，差不多理解就是
// 有一个方法要调用，但不知道这个方法有没有写好，没有写好去调用就会报错
// 而观察者设计模式，你不需要等接口写好了再去调用，而是接口写好了，你就调用成功了，没写好便不会执行
// 何时使用：一个对象（目标对象）的状态发生改变，所有的依赖对象（观察者对象）都将得到通知，进行广播通知。
// 观察者模式优点： 1、观察者和被观察者是抽象耦合的。 2、建立一套触发机制。
// 观察者模式缺点： 
//  1、如果一个被观察者对象有很多的直接和间接的观察者的话，将所有的观察者都通知到会花费很多时间。
//  2、如果在观察者和观察目标之间有循环依赖的话，观察目标会触发它们之间进行循环调用，可能导致系统崩溃。 
//  3、观察者模式没有相应的机制让观察者知道所观察的目标对象是怎么发生变化的，而仅仅只是知道观察目标发生了变化。
// 观察者模式使用场景：
// 一个抽象模型有两个方面，其中一个方面依赖于另一个方面。将这些方面封装在独立的对象中使它们可以各自独立地改变和复用。
// 一个对象的改变将导致其他一个或多个对象也发生改变，而不知道具体有多少对象将发生改变，可以降低对象之间的耦合度。
// 一个对象必须通知其他对象，而并不知道这些对象是谁。
// 需要在系统中创建一个触发链，A对象的行为将影响B对象，B对象的行为将影响C对象……，可以使用观察者模式创建一种链式触发机制。
// 注意事项： 1、避免循环引用。 2、如果顺序执行，某一观察者错误会导致系统卡壳，一般采用异步方式。
// https://www.php.cn/js-tutorial-408592.html







