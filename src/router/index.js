import Vue from 'vue';
import VueRouter from 'vue-router';
import { getToken, removelocalStorage } from '@/utils/storage';
import { Notify } from 'vant';

Vue.use(VueRouter);

//解决重复点击tabbar报错问题push
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  // console.log('push');
  return originalPush.call(this, location).catch(err => err);
};
//解决重复点击tabbar报错问题replace
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  // console.log('replace');
  return originalReplace.call(this, location).catch(err => err);
};

const routes = [
  {
    path: '/',
    redirect: '/login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/index.vue'),
  },
  // 公共跳转页面
  {
    path: '/getSubmissionInfo',
    name: 'getSubmissionInfo',
    component: () => import(/* webpackChunkName: "about" */ '../views/getSubmissionInfo/index.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/home/index.vue'),
  },
  {
    path: '/writeDaily',
    name: 'writeDaily',
    component: () => import(/* webpackChunkName: "about" */ '../views/daily/indexcc.vue'),
    meta: {
      keepAlive: true,
    },
  },
  {
    path: '/holidayApply',
    name: 'holidayApply',
    component: () => import(/* webpackChunkName: "about" */ '../views/holidayApply/index.vue'),
  },
  {
    path: '/task',
    name: 'task',
    component: () => import(/* webpackChunkName: "about" */ '../views/task/index.vue'),
    children: [
      {
        path: 'history',
        name: 'renwuHistory',
        component: () => import(/* webpackChunkName: "about" */ '../views/task/history.vue'),
      },
    ],
  },
  {
    path: '/approve',
    name: 'approve',
    component: () => import(/* webpackChunkName: "about" */ '../views/approve/index.vue'),
  },
  {
    path: '/shenpiDetail',
    name: 'shenpiDetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/approve/details.vue'),
  },
  {
    path: '/historys',
    name: 'historys',
    component: () => import(/* webpackChunkName: "about" */ '../views/approve/historys.vue'),
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import(/* webpackChunkName: "about" */ '../views/mine/index.vue'),
  },
  {
    path: '/personalData',
    name: 'personalData',
    component: () => import(/* webpackChunkName: "about" */ '../views/mine/personalData.vue'),
  },
  {
    path: '/mineDaily',
    name: 'mineDaily',
    component: () => import(/* webpackChunkName: "about" */ '../views/mine/daily.vue'),
  },
];

const router = new VueRouter({
  routes,
});
// 路由跳转时使用导航守卫
router.beforeEach((to, from, next) => {
  console.log(to, from);
  if (to.path == '/login') {
    removelocalStorage();
    return next();
  }
  // console.log(getToken('Token'));
  if (!getToken('Token')) {
    console.log(from);
    // 如果拿不到了Token的话就回到登录页
    if (from.path == '/login') {
      Notify({ type: 'danger', message: '请先登录' });
      return next('/login');
    } else {
      Notify({ type: 'danger', message: 'token失效，请重新登录' });
      return next('/login');
    }
  } else {
    next();
  }
});
export default router;
