import {
    createRouter,
    createWebHistory
} from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('../layouts/home.vue')
    },
    {
        path: '/user',
        component: () => import('../layouts/user.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router