const TAF = require('@taf/taf-rpc').Communicator.New();
const Test = require('./UserProxy').Test;

let servant = 'Test.UserZjServer.UserZjObj';
if (!process.env.TAF_CONFIG) {
    servant += '@tcp -h 127.0.0.1 -p 14001 -t 60000';
}

const proxy = TAF.stringToProxy(Test.UserProxy, servant);

exports.Test = Test;
exports.proxy = proxy;