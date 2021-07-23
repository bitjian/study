// 马场可以养马 牛场可以养牛 可以养马和牛
interface Farm {
   newAnimal(): Animal
}

class HorseFarm implements Farm {
  newAnimal() {
    return new Horse()
  }
}

class CattleFarm implements Farm {
  newAnimal() {
    return new Cattle()
  }
}

abstract class Animal {
  abstract show(): void
}

class Horse extends Animal {
  show() {
    console.log('this is Horse');
  }
}

class Cattle extends Animal {
  show() {
    console.log('this is Cattle');
  }
}

class FarmFactory {
  static getFarm(type: string): Farm {
    let instance: any
    if (type === 'horse') {
      instance =  new HorseFarm()
    }
    if(type === 'cattle') {
      instance = new CattleFarm()
    }
    return <Farm>instance
  }
}

let f1: Farm = FarmFactory.getFarm('horse')
let horse: Animal = f1.newAnimal()
horse.show()
export {}