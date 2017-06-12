<template>
    <span  class="score">
      <img src="../../../images/details/score.png" alt="" v-for="item in thisscore">
    </span>
</template>

<script>

  export default {
    name: 'score',
    data () {
      return {

      }
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
