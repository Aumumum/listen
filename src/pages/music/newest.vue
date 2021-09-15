<template>
<PlayList  :tbData="tbData"/>
</template>

<script>
import PlayList from '../../components/playList.vue'
import { getAlbum } from "../../api";
export default {
  name: "newest",
  components:{PlayList},
  props:['limit'],
  data() {
    return {
      tbData:[],
    };
  },
  methods: {
    timeFormt(value) {
      value = Math.ceil(value / 1000);
      let m = parseInt(value / 60);
      let s = value % 60;
      if (s < 10) s = "0" + s;
      return m + ":" + s;
    },
    loadAll() {
      getAlbum().then((response) => {
        let arr = response.data.data
        if(this.limit) arr=arr.splice(0,this.limit)
          this.tbData = arr.map((item, index) => {
          return Object.assign({
            serial: index < 9 ? "0" + (index + 1) : index + 1,
            title: item.alias.length
              ? item.name + "（" + item.alias + "）"
              : item.name,
            pop: item.popularity,
            singer: item.artists[0].name,
            album: item.album.name,
            duration: item.duration,
            formTime: this.timeFormt(item.duration),
            id: item.id,
            picUrl: item.album.picUrl,
          
        }); 
       })
      });
    },
  },
  mounted() {
    this.loadAll();
  },
};
</script>
<style></style>
