import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuex from 'vuex';
import store from './store/index';
import 'amfe-flexible';
import '@/assets/style/reset.css';
import { Picker, Popup, Toast, Col, Row, DatetimePicker, Collapse, CollapseItem } from 'vant';
import util from '@/utils/util';
// 导入插件
import request from '@/api/request';

// 全局引入Navbar
import Navber from '@/components/Navber';
// 全局引入BaseLayout
import BaseLayout from '@/components/BaseLayout/index';

// 全局注册组件
Vue.component('Navber', Navber);
Vue.component('BaseLayout', BaseLayout);

// 在原型上扩展
Vue.prototype.request = request;
Vue.prototype.util = util;

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(DatetimePicker);

Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Toast);
Vue.use(Col);
Vue.use(Row);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
