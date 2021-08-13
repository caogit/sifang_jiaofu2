<template>
  <div class="ChangeOptionStyle">
    <ul class="Changeul">
      <li class="Changeli">
        <slot name="image"></slot>
      </li>
      <li class="Changeli">
        <slot name="text"></slot>
      </li>
    </ul>
    <p>
      <img src="../../assets/icon_cut/arrows_more@3x.png" alt="" />
    </p>
  </div>
</template>

<script>
export default {
  name: 'ChangeOptionStyle',
  props: {
    listData: Array,
  },
};
</script>

<style lang="scss" scoped>
.ChangeOptionStyle {
  width: 100%;
  background-color: #fff;
  height: 56px;
  padding: 0px 16px 0px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f9fafc;
  padding: 20px 20px 0px 24px;
  img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
  .Changeul {
    display: flex;
    align-items: center;
    .Changeli {
      @include mine_4C4C4C;
      font-size: 16px;
    }
  }
}
</style>
