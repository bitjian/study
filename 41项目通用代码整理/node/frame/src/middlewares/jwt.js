import expressJwt from 'express-jwt';
// import { config } from '@up/taf-conf';
import { conf } from '../config';

const {config} = conf

const defaultOpt = {
  secret: config.jwt.secret,
  credentialsRequired: true,
  getToken: function fromHeaderOrQuerystring(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
};

export default (option = {}) => expressJwt(Object.assign(defaultOpt, option))
