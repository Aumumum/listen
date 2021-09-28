<template>
  <div style="width:100%">
    <video
      ref="video"
      style="width:100%;height:100%;object-fit: fill"
      :poster="mv.cover"
      :src="mv.url"
      muted
    ></video>
    <div v-show="!video_isPlaying" class="mvs">
      <el-row>
        <el-col v-for="item in mvs" :key="item.id" :span="8">
          <el-card class="mv" shadow="hover" :body-style="{ padding: '0px' }">
            <img :src="item.cover" fit="cover" lazy />
            <div class="info" @click="goPlay(item)">
              <h4>{{ item.name }}</h4>
              <span> {{ item.artistName }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { top_mv, simi_mv, mv_url } from "../api";
export default {
  data() {
    return {
      mv: {
        id: 0,
        name: "2",
        cover: "#.png",
        url: "#",
      },
      mvs: [],
      video_isPlaying: false,
      music_isPlaying: false,
      video: null,
    };
  },
  computed: {
    ...mapState("playerAbout", ["playList", "playingIndex"]),
    isPlaying: {
      get() {
        return this.$store.state.playerAbout.isPlaying;
      },
      set(val) {
        this.$store.state.playerAbout.isPlaying = val;
      },
    },
  },
  watch: {
    $route: {
      handler(to) {
        if (to.query.url) {
          this.video_isPlaying = true;
          this.mv.url = to.query.url;
          this.$nextTick(() => {
            this.video.controls = true;
            
this.video.play()

          });
          
        }else {
          this.video_isPlaying =false
          this.$nextTick(()=>{
            this.video.controls = false;

          })

          this.mv.url=''
        }
      },
      immediate: true,
    },
  },
  methods: {
    goPlay(obj) {
      this.mv = obj;
      this.video_isPlaying = true;
      this.$nextTick(() => {
        this.video.controls = true;
            this.video.muted = false;

        this.video.play()
      });

      this.$router.push({
        path: "/mv",
        query: {
          url: this.mv.url,
        },
      });
    },
    getUrl() {
      this.mvs.forEach((item) => {
        mv_url({ id: item.id }).then((response) => {
          item.url = response.data.data.url;
        });
      });
    },
    loadAll() {
      top_mv()
        .then((response) => {
          this.mvs = response.data.data;
        })
        .then(() => {
          this.getUrl();
        });
    },
    video_monitor() {
      this.video = this.$refs.video;
      
      this.video.addEventListener("ended", () => {
        this.video.controls = false;
        simi_mv({ mvid: this.mv.id })
          .then((response) => {
            this.mvs = response.data.mvs;
          })
          .then(() => {
            this.getUrl();
            this.video_isPlaying = false;
          });
      });
    },
  },
  mounted() {
    this.music_isPlaying = this.isPlaying;
    this.isPlaying = false;
    this.loadAll();
    this.video_monitor();
  },
  destroyed() {
    this.isPlaying = this.music_isPlaying;
  },
};
</script>

<style scoped>
.main {
  padding: 0;
}
.mvs {
  position: absolute;
  top: 0;
  
  opacity: 0.9;
  height: 100%;
  overflow-y: scroll;
  z-index: 999;
}
.mv {
  position: relative;
  margin: 20px;
  background: transparent;
  border: none;
  height: calc(100vw * 0.14);
}
.info {
  position: absolute;
  color: #fff;
  left: 0;
  top: 0;
  padding-left: 15px;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
}
.info:hover {
  opacity: 1;
}
</style>
