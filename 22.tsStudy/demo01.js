// ts演化
// 创建一个js函数
function filterByTerm(input, searchTerm) {
  if (!searchTerm) throw Error("searchTerm 不能为空");
  if (!input.length) throw Error("input 不能为空");
  const regex = new RegExp(searchTerm,"i")
  return input.filter(item => {  // 数组才有filter方法
    return item.url.match(regex)
  })
}

filterByTerm("input string", "java")
// 运行会发现，js不能在运行之前发现错误