const TAF = require('@taf/taf-rpc').Communicator.New();
const Test = require('./test/proxy/UserProxy').Test;

let servant = 'Test.UserZjServer.UserZjObj';
if (!process.env.TAF_CONFIG) {
    servant += '@tcp -h 127.0.0.1 -p 14001 -t 60000';
}

const prx = TAF.stringToProxy(Test.UserProxy, servant);

const stReq = new Test.LoginReq();
stReq.readFromObject(
    {
       username: 'admin',
       password: 1234567
    }
);
prx.loginForAd(stReq).then(function (ret) {
    console.log('### helloWorld ok ###', ret.response.arguments.stRsp.toObject());
}, function (ret) {
    console.log('### helloWorld error ###', ret.response);
});