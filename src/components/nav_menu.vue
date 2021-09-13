<template>
  <el-aside v-show="!this.$store.state.isMobile" width="auto">
    <transition
      enter-class="animate__animated animate__fadeIn animate__delay-11s"
      leave-active-class="animate__animated animate__zoomOutLeft"
    >
      <el-menu  router active-text-color='#ffb199' :default-active="this.$route.path" :collapse="this.$store.state.isCollapse">
        <p><i v-show="!this.$store.state.isCollapse" class="el-icon-user-solid user" /></p>
        <el-menu-item v-for="item in items" :key="item.icon" :index="item.path">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </el-menu>
      </transition>
  </el-aside>
</template>

<script>
export default {
  name: "navMeau",
props:['isCollapse','isMobile'],

  computed:{
   items(){return [
        { path: this.$store.state.routeAbout.path, title: "发现音乐", icon: "el-icon-discover" },
        { path: "/fm", title: "私人FM", icon: "el-icon-headset" },
        { path: "/mv", title: "MV", icon: "el-icon-video-camera" },
      ]},

  },
  
};
</script>

<style>
.el-menu {
  height: 100%;
}
.el-menu span {
  font-size: 17px;
  padding-left: 10px;
  padding-right: 95px;
}
p {
  text-align: center;
  font-size: 50px;
}
.user:not(.el-menu--collapse) {
  width: 100px;
  height: 100px;
  line-height: 100px !important;
  color: #8a8787;
  border: 1px #c0bbbb solid;
  border-radius: 1.5em;
}
</style>
