import {
    createRouter,
    createWebHistory
} from 'vue-router'
import store from '../store/index'


const routes = [
    {
        path: '/',
        component: () => import('../layouts/home.vue')
    },
    {
        path: '/user',
        component: () => import('../layouts/user.vue')
    },
    {
        path: '/laboratory',
        component: () => import('../layouts/laboratory.vue'),
        meta: {
            title: '实验室'
        },
        children: [
            {
                path: 'three-loader',
                component: () => import('../components/laboratory/threejs/loader.vue'),
            },
            {
                path: 'three-raycast',
                component: () => import('../components/laboratory/threejs/raycast.vue'),
            }
        ]
    },
    {
        path: '/relax',
        component: () => import('../layouts/relax.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('../layouts/notFound.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
    // 清除requestAnimationId
    const { animationIdList } = store.state
    animationIdList.forEach(id => {
        window.cancelAnimationFrame(id)
    })
    animationIdList.splice(0, animationIdList.length)
    next()
})

export default router