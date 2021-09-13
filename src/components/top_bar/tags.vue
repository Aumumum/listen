<template>
  <el-menu router  active-text-color='#7a7374' :default-active="this.$route.path"  mode="horizontal">
  <el-menu-item  v-for="tag in tags" :key="tag.path" :index='tag.path'>{{tag.title}}</el-menu-item>
  </el-menu>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
name:'tages',
data(){
    return{
        tags: [ 
            {path:"/",title:"个性推荐"},
            {path:"/list",title:"歌单"},
            {path:"/rank",title:"排行榜"},
            {path:"/singer",title:"歌手"},
            {path:"/newest",title:"最新音乐"}
            ],
    }
},

watch:{
   '$route.path':{
       handler(newVal){
           this.changePath(newVal)
       },
       immediate:true
   } 
},
methods:{
    ...mapMutations('routeAbout',['changePath']),

}

}
</script>

<style>

.el-menu.el-menu--horizontal {
    border-bottom: none !important ;
}
</style>