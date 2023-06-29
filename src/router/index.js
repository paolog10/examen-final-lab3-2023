import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import CompraView from '../views/CompraView.vue'
import HistorialMovimientosView from '../views/HistorialMovimientosView.vue'
import PantallaInversionesView from '../views/PantallaInversionesView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },

  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/compra',
    name: 'CompraView',
    component: CompraView
  },
  {
    path: '/historialMovimientos',
    name: 'HistorialMovimientosView',
    component: HistorialMovimientosView
  },
  {
    path: '/pantallaInversiones',
    name: 'PantallaInversionesView',
    component: PantallaInversionesView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
