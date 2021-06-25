const b1 = Buffer.from('10')
const b2 = Buffer.from('10', 'utf8');
const b3 = Buffer.from([10]);
const b4 = Buffer.from(b3);

console.log(b1.toString(),b2+'',b3.toString(),b4)

Buffer.poolSize = 8 * 1024;
var poolSize, poolOffset, allocPool;

function createPool() {
  poolSize = Buffer.poolSize;
  allocPool = createUnsafeArrayBuffer(poolSize);
  poolOffset = 0;
}
createPool(); // 129 行console.log('Stream 合并完成')