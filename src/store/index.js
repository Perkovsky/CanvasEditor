import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import notification from './notification'
import error from './error'
import loading from './loading'
import code from './code'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    notification,
    error,
    loading,
    code
  },
  plugins: [
    createPersistedState({
      paths: [ 'code' ]
    })
  ]
})
