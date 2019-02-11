import firebase from 'firebase'

const db = firebase.firestore();

// initial state
  const state = {
    tasks: []
  }
  
  // getters
  const getters = {
    newTasks: state => {
        return state.tasks.sort(function(a, b) {
            return Date.parse( a.date ) - Date.parse( b.date );
          })
      }
  }

  // actions
  const actions = {
    create ({ commit }, payload) {
        db.collection("tasks").add({
            title: payload.title,
            detail: payload.detail,
            completed: payload.completed,
            date: payload.date
        }).then(function (docRef) {
        }).catch(function (error) {
          console.error('Error adding document: ', error);
        });
    },
    get ({ commit }) {
        db.collection('tasks').get().then(snap => {
          const array = [];
          snap.forEach(doc => {
            let data = {
              'title': doc.data().title,
              'detail': doc.data().detail,
              'completed': doc.data().completed,
              'date': doc.data().date,
            }
            array.push(data)
          })
          commit('setTask', array)
        });
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
  