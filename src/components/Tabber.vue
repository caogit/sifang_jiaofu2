<template>
  <div class="tabStyle">
    <ul class="tabchange">
      <li v-for="(item, index) in listData" :key="index" @click="tabChange(index)">
        <p><img :src="indexData === index ? item.imgUrls : item.imgUrl" alt="" /></p>
        <p>{{ item.text }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Tabber',
  props: {
    indexData: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      listData: [
        {
          text: '首页',
          imgUrl: require('../assets/icon_cut/icon_home@2x.png'),
          imgUrls: require('../assets/icon_cut/icon_home_p@2x.png'),
        },
        {
          text: '任务',
          imgUrl: require('../assets/icon_cut/icon_mine_1@2x.png'),
          imgUrls: require('../assets/icon_cut/icon_mine_p_1@2x.png'),
        },
        {
          text: '审批',
          imgUrl: require('../assets/icon_cut/icon_footbar_shenhe@2x.png'),
          imgUrls: require('../assets/icon_cut/icon_footbar_shenhe_p@2x.png'),
        },
        {
          text: '我的',
          imgUrl: require('../assets/icon_cut/icon_mine@2x.png'),
          imgUrls: require('../assets/icon_cut/icon_mine_p@2x.png'),
        },
      ],
      tabdatas: 0,
    };
  },

  methods: {
    tabChange(parms) {
      // this.tabdatas = parms;
      let str = '';
      switch (parms) {
        case 0:
          str = '/home';
          break;
        case 1:
          str = '/renwu';
          break;
        case 2:
          str = '/shenpi';
          break;
        case 3:
          str = '/mine';
          break;
      }
      this.toSomepage(str);
    },
    toSomepage(str) {
      this.$router.push({
        path: str,
      });
    },
  },
};
</script>

<style lang="scss">
.tabStyle {
  width: 100%;
  height: 83px;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  font-size: 16px;
  .tabchange {
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    img {
      width: 21px;
      height: 21px;
    }
  }
  .tabchange li p:nth-child(1) {
    margin-bottom: 7px;
  }
}
</style>
