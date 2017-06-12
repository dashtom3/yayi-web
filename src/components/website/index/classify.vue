<template>
  <div class="classify">
    <div class="cargo" v-on:mouseenter="cargo" v-on:mouseleave="hideCargo">
      商品分类
      <img v-if="change1" src="../../../images/index/down.png" alt="img">
      <img v-else src="../../../images/index/up.png" alt="img">
      <div v-show="!change1"  class="classfyDetail"  >
        <ul class="classfyDetail_left">
          <li :class="{oneHover:index1==defaultOne}" v-for="(one,index1) in allClassfy" v-on:mouseenter="getTwo(index1)">{{one.title}}</li>
        </ul>
        <div class="classfyDetail_right">
          <div class="details" v-for="(two,index2) in allClassfy[defaultOne].children">
            <div class="title" >
              {{two.title}}&nbsp;&nbsp;&nbsp;&nbsp;>
            </div>
            <div class="detail">
              <ul>
                <li  v-for="(three ,index3) in allClassfy[defaultOne].children[index2].children">{{three}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="brand" v-on:mouseenter="brand" v-on:mouseleave="hideBrand">
      品牌库
      <img v-if="!change2" src="../../../images/index/up.png" alt="img">
      <img v-else src="../../../images/index/down.png" alt="img">
      <div class="brandLib" v-show="!change2" >
        <div class="imgWrap" v-on:click="goToBrandLib()">
          <img src="../../../images/index/sfdadf.png" alt="">
          <div class=""></div>
        </div>
        <div class="imgWrap">
          <img src="" alt="">
          <div class=""></div>
        </div>
        <div class="imgWrap">
          <img src="" alt="">
          <div class=""></div>
        </div>
        <div class="imgWrap">
          <img src="" alt="">
          <div class=""></div>
        </div>
        <div class="imgWrap">
          <img src="" alt="">
          <div class=""></div>
        </div>
        <div class="imgWrap">
          <img src="" alt="">
          <div class=""></div>
        </div>
        <div class="imgWrap">
          <img src="" alt="">
          <div class=""></div>
        </div>
        <div class="imgWrap">
          <img src="" alt="">
          <div class=""></div>
        </div>
        <div class="imgWrap">
          <img src="" alt="">
          <div class=""></div>
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
        defaultOne:0,
        change1: true,
        change2: true,
        allClassfy:[
          {
            title:"一级标题",
            children:[
              {
                title:"一级子标题_",
                children:["111111",'111111']
              },
              {
                title:"一级子标题",
                children:["222","222","222","222","222","222","222","222","222","222","222","222","222","222","222","222","222","222","222","222","222","222","222","222","222","222","222"]
              }
            ]
          },
          {
            title:"333333",
            children:[
              {
                title:"444444",
                children:["555555",'666666']
              },
              {
                title:"77777777",
                children:["8888","99999","aa","ssss","ddddd","fffffff"]
              }
            ]
          },
        ]
      }
    },
    methods: {
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
      getTwo:function(index1){
        this.defaultOne = index1;
      },
      sureThis:function(index3){
        this.defaultThree = index3;
      },
      goToBrandLib:function(){
        this.$router.push({path: '/brandLib'})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


  /*------------------------------------*/
  .classfyDetail{
    width: 1200px;
    margin: 30px auto;
    min-height: 630px;
    position: absolute;
    top: 0;
    z-index: 999;
    background: white;
  }
  .brandLib{
      width: 1200px;
      position: absolute;
      top: 0;
      z-index: 999;
      background: white;
      margin: 30px auto;
      padding: 30px  0 0  0;
      min-height: 600px;
      left: 0;
      border: 1px solid #cccccc;
      border-top: none;
  }
  .brandLib .imgWrap img{
    max-width: 100%;
    max-height: 100%;
    margin-left: 0;
  }
  .imgWrap{
    border: 1px solid #cccccc;
    position: relative;
    float: left;
    margin-left: 28px;
    margin-bottom: 28px;
    width: 138px ;
    height: 138px;
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
    background: #5db8e8;
    float: left;
    color:white;
    min-height: 630px;
    font-size: 16px;
  }
  .classfyDetail_left li {
    cursor: pointer;
  }
  .classfyDetail_right{
    width: 1000px;
    margin-left: 200px;
    margin-top: 30px;
    font-size: 14px;

  }
  .details .title{
    float: left;
    width: 150px;
    text-align: center;
    font-weight: bold;
    margin-top: 15px;
  }
    .details .title:hover{
        color: #90cbee;
    }
  .details .detail{
    margin-left: 150px;
    border-bottom: 1px solid #eeeeee;
    line-height: 20px;
    padding-bottom: 10px;
    padding-top: 10px;
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
    background: #5ed6dc;
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
    height: 30px;
    margin: 0 auto;
    position: relative;
/*    background-color: #EECE7C;*/
  }
  .cargo {
    width: 100px;
    height: 30px;
    line-height: 30px;
    float: left;
    margin-right: 85px;
  }
  .cargo:hover {
    cursor: pointer;
  }
  .brand {
    width: 100px;
    height: 30px;
    line-height: 30px;
    float: left;
  }
  .brand:hover {
    cursor: pointer;
  }
  .classify img {
    margin-left: 10px;
  }



</style>
