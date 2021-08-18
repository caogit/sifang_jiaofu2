<template>
  <div class="MineStyle">
    <div class="topStyle">
      <div class="topText">我的</div>
    </div>
    <div class="mainStyle">
      <div class="mainTopImg">
        <img src="../../assets/icon_cut/img_mine_photo@3x.png" alt="" />
        <ul class="topTitleStyle">
          <li class="topTitleText">你好，{{ requestData.realName }}</li>
          <li class="topHintText" @click="toPersonalData">
            <span>个人资料</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="placeholderBox"></div>
    <div class="footerBigStyle">
      <div class="footerStyle" v-for="(val, key, index) in listData" :key="index">
        <ChangeOption
          v-for="(item, index) in val"
          :key="index"
          @click.native="submit(item.leftText)"
        >
          <template #image>
            <img :src="item.image" alt="" />
          </template>
          <template #text>{{ item.leftText }}</template>
        </ChangeOption>
      </div>
    </div>

    <Tabber :indexData="indexData"> </Tabber>
  </div>
</template>

<script>
import Tabber from '@/components/Tabber.vue';
import ChangeOption from '@/components/publicMine/ChangeOption.vue';
import { ApiUrl } from '@/api/index';

export default {
  components: {
    Tabber,
    ChangeOption,
  },
  data() {
    return {
      indexData: 3,
      listData: {
        listData1: [
          {
            image: require('../../assets/icon_cut/mine_date@3x.png'),
            leftText: '查看日报',
          },
          {
            image: require('../../assets/icon_cut/icon_mine_xiujiashenqin@3x.png'),
            leftText: '查看延迟申请',
          },
          {
            image: require('../../assets/icon_cut/icon_mine_yanshishenqin@3x.png'),
            leftText: '我的休假申请',
          },
        ],
        listData2: [
          {
            image: require('../../assets/icon_cut/mine_code@3x.png'),
            leftText: '修改登录密码',
          },
        ],
        listData3: [
          {
            image: require('../../assets/icon_cut/icon_mine_iphone@3x.png'),
            leftText: '退出登录',
          },
        ],
      },
      requestData: '',
    };
  },
  created() {
    this.pastRequest();
  },
  methods: {
    pastRequest() {
      this.request.post(ApiUrl.USER.GETLOGIN_USER_INFO).then(res => {
        if (res.code == 200) {
          this.requestData = res.data;
        }
      });
    },
    toPersonalData() {
      this.$router.push('/personalData');
    },
    submit(val) {
      switch (val) {
        case '退出登录':
          this.exitLogin();
          break;
        case '修改登录密码':
          this.amendLoginPassword();
          break;
        case '查看日报':
          this.checkDaily();
          break;

        default:
          break;
      }
    },
    exitLogin() {
      this.request.post(ApiUrl.USER.LOGOUT).then(res => {
        if (res.code == 200) {
          localStorage.clear();
          this.$router.push('/login');
          this.$notify({ type: 'success', message: '退出成功' });
        } else {
          this.$notify({ type: 'danger', message: '退出失败,请重试' });
        }
      });
    },
    amendLoginPassword() {
      let parms = {
        newPassword: '',
        oldPassword: '',
      };
      this.request.post(ApiUrl.USER.UPDATE_PASSWORD, parms).then(res => {
        if (res.code == 200) {
          this.$toast('修改密码成功');
        } else {
          this.$toast('修改密码失败');
        }
      });
    },
    checkDaily() {
      this.$router.push('/mineDaily');
    },
  },
};
</script>

<style lang="scss" scoped>
.MineStyle {
  width: 100%;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  .topStyle {
    width: 100%;
    height: 140px;
    color: #fff;
    position: relative;
    background-image: url('../../assets/icon_cut/bag_mine@3x.png');
    .topText {
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .mainStyle {
    width: 351px;
    height: auto;
    background-color: #fff;
    position: absolute;
    top: 19%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    padding: 21px 0px 24px 0px;
    .mainTopImg {
      display: flex;
      padding-left: 16px;
      img {
        width: 56px;
        height: 56px;
      }
      .topTitleStyle {
        padding-left: 14px;

        .topTitleText {
          font-size: 24px;
          font-weight: bold;
        }
        .topHintText {
          width: 66px;
          height: 23px;
          line-height: 21px;
          border: 1px solid;
          border-radius: 10px;
          font-size: 13px;
          text-align: left;
          margin-top: 13px;
          & > span {
            display: inline-block;
            width: 100%;
            height: 100%;
            text-align: center;
          }
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
    height: 30px;
  }
  .footerBigStyle {
    .footerStyle {
      background-color: #fff;
      margin-top: 16px;
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
    .footerStyle:first-of-type {
      margin-top: 0;
    }
  }
}
</style>
