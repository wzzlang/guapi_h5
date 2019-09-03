// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import store from './vuex/store.js'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import components from './plugins/components.js'
import util from './utils/util.js'
import * as filter from './utils/filter.js'
import api from './utils/api.js'
import Share from 'vue-social-share'

Vue.config.productionTip = false
Object.keys(filter).forEach(k => Vue.filter(k, filter[k]))

Vue.use(Mint)
Vue.use(Vuex)
Vue.use(components)
Vue.use(Share)
Vue.prototype.util = util
Vue.prototype.axios = axios
Vue.prototype.api = api

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    // 登录缓存
    if (localStorage.getItem('isLogin') === null) {
      localStorage.setItem('isLogin', '')
    }
    this.$store.state.isLogin = localStorage.getItem('isLogin')
    // 判断运行在什么环境下
    let ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) && (ua.match(/MicroMessenger/i)[0] === 'micromessenger')) {
      // 微信环境
      // eslint-disable-next-line
      wx.miniProgram.getEnv(res => {
        if (res.miniprogram) {
          // 小程序环境下逻辑
          console.log('微信小程序')
          this.$store.state.environ = 1
        } else {
          // 非小程序环境下逻辑
          console.log('微信浏览器')
          this.$store.state.environ = 0
        }
      })
    } else {
      // 非微信环境逻辑
      console.log('其他浏览器')
      this.$store.state.environ = 2
    }
  }
})
