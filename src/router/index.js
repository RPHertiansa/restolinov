import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'
import Foods from '../views/Foods.vue'
import Order from '../views/Order.vue'
import Keranjang from '../views/Keranjang.vue'
import Sukses from '../views/Sukses.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/foods',
    name: 'Foods',
    component: Foods,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/keranjang',
    name: 'Keranjang',
    component: Keranjang,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/pesanan-sukses',
    name: 'Sukses',
    component: Sukses,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['auth/isLogin']) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router
