<template>
  <div id="aroundStyle">
    <div class="aroundForStyle" v-for="(item, index) in listData" :key="index">
      <!-- 通用的左右布局（白块合并情况） -->
      <div v-if="item.sibling">
        <div
          class="topShowStyle"
          v-for="(items, indexs) in item.sibling"
          :key="indexs"
          @click="showOption(items.isProperty, items.isTypeePopup, index, indexs)"
        >
          <div class="leftStyle">
            {{ items.leftName }}
          </div>
          <ul class="rightStyle">
            <li class="rightItemStyle" :style="{ color: items.color }">
              {{ items.rightName }}
            </li>
            <li v-show="items.imageUrl">
              <img :src="items.imageUrl" alt="" />
            </li>
          </ul>
        </div>
      </div>
      <!-- 通用的左右布局（白块不合并情况） -->
      <div v-else>
        <div class="topShowStyle" @click="showOption(item.isProperty, item.isTypeePopup, index)">
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
      </div>
      <!-- 是否显示可收起展开的内容 -->
      <div class="showDataStyle" v-if="item.taskListData" v-show="isShowPutOn">
        <ul
          v-for="(items, i) in item.taskListData"
          :key="i"
          class="showItemDataStyle"
          @click="showDiffImage(index, i)"
        >
          <li class="showDataStyle_left">{{ items.leftText }}</li>
          <li>
            <img
              :src="iputOnNum == JSON.stringify([index, i]) ? items.rightCheckImg : items.rightImg"
              alt=""
            />
          </li>
        </ul>
      </div>
      <!-- 是否显示可输入的input框 -->
      <div class="showInputStyle" v-if="item.inputContainer">
        <textarea class="showInputInStyle" />
      </div>
    </div>

    <!-- Vant选择器 -->
    <div>
      <van-popup
        v-model="showPicker"
        position="bottom"
        class="pickerStyle"
        :style="{ height: '40%' }"
      >
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
    </div>
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
        datetimePicker: false,
        pickers: false,
      },
      indexs: 0,
      indexs2: 0,
      // 存储数据的数组
      arrData: [],
      // 是否可收起展开
      isShowPutOn: false,
      // 切换
      iputOnNum: [],
    };
  },

  methods: {
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
      if (this.listData[this.indexs].sibling) {
        this.listData[this.indexs].sibling[this.indexs2].rightName = this.util.selectData(value);
      } else {
        this.listData[this.indexs].rightName = this.util.selectData(value);
      }

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
    showOption(sts, typePopup, index, indexs) {
      if (sts === 'isBottomPopup') {
        this.publicFunction(typePopup, index, indexs);
      } else if (sts === 'isPutOn') {
        this.isShowPutOn = !this.isShowPutOn;
      }
    },
    // 点击可展开的每一项
    showDiffImage(index, i) {
      this.iputOnNum = JSON.stringify([index, i]);
    },
    // 将其他设为false  需要的popup设为true
    publicFunction(typePopup, index, indexs) {
      this.showPicker = true;
      Object.keys(this.booleanFn).forEach(item => {
        this.booleanFn[item] = false;
        this.booleanFn[typePopup] = true;
      });
      // 拿到当前listData点击的那个index用于渲染数据(神之一手)
      this.indexs = index;
      // 拿到当前listData点击的那个sibling的index用于渲染数据(神之一手)
      this.indexs2 = indexs;
    },
  },
};
</script>

<style lang="scss" scoped>
#aroundStyle {
  .aroundForStyle {
    margin-top: 16px;
    .topShowStyle {
      width: 100%;
      font-size: 15px;
      @include daily_public;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .leftStyle {
        @include daily_4D4D4D;
      }
      .rightStyle {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .rightItemStyle {
          width: 80%;
          text-align: left;
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
  .van-ellipsis {
    color: red;
  }
}
</style>
