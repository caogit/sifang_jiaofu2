<template>
  <div class="dailyStyle">
    <Navber>
      <template #headerNav>写日报</template>
    </Navber>
    <div class="mainStyle">
      <AroundLayout :listData="listData" @huoqushuju="huoqushuju"> </AroundLayout>
    </div>
  </div>
</template>

<script>
import AroundLayout from '@/components/AroundLayout.vue';
export default {
  components: {
    AroundLayout,
  },
  data() {
    return {
      listData: [
        {
          name: 'a',
          leftName: '填报日期',
          rightName: new Date(),
          imageUrl: require('../../assets/icon_cut/arrows_more@3x.png'),
          imageChangeUrl: require('../../assets/icon_cut/cao-tp@3x.png'),
          minDate: new Date(2020, 0, 1),
          maxDate: new Date(2025, 10, 1),
          // 你是否需要弹窗
          isBottomPopup: true,
          // 需要啥类型弹窗
          isTypeePopup: 'timeChoosePopup',
        },
        {
          name: 'b',
          leftName: '填报日期',
          rightName: new Date(),
          imageUrl: require('../../assets/icon_cut/arrows_more@3x.png'),
          imageChangeUrl: require('../../assets/icon_cut/cao-tp@3x.png'),
          minDate: new Date(2020, 0, 1),
          maxDate: new Date(2025, 10, 1),
          // 你是否需要弹窗
          isBottomPopup: true,
          // 需要啥类型弹窗
          isTypeePopup: 'timeChoosePopup',
        },
        {
          leftName: '任务',
          rightName: '海外分行功能优化细化001-百姓对账 APP',
          imageUrl: require('../../assets/icon_cut/arrows_more@3x.png'),
          imageChangeUrl: require('../../assets/icon_cut/cao-tp@3x.png'),
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
        },
        {
          leftName: '工时',
          rightName: '请选择',
          imageUrl: require('../../assets/icon_cut/arrows_more@3x.png'),
          columns: ['2小时', '4小时', '6小时', '8小时'],
          color: '#BDBDBD',
          // 是否需要弹窗
          isBottomPopup: true,
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
  methods: {},
};
</script>

<style lang="scss" scoped>
.dailyStyle {
  .mainStyle {
  }
}
</style>
