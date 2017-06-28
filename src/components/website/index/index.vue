<template>
  <div class="index">
    <backToTop></backToTop>
    <publicHeader></publicHeader>
    <classify :brandListData="brandList"></classify>
    <carousel></carousel>
<!--     <brand class="d_jump"></brand> -->
    <preventive></preventive>
    <publicFooter></publicFooter>
  </div>
</template>

<script>
  import publicHeader from './publicHeader'
  import publicFooter from './publicFooter'
  import classify from './classify'
  import carousel from './carousel'
  import brand from './brand'
  import preventive from './preventive'
  import backToTop from './backToTop'

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
      brand,
      preventive,
      publicFooter,
      backToTop,
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
