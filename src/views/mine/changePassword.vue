<template>
  <div class="boxStyle">
    <Navber>
      <template #headerNav>修改登录密码</template>
    </Navber>
    <ul class="mainStyle">
      <li>
        <p>原始密码</p>
        <p>
          <input type="text" placeholder="请输入原始密码" v-model="oldPassword" />
        </p>
      </li>
      <li>
        <p>新密码</p>
        <p>
          <input
            maxlength="16"
            type="text"
            placeholder="8-16位数字和字母组合"
            v-model="newPassword"
          />
        </p>
      </li>
      <li>
        <p>确认新密码</p>
        <p>
          <input type="text" placeholder="请再次输入新密码" v-model="againNewPassword" />
        </p>
      </li>
    </ul>
    <div class="btnStyle">
      <Btns :type="1" @click.native="submitPassword">
        <template #btnName>提交</template>
      </Btns>
    </div>
  </div>
</template>

<script>
import Btns from '@/components/Btns.vue';
import { ApiUrl } from '@/api/index';

export default {
  components: { Btns },
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      againNewPassword: '',
    };
  },
  methods: {
    submitPassword() {
      let parms = {
        newPassword: this.newPassword,
        oldPassword: this.oldPassword,
      };
      if (this.oldPassword == '') {
        this.$toast('请输入原始密码');
        return;
      }
      if (this.newPassword == '') {
        this.$toast('请输入新密码');
        return;
      }
      if (this.newPassword !== this.againNewPassword) {
        this.$toast('两次密码不一致,请重新输入');
        return;
      }
      this.request.post(ApiUrl.USER.UPDATE_PASSWORD, parms).then(res => {
        if (res.code == 200) {
          this.$toast('修改密码成功');
        } else {
          this.$toast('修改密码失败');
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.boxStyle {
  .mainStyle {
    margin-top: 16px;
    & li {
      display: flex;
      height: 53px;
      align-items: center;
      background-color: #fff;
      border-bottom: 1px solid #e0e0e0;
      & p:nth-child(1) {
        font-size: 15px;
        color: #4d4d4d;
        width: 121px;
        padding-left: 16px;
      }
      & p:nth-child(2) {
        font-size: 15px;
        & input::placeholder {
          color: #bdbdbd;
        }
      }
    }
  }
  .btnStyle {
    width: 100%;
    text-align: center;
    margin-top: 48px;
  }
}
</style>
