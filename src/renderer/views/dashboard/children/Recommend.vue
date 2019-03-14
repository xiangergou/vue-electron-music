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
        <div class="new-courier__ul">
          <h3>播放全部</h3>
          <el-row>
            <el-col :span="12" v-for="(item, i) in musicList" :key="i" class="musicItem"
            :class="{active: ((i+1) % 4 ===0) || ((i + 1) % 4 ===3)}"
            @click.native="playMusic(item)"
            >
              <span>{{i+1}} </span>
              <span class="new-courier__text">{{item.name}}</span>
              <span>{{item.artists[0].name}}</span>
            </el-col>
          </el-row>
        </div>
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
      musicList: [], // 新歌
      personalized: [], // 热门精选
      resource: [] // 个人推荐
    }
  },
  methods: {
    async getBanners () {
      this.banners = this.$store.state.dashboard.bannerImgList.length > 1
        ? this.$store.state.dashboard.bannerImgList
        : await this.$store.dispatch('getBanner')
    },
    async getPlayList () {
      this.personalized = (this.$store.state.dashboard.personalized.result &&
        this.$store.state.dashboard.personalized.result.length > 1)
        ? this.$store.state.dashboard.personalized.result
        : await this.$store.dispatch('getPlayList')
    },
    async getResource () {
      this.resource = (this.$store.state.dashboard.userResource.recommend &&
        this.$store.state.dashboard.userResource.recommend.length > 1)
        ? this.$store.state.dashboard.userResource.recommend.slice(0, 4)
        : await this.$store.dispatch('getResource')
    },
    async getNewCourier () {
      this.musicList = (this.$store.state.dashboard.newCourier &&
        this.$store.state.dashboard.newCourier.length > 1)
        ? this.$store.state.dashboard.newCourier.slice(0, 20)
        : await this.$store.dispatch('getNewCourier', { type: 0 })
    },
    playMusic (item) {
      this.$store.dispatch('setCrtSong', item)
    },
    init () {
      Promise.all([this.getBanners(), this.getNewCourier(), this.getPlayList(), this.getResource()])
    }
  },
  mounted () {
    this.init()
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
        height: 430px;
        overflow: hidden;
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
    .new-courier__ul{
      border: 1px solid #ccc;
      margin-top: 20px;
      margin-bottom: 30px;
      h3{
        width: 100%;
        height: 30px;
        line-height: 30px;
        background: #fafafa;
        text-indent: 20px;
      }
    }
    .musicItem{
      height: 30px;
      line-height: 30px;
      text-align: left;
      font-size: 13px;
      padding: 0 10px;
      box-sizing: border-box;
      border-left: 1px solid rgb(243, 239, 239);
      display: flex;
      span{
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
      }
      span:first-child{
        width: 30px;
        text-align: center;
      }
      span:nth-child(2){
        flex: 1;
      }
      span:last-child{
        width: 70px;
        text-align: right;
      }
    }
  }
  .active {
    background: #fafafa;
  }
}
 
</style>