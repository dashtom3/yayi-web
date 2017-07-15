<template>
  <div class="details">
    <publicHeader :msgFromGoodInfo="msgFromGoodInfoDetails"></publicHeader>
    <classify></classify>
    <detailsBar></detailsBar>
    <goodInfo v-on:goodInfoSay="getGoodInfoSay"></goodInfo>
    <publicFooter></publicFooter>
    <backToTop></backToTop>
  </div>
</template>

<script>
  import publicHeader from '../index/publicHeader'
  import backToTop from '../index/backToTop'
  import classify from '../index/classify'
  import publicFooter from '../index/publicFooter'

  import detailsBar from './detailsBar'
  import goodInfo from './goodInfo'
  export default {
    name: 'details',
    data () {
      return {
        msgFromGoodInfoDetails:null,
      }
    },
    components: {
      publicHeader,
      classify,
      detailsBar,
      goodInfo,
      publicFooter,
      backToTop,
    },
    //*******导航钩子*********//
    // beforeRouteEnter (to, from, next) {
    //   // 通过 `vm` 访问组件实例
    //   next(vm => {
    //     var that = vm;
    //   })
    // },
    mounted: function() {
      window.scroll(0,0);
    },
    methods: {
      getGoodInfoSay:function(data){
        var that = this;
        // console.log(data,"")
        that.msgFromGoodInfoDetails = data;
        // that.$emit("goodInfoSay",data);
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.details{
  font-size: 14px;
}
</style>
