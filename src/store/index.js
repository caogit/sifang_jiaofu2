import Vue from 'vue';
import Vuex from 'vuex';
import { ApiUrl } from '@/api/index';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    listData: [],
  },
  mutations: {
    shenpiData(state) {
      // 请求
      this._vm.request.post(ApiUrl.shenpiData).then(res => {
        if (res.code == 200) {
          state.listData = res.list;
        }
      });
    },
  },
  actions: {},
});

export default store;
