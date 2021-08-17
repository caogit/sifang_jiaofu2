import Vue from 'vue';
import VueRouter from 'vue-router';
import { getToken } from '@/utils/storage';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/index.vue'),
    // redirect: '/login',
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
  },
  {
    path: '/writeDaily',
    name: 'writeDaily',
    component: () => import(/* webpackChunkName: "about" */ '../views/daily/index.vue'),
    meta: {
      keepAlive: true,
    },
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
// 路由跳转时使用导航守卫
router.beforeEach((to, from, next) => {
  // console.log('to, from, next', to, from, next);
  if (to.path == '/login') return next();
  // console.log(getToken('Token'));
  if (!getToken('Token')) {
    // 如果拿不到了Token的话就回到登录页
    return next('/login');
  } else {
    next();
  }
});
export default router;
