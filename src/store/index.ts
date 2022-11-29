import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    user : {},
    token : ''
  },
  getters: {
    storageToken : state => state.token,
    storageUser : state => state.user,
  },
  mutations: {
  },
  actions: {
    setToken : ({state},value) => state.token = value,
    setUser : ({state},value) => state.user = value,
  },
  modules: {
  }
})
