export default {
  state: {
    notification: null
  },
  mutations: {
    setNotification (state, payload) {
      state.notification = payload
    },
    clearNotification (state) {
      state.notification = null
    }
  },
  actions: {
    setNotification ({commit}, payload) {
      commit('setNotification', payload)
    },
    clearNotification ({commit}) {
      commit('clearNotification')
    }
  },
  getters: {
    notification (state) {
      return state.notification
    }
  }
}
