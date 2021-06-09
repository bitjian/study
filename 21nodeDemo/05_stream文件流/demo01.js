const fs = require('fs')
const path = require('path')

const streamMerge = (sourceFiles, targetFile) => {
  // 获取目录下的问价
  const files = fs.readdirSync(path.resolve(__dirname, '../', sourceFiles))
  // 获取写入流
  const writeStream = fs.createWriteStream(path.resolve(__dirname, targetFile))
  streamMergeWhile(files, writeStream, sourceFiles)
}

const streamMergeWhile = (files, writeStream, sourceFiles) => {
  console.log(files)
  if (!files.length) {
    return writeStream.end("console.log('Stream 合并完成')")
  }
  const readStream = fs.createReadStream(path.resolve(__dirname, `../${sourceFiles}/`, files.shift()))
  readStream.pipe(writeStream, { end: false })
  readStream.on("end", () => {
    streamMergeWhile(files, writeStream, sourceFiles)
  })
  readStream.on('error', function (error) { // 监听错误事件，关闭可写流，防止内存泄漏
    console.error(error);
    fileWriteStream.close();
  });
}

streamMerge('01_3Buffer基本使用', 'test.js')