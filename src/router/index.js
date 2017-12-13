import Vue from 'vue'
import Router from 'vue-router'
import authUtils from '@/services/auth/utils'

const auth = () => import('@/views/auth')
const home = () => import('@/views/home')
const post = () => import('@/views/post')

Vue.use(Router)

// 登录验证
function requireAuth (to, from, next) {
  if (!authUtils.loggedIn()) {
    next('/auth')
  } else {
    next()
  }
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: home,
      children: [
        { name: 'post', path: '/', component: post }
      ],
      beforeEnter: requireAuth
    },
    {
      path: '/auth',
      name: 'auth',
      component: auth
    }
  ]
})
