<template>
  <div class="loginStyle">
    <div class="topStyle">
      <div class="iconStyle">
        <img src="../../assets/icon_cut/icon_mine@3x.png" alt="" class="iconStyle_img" />
      </div>
      <div class="titleStyle">四方精创</div>
      <div class="titleEngStyle">FORMS SYNTRON</div>
    </div>
    <div class="containStyle">
      <div class="inputStyle">
        <label class="labelStyle"
          ><img src="../../assets/icon_cut/icon_iphone@2x.png" alt="" />
          <input type="text" placeholder="请输入用户名" class="inputs_Style" v-model="userName"
        /></label>
      </div>
      <div class="inputStyle">
        <label class="labelStyle"
          ><img src="../../assets/icon_cut/icon_lock@3x.png" alt="" />
          <input type="text" placeholder="请输入密码" class="inputs_Style" v-model="passWord"
        /></label>
      </div>
      <Btns :type="1" @click.native="toHome">
        <template #btnName>登录</template>
      </Btns>
    </div>
  </div>
</template>

<script>
import Btns from '@/components/Btns.vue';
import { ApiUrl } from '@/api/index';

import { setToken } from '@/utils/storage';

export default {
  components: {
    Btns,
  },
  data() {
    return {
      userName: 'caoao',
      passWord: 'hezm',
    };
  },

  methods: {
    // 点击登录按钮时
    toHome() {
      let parms = {
        password: this.passWord,
        username: this.userName,
      };

      if (this.userName != '' && this.passWord != '') {
        this.request.post(ApiUrl.USER.LOGIN, parms).then(res => {
          if (res.code == 200) {
            let storage = res.data;
            setToken({
              keys: 'Token',
              value: storage.tokenHead + storage.token,
              expires: 50000,
              deposit: new Date().getTime(),
            });
            this.$notify({ type: 'success', message: '登录成功' });
            this.$router.push('/home');
          }
        });
      } else {
        alert('请输入完整');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.loginStyle {
  width: 100%;
  height: 100%;
  background-image: url('../../assets/icon_cut/bag_mine@2x.png');
  display: flex;
  flex-direction: column;
  .topStyle {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .iconStyle {
      width: 59px;
      height: 59px;
      margin-bottom: 32px;
      .iconStyle_img {
        width: 59px;
        height: 59px;
      }
    }
    .titleStyle {
      font-size: 30px;
      color: #fff;
      letter-spacing: 3px;
      margin-bottom: 8px;
    }
    .titleEngStyle {
      font-size: 14px;
      color: #fff;
    }
  }
  .containStyle {
    flex: 1;
    background-color: #f0f3fa;
    border-radius: 15px 15px 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 43px;
    .inputStyle {
      width: 325px;
      height: 50px;
      background-color: #fff;
      display: flex;
      align-items: center;
      padding-left: 15px;
      margin-bottom: 20px;
      border-radius: 10px;

      .labelStyle {
        display: flex;
        align-items: center;
        font-size: 12px;
        // @include Home_footer_E1E1E3;
        img {
          width: 20px;
          height: 20px;
        }
        .inputs_Style {
          padding-left: 10px;
        }
      }

      .inputs_Style ::placeholder {
        font-size: 18px;
        color: #cbcbcc;
      }
    }
  }
}
</style>
