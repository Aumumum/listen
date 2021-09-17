<template>
  <el-table
    append
    stripe
    height="100%"
    highlight-current-row
    :row-class-name="tableRowClassName"
    :data="tbData"
    plain
    @row-dblclick="handleRow"
  >
    <el-table-column
    fixed
      prop="serial"
      label=""
      width= 80
    >
    </el-table-column>

    <el-table-column
    fixed

      prop="title"
      label="音乐标题"            
      width= 350
    >
    </el-table-column>

    <el-table-column
      prop="pop"
      label="热度"
      width= 100
    >
    </el-table-column>
    
    <el-table-column

      prop="singer"
      label="歌手"
      width= 280
    >
    </el-table-column>
    
    <el-table-column
      prop="album"
      label="专辑"
      width= 300
    >
    </el-table-column>
    
    <el-table-column
      prop="formTime"
      label="时长"
      width= 80
    >
    </el-table-column>
  </el-table>
</template>

<script>
import { mapActions } from "vuex";
import { mapMutations } from "vuex";
import { mapState } from "vuex";
export default {
  name: "playList",
  props: ['tbData'],
  computed: {
    ...mapState("playerAbout", ["isPlaying", "playingIndex"]),
  },
  methods: {
    ...mapActions("playerAbout", ["pushSong"]),
    ...mapMutations("playerAbout", ["changePlayingIndex"]),
    
    tableRowClassName() {
      return "hot animate__animated animate__flipInX animate__delay-.5s";
    },
    
    handleRow(row) {
      let obj = Object.assign(
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
        });
        this.changePlayingIndex(this.playingIndex + 1);
      } else if (this.$store.state.playerAbout.playList.includes(obj))

        this.$message.warning({
          message: "添加列表成功，下一首播放",
    
        });
      else
        this.$message.error({
          message: "歌曲已存在",
        });
    },
  },
  
};
</script>
