
// 代理模式:中间商赚差价，你想调用的方法，我给你加一点条件
// 房子
interface House {
  display():void
}
// 房东
class Landlord implements House {
  constructor(public position){}
  display() {
    console.log(this.position);
  }
}
// 中介
class HouseAgent implements House {
  landlord:Landlord
  constructor(fd:Landlord) {
    this.landlord = fd
  }
  display() {
    this.customPay()
    this.landlord.display()
    this.landlordPay()
  }
  landlordPay():void {
    console.log("收取房东一半的中介费");
  }
  customPay():void {
    console.log("收取你一半的中介费");
  }
}

(function MainFunc() {
  const landlord = new Landlord('金地艺境21栋1单元806')
  const agent = new HouseAgent(landlord)
  agent.display()
})()

export {}