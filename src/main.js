import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuex from 'vuex';
import store from './store/index';
import 'amfe-flexible';
import '@/style/reset.css';
// 导入插件
import request from './api/request';
// 在原型上扩展,这样不用在每个页面都导入request
Vue.prototype.request = request;
// 全局引入Navbar
import Navber from './components/Navber';
// 全局引入BaseLayout
import BaseLayout from './components/BaseLayout/index';

// 全局注册组件
Vue.component('Navber', Navber);
Vue.component('BaseLayout', BaseLayout);

Vue.config.productionTip = false;

Vue.use(Vuex);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
