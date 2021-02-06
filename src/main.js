import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "firebase";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyD4Z3_5bzJvzcQq0iUvcMjnvs5JDzlLxY0",
      authDomain: "vm-vue-practice.firebaseapp.com",
      projectId: "vm-vue-practice",
      storageBucket: "vm-vue-practice.appspot.com",
      messagingSenderId: "743943201589",
      appId: "1:743943201589:web:b6ced73dc3d71cf619627c",
      measurementId: "G-2YSLZ3JYPK"
    }),
    firebase.auth().onAuthStateChanged(user => {
      return this.$store.dispatch('autoLoginUser', user)
    })
  },
  vuetify,
  render: h => h(App)
}).$mount("#app");
