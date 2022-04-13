<template>

  <div class="foot-container">
    <div class="author"><span class="">@YAOYAO二手商城</span>
      <el-divider></el-divider>
      <el-link href="https://www.tsu.edu.cn/" target="_blank">让你发现生活中的乐趣~</el-link>
      <<!--div style="height: 50px">
        <el-progress type="circle" :percentage="0"></el-progress>
        <el-progress type="circle" :percentage="25"></el-progress>
        <el-progress type="circle" :percentage="100" status="success"></el-progress>
        <el-progress type="circle" :percentage="70" status="warning"></el-progress>
        <el-progress type="circle" :percentage="50" status="exception"></el-progress>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "Foot"
}
</script>

<style scoped>
.foot-container {
  width: 100%;
  display: flex;
  justify-content: center;
  height: 40px;
  padding-top: 10px;
}

.author {
  color: #999999;
  font-size: 14px;
}
</style>
