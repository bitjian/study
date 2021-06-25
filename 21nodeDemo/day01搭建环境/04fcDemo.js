'use strict';

var fs = require('fs');
// 参数： 文件路径， 编码格式， 处理函数
// fs.readFile('01helloWorld.js', 'utf-8', function(err, data) {
//     if(err) {
//         console.log(err);
//     }else {
//       // 打印js的内容
//         console.log(data);
//     }
// })

// 获取二进制文件
fs.readFile('01.docx', (err, data) => {
    if(err) {
        console.log(err);
    }else {
        console.log(data);
        console.log(data.length + 'bytes');
        // 二进制文件返回的data是一个Buffer对象，可以转换成String对象
        let text = data.toString('utf-8');
        console.log(text);
        // 可以将String转换成Buffer对象
        // let buf = Buffer.from(text, 'utf-8');
        // console.log(buf);
    }
})

// 同步读文件， 同步读取的函数和异步相比，多了一个Sync后缀，并且不接受回调函数，函数直接返回结果
// var data = fs.readFileSync('01.helloWorld.js', 'utf-8');
// console.log(data);
// 发生错误需要同通过try...catch捕获错误
// try {
//     var data = fs.readFileSync('01helloWorld.js', 'utf-8');
//     console.log(data);
// } catch (err) {
//     console.log(err);
// }

// 写文件
// 参数 文件路径， 写入的数据， 回调， 默认是UTF-8，如果传入的数据是Buffer则 写入二进制文件
// 文件名不存在会创建该文件, 写入的内容会覆盖掉之前文件的内容
// var data = 'hello writeFile asyns';
// fs.writeFile('day01.md', data, err => {
//     if(err) {
//         console.log(err);
//     }else {
//         console.log('ok');
//     }
// })
// 同步写入
// fs.writeFileSync('day01.md', data);

// 获取文件或目录 的详细信息
// try {
//     var stat = fs.statSync('sample.txt')
//     // 是否是文件:
//     console.log('isFile: ' + stat.isFile());
//     // 是否是目录:
//     console.log('isDirectory: ' + stat.isDirectory());
//     if (stat.isFile()) {
//         // 文件大小:
//         console.log('size: ' + stat.size);
//         // 创建时间, Date对象:
//         console.log('birth time: ' + stat.birthtime);
//         // 修改时间, Date对象:
//         console.log('modified time: ' + stat.mtime);
//     }
// } catch (err) {
//     console.log(err);
// }

