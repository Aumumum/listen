<template>
  <el-autocomplete
    v-model="state"
    :fetch-suggestions="querySearchAsync"
    placeholder="请输入内容"
    @select="handleSelect"
  ></el-autocomplete>
</template>

<script>
import { getTyping } from "../../api";
import { mapActions } from "vuex";
import { mapMutations } from "vuex";
export default {
  name: "search",
  data() {
    return {
      typeSuggest: [],
      state: "",
      timeout: 0,
    };
  },
  watch: {
    state: {
      handler(newVal) {
        if (newVal)
          getTyping({ keywords: newVal }).then((response) => {
            let arr = response.data.result.songs;
            console.log(response.data);
            this.typeSuggest = arr.map((item) => {
              return Object.assign({
                id: item.id,
                title: item.name,
                singer: item.artists[0].name,
                duration: this.timeFormt(item.duration),
                value: item.name + `（歌手: ${item.artists[0].name}）`,
              });
            });
          });
      },
    },
  },
  methods: {
    timeFormt(value) {
      value = Math.ceil(value / 1000);
      let m = parseInt(value / 60);
      let s = value % 60;
      return m + ":" + s;
    },
    ...mapActions("playerAbout", ["pushSong"]),
    ...mapMutations("playerAbout", ["changePlayingIndex"]),
    querySearchAsync(queryString, cb) {
      clearTimeout(this.timeout);
      if (queryString) this.timeout = 10000 * Math.random();
      else this.typeSuggest = [];
      this.timeout = setTimeout(() => {
        var result = this.typeSuggest;
        cb(result);
      }, this.timeout);
    },

    handleSelect(item) {
      let obj = Object.assign(
        {},
        {
          id: item.id,
          title: item.title,
          singer: item.singer,
          duration: item.duration,
          url: "https://music.163.com/song/media/outer/url?id=" + item.id,
        }
      );
      this.pushSong(obj);
      if (this.$store.state.playerAbout.playList.includes(obj))
        this.$message.success({
          message: "添加列表成功，下一首播放",
          showClose: false,
          
        });
      else
        this.$message.error({
          message: "歌曲已存在",
          showClose: false,
        });
      if (!this.$store.state.playerAbout.isPlaying)
        this.changePlayingIndex(this.$store.state.playerAbout.playingIndex + 1);
    },
  },
};
</script>

<style spoed>
.el-autocomplete {  
  line-height: 62px;
}
input[type="text"] {
  border-radius: 1.5em;
}
</style>
