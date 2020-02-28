import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import notification from './notification'
import error from './error'
import loading from './loading'
import code from './code'
import codeBase from './codeBase'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    notification,
    error,
    loading,
    code,
    codeBase
  },
  plugins: [
    createPersistedState({
      paths: [ 'code' ]
    })
  ]
})
