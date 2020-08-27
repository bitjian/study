// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import BaiduMap from 'vue-baidu-map'
import axios from './service/http'
import Echarts from 'echarts'
import VueQuillEditor from 'vue-quill-editor'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/reset.css'
import 'quill/dist/quill.snow.css'



Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$echarts = Echarts
//把axios挂载到VUE的实例上
Vue.prototype.$axios = axios
Vue.use(VueQuillEditor)
Vue.use(BaiduMap,{
   ak:'KGAUOGhfQLAprrARC0GCwARPqGbMA5GZ'
})
/* eslint-disable no-new */
//路由守卫
 router.beforeEach((to,form,next)=>{
     if (store.state.username || to.path == '/login'){
         next()
     }else{
         next({
           path:'/login'
         })
     }
 })
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
