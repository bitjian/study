/**
 * 原始数据类型的注解包括： 布尔值，数值，字符串，null, undefined
 */


 /**
  * 布尔值
  */
// 1.使用boolean对布尔值进行注解
let isDone: boolean = false
// 2.可以使用Boolen进行类型转换，但不能使用new Boolean构造函数创建, 其他基本类型也一样
// isDone = new Boolean(1) // 报错，new Boolean 返回的是一个Boolen对象的实例
isDone = Boolean(1)

/**
 * 数值
 */
// 1.使用number对数值型进行注解
let decNum: number = 6  // 10进制
let float: number = 6.666666666  // 浮点数
let hexNum: number = 0xf00d // 16进制
let binaryNum: number = 0b101 // 2进制
let octalNum = 0o766 // 8进制

/**
 * 字符串
 */
// 1.使用string对字符串类型（包括模板字符串）进行注解
let myName: string = 'Tom'  // 普通字符串
let myAge: number = 25
let sentence: string = `Hello my name is ${myName}
i'll be ${myAge + 1} years old next month` // 模板字符串

/**
 * 空值 void
 * void 表示没有任何返回值的函数
 */
function alertName(): void {
  alert("My name is tom")
}
let unusable: void = undefined  // 没有必要使用void注解，因为它只能被赋值为 null 或者 undefined

/**
 * null 和 undefined
 * null 和 undefined 是所有类型的子类型，也就是可以赋值给所有类型
 */
//  1. 使用null 和 undefined注解，初始化后只能赋值其本身
let u: undefined = undefined
let n: null = null
// 2.可以将undefined和null 赋值给所有类型
// 在们在 tsconfig.js 文件中设置 为严格模式下，则不能将undefined和void 赋值给自身和void以外的变量了
let num: number = u
num = n
// num = unusable // void 类型变量不能赋值给其他类型

export {}