<template>
  <div class="">
    <div class="goodIntroduce">
      <div>
        <span>品名：{{instruction.addName}}</span>
        <span>单位：{{instruction.unit}}</span>
        <span>品牌：AQUAPICK</span>
      </div>
      <div>
        <span>注册证号：{{instruction.registerId}}</span>
        <span>产品包装：{{instruction.itemPacking}}</span>
        <span>医械类别：</span>
      </div>
      <div>
        <span>注册证有效期/备案日期：{{instruction.registerDate}}</span>
        <span>商家货号：{{instruction.storeItemId}}</span>
        <span>其他：{{instruction.remark}}</span>
      </div>
      <div>
        <span>使用范围：{{instruction.itemRange}}</span>
        <span>生产企业名称：{{instruction.producePompany}}</span>
      </div>
    </div>
    <div class="instruction" v-html="instruction.itemDesc"></div>
  </div>
</template>

<script>

  export default {
    name: 'goodIntroduce',
    data () {
      return {
      }
    },
    props:["instruction"]
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.goodIntroduce{
  margin-top:50px;
  border:1px solid #dcdcdc;
  border-radius: 2px;
  /*padding: 0 20px;*/
  padding-left: 50px;
  padding-top: 35px;
  padding-bottom: 38px;
  margin-left: 37px;
  margin-right: 46px;
}
.instruction{
  background: red;
  width: 1200px;
}
.goodIntroduce .instruction img{
  max-width: 100% !important;
  display: block;
  margin: auto;
}
.goodIntroduce div{
  line-height: 45px;
}
.goodIntroduce div span{
  display:inline-block;
}
.goodIntroduce div span:nth-child(1){
  width:50%;
}
.goodIntroduce div span:nth-child(2){
  width:30%;
}
.goodIntroduce div span:nth-child(3){
  width:18%;
}
</style>
