import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "about" */ '../views/shouye/index.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/shouye/index.vue'),
  },
  {
    path: '/renwu',
    name: 'renwu',
    component: () => import(/* webpackChunkName: "about" */ '../views/renwu/index.vue'),
  },
  {
    path: '/shenpi',
    name: 'shenpi',
    component: () => import(/* webpackChunkName: "about" */ '../views/shenpi/index.vue'),
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import(/* webpackChunkName: "about" */ '../views/mine/index.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
