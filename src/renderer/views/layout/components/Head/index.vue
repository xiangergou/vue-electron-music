/*
 * @Author: liuxia
 * @Date: 2019-03-04 15:26:51
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-03-04 15:44:17
 */

<template>
  <div class="head-wrapper">
    <div class="head-logo">
      logo
    </div>
    <div class="search-box">
      <div class="flex-left">flex-left</div>
      <div class="flex-right">flex-right</div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
.head-wrapper{
  display: flex;
  overflow: auto;
  .head-logo{
    width: 200px;
    border-right: 1px solid #ccc;
    box-sizing: border-box;
  }
  .search-box{
    flex: 1;
   .flex-left{
     float: left;
   }
   .flex-right{
     float: right;
   }
  }
}
</style>