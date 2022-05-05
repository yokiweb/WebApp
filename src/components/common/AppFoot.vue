<template>

  <div class="foot-container">
    <div style="height:10px;margin-bottom: 25px"></div>
    <div class="author"><span class="">@YAOYAO二手商城</span>
      <br><br><br>
      <el-link href="https://www.tsu.edu.cn/" target="_blank">YAOYAO，让你的闲置动起来~</el-link>
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
  height: 80px;
  padding-top: 10px;
  background: #FFFFFF;
}

.author {
  color: #999999;
  font-size: 14px;
}
</style>
