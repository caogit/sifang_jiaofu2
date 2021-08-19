<template>
  <div class="boxStyle">
    <Navber>
      <template #headerNav>个人资料</template>
    </Navber>
    <div class="coverBox">
      <ArroutLayout :showRightImg="false">
        <template #leftText>姓名</template>
        <template #rightText>{{ LoginManData.realName }}</template>
      </ArroutLayout>
      <ArroutLayout :showRightImg="false">
        <template #leftText>登陆手机号</template>
        <template #rightText>{{ LoginManData.mobile }}</template>
      </ArroutLayout>
      <ArroutLayout :showRightImg="false">
        <template #leftText>入职时间</template>
        <template #rightText>{{ LoginManData.createDate }}</template>
      </ArroutLayout>
      <ArroutLayout :showRightImg="false">
        <template #leftText>转正时间</template>
        <template #rightText>{{ LoginManData.createDate }}</template>
      </ArroutLayout>
      <ArroutLayout :showRightImg="false">
        <template #leftText>隶属公司</template>
        <template #rightText>{{ LoginManData.education }}</template>
      </ArroutLayout>
    </div>
    <div class="coverBox">
      <ArroutLayout :showRightImg="false">
        <template #leftText>所在项目</template>
        <template #rightText>{{ LoginManData.manager }}</template>
      </ArroutLayout>
      <ArroutLayout :showRightImg="false">
        <template #leftText>岗位</template>
        <template #rightText>{{ LoginManData.incumbentPost }}</template>
      </ArroutLayout>
      <ArroutLayout :showRightImg="false">
        <template #leftText>技术顶级</template>
        <template #rightText>{{ LoginManData.technicalLevel }}</template>
      </ArroutLayout>
    </div>
  </div>
</template>

<script>
import ArroutLayout from '@/components/ArroutLayout.vue';
import { ApiUrl } from '@/api/index';
export default {
  components: {
    ArroutLayout,
  },
  data() {
    return {
      listData: {},
    };
  },
  computed: {
    LoginManData() {
      return this.$store.state.LoginManData;
    },
  },
  created() {
    this.request.post(ApiUrl.USER.GETLOGIN_USER_INFO).then(res => {
      if (res.code == 200) {
        this.listData = res.data;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.boxStyle {
  .coverBox {
    margin-top: 16px;
    background-color: #fff;
  }
}
</style>
