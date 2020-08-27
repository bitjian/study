// 入参函数
function add(a, b, c) {
    return a + b + c 
}
// 生产偏函数
function partial(fn, a) {   
    return function(b, c) {
        return fn(a, b, c)
    }
}
// 传入 入参函数和固定参数，并接收返回的函数
const parAdd = partial(add, 66);
console.log(parAdd(1, 2)); //利用返回的函数 再传入剩余的参数