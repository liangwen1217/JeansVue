<template>
  <div id="app">
    <loading :active.sync="isLoading"></loading>
    <router-view/>

  </div>

</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  
  // name: 'App',
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
};
</script>

<style lang="scss">
@import "./assets/scss/all";
</style>
