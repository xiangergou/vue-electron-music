/*
 * @Author: liuxia
 * @Date: 2019-03-04 11:14:55
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-03-04 14:36:45
 */
<template>
  <div class="app-wrapper">
    <header>
      header
    </header>
    <aside>
      aside
    </aside>
    <article>
      article
    </article>
    <footer>
      footer
    </footer>
  </div>
</template>

<script>
require('@/utils/background.js')

export default {
  components: {
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
  }
</style>