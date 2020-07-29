import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/*import 'element-ui/lib/theme-chalk/index.css'*/
import './assets/css/global.css'
import './assets/iconfont/iconfont.css'
import api from './plugins/api'
import 'font-awesome/css/font-awesome.min.css'

Vue.config.productionTip = false
Vue.prototype.$http = api;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
