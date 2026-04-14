import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/reservation',
      name: 'reservation',
      component: () => import('@/views/ReservationView.vue'),
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('@/views/NewsView.vue'),
    },
    {
      path: '/news/:id',
      name: 'newsDetail',
      component: () => import('@/views/NewsDetailView.vue'),
    },
    {
      path: '/admin/login',
      name: 'adminLogin',
      component: () => import('@/views/admin/LoginView.vue'),
    },
    {
      path: '/admin',
      name: 'adminDashboard',
      component: () => import('@/views/admin/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('adminToken')
  if (to.meta.requiresAuth && !token) {
    next('/admin/login')
  } else {
    next()
  }
})

export default router
