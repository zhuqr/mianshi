import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login'
import Home from './views/home'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'Home',
    component: Home,
  }, {
    path: '/login',
    name: 'Login',
    component: Login,

  }, ]
})
export default router