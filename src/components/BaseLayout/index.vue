<template>
  <div class="base-layout">
    <div v-show="!showChild" class="main-area">
      <slot name="content"> </slot>
      <slot name="fix-bottom"> </slot>
    </div>
    <div name="page-move" v-if="hasChild">
      <router-view />
    </div>
  </div>
</template>

<script>
/**
 * 带二级路由的通用布局 使用时按需使用
 * hasChild == true  有子路由，默认为false
 */
export default {
  props: {
    // 是否有子路由
    hasChild: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    $route(to, from) {
      console.log(to, from);
      //  if(from.name)
    },
  },
  created() {
    console.log(this.$route);
  },
  data() {
    return {
      showChild: false,
    };
  },
};
</script>

<style>
.base-layout {
  height: 100%;
}
</style>
