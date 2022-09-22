import Vue from 'vue'
import Router from 'vue-router'
import pkg from '../../package'

Vue.use(Router)

/* Layout */
import Layout from '../layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/

export const constantRouterMap = [{
  path: '/login',
  meta: { title: '登录', noCache: true },
  component: () => import('@/views/login'),
  hidden: true
},
{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path*',
    component: () => import('@/views/features/redirect')
  }]
},
{
  path: '/',
  component: Layout,
  hidden: true,
  redirect: 'dashboard/index',
  children: [
    {
      path: 'dashboard/index',
      component: () => import('@/views/home'),
      // component: () => import('@/views/strategy/customStrategy'),
      name: '首页',
      meta: { title: '首页', icon: 'index', noCache: true, affix: true, component: 'home' }
    },

    {
      path: '/404',
      component: () => import('@/views/features/404'),
      hidden: true
    },
    {
      path: '/401',
      component: () => import('@/views/features/401'),
      hidden: true
    },

    // 异常解读报告新增入口
    {
      path: '/portfolio/fixReport/edit',
      hidden: true,
      component: () => import('@/views/portfolio/fixReport/Save'),
      name: 'editFixReport',
      meta: { title: '编辑异常解读报告', icon: 'index', noCache: true }
    },
    // 组合创建详细信息
    {
      path: '/portfolio/portfolioCreate/info',
      hidden: true,
      component: () => import('@/views/portfolio/portfolioCreate/index'),
      name: 'portfolioInfo',
      meta: { title: '组合信息', icon: 'index', noCache: true }
    },
    // 组合报告详细信息
    {
      path: '/portfolio/portfolioReport/info',
      hidden: true,
      component: () => import('@/views/portfolio/portfolioReport/Detail'),
      name: 'portfolioReportInfo',
      meta: { title: '组合报告详情', icon: 'index', noCache: true, component: 'portfolio/portfolioReport/Detail' }
    },
    // 组合报告编辑
    {
      path: '/portfolio/portfolioReport/edit',
      hidden: true,
      component: () => import('@/views/portfolio/portfolioReport/Detail'),
      name: 'portfolioReportEdit',
      meta: { title: '组合报告编辑', icon: 'index', noCache: true }
    },

    {
      path: '/admin/component',
      hiden: true,
      component: () => import('@/views/system/component/index'),
      name: 'adminComponent',
      meta: { title: '组件管理', icon: 'add', component: 'system/component/index' }
    }
  ]
},
{
  path: '/user',
  component: Layout,
  hidden: true,
  redirect: 'noredirect',
  children: [{
    path: 'center',
    component: () => import('@/views/system/user/center'),
    name: '个人中心',
    meta: { title: '个人中心', icon: 'user' }
  }]
}

  // { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  base: (!pkg.path || pkg.path === '/') ? undefined : pkg.path,
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
