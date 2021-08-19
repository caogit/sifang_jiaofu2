<template>
  <div class="mainStyle">
    <Navber>
      <template #headerNav>审批</template>
      <template #rightIconNav>
        <img src="../../assets/icon_cut/icon_history@2x.png" alt="" @click="toHistory" />
      </template>
    </Navber>
    <div class="coinmainStyle">
      <Coms
        v-for="(item, index) in listData"
        :key="index"
        :typeState="item.colorTextstate"
        :liststate="item.shenqingstate"
        @click.native="toDetails(item.titlename)"
      >
        <template #headerLeft>{{ item.titlename }}提交的申请</template>
        <template #headerright>立即申请</template>
        <template #bobys>
          <div>申请时间:{{ item.time }}</div>
        </template>
        <template #state>
          <ul class="state">
            <li>
              <img
                src="@/assets/icon_cut/choice_jindu_pick_shenpi@2x.png"
                alt=""
                v-if="item.shenqingstate === 0"
              />

              <img src="@/assets/icon_cut/choice_jindu_no_shenpi@2x.png" alt="" v-else />
            </li>
            <li>
              <span class="state_dashed"></span>
              <img
                src="@/assets/icon_cut/choice_jindu_pick_shenpi@2x.png"
                alt=""
                v-if="item.shenqingstate === 1"
              />
              <img src="@/assets/icon_cut/choice_jindu_no_shenpi@2x.png" alt="" v-else />

              <span class="state_dashed"></span>
            </li>
            <li>
              <img
                src="@/assets/icon_cut/choice_jindu_pick_shenpi@2x.png"
                alt=""
                v-if="item.shenqingstate === 2"
              />
              <img src="@/assets/icon_cut/choice_jindu_no_shenpi@2x.png" alt="" v-else />
            </li>
          </ul>
        </template>
        <template #state_footer>
          <ol class="state_footer">
            <li :class="item.shenqingstate === 0 ? 'active' : 'defaultcolor'">
              {{ item.titlename }}已申请
            </li>
            <li :class="item.shenqingstate === 1 ? 'active' : 'defaultcolor'">项目经理审批</li>
            <li :class="item.shenqingstate === 2 ? 'active' : 'defaultcolor'">主管审批</li>
          </ol>
        </template>
      </Coms>
      <div class="fixBtnStyle">
        <button class="btnStyke" @click="showTanchu">一键审批</button>
      </div>
    </div>
    <Tabber :indexData="indexData"> </Tabber>
    <div class="zhezhaoceng" v-show="showDialog" @click="backHistory"></div>
    <Dialog v-show="showDialog" :dialogDatas="dialogDatas" @tabDialog="cancelDialog">
      <template #dialogTop>确定全部申请通过</template>
    </Dialog>
  </div>
</template>

<script>
import Coms from '@/components/Coms.vue';
import Tabber from '@/components/Tabber.vue';
import Dialog from '@/components/Dialog.vue';

// import { ApiUrl } from '@/api/index';
export default {
  name: 'shenpi',
  components: {
    Coms,
    Tabber,
    Dialog,
  },
  data() {
    return {
      indexData: 2,
      showDialog: false,
      // 这里的clickname可以传值，曹某人留着以后用
      dialogDatas: [
        {
          contain: '取消',
          type: '#868686',
          clickname: '',
        },
        {
          contain: '确定',
          type: '#2F80ED',
        },
      ],
      showMain: false,
    };
  },
  created() {
    this.requestData();
  },
  // 不用这个第一次拿不到Vuex的值
  computed: {
    listData() {
      return this.$store.state.listData;
    },
  },
  methods: {
    toHistory() {
      this.$router.push({
        path: '/historys',
        query: {
          name: this.$route.query.detailsName,
        },
      });
    },
    requestData() {
      this.$store.commit('shenpiData');
    },
    cancelDialog(parms) {
      switch (parms) {
        case '取消':
          this.canShowDialog();
          break;
        case '确定':
          this.confirmDialog();
          break;

        default:
          break;
      }
    },
    // 取消显示
    canShowDialog() {
      this.showDialog = false;
    },
    // 点击确定
    confirmDialog() {
      this.showDialog = false;
      this.$router.push({
        path: '/getSubmissionInfo',
        query: {
          title: '审核',
          text: '太好了，今天没有要审批的任务哦~',
        },
      });
    },
    // 跳转详情
    toDetails(str) {
      console.log(1);
      this.$router.push({
        path: '/shenpiDetail',
        query: {
          detailsName: str,
        },
      });
    },
    // 点击一键审批
    showTanchu() {
      this.showDialog = true;
    },
    // 点击遮罩层
    backHistory() {
      this.showDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.mainStyle {
  height: calc(100% - 256px);
  display: flex;
  flex-direction: column;

  .zhezhaoceng {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }
  .coinmainStyle {
    overflow-y: scroll;
    .fixBtnStyle {
      width: 100%;
      height: 173px;
      line-height: 173px;
      position: fixed;
      bottom: 10%;
      left: 0;
      text-align: center;
      .btnStyke {
        min-width: 325px;
        height: 51px;
        background-color: #2f80ed;
        line-height: 51px;
        text-align: center;

        font-size: 18px;
        color: #fff;
        border-radius: 10px;
      }
    }
    .state {
      display: flex;
      // justify-content: center;
      text-align: center;
      padding: 0px 20px;
      margin-bottom: 7px;
      img {
        width: 18px;
        height: 18px;
      }
      & li:nth-child(2) {
        flex: 1;
      }
      .state_dashed {
        vertical-align: middle;
        width: calc(50% - 16px);
        border-bottom: 1px dashed #97bff6;
        display: inline-block;
      }
      .state_text {
        text-align: left;
      }
    }
    .state_footer {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
    }
    .active {
      color: #3282ed;
    }
    .defaultcolor {
      color: #828282;
    }
  }
}
</style>
