// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import eventHub from './utils/eventHub'
import dialogUtils from './dialogs/utils'
import dictUtils from './services/dict/utils'
import pkg from '../package.json'
import 'element-ui/lib/theme-chalk/index.css'
import 'nprogress/nprogress.css'
import 'font-awesome/css/font-awesome.css'

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.config.productionTip = false
Vue.prototype.$eventHub = eventHub
Vue.prototype.$dialog = dialogUtils
Vue.prototype.$loadCache = dictUtils.load

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

// window 上存放版本号
window.res = {
  name: pkg.name,
  version: pkg.version
}

console.log('---------------------------------------')
console.log(`   APP ${pkg.name} v${pkg.version} is running`)
console.log('---------------------------------------')
