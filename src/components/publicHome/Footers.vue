<template>
  <div class="footersStyle">
    <div v-for="(item, index) in listData" :key="index" class="itemStyle">
      <ul class="footersImgStyle">
        <li class="imgStyle">
          <img :src="item.image" alt="" />
        </li>
        <li class="textStyle">
          <p class="leftTopText">{{ item.footerText }}</p>
          <p class="leftBottomText">{{ item.footerTime }}</p>
        </li>
      </ul>
      <div>1.4 MB</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footers',
  props: {
    listData: Array,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.footersStyle {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 31px;
  padding-left: 12px;
  .itemStyle {
    display: flex;
    justify-content: space-between;
    margin-bottom: 27px;
    .footersImgStyle {
      display: flex;
      .imgStyle {
        margin-right: 19px;
      }
      .textStyle {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .leftTopText {
          font-size: 16px;
          @include Home_footer_4C4C4C;
          font-weight: bold;
        }
        .leftBottomText {
          font-size: 14px;
          @include textColor;
        }
      }
    }
    img {
      width: 34px;
      height: 44px;
    }
  }
}
</style>
