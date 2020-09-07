/**
 * 类型别名：  type
 * 类型别名就是给声明的类型取一个名字，方便后面引用
 */
type Name = string;  // 一个string类型的注解
type NameFun = () => string // 一个函数类型的注解
type NameOrFun = Name | NameFun // 一个联合类型

function getName(n: NameOrFun): Name {
  if (typeof n === 'string') {
      return n;
  } else {
      return n();
  }
}

export {}