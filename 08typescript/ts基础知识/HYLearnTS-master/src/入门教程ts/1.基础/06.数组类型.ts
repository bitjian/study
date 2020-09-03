/**
 * 数组
 */
/**
 * 1.[类型 + 方括号]表示法
 */
// 定义的数组项不允许出现其他类型
let numArr: number[] = [0o766, 1, 2]
// let numArrErr: number[] = [0o766, 1, 2, '2']
// 数组的方法也会进行类型限制
// numArr.push('2')  // 报错
// 可以定义any类型数组，这样就可以包含任何值了
let anyArr: any[] = [null, undefined, 1, '2', {age: 23}]


/**
 * 2.数组泛型表示, (不建议)
 */
const numAbs: Array<number> = [0o766, 1, 2]


/**
 * 3.用接口表示(建议)
 */
//  这里表示索引类型为数字时，值类型也必须是数值
interface NumberArray {
  [index: number]: number;
}
let numI: NumberArray = [1, 1, 2, 3, 5];
interface anyArray {
  [index: number]: any;
}
let anyI: anyArray = [1,'2',true]

/**
 * 类数组
 * 类数组不是数组类型，例如arguments
 * 所以不能将类数组赋值给数组类型，
 * 需要定义类数组接口
 */
// function getName() {
//   let args: number[] = arguments; // 报错，类型“IArguments”缺少类型“number[]”的以下属性: pop, push, concat, join 及其他 24 项
// }


// 自己定义一个类数组接口
interface IArg {
  [index: number]: string;
  length: number;
  callee: Function;
}
function sum() {
  let args: IArg = arguments;
}
// 事实上常用的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等
function summed() {
  let args: IArguments  = arguments;
}

export default {}