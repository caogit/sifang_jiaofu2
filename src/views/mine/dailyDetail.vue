<template>
  <div class="boxStyle">
    <Navber>
      <template #headerNav>日报详情</template>
    </Navber>
    <div class="coverBox">
      <ArroutLayout>
        <template #leftText> 填报日期 </template>
        <template #rightText> {{ $route.query.date }} </template>
      </ArroutLayout>
    </div>
    <div class="coverBox" v-for="(item, index) in listData" :key="index">
      <ArroutLayout :showRightImg="false">
        <template #leftText>任务</template>
        <template #rightText>{{ item.taskName }}</template>
      </ArroutLayout>
      <ArroutLayout :showRightImg="false">
        <template #leftText>工时</template>
        <template #rightText>{{ item.workerLength }}小时</template>
      </ArroutLayout>
      <ArroutLayout :showRightImg="false">
        <template #leftText>今日工作</template>
      </ArroutLayout>
      <div class="todayWordStyle">
        <div class="childStyle">{{ item.workerInfo }}</div>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="SubmitdailyStyle">
      <div class="SubmitdailyVisStyle">
        <Btns :type="1" @click.native="submitApply">
          <template #btnName> 修改日报 </template>
        </Btns>
      </div>
    </div>
  </div>
</template>

<script>
import ArroutLayout from '@/components/ArroutLayout.vue';
import { ApiUrl } from '@/api/index';
import Btns from '@/components/Btns.vue';

export default {
  components: {
    ArroutLayout,
    Btns,
  },
  data() {
    return {
      listData: [],
    };
  },
  created() {
    this.queryId();
  },
  methods: {
    queryId() {
      let str = this.$route.query.id;
      this.request.post(`${ApiUrl.MINE.WORK_DAILT_FIND_PARAM}/${str}`).then(res => {
        if (res.code == 200) {
          this.listData = res.data;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.boxStyle {
  .coverBox {
    margin-top: 16px;
    background-color: #fff;
    .todayWordStyle {
      width: 100%;
      background-color: #fff;
      padding-bottom: 10px;
      display: flex;
      justify-content: center;
      .childStyle {
        width: 343px;
        padding: 10px 0px 10px 12px;
        box-sizing: content-box;
        height: 20px;

        background: #f9fafc;
        border-radius: 4px;
        font-size: 14px;
        color: #828282;
      }
    }
  }
  .SubmitdailyStyle {
    width: 100%;
    height: 83px;
    line-height: 83px;
    text-align: center;
    .SubmitdailyVisStyle {
      width: 100%;
      height: 83px;
      background-color: #fff;
      position: fixed;
      bottom: 0;
      left: 0;
    }
  }
}
</style>
