<template>
    <el-row v-show="!this.$store.state.isMobile" type="flex"  justify="end">
      <el-col :span="19">
        <Tages/>
      </el-col>
      <el-col  :span="5" >
        <Search v-show="!this.$store.state.isCollapse"/>
        </el-col>
    </el-row>
</template>

<script>
import Tages from "./tags"
import Search from "./search"
export default {
  name: "topBar",
  components:{
    Tages,Search
  }
};
</script>

<style>
.el-header {
  width: 100%;
}

</style>
