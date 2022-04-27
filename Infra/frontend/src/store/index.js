import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './models/auth'
import User from './models/user'
import Device from './models/device'
import WorkHistory from './models/workhistory'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Auth,
    User,
    Device,
    WorkHistory
  }
})
