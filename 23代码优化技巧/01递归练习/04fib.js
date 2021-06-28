/**
 斐波那契数 序列有这样的公式： Fn = Fn-1 + Fn-2。换句话说，下一个数字是前两个数字的和。

前两个数字是 1，然后是 2(1+1)，然后 3(1+2)，5(2+3) 等：1, 1, 2, 3, 5, 8, 13, 21...。

斐波那契数与 黄金比例 以及我们周围的许多自然现象有关。

编写一个函数 fib(n) 返回第 n 个斐波那契数。
 */

function fib(n) {
  if(n<=2) {
    return 1
  }else {
    return fib(n-1) + fib(n-2)
  }
}

console.log(fib(8))

// console.log(fib(77))  // 用递归计算不出来...

// 1,1, 2(1+1), 3(2+1),5(3+2)
function fibWhild(number) {
    let n = 1
    let n_1 = 1

    let fibNum
    for( let num=3; num<=number; num++) {
      fibNum = n + n_1
      n_1 = n
      n = fibNum
    }
    console.log(fibNum)
    return fibNum
}

fibWhild(7)

// export{}
