import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'lib-flexible';
import '@/style/reset.css';
// 导入插件
import request from './api/request';
// 在原型上扩展,这样不用在每个页面都导入request
Vue.prototype.request = request;

// import { Message } from 'element-ui';

Vue.config.productionTip = false;

// Vue.use(Message);

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
