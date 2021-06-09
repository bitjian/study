'use strict';
// 流分为标准输入流（stdin), 标准输出流(stdout)

// 文件流读取文本内容
var fs = require('fs');

// // 打开一个流
// var rs = fs.createReadStream('day01.md', 'utf-8');

// // 监听data事件，会一点一点的获取流里的内容
// rs.on('data', function(chunk) {
//     console.log('DATA');
//     console.log(chunk);
   
// })

// // 这个流读取到末尾了
// rs.on('end', function(){
//     console.log('END');
// })
// // 这个流出错误了
// rs.on('error', function(err) {
//     console.log('ERROR');
//     console.log(err);
// })

// 文件流写入数据
// 打开输出流
// var ws1 = fs.createWriteStream('output1.txt', 'utf-8');
// // 写入数据
// ws1.write('使用Stream写入文本数据。。。1\n');
// ws1.write('END.');
// // 结束
// ws1.end();

// var ws1 = fs.createWriteStream('output2.txt', 'utf-8');
// // 写入数据
// ws1.write(Buffer.from('使用Stream写入文本数据。。。1\n', 'utf-8'));
// ws1.write(Buffer.from('END.', 'utf-8'));
// // 结束
// ws1.end();

// 将文件串联起来，复制文件
var rs = fs.createReadStream('03.cmd_1.js');
var ws = fs.createWriteStream('copide.txt');
// 流读取完毕会触发 on事件， 如果不希望可以传入参数 {end: false}
rs.pipe(ws);

