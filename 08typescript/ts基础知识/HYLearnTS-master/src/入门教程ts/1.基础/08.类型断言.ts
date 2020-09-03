/**
 * 类型断言
 * 用来手动指定一个值的类型
 * 语法：
 * 值 as 类型断言
 * <类型>值
 */

/**
 * 1.类型断言的用途
 */

/**
 * 1.1将联合类型断言为其中一个类型
 */
// 有时候，我们确实需要在还不确定类型的时候就访问其中一个类型特有的属性或方法，比如：
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}
// 会报错，swim不是Cat和Fish的共有属性
// function isFish(animal: Cat | Fish) {
//   if (typeof animal.swim === 'function') {
//       return true;
//   }
//   return false;
// }
// 通过类型断言可以解决，但是不要滥用断言，避免断言后调用方法或引用深层属性以减少不必要的运行时错误。
function isFish(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === 'function') {
    console.log('i can swim in hotWater')
  }
  (animal as Cat).run()  // 这里编译时不会报错，但是当传入Fish类型，运行到这里就会报错
  return false;
}

/**
 * 1.2将父类断言为更具体的子类
 */
// 是一个接口
interface ApiError extends Error {
  code: number;
}
// 是一个接口，在编译后会被删除
interface HttpError extends Error {
  statusCode: number;
}

// function isApiError(error: Error) {
//   if (error instanceof ApiError) {  //报错 接口不能使用 instanceof 判断类型，此时就需要使用类型断言
//       return true;
//   }
//   return false;
// }
function isApiError(error: Error) {
  if (typeof (error as ApiError).code === 'number') {  // 通过判断是否存在 code 属性，来判断传入的参数是不是 ApiError
    return true;
  }
  return false;
}
/**
 * 1.3将任何一个类型断言为 any
 */
// 有时候我们需要在一个对象上添加一个属性
// window.foo = 1  // 此时会报错，提示window上不存在foo属性
// 使用类型断言为 any类型，any可以访问任意属性和方法
(window as any).foo = 1

/**
 * 1.4将any断言为一个具体的类型
 * 有时候我们遇到any变量，想把它记事的断言为精确类型，便于后面的代码维护
 */
// 有个函数，它的返回值是any
function getCacheData(key: string): any {
  return (window as any).cache[key];
}
// 使用它后想把返回值断言为一个精确类型，这样方便后面操作
interface Cat {
  name: string;
  run(): void;
}
// 使用后断言为Cat类型，这样就可以精确类型，只能调用cat上的属性和方法了
const tom = getCacheData('tom') as Cat;
tom.run();

/**
 * 2.类型断言的限制
 * 从上面的例子中，我们可以总结出：
 * （1）联合类型可以被断言为其中一个类型
 * （2）父类可以被断言为子类
 * （3）任何类型都可以被断言为 any
 * （4）any 可以被断言为任何类型
 * （5）但并不是任何一个类型都可以被段艳伟任何另一个类型，
 * （6）需要满足若 A 兼容 B，那么 A 能够被断言为 B，B 也能被断言为 A
 */
interface Animal {
  name: string;
}
interface Cat {
  name: string;
  run(): void;
}
// TypeScript 是结构类型系统，类型之间的对比只会比较它们最终的结构，而会忽略它们定义时的关系。
// 最终的结构和下面继承是等价的
interface Animal {
  name: string;
}
interface Cat extends Animal {
  run(): void;
}
// 既然和Cat 继承 Animal是等价的
let tom2: Cat = {
  name: 'Tom',
  run: () => { console.log('run') }
};
// 那么便可以将子类实例赋值给父类类型变量，换成 TypeScript 中更专业的说法，即：Animal 兼容 Cat。
let animal2: Animal = tom2;
// 当 Animal 兼容 Cat 时，它们就可以互相进行类型断言了
animal2 = tom2 as Animal
tom2 = animal2 as Cat
// tom2 = animal2 as Animal // 父子类可以互相断言，也可以将子类实例赋值给父类， 但是不能把父类实例赋值给子类，因为父类实例缺少子类定义的方法
// 因为 Animal 兼容 Cat 所以 cat可以断言为 Animal, animal 可以断言为 Cat
// 所以这也可以换一种说法：
// 要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可
// 综上所述：
// 联合类型可以被断言为其中一个类型
// 父类可以被断言为子类
// 任何类型都可以被断言为 any
// any 可以被断言为任何类型
// 要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可
// 其实前四种情况都是最后一个的特例。

/**
 * 3.类型断言vs类型转换
 * 类型断言不会进行类型转换
 */
function toBoolean(something: any): boolean {
  return something as boolean; // 需要进行类型转换，请手动使用Boolean()
}
toBoolean(1);
// 返回值为 1

/**
 * 4.类型断言vs类型声明
 * 可以使用类型声明代替类型断言
 * 类型声明是比类型断言更加严格的
 * 最好优先使用类型声明，这也比类型断言的 as 语法更加优雅
 */
function getCacheData4(key: string): any {
  return (window as any).cache[key];
}

interface Cat4 {
  name: string;
  run(): void;
}
// 通过类型声明代替
// const tom = getCacheData('tom') as Cat;
const tom4: Cat4 = getCacheData('tom');
tom4.run();

/**
 * 5.类型断言 vs 泛型
 * 上面的方法还以使用泛型来代替类型断言
 */
function getCacheData5<T>(key: string): T {
  return (window as any).cache[key];
}

interface Cat5 {
  name: string;
  run(): void;
}
// 通过泛型传入Cat5类型，返回Cat5类型
const tom5 = getCacheData5<Cat5>('tom');
// 这里tom5会被类型推论为 Cat5类型
tom.run();