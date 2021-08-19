<template>
  <div class="boxStyle">
    <Navber>
      <template #headerNav>写日报</template>
    </Navber>
    <!-- 添加图片 -->

    <div class="coverBox">
      <ArroutLayout @click.native="showPopup(0)">
        <template #leftText>填报日期</template>
        <template #rightText>{{ util.selectData(fillData) }}</template>
      </ArroutLayout>
    </div>
    <div class="coverBox" v-for="(i, sub) in addIndex" :key="sub">
      <van-collapse v-model="activeNames" accordion>
        <van-collapse-item title="任务" :name="sub" :value="obj[`fn${sub}`]">
          <ul
            class="showItemDataStyle"
            v-for="(item, index) in taskDetailList"
            :key="index"
            @click="showDiffImage(item.taskId, item.taskName, index, sub)"
          >
            <li class="showDataStyle_left">{{ item.taskName }}</li>
            <li>
              <img
                :src="
                  taskDetailIndex[sub] == index
                    ? require('@/assets/icon_cut/choice_pick@3x.png')
                    : require('@/assets/icon_cut/choice@3x.png')
                "
              />
            </li>
          </ul>
        </van-collapse-item>
      </van-collapse>
      <ArroutLayout @click.native="showPopup(1, sub)">
        <template #leftText>工时</template>
        <template #rightText>{{ manHourObj[`fn${sub}`] }}</template>
      </ArroutLayout>
      <ArroutLayout :showRightImg="false">
        <template #leftText>今日工作</template>
      </ArroutLayout>
      <div class="showInputStyle">
        <textarea class="showInputInStyle" v-model="todayObj[`fn${sub}`]" />
      </div>
    </div>
    <div id="addStyle" @click="addNewTemplate">
      <img src="../../assets/icon_cut/icon_add@3x.png" alt="" />
    </div>
    <van-popup class="pickerStyle" v-model="show" position="bottom" :style="{ height: '30%' }">
      <!--  -->
      <van-datetime-picker
        v-show="addTofIndex == 0"
        v-model="fillData"
        type="month-day"
        title="选择月日"
        @confirm="onConfirm"
      />
      <van-picker v-show="addTofIndex == 1" show-toolbar :columns="columns" @confirm="onConfirm" />
    </van-popup>
    <div class="SubmitdailyStyle">
      <Btns :type="1" @click.native="submitDaily">
        <template #btnName> 提交日报 </template>
      </Btns>
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
      show: false,
      // 填报日期
      fillData: new Date(),
      // 任务
      taskData: '',
      // 工时
      manHour: '',
      activeNames: '',
      // 任务详情列表
      taskDetailList: [],
      // 任务详情index
      taskDetailIndex: {},
      // 添加index
      addIndex: 1,
      // 任务obj
      obj: {},
      // 任务idObj
      taskIdObj: {},
      // 工时obj
      manHourObj: {},
      // 今日工作
      todayObj: {},
      // 判断当前index
      addTofIndex: 0,
      columns: ['2小时', '4小时', '6小时', '8小时'],
      // 临时工时index
      linmanHourIndex: 0,
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
  computed: {
    objData() {
      let obj = { ...this.$store.state.LoginManData };
      return obj;
    },
  },
  methods: {
    showDiffImage(id, value, index, sub) {
      // 任务赋值
      this.$set(this.obj, `fn${sub}`, value);
      // 任务id赋值
      this.$set(this.taskIdObj, `fn${sub}`, id);
      // 详情图片
      this.taskDetailIndex[sub] = index;
      // 手风琴
      this.activeNames = sub;
    },
    // 添加+
    addNewTemplate() {
      this.addIndex += 1;
      // 任务值obj
      this.$set(this.obj, `fn${this.addIndex - 1}`, '');
      // 任务id的obj
      this.$set(this.taskIdObj, `fn${this.addIndex - 1}`, '');

      // 工时obj
      this.$set(this.manHourObj, `fn${this.addIndex - 1}`, '');
      // 今日工作obj
      this.$set(this.todayObj, `fn${this.addIndex - 1}`, '');
      console.log(this.obj);
    },
    showPopup(index, sub) {
      // 临时存放工时index
      this.linmanHourIndex = sub;
      // 展示什么picker
      this.addTofIndex = index;
      this.show = true;
    },
    onConfirm(value) {
      // 工时赋值
      this.$set(this.manHourObj, `fn${this.linmanHourIndex}`, value);
      // 今日工作赋值
      this.show = false;
    },
    submitDaily() {
      // eslint-disable-next-line no-debugger
      // debugger;
      // console.log(this.addTofIndex, this.manHourObj);

      console.log(this.fillData.getMonth());
      let arr = [];
      // for下addIndex
      for (let i = 0; i <= this.addIndex - 1; i++) {
        console.log(this.taskIdObj, this.obj);
        if (this.taskIdObj[`fn${i}`] == undefined || this.taskIdObj[`fn${i}`] == '') {
          this.$toast('请选择任务');
          return;
        }
        if (this.manHourObj[`fn${i}`] == undefined || this.manHourObj[`fn${i}`] == 0) {
          this.$toast('请选择工时');
          return;
        }
        if (this.todayObj[`fn${i}`] == undefined || this.todayObj[`fn${i}`] == '') {
          this.$toast('请输入今日工作');
          return;
        }
        arr.push({
          taskId: this.taskIdObj[`fn${i}`], //任务id
          taskName: this.obj[`fn${i}`], //任务名称
          workerLength: Number(this.manHourObj[`fn${i}`].substr(0, 1)), //工时
          workerInfo: this.todayObj[`fn${i}`], //工作内容
        });
      }

      let parms = {
        workDate: this.util.formatData(this.fillData), //工作日期
        createPerson: this.objData.realName, //用户名，从本地缓存中获取
        createTime: this.util.formatData(new Date()), //创建日期 当天时间
        dailyDetailList: arr,
      };
      this.request.post(ApiUrl.HOME.SAVE, parms).then(res => {
        if (res.code == 200) {
          this.$router.push({
            path: '/getSubmissionInfo',
            query: {
              title: '日报提交结果',
              text: '日报提交成功',
            },
          });
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
    ::v-deep .van-cell__value {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
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
    .showInputStyle {
      width: 100%;
      height: 113px;
      background-color: #fff;
      display: flex;
      justify-content: center;
      .showInputInStyle {
        display: block;
        width: 90%;
        height: 96px;
        background-color: #f9fafc;
        font-size: 14px;
        color: #828282;
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
  .SubmitdailyStyle {
    width: 100%;
    height: 83px;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    line-height: 83px;
    text-align: center;
  }
}
</style>
