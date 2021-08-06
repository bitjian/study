// 适配器，有一个两口的插座，但是我的插头是三口的，需要找一个适配器去匹配三口的插头
// 把不支持的接口变得支持

interface Adapter {
  socket(plugs:number):void
  plug():void
}
// 有一个两口的插座
class SocketForTwo {
  num=2
  socketForTwo(plugs):void {
    console.log(plugs+'口插头插入');
    if(plugs !== this.num) return console.log('接口不适配');
    console.log('两口插座 为爱发电');
  }
}
// 三口插头
class PlugForThree {
  num:number = 3
  plug():void {
    console.log(`我有${this.num}口插头`);
  }
}
// 适配器
class SocketAdapter extends PlugForThree implements Adapter {
  socketIns:SocketForTwo 
  constructor(socketIns:SocketForTwo) {
    super()
    this.socketIns = socketIns
    this.num = 2
  }
  plug():void {
    console.log('我是适配器，我是%d插头',this.num);
  }
  socket(plugs) {
    // 接通两口插座
    this.socketIns.socketForTwo(this.num)
    console.log('万能插座 支持两口，三口，usb');
    console.log('%d口插头插入适配器插口,通电成功',plugs);
    console.log('万能插座 为爱发电');
  }
}

(function mainFunc() {
  const plug:PlugForThree = new PlugForThree()
  plug.plug()
  // 插入插座不太行
  const socket:SocketForTwo = new SocketForTwo()
  socket.socketForTwo(plug.num)
  // 创建适配器
  const adapter:Adapter = new SocketAdapter(socket)
  adapter.plug()
  adapter.socket(plug.num)
})()


export {}
