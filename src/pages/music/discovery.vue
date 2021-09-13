<template>
<div>
  <Carousel/>
  <SongList />
  <h3>新歌速递</h3>
  <PlayList :limit='10' :style="{minHeight:'550px'}"/>

</div>
</template>

<script>
import Carousel from '../../components/carousel.vue'
import SongList  from '../../components/songList.vue'
import PlayList from '../../components/playList.vue'
export default {
  name: "discovery",
 components:{Carousel,SongList,PlayList}
}
</script><style></style>