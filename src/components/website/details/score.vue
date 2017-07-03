<template>
    <!-- <span  class="score">
      <img src="../../../images/details/score1.png" alt="" v-for="item in thisscore">
      <img v-if="computedblackStar>0" src="../../../images/details/score2.jpg" alt="" v-for="item2 in computedblackStar">
    </span> -->
    <span class="score">
      <el-rate v-model="value1"></el-rate>
    </span>
</template>

<script>

  export default {
    name: 'score',
    data () {
      return {
        blackStar:0,
        value1:null,
      }
    },
    computed:{
      computedblackStar:function(){
        return 5-this.thisscore;
      }
    },
    created:function(){
      var that = this;
      that.value1 = that.thisscore;
    },
    props:['thisscore']
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span{
  display: inline-block;
  height: 30px;
  margin-left: 5px;
}
span img{
  margin-left: 16px;
}
</style>
