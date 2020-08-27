const DCache = require("@taf/taf-dcache-helper");
const TafStream = require("@taf/taf-stream");

const cacheHelper = new DCache({
  DCacheServerTarget: "DCache.TestProxyServer.ProxyObj@tcp -h 172.16.8.147 -t 60000 -p 36256",
  moduleName: "TestzjZDemo"
});
/**
* 设置key-value
* @param keyItem, key的值
* @param value, 要设置的数据
* @return int,  返回码
*/
// cacheHelper.setString('fixed_key', 'fixed_value').then(function (ret) {
//   if (ret.iRet === 0) { //iRet 返回码
//     console.log('setString success', ret);
//   } else {
//     console.log('setString error', ret);
//   }
// }, function (ret) {
//   console.log('setString error', ret);
// }).done();


/**
* 根据key查询value
* @param keyItem, key的值
* @@param value, 查询结构，返回数据
*/
cacheHelper.getString('fixed_key').then(function(ret) {
if (ret.iRet === 0) {
  const val = ret.data.value;
  console.log('getStringRet success', val);
} else {
  console.log('getStringRet error', ret);
}
}, function(ret) {
console.log('getStringRet error', ret);
}).done();


/**
* 批量设置key-value
* @param map<key, value>, key-value列表
* @return map<key, result>, 返回值 key-result列表
*/
// const map = new TafStream.Map(TafStream.String, TafStream.String);
// map.set('a', '1');
// map.set('b', '2');
// map.set('c', '3');
// map.set('d', '4');
// map.set('e', '5');
// cacheHelper.setStringBatch(map).then(function(ret) {
// if (ret.iRet === 0) {
//   const val = ret.data.keyResult.value;
//   console.log('setStringBatch success', val);
// } else {
//   console.log('setStringBatch error', ret);
// }
// }, function(ret) {
// console.log('setStringBatch error', ret);
// }).done();


/**
* 批量查询 key-value
* @param vtKeyItem, key值数组
* @param vtValue, 查询结果，key-value结构数组，如果某些key没有值则数组不包含该key结构
* @return int,
*/
// const vbKey = new TafStream.List(TafStream.String);
// vbKey.push('a');
// vbKey.push('b');
// vbKey.push('c');
// vbKey.push('d');
// vbKey.push('e');
// cacheHelper.getStringBatch(vbKey).then(function(ret) {
// if (ret.iRet === 0) {
//   const val = ret.data.vtValue.value.map(v => v.value);
//   console.log('getStringBatch values success', val, ret.data.vtValue.value);
//   const obj = {};
//   ret.data.vtValue.value.forEach(v => obj[v.keyItem] = v.value);
//   console.log('getStringBatch object success', obj);
// } else {
//   console.log('getStringBatch error', ret);
// }
// }, function(ret) {
// console.log('getStringBatch error', ret);
// }).done();


/**
* 设置key-value
* @param keyItem, key的值
* @param value, 要设置的数据
* @param ver，数据版本（1）
* @param dirty，是否脏数据
* @param expireTimeSecond，设置数据过期的绝对时间，以秒为单位。CacheServer将根据这个时间自动淘汰过期数据。如果数据没有过期的概念，请将此参数设为0
* @return int,  返回码
*/
// cacheHelper.setStringEx('fixed_key_ex3', 'fixed_value_ex3', 1, true, 0).then(function(ret) {
// if (ret.iRet === 0) {
//   console.log('setStringEx success', ret);
// } else {
//   console.log('setStringEx error', ret);
// }
// }, function(ret) {
// console.log('setStringEx error', ret);
// }).done();


/**
* 根据key查询value
* @param keyItem, key的值
* @param value, 查询结构，返回数据
*/
cacheHelper.getStringWithVer('fixed_key').then(function (ret) {
  if (ret.iRet === 0) {
    const val = ret.data.value;
    const ver = ret.data.ver;
    console.log('getStringWithVer success', val, ver, ret);
  } else {
    console.log('getStringWithVer error', ret);
  }
}, function (ret) {
  console.log('getStringWithVer error', ret);
}).done();


/**
* 删除key-value
* @param keyItem, key的值
* @return int,  返回码
*/
    // cacheHelper.delString('fixed_key_ex2').then(function(ret) {
    // if (ret.iRet === 0) {
    //   console.log('delString success', ret);
    // } else {
    //   console.log('delString error', ret);
    // }
    // }, function(ret) {
    // console.log('delString error', ret);
    // }).done();