const TAF = require('@taf/taf-rpc').Communicator.New();
const Test = require('./HelloProxy').Test;
// 服务的标识名
let servant = 'Test.HelloZzjServer.HelloObj';

if (!process.env.TAF_CONFIG) {
  // 后台服务的端口和ip
  servant += '@tcp -h 172.16.8.63 -t 60000 -p 10082';
}
// 客户端通过Taf.stringToProxy建立连接
const prx = TAF.stringToProxy(Test.HelloProxy, servant);

exports.Test = Test;
exports.prx = prx;
