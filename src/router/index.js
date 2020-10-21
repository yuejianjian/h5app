import Vue from 'vue'
import Router from 'vue-router'
//import Login from '@/pages/login/login.vue'

Vue.use(Router)

export default new Router({
  mode:'hash',
  scrollBehavior:()=> ({
    y: 0
  }),
  linkActiveClass:'active',
  routes: [
    {
      path: '/',
      name: 'Login',
      meta:{
        title:'重定向'
      },
      redirect: '/Login',
    },
    {
      path: '/Login',
      name: 'Login',
      meta:{
        title:'登录页'
      },
      component: () =>import("@/pages/login/index.vue")
    },
    {
      path: '/base',
      name: 'Base', 
      component: () =>import("@/pages/base.vue"),
      children:[
        {
          path: '/base/home',
          name: 'Home',
          meta:{
            title:'首页',
            keepAlive:true
          },
          component: () =>import("@/pages/home/index.vue")
        },
        {
          path: '/base/fenlei',
          name: 'FenLei',
          meta:{
            title:'分类',
            keepAlive:false
          },
          component: () =>import("@/pages/fenlei/index.vue")
        },
        {
          path: '/base/shop',
          name: 'Shop',
          meta:{
            title:'购物车',
            keepAlive:true
          },
          component: () =>import("@/pages/shop/index.vue")
        },
        {
          path: '/base/my',
          name: 'My',
          meta:{
            title:'个人中心'
          },
          component: () =>import("@/pages/my/index.vue")
      
        }
      ]

    },
    {
      path: '/gooddetails',
      name: 'GoodDetails',
      meta:{
        title:'商品详情页'
      },
      component: () =>import("@/pages/gooddetails/index.vue")
    },
    {
      path: '/searchlist',
      name: 'SerachList',
      meta:{
        title:'商品查询列表'
      },
      component: () =>import("@/pages/searchlist/index.vue"),
    },
    {
      path: '/sun',
      name: 'Sun',
      meta:{
        title:'商品详情页子页面'
      },
      component: () =>import("@/pages/sun/index.vue")
    }
    
  ]
})
