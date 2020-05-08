import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {getRequest} from './common/js/request.js'

//基础组件
import BaseHeader from '@base/base-header/base-header.vue'
import BaseScroll from '@base/base-scroll/base-scroll.vue'

Vue.config.productionTip = false
Vue.prototype.getRequest = getRequest;
Vue.component('base-header', BaseHeader)
Vue.component('base-scroll', BaseScroll)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
