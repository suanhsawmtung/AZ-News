import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component : () => import('../views/HomePage.vue')
  },
  {
    path : '/homePage' ,
    name : 'homePage' ,
    component : () => import('../views/HomePage.vue')
  },
  {
    path : '/postDetails/:id',
    name : 'postDetails',
    component : () => import('../views/PostDetails.vue')
  },
  {
    path: '/logInPage',
    name: 'logInPage',
    component : () => import('../views/LogInPage.vue')
  },
  {
    path : '/registerPage',
    name : 'registerPage',
    component : () => import('../views/RegisterPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
