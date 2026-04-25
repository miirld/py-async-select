import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'rec-quiz',
      component: () => import('@/views/RecQuiz.vue'),
    },
    {
      path: '/rec-table',
      name: 'rec-table',
      component: () => import('@/views/RecTable.vue'),
    },
  ],
})

export default router
