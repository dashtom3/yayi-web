<template>
  <div class="index">
<!--     <loading></loading> -->
    <backToTop></backToTop>
    <publicHeader></publicHeader>
    <classify :brandListData="brandList"></classify>
    <carousel></carousel>
    <preventive></preventive>
    <publicFooter></publicFooter>
  </div>
</template>

<script>
  import publicHeader from './publicHeader'
  import publicFooter from './publicFooter'
  import classify from './classify'
  import carousel from './carousel'
  import preventive from './preventive'
  import backToTop from './backToTop'
  // import loading from '../loading'
  export default {
    name: 'index',
    data () {
      return {
        brandList:[]
      }
    },
    components: {
      publicHeader,
      classify,
      carousel,
      preventive,
      publicFooter,
      backToTop,
      // loading,
    },
    created: function() {
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
