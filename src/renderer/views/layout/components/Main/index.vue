<template>
  <section class="app-main">
    <transition
      name="fade"
      mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>
<script>
export default {
  name: 'AppMain',
  computed: {
    key () {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  }
}
</script>

<style scoped lang="scss">
.app-main {
  width: 100%;
  height: 100%;
  overflow: auto;
  /* position: relative;
  overflow: hidden; */
  
}
</style>
