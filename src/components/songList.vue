<template>
  <div>
    <el-row
      v-if="isFull"
      class="ad animate__animated animate__bounceInDown"
      :style="{ backgroundImage: 'url(' + highquality.coverImgUrl + ')' }"
    >
      <el-col :span="4">
        <img :src="highquality.coverImgUrl" lazy alt="精品歌单封面图片" />
      </el-col>
      <el-col class="dis" :span="20">
        <span class="top" @click="goPlay(highquality.id)">
          <i class="el-icon-medal-1" style="paddingRight:10px" />精品歌单
        </span>
        <h1>{{ highquality.name }}</h1>
        <span>{{ highquality.copywriter }}</span>
      </el-col>
      <div class="tag animate__animated  animate__fadeIn animate__delay-1s">
        <span v-for="(tag, index) in tags" :key="index">
          <span
            class="item "
            :class="{ active: index === tags.isActive }"
            @click="handel(index, tag.name)"
          >
            {{ tag.name }}
          </span>
        </span>
      </div>
    </el-row>
    <h3 class="animate__animated  animate__fadeIn animate__delay-1s">
      {{ songList.title }}
    </h3>
    <el-row :gutter="15">
      <el-col v-for="item in songList.list" :key="item.id" :span="4">
        <el-card
          class="animate__animated animate__flipInX"
          shadow="hover"
          :body-style="{ padding: '0px' }"
        >
          <img @click="goPlay(item.id)" :src="item.picUrl" lazy alt="歌单封面" />
          <div class="dog">
            <span @click="goPlay(item.id)">{{ item.name }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div
      v-show="isFull"
      class="block animate__animated  animate__fadeIn animate__delay-2s"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[18, 30, 42, 60]"
        :page-size="18"
        :current-page="songList.pagination"
        layout="total, sizes, prev, pager, next, jumper"
        :total="1200"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getList, getTags, getHighquality, getSongs } from "../api/index";
export default {
  name: "songList",
  data() {
    return {
      tags: { isActive: -1 },
      highquality: {
        coverImgUrl: "",
        name: "",
        copywriter: "",
        id: "",
      },
      songList: { limit: 18, pagination: 1, title: "推荐歌单", list: [] },
    };
  },
  props: ["isFull"],
  computed: {
    offset() {
      return (this.songList.pagination - 1) * this.songList.limit;
    },
    cat() {
      return this.songList.title === "推荐歌单" ? "全部" : this.songList.title;
    },
    stateChange() {
      const { limit, pagination, title } = this.songList;
      return { limit, pagination, title };
    },
  },
  watch: {
    "songList.title": {
      async handler() {
        await this.loadALl();
      },
      immediate: true,
    },
    stateChange: {
      handler() {
        this.listChange();
      },
    },
  },
  methods: {
    handel(index, name) {
      this.tags.isActive = index;
      this.songList.title = name;
      this.songList.pagination = 1;
    },
    handleSizeChange(val) {
      this.songList.limit = val;
    },
    handleCurrentChange(val) {
      this.songList.pagination = val;
    },
  
    loadALl() {
      getHighquality({
        limit: 1,
        cat: this.cat,
      }).then((response) => {
        let obj = response.data.playlists[0];
        Object.keys(this.highquality).forEach((key) => {
          this.highquality[key] = obj[key];
        });
      });
    },
    listChange() {
      getList({
        limit: this.isFull ? this.songList.limit : 12,
        offset: this.offset,
        cat: this.cat,
      }).then((response) => {
        let arr = response.data.playlists;
        this.songList.list = arr.map((item) => {
          return Object.assign({
            id: item.id,
            picUrl: item.coverImgUrl,
            name: item.name,
          });
        });
      });
    },
    async goPlay(id) {
    await  getSongs({ id }).then((response) => {
      console.log(response.data.playlist.id)
        this.$store.state.trackIds = response.data.playlist.trackIds;
        this.$router.push({
          path: "/newest",
          query: {
            q: "list",
            id,
          },
        });
      });
    },
  },
  beforeMount() {
    this.listChange()
    getTags().then((response) => {
      this.tags = response.data.tags.slice(0, 9);
    });
  },
};
</script>

<style scoped>
.ad {
  position: relative;
  background-size: 21000px 21000px;
  padding-top: 20px;
  padding-left: 50px;
  border-radius: 0.5em;
  color: #fff;
  font-size: 14px;
}
.dis {
  padding-left: 28px;
  margin-top: 45px;
}
.top {
  color: #d3b301;
  box-sizing: border-box;
  border: 1px #d3b301 solid;
  padding: 7px 12px;
  border-radius: 1.5em;
  cursor: pointer;
}
.tag {
  position: absolute;
  color: #424242ab;
  font-size: 8px;
  
  right: 20px;
  bottom: -35px;
}
.active {
  text-orientation: right;
  font-size: 12px;
  background: #dfd9b7;
  color: #d3b301;
}
.item {
  margin-right: 10px;
  padding: 3px 9px;
  border-radius: 1.5em;
  cursor: pointer;
}
.el-col {
  margin-bottom: 20px;
}

img {
  cursor: pointer;
  width: 196px;
  min-height: 196px;
}
.dog {
  cursor: pointer;
  overflow: visible;
  padding: 9px;
  height: 35px;
}
</style>
