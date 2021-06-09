
var path = require('path');
var fs = require('fs')

// // 解析当前目录的绝对路径
// var workDir = path.resolve('.');
// console.log(workDir);
// // 组合完整路径
// var filePath = path.join(workDir, 'pub', 'index.html');
// console.log(filePath);

let filepath = path.resolve('D:/zijianzhang/资料/0108+电脑壁纸/0108')
let filelist = fs.readdirSync(filepath);
console.log(filelist)
// fs.stat(filepath, (err, stats) => {
//   if(err) {
//     console.log('err:'+err)
//     return
//   }
//   let flag = stats.isFile()
//   console.log(err)
// })
// fs.statSync(filepath)
// console.log(fileStat)