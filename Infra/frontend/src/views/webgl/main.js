import Vue from 'vue/dist/vue.js'
import Webgl from './Webgl.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(Webgl)
}).$mount('#webgl')
