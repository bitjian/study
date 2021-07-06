var log4js = require('log4js');


log4js.configure({
  appenders: {
    out: { type: 'stdout' },//设置是否在控制台打印日志
    info: { type: 'file', filename: './logs/info.log' },
    'just-errors': { type: 'file', filename: './logs/error.log' },
    'error': { type: 'logLevelFilter', appender: 'just-errors', level: 'error' }
  },
  categories: {
    default: { appenders: ['out', 'info', 'error'], level: 'info' }//去掉'out'。控制台不打印日志
  }
});

exports.logger = log4js.getLogger();