import Vue from "vue"

import VueRouter from "vue-router"

import Cookies from 'js-cookie'

Vue.use(VueRouter)

import Main from '../views/Main.vue'

import Home from '../views/Home.vue'

import User from '../views/User.vue'

import Mall from '../views/Mall.vue'

import pageOne from '../views/pageOne.vue'

import pageTwo from '../views/pageTwo.vue'

import Login from '../views/Login.vue'

const routes = [
    {
        path: '/',
        component: Main,
        name: 'Main',
        redirect: '/home',

        // children: [
        //     { path: 'home', name: 'home', component: Home },
        //     { path: 'user', name: 'user', component: User },
        //     { path: 'mall', name: 'mall', component: Mall },
        //     { path: 'page1', name: 'page1', component: pageOne },
        //     { path: 'page2', name: 'page2', component: pageTwo },

        // ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    }

]

// 创建router实例
const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (!Cookies.get('token') && to.name !== "login") {
        next({ name: "login" })
    } else if (Cookies.get('token') && to.name === "login") {
        next('/')
    } else {
        next()
    }
})


export default router

