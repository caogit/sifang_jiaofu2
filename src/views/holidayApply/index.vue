<template>
  <div class="holidayStyle">
    <Navber>
      <template #headerNav>休假申请</template>
    </Navber>
    <div class="coverBox">
      <ArroutLayout @click.native="showPopup('休假类型', 0)">
        <template #leftText>休假类型</template>
        <template #rightText> {{ leaveType }}</template>
      </ArroutLayout>
    </div>
    <div class="coverBox">
      <ArroutLayout @click.native="showPopup('休假开始日期', 1)">
        <template #leftText>休假开始日期</template>
        <template #rightText>{{ util.selectDataY(HolidayStartDateData) }}</template>
      </ArroutLayout>
      <ArroutLayout @click.native="showPopup('休假结束日期', 2)">
        <template #leftText>休假结束日期</template>
        <template #rightText>{{ util.selectDataY(HolidayEndDateData) }}</template>
      </ArroutLayout>
    </div>
    <div class="coverBox">
      <ArroutLayout :showRightImg="false">
        <template #leftText>休假原因</template>
      </ArroutLayout>
      <div class="textareaStyle">
        <textarea class="textareaInputStyle" placeholder="请输入休假原因"></textarea>
      </div>
    </div>
    <div class="coverBox">
      <ArroutLayout :showRightImg="false">
        <template #leftText>工作交接:</template>
        <template #freeRight>
          <input />
        </template>
      </ArroutLayout>
    </div>
    <div class="coverBox">
      <ArroutLayout @click.native="showPopup('审批人', 3)">
        <template #leftText>审批人</template>
        <template #freeRight>{{ taskPeople }} </template>
      </ArroutLayout>
    </div>
    <van-popup class="pickerStyle" v-model="show" position="bottom" :style="{ height: '30%' }">
      <van-picker
        v-show="showIndex == 0"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
        @change="onChange"
      />
      <!-- 休假开始日期 -->
      <van-datetime-picker
        v-show="showIndex == 1"
        v-model="HolidayStartDateData"
        @confirm="onConfirm"
        type="date"
      />
      <!-- 休假结束日期 -->
      <van-datetime-picker
        v-show="showIndex == 2"
        v-model="HolidayEndDateData"
        @confirm="onConfirm"
        type="date"
      />
      <!-- 审批人 -->
      <van-picker
        v-show="showIndex == 3"
        show-toolbar
        :columns="taskPeopleColumns"
        @confirm="onConfirm"
        @cancel="onCancel"
        @change="onChange"
      />
    </van-popup>
  </div>
</template>

<script>
import { Toast } from 'vant';
import ArroutLayout from '../../components/ArroutLayout.vue';
export default {
  components: {
    ArroutLayout,
  },
  data() {
    return {
      leaveType: '年假',
      columns: ['年假', '事假', '婚假', '产假', '陪产假', '病假', '丧假'],
      show: false,
      showHolidayStartDate: false,
      HolidayStartDateData: new Date(),
      HolidayEndDateData: new Date(),
      showIndex: 0,
      // 审批人
      taskPeople: '请选择',
      taskPeopleColumns: ['曹奥', '小时'],
    };
  },

  methods: {
    showPopup(sts, index) {
      this.showIndex = index;
      this.show = true;
    },
    onConfirm(value) {
      console.log(value);
      switch (this.showIndex) {
        case 0:
          this.leaveType = value;
          break;
        case 1:
          this.HolidayStartDateData = value;
          break;
        case 2:
          this.HolidayEndDateData = value;
          break;
        case 3:
          this.taskPeople = value;
          break;
        default:
          break;
      }
      this.show = false;
    },

    onChange(picker, value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
    },
    onCancel() {
      // Toast('取消');
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.holidayStyle {
  .coverBox {
    margin-top: 16px;
    background-color: #fff;
    .textareaStyle {
      height: 140px;
      .textareaInputStyle {
        color: #bdbdbd;
        font-size: 13px;
        width: 90%;
        height: 121px;
        border: 1px solid #e0e0e0;
        &::placeholder {
          color: #bdbdbd;
          padding-left: 16px;
        }
      }
    }
  }
  .pickerStyle {
    width: 100%;
    height: 100%;
    border-radius: 13px 13px 0 0;
  }
}
</style>
