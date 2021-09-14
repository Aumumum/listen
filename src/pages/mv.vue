<template>
  <div>mv</div>
</template>

<script>
import{mapState} from 'vuex' 
export default {

 computed: {
    ...mapState("playerAbout", ["playList", "playingIndex"]),
    isPlaying: {
      get() {
        return this.$store.state.playerAbout.isPlaying;
      },
      set(val) {
        this.$store.state.playerAbout.isPlaying = val;
      },
    },},
mounted(){
 this.isPlaying=false
} ,

}

</script>

<style>

</style>