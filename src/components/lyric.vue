<template>
  <Scroll
    style="height: calc(100%);
    
    position: relative;
    overflow: hidden;"
    ref="lyricList"
    :data="currentLyric && currentLyric.lines"
  >
    <div class="lyric-wrapper">
      <div v-if="currentLyric" 
         
      >
        <p
          ref="lyricLine"
          
          :class="{ ' animate__animated animate__fadeInUp current': currentLineNum === index }"
          v-for="(line, index) in currentLyric.lines"
          :key="index"
        >
          {{ line.txt }}
        </p>
      </div>
    </div>
  </Scroll>
</template>

<script>
import { lyric } from "../api";
import { mapState } from "vuex";
import Lyric from "lyric-parser";
import Scroll from "../plugins/bs.vue";
export default {
  components: { Scroll },
  data() {
    return {
      currentLyric: null,
      currentLineNum: 0,
    };
  },
  computed: {
    ...mapState("playerAbout", [
      "isPlaying",
      "playList",
      "currentTime",
      "playingIndex",
    ]),
  },
  watch: {
    currentLyric(newVal,oldVal){
    if(!oldVal){
      return
    }
    if(newVal)
      oldVal.stop()
      
      newVal.play()
    },
    currentTime: {
      handler(newVal, oldVal) {
        if (this.currentLyric)
          if (Math.abs(newVal - oldVal) > 0.3) {
            this.currentLyric.seek(newVal * 1000);
          }
      },
    },
    isPlaying() {
      if (this.currentLyric)
        this.$nextTick(() => {
          this.currentLyric.togglePlay();
        });
    },
    playingIndex: {
      handler(newVal) {
        if(this.playList[newVal].id)
 lyric({ id: this.playList[newVal].id })
            .then((res) => {
              this.lyric = res.data.lrc.lyric;
            })
            .then(() => {
              this.currentLyric = new Lyric(this.lyric, this.handleLyric);
            });

         
        
      },
    },
  },
  methods: {
    handleLyric({ lineNum }) {
      this.currentLineNum = lineNum;
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5];
        this.$refs.lyricList.scrollToElement(lineEl, 1000);
      } 
      else if(lineNum===0){
        this.$refs.lyricList.scrollTo(0,0,1000)
      }
    },
  },
};
</script>

<style>
.lyric-wrapper{
text-align: center;
word-spacing: 5px;
font-size: 15px;
  letter-spacing: 7px;
  padding: 100px 0;
  color: rgba(0, 0, 0, 0.76);
}
.current {
  color: red;
  font-size: 25px;
  padding: 10px;
  
}
</style>
