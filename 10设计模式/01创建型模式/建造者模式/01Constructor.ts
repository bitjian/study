// 装修的客厅
class Parlour {
  wall:string = ''
  TV:string = ''
  sofa:string = ''
  setWall(wall:string){
    this.wall = wall
  }
  setTV(tv:string) {
    this.TV = tv
  }
  setSofa(sofa:string) {
    this.sofa = sofa
  }
  show() {
    console.log(`wall:${this.wall},TV:${this.TV},sofa:${this.sofa}`);
  }
}

// 抽象的装修师
abstract class Decorator {
  protected product: Parlour = new Parlour()
  abstract buildWall():void
  abstract buildTV():void
  abstract buildSofa():void
  public getResult():Parlour {
    return this.product
  }
}

// 具体的装修工
class MiDecorator extends Decorator{
  buildWall() {
    this.product.setWall('小米智能墙')
  }
  buildSofa() {
    this.product.setSofa('小米智能沙发')
  }
  buildTV() {
    this.product.setTV('小米智能电视')
  }
}

// 具体的装修工
class AppleDecorator extends Decorator{
  buildWall() {
    this.product.setWall('Apple智能墙')
  }
  buildSofa() {
    this.product.setSofa('Apple智能沙发')
  }
  buildTV() {
    this.product.setTV('Apple智能电视')
  }
}

// 包工头
class ProjectMananger {
    decorator:Decorator
    constructor(decorator:Decorator) {
      this.decorator = decorator
    }
    // 命令装修
    decorate():Parlour {
      this.decorator.buildWall()
      this.decorator.buildSofa()
      this.decorator.buildTV()
      return this.decorator.getResult()
    }
}

(function mainFun() {
  // 选择某牌子装修工
  const decorator:Decorator = new MiDecorator()
  // 叫包工头排这个装修工装修
  const manage:ProjectMananger = new ProjectMananger(decorator)
  // 进行装修，并返回装修好的放假
  const product:Parlour = manage.decorate()
  product.show()
})()