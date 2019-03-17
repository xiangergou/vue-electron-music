<template>
  <div class="footer-wrapper">
    <div class="footer-play__btn">
      <span @click="pre">pre</span>
      <span @click="playMusic">{{playState ? 'off' : 'on'}}</span>
      <span @click="next">next</span>
    </div>
    <div class="footer-play__progress">
      <audio ref="audio" autoplay  @timeupdate="updateTime" @ended="end"></audio>
      <el-slider v-model="percent" class="el-sider" @change="progressChange" :max="100"></el-slider>
      <span class="time time-r">{{format(currentTime)}}/{{format(duration)}}</span>
    </div>
    <div class="footer-play__list">
      <span style="text-align:center">vioce</span>
      <strong>
        <el-slider v-model="volume" class="el-sider" @change="volumeChange" :max="100">
          </el-slider>
      </strong>
      <span @click="changeMode">{{mode}}</span>
      <span>词</span>
      <span @click="handleList">列表</span>
    </div>

    <!-- song list -->
    <div class="playList" v-show="isShowList">

    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { playMode } from '@/config'
export default {
  name: 'appFooter',
  data () {
    return {
      playState: false,
      volume: 0,
      duration: 0,
      currentTime: 0,
      percent: 0,
      isPlay: false,
      move: false,
      isShowList: false
    }
  },
  computed: {
    ...mapGetters({
      currentSong: 'currentSong',
      mode: 'mode',
      currentIndex: 'currentIndex',
      palyList: 'palyList'
    })
  },
  methods: {
    getSongInfo (id) {
      this.$store.dispatch('getSongUrl', { id }).then(res => {
        this.url = res.data[0].url
        if (!this.url) {
          this.$msgbox({
            message: '无版权',
            center: true
          })
          return
        }
        this.$refs.audio.currentTime = 0
        this.$refs.audio.src = this.url
        this.$refs.audio.play()
      })
    },
    handleList () {
      this.isShowList = !this.isShowList
    },
    playMusic () {
      this.playState = !this.playState
      this.$refs.audio.paused ? this.$refs.audio.play() : this.$refs.audio.pause()
    },
    updateTime (e) {
      if (this.move) {
        return
      }
      this.currentTime = e.target.currentTime
    },
    format (interval) {
      interval = interval | 0
      let minute = interval / 60 | 0
      let second = interval % 60
      if (second < 10) {
        second = '0' + second
      }
      return minute + ':' + second
    },
    progressChange (percent) {
      this.$refs.audio.currentTime = (percent / 100 * this.duration)
    },
    volumeChange (percent) {
      this.$refs.audio.volume = (percent / 100)
    },
    changeMode () {
      const mode = (this.mode + 1) % 3
      this.$store.commit('SET_MODE', mode)
    },
    loop () {
      this.$refs.audio.loop = 'loop'
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
    },
    pre () {
      this.$store.commit('SET_CURRENT_INDEX', this.currentIndex - 1)
    },
    next () {
      this.$refs.audio.loop = false
      switch (this.mode) {
        case playMode.loop:
          this.$store.commit('SET_CURRENT_INDEX', this.currentIndex + 1)
          this.loop()
          break
        case playMode.sequence:
          this.$store.commit('SET_CURRENT_INDEX', this.currentIndex + 1)
          break
        case playMode.random:
          this.$store.commit('SET_CURRENT_INDEX', Math.floor(Math.random() * this.palyList.length) + 1)
          break
      }
    },
    end () {
      if (this.mode === playMode.loop) {
        this.loop()
      } else {
        this.next()
      }
    }
  },
  mounted () {
  },
  watch: {
    currentSong (newVal, oldVal) {
      if ((!newVal.id) || (newVal.id === oldVal.id)) {
        return
      }
      this.$refs.audio.pause()
      this.getSongInfo(newVal.id)

      let stop = setInterval(() => {
        this.duration = this.$refs.audio.duration
        if (this.duration) {
          clearInterval(stop)
        }
      }, 150)
    },
    currentTime () {
      this.percent = (this.currentTime / this.duration).toFixed(3) * 100
    }
  }
}
</script>

<style lang="scss">
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
    padding-left: 25px;
    box-sizing: border-box;
    .el-sider{
      margin-top: 10px;
      float: left;
      width: 80%;
    }
    span{
      width: 80px;
      float: left;
      text-align: center;
    }
  }
  .footer-play__list{
    width: 280px;
    display: flex;
    box-sizing: border-box;
    span{
      display: inline-block;
      width: 45px;
    }
    strong{
      flex-grow: 1;
      flex: 1;
      .el-sider{
        margin-top: 10px;
        float: left;
        width: 85%;
      }
    }
  }
  .el-slider__button{
    width: 13px;
    height: 13px;
  }
  .el-slider__runway{
    height: 5px;
  }
  .playList{
    position: fixed;
    bottom: 60px;
    right: 0;
    z-index: 9999;;
    width: 580px;
    height: 450px;
    background: #fafafa;
    border: 1px solid #fafafa;
    border-radius: 3px;
    box-shadow: #fafafa
  }
}
</style>