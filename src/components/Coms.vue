<template>
  <div class="container">
    <div class="header">
      <div class="headerLeft">
        <slot name="headerLeft"></slot>
      </div>
      <div id="publicStyle" :class="configState">
        <slot name="headerright"> </slot>
      </div>
    </div>
    <div class="body">
      <slot name="bobys"></slot>
    </div>
    <div class="state">
      <slot name="state"></slot>
    </div>
    <div class="state_footer">
      <slot name="state_footer"></slot>
    </div>
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
    typeState: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      configState: '',
    };
  },
  created() {
    this.configState = this.changeTypeState(this.typeState);
  },
  methods: {
    changeTypeState(str) {
      let fn = '';
      switch (str) {
        case 0:
          fn = 'mission_5c9cf1';
          break;
        case 1:
          fn = 'mission_219653';
          break;
        case 2:
          fn = 'mission_eb5757';
          break;
        default:
          break;
      }
      return fn;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding: 16px 20px 12px;
  margin-top: 16px;
  background-color: #ffffff;
  .header {
    width: 100%;

    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .headerLeft {
      width: 243px;
      height: 100%;
      font-size: 16px;
      font-weight: 600;
    }
    #publicStyle {
      @include change;
    }
    .mission_5c9cf1 {
      @include mission_5c9cf1;
    }
    .mission_219653 {
      @include mission_219653;
    }
    .mission_eb5757 {
      @include mission_eb5757;
    }
  }
  .body {
    width: 100%;
    font-size: 14px;
    color: #9e9e9e;
    text-align: left;
  }
}
</style>
