/**
 * 枚举（Enum）
 * 枚举用于取值被限定在一点范围的场景
 */
/**
 * 1.简单介绍
 * 枚举第一个值会被初始化为0，后面每个递增1
 * 枚举名和枚举值可以反向映射
 */
enum Days { Sun, Mon, Tue, Wed, Thu, Fri, Sat };
console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true

console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true

/**
 * 2.手动赋值
 */
// 可以手动给枚举赋值 手动赋值的枚举项也可以为小数或负数
enum Days2 { Sun = 7, Mon = 1.5, Tue, Wed, Thu, Fri, Sat };
// 2.1 未赋值的值，会接上一个递增1
console.log(Days2["Sun"] === 7); // true
console.log(Days2["Mon"] === 1.5); // true
console.log(Days2["Tue"] === 2.5); // true
// 2.2 如果枚举值重复了，后面的值映射会覆盖前面的映射
enum Days2_2 { Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat };
console.log(Days["Sun"] === 3); // true
console.log(Days["Wed"] === 3); // true
console.log(Days[3] === "Sun"); // false
console.log(Days[3] === "Wed"); // true
// 2.3 手动赋值可以不是数字 此时需要使用类型断言来让 tsc 无视类型检查
enum Days2_3 { Sun = 7, Mon, Tue, Wed, Thu, Fri, Sat = '星期六' as any };

/**
 * 3.常数项和计算所得项
 */
//  计算所得项 紧接在计算所得项后面的需要手动赋值
enum Color { Red, Green, Blue = "blue".length };
// enum Color {Red = "red".length, Green, Blue}; // 报错，
enum Color2 { Red = "red".length, Green = 0, Blue }; // 赋值后就好了

/**
 * 常数枚举 通过 const enum定义
 * 常数枚举不能包含计算所得项
 */
// 报错，包含计算所得项
// const enum Directions {
//   Up,
//   Down = 'abc'.length,
//   Left = 0,
//   Right
// }