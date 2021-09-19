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
        <li
          role="menubar"
          class="el-menu-item user"
          @click="
            login();
            qrLogin();
          "
        >
          <i>
            <img
              class="demo-avatar demo-basic"
              :src="userInfo.avatarUrl"
              alt="用戶頭像"
            />
          </i>
          <span>{{ userInfo.nickname }}</span>
          <el-popover class="setting" placement="bottom-end" trigger="hover">
            <span
              ><i class="el-icon-switch-button"></i
              ><span style="paddingLeft:10px">退出登錄</span></span
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
      :visible.sync="dialogVisible"
      width="300px"
      :before-close="handleClose"
    >
    h
          <el-skeleton :loading="loading" animated>
            <template slot="template">
              <div @click="qrLogin">
                <el-skeleton-item
                  variant="caption"
                  style="width: 180px; height: 180px;"
                />
              </div>
            </template>
            <template>
              <img width="180" height="180" :src="qrCode" alt="" />
            </template>
          </el-skeleton>
        
    </el-dialog>
  </el-aside>
</template>

<script>
import { callPhone,refresh, qr } from "../api";
export default {
  name: "navMeau",
  props: ["isCollapse", "isMobile"],
  computed: {
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
      qrCode: "",
    };
  },
  methods: {
     a() {
      callPhone({ phone: "17779600797", password: "wasd1234" }).then(
        (response) => {
          let obj = response.data.profile;
          console.log(response);
          Object.keys(this.userInfo).forEach((key) => {
            this.userInfo[key] = obj[key];
          }).then(()=>{
             refresh().then((res)=>{
        console.log(res)
      })
          });
        }
      );
    }, 
    qrLogin() {
      let key;
      qr("/key")
        .then((response) => {
          key = response.data.data.unikey;
        })
        .then(() => {
          qr("/create", { key, qrimg: "true" })
            .then((response) => {
              this.qrCode = response.data.data.qrimg;
              console.log(this.qrCode);
            })
            .then(() => {
              let code;
              const timer = setInterval(() => {
                qr("/check", { key }).then((response) => {
                  this.loading = false;
                  code = response.data.code;
                  if (!this.dialogVisible) clearInterval(timer);
                  else if (code === 803) {
                    clearInterval(timer);
                    this.$message.success({
                      message: "授权登录成功",
                    });

                    this.dialogVisible = false;
                  } else if (code === 800) {
                    clearInterval(timer);
                    if (this.dialogVisible) {
                      this.$message.warning({
                        message: "二维码过期",
                      });
                    }
                    this.loading = true;
                    this.qrCode = "";
                  }
                });
              }, 1000);
            });
        });
    },
    login() {
      refresh().then((res)=>{
        console.log(res)
      })
      this.dialogVisible = true;
     
      
    },
    handleClose() {
      this.dialogVisible = false;
    },
  },
  mounted() {
    this.login();
    this.a()
  },
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
.user {
  margin: 60px 0 15px 0;

  line-height: 50px;
  color: #777f86;
}

.user img {
  border-radius: 100%;
}
.el-skeleton__item::before {
  font-size: 20px;
  color: #0000f073;
  margin: 20px;
  line-height: 120px;
  cursor: pointer;
  content: "点击刷新";
}
.el-col{
  height: 120px;
}
.fx{
  height: 120px;
  width: 0;
  border-right: 1px solid gainsboro;
}
.setting {
  position: relative;
  top: -56px;
  left: 180px;
  height: 0px;
  display: block;
  width: 10px;
  padding: 0 !important;
}
</style>
