// exports.add = function() {
//     var sum = 0;
//     i = 0;
//     args = arguments,
//     l = args.length;
//     while (l-- > 0) {
//         sum += args[i++];
//     }
//     return sum;
// }

// module.exports = function () {
//     console.log('空函数');
// }
exports = function () {
        console.log('空函数');
    }

// module.exports.ex = function () {
//     console.log('空函数');
// }

// console.log(module);
// console.log(exports);
// console.log(module.exports);

// 综上可以看出 exports 是一个 对 module.exports的引用， exports --> module.exports，
// 如果改变exports的指向，不会改变 module.exports 对象

(function (exports, require, module, __filename, __dirname) { 
    var math = require('math'); 
    exports.area = function (radius) { 
    return Math.PI * radius * radius; 
    }; 
   });