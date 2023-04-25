import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import useStore from '@/stores/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { tabbar: true, auth: true }
    },
    {
      path: '/Experts',
      name: 'Experts',
      component: () => import('../views/ExPerts.vue'),
      meta: { tabbar: true, auth: true }
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('../views/SetTing.vue'),
      meta: { tabbar: true, auth: true }
    },
    {
      path: '/Instruct',
      name: 'Instruct',
      component: () => import('../views/InstRuct.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoGin.vue')
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: () => import('../views/ReCharge.vue')
    },
    {
      path: '/ChatView',
      name: 'ChatView',
      component: () => import('../views/ChatView.vue')
    }
  ]
})
const whitelist = ['home', 'recharge', 'Experts', 'setting', 'login']
router.beforeEach((to: any, from: any, next) => {
  if (useStore().user.userInfo) {
    next()
  } else {
    if (whitelist.indexOf(to.name) !== -1) {
      next()
    } else {
      // 不是在白名单内重定向到登录页面
      next(`/login?redirect=${to.fullPath}`)
    }
  }
})

export default router
