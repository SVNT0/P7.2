import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import { createRouter, createWebHistory } from 'vue-router'
import * as Auth from '../views/auth'
import * as Page from '../views/page'

const routes = [

    { path: '/login', name: 'login', component: Auth.login },
    { path: '/signup', component: Auth.signup },
    { path: '/:pathMatch(.*)*', redirect: '/login' },

    {
        path: '/',
        name: 'page',
        redirect: '/login',
        component: Page.layout,
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