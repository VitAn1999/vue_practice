import fb from 'firebase';

class Ad {
  constructor(title, description, userId, promo, imgSrc, id = null) {
    this.title = title;
    this.description = description;
    this.userId = userId;
    this.promo = promo;
    this.imgSrc = imgSrc;
    this.id = id;
  }
}

export default {
  state: {
    ads: [],
  },

  getters: {
    ads(state) {
      return state.ads;
    },

    myAds(state, getters) {
      return state.ads.filter(ad => {
        return ad.userId === getters.user.id
      })
    },

    promoAds(state) {
      return state.ads.filter((ad) => {
        return ad.promo;
      });
    },

    adById(state) {
      return (adId) => {
        return state.ads.find((ad) => {
          return ad.id === adId;
        });
      };
    },
  },

  actions: {
    async createAd(context, payload) {
      context.commit('clearError');
      context.commit('setLoading', true);
      try {
        const newAd = new Ad(
          payload.title,
          payload.description,
          context.getters.user.id,
          payload.promo,
          ''
        );
        const image = payload.image;
        const imageExt = image.name.slice(image.name.lastIndexOf('.'));
        const ad = await fb
          .database()
          .ref('ads')
          .push(newAd);
        const fileData = await fb
          .storage()
          .ref()
          .child(`ads/${ad.key}${imageExt}`)
          .put(image);
        let imgSrc = '';
        await fileData.ref.getDownloadURL().then((img) => {
          imgSrc = img;
        });
        await fb
          .database()
          .ref('ads')
          .child(ad.key)
          .update({
            imgSrc: imgSrc,
          });
        context.commit('setLoading', false);
        context.commit('createAd', {
          ...newAd,
          imgSrc: imgSrc,
          id: ad.key,
        });
      } catch (error) {
        context.commit('setLoading', false);
        context.commit('setError', error.message);
        throw error;
      }
    },

    async fetchAds(context) {
      context.commit('clearError');
      context.commit('setLoading', true);

      try {
        const fbAds = await fb
          .database()
          .ref('ads')
          .once('value');
        const ads = fbAds.val();
        const resultAds = [];
        Object.keys(ads).forEach((key) => {
          const ad = ads[key];
          resultAds.push(
            new Ad(
              ad.title,
              ad.description,
              ad.userId,
              ad.promo,
              ad.imgSrc,
              key
            )
          );
        });
        context.commit('loadAd', resultAds);
        context.commit('setLoading', false);
      } catch (error) {
        context.commit('setError', error.message);
        context.commit('setLoading', false);
        throw error;
      }
    },

    async editAd(context, payload) {
      context.commit('clearError');
      context.commit('setLoading', true);
      try {
        let editAd = {};
        if (payload.newAd.image) {
          const image = payload.newAd.image;
          const imageExt = image.name.slice(image.name.lastIndexOf('.'));
          const fileData = await fb
            .storage()
            .ref()
            .child(`ads/${payload.newAd.id}${imageExt}`)
            .put(image);
          let imgSrc = '';
          await fileData.ref.getDownloadURL().then((img) => {
            imgSrc = img;
          });
          await fb
            .database()
            .ref('ads')
            .child(payload.newAd.id)
            .update({
              title: payload.newAd.title,
              description: payload.newAd.description,
              userId: payload.newAd.userId,
              promo: payload.newAd.promo,
              imgSrc: imgSrc,
              id: payload.newAd.id,
            });
          editAd = new Ad(
            payload.newAd.title,
            payload.newAd.description,
            payload.newAd.userId,
            payload.newAd.promo,
            imgSrc,
            payload.newAd.id
          );
        } else {
          editAd = new Ad(
            payload.newAd.title,
            payload.newAd.description,
            payload.newAd.userId,
            payload.newAd.promo,
            payload.newAd.imgSrc,
            payload.newAd.id
          );
        }
        context.commit('setLoading', false);
        context.commit('editAd', {
          newAd: editAd,
          oldAd: payload.oldAd,
        });
      } catch (error) {
        context.commit('setLoading', false);
        context.commit('setError', error.message);
        throw error;
      }
    },
  },

  mutations: {
    createAd(state, payload) {
      state.ads.push(payload);
    },
    loadAd(state, payload) {
      state.ads = payload;
    },
    editAd(state, payload) {
      state.ads.splice(payload.oldAd, 1, payload.newAd);
    },
  },
};
