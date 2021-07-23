interface Farm {
  newAnimal(): Animal;
  newPlant(): Plant;
}

class SRFarm implements Farm {
  constructor() {
    console.log('welcome to SRFarm ,we have horse and fruit');
    
  }
  newAnimal() {
    return new A_Horse()
  }
  newPlant() {
    return new P_Fruitage()
  }
}

class SGFarm implements Farm {
  newAnimal() {
    return new A_Cattle()
  }
  newPlant() {
    return new P_Vegetables()
  }
}
// 动物
interface Animal {
  show(): void
}
class A_Horse implements Animal {
  show() {
    console.log('this is horse');
  }
}

class A_Cattle implements Animal {
  show() {
    console.log('this is cattle');
  }
}
// 植物
interface Plant {
  show(): void
}

class P_Fruitage implements Plant {
  show() {
    console.log('this is fruit');
  }
}

class P_Vegetables implements Plant {
  show() {
    console.log('this is vegetable');
    
  }
}

class Client {
  plant:Plant
  animal:Animal
  farm:Farm
  constructor() {
    this.farm = new SRFarm()
    this.animal = this.farm.newAnimal()
    this.plant = this.farm.newPlant()
  }
}

let c1:Client = new Client()
c1.animal.show()
c1.plant.show()



