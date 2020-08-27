const TAF = require('@taf/taf-rpc');
const Test = require('./HelloImp').Test;
const server = new TAF.server();

server.initialize(process.env.TAF_CONFIG || './local.conf', function (server) {
  const servantName = server.Application + '.' + server.ServerName + '.HelloObj';
  console.log(servantName);
  server.addServant(Test.HelloImp, servantName);
});

server.start();