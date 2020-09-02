/**
 * 函数类型
 * ts对函数的输入和输出需要进行约束
 */


/**
 * 1.函数声明
 * js有两种定义函数的方式
 * 函数声明和函数表达式
 */
// 函数声明
function sum(x, y) {
  return x + y
}
// 函数表达式
let mySum = function (x, y) {
  return x + y
}
// 使用ts 对函数的输入输出进行约束
// 函数声明类型
function sumT(x: number, y: number): number {
  return x + y
}
// sumT(1, 2, 3); // 报错 多了一个参数
// sumT(1);  // 报错 少了一个参数 y
// 函数表达式类型
let mySumT: (x: number, y: number) => number = (x: number, y: number): number => {
  return x + y
}
// 这里 mySumT:右边的表达式是函数的定义， =>左边是输入类型的定义，=>右边是输出类型的定义
// 函数定义的=> 标识对返回结果的类型定义， 和ES6的箭头函数是不一样的
// 上面可以拆分成类型别名的的形式
type fun = (x: number, y: number) => number
let mySumT1: fun = (x: number, y: number): number => {
  return x + y
}

/**
 * 2.用接口定义函数的形状
 */
// 这里建议用类型别名替换接口定义函数
interface SearchFunc {
  (source: string, subString: string): boolean
}
let mySearch: SearchFunc = function (souce, subString) {
  return souce.search(subString) !== -1
}
// mySearch(123, 1)  // 参数必须是string
mySearch('123', '1')

/**
 * 3.可选参数
 * 前面提到，输入多余参数或者少于要求参数，是不允许的
 * 那我们可以用？定义可选参数
 * 可选参数必须接在必需参数后面。换句话说，可选参数后面不允许再出现必需参数了
 */
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + ' ' + lastName;
  } else {
    return [firstName];  // 没有定义返回值类型，所以为any
  }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('1');
// 报错， 必选参数不能位于可选参数后
// function buildNameErr(firstName?: string, lastName: string) {
//   return firstName + '' + lastName
// }

/**
 * 4.参数默认值
 * ts会将添加默认值的参数识别为可选参数
 * 默认值参数，可以放在必选参数前面
 */
function buildNameExtend(firstName?: string, lastName: string = 'Cat') {
  return firstName + '' + lastName
}
let tomCat = buildNameExtend('Tom', 'Dog')
let tomExtend = buildNameExtend('Tom')
console.log(tomExtend)  // tomCat

/**
 * 5.剩余参数
 * ES6中，可以使用...rest方式获取函数中剩余参数
 */
function push(arr, ...item) {
  item.forEach(arrItem => {
    arr.push(arrItem)
  })
}
// 使用ts声明
function pushTs(arr: any[], ...item: any[]): void {
  item.forEach(arrItem => {
    arr.push(arrItem)
  })
}

/**
 * 重载, 允许一个函数接受不同数量或类型的参数，做出不同的处理
 */
// 使用联合类型可以实现处理不同类型的参数，但是表达不够精确
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}
// 这时可以使用重载定义多个函数的类型。注意是类型，不是实现
// 注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。
function reverseCover(x: number): number;  // 函数重载定义
function reverseCover(x: string): string;  // 函数重载定义
// 函数实现
function reverseCover(x: number | string): number | string {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}

export { }
