<template>
  <div class="recommend__wrapper">
    <header>
      <el-carousel :interval="8000" type="card" height="175px">
        <el-carousel-item v-for="(item, i) in banners" :key="i">
          <img :src="item.imageUrl" alt="">
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
  name: 'recommend',
  data () {
    return {
      banners: []
    }
  },
  methods: {
    getBanners () {
      this.$store.dispatch('getBanner').then(() => {
        this.banners = this.$store.state.Dashboard.bannerImgList
      })
    }
  },
  mounted () {
    this.getBanners()
    this.$store.dispatch('getNewCourier', { type: 0 }).then(res => {
    })
  }
}
</script>

<style lang="scss">
.recommend__wrapper{
  padding: 0 30px;
  box-sizing: border-box;
  max-width: 1150px;
  margin: 0 auto;
  .el-carousel__item img {
    width: 100%;
    height: 100%;;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
}
 
</style>