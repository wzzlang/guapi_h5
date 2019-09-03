import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    userName: 'GuaPi',
    isLogin: '', // 登录状态
    environ: null, // 项目运行环境 0-微信浏览器  1-微信小程序 2-其他环境
    storeIndex: 0, // 门店自取选择门店
    picker: null, // 取件人即发件人
    recipient: null, // 收件人
    recipientCloudList: null, // 云仓订单详情收件人列表
    recipientList: [] // 添加收件人组导入收件人列表
  },
  mutations: {
    newUserName (state, msg) {
      state.author = msg
    },
    isLogin (state, msg) {
      state.isLogin = msg
      localStorage.setItem('isLogin', msg)
    },
    storeIndex (state, index) {
      state.storeIndex = index
    },
    picker (state, picker) {
      state.picker = picker
    },
    recipient (state, recipient) {
      state.recipient = recipient
    },
    recipientList (state, item) {
      for (let i = 0; i < state.recipientList.length; i++) {
        if (state.recipientList[i].id === item.id) {
          return
        }
      }
      state.recipientList.push(item)
    },
    recipientCloudList (state, param) {
      if (state.recipientCloudList) {
        state.recipientCloudList[param.index] = param.item
      }
    },
    recipientListDel (state, index) {
      state.recipientList.splice(index, 1)
    }
  }
})

export default store
