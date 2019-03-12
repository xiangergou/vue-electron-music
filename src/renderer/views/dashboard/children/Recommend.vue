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
        <ul class="hot-select__ul">
            <li v-for="(item, i) in personalized" :key="i">
              <span>
                <img :src="item.picUrl" alt="">
              </span>
              <p>{{item.name}}</p>
          </li>
        </ul>
      </div>
    </article>

    <article class="recommend__select">
      <h2>个性化推荐</h2>
      <div class="select-list">
        <ul class="recommended-select__ul">
          <li v-for="(item, index) in resource" :key="index">
              <div class="recommended-select__li">
                <span>
                  <img :src="item.picUrl" alt="">
                </span>
                <div class="recommended-select__text">
                  <strong>{{item.name}}</strong>
                  <span>{{item.copywriter}}</span>
                </div>
              </div>
          </li>
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
    this.$store.dispatch('getNewCourier', { type: 0 }).then(res => {
      this.musicList = res.data.slice(0, 20)
    })
    this.$store.dispatch('getPlayList').then(res => {
      this.personalized = res.result.slice(0, 8)
    })
    this.$store.dispatch('getResource').then(res => {
      this.resource = res.recommend.slice(0, 4)
    })
  }
}
</script>

<style lang="scss" scoped>
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
    overflow: auto;
    text-align: left;
    box-sizing: border-box;
    h2{
      border-bottom: 3px solid #ccc;
      display: inline-block;
      height: 25px;
      padding: 0 3px;
      font-size: 17px;
      font-weight: 600;
    }
    .select-list{
      box-sizing: border-box;
      border-top: 1px solid #ccc;
      text-align: left;
      .hot-select__ul{
        margin-top: 20px;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li{
          border-radius: 3px;
          width: 150px;
          margin-bottom: 20px;
          overflow: hidden;
          img{
            width: 100%;
          }
          p{
            margin-top: 5px;
            line-height: 20px;
            font-size: 14px;
          }
        }
      }
      .recommended-select__ul{
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        li{
          width: 50%;
          .recommended-select__li{
            display: flex;
            margin-bottom: 20px;
            img{
              width: 125px;
              height: 125px;
              border-radius: 5px;
              overflow: hidden;
            }
            .recommended-select__text{
              flex: 1;
              box-sizing: border-box;
              white-space:normal;
              word-break:break-all;
              word-wrap: break-word;
              padding: 20px 30px;
            }
          }
        }
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