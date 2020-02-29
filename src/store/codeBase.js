import * as fb from 'firebase/app'
import 'firebase/database'

function getName () {
  return 'code-' + getRandomInteger(1000, 9999)
}

function getRandomInteger (min, max) {
  let rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}

export default {
  state: {
    codeBase: []
  },
  mutations: {
    setCodeBase (state, payload) {
      state.codeBase = payload
    }
  },
  actions: {
    async saveCode ({commit}, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const obj = {
          name: getName(),
          code: payload
        }
        const item = await fb.database().ref('codebase').push(obj)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error)
        throw error
      }
    },
    async fetchCodeBase ({commit}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        fb.database().ref('codebase').on('value', async function (snapshot) {
          try {
            const result = []
            const values = snapshot.val()
            for (const key in values) {
              const value = {
                id: key,
                name: values[key].name
              }
              result.push(value)
            }
            commit('setCodeBase', result)
            commit('setLoading', false)
          } catch (error) {
            commit('setCodeBase', [])
            commit('setLoading', false)
            commit('setError', error)
            throw error
          }
        })
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error)
        throw error
      }
    },
    async editCode ({commit}, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await fb.database().ref('codebase').child(payload.id).update({ name: payload.name })
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error)
        throw error
      }
    },
    async restoreCode ({commit}, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        fb.database().ref('codebase/' + payload.id).once('value', async function (snapshot) {
          try {
            const result = snapshot.val()
            if (result.code) {
              commit('setCode', result.code)
            }
            commit('setLoading', false)
            //commit('setNotification', 'Code have been restored!')
          } catch (error) {
            commit('setLoading', false)
            commit('setError', error)
            throw error
          }
        })
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error)
        throw error
      }
    },
    async deleteCode ({commit}, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await fb.database().ref('codebase').child(payload.id).remove()
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error)
        throw error
      }
    }
  },
  getters: {
    codeBase (state) {
      return state.codeBase
    }
  }
}
