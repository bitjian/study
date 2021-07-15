const fs = require('fs')
const fsP = require('fs/promises')

// 创建文件夹 是文件夹
// fs.mkdir('./logs', err => {
//   console.log(err);
// })


// 修改文件夹名称
// fs.rename('./logs','./loggers', err => {
//   console.log('done');
// })

// 移除文件夹
// fs.rmdir('./loggers', ()=> {
//   console.log('done');
// })

// 写内容到文件里 需要该文件存在 会重写文件里的内容
// fs.writeFile('./logs/info.log', "[2021-07-11T22:48:58.022] [INFO] default - [Object: null prototype] { x: '3', y: '4' }", err => {
//   console.log(err);
// })

// 给文件追加内容
// fs.appendFile('./logs/info.log',"\n[2021-07-11T22:48:58.022] [INFO] default - [Object: null prototype] { x: '3', y: '4' }", err => {
//   console.log(err);
// })

// 读取文件内容
// fs.readFile('./logs/info.log', (err,data) => {
//   console.log(data); // 是buffer
//   console.log(data.toString('utf-8'));
// })

// 读取目录信息，判断目录文件是文件还是目录
// fs.readdir('./',(err,files)=> {
//   if(err) console.log(err);
//   console.log(files);
//   files.forEach((value,index)=> {
//     fs.stat(`./${value}`, (err,stats) => {
//       console.log(`${value} is (${stats.isDirectory() ? 'directory' : 'file'})`);
//     })
//   })
// })

// 同步读取文件
// 先输出0 后输出1
// try {
//   const  content = fs.readFileSync('./logs/info.log', 'utf-8')  // 指定了 转码格式
//   console.log(content);
//   console.log(0);
// }catch(err) {
//   console.log(err);
// }
// console.log(1);

// 异步读取文件 先输出1 后输出 data 和 0
// fs.readFile('./logs/info.log','utf-8',(err,data)=> {
//   if(err) console.log(err);
//   console.log(data);
//   console.log(0);
// })
// console.log(1);

// 异步读取方式二
fsP.readFile('./logs/info.log', 'utf-8').then(result => {
  console.log(result);
})
console.log(0);


// 监听文件改动的状态
fs.watch('./logs/info.log', (str) => {
  console.log(str);
})





