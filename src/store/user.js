import firebase from 'firebase'

class User {
    constructor (id) {
        this.id = id
    }
}

export default {
    state: {
        user: null
    },

    mutations: {
      setUser(state, payload) {
          state.user = payload
      }
    },

    actions: {
      registerUser(context, payload) {
          context.commit('clearError')
          context.commit('setLoading', true)
          firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
              .then((user) => {
                  context.commit('setUser', new User(user.uid))
                  context.commit('setLoading', false)
              })
              .catch(error => {
                  context.commit('setLoading', false)
                  context.commit('setError', error.message)
              })
      }
    },

    getters: {
        user(state) {
            return state.user
        }
    }
}