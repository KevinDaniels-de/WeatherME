import Vue from 'vue'
import './plugins/fontawesome'
import App from './App.vue'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')