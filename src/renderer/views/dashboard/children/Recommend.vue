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
            <li v-for="(item, i) in personalized" :key="i">
            {{item.name}}
          </li>
        </ul>
      </div>
    </article>

    <article class="recommend__select">
      <h2>个性化推荐</h2>
      <div class="select-list">
        <ul>
          <li v-for="(item, index) in resource" :key="index">{{item.name}}</li>
        </ul>
      </div>
    </article>

    <article class="recommend__select">
      <h2>新歌速递</h2>
      <div class="select-list">
        <el-row>
          <el-col :span="12" v-for="(item, i) in musicList" :key="i" class="musicItem">
            {{i+1}} &nbsp; {{item.name}}
          </el-col>
        </el-row>
        <!-- <ol>
          <li v-for="(item, i) in musicList" :key="i">
            {{item.name}}
          </li>
        </ol> -->
      </div>
    </article>

  </div>
</template>

<script>
export default {
  name: 'recommend',
  data () {
    return {
      banners: [],
      musicList: [],
      personalized: [],
      resource: [] // 个人推荐
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
    // this.$store.dispatch('getUserSongList').then(res => {
    //   console.log(res, 'res')
    // })
    this.$store.dispatch('getNewCourier', { type: 0 }).then(res => {
      this.musicList = res.data
    })
    this.$store.dispatch('getPlayList').then(res => {
      this.personalized = res.result
    })
    this.$store.dispatch('getResource').then(res => {
      console.log(res)
      this.resource = res.recommend
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
  .recommend__select{
    width: 100%;
    height: 330px;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    border: 1px solid #ccc;
    box-sizing: border-box;
    ol{
      width: 100%;
      padding: 0;
      li{
        display: inline-block;
        width: 50%;
        margin: 0;
        padding: 0;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        box-sizing: border-box;
      }
    }
    .musicItem{
      height: 20px;
      line-height: 20px;
      text-align: left;
      font-size: 13px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
 
</style>