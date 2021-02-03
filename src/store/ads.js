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
        createAd(context, payload) {
            payload.id = String(Math.round((Math.random()*100)))
            context.commit('createAd', payload)
        },
        editAd(context, payload) {
            context.commit('editAd', payload)
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