<template>
  <div class="HomeStyle">
    <div class="topStyle">
      <div class="topText">首页</div>
    </div>
    <div class="mainStyle">
      <div class="mainTopImg">
        <div class="leftImg" @click="toRandow('writeDaily')">
          <img src="../../assets/icon_cut/img_date_p@3x.png" alt="" />
          <span class="leftText">日报</span>
        </div>
        <div class="leftImg">
          <img src="../../assets/icon_cut/img_rest_p@3x.png" alt="" />
          <span class="centerText">延迟申请</span>
        </div>
        <div class="leftImg" @click="toRandow('holidayApply')">
          <img src="../../assets/icon_cut/img_yanchishenqin_p@3x.png" alt="" />
          <span class="leftText">请假</span>
        </div>
      </div>
      <div class="mainBottomImg">
        <p class="mainBottomImgTop">公告</p>
        <p class="mainBottomImgBottom">关于湖光的爱心捐募后，请登记到本表发至 ......</p>
      </div>
    </div>
    <div class="placeholderBox"></div>
    <div class="footerStyle">
      <p class="footerTitleStyle">
        <span class="footerTitleStyleL">文档</span>
        <span class="footerTitleStyler">
          <img src="../../assets/icon_cut/icon_more@3x.png" alt="" />
        </span>
      </p>
      <Footers :listData="listData"></Footers>
    </div>
  </div>
</template>

<script>
import Footers from '@/components/publicHome/Footers.vue';
export default {
  components: {
    Footers,
  },
  data() {
    return {
      listData: [
        {
          image: require('../../assets/icon_cut/img01@3x.png'),
          footerText: 'X16 需求文档',
          footerTime: '2021.4.17上传',
          rightText: '1.4MB',
        },
        {
          image: require('../../assets/icon_cut/img02@3x.png'),
          footerText: 'X15 需求文档',
          footerTime: '2021.4.16上传',
          rightText: '1.4MB',
        },
        {
          image: require('../../assets/icon_cut/img03@3x.png'),
          footerText: 'X14 需求文档',
          footerTime: '2021.4.15上传',
          rightText: '1.4MB',
        },
        {
          image: require('../../assets/icon_cut/img03@3x.png'),
          footerText: 'X14 需求文档',
          footerTime: '2021.4.15上传',
          rightText: '1.4MB',
        },
        {
          image: require('../../assets/icon_cut/img03@3x.png'),
          footerText: 'X14 需求文档',
          footerTime: '2021.4.15上传',
          rightText: '1.4MB',
        },
      ],
    };
  },
  created() {
    this.pastRequest();
  },
  methods: {
    pastRequest() {
      this.$store.commit('LoginMan');
    },
    toRandow(str) {
      this.$router.push({
        path: str,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.HomeStyle {
  width: 100%;
  height: calc(100% - 83px);
  font-size: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  .topStyle {
    width: 100%;
    height: 195px;
    background-image: url('../../assets/icon_cut/bag_mine@3x.png');
    color: #fff;
    position: relative;
    .topText {
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .mainStyle {
    width: 351px;
    background-color: #fff;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    padding: 21px 0px 24px 0px;
    .mainTopImg {
      display: flex;

      img {
        width: 94px;
        height: 125px;
      }
      .leftImg {
        position: relative;
        color: #fff;
        font-size: 12px;
        .leftText {
          display: inline-block;
          position: absolute;
          bottom: 34px;
          left: 35px;
        }
        .centerText {
          display: inline-block;
          position: absolute;
          bottom: 34px;
          left: 24px;
        }
      }
    }
    .mainBottomImg {
      .mainBottomImgTop {
        font-size: 14px;
        font-weight: bold;
        text-align: left;
        padding-left: 24px;
        margin-bottom: 12px;
      }
      .mainBottomImgBottom {
        padding-left: 24px;

        text-align: left;
        font-size: 14px;
      }
    }
  }
  .placeholderBox {
    height: 280px;
  }
  .footerStyle {
    padding: 20px 20px 0px 24px;
    overflow-y: scroll;
    background-color: #fff;
    .footerTitleStyle {
      display: flex;

      justify-content: space-between;
      .footerTitleStyleL {
        font-size: 30px;
        font-weight: bold;
      }
      .footerTitleStyler {
        font-size: 20px;
        img {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
}
</style>
