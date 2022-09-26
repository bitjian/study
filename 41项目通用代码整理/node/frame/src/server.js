import './polyfills'
import http from 'http'

function normalizePort(val) {
  const _port = parseInt(val, 10)
  if (Number.isNaN(_port)) {
    // named pipe
    return val
  }
  if (_port >= 0) {
    // port number
    return _port
  }
  return false
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}
const app = require('./app').default // eslint-disable-line
const port = normalizePort(process.env.HTTP_PORT || '3000')
const host = process.env.HTTP_IP || '0.0.0.0'
app.set('port', port)

const server = http.createServer(app)
server.listen(port, host)

server.on('error', onError)
server.on('listening', onListening)

function onListening() {
  const addr = server.address();
  console.log(`express app started at http://${addr.address}:${addr.port}`);
}

process.on('uncaughtException', err => {
  logger.exception.error('uncaughtException', err);
});
process.on('unhandledRejection', (reason, p) => {
  logger.exception.error('unhandledRejection', reason, p);
});
process.on('message', (obj) => {
  // eslint-disable-next-line global-require
  // require('./tafcmd').default(obj);
});