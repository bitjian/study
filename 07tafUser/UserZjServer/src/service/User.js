import _ from 'lodash';
import conn from '../proxy/db';
import { error } from '../common';
import crypto from 'crypto';
import { formatDate } from '../common/utils'
import cache from '../proxy/cache';
import { PassThrough } from 'stream';

const USER_INFO_PREFIX = 'USERINFO_';
const USER_LATEST = 'USERLATEST_';
const LOGIN_USER = 'LOGINUSER_';



const service = {
  login: async req => {
    const { username, password } = req;
    if (username === '' || username === undefined || password === '' || password === undefined) {
      throw error.INPUT_ERROR()
    }
    let md5 = crypto.createHash('md5');
    // 获取用户
    let pwd = md5.update(password).digest('hex')
    const passwordMD5 = await cache.get(`${LOGIN_USER}${username}`);
    if (passwordMD5) {
      if (pwd === passwordMD5) {
        return { iRet: 0, message: `登录成功` };
      } else {
        return { iRet: 1, message: `密码错误` };
      }
    } else {
      throw error.NO_DATA_ERROR();
    }
  },
  getUserList: async req => {
    const { pageNum = 1, pageSize = 10, id = 1 } = req;
    const { data, total } = await cache.zrevrangebyscoreWithTotal(
      `${USER_LATEST}`,
      '+inf',
      '-inf',
      cache.CONSTANT.LIMIT,
      (pageNum - 1) * pageSize,
      pageSize
    );
    console.log(data);
    let ids = data.map(v => Number(v));
    console.log(ids, total);
    if (!ids || ids.length <= 0) {
      return {};
    }
    let list = await cache.mget(ids.map(uid => `${USER_INFO_PREFIX}${uid}`));
    console.log(list);
    return {
      data: {
        total,
        list
      },
    };
  },
  getUserDetail: async req => {
    const { uid } = req;
    if (!uid) throw error.INPUT_ERROR();
    try {
      const userinfo = await cache.get(`${USER_INFO_PREFIX}${uid}`);
      if (!userinfo) return {};
      const { username, gender, tel, age, createTime, updateTime } = userinfo;
      console.log(userinfo, createTime, updateTime);

      return {
        userinfo: {
          uid,
          username,
          gender,
          tel,
          age,
          createTime: formatDate(new Date(createTime)),
          updateTime: formatDate(new Date(updateTime)),
        }
      };
    } catch (err) {
      throw err.DB_ERROR
    }
  },
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
        return { iRet: 1, message: `密码错误` };
      }
    } catch (err) {
      throw error.NO_DATA_ERROR();
    }
  },
  getUserListForAd: async req => {
    const { pageNum = 1, pageSize = 10, id = 1 } = req;
    try {
      let listSql = `select uid, username, gender, tel, age, create_time, update_time from user_info order by create_time desc limit ${(pageNum - 1) * pageSize}, ${pageSize};`;
      let countSql = `SELECT count(0) as total from user_info;`
      let [list, count] = await Promise.all([
        conn.query(listSql),
        conn.query(countSql),
      ])
      list[0].map(user => {
        user.createTime = formatDate(new Date(user.createTime));
        user.updateTime = formatDate(new Date(user.updateTime));
      })
      return {
        data: {
          list: list[0],
          total: count[0][0].total
        }
      }
    } catch (err) {
      throw error.NO_DATA_ERROR();
    }
  },
  delUser: async req => {
    const { uid } = req;
    if (!uid) throw error.INPUT_ERROR();
    try {
      let delSql = `delete from user_info where uid=${uid}`;
      await conn.query(delSql);
      const _userinfo = await cache.get(`${USER_INFO_PREFIX}${uid}`)
      const cacheiRet = await cache.del(`${USER_INFO_PREFIX}${uid}`);
      if (!cacheiRet) throw error.DCACHE_ERROR();
      await cache.zrem(`${USER_LATEST}`, uid.toString());
      await cache.rem(`${LOGIN_USER}${_userinfo.username}`);
      return {};
    } catch (err) {
      throw error.DB_ERROR()
    }
  },
  saveUser: async req => {
    const { userinfo } = req;
    if (!userinfo) { throw error.INPUT_ERROR() };
    const { uid, username, password, gender, tel, age } = userinfo
    console.log(userinfo);
    let md5 = crypto.createHash('md5');
    let passwordMD5 = md5.update(password).digest('hex')
    let updateTime = formatDate(new Date());
    if (uid || uid !== 0) {
      try {
        let updateSql = ''
        if (password || password != '') {
          updateSql = `update user_info set password='${passwordMD5}',gender='${gender}',tel='${tel}',age='${age}',update_time='${updateTime}' where uid='${uid}';`;
          await cache.set(`${LOGIN_USER}${username}`, passwordMD5);
        } else {
          updateSql = `update user_info set gender='${gender}',tel='${tel}',age='${age}',update_time='${updateTime}' where uid='${uid}';`;
        }
        await conn.query(updateSql);
        const _userinfo = await cache.get(
          `${USER_INFO_PREFIX}${userinfo.uid}`
        );
        console.log(_userinfo);
        if (_userinfo) {
          userinfo.createTime = _userinfo.createTime;
        }
        userinfo.updateTime = updateTime;
        const cacheRet = await cache.set(`${USER_INFO_PREFIX}${uid}`, userinfo);
        if (!cacheRet) throw error.DCACHE_ERROR();
        await cache.zadd(`${USER_LATEST}`, new Date(userinfo.updateTime).getTime(), userinfo.uid.toString());
        console.log('修改成功');
        return { uid };
      } catch (err) {
        throw error.DB_ERROR
      }
    } else {
      try {
        let createTime = updateTime;
        let uidNew = parseInt((new Date()).valueOf().toString().substring(4));
        let insertSql = `insert into user_info(uid,username,password,gender,tel,age,create_time,update_time) values ('${uidNew}','${username}','${passwordMD5}','${gender}','${tel}','${age}','${createTime}','${updateTime}');`;
        await conn.query(insertSql)
        console.log('添加成功');
        userinfo.uid = uidNew;
        userinfo.createTime = createTime;
        userinfo.updateTime = updateTime;
        userinfo.password = passwordMD5;
        const cacheRet = await cache.set(`${USER_INFO_PREFIX}${uidNew}`, userinfo);
        await cache.zadd(`${USER_LATEST}`, new Date(userinfo.updateTime).getTime(), userinfo.uid.toString());
        await cache.set(`${LOGIN_USER}${username}`, passwordMD5);
        if (!cacheRet) throw error.DCACHE_ERROR();
        return { uid: uidNew };
      } catch (err) {
        throw error.DB_ERROR
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
      const { username, gender, tel, age, createTime, updateTime } = results[0];
      return {
        userinfo: {
          uid,
          username,
          gender,
          tel,
          age,
          createTime: formatDate(new Date(createTime)),
          updateTime: formatDate(new Date(updateTime)),
        }
      };
    } catch (err) {
      throw err.DB_ERROR
    }
  }
};

export default service;
