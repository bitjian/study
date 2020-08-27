const TAF = require('@taf/taf-rpc').Communicator.New();
const Test = require('./HelloProxy').Test;

let servant = 'Test.HelloServer.HelloObj';
// 服务的地址和端口号
// process.env.TAF_CONFIG主要作用是判断服务启动的环境不是有 taf-node存在的环境，
// 那么则使用本地的配置文件 @tcp -h 127.0.0.1 -p 14001 -t 60000
//  本地测试的ip和端口，部署时需要配置成远程调用的服务ip和端口
if (!process.env.TAF_CONFIG) {
  servant += '@tcp -h 172.16.8.63 -t 60000 -p 10082';
}
// 客户端通过Taf.stringToProxy建立连接
const prx = TAF.stringToProxy(Test.HelloProxy, servant);

const stReq = new Test.HelloWorldReq();
stReq.readFromObject(
  {
    data: 'Hello World',
  }
);
prx.helloWorld(stReq).then(function (ret) {
  console.log('### helloWorld ok ###', ret.response.arguments.stRsp.toObject());
}, function (ret) {
  console.log('### helloWorld error ###', ret.response);
});