<template>
  <div class="goodInfo">
  	<div class="infoLeft">
      <div class="infoLeft_1">
        <img :src="bigImgUrl" />
        <span></span>
      </div>
      <div class="infoLeft_2">
        <ul>
          <li v-on:mouseenter="enter(index)" v-for="(goodImg ,index) in goodAllImgs">
            <img  :src="goodAllImgs[index]" />
          <span></span>
          </li>
          <div class="clearFloat"></div>
        </ul>
      </div>

      <div class="infoLeft_3">
        <span v-on:click="showCllect('商品收藏成功！',1)">
          <img v-if="saveGood" src="../../../images/details/collect.png" />
          <img v-else src="../../../images/details/collect2.jpg" />
          {{saveGood?"收藏":"已收藏"}}
        </span>
        <span v-on:click="showCllect('连接复制成功，快去分享吧！',2)">
          <img v-if="copyUrl" src="../../../images/details/share.png" />
          <img v-else src="../../../images/details/share2.jpg" />
          分享
        </span>
      </div>
    </div>
  	<div class="infoRight">
      <h3>{{nowGoodDetails.itemName}}
        <!-- <span class="ifdikou"><img src="../../../images/details/1.png" alt="">支持钱币抵扣</span> -->
      </h3>
      <div>
        价格：<span class="fontRed">￥{{nowGoodDetails.itemPrice}}</span>
        <span style="float:right">已售：{{nowGoodDetails.sales}}</span>
      </div>
      <div>
        品牌：{{itemBrand.itemBrandName}}
      </div>
      <div style="margin:6px 0 22px 0;">
        配送至：
            <myAddress></myAddress>
        <span class="fullCut">运费：8.00元，店铺满99.00免运费</span>
      </div>
      <div style="height:35px;">
        注册证号：{{itemDetail.registerId}}
      </div>
      <hr class="onePxLine" color="e5e5e5"></hr>
      <div class="shuxingWrap" style="height:auto">
        <span style="float:left">属性：</span>
        <div class="shuxing">
          <span :class="{ attSty2: index === ite }"  class="attSty1" v-on:click="changeAttSty(index,item)" v-for="(item, index) in items">{{item.itemPropertyInfo}}</span>
          <div class="clearFloat"></div>
        </div>
        <div class="clearFloat"></div>
      </div>
      <div style="line-height:40px;margin-top:20px;">
        数量：
        <div class="calculator">
          <span :class="{btnDef:goodDefaultNum===1}" v-on:click="reduceGoodNum()">-</span>
          <span>{{goodDefaultNum}}</span>
          <span v-on:click="addGoodNum()">+</span>
          <div class="clearFloat"></div>
        </div>
      </div>
      <div class="goodBtn">
        <span @click="addGwcThisGood()">加入购物车</span>
        <span>立即购买</span>
      </div>
    </div>
    <div class="clearFloat"></div>
    <div>
    <div class="goodMore">
      <span :class="{nowGoodMore:goodInforWord==1}" v-on:click="changeGoodInforWord('1')">商品介绍</span>
      <span :class="{nowGoodMore:goodInforWord==3}" v-on:click="changeGoodInforWord('3')">使用说明</span>
      <span :class="{nowGoodMore:goodInforWord==2}" v-on:click="changeGoodInforWord('2')">商品评论</span>
    </div>
    <div >
      <goodIntroduce :instruction="instructions" v-if="goodInforWord==1"></goodIntroduce>
      <instructions v-if="goodInforWord==3"></instructions>
      <goodComment :comments="commentList" v-if="goodInforWord==2"></goodComment>
    </div>
  </div>
  </div>

</template>

<script>
import goodIntroduce from './goodIntroduce'
import goodComment from './goodComment'
import instructions from './instructions'
import myAddress from './selectThree'
  export default {
    name: 'goodInfo',
    data () {
      return {
        nowGoodDetails:{},
        itemBrand:{},
        itemDetail:{},
        commentList:[],
        instructions:{},
        sureGoodAttr:null,
        saveGood:true,
        copyUrl:true,
        bigImgUrl:"1.png",
        goodDefaultNum:1,
        goodInforWord:1,
        ite: null,
        items: ['1','2','3','4','5','6'],
        goodAllImgs:['1','2','3','4','5']
      }
    },
    watch:{
      nowGoodDetails:{
        handler:function(){
          this.itemBrand = this.nowGoodDetails.itemBrand;
          this.itemDetail = this.nowGoodDetails.itemDetail;
          this.commentList = this.nowGoodDetails.commentList;
          this.goodAllImgs[0] = this.nowGoodDetails.itemDetail.itemPica;
          this.goodAllImgs[0] = this.nowGoodDetails.itemDetail.itemPicb;
          this.goodAllImgs[0] = this.nowGoodDetails.itemDetail.itemPicc;
          this.goodAllImgs[0] = this.nowGoodDetails.itemDetail.itemPicd;
          this.goodAllImgs[0] = this.nowGoodDetails.itemDetail.itemPice;
          this.bigImgUrl = this.goodAllImgs[0];
          this.items = this.nowGoodDetails.itemValueList;
          this.commentList = this.nowGoodDetails.commentList;
          this.instructions = this.nowGoodDetails.itemDetail;
          this.instructions.addName = this.nowGoodDetails.itemName;
        },
        deep:true
      }
    },
    created:function(){
      this.getNowGoodDetail();
    },
    methods:{
      getNowGoodDetail:function(){
        var that = this;
        var obj = {
          itemId:that.$route.params.goodId
        };
        that.global.axiosGetReq('/item/itemDetailDes',obj)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.nowGoodDetails = res.data.data;
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      addGoodNum:function () {
          this.goodDefaultNum += 1;
      },
      reduceGoodNum:function () {

        if(this.goodDefaultNum != 1){
          this.goodDefaultNum -= 1;
        }
      },
      changeGoodInforWord:function(arg){
        this.goodInforWord = arg;
      },
      changeAttSty:function(index,item){
        this.ite = index;
        this.sureGoodAttr = item.itemPropertyInfo;
      },
      enter:function(index){
        this.bigImgUrl = this.goodAllImgs[index];
      },
      showCllect:function(msg,arg){
        if(arg==1&&this.saveGood==true){
          this.$alert(msg, {confirmButtonText: '确定'});
          this.saveGood = false;
        }
        if(arg==2&&this.copyUrl==true){
          this.$alert(msg, {confirmButtonText: '确定'});
          this.copyUrl = false;
        }
      },
      addGwcThisGood:function(){
        var that = this;
        var obj = {
          phone:that.global.getUser().phone,
          itemId:that.nowGoodDetails.itemId,
          name:that.nowGoodDetails.itemName,
          pic:that.itemDetail.itemPica,
          num:that.goodDefaultNum,
          itemSKU:parseInt(Math.random()*100000),
          price:that.nowGoodDetails.itemPrice,
          itemPropertyNamea:that.sureGoodAttr,
          token:that.global.getToken()
        };
        if(!obj.itemPropertyNamea){
          that.$alert("请选择商品属性！", {confirmButtonText: '确定'});
        }else{
          that.global.axiosPostReq('/cart/add',obj)
          .then((res) => {
            console.log(res.data.data)
            if (res.data.callStatus === 'SUCCEED') {
              that.$alert("商品成功加入购物车！", {confirmButtonText: '确定'});
            } else {
              that.$message.error('网络出错，请稍后再试！');
            }
          });
        }

      }
    },
    components: {
      goodIntroduce,
      goodComment,
      instructions,
      myAddress,
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .onePxLine{
    border: none;border-top: 1px solid #e5e5e5;background:#e5e5e5;border-color:#e5e5e5;
  }
  .btnDef{
    background: #e5e5e5;
  }
  .goodInfo *{
  }
  .fullCut{
    color: #8d8d8d;
    font-size: 14px;
    /*margin-left: 70px;*/
    float: right;
  }
  .infoRight h3{
    position: relative;
  }
  .infoRight .shuxingWrap{
    min-height:30px;
    padding-top: 30px;

  }
  .infoRight .shuxing{
    float:right;
    margin-left:24px;
    height:auto;
    line-height: 50px;
  margin-top: -35px;
  }
  .infoRight h3 .ifdikou{
  position: absolute;
  top: -5px;
  right: 20%;
  height: 30px;
  vertical-align: middle;
  font-weight: normal;
  font-size: 14px;
  }
  .infoRight h3 .ifdikou img{
    margin-right: 15px;
    vertical-align: middle;
  }

  .goodInfo .infoRight .attSty1:hover {
    color:#5db7e8;
    border:1px solid #5db7e8;
  }
  .goodInfo .infoRight .attSty2 {
    color:#5db7e8;
    border:1px solid #5db7e8;
  }
  .details .clearFloat{
    clear:both;
    height: 0px;
  }
  .fontRed{
    color:#e0645b;
  }
  .goodInfo{
  	width: 1200px;
      margin: 0 auto;
      margin-bottom:50px;
  }
  .goodInfo .infoLeft{
  	width:400px;
    float:left;
    margin-right: 40px;
  }
  .goodInfo .infoRight{
  	width:63%;
  	float:right;
  }
  .infoRight h3{
    height:50px
  }
  .infoRight div{
    height:50px;
  }
  .infoRight .attSty1{
  display:inline-block;
    width:118px;
    line-height:38px;
    text-align: center;
    margin-left:38px;
    border:1px solid #e5e5e5;
    cursor: pointer;
    margin-bottom: 20px;
  }
  .infoLeft_1{
    width:400px;
    height:400px;
    border:1px solid #e5e5e5;
    text-align: center;
  }
  .infoLeft_1 span{
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
  .infoLeft_1 img{
    display: inline-block;
    vertical-align: middle;
    max-width: 100%;
    max-height: 100%;
  }


  .infoLeft_2{
  width:400px;
    margin:10px 0;
  }
  .infoLeft_2 ul li:nth-child(1){
    margin-left:0;
  }
  .infoLeft_2 li{
    width: 62px;
    height:62px;
      border: 1px solid #e5e5e5;
      float: left;
      margin-left: 20px;
      text-align: center;
  }
  .infoLeft_2 li:hover{
    cursor: pointer;
  }

  .infoLeft_2 li span{
  display: inline-block;
  height: 100%;
  vertical-align: middle;
  }

  .infoLeft_2 li img{
  display: inline-block;
  vertical-align: middle;
  max-width: 100%;
  max-height: 100%;
  }
  .infoLeft_3{
    text-align: right;
    width: 400px;
    margin-top: 30px;
  }
  .infoLeft_3 span{
    display: inline-block;
    margin-left: 25px;
    font-size: 14px;
    cursor: pointer;
  }
  .infoLeft_3 span img{
    margin-right: 10px;
  }

  .infoRight .calculator {
    float:right;
    /*margin-left: 50px;*/
    margin-right:75.3%;
    width:122px;
    border:1px solid #e5e5e5;
    height:40px;
  }
  .calculator span{
    width:40px;
    height:40px;
    display:inline-block;
    float:left;
    /*font-size:20px;*/
        text-align: center;
        cursor: pointer;
        line-height: 40px;
  }
  .calculator span:nth-child(2){
    border-left:1px solid #e5e5e5;
    border-right:1px solid #e5e5e5;
  }

  .goodBtn{
    margin-top: 32px;
    padding-left: 63px;
  }
  .goodBtn span{
      display: inline-block;
      width: 160px;
      text-align: center;
      border-radius: 3px;
      line-height: 40px;
      margin-right: 61px;
      font-size: 14px;
      cursor: pointer;
  }
  .goodBtn span:nth-child(1){
    background:#5db7e8;
    color: white;
  }
  .goodBtn span:nth-child(2){
    /*color: white;*/
    background:#e6e6e6;
  }
  .goodMore {
    border-bottom: 1px solid #e5e5e5;
    margin-top: 50px;

  }
  .goodMore span{
    margin-right: 20px;
    display: inline-block;
    line-height: 30px;
    width: 100px;
    text-align: center;
    cursor: pointer;
  }
  .nowGoodMore{
    border-bottom: 2px solid #5db7e8;
  }



</style>
