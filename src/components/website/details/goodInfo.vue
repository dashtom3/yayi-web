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
        <!-- 0表示没收藏 -->
        <span v-if="ifshoucang==0" v-on:click="showCllect('商品收藏成功！',1)">
          <img style="position:relative;top:1px"   src="../../../images/details/collect.png" />
          收藏
        </span>
        <span v-else v-on:click="cancleClloect()">
          <img style="position:relative;top:1px" src="../../../images/details/collect2.jpg" />
          已收藏
        </span>
        <!-- <span v-else>
          <img style="position:relative;top:1px"   src="../../../images/details/collect.png" />
          收藏
        </span> -->
        <span v-on:click="showCllect('连接复制成功，快去分享吧！',2)" v-on:mouseenter="showShareCol(1)" v-on:mouseout="showShareCol(2)">
          <img style="position:relative;top:3px" v-if="copyUrl" src="../../../images/details/share.png" />
          <img style="position:relative;top:3px" v-else src="../../../images/details/share2.png" />
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
        <div class="" v-for="(item, index1) in items" v-if="item.propertyName" style="line-height: 50px;">
          <span style="float:left">{{item.propertyName}}：</span>
          <div class="shuxing">
            <span :class="{ attSty2: index2 == item.propertyInfoList.checkWhich }"  class="attSty1" v-on:click="changeAttSty(index2,item,index1)" v-for="(oneAttrVal,index2) in item.propertyInfoList">
              {{oneAttrVal}}
            </span>
            <div class="clearFloat"></div>
          </div>
        </div>
        <!-- <span style="float:left">属性：</span>
        <div class="shuxing">
          <span :class="{ attSty2: index === ite }"  class="attSty1" v-on:click="changeAttSty(index,item)" v-for="(item, index) in items">{{item.itemPropertyInfo}}</span>
          <div class="clearFloat"></div>
        </div> -->
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
        <span @click="nowToBuyThis()">立即购买</span>
      </div>
    </div>
    <div class="clearFloat"></div>
    <div>
    <div class="goodMore">
      <span :class="{nowGoodMore:goodInforWord==1}" v-on:click="changeGoodInforWord('1','goodIntroduce')">商品介绍</span>
      <span :class="{nowGoodMore:goodInforWord==3}" v-on:click="changeGoodInforWord('3','instructions')">使用说明</span>
      <span :class="{nowGoodMore:goodInforWord==2}" v-on:click="changeGoodInforWord('2','goodComment')">商品评论</span>
    </div>
    <div >
      <transition name="component-fade" mode="out-in">
        <component :instruction="instructions" :comments="commentList"  :is="currentView" keep-alive></component>
      </transition>
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
        currentView:"goodIntroduce",
        attrLength:0,
        attrVal:[],
        ifshoucang:0,
        nowGoodDetails:{},
        itemBrand:{},
        itemDetail:{},
        commentList:[],
        instructions:{},
        sureGoodAttr:0,
        // saveGood:true,
        copyUrl:true,
        bigImgUrl:"1.png",
        goodDefaultNum:1,
        goodInforWord:1,
        ite: 0,
        items: [],
        goodAllImgs:[]
      }
    },
    watch:{
      nowGoodDetails:{
        handler:function(){
          this.itemBrand = this.nowGoodDetails.itemBrand;
          this.itemDetail = this.nowGoodDetails.itemDetail;
          this.commentList = this.nowGoodDetails.commentList;
          this.goodAllImgs[0] = this.nowGoodDetails.itemDetail.itemPica;
          this.goodAllImgs[1] = this.nowGoodDetails.itemDetail.itemPicb;
          this.goodAllImgs[2] = this.nowGoodDetails.itemDetail.itemPicc;
          this.goodAllImgs[3] = this.nowGoodDetails.itemDetail.itemPicd;
          this.goodAllImgs[4] = this.nowGoodDetails.itemDetail.itemPice;
          // console.log(this.goodAllImgs)
          this.bigImgUrl = this.goodAllImgs[0];
          this.items = this.nowGoodDetails.propertyList;
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
        var userToken = that.global.getToken();
        if(!userToken){
          userToken = "111";
        }
        var obj = {
          itemId:that.$route.params.goodId,
          token:userToken
        };
        that.global.axiosPostReq('/item/itemDetailDes',obj)
        .then((res) => {
          console.log(res,"getNowGoodDetail")
          if (res.data.callStatus === 'SUCCEED') {
            this.ifshoucang = res.data.num;
            that.nowGoodDetails = res.data.data;
            that.sureGoodAttr = that.nowGoodDetails.itemValueList[0].itemPropertyInfo;
            for(let i in that.nowGoodDetails.propertyList){
              if(that.nowGoodDetails.propertyList.propertyName){
                that.attrLength+=1;
              }
            }
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
      changeGoodInforWord:function(arg,view){
        this.goodInforWord = arg;
        this.currentView = view;
      },
      changeAttSty:function(indexC,item,indexP){
        var arr = ["itemPropertyInfo","itemPropertyTwoValue","itemPropertyThreeValue","itemPropertyFourValue","itemPropertyFiveValue","itemPropertySixValue"];
        var nowPrice;
        var that = this;
        // that.attrVal[item.propertyName] = item.propertyInfoList[indexC];
        that.attrVal[indexP] = item.propertyInfoList[indexC];
        this.ite = indexC;
        this.sureGoodAttr = item.itemPropertyInfo;
        var data = that.items[indexP];
        data.propertyInfoList.checkWhich = indexC;
        that.items.splice(indexP,1,data);
        var LIST = that.nowGoodDetails.itemValueList;
          if(that.attrVal.length==1){
            for(let i in LIST){
              if(that.attrVal[0]==LIST[i].itemPropertyInfo){
                nowPrice = LIST[i].itemSkuPrice;
              }
            }
          }else if(that.attrVal.length==2){
            for(let i in LIST){
              if(that.attrVal[0]==LIST[i].itemPropertyInfo&&that.attrVal[1]==LIST[i].itemPropertyTwoValue){
                nowPrice = LIST[i].itemSkuPrice;
              }
            }
          }else  if(that.attrVal.length==3){
            for(let i in LIST){
              if(that.attrVal[0]==LIST[i].itemPropertyInfo&&that.attrVal[1]==LIST[i].itemPropertyTwoValue&&that.attrVal[2]==LIST[i].itemPropertyThreeValue){
                nowPrice = LIST[i].itemSkuPrice;
              }
            }
          }else  if(that.attrVal.length==4){
            for(let i in LIST){
              if(that.attrVal[0]==LIST[i].itemPropertyInfo&&that.attrVal[1]==LIST[i].itemPropertyTwoValue&&that.attrVal[2]==LIST[i].itemPropertyThreeValue&&that.attrVal[3]==LIST[i].itemPropertyFourValue){
                nowPrice = LIST[i].itemSkuPrice;
              }
            }
          }else  if(that.attrVal.length==5){
            for(let i in LIST){
              if(that.attrVal[0]==LIST[i].itemPropertyInfo&&that.attrVal[1]==LIST[i].itemPropertyTwoValue&&that.attrVal[2]==LIST[i].itemPropertyThreeValue&&that.attrVal[3]==LIST[i].itemPropertyFourValue&&that.attrVal[4]==LIST[i].itemPropertyFiveValue){
                nowPrice = LIST[i].itemSkuPrice;
              }
            }
          }else  if(that.attrVal.length==6){
            for(let i in LIST){
              if(that.attrVal[0]==LIST[i].itemPropertyInfo&&that.attrVal[1]==LIST[i].itemPropertyTwoValue&&that.attrVal[2]==LIST[i].itemPropertyThreeValue&&that.attrVal[3]==LIST[i].itemPropertyFourValue&&that.attrVal[4]==LIST[i].itemPropertyFiveValue&&that.attrVal[5]==LIST[i].itemPropertyFiveValue){
                nowPrice = LIST[i].itemSkuPrice;
              }
            }
          }
        that.nowGoodDetails.itemPrice = nowPrice;
      },
      enter:function(index){
        this.bigImgUrl = this.goodAllImgs[index];
      },
      cancleClloect:function(){
        var that = this;
        var obj = {
          itemId:that.nowGoodDetails.itemId,
          phone:that.global.getUser().phone,
          token:that.global.getToken()
        };
          that.global.axiosPostReq('/mystar/deleteOne', obj)
          .then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              this.$alert("取消收藏成功！", {confirmButtonText: '确定'});
              this.ifshoucang = 0;
            } else {
              that.$message.error('网络出错，请稍后再试！');
            }
          });
      },
      showCllect:function(msg,arg){
        var that = this;
        if(arg==1){
          if(that.global.getUser()){
            var obj = {
              phone:that.global.getUser().phone,
              itemId:that.nowGoodDetails.itemId,
              itemSKU:parseInt(Math.random()*100000),
              token:that.global.getToken()
            };
            that.global.axiosPostReq('/cart/star',obj)
            .then((res) => {
              if (res.data.callStatus === 'SUCCEED') {
                that.$alert("收藏成功！", {confirmButtonText: '确定'});
                that.ifshoucang = 1;
              } else {
                that.$message.error('网络出错，请稍后再试！');
              }
            });
          }else{
            this.$alert("请先登录后再收藏！", {confirmButtonText: '确定'});
          }
        }
        if(arg==2){
          var url = window.location.href;
          window.prompt("请复制链接",url);
          // var address = ''
          // address += url
          // window.clipboardData.setData("Text",address);
          // that.$alert("链接复制成功！", {confirmButtonText: '确定'});
          // that.copyUrl = false;
        }
      },
      showShareCol:function(arg){
        var that = this;
        if(arg==1){
          that.copyUrl = false;
        }else{
          that.copyUrl = true;
        }
      },
      addGwcThisGood:function(){
        var that = this;
        if(that.global.getUser()){
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
            that.global.axiosPostReq('/cart/add',obj)
            .then((res) => {
              if (res.data.callStatus === 'SUCCEED') {
                that.$alert("商品成功加入购物车！", {confirmButtonText: '确定'});
              } else {
                that.$message.error('网络出错，请稍后再试！');
              }
            });
        }else{
          that.$alert('未登录，请先登录！',  {confirmButtonText: '确定',callback: action => {  that.$emit("goodInfoSay","sayToLogin");  }});
        }
      },
      nowToBuyThis:function(){
        var that = this;
        var userToken = that.global.getToken();
        if(userToken){

        }else{
          that.$alert('未登录，请先登录！',  {confirmButtonText: '确定',callback: action => {  that.$emit("goodInfoSay","sayToLogin");  }});
        }
      },
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
    border: none;border-top: 1px solid #e5e5e5;background:#e5e5e5;border-color:#e5e5e5;margin-bottom: 8px;
  }
  .btnDef{
    background: #e5e5e5;
  }
  .goodInfo *{
  }
  .fullCut{
    color: #8d8d8d;
    font-size: 14px;
    float: right;
  }
  .infoRight h3{
    position: relative;
  }
  .infoRight .shuxingWrap{
    min-height:30px;
  }
  .infoRight .shuxing{
    height:auto;
    line-height: 50px;
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
    width:88px;
    line-height:30px;
    text-align: center;
    margin-left:40px;
    border:1px solid #e5e5e5;
    cursor: pointer;
    /*margin-bottom: 20px;*/
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
  .goodBtn span:nth-child(1):hover{
    background:#57a5cf;
  }
  .goodBtn span:nth-child(2){
    color: white;
    background:#5ed6dc;
  }
  .goodBtn span:nth-child(2):hover{
    background:#54c5cb;
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
