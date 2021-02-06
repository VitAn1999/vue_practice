import fb from 'firebase'

class Ad {
    constructor(title, description, userId, promo, imgSrc = '', id = null) {
        this.title = title
        this.description = description
        this.userId = userId
        this.promo = promo
        this.imgSrc = imgSrc
        this.id = id
    }
}

export default {
    state: {
        ads: [
            {
                title: 'First ad',
                description: 'Little squirrel eat nuts',
                promo: false,
                imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
                id: '1'
            },
            {
                title: 'Second ad',
                description: 'Beautiful night sky in England',
                promo: true,
                imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
                id: '2'
            },
            {
                title: 'Third ad',
                description: 'Sinister planet',
                promo: true,
                imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
                id: '3'
            }
        ]
    },

    getters: {
        ads(state) {
            return state.ads
        },

        myAds(state) {
            return state.ads
        },

        promoAds(state) {
            return state.ads.filter(ad => {
                return ad.promo
            })
        },

        adById(state) {
            return adId => {
                return state.ads.find(ad => {
                    return ad.id === adId
                })
            }
        }
    },

    actions: {
        async createAd(context, payload) {
            context.commit('clearError')
            context.commit('setLoading', false)
            try {
                const newAd = new Ad(payload.title, payload.description, context.getters.user.id,
                    payload.promo, payload.imgSrc)
                const ad = await fb.database().ref('ads').push(newAd)
                context.commit('setLoading', false)
                context.commit('createAd', {
                    ...newAd,
                    id: ad.key
                })
            } catch (error) {
                context.commit('setLoading', false)
                context.commit('setError', error.message)
                throw error
            }
        },
        editAd(context, payload) {
            context.commit('clearError')
            context.commit('setLoading', false)
            try {
                context.commit('setLoading', false)
                context.commit('editAd', payload)
            } catch (error) {
                context.commit('setLoading', false)
                context.commit('setError', error.message)
                throw error
            }
        }
    },

    mutations: {
        createAd(state, payload) {
            return state.ads.push(payload)
        },
        editAd(state, payload) {
            return state.ads.splice(payload.oldAd, 1, payload.newAd)
        }
    }

}