<template>
    <el-row type="flex"  justify="end">
      <el-col :span="16">
        <Tages/>
      </el-col>
      <el-col :span="8" >
        <Search/>
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
  min-width: 900px;
}

</style>
