// ts演化
// 改造demo05 增加函数返回类型和类型别名

// 定义一个接口，包含url属性，增加索引，来扩展通过动态key值访问属性
interface ILink {
  url:string,
  description?: string,  // 通过？定义可选属性
  id?:number,
  // [prop:string]:string|number|undefined  // number和undefined不能调用match方法
  [prop:string]:any // number和undefined不能调用match方法
} 

// 在ILink基础上增加必填属性 title和body
interface IPost extends ILink {
  title: string,
  body:string
}

// 我们需要定义一个接口
// function filterByTerm(input:Array<string>, searchTerm:string) {
//   if (!searchTerm) throw Error("searchTerm 不能为空");
//   if (!input.length) throw Error("input 不能为空");
//   const regex = new RegExp(searchTerm,"i")
//   return input.filter(item => {  // 数组才有filter方法
//     return item.url.match(regex)  // 报错string上不存在url
//   })
// }

// function filterByTerm(input:Array<object>, searchTerm:string) {
//   if (!searchTerm) throw Error("searchTerm 不能为空");
//   if (!input.length) throw Error("input 不能为空");
//   const regex = new RegExp(searchTerm,"i")
//   return input.filter(item => {  // 数组才有filter方法
//     return item.url.match(regex)  // object
//   })
// }
// 增加别名，给常用的类型设置一个简便的名称
type arrLink = Array<ILink>
// 增加函数返回类型
type funcType = (arrLink:arrLink,searchTerm:string,key:string) => arrLink
const filterByTerm:funcType = (input:arrLink, searchTerm:string,key:string) => {
  if (!searchTerm) throw Error("searchTerm 不能为空");
  if (!input.length) throw Error("input 不能为空");
  const regex = new RegExp(searchTerm,"i")
  return input.filter(item => {  // 数组才有filter方法
    return item[key].match(regex) // 通过动态key值访问对象属性，但在ILink没有什么索引，可能会访问到不能调用match方法的属性
  })
  // }).toString()  // 不能增加toString方法，因为定义了函数返回类型是Array<ILink>
}

// 声明 IPost实例
// const ipost :IPost = {url:"post1"}; // 缺少title 和 body字段
const key:string = 'url'
const ipost :IPost = {url:"post1",title:"title1",body:"body"};
const ilink1:ILink = { url: "string1" };
const ilink2:ILink = { url: "string2" };
const ilink3:ILink = { url: "string3" };
const inputParams:arrLink = [ilink1,ilink2,ilink3]  // 如果新增属性不是可选属性，则需要声明定义的属性值，否则报错
filterByTerm(inputParams, "java",key)
console.log(ipost)

export {}