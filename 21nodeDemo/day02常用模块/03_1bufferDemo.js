// 创建一个长度为 10、且未初始化的 Buffer。 它可能包含敏感的数据
// console.log(Buffer.allocUnsafe(10));

// 创建一个长度为 10、且用 0 填充的 Buffer。
// console.log(Buffer.alloc(10));

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
// console.log(Buffer.from([1, 2, 3]));

// 写入缓冲区
var buf = Buffer.alloc(256);
var s = 'GentylJian.github.io'
// console.log(s.length);
// 参数： 写入缓存区的字符串， 开始的索引， 写入的长度， 编码
len = buf.write(s);
// console.log(buf);
// console.log('写入字节数：' + len);

// 从缓存区读取数据
// encoding 编码 start开始索引 默认0 end 结束位置 默认末尾
console.log(buf.toString('utf8'));

// 将Buffer 转换成 JSON




