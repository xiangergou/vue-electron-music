import Vue from 'vue'
import Router from 'vue-router'
// import Layout from '../views/layout/Layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: resolve => require(['@/views/login/index'], resolve),
      hidden: true
    },
    {
      path: '/',
      name: 'landing-page',
      component: require('@/views/layout/Layout').default,
      redirect: '/dashboard',
      icon: 'home',
      noDropdown: true,
      children: [{
        name: '首页',
        path: 'dashboard',
        component: resolve => require(['@/views/dashboard/index'], resolve)
      }, {
        name: '音乐详情页',
        path: 'songDetail',
        component: resolve => require(['@/views/songDetail/index'], resolve)
      }]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
