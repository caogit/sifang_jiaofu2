<template>
  <div id="aroundStyle">
    <div
      class="aroundForStyle"
      v-for="(item, index) in listData"
      :key="index"
      @click="showOption(item.isBottomPopup, item.isTypeePopup, index)"
    >
      <!-- 通用的左右布局 -->
      <div class="topShowStyle">
        <div class="leftStyle">
          {{ item.leftName }}
        </div>
        <ul class="rightStyle">
          <li class="rightItemStyle" :style="{ color: item.color }">
            {{ item.rightName }}
          </li>
          <li v-show="item.imageUrl">
            <img :src="item.imageUrl" alt="" />
          </li>
        </ul>
      </div>
      <!-- 是否显示可收起展开的内容 -->
      <div class="showDataStyle" v-if="item.taskListData">
        <ul v-for="(items, index) in item.taskListData" :key="index" class="showItemDataStyle">
          <li class="showDataStyle_left">{{ items.leftText }}</li>
          <li>
            <img :src="items.rightImg" alt="" />
          </li>
        </ul>
      </div>
      <!-- 是否显示可输入的input框 -->
      <div class="showInputStyle" v-if="item.inputContainer">
        <textarea class="showInputInStyle" />
      </div>
    </div>
    <!-- Vant选择器 -->
    <van-popup
      v-model="showPicker"
      position="bottom"
      class="pickerStyle"
      :style="{ height: '40%' }"
      get-container="#aroundStyle"
    >
      <van-datetime-picker
        v-show="booleanFn.timeChoosePopup"
        v-model="currentDate"
        type="month-day"
        title="选择月日"
        @confirm="ondatetimeConfirm"
        :min-date="listData[indexs].minDate"
        :max-date="listData[indexs].maxDate"
        :formatter="formatter"
      />

      <van-picker
        v-show="booleanFn.pickers"
        v-model="selectPicker"
        show-toolbar
        :columns="listData[indexs].columns"
        @confirm="onConfirm"
        @cancel="onCancel"
        @change="onChange"
      />
    </van-popup>
    <button @click="ckick">asdf</button>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  props: {
    listData: Array,
  },
  data() {
    return {
      showPicker: false,
      currentDate: new Date(),
      selectPicker: '',
      booleanFn: {
        timeChoosePopup: false,
        pickers: false,
      },
      indexs: 0,
      // 存储数据的数组
      arrData: [],
    };
  },
  // created() {
  //   this.isShowAdd();
  // },
  methods: {
    // 添加isShow
    // isShowAdd() {
    //   let arr = ['', '工时'];
    //   arr.forEach(item => {
    //     this.booleanFn[String(item)] = false;
    //   });
    //   console.log(this.booleanFn);
    // },
    ckick() {
      this.listData.forEach(item => {
        console.log(item.rightName);
      });
    },
    formatter(type, val) {
      if (type === 'month') {
        return `${val}月`;
      } else if (type === 'day') {
        return `${val}日`;
      }
      return val;
    },
    // timePicker点击完成时
    ondatetimeConfirm(value) {
      this.listData[this.indexs].rightName = value;
      this.showPicker = false;
    },
    // picker点击完成时
    onConfirm(value) {
      // Toast(`当前值：${value}, 当前索引：${index}`);
      this.listData[this.indexs].rightName = value;
      this.showPicker = false;
    },
    onChange(picker, value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
    },
    onCancel() {
      Toast('取消');
      this.showPicker = false;
    },
    // 点击选项
    showOption(sts, typePopup, index) {
      console.log('🚀 ~ file: aroundLayout.vue ~ line 101 ~ showOption ~ sts', sts, typePopup);
      sts ? this.publicFunction(typePopup, index) : '';
    },
    // 将其他设为false  需要的popup设为true
    publicFunction(typePopup, index) {
      this.showPicker = true;
      Object.keys(this.booleanFn).forEach(item => {
        this.booleanFn[item] = false;
        this.booleanFn[typePopup] = true;
      });
      // 拿到当前点击的那个index用于渲染数据(神之一手)
      this.indexs = index;
    },
  },
};
</script>

<style lang="scss" scoped>
#aroundStyle {
  .aroundForStyle {
    .topShowStyle {
      width: 100%;
      font-size: 15px;
      @include daily_public;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 16px;
      .leftStyle {
        @include daily_4D4D4D;
      }
      .rightStyle {
        display: flex;
        align-items: center;
        .rightItemStyle {
          text-align: right;
          width: 249px;
          margin-right: 8px;
        }
      }
    }
  }
  .showDataStyle {
    width: 100%;
    .showItemDataStyle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      @include dailt_828282;
      .showDataStyle_left {
        width: 262px;
      }
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
  .pickerStyle {
    width: 100%;
    height: 100%;
    border-radius: 13px 13px 0 0;
  }
}
</style>
