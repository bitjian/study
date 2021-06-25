"use strict";
// ts演化
// 改造demo01
Object.defineProperty(exports, "__esModule", { value: true });
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
function filterByTerm02(input, searchTerm) {
    if (!searchTerm)
        throw Error("searchTerm 不能为空");
    if (!input.length)
        throw Error("input 不能为空");
    var regex = new RegExp(searchTerm, "i");
    return input.filter(function (item) {
        return item.url.match(regex);
    });
}
filterByTerm02([{ url: "input string" }], "java");
