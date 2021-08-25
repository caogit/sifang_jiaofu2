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
    myDailyListData: [],
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
    // 我的日报列表每次10条数据
    myDailyList(state) {
      let parms = {
        endDate: '',
        pageNum: 1,
        pageSize: 10,
        startDate: '',
      };
      this.request.post(ApiUrl.MINE.GETLIST_BYPAGE, parms).then(res => {
        if (res.code == 200) {
          state.myDailyListData = res.data.records;
          // // 循环往里面加每个值
          // for (let i = 0; i < this.listData.length; i++) {
          //   this.$set(this.chooseObj, i, false);
          // }
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
