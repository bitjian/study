/**
 * 接口
 * 接口除了是对类的一部分进行抽象，具体内容需要类去实现
 * 接口还可以当做注解，对多个注解进行包装
 */
// 1.不允许多某些属性,也不能少某个属性,必须和IPerson定义保持一致
interface Person {
  name: string;
  age: number;
}
let sjj: Person = {
  name: 'sjj',
  age: 23
}
// 报错 ，缺少age属性
// sjj = {
//   name: 'sjj'
// }
// 报错， sex属性不在定义中
// sjj = {
//   name: 'sjj',
//   age: 23,
//   sex: 'unknow'
// }

// 2.可选属性，一个属性可有可无可以在属性名后面加上?，代表可选属性
interface PersonPro {
  name: string,
  age: number,
  gr?: string
}
// 没有gr属性，不会报错，因为它是可选的
let zjj: PersonPro = {
  name: 'zzj',
  age: 23
}
// 可以继续添加可选属性
zjj.gr = 'undefined'
// 但不允许添加未定义的属性
// zjj.gender = '男'

/**
 * 3. 任意属性，可以让接口允许有任意属性
 * 这里定义了，接口的属性名为string,
 * 任意属性的属性名类型可以为 index | string，
 * 一旦确定任意属性那么，确定属性和可选属性的值类型 必须是 任意属性值类型的子类型
 */
// 报错，因为任意属性为string ,而 age属性为 number
// interface PersonPPro {
//   name: string;
//   age?: number;
//   [propName: string]: string
// }
// 如果想允许接口的属性值有多种类型，可以使用联合类型和 any
interface PersonPPro {
  basic: PersonPro
  [prop: string]: any  // 这里名字好像可以为任意
}
let hbw: PersonPPro = {
  basic: {
    name: 'hbw',
    age: 23
  },
  aa: 'ss'
}
/**
 * 4.只读属性
 * 可以在属性名前加上readonly，表示只读属性
 * 只读属性只允许在创建时被赋值
 * 注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候
 */
interface PersonRead {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}
let tom: PersonRead = {
  id: undefined,
  name: 'Tom',
};
tom.age = 23
// 报错， id为只读属性，不允许再修改
// tom.id = 22