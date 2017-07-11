<template>
  <div class="instructions" >
    <div v-html="instruction.itemUse">

    </div>
    <video :src="instruction.video" controls autoplay>

    </video>
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
