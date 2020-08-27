import axios from 'axios'
import service from './databoardApi'
import { Loading } from 'element-ui';

//请求拦截的加载动画函数
let loadings;
function openloading() {
    loadings = Loading.service({
        lock:true,
        text:'正在拼命加载中',
        spinner: 'el-icon-loading',
        background:'rgba(0,0,0,0.7)'
    })
}
//结束动画
function closeloading() {
    loadings.close()
}

  //service循环遍历输出不同的请求方法
let instance = axios.create({
    baseURl:'http://localhost:8080',//统一域名
    timeout:1000,  //超时时间
    withCredentials:true
})
 //包裹请求方法的容器
 const Http = {};
 //请求格式的统一
 for(let key in service) {
     let api = service[key] // key 代表文件里的每一个方法
    //http指向的是每个请求方法  key表示databoardApi里面定义的方法
     //  async函数方法 作用是避免进入回调地狱  申明每一个变量里的await 会一次请求执行
      Http[key] = async function(
        params, //请求参数 get:url  put post patch (统一写成data)) ，delete :url
        isFormData = false, //标识是否是form-data请求
        config = {} //配置参数
      ){
        //   let res = null
        //   try{
        //        res = await axios.get('url')
        //   }catch(err){
        //       res = err
        //   }
          let newParams = {}
          //判断是否是form-data
          if (params && isFormData) {
              newParams = new FormData ()
              for (let i in params) {
                  newParams.append(i,params[i])
              }
            }else{
                  newParams = params
              }
              //不同请求的判断
               let response = {}; //请求的返回值
              if (api.method === 'put', api.method === 'post' || api.method === 'patch'){
                try {
                    response = await instance[api.method](api.url,newParams,config)
                  }catch (err) {
                      response = err
                  }


              }else if(api.method === 'delete' || api.method === 'get' ) {
                   config.params = newParams
                try {
                    response = await instance[api.method](api.url,config)
                  }catch (err) {
                      response = err
                  }
              }
              return response; //返回请求的响应式
      }
    }

 //请求拦截器
 instance.interceptors.request.use(config => {
     //发起请求前做些什么
     openloading()
     return config
 },(err) => {
     //请求错误
     closeloading()
     return Promise.reject(err)
 })
 //响应拦截器
 instance.interceptors.response.use(res=>{
    closeloading()
      return res //这里的res表示请求成功回来的数据  状态data等
 },(err) =>{
    closeloading()
    return Promise.reject(err)
 })

 export default Http   //这里http包含了请求方法
