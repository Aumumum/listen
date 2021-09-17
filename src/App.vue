<template>
  <el-container>
    <NavMenu/>
    <router-view class="main"></router-view>
    
    <Player />
  </el-container>
</template>

<script>
import NavMenu from "./components/nav_menu";
import Player from "./components/player";
export default {
  name: "App",
  components: {
    NavMenu,
    Player,
  },

  data() {
    return {
      screenWidth: document.body.clientWidth,
    };
  },

  watch: {
    screenWidth: {
      handler(newVal) {
        this.$store.state.isCollapse = newVal > 1200 ? false : true;
        this.$store.state.isMobile = newVal > 540 ? false : true;

      },
      immediate: true,
    },
  },

  mounted() {
    window.onresize = () => {
      this.screenWidth = document.body.clientWidth;
    };
  },
};
</script>

<style>
body {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #fff;
  border-radius: 1.5em;
}
::-webkit-scrollbar-thumb {
  background: #e4e3e3;
  border-radius: 1.5em;
}
::-webkit-scrollbar-thumb:hover {
  background: #b1b1b1;
}
.el-container {
  height: 100vh;
  overflow-x: hidden;
}
.main{
 padding-bottom: 55px;
}
</style>
