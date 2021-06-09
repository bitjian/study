Buffer.poolSize = 8 * 1024;
var poolSize, poolOffset, allocPool;

function createPool() {
  poolSize = Buffer.poolSize;
  allocPool = createUnsafeArrayBuffer(poolSize);
  poolOffset = 0;
}
createPool(); // 129 行