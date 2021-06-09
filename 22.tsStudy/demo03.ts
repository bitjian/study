// ts演化
// 改造demo02 给接口添加属性

// 定义一个接口，包含url属性
interface ILink {
  url:string,
  description?: string,  // 通过？定义可选属性
  id?:number
} 
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

function filterByTerm(input:Array<ILink>, searchTerm:string) {
  if (!searchTerm) throw Error("searchTerm 不能为空");
  if (!input.length) throw Error("input 不能为空");
  const regex = new RegExp(searchTerm,"i")
  return input.filter(item => {  // 数组才有filter方法
    return item.url.match(regex)
  })
}
const ilink1:ILink = { url: "string1" };
const ilink2:ILink = { url: "string2" };
const ilink3:ILink = { url: "string3" };
const inputParams:Array<ILink> = [ilink1,ilink2,ilink3]  // 如果新增属性不是可选属性，则需要声明定义的属性值，否则报错
filterByTerm(inputParams, "java")

export {}