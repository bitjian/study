const fs = require('fs')
const readable = fs.createReadStream('./demo01.js')
const writeable = fs.createWriteStream('./write.js')
console.log(readable,writeable,writeable,writeable.toString())


// readable.pipe(writeable)
readable.pipe(writeable,{end:false})

readable.on('end', () => {
  writeable.end('//结束')
})