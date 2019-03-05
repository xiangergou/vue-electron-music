/*
 * @Author: liuxia
 * @Date: 2019-03-04 11:14:55
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-03-04 21:49:43
 */
<template>
  <div class="app-wrapper">
    <el-container>
      <el-header>
        <navhead />
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>
          <app-main />
        </el-main>
      </el-container>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>
<script>
import navhead from './components/Head'
import appMain from './components/Main'

require('@/utils/background.js')

export default {
  components: {
    navhead,
    appMain
  }
}
</script>

<style lang="scss">
  .app-wrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    .el-container{
      height:100%;
    }
    .el-header, .el-footer {
      background-color: #B3C0D1;
      color: #333;
      line-height: 60px;
      padding: 0;
    }
  
    .el-aside {
      background-color: #D3DCE6;
      color: #333;
      line-height: 200px;
    }
    
    .el-main {
      // background-color: #E9EEF3;
      color: #333;
      text-align: center;
      line-height: 160px;
      padding: 0;
    }
    
    body > .el-container {
      margin-bottom: 40px;
    }
    
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
      line-height: 260px;
    }
    
    .el-container:nth-child(7) .el-aside {
      line-height: 320px;
    }
  }
</style>