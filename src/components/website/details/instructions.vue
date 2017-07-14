<template>
  <div class="instructions" >
    <div class="videoWrap" v-if="instruction.video">
      <div class="contentTitleWrap">
        <span></span>
        <span>视频说明</span>
        <span></span>
      </div>
      <video :src="instruction.video" controls autoplay></video>
    </div>
    <div class="imgAndTextWrap" v-if="instruction.itemUse">
      <div class="contentTitleWrap">
        <span></span>
        <span>图文说明</span>
        <span></span>
      </div>
      <div v-html="instruction.itemUse"></div>
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
  video{
    display: block;
    margin: auto;
  }
.contentTitleWrap{
  width: 1200px;
  margin: auto;
  position: relative;
  text-align: center;
  line-height: 40px;
  margin-top: 50px;
  margin-bottom: 50px;
  color: #333333;
}
.contentTitleWrap span:nth-child(1){
float: left;
display: inline-block;
width: 300px;
height: 1px;
background: #e5e5e5;
margin-top: 19px;
margin-left: 100px;
}
.contentTitleWrap span:nth-child(2){
font-size: 20px;
}
.contentTitleWrap span:nth-child(3){
float: right;
display: inline-block;
width: 300px;
height: 1px;
background: #e5e5e5;
margin-top: 19px;
margin-right: 100px;
}
</style>
