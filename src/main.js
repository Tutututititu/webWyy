import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './components/components'
import store from './store/index'
import './assets/global.css'
import './assets/font_ltwbd5n99w/iconfont.css'
import axios from 'axios'


// 提取请求头
axios.defaults.baseURL = "https://lianghj.top:8888/api/private/v1/"
// 配置请求时间
axios.defaults.timeout = 8000
// 全局挂载属性
Vue.prototype.$http = axios

Vue.prototype.$store = store
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
