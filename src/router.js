import Vue from 'vue'
import Router from 'vue-router'
import CurrentDay from './views/CurrentDay.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'currentday',
      component: CurrentDay
    }
  ]
})
