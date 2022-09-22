import axios from 'axios'
import router from '@/router/routers'
import { Notification, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import Config from '@/config'
import pkg from '../../package'
import { getSysMark } from '../utils/sys_mark'
import { channelRouters, channelHide } from '@/constant/channelRouters'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: Config.timeout // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  async config => {
    const fullPath = window.location.pathname
    const headPath = pkg.path
    const path = fullPath.substring(headPath.length)
    const index = path.search('/')
    if (config.data && config.data.data) {
      if (!config.data.data.basicInfo) config.data.data.basicInfo = {}

      // 留痕信息传递
      config.data.data.basicInfo.sysMark = await getSysMark()

      // 增加菜单来源
      if (index !== -1 && path.substr(0, index) === 'portfolio') {
        config.data.data.basicInfo.platform = 'TG'
      }
      if (config.data.data.basicInfo.channel === undefined) {
        if (!channelRouters.includes(router.currentRoute.path) && !channelHide.includes(router.currentRoute.path)) {
          config.data.data.basicInfo.channel = (-1).toString()
        } else {
          config.data.data.basicInfo.channel = store.getters.channel
        }
      }
    }
    if (getToken()) {
      config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    config.headers['Content-Type'] = 'application/json'
    if (process.env.NODE_ENV === 'development') {
      config.headers['env'] = 'dev'
    }
    const userName = store.getters.user && store.getters.user.username ? store.getters.user.username : 'guest'
    config.headers['traceId'] = pkg.name + '-' + userName + '-' + new Date().getTime() + '-' + Math.random().toString(36).substr(2, 4)
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const code = response.status
    if (code < 200 || code > 300) {
      Notification.error({
        title: response.message
      })
      return Promise.reject('error')
    } else {
      // 投资大脑返回数据调整
      if (response.data.hasOwnProperty('status')) {
        const { status, errmsg, data } = response.data
        // 为空状态符
        // const NULL_STATUS = 103
        // if (status !== 200 && status !== NULL_STATUS) {
        //   Notification.error({
        //     title: '获取数据失败',
        //     message: errmsg,
        //     duration: 2500
        //   })
        //   return { code: status, data: [], message: errmsg }
        // }
        return { code: status, data: data || [], message: errmsg }
      }
      return response.data
    }
  },
  error => {
    let code = 0
    try {
      code = error.response.status
    } catch (e) {
      if (error.toString().indexOf('Error: timeout') !== -1) {
        Notification.error({
          title: '网络请求超时',
          duration: 2500
        })
        return Promise.reject(error)
      }
      if (error.toString().indexOf('Error: Network Error') !== -1) {
        Notification.error({
          title: '网络请求错误',
          duration: 2500
        })
        return Promise.reject(error)
      }
    }
    if (code === 401) {
      MessageBox.confirm(
        '登录状态已过期，您可以继续留在该页面，或者重新登录',
        '系统提示',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    } else if (code === 403) {
      router.push({ path: '/401' })
    } else if (code === 302) {
      document.location.href = error.response.headers.redirect
    } else {
      const errorMsg = error.response.data.message
      if (errorMsg !== undefined) {
        Notification.error({
          title: errorMsg,
          duration: 2500
        })
      }
    }
    return Promise.reject(error)
  }
)
export default service
