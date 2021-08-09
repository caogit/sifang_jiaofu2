<template>
  <div class="mainStyle">
    <NavBer>
      <template #headerNav>审批</template>
    </NavBer>
    <div class="coinmainStyle">
      <Coms v-for="(item, index) in listData" :key="index" :liststate="item.shenqingstate">
        <template #headerLeft>{{ item.titlename }}提交的申请</template>
        <template #headerright>立即申请</template>
        <template #bobys>
          <div>申请时间:{{ item.time }}</div>
        </template>
      </Coms>
    </div>
    <Tabber :indexData="indexData"> </Tabber>
  </div>
</template>

<script>
import Coms from '@/components/Coms.vue';
import Tabber from '@/components/Tabber.vue';
import NavBer from '@/components/Navber.vue';

import { ApiUrl } from '@/api/index';
export default {
  name: 'shenpi',
  components: {
    Coms,
    Tabber,
    NavBer,
  },
  data() {
    return {
      indexData: 0,
      listData: [],
    };
  },
  created() {
    console.log(this.$route.query);
    this.indexData = Number(this.$route.query.index);

    // 请求
    this.request.post(ApiUrl.shenpiData).then(res => {
      if (res.code == 200) {
        this.listData = res.list;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.mainStyle {
  height: calc(100% - 83px);
  display: flex;
  flex-direction: column;

  .coinmainStyle {
    overflow-y: scroll;
  }
}
</style>
