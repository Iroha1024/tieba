import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../pages/home.vue'),
      children: [
          {
              path: '*',
              component: () => import('components/home/homeMain/homeMain.vue')
          },
      ]
    },
    {
      path: '/follow',
      name: 'follow',
      component: () => import('../pages/follow.vue')
    },
    {
      path: '/message',
      name: 'message',
      component: () => import('../pages/message.vue')
    },
    {
      path: '/info',
      name: 'info',
      component: () => import('../pages/info.vue')
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})
