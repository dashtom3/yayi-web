<template>
  <div class="details">
    <publicHeader></publicHeader>
    <classify></classify>
    <detailsBar></detailsBar>
    <goodInfo></goodInfo>
    <publicFooter></publicFooter>
  </div>
</template>

<script>
  import publicHeader from '../index/publicHeader'
  import classify from '../index/classify'
  import publicFooter from '../index/publicFooter'

  import detailsBar from './detailsBar'
  import goodInfo from './goodInfo'
  export default {
    name: 'details',
    data () {
      return {

      }
    },
    components: {
      publicHeader,
      classify,
      detailsBar,
      goodInfo,
      publicFooter
    },
    mounted: function() {
      window.scroll(0,0);
      console.log(111111111,this.$route.params)
    },
    methods: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.details{
  font-size: 14px;
}
</style>
