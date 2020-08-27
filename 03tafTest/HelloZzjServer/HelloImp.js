var Test = require('./Hello.js').Test;
// var DCache = require('./dbCache');
module.exports.Test = Test;

Test.HelloImp.prototype.helloWorld = function (current, stReq, stRsp) {
    const req = stReq.toObject();
    stRsp.readFromObject({
        iRet: 0,
        message: req.data,
    });
    current.sendResponse(0, stRsp);
}
Test.HelloImp.prototype.inserData = function (current, stReq, stRsp) {
    const req = stReq.toObject();
    DCache.setString('data',req.data).then(ret => {
        if(ret.iRet === 0) {
            console.log('setString success', ret);
        }else {
            console.log('setString error', ret);
        }
    }, ret => {
        console.log('setString error', ret);
    }).done();
    stRsp.readFromObject({
        iRet: 0,
        message: '插入数据成功',
    });
    current.sendResponse(0, stRsp);
}
Test.HelloImp.prototype.getData = function (current, stReq, stRsp) {
    const req = stReq.toObject();
    DCache.getString('data').then(ret => {
        if(ret.iRet === 0) {
            const val = ret.data.value;
            console.log('getString success', val);
        }else {
            console.log('getString error', val);
        }
    }, ret => {
        console.log('getString error', val);
    }).done
    stRsp.readFromObject({
        iRet: 0,
        message: req.data,
    });
    current.sendResponse(0, stRsp);
}