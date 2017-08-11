<template>
  <div class="">
    <div class="goodIntroduce">
      <div class="left">
        <ul>
          <li>品名：{{instruction.addName}}</li>
          <li>注册证号：{{instruction.registerId}}</li>

          <li>产品标准：{{instruction.itemLevels}}</li>
          <li>使用范围：{{instruction.itemRange}}</li>
        </ul>
      </div>
      <div class="center">
        <ul>
          <li>单位：{{instruction.unit}}</li>
          <li>产品包装：{{instruction.itemPacking}}</li>
          <li>注册证有效期 / 备案日期：{{instruction.registerDate}}</li>
          <li>生产企业名称：{{instruction.producePompany}}</li>
        </ul>
      </div>
      <div class="right">
        <ul>
          <li>品牌：{{instruction.itemBrandName}}</li>
          <li>医械类别：{{instruction.apparatusType}}</li>
          <li>商家货号：{{instruction.storeItemId}}</li>
          <li>其他：{{instruction.remark}}</li>
        </ul>
      </div>
      <div style="clear:both;float:none"></div>
    </div>
    <div class="instruction" v-html="instruction.itemDesc"></div>
  </div>
</template>

<script>
  import util from '../../../common/util'
  export default {
    name: 'goodIntroduce',
    data () {
      return {
      }
    },
    props:["instruction"],
    // watch:{
    //   instruction:{
    //     handler:function(){
    //       var that = this;
    //       that.instruction.registerDate = util.formatDate.format(new Date(that.instruction.registerDate));
    //     },
    //     deep:true
    //   }
    //
    // }
  }
</script>
<style >
 .instruction img{
  max-width: 100% !important;
  display: block;
  margin: 20px auto;

}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.goodIntroduce{
  margin-top:20px;
  border:1px solid #efefef;
  border-radius: 2px;
  /*padding: 0 20px;*/
  padding-left: 50px;
  padding-top: 35px;
  padding-bottom: 18px;
  margin-left: 37px;
  margin-right: 46px;
}

.goodIntroduce div li{
/*  line-height: 45px;*/
  text-decoration: none;
  margin-bottom: 20px;
}
.goodIntroduce div {
  float: left;
  /*display:inline-block;*/
}
.goodIntroduce div:nth-child(1){
  width:35%;
  padding-right: 20px;
}
.goodIntroduce div:nth-child(2){
  width:35%;
}
.goodIntroduce div:nth-child(3){
  width:18%;
}
</style>
