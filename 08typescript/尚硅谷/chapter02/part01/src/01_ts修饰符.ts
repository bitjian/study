/**
 * public protected private修饰符
 * public 公共暴露出去
 * protected 可以在子类中修改
 * private 只可以在自身里修改
 */

(function () {
  class Person {
    public name: string;
    public age: number;
    protected income: number;
    private _secret: string;
    constructor(name: string, age: number, income: number, secret: string) {
      this.name = name
      this.age = age
      this.income = income
      this._secret = secret
    }

    /**
     * private属性只能在本类里访问
     * @param sth 
     */
    setSecret(sth: string) {
      this._secret = sth
      console.log(`set Person secret" ${this._secret}`)
    }
    getSecret() {
      console.log(`secret is ${this._secret}`)
      return this._secret
    }
    // 属性存储器， 可以通过set get属性存储器来获取和设置属性
    set secret(sth:string) {
      this._secret = sth
    }
    get secret(){
      return this._secret
    }
  }

  class ProgramMonkey extends Person {
    constructor(name: string, age: number, income: number, secret: string) {
      // 子类必须在构造函数调用super构造函数，不然子类获取不了this
      super(name, age, income, secret)
    }
    /**
 * private属性只能在本类里访问
 * 在子类访问secret会报错
 * @param sth 
 */
    // setSecret(sth: string) {
    //   this.secret = sth
    //   console.log(`set Person secret" ${this.secret}`)
    // }
    // getSecret() {
    //   console.log(`secret is ${this.secret}`)
    // }
    /**
     * protected 属性 可以在子类修改和访问
     * @param money 
     */
    setIncome(money: number) {
      this.income = money
      console.log(`son class set Income ${money}`)
    }

    getIncome() {
      console.log(`son class get Income ${this.income}`)
      return this.income
    }
  }

  const pm = new ProgramMonkey('孙jj', 24, 8000, '我写了500个bug了')
  // pm.secret // 属性“secret”为私有属性，只能在类“Person”中访问
  // pm.income  // 属性“income”受保护，只能在类“Person”及其子类中访问。
  console.log('public age:'+pm.age, 'public name:'+pm.name);
  // 通过类方法 访问 protected 属性
  pm.setIncome(10000)
  console.log('protected income:'+ pm.getIncome())
  // 通过父类方法 访问 private属性
  // pm.setSecret('我又写了 100 个 bug')
  // console.log('private secret'+ pm.getSecret());
  // 通过属性修饰符 获取
  console.log(`之前${pm.getSecret()},后来${pm.secret = '我又写了100个' }`);
})()