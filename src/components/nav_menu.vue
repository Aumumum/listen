<template>
  <el-aside v-show="!this.$store.state.isMobile" width="auto">
    <transition
      enter-class="animate__animated animate__fadeIn animate__delay-11s"
      leave-active-class="animate__animated animate__zoomOutLeft"
    >
      <el-menu  router  :default-active="this.$route.path" :collapse="this.$store.state.isCollapse">
      
      <li role="menubar" class="el-menu-item user"  title="" @click="login">
        <i>
          <img class="demo-avatar demo-basic" :src="userInfo.avatarUrl" alt="用戶頭像">
        </i>
        <span>{{userInfo.nickname}}</span>
         <el-popover
         class="setting"
            placement="bottom-end"
 
    trigger="hover">

      <span ><i class="el-icon-switch-button"></i><span style="paddingLeft:10px">退出登錄</span></span>

      
        <i slot="reference" class="el-icon-caret-bottom"></i>
  </el-popover>

        
      </li>

        <el-menu-item v-for="item in items" :key="item.icon" :index="item.path" title=''>
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </el-menu>
      </transition>
  </el-aside>
</template>

<script>
import{ callPhone,loginStatus,} from '../api'
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
  data(){
    return {
userInfo:{
  userId:0,
  nickname:'未登錄',
  avatarUrl:'http://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
  backgroundUrl:''
}
    }
  },
  methods:{
    a(){
      callPhone({phone:"17779600797",password:'wasd123456'}).then(response=>{
      
        let obj=response.data.profile
          console.log(obj)
          Object.keys(this.userInfo).forEach(key=>{
            this.userInfo[key]=obj[key]
          })
      })
      
    },
    login(){
      this.out()
       this.$router.push({
          path: "/login",
          
        });
      this.$router.go(-1);
      console.log(8)
    },

    out(){
      loginStatus().then(res=>{
        console.log('@@@@',res)
      })
     
    }
  },
  created(){ this.a()
  }
};
</script>

<style scoped>
.el-menu {
  height: 100%;
}
.el-menu span {
  font-size: 17px;
  padding-left: 10px;
  padding-right: 95px; 
}
.user{
  margin: 60px 0 15px 0;
  
  line-height: 50px;
  color: #777f86;
}

.user img{
  border-radius:100%;
}
.setting{
  position: relative;
  top: -56px;
  left: 180px;
  height: 0px;
  display:block;
  width: 10px;
  padding: 0 !important;
}
</style>
