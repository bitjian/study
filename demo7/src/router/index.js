import Vue from 'vue'
import Router from 'vue-router'
import Found from '../module/404.vue'
import Login from '../module/login.vue'
  import Home from '../subpages/index/index_home'
  // import Userlist from '../subpages/index/user_list'
  import Businesslist from '../subpages/index/business_list'
  // import Foodlist from '../subpages/index/food_list'
  import Orderlist from '../subpages/index/order_list'
  import Runlist from '../subpages/index/run_list'
  import Addshop from '../subpages/index/add_shop'
  import Addcommodity from '../subpages/index/add_commodity'
  import Userdistributed from '../subpages/index/user_distributed'
  import Texteditor from '../subpages/index/text_editor'
  import Runsite from '../subpages/index/run_site'
  import Explain from '../subpages/index/index_explain'
Vue.use(Router)
  
 const Userlist = ()=>import('../subpages/index/user_list')
 const Foodlist = ()=>import('../subpages/index/food_list')
 
export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect:'index'
    },
    {
      path:'/index',
      component:()=>import('../module/index'),
      children:[
         {path:'',component:Home},
         {path:'/home',name:'home',component:Home},
         {path:'/userlist',name:'userlist',component:Userlist},
         {path:'/businesslist',name:'businesslist',component:Businesslist},
         {path:'/foodlist',name:'foodlist',component:Foodlist},
         {path:'/orderlist',name:'orderlist',component:Orderlist},
         {path:'/runlist',name:'runlist',component:Runlist},
         {path:'/addshop',name:'addshop',component:Addshop},
         {path:'/addcommodity',name:'addcommodity',component:Addcommodity},
         {path:'/userdistributed',name:'userdistributed',component:Userdistributed},
         {path:'/texteditor',name:'texteditor',component:Texteditor},
         {path:'/runsite',name:'runsite',component:Runsite},
         {path:'/explain',name:'explain',component:Explain}
      ]
    },
    {
       path:'/login',
       name:'login',
       component:Login
    },
    {
      path:'*',
      name:'found',
      component:Found
    }
  ]
})
