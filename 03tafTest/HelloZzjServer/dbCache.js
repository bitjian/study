// 连接DCache
const DCache = require("@taf/taf-dcache-helper");
const TafStream = require("@taf/taf-stream");

const cacheHelper = new DCache({
    DCacheServerTarget: "DCache.TestProxyServer.ProxyObj@tcp -h 172.16.8.147 -t 60000 -p 36256",
    moduleName: "TestzjZDemo"
  });
  module.exports = cacheHelper;