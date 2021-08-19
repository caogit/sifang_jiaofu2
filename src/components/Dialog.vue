<template>
  <div class="DialogStyle">
    <div class="dialogTopStyle">
      <slot name="dialogTop"></slot>
    </div>
    <div class="dialogBottomStyle">
      <p
        v-for="(item, index) in dialogDatas"
        class="itemdialogBottomStyle"
        :key="index"
        :style="{ color: item.type }"
        @click="sumbit(item.contain)"
      >
        {{ item.contain }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    dialogDatas: Array,
  },
  methods: {
    sumbit(sts) {
      this.$emit('tabDialog', sts);
    },
  },
};
</script>

<style lang="scss" scoped>
.DialogStyle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 270px;
  z-index: 200;
  background-color: #fff;
  border-radius: 12px;
  font-size: 16px;

  .dialogTopStyle {
    width: 100%;
    height: 69px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dialogBottomStyle {
    width: 100%;
    height: 51px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-top: 1px solid #eeeeee;
    .itemdialogBottomStyle {
      height: 100%;
      line-height: 51px;
      border-right: 1px solid #eeeeee;
      flex: 1;
      text-align: center;
      &:nth-last-child(1) {
        border-right: none;
      }
    }
  }
}
</style>
