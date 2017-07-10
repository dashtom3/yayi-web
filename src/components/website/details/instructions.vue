<template>
  <div class="instructions" >
    <div v-html="instruction.itemUse">

    </div>
  </div>
</template>

<script>

  export default {
    name: 'instructions',
    data () {
      return {

      }
    },
    props:["instruction"],
    created:function(){
      console.log(this.instruction)
    },
    methods: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .instructions img{
    width: 100% !important;
  }
</style>
