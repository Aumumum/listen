<template>
  <el-container>
    <el-main>
      <el-empty description='这里什么也没有'>
        <el-button type="primary" @click="$router.replace('/')">返回首页</el-button>
      </el-empty>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "notFound",
};
</script>

<style></style>
