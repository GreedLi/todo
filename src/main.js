import Vue from 'vue'
import App from './App'
import '@/assets/base.css'
import '@/assets/index.css'
// import moment form '../node_modules/moment/min/moment-with-locales.js'
// import moment from '../node_modules/moment/min/moment-with-locales.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
