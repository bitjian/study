// 定义一个变量
let message = "hello"
// message = 1997 // 会报错 不能将 number类型赋值给string
console.log(message)

// 定义一个函数
function sayNum(num1: number, num2: number) {
  console.log(num1, num2)
}

// 调用函数
// sayNum('zzj', 1997) // 保存，不能将string参数赋值给number类型
sayNum(1997,1997)
// 将代码编译成javascript
// tsc .\02demo.ts
// 运行js文件
// node .\02demo.js
