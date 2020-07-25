import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import api from './plugins/api'

Vue.config.productionTip = false
Vue.prototype.$http = api;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
