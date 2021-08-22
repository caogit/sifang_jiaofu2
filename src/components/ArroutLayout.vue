<template>
  <div class="comsStyle">
    <div class="freeStyle">
      <div>
        <slot name="leftText"> </slot>
      </div>
      <slot name="freeRight">
        <ul class="freeRightStyle">
          <!-- 过滤器一会试试 -->
          <li>
            <slot name="rightText"> </slot>
          </li>
          <li v-if="showRightImg">
            <img src="../assets/icon_cut/arrows_more@3x.png" alt="" v-if="!isTopArrow" />
            <img src="../assets/icon_cut/cao-tp@3x.png" alt="" v-else />
          </li>
        </ul>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 是否需要右边的箭头图片
    showRightImg: {
      type: Boolean,
      default: true,
    },
    // 展示图片展开还是收起
    isTopArrow: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    console.log(this.isTopArrow);
  },
};
</script>

<style lang="scss" scoped>
.comsStyle {
  .freeStyle {
    width: 100%;
    height: 53px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    font-weight: 500;
    padding: 0 16px;
    .freeRightStyle {
      display: flex;
      align-items: center;
      img {
        width: 18px;
        height: 18px;
        margin-left: 8px;
      }
    }
  }
}
</style>
