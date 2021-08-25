<template>
  <div class="navStyle">
    <div id="canTopFixed">
      <div class="touStyle" @click="toBack">
        <img src="@/assets//icon_cut/nav_raback@2x.png" alt="" />
      </div>
      <div class="headerNav">
        <slot name="headerNav"></slot>
      </div>
      <div class="rightIcon">
        <slot name="rightIconNav"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navBer',
  methods: {
    toBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss">
.navStyle {
  width: 100%;
  height: 44px;
  #canTopFixed {
    width: 100%;
    background-color: #fff;
    height: 44px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
  }
  .touStyle {
    position: absolute;
    left: 5%;
    top: 50%;
    transform: translate(0, -50%);
    img {
      width: 24px;
      height: 24px;
    }
  }
  .headerNav {
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 44px;
    font-size: 18px;
    font-weight: bold;
  }
  .rightIcon {
    position: absolute;
    right: 0%;
    top: 50%;
    transform: translate(0, -50%);
    img {
      width: 24px;
      height: 24px;
      margin-right: 20px;
    }
  }
}
</style>
