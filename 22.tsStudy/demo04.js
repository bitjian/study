"use strict";
// ts演化
// 改造demo03 扩展接口，避免重复声明
Object.defineProperty(exports, "__esModule", { value: true });
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
function filterByTerm(input, searchTerm) {
    if (!searchTerm)
        throw Error("searchTerm 不能为空");
    if (!input.length)
        throw Error("input 不能为空");
    var regex = new RegExp(searchTerm, "i");
    return input.filter(function (item) {
        return item.url.match(regex);
    });
}
// 声明 IPost实例
// const ipost :IPost = {url:"post1"}; // 缺少title 和 body字段
var ipost = { url: "post1", title: "title1", body: "body" };
var ilink1 = { url: "string1" };
var ilink2 = { url: "string2" };
var ilink3 = { url: "string3" };
var inputParams = [ilink1, ilink2, ilink3]; // 如果新增属性不是可选属性，则需要声明定义的属性值，否则报错
filterByTerm(inputParams, "java");
console.log(ipost);
