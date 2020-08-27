'use strict';

var path = require('path');

// 解析当前目录的绝对路径
var workDir = path.resolve('.');
console.log(workDir);
// 组合完整路径
var filePath = path.join(workDir, 'pub', 'index.html');
console.log(filePath);