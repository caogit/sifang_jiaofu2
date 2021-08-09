<template>
  <div class="container">
    <div class="header">
      <div class="headerLeft">
        <slot name="headerLeft"></slot>
      </div>
      <div class="headerright">
        <slot name="headerright"></slot>
      </div>
    </div>
    <div class="body">
      <slot name="bobys"></slot>
    </div>
    <ul class="state">
      <li>
        <img
          src="../assets/icon_cut/choice_jindu_pick_shenpi@2x.png"
          alt=""
          v-if="liststate === 0"
        />

        <img src="../assets/icon_cut/choice_jindu_no_shenpi@2x.png" alt="" v-else />
      </li>
      <li>
        <span class="state_dashed"></span>
        <img
          src="../assets/icon_cut/choice_jindu_pick_shenpi@2x.png"
          alt=""
          v-if="liststate === 1"
        />
        <img src="../assets/icon_cut/choice_jindu_no_shenpi@2x.png" alt="" v-else />

        <span class="state_dashed"></span>
      </li>
      <li>
        <img
          src="../assets/icon_cut/choice_jindu_pick_shenpi@2x.png"
          alt=""
          v-if="liststate === 2"
        />
        <img src="../assets/icon_cut/choice_jindu_no_shenpi@2x.png" alt="" v-else />
      </li>
    </ul>
    <ol class="state_footer">
      <li>张三已申请</li>
      <li>项目经理审批</li>
      <li>主管审批</li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'Coms',
  props: {
    liststate: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 148px;
  padding: 16px 20px 6px;
  margin-top: 16px;
  background-color: #ffffff;
  .header {
    width: 100%;
    height: 44px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
    .headerLeft {
      font-size: 22px;
      font-weight: 10px;
    }
    .headerright {
      width: 68px;
      height: 22px;
      font-size: 12px;
      line-height: 20px;
      border: 2px solid #3a87ee;
      color: #5c9cf1;
      background-color: #d5e6fb;
      border-radius: 10px;
    }
  }
  .body {
    width: 100%;
    font-size: 18px;
    margin-bottom: 10px;
    color: #9e9e9e;
    text-align: left;
  }
  .state {
    display: flex;
    // justify-content: center;
    padding: 0px 20px;
    margin-bottom: 7px;
    & li:nth-child(2) {
      flex: 1;
    }
    .state_dashed {
      vertical-align: middle;
      width: calc(50% - 16px);
      border-bottom: 1px dashed #97bff6;
      display: inline-block;
    }
    .state_text {
      text-align: left;
    }
  }
  .state_footer {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
