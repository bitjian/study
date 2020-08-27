const buf4 = Buffer.from(['test', 0x2, 0x3, 0x4, 0x5]);

// // // 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
// const buf5 = Buffer.from('tést');

// // 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
// const buf6 = Buffer.from('tést', 'latin1');

// console.log('buf4:',buf4,  ',buf5:'+buf5,',buf6'+buf6)
// buf4:╔╗╚,buf5:tést,buf6t�st

// const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
// const json = JSON.stringify(buf);

console.log(buf4)