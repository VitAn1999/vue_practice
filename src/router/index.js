import Vue from "vue";
import VueRouter from "vue-router";
import AuthGuard from './auth-guard';
import Home from "../views/Home";
import Ad from "../views/Ads/Ad";
import NewAd from "../views/Ads/NewAd";
import AdList from "../views/Ads/AdList";
import Orders from "../views/Orders/Orders";
import Login from "../views/Auth/Login";
import Registration from "../views/Auth/Registration";
import EditAd from "../views/Ads/EditAd"

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    name: 'home',
    component: Home
  },
  {
    path: '/ad/:id',
    props: true,
    name: 'ad',
    component: Ad,
    beforeEnter: AuthGuard
  },
  {
    path: '/new-ad',
    name: 'newAd',
    component: NewAd,
    beforeEnter: AuthGuard
  },
  {
    path: '/edit-ad/:id',
    props: true,
    name: 'editAd',
    component: EditAd,
    beforeEnter: AuthGuard
  },
  {
    path: '/user-ad',
    name: 'adList',
    component: AdList,
    beforeEnter: AuthGuard
  },
  {
    path: '/orders',
    name: 'orders',
    component: Orders,
    beforeEnter: AuthGuard
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
