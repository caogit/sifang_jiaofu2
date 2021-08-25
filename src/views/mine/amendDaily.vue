<template>
  <div class="amendDailyStyle">
    <Navber>
      <template #headerNav>修改日报</template>
    </Navber>
    <!-- main -->
    <div class="coverBox">
      <ArroutLayout :showRightImg="false">
        <template #leftText>填报日期</template>
        <template #rightText>{{ detailSendData.fillDate }}</template>
      </ArroutLayout>
    </div>
    <div v-if="this.detailSendData.sendList.length > 0">
      <div
        class="coverBox"
        v-for="(items, indexs) in detailSendData.sendList"
        :key="indexs"
        @touchstart="touchstartTop(indexs)"
        @touchend="touchendTop()"
      >
        <ArroutLayout :showRightImg="false">
          <template #leftText>任务</template>
          <template #rightText>{{ items.taskName }}</template>
        </ArroutLayout>
        <!-- 报错 -->

        <ArroutLayout @click.native="showPopups(indexs)" :isTopArrow="isTopArrow === indexs">
          <template #leftText>工时</template>
          <template #rightText>{{ ageManHourObj[indexs] }}</template>
        </ArroutLayout>
        <ArroutLayout :showRightImg="false">
          <template #leftText>今日工作</template>
        </ArroutLayout>
        <div class="showInputStyle">
          <textarea class="showInputInStyle" v-model="advTodayObj[indexs]" />
        </div>
      </div>
    </div>
    <div
      class="coverBox"
      v-for="(i, sub) in addIndex"
      :key="sub"
      @touchstart="touchstart()"
      @touchend="touchend($event)"
    >
      <div>
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
        <ArroutLayout @click.native="showPopup(sub)" :isTopArrow="isTopArrow === sub">
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
    </div>
    <!-- 添加图片 -->
    <div id="addStyle" @click="addNewTemplate">
      <img src="@/assets/icon_cut/icon_add@3x.png" alt="" />
    </div>
    <!-- 弹层 -->
    <van-popup class="pickerStyle" v-model="show" position="bottom" :style="{ height: '30%' }">
      <van-picker @cancel="onCancel" show-toolbar :columns="columns" @confirm="onConfirm" />
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
      // 默认任务
      taskFirst: '',
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
      addIndex: 0,
      // 任务obj
      obj: {},
      // 任务idObj
      taskIdObj: {},
      // 工时obj
      manHourObj: {},
      // 原本工时obj
      ageManHourObj: {},
      // 今日工作
      todayObj: {},
      // 原本今日工作
      advTodayObj: {},
      // 判断当前index
      addTofIndex: 0,
      columns: ['2小时', '4小时', '6小时', '8小时'],
      // 临时工时index
      linmanHourIndex: '',
      // 原本临时工时index
      advlinmanHourIndex: '',
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
      // 详情传过来的数据
      detailSendData: {},
      detailSendDataIndex: '',
      // 将id存起来，防止都被删除了
      detailSendDataId: '',
      // popup点确定判断是原来的还是新增的index
      isAdvIndex: false,
    };
  },
  created() {
    this.request.post(ApiUrl.HOME.GETLIST_TASKBYUSER).then(res => {
      if (res.code == 200) {
        this.taskDetailList = res.data;
      }
      console.log(res);
    });
    // 默认选中第一个任务
    console.log(this.$route.query);
    // 拿从详情传过来的数据
    this.detailSendData = this.$route.query;
    this.detailSendDataId = this.$route.query.sendList[0].dailyId;
    // 让个数等于他的send的length
    // this.addIndex = this.detailSendData.sendList.length;

    // 赋值给原本的工时和今日工作数据
    this.detailSendData.sendList.forEach((item, index) => {
      this.$set(this.ageManHourObj, index, `${item.workerLength}小时`);
      this.$set(this.advTodayObj, index, item.workerInfo);
    });
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

      console.log('obj', this.obj);
    },
    // 原本渲染里面点击的工时
    showPopups(indexs) {
      this.isAdvIndex = true;

      this.show = true;
      // 判断图片
      this.isTopArrow = indexs;
      this.advlinmanHourIndex = indexs;
    },
    // 添加里面的工时
    showPopup(sub) {
      this.isAdvIndex = false;

      // 临时存放工时index
      this.linmanHourIndex = sub;
      // 判断图片
      this.isTopArrow = sub;

      this.show = true;
      //
    },
    onConfirm(value) {
      if (this.isAdvIndex) {
        // 原本的工时赋值
        this.$set(this.ageManHourObj, `${this.advlinmanHourIndex}`, value);
      } else {
        // 工时赋值
        this.$set(this.manHourObj, `${this.linmanHourIndex}`, value);
      }

      this.show = false;
    },
    onCancel() {
      this.show = false;
      this.isTopArrow = '';
    },
    // request
    submitDaily() {
      console.log(this.fillData.getMonth());
      let brr = [];
      let sts = this.detailSendData.sendList;
      if (sts.length > 0) {
        for (let i = 0; i <= sts.length - 1; i++) {
          brr.push({
            taskId: sts[i].taskId,
            taskName: sts[i].taskName,
            workerLength: Number(this.ageManHourObj[i].substr(0, 1)),
            workerInfo: this.advTodayObj[i],
          });
        }
      }
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
        createDate: this.detailSendData.fillDate, //工作日期
        dailyDetailList: brr.concat(arr),
        id: this.detailSendDataId,
      };
      console.log(parms);
      this.request.put(ApiUrl.MINE.WORK_DAILT_UPD, parms).then(res => {
        if (res.code == 200) {
          this.$toast('日报修改成功');
          // this.$router.push({
          //   path: '/getSubmissionInfo',
          //   query: {
          //     title: '日报提交结果',
          //     text: '日报提交成功',
          //   },
          // });
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
    // 点击遮罩层
    backHistory() {
      this.showDialog = false;
    },
    // 取消显示
    canShowDialog() {
      this.showDialog = false;
    },
    // 点击确定
    confirmDialog() {
      this.showDialog = false;
      // 删除  this.detailSendData中对应下边的数据\
      this.$delete(this.detailSendData.sendList, this.detailSendDataIndex);

      // this.addIndex -= 1;
    },
    touchstartTop(sub) {
      clearInterval(this.Loop);
      this.Loop = setTimeout(() => {
        this.showDialog = true;
        // 存放一个index  用于delete this.detailSendData对于下标的数据
        this.detailSendDataIndex = sub;
      }, 1000);
    },
    touchendTop() {
      // 会出现右键菜单，需要取消一下默认event
      // e.preventDefault();
      clearInterval(this.Loop);
    },
  },
};
</script>

<style lang="scss" scoped>
.amendDailyStyle {
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
