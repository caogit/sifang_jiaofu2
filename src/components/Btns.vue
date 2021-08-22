<template>
  <div class="bigStyle">
    <!--大按钮通用组件 -->
    <button class="btnStyke" v-if="type == 1">
      <slot name="btnName"></slot>
    </button>
    <!--小按钮通用组件--浅色 -->
    <button class="smallStyle" v-if="type == 2">
      <slot name="smallStyle"></slot>
    </button>
    <!--小按钮通用组件--深色 -->
    <button class="smallStyle3" v-if="type == 3">
      <slot name="smallStyle3"></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Btns',
  props: {
    type: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
.btnStyke {
  min-width: 325px;
  height: 51px;
  background-color: #2f80ed;
  line-height: 51px;
  text-align: center;

  font-size: 16px;
  color: #fff;
  border-radius: 10px;
}
.smallStyle {
  width: 152px;
  height: 51px;
  border: 1px solid #2f80ed;
  background-color: #fff;

  line-height: 51px;
  text-align: center;

  font-size: 16px;
  color: blue;
  border-radius: 10px;
}
.smallStyle3 {
  width: 152px;
  height: 51px;
  background-color: #2f80ed;
  background-color: fff;
  line-height: 51px;
  text-align: center;

  font-size: 16px;
  color: #fff;
  border-radius: 10px;
}
</style>
