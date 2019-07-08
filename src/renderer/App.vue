<template>
  <div id="app">
    <router-view></router-view>
    <bottom-nav></bottom-nav>
  </div>
</template>

<script>
  import bottomNav from './components/bottomNavigation/bottomNavigation'

  export default {
    name: 'tieba',
    components: {
      bottomNav
    }
  }
</script>

<style>
  /* CSS */
</style>
