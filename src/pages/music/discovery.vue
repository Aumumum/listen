<template>
<div> 
  <Carousel/>
  <SongList :style="{maxHeight:'265px'}"/>
  <h3>新歌速递</h3>
  <Newest :limit='10' :style="{minHeight:'550px'}"/>

</div>
</template>

<script>
import Carousel from '../../components/carousel.vue'
import SongList  from '../../components/songList.vue'
import Newest from './newest.vue'
export default {
  name: "discovery",
 components:{Carousel,SongList,Newest}
}
</script><style></style>