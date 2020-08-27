import { logger } from '../common';
import _ from 'lodash';

const OK_RET = 0;
const OK_RSP = { iRet: OK_RET, message: 'ok' };

const returnRet = (current, stRsp, ret) => {
  console.log(ret);
  stRsp.readFromObject(_.assign({}, OK_RSP, ret));
  console.log(stRsp);
  current.sendResponse(OK_RET, stRsp);
};

const returnErr = (current, stRsp, err) => {
  console.log('xxxxxxxxxxxxxxxx');
  logger.exception.error(err);
  stRsp.readFromObject(err.err);
  current.sendResponse(OK_RET, stRsp);
};

const reflectRun = async (current, stReq, stRsp, fn) => {
  try {
    const req = stReq.toObject();
    const ret = await fn(req);
    returnRet(current, stRsp, ret);
  } catch (err) {
    console.log(err);
    returnErr(current, stRsp, err);
  }
};

export {
  returnRet,
  returnErr,
  reflectRun,
};
