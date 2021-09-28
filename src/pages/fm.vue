<template>
  <div style="width:100%">
    <Lyric/>
    <div v-if="blank" class="blank">私人FM需要登陆，并且打开个性化服务</div>
  </div>
</template>

<script>
import { personal_fm } from "../api";
import { mapMutations, mapState } from "vuex";
import Lyric from '../components/lyric.vue'
export default {
  components:{Lyric},
  data() {
    return {
      blank: true,
      song: [
         { id: 0, title: " ", singer: "", duration: 0, picUrl: "", url: "" }, 
      ],
    };
  },
  watch: {
    login_status: {
      handler(newVal) {
        if (newVal) {
          this.blank = false;
         this.get_fm() 
          setTimeout(() => {
            this.pushAll(this.song);
            
            
          }, 2000);
        }
        else {
          this.blank=true
          this.song=[]
        }
      },immediate:true
    },
    playingIndex: {
      handler(newVal, oldVal) {
        
        if (newVal === this.song.length) {
          this.get_fm();
        } else if (oldVal % this.playList.length === 0) {
          this.pushAll(this.song)
        this.isPlaying=false
        }
      },
    },
  },
  computed: {
    ...mapState("playerAbout", ["playList", "playingIndex"]),
    login_status() {
      return this.$store.state.login_status;
    },
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
    ...mapMutations("playerAbout", ["pushAll"]),

    get_fm() {
      personal_fm().then((response) => {
        let obj = response.data.data;
        this.song = obj.map((item) => {
          this.timeout += item.duration;
          return Object.assign({
            id: item.id,
            title: item.name,
            singer: item.artists[0].name,
            duration: item.duration,
            picUrl: item.album.picUrl,
            url: "https://music.163.com/song/media/outer/url?id=" + item.id,
          });
        });
      });
    },
  },
};
</script>
<style scoped>
.blank {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: white;
  text-align: center;
  line-height: 100vh;
  font-size: 20px;
  font-weight: bolder;
  letter-spacing: 5px;
}
</style>
