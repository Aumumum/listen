<template>
  <el-table
    append
    stripe
    lazy
    height="100%"
    highlight-current-row
    :row-class-name="tableRowClassName"
    :data="tbData"
    plain
    @row-dblclick="handleRow"
  >
    <el-table-column
      v-for="item in tbCols"
      :key="item.name"
      :prop="item.name"
      :label="item.label"
      :width="item.width"
    >
    </el-table-column>
  </el-table>
</template>

<script>
import { getAlbum } from "../api";
import { mapActions } from "vuex";
import { mapMutations } from "vuex";
import { mapState } from "vuex";
export default {
  name: "playList",
  props: ["limit"],
  data() {
    return {
      tbData: [],
      tbCols: [
        {
          name: "serial",
          label: "",
          width: 80,
        },
        {
          name: "title",
          label: "音乐标题",
          width: 350,
        },
        {
          name: "pop",
          label: "热度",
          width: 100,
        },
        {
          name: "singer",
          label: "歌手",
          width: 280,
        },
        {
          name: "album",
          label: "专辑",
          width: 300,
        },
        {
          name: "formTime",
          label: "时长",
          width: 80,
        },
      ],
    };
  },
  computed: {
    ...mapState("playerAbout", ["isPlaying", "playingIndex"]),
  },
  methods: {
    ...mapActions("playerAbout", ["pushSong"]),
    ...mapMutations("playerAbout", ["changePlayingIndex"]),
    timeFormt(value) {
      value = Math.ceil(value / 1000);
      let m = parseInt(value / 60);
      let s = value % 60;
      if (s < 10) s = "0" + s;
      return m + ":" + s;
    },
    tableRowClassName() {
      return "hot animate__animated animate__flipInX animate__delay-.5s";
    },
    loadAll() {
      getAlbum().then((response) => {
        let arr = response.data.data;
        if (this.limit) arr = arr.slice(0, 10);
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
        });
      });
    },
    handleRow(row) {
      let obj = Object.assign(
        {},
        {
          id: row.id,
          title: row.title,
          singer: row.singer,
          duration: row.duration,
          picUrl: row.picUrl,
          url: "https://music.163.com/song/media/outer/url?id=" + row.id,
        }
      );
      this.pushSong(obj);
      if (!this.isPlaying) {
        this.$message.success({
          message: "正在加载，即将播放",
          showClose: false,
        });
        this.changePlayingIndex(this.playingIndex + 1);
      }
    else  if (this.$store.state.playerAbout.playList.includes(obj))
        this.$message.warning({
          message: "添加列表成功，下一首播放",
          showClose: false,
        });
      else
        this.$message.error({
          message: "歌曲已存在",
          showClose: false,
        });
    },
  },
  mounted() {
    this.loadAll();
  },
};
</script>

<style scoped>
</style>
