<template>
  <div class="holidayStyle">
    <Navber>
      <template #headerNav>休假申请</template>
    </Navber>
    <div class="coverBox">
      <ArroutLayout @click.native="showPopup(0)">
        <template #leftText>休假类型</template>
        <template #rightText> {{ leaveType }}</template>
      </ArroutLayout>
    </div>
    <div class="coverBox">
      <ArroutLayout @click.native="showPopup(1)">
        <template #leftText>休假开始日期</template>
        <template #rightText>{{ util.selectDataY(HolidayStartDateData) }}</template>
      </ArroutLayout>
      <ArroutLayout @click.native="showPopup(2)">
        <template #leftText>休假结束日期</template>
        <template #rightText>{{ util.selectDataY(HolidayEndDateData) }}</template>
      </ArroutLayout>
    </div>
    <div class="coverBox" v-show="showTime">
      <ArroutLayout @click.native="showPopup(3)">
        <template #leftText>休假起始时间</template>
        <template #rightText>{{ HolidayStartDateTime }}</template>
      </ArroutLayout>
      <ArroutLayout @click.native="showPopup(4)">
        <template #leftText>休假结束时间</template>
        <template #rightText>{{ HolidayEndDateTime }}</template>
      </ArroutLayout>
    </div>
    <div class="coverBox">
      <ArroutLayout :showRightImg="false">
        <template #leftText>休假原因</template>
      </ArroutLayout>
      <div class="textareaStyle">
        <textarea
          class="textareaInputStyle"
          placeholder="请输入休假原因"
          v-model="reasonContent"
        ></textarea>
      </div>
    </div>
    <div class="coverBox">
      <ArroutLayout :showRightImg="false">
        <template #leftText>工作交接:</template>
        <template #freeRight>
          <input v-model="setUnitOfWork" />
        </template>
      </ArroutLayout>
    </div>
    <div class="coverBox">
      <ArroutLayout @click.native="showPopup(5)">
        <template #leftText>审批人</template>
        <template #rightText>{{ taskPeople }}</template>
      </ArroutLayout>
    </div>
    <van-popup class="pickerStyle" v-model="show" position="bottom" :style="{ height: '30%' }">
      <van-picker
        v-show="showIndex == 0"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
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
      <!-- 休假起始时间 -->
      <van-datetime-picker
        v-show="showIndex == 3"
        v-model="HolidayStartDateTime"
        @confirm="onConfirm"
        type="time"
        title="选择时间"
      />
      <!-- 休假结束时间 -->
      <van-datetime-picker
        v-show="showIndex == 4"
        v-model="HolidayEndDateTime"
        @confirm="onConfirm"
        type="time"
        title="选择时间"
      />
      <!-- 审批人 -->
      <van-picker
        v-show="showIndex == 5"
        show-toolbar
        :columns="taskPeopleColumns"
        @confirm="onConfirm"
        @cancel="onCancel"
      >
        <template #option="item">
          <van-row>
            <!-- <van-col :span="12" class="van-hairline--right">
              <p style="text-align: center">
                {{ item.id }}
              </p>
            </van-col> -->
            <van-col :span="24" class="van-hairline--left">
              <p style="text-align: center">
                {{ item.realName }}
              </p>
            </van-col>
          </van-row>
        </template>
      </van-picker>
    </van-popup>
    <!-- 按钮 -->
    <div class="SubmitdailyStyle">
      <div class="SubmitdailyVisStyle">
        <Btns :type="1" @click.native="submitApply">
          <template #btnName> 提交申请 </template>
        </Btns>
      </div>
    </div>
  </div>
</template>

<script>
import ArroutLayout from '../../components/ArroutLayout.vue';
import Btns from '@/components/Btns.vue';
import { ApiUrl } from '@/api/index';

export default {
  components: {
    ArroutLayout,
    Btns,
  },
  data() {
    return {
      leaveType: '年假',
      columns: ['年假', '事假', '婚假', '产假', '陪产假', '病假', '丧假'],
      show: false,
      showHolidayStartDate: false,
      HolidayStartDateData: new Date(),
      HolidayEndDateData: new Date(),
      HolidayStartDateTime: '请选择',
      HolidayEndDateTime: '请选择',
      showIndex: 0,
      // 工作交接
      setUnitOfWork: '',
      //休假原因
      reasonContent: '',
      // 审批人
      taskPeople: '请选择',
      taskPeopleColumns: ['曹奥', '小时'],
      showTime: true,
    };
  },
  watch: {
    addRess: {
      handler: function (val) {
        console.log('🚀 ~ file: index.vue ~ line 153 ~ val', val);
        this.util.formatData(val.HolidayEndDateData) ===
        this.util.formatData(val.HolidayStartDateData)
          ? (this.showTime = true)
          : (this.showTime = false);
        // console.log(this.showTime);
        // console.log(val, oldVal);
      },
      deep: true,
    },
  },
  computed: {
    addRess() {
      const { HolidayStartDateData, HolidayEndDateData } = this;
      return {
        HolidayStartDateData,
        HolidayEndDateData,
      };
    },
  },
  created() {
    this.getManagerList();
  },
  methods: {
    getManagerList() {
      this.request.post(ApiUrl.HOME.GETMANGET_LIST).then(res => {
        if (res.code == 200) {
          this.taskPeopleColumns = res.data;
        }
        console.log('🚀 ~ file: index.vue ~ line 179 ~ this.request.post ~ res', res);
      });
    },
    submitApply() {
      let {
        leaveType,
        HolidayStartDateData,
        HolidayEndDateData,
        HolidayStartDateTime,
        HolidayEndDateTime,
        taskPeople,
        reasonContent,
        setUnitOfWork,
      } = this;
      console.log(taskPeople);
      let parms = {
        vacationStartTime: HolidayStartDateTime,
        vacationEndTime: HolidayEndDateTime,
        vacationStartDate: HolidayStartDateData,
        vacationEndDate: HolidayEndDateData,
        vacationType: leaveType,
        checkManager: taskPeople,
        vacationReason: reasonContent,
        workHandover: setUnitOfWork,
      };
      this.request.post(ApiUrl.HOME.WORK_VACATION_SAVE, parms);
    },
    showPopup(index) {
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
          this.HolidayStartDateTime = value;
          break;
        case 4:
          this.HolidayEndDateTime = value;
          break;
        case 5:
          this.taskPeople = value.realName;
          break;
        default:
          break;
      }
      this.show = false;
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
      text-align: center;
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
    overflow-y: visible;
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
