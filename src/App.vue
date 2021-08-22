<template>
  <div id="app">
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <Tabber v-if="$route.meta.showFooter"></Tabber>
  </div>
</template>
<script>
import Tabber from '@/components/Tabber.vue';

export default {
  components: {
    Tabber,
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
}
body {
  height: 100%;
}
body .van-overflow-hidden {
  overflow: none !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  height: 100%;
}
#nprogress .bar {
  /*  自定义颜色 */
  background: blue !important;
}
</style>
