<template>
  <div class="footer-wrapper">
    <div class="footer-play__btn">
      <span>left</span>
      <span @click="playMusic">play</span>
      <span>right</span>
    </div>
    <div class="footer-play__progress">
      <audio ref="audio" autoplay  @timeupdate="updateTime"></audio>
      <el-slider v-model="percent" class="el-sider" @change="progressChange" :max="100"></el-slider>
      <span class="time time-r">{{format(currentTime)}}/{{format(duration)}}</span>
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
import { mapGetters } from 'vuex'
export default {
  name: 'appFooter',
  data () {
    return {
      duration: 0,
      currentTime: 0,
      percent: 0,
      isPlay: false,
      move: false
    }
  },
  computed: {
    ...mapGetters({
      currentSong: 'currentSong'
    })
  },
  methods: {
    getSongInfo (id) {
      this.$store.dispatch('getSongUrl', { id }).then(res => {
        console.log(res)
        this.url = res.data[0].url
        this.$refs.audio.currentTime = 0
        this.$refs.audio.src = this.url
        this.$refs.audio.play()
      })
    },
    playMusic () {
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
      console.log(percent)
    }
  },
  mounted () {
    // setInterval(() => {
    //   this.value1 += 1
    // }, 100)
    // console.log(this.currentSong)
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
      console.log(this.percent)
    }
  }
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
      float: left;
      width: 90%;
    }
    span{
      width: 70px;
      float: right;
      text-align: center;
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