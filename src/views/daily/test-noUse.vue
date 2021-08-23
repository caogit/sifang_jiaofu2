<template>
  <div class="dailyStyle">
    <Navber>
      <template #headerNav>写日报</template>
    </Navber>
    <div class="mainStyle">
      <AroundLayout :listData="listData"> </AroundLayout>
    </div>
    <div id="addStyle" @click="addNewTemplate">
      <img src="../../assets/icon_cut/icon_add@3x.png" alt="" />
    </div>
    <div class="SubmitdailyStyle">
      <Btns :type="1">
        <template #btnName> 提交日报 </template>
      </Btns>
    </div>
  </div>
</template>

<script>
import AroundLayout from '@/components/AroundLayout.vue';
import Btns from '@/components/Btns.vue';
export default {
  components: {
    AroundLayout,
    Btns,
  },

  data() {
    return {
      listData: [
        {
          // 添加sibling用于合并两个块
          sibling: [],
        },
        {
          leftName: '填报日期',
          rightName: this.util.selectData(new Date()),
          imageUrl: require('../../assets/icon_cut/arrows_more@3x.png'),
          // 需要弹窗
          isProperty: 'isBottomPopup',
          isTypeePopup: 'datetimePicker',
        },
        {
          leftName: '任务',
          rightName: '海外分行功能优化细化001-百姓对账 APP',
          imageUrl: require('../../assets/icon_cut/arrows_more@3x.png'),
          taskListData: [
            {
              leftText: '海外分行功能优化细化001-百姓对账 APP',
              rightCheckImg: require('../../assets/icon_cut/choice_pick@3x.png'),
              rightImg: require('../../assets/icon_cut/choice@3x.png'),
            },
            {
              leftText: '海外分行功能优化细化002-百姓对账 APP',
              rightCheckImg: require('../../assets/icon_cut/choice_pick@3x.png'),
              rightImg: require('../../assets/icon_cut/choice@3x.png'),
            },
            {
              leftText: '海外分行功能优化细化003-百姓对账 APP',
              rightCheckImg: require('../../assets/icon_cut/choice_pick@3x.png'),
              rightImg: require('../../assets/icon_cut/choice@3x.png'),
            },
          ],
          // 需要什么属性的意思
          // 需要展开收起
          isProperty: 'isPutOn',
        },
        {
          leftName: '工时',
          rightName: '请选择',
          imageUrl: require('../../assets/icon_cut/arrows_more@3x.png'),
          columns: ['2小时', '4小时', '6小时', '8小时'],
          color: '#BDBDBD',
          // 需要弹窗
          isProperty: 'isBottomPopup',
          // 需要什么类型弹窗
          isTypeePopup: 'pickers',
        },
        {
          leftName: '今日工作',
          inputContainer: true,
        },
      ],
    };
  },
  methods: {
    addNewTemplate() {
      this.listData.push(
        {
          leftName: '任务',
          rightName: '海外分行功能优化细化001-百姓对账 APP',
          imageUrl: require('../../assets/icon_cut/arrows_more@3x.png'),
          taskListData: [
            {
              leftText: '海外分行功能优化细化001-百姓对账 APP',
              rightCheckImg: require('../../assets/icon_cut/choice_pick@3x.png'),
              rightImg: require('../../assets/icon_cut/choice@3x.png'),
            },
            {
              leftText: '海外分行功能优化细化001-百姓对账 APP',
              rightCheckImg: require('../../assets/icon_cut/choice_pick@3x.png'),
              rightImg: require('../../assets/icon_cut/choice@3x.png'),
            },
            {
              leftText: '海外分行功能优化细化001-百姓对账 APP',
              rightCheckImg: require('../../assets/icon_cut/choice_pick@3x.png'),
              rightImg: require('../../assets/icon_cut/choice@3x.png'),
            },
          ],
          // 需要什么属性的意思
          // 需要展开收起
          isProperty: 'isPutOn',
        },
        {
          leftName: '工时',
          rightName: '请选择',
          imageUrl: require('../../assets/icon_cut/arrows_more@3x.png'),
          columns: ['2小时', '4小时', '6小时', '8小时'],
          color: '#BDBDBD',
          // 需要弹窗
          isProperty: 'isBottomPopup',
          // 需要什么类型弹窗
          isTypeePopup: 'pickers',
        },
        {
          leftName: '今日工作',
          inputContainer: true,
        },
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.dailyStyle {
  .mainStyle {
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
