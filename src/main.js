import Vue from 'vue'
import vuescroll from 'vue-scroll'
import App from './App'
import '@/assets/base.css'
import '@/assets/index.css'
import ElementUI from 'element-ui' //引入element-ui
import 'element-ui/lib/theme-chalk/index.css' //引入element样式
Vue.use(ElementUI); //实例化element
// import moment form '../node_modules/moment/min/moment-with-locales.js'
// import moment from '../node_modules/moment/min/moment-with-locales.js'

Vue.use(vuescroll)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
