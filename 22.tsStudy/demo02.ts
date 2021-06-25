// ts演化
// 改造demo01

// 定义一个接口，包含url属性
interface ILink {
  url:string
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

function filterByTerm02(input:Array<ILink>, searchTerm:string) {
  if (!searchTerm) throw Error("searchTerm 不能为空");
  if (!input.length) throw Error("input 不能为空");
  const regex = new RegExp(searchTerm,"i")
  return input.filter(item => {  // 数组才有filter方法
    return item.url.match(regex)
  })
}

filterByTerm02([{url:"input string"}], "java")
// 通过ts,会在运行之前就发现类型上的错误

export {}