<template>
  <div class="PublicpageStyle">
    <slot name="someImg">
      <img src="../assets//icon_cut/img_empty@3x.png" alt="" />
    </slot>
    <slot name="someText"></slot>
  </div>
</template>

<script>
export default {
  name: 'Publicpage',
};
</script>

<style lang="scss" scoped>
.PublicpageStyle {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @include textColor;
  img {
    width: 154px;
    height: 120px;
    margin-top: 64px;
    margin-bottom: 16px;
  }
}
</style>
