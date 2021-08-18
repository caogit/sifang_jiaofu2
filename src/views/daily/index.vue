<template>
  <div class="boxStyle">
    <Navber>
      <template #headerNav>写日报</template>
    </Navber>
    <!-- 添加图片 -->

    <div class="coverBox">
      <ArroutLayout @click="showPopup('')">
        <template #leftText>填报日期</template>
        <template #rightText>{{ fillData }}</template>
      </ArroutLayout>
    </div>
    <div class="coverBox" v-for="(i, sub) in addIndex" :key="sub">
      <van-collapse v-model="activeNames" accordion>
        <van-collapse-item title="任务" :name="sub" :value="obj[`fn${sub}`]">
          <ul
            class="showItemDataStyle"
            v-for="(item, index) in taskDetailList"
            :key="index"
            @click="showDiffImage(item.taskName, index, sub)"
          >
            <li class="showDataStyle_left">{{ item.taskName }}</li>
            <li>
              <img
                :src="
                  taskDetailIndex === index
                    ? require('@/assets/icon_cut/choice_pick@3x.png')
                    : require('@/assets/icon_cut/choice@3x.png')
                "
              />
            </li>
          </ul>
        </van-collapse-item>
      </van-collapse>
      <ArroutLayout>
        <template #leftText>工时</template>
        <template #rightText>{{ manHour }}</template>
      </ArroutLayout>
      <ArroutLayout :showRightImg="false">
        <template #leftText>今日工作</template>
      </ArroutLayout>
    </div>
    <div id="addStyle" @click="addNewTemplate">
      <img src="../../assets/icon_cut/icon_add@3x.png" alt="" />
    </div>
    <van-popup class="pickerStyle" v-model="show" position="bottom" :style="{ height: '30%' }">
      <!--  -->
      <van-datetime-picker v-model="fillData" type="month-day" title="选择月日" />
    </van-popup>
  </div>
</template>
<script>
import ArroutLayout from '@/components/ArroutLayout.vue';
import { ApiUrl } from '@/api/index';

export default {
  components: {
    ArroutLayout,
  },
  data() {
    return {
      show: false,
      // 填报日期
      fillData: this.util.selectData(new Date()),
      // 任务
      taskData: '',
      // 工时
      manHour: '',
      activeNames: '',
      // 任务详情列表
      taskDetailList: [],
      // 任务详情index
      taskDetailIndex: 0,
      // 添加index
      addIndex: 1,
      // 任务obj
      obj: {},
    };
  },
  created() {
    this.request.post(ApiUrl.HOME.GETLIST_TASKBYUSER).then(res => {
      if (res.code == 200) {
        this.taskDetailList = res.data;
      }
      console.log(res);
    });
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    showDiffImage(value, index, sub) {
      // 赋值
      this.$set(this.obj, `fn${sub}`, value);
      // 详情图片
      this.taskDetailIndex = index;
      // 手风琴
      this.activeNames = sub;
    },
    addNewTemplate() {
      this.addIndex += 1;
      this.$set(this.obj, `fn${this.addIndex - 1}`, '');
      console.log(this.obj);
    },
  },
};
</script>

<style lang="scss" scoped>
.boxStyle {
  .coverBox {
    margin-top: 16px;
    background-color: #fff;
    .showItemDataStyle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      @include dailt_828282;
      .showDataStyle_left {
        width: 262px;
      }
    }
  }
  #addStyle {
    width: 100%;
    height: 150px;

    img {
      width: 78px;
      height: 78px;
      float: right;
    }
  }
}
</style>
