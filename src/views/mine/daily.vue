<template>
  <div class="boxStyle">
    <Navber>
      <template #headerNav>日报</template>
      <template #rightIconNav>
        <img src="../../assets/icon_cut/icon_delete@3x.png" alt="" />
        <img src="../../assets/icon_cut/icon_screen@3x.png" alt="" @click="showTanchu" />
      </template>
    </Navber>
    <transition name="slide-fade">
      <Tanchu v-show="showThis"></Tanchu>
    </transition>
    <div class="zhezhaoceng" v-show="showThis" @click="backHistory"></div>
  </div>
</template>

<script>
import Tanchu from './Tanchu.vue';

export default {
  data() {
    return {
      showThis: false,
    };
  },
  components: {
    Tanchu,
  },
  methods: {
    showTanchu() {
      this.showThis = true;
    },
    backHistory() {
      this.showThis = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.boxStyle {
  .zhezhaoceng {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
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
