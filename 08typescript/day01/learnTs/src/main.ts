let message = "hello"
// message = 1997 // 会报错 不能将 number类型赋值给string
console.log(message)

// 定义一个函数
function sayNum(num1: number, num2: number) {
  console.log(num1, num2)
  let fetchNum = 3
  while(fetchNum > 0) {
    console.log(fetchNum)
    --fetchNum
  }
}

// 调用函数
// sayNum('zzj', 1997) // 保存，不能将string参数赋值给number类型
sayNum(1997,1997)
// 将代码编译成javascript
// tsc .\02demo.ts
// 运行js文件
// node .\02demo.js
// 声明一个name变量会报错 无法重新声明块范围变量，因为name是一个被typescript绑定了dom环境，
// let name = 'zzj'
// export {}
// 这时可以使用将代码封装到模块中
// 模块中有自己的作用域，不会和全局产生冲突
interface Info {
  name: string,
  age: number,
  gender: string
}
// object类型
const myinfo: Info = {
  name: 'zzj',
  age: 22,
  gender: 'man'
}
console.log(myinfo.name)
