<template>
  <SongList :isFull='true'/>
</template>

<script>
import SongList from '../../components/songList';

export default {
  name: "list",
  components:{SongList}
};
</script>
