import Vue from 'vue';
import Vuex from 'vuex';
import { ApiUrl } from '@/api/index';
import VuexPersistence from 'vuex-persist';
Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

const store = new Vuex.Store({
  state: {
    listData: [],
    LoginManData: [],
  },
  mutations: {
    // 请求审批数据
    shenpiData(state) {
      // 请求
      this._vm.request.post(ApiUrl.shenpiData).then(res => {
        if (res.code == 200) {
          state.listData = res.list;
        }
      });
    },
    // 请求登陆人数据
    LoginMan(state) {
      this._vm.request.post(ApiUrl.USER.GETLOGIN_USER_INFO).then(res => {
        if (res.code == 200) {
          state.LoginManData = res.data;
        }
      });
    },
  },
  actions: {
    // 请求登陆人数据
    LoginMans(content) {
      setTimeout(() => {
        content.commit('LoginMan');
      }, 300);
    },
  },
  plugins: [vuexLocal.plugin],
});

export default store;
