<template>
  <div class="shenpiStyle">
    <Navber>
      <template #headerNav>任务</template>
      <template #rightIconNav>
        <img src="@/assets/icon_cut/icon_history@2x.png" alt="" @click="toHistory" />
        <img src="@/assets/icon_cut/icon_screen@2x.png" alt="" />
      </template>
    </Navber>
    <Coms v-for="(item, index) in listData" :key="index" :typeState="item.shenqingstate">
      <template #headerLeft>{{ item.titleLeftname }}</template>
      <template #headerright>{{ decideshouText(item.shenqingstate) }}</template>
      <template #bobys>
        <ul class="itemStyle">
          <li class="bottomColor">任务下达:{{ item.time }}</li>
          <li class="bottomColor">功能测试版本:{{ item.time }}</li>
        </ul>
        <ul class="itemStyle">
          <li class="bottomColor">正式版本:{{ item.time }}</li>
          <li class="bottomColor">投产:{{ item.time }}</li>
        </ul>
        <ul class="itemStyle">
          <li class="bottomColor">批次:{{ item.time }}</li>
        </ul>
      </template>
    </Coms>
  </div>
</template>

<script>
import Coms from '@/components/Coms.vue';
import requestMix from '@/minxi/requestMix';

export default {
  components: {
    Coms,
  },
  mixins: [requestMix()],

  data() {
    return {
      indexData: 1,
    };
  },
  computed: {
    listData() {
      return this.$store.state.listData;
    },
  },
  created() {
    this.requestData();
  },
  methods: {
    requestData() {
      this.$store.commit('shenpiData');
    },
    toHistory() {
      this.$router.push({
        path: '/renwu/history',
      });
    },
  },
  // created() {
  //   console.log(this.$route.query);
  //   this.indexData = Number(this.$route.query.index);
  // },
};
</script>

<style lang="scss" scoped>
.shenpiStyle {
  height: calc(100% - 83px);
  overflow-y: scroll;
  padding-bottom: 10px;
  .itemStyle {
    display: flex;
    justify-content: space-between;
    margin-top: 14px;
  }
}
</style>
