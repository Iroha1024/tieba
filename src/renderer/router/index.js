import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        // {
        //     path: '/login',
        //     component: () => import('../pages/login')
        // },
        {
            path: '/home',
            component: () => import('../pages/home'),
            children: [
               {
                    path: 'article/:aid',
                    name: 'article',
                    component: () => import('components/article/article')
               }
            ]
        },
        {
            path: '/follow',
            component: () => import('../pages/follow'),
        },
        {
            path: '/message',
            component: () => import('../pages/message')
        },
        {
            path: '/info',
            component: () => import('../pages/info')
        },
        {
            path: '*',
            redirect: '/home'
        }
    ],
    // scrollBehavior(to, from, savedPosition) {
    //     return { x: 0, y: 0 }
    // }
})
