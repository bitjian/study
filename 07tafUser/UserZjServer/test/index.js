import Taf from '@taf/taf-rpc';
import 'should';
import { Test } from './proxy/UserProxy';

let proxy;

describe('组合数据服务', () => {
    before(async () => {
        // startup()
        const tafRpc = Taf.Communicator.New();

        let servant = 'Test.UserZjServer.UserZjObj';
        if (!process.env.TAF_CONFIG) {
            servant += '@tcp -h 127.0.0.1 -p 14001 -t 60000';
        }
        proxy = tafRpc.stringToProxy(Test.UserProxy, servant);
    });

    after(() => {
        // stop();
    });
    // 保存用户
    it('saveUser', async () => {
        const req = new Test.SaveUserInfoReq();
        req.readFromObject({
            userinfo: {
                username: 'admin',
                password: '123456',
                gender: 'man',
                tel: '156xxx',
                age: '22'
            }
        });
        let ret = await proxy.saveUser(req);
        ret = ret.response.arguments.stRsp.toObject();
        console.log('saveUser', JSON.stringify(ret, null, 2));
        ret.iRet.should.eql(0);
    });
    // 修改用户
    it('updateUser', async () => {
        const req = new Test.SaveUserInfoReq();
        req.readFromObject({
            userinfo: {
                id: 1,
                username: 'admin',
                password: '123456',
                gender: 'man',
                tel: '156xxx',
                age: '22'
            }
        });
        let ret = await proxy.saveUser(req);
        ret = ret.response.arguments.stRsp.toObject();
        console.log('saveUser', JSON.stringify(ret, null, 2));
        ret.iRet.should.eql(0);
    });
    // 获取用户列表
    it('getUserListForAd', async () => {
        const req = new Test.PageInfoReq();
        req.readFromObject({
            page: 1,
            pageNum: 10
        });
        let ret = await proxy.getUserListForAd(req);
        ret = ret.response.arguments.stRsp.toObject();
        console.log('getUserListForAd', JSON.stringify(ret, null, 2));
        ret.iRet.should.eql(0);
    });
    // 登录用户
    it('loginForAd', async () => {
        const req = new Test.LoginReq();
        req.readFromObject({
            username: 'admin',
            password: 123456
        });
        let ret = await proxy.loginForAd(req);
        ret = ret.response.arguments.stRsp.toObject();
        console.log('loginForAd', JSON.stringify(ret, null, 2));
        ret.iRet.should.eql(0);
    });
    //删除用户
    it('delUser', async () => {
        const req = new Test.QueryIdReq();
        req.readFromObject({
            uid: 2,
        });
        let ret = await proxy.delUser(req);
        ret = ret.response.arguments.stRsp.toObject();
        console.log('delUser', JSON.stringify(ret, null, 2));
        ret.iRet.should.eql(0);
    });
})