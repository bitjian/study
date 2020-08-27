import { Test } from './User';
import UserService from '../service/User';
import { reflectRun } from '../common';

module.exports.Test = Test;

Test.UserImp.prototype.login = async function (current, stReq, stRsp) {
    await reflectRun(current, stReq, stRsp, UserService.login);
}

Test.UserImp.prototype.getUserList = async function (current, stReq, stRsp) {
    await reflectRun(current, stReq, stRsp, UserService.getUserList);
}

Test.UserImp.prototype.getUserDetail = async function (current, stReq, stRsp) {
    await reflectRun(current, stReq, stRsp, UserService.getUserDetail);
}

Test.UserImp.prototype.loginForAd = async function (current, stReq, stRsp) {
    await reflectRun(current, stReq, stRsp, UserService.loginForAd);
}

Test.UserImp.prototype.getUserListForAd = async function (current, stReq, stRsp) {
    await reflectRun(current, stReq, stRsp, UserService.getUserListForAd);
}

Test.UserImp.prototype.delUser = async function (current, stReq, stRsp) {
    await reflectRun(current, stReq, stRsp, UserService.delUser);
}

Test.UserImp.prototype.saveUser = async function (current, stReq, stRsp) {
    await reflectRun(current, stReq, stRsp, UserService.saveUser);
}

Test.UserImp.prototype.getUserDetailForAd = async function (current, stReq, stRsp) {
    await reflectRun(current, stReq, stRsp, UserService.getUserDetailForAd);
}