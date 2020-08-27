let proxyTarget = "DCache.TestProxyServer.ProxyObj";
let moduleName = "TestUserZjServ";
if(!process.env.TAF_CONFIG) {
    proxyTarget += "@tcp -h 172.16.8.147 -t 60000 -p 36256";
}
const cache = require('@up/taf-dcache-srf')(proxyTarget, moduleName).toPromise();

export default cache;