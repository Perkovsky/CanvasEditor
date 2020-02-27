import {DEFAULT_CODE} from '@/common/constants'

export default {
  state: {
    code: DEFAULT_CODE
  },
  mutations: {
    setCode (state, payload) {
      state.code = payload
    },
    clearCode (state) {
      state.code = DEFAULT_CODE
    }
  },
  actions: {
    setCode ({commit}, payload) {
      commit('setCode', payload)
    },
    clearCode ({commit}) {
      commit('clearCode')
    }
  },
  getters: {
    code (state) {
      return state.code
    }
  }
}
