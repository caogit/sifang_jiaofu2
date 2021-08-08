<template>
  <div>
    我的
    <Tabber :indexData="indexData"> </Tabber>
  </div>
</template>

<script>
import Tabber from '@/components/Tabber.vue';

export default {
  components: {
    Tabber,
  },
  data() {
    return {
      indexData: 0,
    };
  },
  created() {
    console.log(this.$route.query);
    this.indexData = Number(this.$route.query.index);
  },
};
</script>

<style></style>
