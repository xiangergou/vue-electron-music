<template>
  <div class="footer-wrapper">
    <div class="footer-play__btn">
      <span>pre</span>
      <span @click="playMusic">{{playState ? 'off' : 'on'}}</span>
      <span>next</span>
    </div>
    <div class="footer-play__progress">
      <audio ref="audio" autoplay  @timeupdate="updateTime"></audio>
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
      <span>列表</span>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { playMode } from '@/config'
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
      move: false
    }
  },
  computed: {
    ...mapGetters({
      currentSong: 'currentSong',
      mode: 'mode'
    })
  },
  methods: {
    getSongInfo (id) {
      this.$store.dispatch('getSongUrl', { id }).then(res => {
        this.url = res.data[0].url
        if (!this.url) {
          this.$message({
            message: '居中的文字',
            center: true
          })
          return
        }
        this.$refs.audio.currentTime = 0
        this.$refs.audio.src = this.url
        this.$refs.audio.play()
      })
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
      second = second < 10 ? second : '0' + second
      minute = minute < 10 ? minute : '0' + minute
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
      console.log(this.mode)
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
      this.$refs.audio.currentTime = 0
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
}
</style>