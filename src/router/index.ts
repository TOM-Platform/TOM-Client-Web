import { createRouter, createWebHistory } from 'vue-router'
import SessionView from '../views/martial-arts/SessionView.vue'
import PeriodView from '../views/martial-arts/PeriodView.vue'
import { MARTIAL_ARTS_ROUTE } from '@/constant/constant'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/running'
    },
    {
      path: '/running',
      name: 'running',
      component: () => import('../views/running-coach/RunningView.vue')
    },
    {
      path: `/${MARTIAL_ARTS_ROUTE}/:sessionId`,
      name: 'Session View - Martial Arts',
      component: SessionView
    },
    {
      path: `/${MARTIAL_ARTS_ROUTE}`,
      name: 'Period View - Martial Arts',
      component: PeriodView
    },
    {
      path: '/template',
      name: 'template',
      component: () => import('../views/template/TemplateView.vue')
    }
  ]
})

export default router
