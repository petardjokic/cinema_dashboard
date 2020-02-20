import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { store } from './store/store'
import { router } from './router/router'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)


new Vue({
  store: store,
  router: router,
  render: h => h(App)
}).$mount('#app')
