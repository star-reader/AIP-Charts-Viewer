import { createRouter, createWebHistory } from 'vue-router'

import EnrouteView from '@/views/EnrouteView.vue'
import ChartView from '@/views/ChartView.vue'
import AMDTView from '@/views/AMDTView.vue'
import AuthView from '@/views/AuthView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    'path':'/enroute',
    'name':'EnrouteView',
    'component': EnrouteView
  },
  {
    'path':'/airport',
    'name': 'ChartView',
    'component': ChartView
  },
  {
    'path':'/amdt',
    'name': 'AMDTView',
    'component': AMDTView
  },
  {
    'path':'/auth',
    'name':'AuthView',
    'component': AuthView
  }
]
})

export default router
