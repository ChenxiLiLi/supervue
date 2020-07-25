import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //定义全局变量
  state: {
    token: '',
    username: ''
  },
  mutations: {
    //set方法
    login(state, user) {
      state.token = user.token
      state.username = user.username
      window.localStorage.setItem('token', user.token)
      window.localStorage.setItem('user', user.username)
    },
    logout(state) {
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('user')
    }
  },
  actions: {
  },
  modules: {
  }
})
