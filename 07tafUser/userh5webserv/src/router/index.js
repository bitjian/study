import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: resolve => require(['../components/page/Login.vue'], resolve)
  },
  {
    path: '/register',
    component: resolve => require(['../components/page/Register.vue'], resolve)
  },
  {
    path: '/register-success',
    component: resolve => require(['../components/page/RegisterSuccess.vue'], resolve)
  },
  {
    path: '/userList',
    component: resolve => require(['../components/page/UserList.vue'], resolve)
  },
  {
    path: '/userDetail',
    component: resolve => require(['../components/page/UserDetail.vue'], resolve)
  }
]

const router = new VueRouter({
  routes
})

export default router
