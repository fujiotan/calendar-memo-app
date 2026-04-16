import { createRouter, createWebHistory } from 'vue-router'
import CalendarHomeView from '../views/CalendarHomeView.vue'
import ItemCreateView from '../views/ItemCreateView.vue'
import ItemDetailView from '../views/ItemDetailView.vue'
import ItemEditView from '../views/ItemEditView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes:[
    {
      path: '/',
      name: 'home',
      component: CalendarHomeView
    },
    {
      path: '/create',
      name: 'create',
      component: ItemCreateView
    },
    {
      path: '/items/:id',
      name: 'detail',
      component: ItemDetailView
    },
    {
      path: '/itms/:id/edit',
      name: 'edit',
      component: ItemEditView
    }
  ]
})

export default router