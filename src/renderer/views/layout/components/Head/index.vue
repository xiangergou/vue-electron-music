/*
 * @Author: liuxia
 * @Date: 2019-03-04 15:26:51
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-03-19 21:08:50
 */

<template>
  <div class="head-wrapper">
    <div class="head-logo">
      <span style="font-size:15px">落白云音乐</span>
    </div>
    <div class="search-box">
      <div class="flex-left">
        <el-input v-model="searchData" placeholder="请输入音乐，歌手，歌词，用户"  @keyup.enter.native="handleSearch"></el-input>
      </div>
      <div class="flex-right">
        <span>私信</span>
        <span>设置</span>
          <el-dropdown
            class="avatar-container right-menu-item"
            trigger="click">
            <div class="avatar-wrapper">
              <img :src="userInfo.profile.avatarUrl"  class="user-avatar">
              <i class="el-icon-arrow-down"/>
            </div>
            <el-dropdown-menu
              slot="dropdown"
              class="user-dropdown">
              <el-dropdown-item>
                <div
                  class="avater"
                  @click="layer_showUserInfo = true">
                  <span class="user-avatar"><img :src="userInfo.profile.avatarUrl"></span>
                 <span class="user-name">{{ userInfo.profile.nickname }}</span>
                </div>

                <div class="userActiv">
                  <ul>
                    <li v-for="(item, i) in userActiv" :key="i">
                      <strong>{{ item.value }}</strong>
                      <p>{{ item.label }}</p>
                    </li>
                  </ul>
                </div>
              </el-dropdown-item>
              
              <router-link
                class="inlineBlock"
                to="/">
                <el-dropdown-item>
                  <span>个人信息设置</span>
                </el-dropdown-item>
              </router-link>

              <el-dropdown-item divided>
                <span
                  style="display:block;"
                  @click="logout">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      searchData: '',
      layer_showUserInfo: true
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo'
    }),
    userActiv () {
      let arr = [{
        label: '动态',
        value: this.userInfo.profile.eventCount
      }, {
        label: '关注',
        value: this.userInfo.profile.follows
      }, {
        label: '粉丝',
        value: this.userInfo.profile.followeds
      }]
      return arr
    }
  },
  methods: {
    handleSearch () {
      this.$store.dispatch('querySong', { keywords: this.searchData }).then(res => {
        console.log(res)
      })
    },
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  },
  mounted () {
    console.log(this.userInfo)
  }
}
</script>

<style lang="scss">
.head-wrapper{
  display: flex;
  overflow: auto;
  color: #fff;
  .head-logo{
    width: 200px;
    border-right: 1px solid #ccc;
    box-sizing: border-box;
    text-align: center;
  }
  .search-box{
    padding-left: 20px;
    flex: 1;
   .flex-left{
     float: left;
     .el-input__inner{
       border-radius: 30px;
       height: 25px;
       line-height: 25px;
       width: 220px;
       font-size: 12px;
     }
   }
   .flex-right{
     float: right;
     width: 140px;
     display: flex;
     padding-right: 10px;
     span{
       flex: 1;
       cursor: pointer;
     }
   }
  }
  .avatar-wrapper{
    img{
      display: inline-block;
      width: 25px;
      height: 25px;
      border-radius: 25px;
      vertical-align: middle;
    }
  }
  .user-dropdown{
    width: 300px;
  }
}
.avater{
  display: flex;
  .user-avatar{
    width: 40px;
  }
  .user-name {
    flex: 1;
  }
  span{
    img{
      display: inline-block;
      width: 30px;
      height: 30px;
      border-radius: 30px;
      vertical-align: middle;
    }
  }
}
.userActiv{
  ul{
    display: flex;
    li{
      display: block;
      flex: 1;
      overflow: auto;
      p{
        margin: 0 !important;
        padding: 0 !important;
      }
    }
    
  }
  ul :hover{
    color: pink
  }
}

</style>