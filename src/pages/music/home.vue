<template>
  <el-container>
    <el-header>
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
 margin-bottom: 50px;
}
h3 {
  display: inline-block;
  color: #5a7099;
  padding-left: 7.5px;
}
</style>
