import store from '../store'

export default async function(to, from, next) {
    const loginUser = await store.getters.user
    if (loginUser) {
        next()
    } else {
        next('/login?loginError=true')
    }
}