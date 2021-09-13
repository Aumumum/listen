<template>
  <div>
    <div class="block  ">
      <el-carousel :interval="5000" :height="imgHeight">
        <el-carousel-item
          class="animate__animated  animate__fadeIn"
          v-for="pic in imageUrl"
          :key="pic"
          :style="{ backgroundImage: 'url(' + pic + ')' }"
        >
          <img  v-show="true" :src="pic" alt="" />
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
      imgHeight:'',
    };
  },

  beforeMount(){this.getPic();},
  mounted() {
    
    this.imgLoad();
    window.addEventListener('resize',this.imgLoad,false)

  },
  destroyed(){ window.addEventListener('resize',this.imgLoad,false)},
  methods: {
    imgLoad(){
      this.$nextTick(()=>{
        var w=window.innerWidth
        var h=300
        if(w>920){
          h=300
        }else{
          h=0.27*w
        }
        this.imgHeight=`${h}px`
      })
    },
    getPic() {
      getBanner().then((response) => {
        var arr = response.data.banners;
        this.imageUrl = arr.map((item) => {
          return item.imageUrl;
        }).slice(0,5);
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
