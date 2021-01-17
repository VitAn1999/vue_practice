import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Ad from "../views/Ads/Ad";
import NewAd from "../views/Ads/NewAd";
import AdList from "../views/Ads/AdList";
import Orders from "../views/Orders/Orders";
import Login from "../views/Auth/Login";
import Registration from "../views/Auth/Registration";

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    name: 'home',
    component: Home
  },
  {
    path: '/ad/:id',
    name: 'ad',
    component: Ad
  },
  {
    path: '/new-ad',
    name: 'newAd',
    component: NewAd
  },
  {
    path: '/user-ad',
    name: 'adList',
    component: AdList
  },
  {
    path: '/orders',
    name: 'orders',
    component: Orders
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
