import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/index.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/home/index.vue'),
    meta: {
      keepAlive: true,
    },
  },
  {
    path: '/writeDaily',
    name: 'writeDaily',
    component: () => import(/* webpackChunkName: "about" */ '../views/daily/index.vue'),
  },
  {
    path: '/renwu',
    name: 'renwu',
    component: () => import(/* webpackChunkName: "about" */ '../views/renwu/index.vue'),
    children: [
      {
        path: 'history',
        name: 'renwuHistory',
        component: () => import(/* webpackChunkName: "about" */ '../views/renwu/history.vue'),
      },
    ],
  },
  {
    path: '/shenpi',
    name: 'shenpi',
    component: () => import(/* webpackChunkName: "about" */ '../views/shenpi/index.vue'),
  },
  {
    path: '/shenpiDetail',
    name: 'shenpiDetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/shenpi/details.vue'),
  },
  {
    path: '/historys',
    name: 'historys',
    component: () => import(/* webpackChunkName: "about" */ '../views/shenpi/historys.vue'),
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
