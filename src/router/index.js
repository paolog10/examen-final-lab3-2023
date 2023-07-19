import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import CompraView from '../views/CompraView.vue'
import HistorialMovimientosView from '../views/HistorialMovimientosView.vue'
import PantallaInversionesView from '../views/PantallaInversionesView.vue'
import formularioEdicion from '../components/formularioEdicion.vue'
import PantallaAnalisisInversionesView from '../views/PantallaAnalisisInversionesView.vue'

const routes = [
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/',
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
  {
    path: '/compra/:id',
    name: 'formularioEdicion',
    props: true,
    component: formularioEdicion
  },
  {
    path: '/analisisInversiones',
    name: 'PantallaAnalisisInversionesView',
    component: PantallaAnalisisInversionesView
  },
  { // Redireccion para rutas no definidas.
    path: "/:subPath*",
    redirect: {
      name: "LoginView"
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
