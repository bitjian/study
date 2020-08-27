import _ from 'lodash';
import conn from '../proxy/db';
import { error } from '../common';
import crypto from 'crypto'


const service = {
  loginForAd: async req => {
    const { username, password } = req;
    if (username === '' || username === undefined || password === '' || password === undefined) {
      throw error.INPUT_ERROR()
    }
    try {
      let loginSql = `select * from user_info where username='${username}';`;
      const [results] = await conn.query(loginSql)
      let md5 = crypto.createHash('md5');
      let passwordMD5 = md5.update(password).digest('hex');
      if (results[0].password === passwordMD5) {
        return { iRet: 0, message: `登录成功` };
      } else {
        return { iRet: -1, message: `密码错误` };
      }
    } catch (err) {
      throw error.NO_DATA_ERROR();
    }
  },
  getUserListForAd: async req => {
    const { page, pageNum, id = 1 } = req;
  },
  delUser: async req => {
    const { uid } = req;
    if (!uid) throw error.INPUT_ERROR();
    try {
      let delSql = `delete from user_info where uid=${uid}`;
      await conn.query(delSql);
      return {};
    } catch (err) {
      throw error.DB_ERROR()
    }
  },
  saveUser: async req => {
    const { userinfo } = req;
    if (!userinfo) { throw error.INPUT_ERROR() };
    const { uid, username, password, gender, tel, age } = userinfo

    let md5 = crypto.createHash('md5');
    let passwordMD5 = md5.update(password).digest('hex')
    if (uid || uid != '') {
      try {
        let updateSql = `update user_info set password='${passwordMD5}',gender='${gender}',tel='${tel}',age='${age}' where uid='${uid}';`;
        await conn.query(updateSql);
        console.log('修改成功');
        return { uid };
      } catch (err) {
        throw err.DB_ERROR
      }
    } else {
      try {
        let uidNew = parseInt((new Date()).valueOf().toString().substring(4));
        let insertSql = `insert into user_info(uid,username,password,gender,tel,age) values ('${uidNew}','${username}','${passwordMD5}','${gender}','${tel}','${age}');`;
        await conn.query(insertSql)
        console.log('添加成功');
        return { uid: uidNew };
      } catch (err) {
        throw err.DB_ERROR
      }
    }
  },
  getUserDetailForAd: async req => {
    const { uid } = req;
    if (!uid) throw error.INPUT_ERROR();
    try {
      let getDetailSql = `select * from user_info where uid='${uid}';`;
      console.log(getDetailSql);
      const [results, fields] = await conn.query(getDetailSql);
      const { username, gender, tel, age } = results[0];
      return {
        userinfo: {
          uid,
          username,
          gender,
          tel,
          age
        }
      };
    } catch (err) {
      throw err.DB_ERROR
    }
  }
};

export default service;
