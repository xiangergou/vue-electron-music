<template>
  <div class="footer-wrapper">
    <div class="footer-play__btn">
      <span>left</span>
      <span>play</span>
      <span>right</span>
    </div>
    <div class="footer-play__progress">
      <el-slider v-model="value1" class="el-sider"></el-slider>
    </div>
    <div class="footer-play__list">
      <strong>音量</strong>
      <span>模式</span>
      <span>词</span>
      <span>列表</span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'appFooter',
  value1: ''
}
</script>

<style scoped lang="scss">
.footer-wrapper{
  border-top: 1px solid #ccc;
  display: flex;
  .footer-play__btn{
    width: 200px;
    padding: 0 30px;
    box-sizing: border-box;
    display: flex;
    span{
      flex: 1;
    }
  }
  .footer-play__progress{
    flex: 1;
    height: 60px;
    .el-sider{
      margin-top: 10px;
    }
  }
  .footer-play__list{
    width: 250px;
    display: flex;
    padding: 0 20px;
    box-sizing: border-box;
    span{
      display: inline-block;
      width: 50px;
    }
    strong{
      flex-grow: 1;
    }
  }
}
</style>