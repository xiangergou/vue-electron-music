<template>
  <div class="sideList">
    <ul>
      <li v-for="(item, i) in createdPlayList" :key="i">
        <h2>{{item.name}}</h2>
        <p
        v-show="item.children"
        v-for="(song, index) in item.children"
        :key="index"
        >{{song.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'sideBar',
  data () {
    return {
      createdPlayList: [{
        name: '推荐',
        url: '',
        children: [{
          name: '发现音乐',
          url: ''
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
      }]
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
  }
}
</script>

<style scoped lang="scss">
.sideList{
  ul{
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
}

</style>