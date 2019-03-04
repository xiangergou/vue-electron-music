<template>
  <div class="recommend__wrapper">
    <header>
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </header>
    
    <article class="recommend__select">
      <h2>热门精选</h2>
      <div class="select-list">
        <ul>
          <li></li>
        </ul>
      </div>
    </article>

    <article class="recommend__select">
      <h2>个性化推荐</h2>
      <div class="select-list">
        <ul>
          <li></li>
        </ul>
      </div>
    </article>

    <article class="recommend__select">
      <h2>新歌速递</h2>
      <div class="select-list">
        <ul>
          <li></li>
        </ul>
      </div>
    </article>

  </div>
</template>

<script>
export default {
  name: 'recommend'
}
</script>

<style lang="scss">
.recommend__wrapper{
  max-width: 1150px;
  margin: 0 auto;
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
}
 
</style>