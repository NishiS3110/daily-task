import {
  db
} from '@/plugins/firebase'

// initial state
const state = {
  tasks: []
}
  
// getters
const getters = {
  newTasks: state => {
    return state.tasks.sort(function(a, b) {
      return Date.parse( a.date ) - Date.parse( b.date )
    })
  }
}

// actions
let actions = {
  add ({ dispatch }, payload) {
    db.collection("tasks").add({
      title: payload.title,
      detail: payload.detail,
      completed: payload.completed,
      date: payload.date,
      userId: payload.userId,
      userImageURL: payload.userImageURL
    }).then(function (docRef) {
      dispatch('get')
    }).catch(function (error) {
      console.error('Error adding task: ', error)
    })
  },
  get ({ commit }) {
    db.collection('tasks').get().then(snap => {
      const tasks = []
      snap.forEach(doc => {
        let data = {
          'id': doc.id,
          'title': doc.data().title,
          'detail': doc.data().detail,
          'completed': doc.data().completed,
          'date': doc.data().date,
          'userId': doc.data().userId,
          'userImageURL': doc.data().userImageURL
        }
        tasks.push(data)
      })
      commit('setTask', tasks)
    })
  },
  update ({ dispatch }, payload) {
    db.collection("tasks").doc(payload.id).update({
      title: payload.title,
      detail: payload.detail,
      completed: payload.completed,
      date: payload.date
    })
    .then(function() {
      dispatch('get')
    })
    .catch(function(error) {
      console.error('Error editing task: ', error)
    })
  },
  delete ({ dispatch }, payload) {
    db.collection("tasks").doc(payload.id).delete()
    .then(function() {
      dispatch('get')
    })
    .catch(function(error) {
      console.error('Error deleting task: ', error)
    })
  }
}
  

// mutations
const mutations = {
  setTask (state, payload) {
    state.tasks = payload
  }
}
  
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
