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
      },
    },

    actions: {
        async registerUser(context, payload) {
            context.commit('clearError')
            context.commit('setLoading', true)
            try {
                const user = await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                const newUser = new User(user.user.uid)
                context.commit('setUser', newUser)
                context.commit('setLoading', false)
            } catch (error) {
                context.commit('setLoading', false)
                context.commit('setError', error.message)
                throw error
            }
        },
        
        async loginUser(context, payload) {
            context.commit('clearError')
            context.commit('setLoading', true)
            try {
                const user = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                const loginUser = new User(user.user.uid)
                context.commit('setUser', loginUser)
                context.commit('setLoading', false)
            } catch (error) {
                context.commit('setLoading', false)
                context.commit('setError', error.message)
                throw error
            }
        },

        userLogout(context) {
            firebase.auth().signOut()
            context.commit('setUser', null)
        },

        autoLoginUser(context, payload) {
            context.commit('setUser', new User(payload.uid))
        }

    },

    getters: {
        user(state) {
            return state.user
        },
        isUserLogin(state) {
            return state.user !== null
        }
    }
}