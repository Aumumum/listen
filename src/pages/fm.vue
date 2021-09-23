<template>
  <div style="width:100%">
<div style="width:100%">222</div>
<div v-if="blank" class="blank"></div>
  </div>
</template>

<script>
import { personal_fm } from "../api";
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      blank:true,
      song: [{id:0,
      title:'',
singer:'',
duration:0,
 picUrl:'',
url:'',
      }],
      };

  },
  watch: {
    playingIndex: {
      handler(newVal,oldVal) {

        if(!oldVal){
  setTimeout(()=>{
  this.pushAll(this.song);
  },2000)}
        if(newVal===this.song.length){
  this.get_fm();
  
  }
else if(oldVal%this.playList.length===0)  {
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
  beforeMount(){
  this.get_fm();

  },
  mounted() {
    setTimeout(()=>{
       if (!this.$store.state.login_status) {
      this.$message.warning({
        message: "私人FM需要登陆，并且打开个性化服务",
      });
    }
    else this.blank=false
    },1500)

  },
};
</script>
<style scoped>
  .blank{
    position:fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background: white;;
  }
  
</style>