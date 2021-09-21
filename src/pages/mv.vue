<template>
<div  style="width:100%">
    <video ref="video" style="width:100%;height:100%;object-fit: fill" :poster='mv.cover' :src="mv.url" controls autoplay></video>

    
 </div>
</template>

<script>
import { mapState } from "vuex";

import { top_mv, simi_mv,mv_url } from "../api";
export default {
  data() {
    return {
      mv: 
        {
          id: 0,
          name: "2",
          cover: "#.png",
      url: "#",
        },
      
      music_isPlaying:false,
      video:''
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

  methods: {
    getUrl(){
       mv_url({id:this.mv.id}).then((response)=>{
this.mv.url=response.data.data.url
console.log(this.mv.url)
        })
    },

    loadAll() {
      top_mv().then((response) => {
        let index=Math.floor(Math.random()*30)
        let arr = response.data.data[index];
       Object.keys(this.mv).forEach((key)=>{
         this.mv[key]=arr[key] 
       })
        })
        
      .then(()=>{
           this.getUrl()
      });
    },

    video_monitor(){
      this.video=this.$refs.video
      this.video.addEventListener("ended",()=>{
 simi_mv({mvid:this.mv.id}).then(response=>{
   let arr=response.data.mvs[0]
    Object.keys(this.mv).forEach((key)=>{
         this.mv[key]=arr[key] 
       })
        })
        
      .then(()=>{
           this.getUrl()
      });
      })
    }
  },
  updated(){
  },
  mounted() {
    this.music_isPlaying=this.isPlaying
    this.isPlaying = false;
    this.loadAll();
    this.video_monitor()
  },
  destroyed(){
    this.isPlaying = this.music_isPlaying
  }
};
</script>

<style scoped>
.main{
  padding: 0;
}

</style>
