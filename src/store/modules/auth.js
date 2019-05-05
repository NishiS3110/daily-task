import firebase from 'firebase'

// initial state
const state = {
  user: null
}

// getters
const getters = {
  isAuthenticated (state) {
    return !!state.user
  },
  userId (state) {
    return state.user ? state.user.uid : ''
  },
  userImageURL (state) {
    return state.user ? state.user.photoURL : ''
  }
}

// actions
const actions = {
  googleLogin ({ commit }) {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  },
  anonymousLogin({ commit }) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInAnonymously()
        .then(() => resolve())
        .catch(error => {
          reject(new Error(error))
      })
    })
  },
  setUser ({ commit }, payload) {
    commit('setUser', payload)
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut()
        .then(() => resolve())
        .catch(() => reject(new Error('logout failed')))
    })
  }
}

// mutations
const mutations = {
  setUser (state, payload) {
    state.user = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
