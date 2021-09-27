<template>
  <div>
    <div
      v-if="isFull"
      class="ad animate__animated animate__bounceInDown "
      :style="{ backgroundImage: 'url(' + highquality.coverImgUrl + ')' }"
    >
      <el-skeleton :rows="6" :loading="loading" animated>
        <template :rows="6" slot="template">
          <el-skeleton-item
            :rows="6"
            variant="image"
            style="width: calc(100vw * 0.122); height: calc(100vw * 0.122);"
          />
        </template>

        <template>
          <img
            class="dis"
            :src="highquality.coverImgUrl"
            lazy
            alt="精品歌单封面图片"
          />
        </template>
      </el-skeleton>
      <span class="di">
        <span class="top" @click="goPlay(highquality.id)">
          <i class="el-icon-medal-1" style="paddingRight:10px" />精品歌单
        </span>
        <h2>{{ highquality.name }}</h2>
        <span>{{ highquality.copywriter }}</span></span
      >

      <div class="tag animate__animated  animate__fadeIn ">
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
    </div>
    <h3 class="animate__animated  animate__fadeIn">
      {{ songList.title }}
    </h3>
    <el-row :gutter="15">
      <el-col v-for="item in songList.list" :key="item.id" :span="4">
        <el-card
          class="duck animate__animated animate__flipInX"
          shadow="hover"
          :body-style="{ padding: '0px' }"
          :title="item.name"
        >
          <img
            @click="goPlay(item.id)"
            :src="item.picUrl"
            lazy
            alt="歌单封面"
          />
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
import { getList, getTags, getHighquality } from "../api/index";
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
      loading:true,
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
    
    stateChange: {
      handler() {
        this.listChange();
      },
    },
    immediate: true,
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

   
    listChange() {
       getHighquality({
        limit: 1,
        cat: this.cat,
      }).then((response) => {
        let obj = response.data.playlists[0];
        Object.keys(this.highquality).forEach((key) => {
          this.highquality[key] = obj[key];
        });
        this.loading=false
      });
      getList({
        limit: this.isFull ? this.songList.limit : 6,
        offset: this.offset,
        cat: this.cat,
      }).then((response) => {
        let arr = response.data.playlists;
        let obj = {};
        arr = arr.reduce(function(a, b) {
          obj[b.id] ? "" : (obj[b.id] = true && a.push(b));
          return a;
        }, []);
        this.songList.list = arr.map((item) => {
          return Object.assign({
            id: item.id,
            picUrl: item.coverImgUrl,
            name: item.name,
          });
        });
      });
    },
    goPlay(id) {
      this.$router.push({
        path: "/list/detail",
        query: {
          id,
        },
      });
    },
  },
  beforeMount() {

      this.listChange();
   

    getTags().then((response) => {
      this.tags = response.data.tags.slice(0, 9);
    });
  },
};
</script>

<style scoped>
.ad {
  display: -webkit-flex; /* Safari */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 25px;
  background-size: 21000px 21000px;
  border-radius: 0.5em;
  color: #fff;
  font-size: 14px;
}
.dis {
  min-width: 100px;
  min-height: 100px;
}
.di {
  padding-top: 8px;
  padding-left: 18px;
  white-space: nowrap;
  overflow: hidden;
}
.top {
  color: #d3b301;
  box-sizing: border-box;
  border: 1px #d3b301 solid;
  padding: 7px 12px;
  border-radius: 2em;
  cursor: pointer;
}
.tag {
  margin-left: 85px;
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  position: absolute;
  color: #424242ab;
  font-size: 8px;
  right: 20px;
  bottom: -43px;
}
.duck {
  box-sizing: border-box;
}
.duck::before {
  width: 100%;
  height: 100%;
  position: absolute;
  content: "play";
  line-height: 180px;
  font-weight: 800;
  border: 2px solid transparent;
  color: snow;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(1px) Saturate(1080%);
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
}
.duck:hover::before {
  opacity: 1;
  pointer-events: none;
}
.active {
  text-orientation: right;
  font-size: 12px;
  background: #dfd9b7;
  color: #d3b301;
}
h3 {
  display: inline-block;
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
.duck {
  width: calc(100vw * 0.122);
  height: calc(100vw * 0.122);
}
img {
  height: calc(100vw * 0.122);
  cursor: pointer;
}
</style>
