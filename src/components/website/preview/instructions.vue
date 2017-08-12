<template>
  <div class="instructions" >
    <div class="videoWrap">
      <div class="contentTitleWrap" v-if="imgShow">
        <img src="../../../images/brandLib/nouserInfo.png" alt="使用说明">
      </div>
      <video :src="instruction.video" v-if="instruction.video !== ''" controls autoplay style="margin-top:20px;"></video>
      <div v-html="instruction.itemUse" v-if="instruction.itemUse !== '<p><br></p>'" style="width:640px;margin-top:20px;"></div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'instructions',
    data () {
      return {
        imgShow: false
      }
    },
    props:["instruction"],
    created: function() {
      if(this.instruction.itemUse === '<p><br></p>' && this.instruction.video === ''){
        this.imgShow = true
      }
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
