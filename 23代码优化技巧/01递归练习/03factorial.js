/**
 * 
自然数的 阶乘 是指，一个数乘以 数字减去 1，然后乘以 数字减去 2，以此类推直到乘以 1。n 的阶乘被记作 n!。

我们可以将阶乘的定义写成这样：

n! = n * (n - 1) * (n - 2) * ...*1
*/

function factorialWhile(n) {
  let sum = 1
  for(let count = n; count >0; count--) {
    sum = sum * count
  }
  return sum
}

function factorialDg(n){
  if(n===1) {
    return n
  }else {
    return n*factorialDg(n-1)
  }
}

console.log(factorialWhile(10),factorialDg(10))


export {}