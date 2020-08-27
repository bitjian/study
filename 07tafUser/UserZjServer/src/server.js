if (process.env.TAF_CONFIG) {
  require('source-map-support/register');
}
import logger from './common/logger';
import Taf from '@taf/taf-rpc';
import { Test } from './rpc/UserImpl';

const svr = new Taf.server();
const startSer = () => {
  svr.initialize(process.env.TAF_CONFIG || './server.conf', function(server) {
    console.log('--------------------------------------------------------');
    const servantName = `${server.Application}.${server.ServerName}.UserZjObj`;
    server.addServant(Test.UserImp, servantName);
    logger.data.info(`start servant: ${servantName}, ${process.pid}`);
  });

  svr.start();
};
const startup = async () => {
  try {
    await startSer();
  } catch (error) {
    process.exit(-1);
  }
};



process.on('uncaughtException', err => {
  logger.exception.error('uncaughtException', err);
});
process.on('unhandledRejection', (reason, p) => {
  logger.exception.error('unhandledRejection', reason, p);
});
startup();
// module.exports = {
//   startup,
//   stop: () => {
//     svr.stop();
//   },
// };
