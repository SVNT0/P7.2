import { createRouter, createWebHistory } from 'vue-router'
import * as Auth from '../views/authentification'
import * as Page from '../views/page'

const routes = [

    { path: '/connect', name: 'login', component: Auth.connect },
    { path: '/inscription', component: Auth.inscription },
    { path: '/:pathMatch(.*)*', redirect: '/login' },

    {
        path: '/',
        name: 'public',
        redirect: '/connect',
        component: Public.publicLayout,
        children: [
            { path: '/home', component: Page.home },
            { path: '/create/', component: Page.create, prop: true },
            { path: '/modify/:id(\\d+)', name: 'modify', component: Page.modify },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;