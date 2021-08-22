<template>
  <div>
    <Navber>
      <template #headerNav>{{ title }}</template>
    </Navber>
    <div class="PublicpageStyle">
      <slot name="someImg">
        <img src="@/assets//icon_cut/img_empty@3x.png" alt="" />
      </slot>
      <div>{{ text }}</div>
    </div>
    <div class="hide_buttons">
      <p>
        <Btns :type="3">
          <template #smallStyle3>返回日志</template>
        </Btns>
      </p>
      <ul class="itemPptions">
        <li>继续写日报</li>
        <li>|</li>
        <li>查看日报</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Btns from '@/components/Btns.vue';
export default {
  name: 'Publicpage',
  components: {
    Btns,
  },
  computed: {
    title() {
      return this.$route.query.title;
    },
    text() {
      return this.$route.query.text;
    },
  },
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
.hide_buttons {
  margin-top: 70px;

  display: flex;
  flex-direction: column;
  align-items: center;
  .itemPptions {
    margin-top: 24px;
    display: flex;
    font-size: 12px;
    color: #2f80ed;
    & li:nth-of-type(2) {
      padding: 0 10px;
    }
  }
}
</style>
