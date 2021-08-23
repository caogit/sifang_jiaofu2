<template>
  <div class="boxStyle">
    <Navber>
      <template #headerNav>写日报</template>
    </Navber>
    <!-- main -->
    <div class="coverBox">
      <ArroutLayout @click.native="showPopup(0)">
        <template #leftText>填报日期</template>
        <template #rightText>{{ util.selectData(fillData) }}</template>
      </ArroutLayout>
    </div>
    <div
      class="coverBox"
      v-for="(i, sub) in addIndex"
      :key="sub"
      @touchstart="touchstart()"
      @touchend="touchend($event)"
    >
      <van-collapse v-model="activeNames" accordion>
        <van-collapse-item title="任务" :name="sub" :value="obj[`${sub}`]">
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
      <ArroutLayout @click.native="showPopup(1, sub)" :isTopArrow="isTopArrow === sub">
        <template #leftText>工时</template>
        <template #rightText>{{ manHourObj[`${sub}`] }}</template>
      </ArroutLayout>
      <ArroutLayout :showRightImg="false">
        <template #leftText>今日工作</template>
      </ArroutLayout>
      <div class="showInputStyle">
        <textarea class="showInputInStyle" v-model="todayObj[`${sub}`]" />
      </div>
    </div>
    <!-- 添加图片 -->
    <div id="addStyle" @click="addNewTemplate">
      <img src="../../assets/icon_cut/icon_add@3x.png" alt="" />
    </div>
    <!-- 弹层 -->
    <van-popup class="pickerStyle" v-model="show" position="bottom" :style="{ height: '30%' }">
      <!--  -->
      <van-datetime-picker
        v-show="addTofIndex == 0"
        v-model="fillData"
        type="month-day"
        title="选择月日"
        @confirm="onConfirm"
      />
      <van-picker
        v-show="addTofIndex == 1"
        @cancel="onCancel"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
      />
    </van-popup>
    <!-- 按钮 -->
    <div class="SubmitdailyStyle">
      <Btns :type="1" @click.native="submitDaily">
        <template #btnName> 提交日报 </template>
      </Btns>
    </div>
    <!-- 弹窗 -->
    <Dialog
      :dialogDatas="dialogDatas"
      @tabDialog="cancelDialog"
      v-show="showDialog"
      @click="backHistory"
    >
      <template #dialogTop>确定要删除吗</template>
    </Dialog>
    <!-- 遮罩层 -->
    <MaskLayer :showDialog="showDialog"></MaskLayer>
  </div>
</template>
<script>
import ArroutLayout from '@/components/ArroutLayout.vue';
import { ApiUrl } from '@/api/index';
import Btns from '@/components/Btns.vue';
import Dialog from '@/components/Dialog.vue';
import MaskLayer from '@/components/MaskLayer.vue';

export default {
  components: {
    ArroutLayout,
    Btns,
    Dialog,
    MaskLayer,
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
      isTopArrow: '',
      // 弹窗选项
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
      // isShowDialog
      showDialog: false,
    };
  },
  created() {
    this.request.post(ApiUrl.HOME.GETLIST_TASKBYUSER).then(res => {
      if (res.code == 200) {
        this.taskDetailList = res.data;
        this.$set(this.obj, `${0}`, this.taskDetailList[0].taskName);
        this.$set(this.taskIdObj, `${0}`, this.taskDetailList[0].taskId);
      }
      console.log(res);
    });
    // 默认选中第一个任务
  },
  // false时将图片设置初始收起状态
  watch: {
    show: function (newValue) {
      if (newValue == false) {
        this.isTopArrow = '';
      }
    },
  },
  computed: {
    objData() {
      let obj = { ...this.$store.state.LoginManData };
      return obj;
    },
  },
  methods: {
    showDiffImage(id, value, index, sub) {
      // 下面应该可以优化，之后看见再说吧

      // 任务赋值
      this.$set(this.obj, `${sub}`, value);
      // 任务id赋值
      this.$set(this.taskIdObj, `${sub}`, id);
      // 详情图片
      this.taskDetailIndex[sub] = index;
      // 手风琴
      this.activeNames = sub;
    },
    // 添加+
    addNewTemplate() {
      this.addIndex += 1;
      // 以下都可以省略，$set会自动添加值，不只是覆盖
      // 任务值obj
      // this.$set(this.obj, `${this.addIndex - 1}`, '');
      // 任务id的obj
      // this.$set(this.taskIdObj, `${this.addIndex - 1}`, '');
      // 工时obj
      // this.$set(this.manHourObj, `${this.addIndex - 1}`, '');
      // 今日工作obj
      // this.$set(this.todayObj, `${this.addIndex - 1}`, '');
      console.log('obj', this.obj);
    },
    showPopup(index, sub) {
      // 临时存放工时index
      this.linmanHourIndex = sub;
      // 判断图片
      this.isTopArrow = sub;
      // 展示什么picker
      this.addTofIndex = index;
      this.show = true;
      //
    },
    onConfirm(value) {
      // 工时赋值
      this.$set(this.manHourObj, `${this.linmanHourIndex}`, value);

      this.show = false;
    },
    onCancel() {
      this.show = false;
      this.isTopArrow = '';
    },
    // request
    submitDaily() {
      // eslint-disable-next-line no-debugger
      // debugger;
      // console.log(this.addTofIndex, this.manHourObj);

      console.log(this.fillData.getMonth());
      let arr = [];
      // for下addIndex
      for (let i = 0; i <= this.addIndex - 1; i++) {
        console.log(this.taskIdObj, this.obj);
        if (this.taskIdObj[`${i}`] == undefined || this.taskIdObj[`${i}`] == '') {
          this.$toast('请选择任务');
          return;
        }
        if (this.manHourObj[`${i}`] == undefined || this.manHourObj[`${i}`] == 0) {
          this.$toast('请选择工时');
          return;
        }
        if (this.todayObj[`${i}`] == undefined || this.todayObj[`${i}`] == '') {
          this.$toast('请输入今日工作');
          return;
        }
        arr.push({
          taskId: this.taskIdObj[`${i}`], //任务id
          taskName: this.obj[`${i}`], //任务名称
          workerLength: Number(this.manHourObj[`${i}`].substr(0, 1)), //工时
          workerInfo: this.todayObj[`${i}`], //工作内容
        });
      }

      let parms = {
        workDate: this.util.formatData(this.fillData), //工作日期
        createPerson: this.objData.realName, //用户名，从本地缓存中获取
        createTime: this.util.formatData(new Date()), //创建日期 当天时间
        dailyDetailList: arr,
      };
      console.log(parms);
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
    touchstart() {
      clearInterval(this.Loop);
      this.Loop = setTimeout(() => {
        this.showDialog = true;
      }, 1000);
    },
    touchend() {
      // 会出现右键菜单，需要取消一下默认event
      // e.preventDefault();
      clearInterval(this.Loop);
    },

    // 点击遮罩层
    backHistory() {
      this.showDialog = false;
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
      this.addIndex -= 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.boxStyle {
  .coverBox {
    margin-top: 16px;
    background-color: #fff;
    ::v-deep .van-cell__title {
      float: left;
      margin-right: 10px;
      flex: 0;
      display: inline-block;
      // width: 256px;
    }
    ::v-deep .van-cell--clickable {
      display: block;
    }
    ::v-deep .van-cell__right-icon {
      float: right;
      display: inline-block;
    }
    ::v-deep .van-cell__value {
      float: left;
      width: 270px;
      display: inline-block;
      text-align: left;
      & span {
        display: inline-block;
        width: 100%;
      }
    }
    .showItemDataStyle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      @include dailt_828282;
      .showDataStyle_left {
        width: 262px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
  .pickerStyle {
    overflow-y: initial;
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
