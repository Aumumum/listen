<template>
  <div>
    <div class="block  ">
      <el-carousel :interval="5000" height="290px">
        <el-carousel-item
          class="animate__animated  animate__fadeIn"
          v-for="pic in imageUrl"
          :key="pic"
          :style="{ backgroundImage: 'url(' + pic + ')' }"
        >
          <img v-show="true" :src="pic" alt="404" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { getBanner } from "../api/index";
export default {
  name: "carousel",
  data() {
    return {
      imageUrl: [],
    };
  },
  beforeMount() {
    this.getPic();
  },
  methods: {
    getPic() {
      getBanner().then((response) => {
        var arr = response.data.banners;
        this.imageUrl = arr.map((item) => {
          return item.imageUrl;
        });
      });
    },
  },
};
</script>

<style >
.el-carousel__item {
  background-size: 25000px 26000px;
  opacity: 0.8;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
img {
  max-height: 100%;
  max-width: 100%;
}
</style>
