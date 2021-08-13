<template>
  <div class="boxStyle">
    <div class="topStyle">
      <div class="titleStyle">
        <div class="titleMessage">员工信息</div>
        <div class="titleName">
          <p>姓名</p>
          <p>
            <input type="text" placeholder="请输入" class="titleNameInputStyle" />
          </p>
        </div>
      </div>
      <div class="titleStyle">
        <div class="titleMessage">审批类型</div>
        <div class="shenpiBtnStyle">
          <button class="btnOne">延迟申请</button>
          <button class="btnTwo">调休</button>
        </div>
      </div>
      <div class="titleStyle">
        <div class="titleMessage">审批状态</div>
        <div class="shenpiBtnStyle">
          <button class="btnOne">审核通过</button>
          <button class="btnTwo">审核拒绝</button>
        </div>
      </div>
      <div class="titleStyle">
        <div class="titleMessage">审批时间</div>
        <ul class="shenpiTimeStyle">
          <li>
            <p class="timeTopStyle">开始时间</p>
            <p class="timeBottomStyle">请选择</p>
          </li>
          <li class="henxian"></li>
          <li>
            <p class="timeTopStyle">结束时间</p>
            <p class="timeBottomStyle">请选择</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="BtnsfixStyle">
      <button class="smallStyle">重置</button>
      <button class="smallStyle3">确定</button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style lang="scss" scoped>
.boxStyle {
  min-width: 335px;
  height: 100%;
  background-color: #f9fafc;
  position: absolute;
  right: 0;
  top: 0;
  transition: all 2s;
  z-index: 200;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .titleStyle {
    padding-top: 10px;
    background-color: #fff;
    padding-right: 16px;
    margin-bottom: 16px;
    padding-bottom: 10px;

    .titleMessage {
      font-size: 18px;
      font-weight: 600;
      text-align: left;
      margin-bottom: 12px;
      padding-left: 16px;
      height: 22px;
    }
    .titleName {
      width: 100%;
      display: flex;
      justify-content: space-between;
      height: 20px;
      padding-left: 24px;

      @include generalColor;
      .titleNameInputStyle::placeholder {
        text-align: right;
        @include textColor;
      }
    }
    .shenpiBtnStyle {
      width: 100%;
      height: 60px;
      display: flex;
      font-size: 16px;
      align-items: center;

      .btnOne {
        width: 85px;
        height: 36px;
        background-color: #efefef;
        color: #5d5d5d;
        margin-left: 16px;
        border-radius: 7px;
      }
      .btnTwo {
        width: 85px;
        height: 36px;
        background-color: #d5e6fb;
        color: #3181ed;
        margin-left: 16px;
        border-radius: 7px;
      }
    }
    .shenpiTimeStyle {
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .henxian {
        width: 10px;
        border-bottom: 1px solid #515151;
      }
      .timeTopStyle {
        @include generalColor;
        margin-bottom: 5px;
      }
      .timeTopStyle:after {
        content: '';
        vertical-align: middle;
        position: relative;
        top: 10px;
        left: 5px;
        width: 0px;
        height: 0px;
        border: 6px solid transparent;
        border-top-color: #515151;
      }
      .timeBottomStyle {
        @include textColor;
      }
    }
  }
  .BtnsfixStyle {
    height: 87px;

    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #fff;
    .smallStyle {
      min-width: 152px;
      height: 51px;
      border: 1px solid #2f80ed;
      background-color: #fff;

      line-height: 51px;
      text-align: center;

      font-size: 22px;
      color: blue;
      border-radius: 10px;
    }
    .smallStyle3 {
      min-width: 152px;
      height: 51px;
      background-color: #2f80ed;

      line-height: 51px;
      text-align: center;

      font-size: 22px;
      color: #fff;
      border-radius: 10px;
    }
  }
}
</style>
