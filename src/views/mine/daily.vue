<template>
  <div class="boxDailyStyle" :id="isChoose ? 'chengeHeight' : ''">
    <Navber>
      <template #headerNav>日报</template>
      <template #rightIconNav>
        <img src="../../assets/icon_cut/icon_delete@3x.png" alt="" @click="showChange" />
        <img src="../../assets/icon_cut/icon_screen@3x.png" alt="" @click="showTanchu" />
      </template>
    </Navber>
    <div class="bigListStyle">
      <div
        class="itemListStyle"
        v-for="(item, index) in listData"
        :key="index"
        @click="checkedPick(item, index)"
      >
        <div class="itemIconStyle" v-show="isChoose">
          <img :src="chooseObj[index] ? imgObj.img2 : imgObj.img1" />
          <!-- <img src="" alt="" /> -->
        </div>
        <Coms class="itemMainStyle">
          <template #headerLeft> 填报日期:{{ item.workDate }} </template>
          <template #headerright>
            {{ item.status }}
          </template>
          <template #bobys>
            <ul class="itemStyle">
              <li class="bottomColor">任务:{{ item.taskName }}</li>
            </ul>
            <ul class="itemStyle">
              <li class="bottomColor">今日工作:{{ item.workerInfo }}</li>
            </ul>
          </template>
        </Coms>
      </div>
    </div>
    <!-- 全选 -->
    <div class="footerStyle" v-if="isChoose">
      <div class="footerFixStyle">
        <div>
          <img :src="allCheckData ? imgObj.img2 : imgObj.img1" alt="" />
          <span :style="{ color: '#4D4D4D', fontSize: '16px' }" @click="SelectPoints">全选</span>
        </div>
        <div>
          <Btns :type="3" @click.native="deleteDaily">
            <template #smallStyle3> 删除 </template>
          </Btns>
        </div>
      </div>
    </div>
    <transition name="slide-fade">
      <Tanchu
        :startTime="this.util.selectDataY(startTime)"
        :endTime="this.util.selectDataY(endTime)"
        v-show="showThis"
        @ClickTime="ClickTime"
        @confirmBtns="confirmBtns"
      ></Tanchu>
    </transition>
    <MaskLayer :showDialog="showThis" @click.native="showMaskLayer"></MaskLayer>
    <!-- popup -->
    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
      <!-- 开始时间 -->
      <van-datetime-picker
        v-show="showTime == 0"
        v-model="startTime"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @change="onChange"
        @confirm="onConfirm"
        @cancel="onCancel"
        ref="gets"
      />
      <!-- 结束时间 -->
      <van-datetime-picker
        @cancel="onCancel"
        @confirm="onConfirm"
        v-show="showTime == 1"
        v-model="endTime"
        @change="onChange"
        :min-date="minDate"
        :max-date="maxDate"
        type="date"
        title="选择年月日f"
      />
    </van-popup>
  </div>
</template>

<script>
import Tanchu from './Tanchu.vue';
import MaskLayer from '@/components/MaskLayer.vue';
import { ApiUrl } from '@/api/index';
import Coms from '@/components/Coms';
import Btns from '@/components/Btns.vue';

export default {
  data() {
    return {
      // 弹出和遮罩层
      showThis: false,
      showStartTime: false,
      showEndTime: false,
      // isPopup
      show: false,
      minDate: new Date(2021, 7, 20),
      maxDate: new Date(2025, 10, 1),
      listData: [],
      // 展示choose
      isChoose: false,
      // index
      ttemporaryIndex: '',
      imgObj: {
        img1: require('../../assets/icon_cut/choice_jindu_no_shenpi@3x.png'),
        img2: require('../../assets/icon_cut/choice_jindu_pick_shenpi@3x.png'),
      },
      // 存放选中Obj
      chooseObj: {},
      startTime: '请选择',
      endTime: '请选择',
      showTime: 0,
    };
  },
  computed: {
    allCheckData() {
      let str = Object.values(this.chooseObj).every(item => {
        return !!item;
      });
      return str;
    },
  },
  components: {
    Tanchu,
    MaskLayer,
    Coms,
    Btns,
  },
  created() {
    this.requestData();
  },

  methods: {
    requestData() {
      let parms = {
        endDate: '',
        pageNum: 1,
        pageSize: 10,
        startDate: '',
      };
      this.request.post(ApiUrl.MINE.GETLIST_BYPAGE, parms).then(res => {
        if (res.code == 200) {
          this.listData = res.data.records;
          // 循环往里面加每个值
          for (let i = 0; i < this.listData.length; i++) {
            this.$set(this.chooseObj, i, false);
          }
        }
      });
    },
    checkedPick(item, index) {
      // this.chooseObj[index] = true;

      if (this.isChoose) {
        this.chooseObj[index] == false
          ? this.$set(this.chooseObj, index, item.id)
          : this.$set(this.chooseObj, index, false);
      } else {
        this.$router.push({
          path: '/mineDailyDetail',
          query: {
            id: item.id,
            date: item.workDate,
          },
        });
      }
    },
    showChange() {
      this.isChoose = !this.isChoose;
    },
    showTanchu() {
      this.showThis = true;
    },
    showMaskLayer() {
      this.showThis = false;
    },
    SelectPoints() {
      console.log(Object.values(this.chooseObj));
      if (Object.values(this.chooseObj).includes(false)) {
        for (let i = 0; i < this.listData.length; i++) {
          this.$set(this.chooseObj, i, this.listData[i].id);
        }
      } else {
        for (let i = 0; i < this.listData.length; i++) {
          this.$set(this.chooseObj, i, false);
        }
        console.log(this.chooseObj);
      }
    },
    // 删除日报
    deleteDaily() {
      console.log(this.chooseObj);
      let obj = {
        ids: [],
      };

      Object.values(this.chooseObj).filter(item => {
        if (item != false) {
          obj.ids.push(item);
        }
      });
      console.log(obj.ids);
      this.request
        .deletes(ApiUrl.MINE.WORK_DAILT_DEL, obj)
        .then(res => {
          this.$router.go(0);
          console.log(res);
        })
        .finally(() => {
          this.isChoose = false;
        });
    },
    // 点击时间
    ClickTime(val) {
      this.show = true;
      this.showTime = val;
    },
    //
    onCancel() {
      this.show = false;
    },
    onChange() {},
    onConfirm(val) {
      switch (this.showStartTime) {
        case 0:
          this.startTime = val;
          break;
        case 1:
          this.endTime = val;
          break;
        default:
          break;
      }
      this.show = false;
    },
    // 点击确定
    confirmBtns(sts) {
      console.log(sts);
      let reg = /(.*)年(.*)月(.*)日(.*)/g;
      sts[1] = sts[1].replace(reg, '$1-$2-$3');
      sts[0] = sts[0].replace(reg, '$1-$2-$3');
      let parms = {
        endDate: sts[1],
        pageNum: 1,
        pageSize: 10,
        startDate: sts[0],
      };
      console.log(parms.endDate);
      this.request.post(ApiUrl.MINE.GETLIST_BYPAGE, parms).then(res => {
        if (res.code == 200) {
          this.listData = res.data.records;
          // 循环往里面加每个值
          for (let i = 0; i < this.listData.length; i++) {
            this.$set(this.chooseObj, i, false);
          }
          this.showThis = false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#chengeHeight {
  height: calc(100% - 44px - 87px) !important;
}
.boxDailyStyle {
  width: 100%;
  height: calc(100% - 44px);
  .bigListStyle {
    height: calc(100%);
    overflow-y: scroll;
    .itemListStyle {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .itemIconStyle {
        img {
          width: 18px;
          height: 18px;
          margin: 0 19px;
        }
      }
      .itemMainStyle {
        width: 303px;

        .itemStyle {
          display: flex;
          justify-content: space-between;
          margin-top: 14px;
          .bottomColor {
            line-height: 20px;
          }
        }
      }
    }
  }

  .footerStyle {
    width: 100%;
    height: 87px;

    .footerFixStyle {
      width: 100%;

      height: 87px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      position: fixed;
      bottom: 0;
      left: 0;
      background-color: #fff;
      img {
        width: 18px;
        height: 18px;
        margin-right: 16px;
      }
      & div:nth-child(1) {
        display: flex;
        align-items: center;
      }
    }
  }

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
