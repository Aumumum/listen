<template>
  <el-row
    v-show="this.playList.length"
    class="player"
    type="flex"
    justify="space-around"
    align="middle"
    :gutter="90"
  >
    <audio ref="audio" autoplay>
      <source :src="url" type="audio/mp3" />
    </audio>
    <el-slider
      class="time animate__animated animate__slideInLeft"
      v-model="progress"
      :stroke-width="26"
      :show-tooltip="false"
      @change="changeProgress"
    ></el-slider>
    <el-col :span="4">
      <div class="cover">
        <div class="image">
        <img :src="picUrl" />
        </div>
        <span> {{ playList[playingIndex].title }}</span>
        <span class="small">
          {{ playList[playingIndex].singer }}
        </span>
      </div>
    </el-col>
    <el-col :span="14">
      <div class="contorl">
        <div class="animate__animated animate__flipInX">
          <el-popover
            placement="top-start"
            width="300"
            trigger="hover"
            content="列表为空"
            title="正在播放"
          >
            <el-table
              v-show="playList[0]"
              :data="playList"
              style="width: 100%"
              height="350px"
              :show-header="false"
              @row-dblclick="rowDblclick"
            >
              <el-table-column width="220">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.title }}</span>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <el-button
                    style="margin-right: -90px"
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    @click="handleDelete(scope.$index, scope.row)"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
            <i slot="reference" class="el-icon-s-unfold mid"></i>
          </el-popover>
          <i
            class="mid el-icon-d-arrow-left"
            title="后退两秒"
            @click="setCurrentTime = currentTime - 2"
          ></i>
          <span class="small duration">{{ currentTimeForm }}</span>
          <i
            class="el-icon-caret-left"
            title="上一首"
            @click="changePlayingIndex(playingIndex - 1)"
          ></i>
          <i
            :class="playBtn"
            @click="isPlaying = !isPlaying"
          ></i>
          <i
            class="el-icon-caret-right"
            title="下一首"
            @click="changePlayingIndex(playingIndex + 1)"
          ></i>
          <span class="small duration">{{ durationTimeForm }}</span>
          <i
            class="mid el-icon-d-arrow-right"
            title="快进两秒"
            @click="setCurrentTime = currentTime + 2"
          ></i>
          <i class="mid el-icon-star-off"></i>
        </div>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="setting">
        <el-slider v-model="volume" :stroke-width="26"></el-slider>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
  name: "player",
  data() {
    return {
      playBtn:'el-icon-video-play',
      url: "",
      picUrl: "",
      audio: null,
      volume: 50,
      progress: 0,
      currentTime: 0,
      duration: 0,
      setCurrentTime: 0,
      currentTimeForm: "0:00",
      durationTimeForm: "0:00",
    };
  },
  watch: {
    currentTime(newVal) {
      this.progress = (newVal / this.duration) * 100;
      this.currentTimeForm = this.timeFormt(newVal);
    },
    setCurrentTime(newVal) {
      if (newVal) this.audio.currentTime = newVal;
    },
    volume(newVal) {
      this.audio.volume = newVal / 100;
    },
    isPlaying:{
      handler(newVal) {
      this.$nextTick(() => {
        if (newVal) {
          this.playBtn='el-icon-video-pause'
          this.audio.play();
        } else{ 
           this.playBtn='el-icon-video-play'
          this.audio.pause();
        
        }
      });},
    },
    playingIndex: {
      handler(newVal) {
        if (newVal === this.playList.length) this.changePlayingIndex(0);
        else if (newVal < 0) this.changePlayingIndex(this.playList.length - 1);
        if (this.playList.length) {
          this.url = this.playList[newVal].url;
          this.picUrl = this.playList[newVal].picUrl;
        }
        this.$nextTick(() => {
          this.isPlaying = true;
          this.audio.load();
          this.audio.play();
        });
      },
      immediate: true,
    },
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

  methods: {
    ...mapMutations("playerAbout", ["changePlayingIndex"]),
    timeFormt(value) {
      value = Math.ceil(value * 1);
      let m = parseInt(value / 60);
      let s = value % 60;
      if (s < 10) s = "0" + s;
      return m + ":" + s;
    },
    changeProgress(val) {
      this.setCurrentTime = (val / 100) * this.duration;
    },
    handleDelete(row) {
      this.playList.splice(row, 1);
      if (this.playingIndex > row)
        this.changePlayingIndex(this.playingIndex - 1);
      if (row === this.playList.length) this.changePlayingIndex(0);
    },
    rowDblclick(row) {
      let index = this.playList.findIndex((val) => {
        return val.id === row.id;
      });
      this.changePlayingIndex(index);
    },
    makerAudio() {
      this.audio = this.$refs.audio;
      this.audio.addEventListener("canplay", () => {
        this.duration = this.audio.duration;
        this.durationTimeForm = this.timeFormt(this.duration);
      });
      this.audio.addEventListener("timeupdate", () => {
        this.currentTime = this.audio.currentTime;
      });

      this.audio.addEventListener("ended", () => {
        this.changePlayingIndex(this.playingIndex + 1);
        console.log("fangwanle");
      });
    },
  },
  mounted() {
    this.makerAudio();
  },
};
</script>

<style scoped>
.player {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 60px;
  min-width: 960px;
  background-color: rgba(204, 127, 127, 0.5);
  -webkit-backdrop-filter: saturate(180%) blur(40px);
  backdrop-filter: saturate(180%) blur(40px);
  color: #fffffff1;
  letter-spacing: 1.5px;
  font: small-caps bold 16px sans-serif;
  box-sizing: content-box;
  border-top: 8px solid transparent;
  z-index: 99;
}
.player /deep/ .el-slider__button {
  box-sizing: border-box;
  border: 3px solid #cc7f7f9c;
  opacity: 0;
}
.player /deep/ .el-slider__button:hover {
  opacity: 1;
}
.player /deep/ .el-slider__bar {
  background-image: linear-gradient(to right, #ff0844 0%, #ffb199 100%);
  height: 4px;
}
.player /deep/ .el-slider__runway {
  background-color: rgba(204, 127, 127, 0.315);
  height: 4px;
}
.player /deep/ .el-slider__button-wrapper {
  top: -16px;
}
.small {
  font-size: 12px;
  color: #cd7272;
}
.mid {
  position: relative;
  top: -8px;
  padding: 0 10px;
  font-size: 27px;
}
i {
  color: #cca8a8ee;
}
i:hover {
  color: #fff;
}
.duration {
  padding: 0 10px;
  position: relative;
  top: -13px;
}
.time {
  position: absolute;
  top: -24px;
  width: 100%;
}
.cover {
  height: 50px;
  width: 100%;
  min-width: 200px;
  background-image: url(../static/cddisk.png);
  background-size: 50px;
  background-repeat: no-repeat;
  line-height: 24px;
  padding: 0 auto;
}
.image {
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 5px;
}
.image img{
  border-radius:inherit;
}
.cover span {
  position: relative;
  top: -50px;
  white-space: nowrap;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 24px;
  width: 180px;
  text-align: start;
  margin-left: 65px;
  margin-top: -20px;
}
.contorl {
  text-align: center;

  font-size: 50px;
}
i {
  cursor: pointer;
}
.active {
  cursor: not-allowed;
  color: rgb(185, 8, 8);
  background: aquamarine;
}
</style>
