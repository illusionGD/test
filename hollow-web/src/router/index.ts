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
export default router