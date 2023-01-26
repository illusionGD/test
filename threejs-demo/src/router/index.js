import {
    createRouter,
    createWebHistory
} from 'vue-router'

const routes = [{
        path: '/',
        component: () => import('../layouts/home.vue')
    },
    {
        path: '/test',
        component: () => import('../layouts/test.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router