
/**
 * 类型推论
 * 如果声明时没有进行类型注解，那么ts会根据赋值推测出一个类型
 * 这就是类型推断
 * 如果没有声明时没有类型注解，没有赋值，则默认为any类型
 */

let myFavoriteNumber = 'seven';
// myFavoriteNumber = 7; // 报错， 类型推断 myFavoriteNumber为 string类型

let myFavoriteNum;  // 类型推断为 any
myFavoriteNum = 'seven';
myFavoriteNum = 7;

export {}