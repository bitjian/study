import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'

import { conf } from './config'
const { config } = conf

import pkg from '../package.json'

const app = express()
const appPath = `${pkg.path === '/' ? '' : pkg.path}`

app.use(compression())
app.use(
  config.cors
    ? cors({ exposedHeaders: 'REDIRECT' })
    : (req, res, next) => next()
)
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json({ limit: '50mb' })) //最大上传大小不超过50mb
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
  })
)
app.use(cookieParser());
app.use(`${appPath}/api`, api(appPath));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error(`Not Found ${req.originalUrl}`);
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => { // eslint-disable-line
  console.log(err);
  const status = err.status || 500;
  res.status(status).json({
    status,
    message: err.message
  })
});

export default app;