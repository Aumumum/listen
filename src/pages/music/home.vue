<template>
  <el-container>
    <el-header v-show="!this.$store.state.isMobile">
      <TopBar />
    </el-header>
    <el-main>
      <transition enter-active-class="animate__animated  animate__fadeIn ">
        <router-view></router-view>
      </transition>
    </el-main>
  </el-container>
</template>

<script>
import TopBar from "../../components/top_bar";
export default {
  name: "home",
  components: {
    TopBar,
  },
 
};
</script>

<style scoped>
.el-main {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  

  
}
</style>
