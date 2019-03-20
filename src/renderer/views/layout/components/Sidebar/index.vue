<template>
  <div class="sideList">
    <ul>
      <li v-for="(item, i) in createdPlayList" :key="i" @click="handleToPath(item)">
        <h2>{{item.name}}</h2>
        <p
        v-show="item.children"
        v-for="(song, index) in item.children"
        :key="index"
        >{{song.name}}</p>
      </li>
    </ul>

    <footer v-show="currentSong.id" @click="handleToDetail">
      <p>
        <img :src="curImg" alt="">
      </p>
      <div>
        <h3><strong>{{songName}}</strong>{{alias}}</h3>
        <span>{{singer}}</span>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'sideBar',
  data () {
    return {
      createdPlayList: [{
        name: '推荐',
        url: 'dashboard',
        children: [{
          name: '发现音乐',
          url: 'dashboard'
        }, {
          name: '私人FM',
          url: ''
        }, {
          name: 'MV',
          url: ''
        }, {
          name: '朋友',
          url: ''
        }]
      }, {
        name: '我的音乐',
        url: '',
        children: [{
          name: 'iTunes音乐',
          url: ''
        }, {
          name: '下载的音乐',
          url: ''
        }, {
          name: '我的歌手',
          url: ''
        }, {
          name: '我的mv',
          url: ''
        }]
      }],
      curImg: '',
      songName: '',
      singer: '',
      alias: ''
    }
  },
  computed: {
    ...mapGetters({
      currentSong: 'currentSong'
    })
  },
  methods: {
    handleToDetail () {
      console.log(1)
      this.$router.push('songDetail')
    },
    handleToPath (item) {
      console.log(item)
      this.$router.push(item.url)
    }
  },
  mounted () {
    this.$store.dispatch('getUserPlaylist').then(res => {
      let newArr = [{
        name: '创建的歌单',
        children: []
      }]
      res.data.playlist.forEach(element => {
        newArr[0].children.push({
          name: element.name,
          id: element.id
        })
      })
      this.createdPlayList = this.createdPlayList.concat(newArr)
    })
  },
  watch: {
    currentSong (newVal, oldVal) {
      if ((!newVal.id) || (newVal.id === oldVal.id)) {
        return
      }
      this.alias = newVal.album.alias[0]
      this.curImg = newVal.album.blurPicUrl
      this.songName = newVal.name
      this.singer = newVal.artists[0].name
    }
  }
}
</script>

<style scoped lang="scss">
.sideList{
  ul{
    padding-bottom: 80px;
    box-sizing: border-box;
    width: 100%;
    li{
      h2{
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        box-sizing: border-box;
      }
      p{
        padding: 0 30px;
        box-sizing: border-box;
        height: 30px;
        line-height: 30px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  footer{
    position: fixed;
    bottom: 60px;
    left: 0;
    height: 80px;
    width: 200px;
    border-top: 1px solid #fafafa;
    background: #d3dce6;
    display: flex;
    line-height: initial;
    p{
      width: 75px;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 60px;
        height: 60px;
        border-radius: 4px;
      }
    }
    div{
      flex: 1;
      padding-top: 15px;
      padding-right: 30px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      h3{
        color: rgb(122, 111, 111);
        overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      }
      strong{
        color: #000;
        font-size: 14px;
      }
      span{
        display: inline-block;
        margin-top: 5px;
        font-size: 13px;
        color: #333;
      }
    }
  }
}

</style>