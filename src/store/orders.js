import fb from 'firebase'

class Order {
    constructor(firstName, lastName, phone, adId, userId, done = false, id = null) {
        this.firstName = firstName
        this.lastName = lastName
        this.phone = phone
        this.adId = adId
        this.userId = userId
        this.done = done
        this.id = id
    }
}

export default {
    state: {
        orders: []
    },
    getters: {
        myOrders(state, getters) {
            return state.orders.filter(order => {
                return order.userId === getters.user.id
            })
        },
    },
    mutations: {
        createOrder(state, payload) {
            state.orders.push(payload)
        },
        loadOrders(state, payload) {
            state.orders = payload
        }
    },
    actions: {
        async createOrder(context, payload) {
            context.commit('clearError')
            try {
                const newOrder = new Order(
                    payload.firstName, payload.lastName, payload.phone, payload.adId, payload.userId
                )
                const order = await fb.database().ref('orders').push(newOrder)

                context.commit('createOrder', {
                    ...newOrder,
                    id: order.key
                })
            } catch (e) {
                context.commit('setError', e.message)
                throw e
            }
        },
        async fetchOrders(context) {
            context.commit('clearError')
            context.commit('setLoading', true)
            try {
                const fbOrders = await fb
                    .database()
                    .ref('orders')
                    .once('value');
                const orders = fbOrders.val();
                const resultOrders = [];
                Object.keys(orders).forEach((key) => {
                    const order = orders[key];
                    resultOrders.push(
                        new Order(
                           order.firstName,
                           order.lastName,
                           order.phone,
                           order.adId,
                           order.userId,
                           order.done,
                           key
                        )
                    );
                });
                context.commit('loadOrders', resultOrders)
                context.commit('setLoading', false)
            } catch (e) {
                context.commit('setError', e.message)
                context.commit('setLoading', false)
                throw e
            }
        }
    }
}