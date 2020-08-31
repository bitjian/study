/**
 * 任意值： any
 * 将类型注解为 any 则可以赋值为任意类型
 * 进行任意操作
 */

//  1.可以切换为其他类型的值
let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7
myFavoriteNumber = true

// 2.可以访问任何属性
let anyThing: any = {}
console.log(anyThing.myName)
console.log(anyThing.myName.firstName)

// 3.可以调用任意方法
anyThing.setName('zzj')
anyThing.myName.setName('zzj').sayHello()

// 4变量只声明没有赋值的时候，会被识别为任意值类型
let something; // 识别任意类型
something = 'seven'
something = 7
console.log(something.myName.firstName)

export {}