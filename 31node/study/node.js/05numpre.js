var NP = require('number-precision');
NP.enableBoundaryChecking(false);
// 修改之后的
console.log(NP.round(100-7.73-71.95-18.37-1.95, 2).toFixed(2))
// 没改之前的
console.log((100-7.73-71.95-18.37-1.95).toFixed(2))