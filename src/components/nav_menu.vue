<template>
  <el-aside v-show="!this.$store.state.isMobile" width="auto">
    <transition
      enter-class="animate__animated animate__fadeIn animate__delay-11s"
      leave-active-class="animate__animated animate__zoomOutLeft animate__delay-11s"
    >
      <el-menu
        router
        :default-active="this.$route.path"
        :collapse="this.$store.state.isCollapse"
      >
        <li role="menubar" class="el-menu-item user" @click="login">
          <i>
            <img
              class="demo-avatar demo-basic"
              :src="userInfo.avatarUrl"
              alt="用户头像"
            />
          </i>
          <span>{{ userInfo.nickname }}</span>
          <el-popover
            v-show="login_status"
            class="user_info"
            width="215"
            placement="bottom-end"
            trigger="hover"
          >
            <span @click="logout"
              ><i class="el-icon-switch-button"></i
              ><span style="paddingLeft:10px">退出登陆</span></span
            >
            <i slot="reference" class="el-icon-caret-bottom"></i>
          </el-popover>
        </li>

        <el-menu-item
          v-for="item in items"
          :key="item.icon"
          :index="item.path"
          title=""
        >
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </el-menu>
    </transition>

    <el-dialog
      title="扫码登陆"
      :visible="dialogVisible"
      width="300px"
      :before-close="handleClose"
    >
      <div class="qr">
        <el-skeleton :loading="loading" animated>
          <template slot="template">
            <div>
              <el-skeleton-item
                variant="caption"
                style="width: 180px; height: 180px;"
              />
            </div>
          </template>
          <template>
            <img width="180px" height="180px" :src="qrCode" alt="" />
          </template>
        </el-skeleton>
        <span
          >使用
          <a target="view_window" href=" https://music.163.com/#/download"
            >网易云音乐APP</a
          >扫码登陆</span
        >
      </div>
    </el-dialog>
  </el-aside>
</template>

<script>
import { login, logout } from "../api";
export default {
  name: "navMeau",
  props: ["isCollapse", "isMobile"],
  computed: {
    login_status: {
      get() {
        return this.$store.state.login_status;
      },
      set(val) {
        this.$store.state.login_status = val;
      },
    },
    items() {
      return [
        {
          path: this.$store.state.routeAbout.path,
          title: "发现音乐",
          icon: "el-icon-discover",
        },
        { path: "/fm", title: "私人FM", icon: "el-icon-headset" },
        { path: "/mv", title: "MV", icon: "el-icon-video-camera" },
      ];
    },
  },
  data() {
    return {
      userInfo: {
        userId: 0,
        nickname: "未登錄",
        avatarUrl:
          "http://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        backgroundUrl: "",
      },
      dialogVisible: false,
      loading: true,
      key: 0,
      code: 800,
       timer:null,
      qrCode: "",
    };
  },
  watch: {
    dialogVisible(newVal){
      if(!newVal){
        console.log(this.timer)
        clearTimeout(this.timer)
      }
      
    },
    code: {
      handler(newVal) {
        console.log(newVal);
        if (newVal === 800) {
          clearTimeout(this.timer);
          this.qrCode = "";
          this.loading = true;
          this.qrLogin();
        } else if (newVal === 801) {
          this.loading = false;
        } else if (newVal === 803) {
          this.loginStatus();
          this.$message.success({
            message: "授权登录成功",
          });
          this.dialogVisible = false;
        }
      },
      immediate: true,
    },
   
  },
  methods: {
    logout() {
      logout().then(() => {
        this.userInfo = {
          userId: 0,
          nickname: "未登錄",
          avatarUrl:
            "http://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          backgroundUrl: "",
        };
      });
      this.login_status = false;
    },

    loginStatus() {
      login("/status").then((response) => {
        if (response.data.data.account) {
          this.login_status = true;
          let obj = response.data.data.profile;
          Object.keys(this.userInfo).forEach((key) => {
            this.userInfo[key] = obj[key];
          });
        } else this.login_status = false;
      });
    },
    qrLogin() {
      let key;
this.code=800
      login("/qr/key")
        .then((response) => {
          this.key = response.data.data.unikey;
        })
        .then(() => {
          login("/qr/create", { key, qrimg: "true" })
            .then((response) => {
              this.qrCode = response.data.data.qrimg;
            })
            .then(() => {
              if(this.dialogVisible)
              this.timer=setInterval(()=>{
                 this.check();
              },1000)             
            });
        });
    },

    check() {
      login("/qr/check", { key: this.key }).then((response) => {
        this.loading = false;
        this.code = response.data.code;
      });
    },
    login() {
      if (this.login_status) {
        return;
      } else {
        this.qrLogin();
        this.dialogVisible = true;
      }
    },
    handleClose() {
      this.dialogVisible = false;
    },
  },
  beforeCreate() {
    login("/status").then((response) => {
      if (response.data.data.account) {
        this.login_status = true;
        let obj = response.data.data.profile;
        Object.keys(this.userInfo).forEach((key) => {
          this.userInfo[key] = obj[key];
        });
      } else this.login_status = false;
    });
  },
};
</script>

<style scoped>
.el-menu {
  height: 100%;

  overflow-x: hidden;
}
.el-menu span {
  font-size: 17px;
  padding-left: 10px;
  padding-right: 95px;
}
.user {
  margin: 60px 0 15px 0;

  line-height: 50px;
  color: #777f86;
}

.user img {
  border-radius: 100%;
}
.qr {
  padding: 40px;
  font-size: 13px;
  line-height: 30px;
  text-align: center;
}
.el-skeleton__item::before {
  margin: 50px;
  line-height: 180px;
  cursor: pointer;
}

.user_info {
  position: relative;
  top: -56px;
  left: 180px;
  height: 0px;
  display: block;
  width: 10px;
  padding: 0 !important;
}
</style>
