<template>
  <div class="historyStyle">
    <Navber>
      <template #headerNav>历史审批</template>
      <template #rightIconNav>
        <img src="@/assets/icon_cut/icon_history@2x.png" alt="" />
        <img src="@/assets/icon_cut/icon_screen@2x.png" alt="" @click="showTanchu" />
      </template>
    </Navber>
    <Coms v-for="(item, index) in listData" :key="index" :typeState="item.shenqingstate">
      <template #headerLeft> {{ item.titlename }} 提交的申请 </template>
      <template #headerright>{{ decideText(item.shenqingstate) }} </template>
      <template #bobys>
        <div>申请时间:{{ item.time }}</div>
      </template>
    </Coms>
    <transition name="slide-fade">
      <Tanchu v-show="showThis"></Tanchu>
    </transition>
    <div class="zhezhaoceng" v-show="showThis" @click="backHistory"></div>
  </div>
</template>

<script>
import Coms from '@/components/Coms.vue';
import requestMix from '@/minxi/requestMix';
import Tanchu from './Tanchu.vue';
export default {
  name: 'historys',
  components: {
    Coms,
    Tanchu,
  },
  mixins: [requestMix()],

  data() {
    return {
      // 传递的name
      shenpiName: '',
      // 是否显示右侧弹出组件
      showThis: false,
    };
  },
  computed: {
    listData() {
      return this.$store.state.listData;
    },
  },
  mounted() {
    this.shenpiName = this.$route.query.name;
    // 请求数据
    this.requestData();
    // 方法
  },
  methods: {
    requestData() {
      this.$store.dispatch('shenpiData');
    },
    showTanchu() {
      this.showThis = true;
    },
    backHistory() {
      this.showThis = false;
    },
  },
};
</script>

<style lang="scss">
.historyStyle {
  width: 100%;
  height: 100%;
  position: relative;
  .zhezhaoceng {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }
  // 进入的动画
  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.3s ease;
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(335px);
  }
}
</style>
