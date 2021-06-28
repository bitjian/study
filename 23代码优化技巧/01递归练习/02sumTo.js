
/**
 * 
编写一个函数 sumTo(n) 计算 1 + 2 + ... + n 的和。

举个例子：
sumTo(1) = 1
sumTo(2) = 2 + 1 = 3
sumTo(3) = 3 + 2 + 1 = 6
sumTo(4) = 4 + 3 + 2 + 1 = 10
...
sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050
 */

// 用三种方式实现：
// 使用循环。
// 使用递归，对 n > 1 执行 sumTo(n) = n + sumTo(n-1)。
// 使用 等差数列 求和公式.

function sumToWhile(n) {
  let start = new Date().valueOf()
  let sum = 0
  for (let i = 1; i <= n; i++) {
    sum += i
  }
  let end = new Date().valueOf()
  console.log('sumToDg:'+(end-start))
  return sum
}

function sumToDg(n) {
  if(n<1) {
    return n
  }else {
    return n + sumToDg(n-1)
  }
  // return n<1?n : n+sumToDg(n-1)
}

function sumToDc(n) {
  let start = new Date().valueOf()
  let sum = 0
  sum = (1+n)*n/2
  let end = new Date().valueOf()
  console.log('sumToDg:'+(end-start))
  return sum
}

let sum1 = sumToWhile(10000 )

let start = new Date().valueOf()
let sum2 = sumToDg(10000 )
let end = new Date().valueOf()
console.log('sumToDg:'+(end-start))

let sum3 = sumToDc(10000 )

console.log(sum1,sum2,sum3)


// P.S. 哪种解决方式最快？哪种最慢？为什么？

// P.P.S. 我们可以使用递归来计算 sumTo(100000) 吗？


export {}

