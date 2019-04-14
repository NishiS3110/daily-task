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
  userImageURL (state) {
    return state.user.photoURL
  }
}

// actions
const actions = {
  login ({ commit }) {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  },
  setUser ({ commit }, payload) {
    commit('setUser', payload)
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
          firebase.auth().signOut()
          .then(() => resolve())
          .catch(() => reject())
    })
  },
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
  