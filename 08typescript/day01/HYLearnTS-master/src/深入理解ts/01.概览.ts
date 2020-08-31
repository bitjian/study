/**
 * 注解
 * 声明空间： 类型声明空间 和 变量声明空间
 * 不要把类型声明空间赋值给变量 例如接口名
 * 类的命名 既是类型声明空间 也是 一个变量声明空间
 * 一些用 let var const 声明的变量只能赋值用 而不能当作类型注解
 */
class Foo { }
interface Bar { }
type Bas = {};
// const bar = Bar; // Error: "cannot find name 'Bar'" 不要把类型声明空间赋值给变量
const someVar = Foo;  // 类的命名 既是类型声明空间 也是 一个变量声明空间
let fon = 132
// let bar: fon // 报错 fon不能当作类型注解,因为它是变量声明空间


/**
 * 原始类型注解
 * ts可以将 string, number, boolean 等js原始类型作为类型注解
 */

let num: number;
let str: string;
let bool: boolean;
num = 123
num = 123.456
//  num = '123' // 报错
console.log(num)
str = '123'
//  str = 123 // 报错
bool = true
//  bool = 'false' // 报错


/**
 * 数组
 * 使用数组注解 需要在类型使用后缀[] :type [],表示是什么类型数组
 */
let numArr: number[];
let strArr: string[];
let boolArr: boolean[];
numArr = [1, 2, 2.50]
// numArr = [1, '2', 2.50] // 报错
strArr = ['1', '2']
// strArr = ['1', '2', 3] // 报错
boolArr = [true, false]


/**
 * 接口， 能合并众多类型至一个类型声明
 */
interface Person {
  name: string;
  age: number;
}
let person1: Person
person1 = {
  name: 'sjj',
  age: 23
}
// 报错 缺少参数 age
// person1 = {
//   name: 'sjj'
// }
// 报错 类型不正确
// person1 = {
//   name: 'sjj',
//   age: '二十三'
// }


/**
 * 内联类型
 * 比创建接口少一个名字
 */
let people: {
  name: string;
  age: number;
}
people = {
  name: 'zzj',
  age: 23
}

/**
 * 特殊类型
 * any, null, undefined，void
 * any 能赋予任何值给此注解的变量
 * null 和 undefined类型的值 能赋值给任意变量
 * void 标识一个函数没有返回值
 */
let allType: any
allType = 1
allType = '2'
allType = false
allType = {}
// ...........省略
let nullVal: null
let unVal: undefined
nullVal = null
// nullVal = undefined // 报错 只能赋值null

unVal = undefined
// unVal = null // 报错 只能赋值unVal
allType = nullVal
allType = unVal
// void 标识一个没有返回值的函数
function log(message: string): void {
  console.log(message)
}


/**
 * 泛型
 * 想统一函数里的各种数据的类型
 * 例子：在一个函数中，它接受一个列表，并且返回这个列表的反向排序，这里的约束是指传入至函数的参数与函数的返回值
 */
function reverse<T>(item: T[]): T[] {
  let result = [] // ts会自己断言类型为 T[]
  for (let i = item.length - 1; i >= 0; i--) {
    result.push(item[i])
  }
  return result
}
const sample = [1, 2, 3];
let reversed = reverse(sample); // 当传入sample时reverse会类型推论T为number
console.log(reversed); // 3, 2, 1


/**
 * 联合类型
 * 当希望某个属性或者变量是多个类型之一，使用 | 来联合 例如 string | string[]
 * 希望一个值 既能接受 字符 也能接受字符串
 */
function getStringOrstrArr(command: string[] | string) {
  let unknowType = ''
  if (typeof command === 'string') {
    unknowType = command.trim();
  } else {
    unknowType = command.join(' ').trim()
  }
}


/**
 * 交叉类型
 * 让一个新对象同时拥有两个对象的属性
 * 例子中的extend 为泛型约束， 让T 符合object结构
 */
function extend<T extends object, U extends object>(first: T, second: U): T & U {
  const result =  {} as T & U
  for (const id in first) {
    if (!result.hasOwnProperty(id)) {
    (result as T)[id] = first[id];
    }
  }
  for (const id in second) {
    if (!result.hasOwnProperty(id)) {
      (result as U)[id] = second[id];
    }
  }
  return result
}

/**
 * 元组类型
 * 让数组可以拥有多个类型
 */
let nameNumber: [string, number]
nameNumber = ['1', 2]
// nameNumber = ['1', 2, 3] // error
// 进行结构
const [name1, num1] = nameNumber


/**
 * 类型别名
 * 可以将任何类型注解提供一个别名，方便后面引用
 */

type TextOther = string | { text: string };
type CoordinatesOther = [number, number];
type Callback = (data: string) => void;

let nm: CoordinatesOther
let strObj:TextOther

export default {}




