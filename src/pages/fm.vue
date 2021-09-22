<template>
  <div></div>
</template>

<script>
import { personal_fm } from "../api";
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      
      song: [],
      };

  },
  watch: {
    playingIndex: {
      handler(newVal,oldVal) {
        if(newVal===this.song.length){
          console.log(1);
  this.get_fm();
  setTimeout(()=>{
  console.log(this.song);

  },1000)
  }
else if(oldVal%this.playList.length===0)  {
console.log(2);
          this.pushAll(this.song);}
        
      },immediate:true
      
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
    ...mapMutations("playerAbout", ["pushAll"]),

    get_fm() {
      personal_fm().then((response) => {
        this.song = [];
        let obj = response.data.data;
        this.song = obj.map((item) => {this.timeout+=item.duration
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
  mounted() {
    setTimeout(()=>{
       if (!this.$store.state.login_status) {
      this.$message.warning({
        message: "私人FM需要登陆，并且打开个性化服务",
      });
      this.$router.go(-1);
    }
    },5000)

  },
};
</script>
