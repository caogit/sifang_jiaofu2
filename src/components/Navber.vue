<template>
  <div class="navStyle">
    <div class="touStyle">《</div>
    <div class="headerNav">
      <slot name="headerNav"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navBer',
};
</script>

<style lang="scss">
.navStyle {
  width: 100%;
  height: 44px;
  background-color: #fff;
  position: relative;
  .touStyle {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
  }
  .headerNav {
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 44px;
    font-size: 25px;
  }
}
</style>
