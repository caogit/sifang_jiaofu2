<template>
  <div class="detailsStyle">
    <NavBer>
      <template #headerNav>审批详情</template>
    </NavBer>
    <ul class="container">
      <li class="containerli" v-for="(item, index) in listData" :key="index">
        <p class="containerli_l">{{ item.leftname }}</p>
        <p class="containerli_r">{{ item.rightname }}</p>
      </li>
      <li class="showDataStyle">
        <p v-for="(item, index) in showData" :key="index" class="showDataStyle_li">
          {{ index + 1 }}.{{ item }}
        </p>
      </li>
    </ul>
    <div class="btns">
      <button class="smallStyle">拒绝</button>
      <button class="smallStyle3">同意</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'shenpi',

  data() {
    return {
      listData: [
        {
          leftname: '姓名',
          rightname: '',
        },
        {
          leftname: '任务',
          rightname: '海外阿斯蒂芬库里卢卡斯到了看见分厘卡',
        },
        {
          leftname: '申请日期',
          rightname: '4月22日',
        },
        {
          leftname: '延迟申请起始日期',
          rightname: '18:30',
        },
        {
          leftname: '延迟申请截止日期',
          rightname: '21:30',
        },
        {
          leftname: '工作内容',
          rightname: '',
        },
      ],
      showData: ['X16 乘车码设计', 'X16 乘车码设计', 'X16 乘车码设计'],
    };
  },
  created() {
    this.listData[0].rightname = this.$route.query.detailsName;
  },
};
</script>

<style lang="scss" scoped>
.detailsStyle {
  .smallStyle {
    min-width: 152px;
    height: 51px;
    border: 1px solid #2f80ed;
    background-color: #fff;

    line-height: 51px;
    text-align: center;

    font-size: 18px;
    color: blue;
    border-radius: 10px;
  }
  .smallStyle3 {
    min-width: 152px;
    height: 51px;
    background-color: #2f80ed;

    line-height: 51px;
    text-align: center;

    font-size: 18px;
    color: #fff;
    border-radius: 10px;
  }
  .container {
    width: 100%;
    height: auto;
    background-color: #fff;
    padding: 20px 20px 0px;
    margin-top: 16px;
    .containerli {
      display: flex;
      justify-content: space-between;
      margin-bottom: 14px;
      .containerli_l {
        font-size: 16px;
        color: #505050;
      }
      .containerli_r {
        width: 200px;
        font-size: 16px;
        color: #505050;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: right;
      }
    }
    .showDataStyle {
      padding: 10px;
      background-color: #f9fafc;
      .showDataStyle_li {
        height: 31px;
        text-align: left;
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
  .btns {
    height: 131px;
    display: flex;
    padding: 0px 24px;
    margin-top: 57px;
    justify-content: space-evenly;
  }
}
</style>
