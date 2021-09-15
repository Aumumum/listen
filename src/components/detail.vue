<template>
  <div class="main">
    <div class="ad">
      <img :src="detail.coverImgUrl" lazy alt="歌单封面" />
      <span class="dis">
        <h2>{{ detail.name }}</h2>
        <el-button icon="el-icon-video-play" type="warning" round
          @click="playAll">播放全部</el-button
        ><br />
        <span><strong>标签：</strong>{{ detail.tags }}</span
        ><br />
        <span><strong>歌曲：</strong>{{ detail.trackCount }}</span
        >｜<span><strong>播放：</strong>{{ detail.playCount }}</span
        ><br />
        <span class="di"><strong>简介：</strong>{{ detail.description }}</span>
      </span>
    </div>
    <PlayList :tbData="tbData" />
  </div>
</template>

<script>
import { getPlaylistDetail,getSongDetail } from "../api/index";
import PlayList from "./playList.vue";

import { mapMutations } from "vuex";
export default {
  data() {
    return {
      detail: {
        name: "",
        coverImgUrl: "",
        tags: [],
        trackCount: 0,
        playCount: 0,
        description: "",
      },
      tbData: [],
    };
  },
  components: { PlayList },
  props: ["id"],
  methods: {
    
    ...mapMutations("playerAbout", ["changePlayingIndex","pushAll"]),
     timeFormt(value) {
      value = Math.ceil(value / 1000);
      let m = parseInt(value / 60);
      let s = value % 60;
      if (s < 10) s = "0" + s;
      return m + ":" + s;
    },
playAll(){
  

this.$confirm('', '该操作会清空当前播放列表，是否继续？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center:true,
          roundButton:true,
          showClose:false
        })
        .then(action => {
          if (action === 'confirm') {
            this.pushAll(this.tbData)
          }
        })

        
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消播放全部'
          });  
        })  



},
    load() {
      getPlaylistDetail({ id: this.id }).then((response) => {
        let obj = response.data.playlist;
        Object.keys(this.detail).forEach((key) => {
          this.detail[key] = obj[key];
        });
        let ids = [];
        obj.trackIds.forEach((item,index) => {
          ids[index]= item.id
        });
getSongDetail({ids:ids.toString()}).then(response=>{
   let arr = response.data.songs
          this.tbData = arr.map((item, index) => {
          return Object.assign({
            serial: index < 9 ? "0" + (index + 1) : index + 1,
            title:  item.name,
            pop: item.pop,
            singer: item.ar[0].name,
            album: item.al.name,
            duration: item.dt,
            formTime: this.timeFormt(item.dt),
            id: item.id,
            picUrl: item.al.picUrl, 
        }); 
        
       })
    console.log(this.tbData)
})
      });
    },
  },
  beforeMount() {
    this.load();
  },
};
</script>

<style scoped>
.main {
  height: 100%;
}
.ad {
  display: -webkit-flex;
  display: flex;
  color: #494747;
}
img {
  width: 180px;
  height: 180px;
  padding: 0 20px;
}
.dis {
  position: relative;
  top: -20px;
  height: 200px;
  overflow: hidden;
}
.dis:hover {
  height: auto;
  overflow: visible;
}
.dis span {
  line-height: 33px;
}

.di {
  white-space: pre-wrap;
}
</style>
