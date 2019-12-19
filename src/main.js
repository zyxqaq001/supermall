import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import Fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

//懒加载
Vue.use(VueLazyload,{
  loading:require('./assets/img/common/placeholder.png')
})
Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
Vue.use(toast)
//解决移动端延迟
Fastclick.attach(document.body)
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
