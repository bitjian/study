/**
 * 联合类型
 * 使用|分隔每个类型，声明的变量可以是|分隔类型中的一个
 */

//  1.使用 | 分隔每个类型
let myFavoriteNumber: string | number;
myFavoriteNumber = '七'  // 可以是字符串
myFavoriteNumber = 7  // 也可以是数字

// 2.访问联合类型变量时，只能访问所有类型里共有的属性或方法
function getLength(something: string | number): any {
  // return something.length  // 报错， number不存在length属性
  return something.toString()
}

// 3. 联合类型在赋值时，会根据值类型推断出一个类型
myFavoriteNumber = '七'  // 此时是 string类型
console.log(myFavoriteNumber.length) // 可以访问length 属性
myFavoriteNumber = 7  // 此时是数字类型
// console.log(myFavoriteNumber.length) // 报错，number不存在length属性