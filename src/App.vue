<template>
  <vue-scroll>
    <div id="app">
      <router-view/>
    </div>
  </vue-scroll>
</template>

<script>
import { setCookie, getCookie, delCookie } from './utils/cookie'
export default {
  name: "App",
  created () {
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
