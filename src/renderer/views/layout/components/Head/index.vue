/*
 * @Author: liuxia
 * @Date: 2019-03-04 15:26:51
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-03-10 22:46:08
 */

<template>
  <div class="head-wrapper">
    <div class="head-logo">
      <span style="font-size:15px">落白云音乐</span>
    </div>
    <div class="search-box">
      <div class="flex-left">
        <el-input v-model="input" placeholder="请输入音乐，歌手，歌词，用户"></el-input>
      </div>
      <div class="flex-right">
        <span>私信</span>
        <span>设置</span>
        <span>
          <el-dropdown
            class="avatar-container right-menu-item"
            trigger="click">
            <div class="avatar-wrapper">
              <!-- <img :src="avatar"  class="user-avatar"> -->
              <span class="user-name">{{ name }}</span>
              <i class="el-icon-arrow-down"/>
            </div>
            <el-dropdown-menu
              slot="dropdown"
              class="user-dropdown">
              <el-dropdown-item>
                <span
                  style="display:block;"
                  @click="layer_showUserInfo = true">个人信息</span>
              </el-dropdown-item>
              <router-link
                class="inlineBlock"
                to="/">
                <el-dropdown-item>
                  首页
                </el-dropdown-item>
              </router-link>
              <el-dropdown-item divided>
                <span
                  style="display:block;"
                  @click="logout">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      layer_showUserInfo: true,
      name: 'yun'
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        // this.$router.push({ path: '/login' })
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
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
     span{
       flex: 1;
       cursor: pointer;
     }
   }
  }
  .user-dropdown{
    width: 300px;
  }
}
</style>