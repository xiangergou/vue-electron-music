/*
 * @Author: liuxia
 * @Date: 2019-03-04 16:28:16
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-03-04 17:45:17
 */
<template>
  <div class="dashboard-head__nav">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="i.label" :name="i.name" v-for="(i, index) in navList" :key="index">
      </el-tab-pane>
      <component :is="activeName"></component>
    </el-tabs>
  </div>
</template>

<script>
import recommend from './children/Recommend'

export default {
  name: 'dashboard',
  components: {
    recommend
  },
  data () {
    return {
      activeName: 'recommend',
      navList: [{
        label: '推荐',
        name: 'recommend'
      }, {
        label: '排行榜',
        name: 'ranking'
      }]
    }
  },
  methods: {
    handleClick () {
    }
  }
}
</script>

<style lang="scss">
.dashboard-head__nav{
  height: 100px;
  .el-tabs__nav-scroll{
    height: 60px;
    line-height: 60px;
    overflow: auto;
    border-bottom: none;
  }
  .el-tabs__nav{
    float: none;
  }
  .el-tabs__item.is-active {
    color: #409EFF;
  }
  .el-tabs__active-bar{
    display: none;
  }
}
</style>