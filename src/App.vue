<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  * {
    padding: 0;
    margin: 0;
  }
  #app {
    font-family: 'Microsoft YaHei',Arial,Helvetica,sans-serif,'宋体';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .clearfix {
    clear: both;
  }

  a {
    text-decoration: none;
    color: #83868E;
  }

  ul {
    list-style-type: none;
  }

  button {
    outline: none;
    border: none;
    list-style-type:none;
  }
</style>
