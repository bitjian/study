const fs = require('fs')

// 创建读取流
const readstream = fs.createReadStream('./demo.js',{encoding:'utf-8'})
// console.log(readstream);
// 创建写入流
const writeStream = fs.createWriteStream('./info.log')
// console.log(writeStream);

// 将读取流写入到 info.log;
// writeStream.write(readstream) × 报错
// 通过管道流写入
// readstream.pipe(writeStream)
// 可以通过 options 里的 end：false 选项 自己监听end
readstream.pipe(writeStream,{end:false})
readstream.on('end', () => {
  console.log('enddding');
  writeStream.end()
})

// 通过chunk写入
// readstream.on('data',(chunk)=> {
//   writeStream.write(chunk)
// })

// readstream.on('end',()=> {
//   console.log('结束了');
//   writeStream.end()
// })
