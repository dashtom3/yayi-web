<template>
<div style="width:100%; background-color:#005aab;">
  <div class="classify">
    <div class="cargo" v-on:mouseenter="cargo" v-on:mouseleave="hideCargo">
      <span class="cargo_word">商品分类</span>
<!--       <img v-if="change1" src="../../../images/index/down.png" alt="img">
      <img v-else src="../../../images/index/up.png" alt="img"> -->
      <div v-show="!change1"  class="classfyDetail" v-if="allClassfy.length>0">
        <ul class="classfyDetail_left">
          <li :class="{oneHover:index1==defaultOne}" v-for="(one,index1) in allClassfy" v-on:mouseenter="getTwo(index1,one)" v-on:click="goToClassfy1(index1)">{{one.oneClassify}}</li>
        </ul>
        <div class="classfyDetail_right">
          <div class="details" v-for="(two,index2) in allClassfy[defaultOne].classifyTwoList">
            <div class="title" v-on:click="goToClassfy2(index2,two)">
              {{two.classifyTwoName}}&nbsp;&nbsp;&nbsp;&nbsp;>
            </div>
            <div class="detail">
              <ul>
                <li v-on:click="goToClassfy3(index2,index3,two,three)"  v-for="(three ,index3) in allClassfy[defaultOne].classifyTwoList[index2].classifyThreeList">{{three.classifyThreeName}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="brand" v-on:mouseenter="brand" v-on:mouseleave="hideBrand">
      <span class="cargo_word">品牌库</span>
<!--       <img v-if="!change2" src="../../../images/index/up.png" alt="img">
      <img v-else src="../../../images/index/down.png" alt="img"> -->
      <div class="brandLib"  v-if="!change2">
        <div class="imgWrap" v-for="oneBrand in brandListData" @click="goToThisBrand(oneBrand.itemBrandId)">
          <img :src="oneBrand.itemBrandLogo" alt="img">
          <span></span>
          <div class=""></div>
        </div>
    </div>
  </div>
  </div>
</div>
</template>

<script>
  export default {
    name: 'classify',
    data () {
      return {
        brandListData:null,
        defaultOne:0,
        change1: true,
        change2: true,
        allClassfy:[],
        goOne:null,
        goTow:null,
        goThree:null
      }
    },
    created:function(){
      var that = this;
      that.getAllBrandList();
      this.getAllClassfyList();
    },
    methods: {
      getAllClassfyList:function(){
        var that = this;
        that.global.axiosGetReq('/item/showClassify').then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            this.allClassfy = res.data.data;
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      goToThisBrand:function(id){
        var that = this;
        that.$router.push({
          path:"/brandLib/0-0-0AND"+id,
        });
        var str = window.location.pathname;
        if(str.indexOf("brandLib")>0){
          window.location.href=window.location.href;
        }
        window.scroll(0,0);
      },
        getAllBrandList:function(){
          var that = this;
          that.global.axiosGetReq('/item/brandList')
          .then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              that.brandListData = res.data.data;
            } else {
              that.$message.error('网络出错，请稍后再试！');
            }
          })
        },
      cargo() {
        var that = this;
        that.change1 = false;
        this.change2 = true;
      },
      hideCargo() {
        this.change1 = true;
      },
      brand() {
        var that = this;
        that.change2 = false;
        this.change1 = true;
      },
      hideBrand(){
        this.change2 = true;
      },
      getTwo:function(index1,one){
        this.defaultOne = index1;
        this.goOne = parseInt(index1)+1;
      },
      sureThis:function(index3){
        this.defaultThree = index3;
      },
      // 分类跳转1-1-1的形式
      goToClassfy1:function(id){
        var that = this;
        var classfyArg = that.goOne+"-0-0AND0";
        that.$router.push({path: '/brandLib/'+classfyArg});
        var str = window.location.pathname;
        if(str.indexOf("brandLib")>0){
          window.location.href=window.location.href;
        }
        window.scroll(0,0);
      },
      goToClassfy2:function(index,two){
        var that = this;
        var index = parseInt(index)+1;
        var classfyArg = that.goOne+"-"+index+"-0AND0";
        that.$router.push({path: '/brandLib/'+classfyArg});
        var str = window.location.pathname;
        if(str.indexOf("brandLib")>0){
          window.location.href=window.location.href;
        }
        // that.$router.go(0);
        window.scroll(0,0);
      },
      goToClassfy3:function(index,index3,two,three){
        var that = this;
        var index1 = parseInt(index)+1;
        var index2 = parseInt(index3)+1;
        var classfyArg = that.goOne+"-"+index1+"-"+index2+"AND0";
        that.$router.push({path: '/brandLib/'+classfyArg});
        var str = window.location.pathname;
        if(str.indexOf("brandLib")>0){
          window.location.href=window.location.href;
        }
        // that.$router.go(0);
        window.scroll(0,0);
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*------------------------------------*/
  .classfyDetail{
    width: 1200px;
    margin: 39px auto;
    max-height: 450px;
    position: absolute;
    top: 0;
    z-index: 5;
    background: white;
    box-shadow: 0 0 5px #e1e1e1;
    text-align: left;
  }
  .brandLib{
    width: 1200px;
    position: absolute;
    top: 0;
    z-index: 5;
    background: white;
    margin: 39px auto;
    height: 450px;
    left: 0;
    /*border: 1px solid #cccccc;*/
    /*border-top: none;*/
    box-shadow: 0 0 5px #e1e1e1;
  }
  .brandLib .imgWrap img{
    max-width: 70%;
    max-height: 70%;
    margin-left: 0;
    display: inline-block;
    vertical-align: middle;
  }
  .imgWrap span{
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
  .imgWrap{
    border: 1px solid #cccccc;
    position: relative;
    float: left;
    margin-left: 28px;
    margin-top: 20px;
    width: 138px ;
    height: 138px;
    text-align: center;
  }
  .brandLib .imgWrap:hover div{
    display: block;
    cursor: pointer;
  }
  .imgWrap div{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    display: none;
  }
  .classfyDetail_left{
    width: 200px;
    text-align: center;
    line-height: 46px;
    background: #005aab;
    float: left;
    color:white;
    height: 450px;
  }
  .classfyDetail_left li {
    cursor: pointer;
  }
  .classfyDetail_right{
    width: 1000px;
    height: 450px;
    margin-left: 200px;
    font-size: 14px;

  }
  .details .title{
    float: left;
    width: 150px;
    text-align: center;
    font-weight: bold;
    margin-top: 3px;
  }
  .details .title:hover{
    color: #90cbee;
  }
  .details .detail{
    margin-left: 150px;
    border-bottom: 1px solid #eeeeee;
    line-height: 20px;
    padding-bottom: 6px;
    padding-top: 6px;
    min-height: 35px;
  }
  .details .detail li{
    display: inline-block;
    margin-right: 30px;
    line-height: 35px;
    cursor: pointer;
  }
  .details .detail li:hover{
    color: #90cbee;
  }
  .classfyDetail .oneHover{
    background: #329af0;
  }
  .classfyDetail .twoHover{
    color: #5db8e8;
  }
  .classfyDetail .threeHover{
    color: #90cbee;
  }

  /*-------------------------*/
  .classify {
    width: 1200px;
    height: 39px;
    margin: 0 auto;
    position: relative;
    font-size: 14px;
  }
  .cargo {
    width: 100px;
    height: 39px;
    line-height: 39px;
    float: left;
    text-align: center;
  }
  .cargo:hover {
    cursor: pointer;
    background-color: #329af0;
  }
  .cargo_word {
    font-size:16px; 
    color: #fff; 
    margin: 0 auto;
  }
  .brand {
    width: 100px;
    height: 39px;
    line-height: 39px;
    float: left;
    text-align: center;
  }
  .brand:hover {
    cursor: pointer;
    background-color: #329af0;
  }
  .classify img {
    margin-left: 10px;
  }
</style>
