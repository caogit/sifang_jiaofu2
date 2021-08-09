<template>
  <div>
    <NavBer>
      <template #headerNav>首页</template>
    </NavBer>
    首页
    <Tabber> </Tabber>
  </div>
</template>

<script>
import Tabber from '@/components/Tabber.vue';
import NavBer from '@/components/Navber.vue';

export default {
  components: {
    Tabber,
    NavBer,
  },
};
</script>

<style></style>
