import Vue from "vue";
import Vuex from "vuex";
import Ads from "./ads"
import User from "./user"
import Loading from "./loading"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Ads, User, Loading
  }
});
