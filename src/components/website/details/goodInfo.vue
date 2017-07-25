<template>
  <div class="goodInfo">
  	<div class="infoLeft">
      <div class="infoLeft_1">
        <img :src="bigImgUrl" />
      </div>
      <div class="infoLeft_2">
        <ul>
          <li v-on:mouseenter="enter(index)" v-for="(goodImg ,index) in goodAllImgs" v-if="goodImg">
            <img  :src="goodAllImgs[index]" />
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
        <!-- <span v-on:click="showCllect('连接复制成功，快去分享吧！',2)" v-on:mouseenter="showShareCol(1)" v-on:mouseout="showShareCol(2)">
          <img style="position:relative;top:3px" v-if="copyUrl" src="../../../images/details/share.png" />
          <img style="position:relative;top:3px" v-else src="../../../images/details/share2.png" />
          分享
        </span> -->
      </div>
    </div>
  	<div class="infoRight">
      <h3>{{nowGoodDetails.itemName}}
        <!-- <span class="ifdikou"><img src="../../../images/details/1.png" alt="">支持钱币抵扣</span> -->
      </h3>
      <div class="priceWrap">
        价格：<span class="fontRed">￥{{nowGoodDetails.itemPrice}}</span>
        <span style="float:right">已售：{{nowGoodDetails.sales}}</span>
      </div>
      <div class="priceWrap">
        品牌：{{itemBrand.itemBrandName}}
      </div>
      <div class="priceWrap">
        运费：全国满199元包邮
      </div>
      <div class="priceWrap">
        注册证号：{{itemDetail.registerId}}
      </div>
      <hr class="onePxLine" color="e5e5e5"></hr>
      <div class="shuxingWrap" style="height:auto">
        <div class="" v-for="(item, index1) in items" v-if="item.propertyName" >
          <span style="float:left">{{item.propertyName}}：</span>
          <div class="shuxing">
            <button :class="{ attSty2: index2 == item.checkWhich}"  class="attSty1" v-on:click="changeAttSty(index2,item,index1)" v-for="(oneAttrVal,index2) in item.propertyInfoList"  :disabled = "!oneAttrVal.enabled">
              {{oneAttrVal.data}}
            </button>
            <div class="clearFloat"></div>
          </div>
        </div>
        <div class="clearFloat"></div>
      </div>
      <div class="priceWrap">
        数量：
        <div class="calculator">
          <span :class="{btnDef:goodDefaultNum===1}" v-on:click="reduceGoodNum()">-</span>
          <span>{{goodDefaultNum}}</span>
          <span v-on:click="addGoodNum()">+</span>
          <span v-if="!kuCunBuZu" class="kucunbuzu">缺货</span>
          <div class="clearFloat"></div>
        </div>
        <div style="clear:both"></div>
      </div>
      <div v-if="kuCunBuZu" class="goodBtn">
        <span @click="addGwcThisGood()">加入购物车</span>
        <span @click="nowToBuyThis()">立即购买</span>
      </div>
      <div v-else class="goodBtn kucunbuzu">
        <span >加入购物车</span>
        <span >立即购买</span>
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
        kuCunBuZu:true,
        attrLength:0,
        nowGoodSKU:null,
        attrVal:[],
        ifshoucang:0,
        nowGoodDetails:{},
        itemBrand:{},
        itemDetail:{},
        commentList:[],
        instructions:{},
        sureGoodAttr:0,
        copyUrl:true,
        bigImgUrl:"1.png",
        goodDefaultNum:1,
        goodInforWord:1,
        ite: 0,
        items: [],
        goodAllImgs:[],
        itemKey:[["itemPropertyName","itemPropertyInfo"],["itemPropertyNameTwo","itemPropertyTwoValue"],["itemPropertyNameThree","itemPropertyThreeValue"],["itemPropertyFourName","itemPropertyFourValue"],["itemPropertyFiveName","itemPropertyFiveValue"],["itemPropertySixName","itemPropertySixValue"]]
      }
    },
    created:function(){
      this.getNowGoodDetail();
    },
    methods:{
      nowGoodSKUDefault:function(){
        var that =this;
        var obj = {};
        var attrs = [];
        var LIST = that.nowGoodDetails.itemValueList;
        for(let i in LIST){
          if(LIST[i].itemSKU == that.nowGoodSKU){
            obj = LIST[i];
            break;
          }
        }
      },
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
          console.log(res.data,"getNowGoodDetail")
          if (res.data.callStatus === 'SUCCEED') {
            that.ifshoucang = res.data.num;
            that.nowGoodSKU = res.data.msg;
            that.nowGoodDetails = res.data.data;
            that.sureGoodAttr = that.nowGoodDetails.itemValueList[0].itemPropertyInfo;
            that.itemBrand = that.nowGoodDetails.itemBrand;
            that.itemDetail = that.nowGoodDetails.itemDetail;
            that.commentList = that.nowGoodDetails.commentList;
            that.goodAllImgs[0] = that.nowGoodDetails.itemDetail.itemPica;
            that.goodAllImgs[1] = that.nowGoodDetails.itemDetail.itemPicb;
            that.goodAllImgs[2] = that.nowGoodDetails.itemDetail.itemPicc;
            that.goodAllImgs[3] = that.nowGoodDetails.itemDetail.itemPicd;
            that.goodAllImgs[4] = that.nowGoodDetails.itemDetail.itemPice;
            that.bigImgUrl = that.goodAllImgs[0];
            that.items = that.nowGoodDetails.propertyList;
            that.commentList = that.nowGoodDetails.commentList;
            that.instructions = that.nowGoodDetails.itemDetail;
            that.instructions.addName = that.nowGoodDetails.itemName;
            that.instructions.itemBrandName = that.nowGoodDetails.itemBrand.itemBrandName;
            for(let i in that.nowGoodDetails.propertyList){
              if(that.nowGoodDetails.propertyList.propertyName){
                that.attrLength+=1;
              }
              for(var j=0;j<that.nowGoodDetails.propertyList[i].propertyInfoList.length;j++){
                that.nowGoodDetails.propertyList[i].propertyInfoList[j] = {data:that.nowGoodDetails.propertyList[i].propertyInfoList[j],enabled:true}
              }
            }
            if(that.nowGoodDetails.itemValueList[0].stockNum==0){
              that.kuCunBuZu = false;
            }
            that.nowGoodSKUDefault();
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      addGoodNum:function () {
          this.goodDefaultNum += 1;
          this.jiSuanKuCun();
      },
      reduceGoodNum:function () {
        if(this.goodDefaultNum != 1){
          this.goodDefaultNum -= 1;
        }
        this.jiSuanKuCun();
      },
      changeGoodInforWord:function(arg,view){
        this.goodInforWord = arg;
        this.currentView = view;
      },
      checkDisabled: function(){

      },
      jiSuanKuCun:function(){
        var that = this;
        var jiSuanSkuObj = that.jiSuanSku();
        if(jiSuanSkuObj.sku){
          that.nowGoodDetails.itemPrice = jiSuanSkuObj.obj.itemSkuPrice;
          var kuCun = jiSuanSkuObj.obj.stockNum;
          if(that.goodDefaultNum>kuCun){
            that.kuCunBuZu = false;
          }else{
            that.kuCunBuZu = true;
          }
        }
      },
      //indexC 子数组第几位 item 数组第几行的数据  indexP  当前数组第几行
      changeAttSty:function(indexC,item,indexP){
        var that = this;
        if (item.checkWhich == indexC) {
          that.nowGoodDetails.propertyList.splice(indexP,1,{propertyInfoList:item.propertyInfoList,propertyName:item.propertyName,checkWhich: null })
        } else {
          that.nowGoodDetails.propertyList.splice(indexP,1,{propertyInfoList:item.propertyInfoList,propertyName:item.propertyName,checkWhich: indexC })
        }
        for(var i=0;i<that.nowGoodDetails.propertyList.length;i++){
          for(var j=0;j<that.nowGoodDetails.propertyList[i].propertyInfoList.length;j++){
            if(that.nowGoodDetails.propertyList[i].checkWhich == j) {
              that.nowGoodDetails.propertyList[i].propertyInfoList[j].enabled = true
            } else {
              that.nowGoodDetails.propertyList[i].propertyInfoList[j].enabled = false
            }
          }
        }
        //propertyList  循环数据 itemValueList 所有属性组合
        for(var j=0;j<that.nowGoodDetails.itemValueList.length;j++){
          if(that.nowGoodDetails.itemValueList[j].canUse == 1){
            var tempNum = 0
            var temp = []
            var temp2 = []
            for(var i=0;i<that.nowGoodDetails.propertyList.length;i++){
              if(that.nowGoodDetails.itemValueList[j][that.itemKey[i][0]] != "") {
                if(that.nowGoodDetails.propertyList[i].checkWhich == null) {
                  temp2.push(i)
                }else if(that.nowGoodDetails.propertyList[i].propertyInfoList[that.nowGoodDetails.propertyList[i].checkWhich].data != that.nowGoodDetails.itemValueList[j][that.itemKey[i][1]]) {
                  tempNum++
                  if(tempNum>1){
                    break;
                  }
                  temp.push(i)
                }
              }
            }
            if(tempNum == 0){
              for(var i = 0;i<temp2.length;i++){
                for(var k=0;k<that.nowGoodDetails.propertyList[temp2[i]].propertyInfoList.length;k++){
                  if(that.nowGoodDetails.propertyList[temp2[i]].propertyInfoList[k].data == that.nowGoodDetails.itemValueList[j][that.itemKey[temp2[i]][1]] ) {
                    that.nowGoodDetails.propertyList[temp2[i]].propertyInfoList[k].enabled = true
                  }
                }
              }
            }else if(tempNum == 1){
              for(var i = 0;i<temp.length;i++){
                for(var k=0;k<that.nowGoodDetails.propertyList[temp[i]].propertyInfoList.length;k++){
                  if(that.nowGoodDetails.propertyList[temp[i]].propertyInfoList[k].data == that.nowGoodDetails.itemValueList[j][that.itemKey[temp[i]][1]] ) {
                    that.nowGoodDetails.propertyList[temp[i]].propertyInfoList[k].enabled = true
                  }
                }
              }
            }
          }
        }
        this.jiSuanKuCun();
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
        var nowSku = that.jiSuanSku().sku;

        if(that.global.getUser()){
          if(nowSku){
            var obj = {
              num:that.goodDefaultNum,
              itemSKU:nowSku,
              token:that.global.getToken()
            };
            console.log(obj,"addGwcThisGoodObj")
            that.global.axiosPostReq('/cart/add',obj)
            .then((res) => {
              console.log(res)
              if (res.data.callStatus === 'SUCCEED') {
                that.$alert("商品成功加入购物车！", {confirmButtonText: '确定'});
              } else {
                that.$message.error('网络出错，请稍后再试！');
              }
            });
          }else{
            that.$alert('请选择正确的商品属性！',  {confirmButtonText: '确定',});
          }
        }else{
          var num = Math.random();
          that.$alert('未登录，请先登录！',  {confirmButtonText: '确定',callback: action => {  that.$emit("goodInfoSay",num);  }});
        }
      },
      jiSuanSku:function(){
        var that = this;
        var returnObj = {};
        var havaSelectVals = [];
        var nowGoodValLength = 0;
        var list2 = that.nowGoodDetails.propertyList;
        for(let a in list2){
          if(list2[a].propertyName){
            nowGoodValLength = parseInt(a) + 1;
          }
          if(list2[a].checkWhich>=0 && list2[a].checkWhich!=null){
            havaSelectVals.push(list2[a].propertyInfoList[list2[a].checkWhich].data);
          }else{
            continue;
          }
        }
        var list1 = that.nowGoodDetails.itemValueList;
        for(let i in list1){
          var valsArr = [];
          if(list1[i].itemPropertyInfo){
            valsArr.push(list1[i].itemPropertyInfo);
          }
          if(list1[i].itemPropertyTwoValue){
            valsArr.push(list1[i].itemPropertyTwoValue);
          }
          if(list1[i].itemPropertyThreeValue){
            valsArr.push(list1[i].itemPropertyThreeValue);
          }
          if(list1[i].itemPropertyFourValue){
            valsArr.push(list1[i].itemPropertyFourValue);
          }
          if(list1[i].itemPropertyFiveValue){
            valsArr.push(list1[i].itemPropertyFiveValue);
          }
          if(list1[i].itemPropertySixValue){
            valsArr.push(list1[i].itemPropertySixValue);
          }
          list1.arr = valsArr;
          if(havaSelectVals.length==nowGoodValLength){
            var flag = true;
            for(let c in havaSelectVals){
              if(havaSelectVals[c]==valsArr[c]){

              }else{
                flag = false;
              }
            }
            if(flag){
              returnObj.sku = list1[i].itemSKU;
              returnObj.obj= list1[i];
              break;
            }else{
              continue;
            }
          }else{
            continue;
          }
        }
        return returnObj;
      },
      nowToBuyThis:function(){
        var that = this;
        var userToken = that.global.getToken();
        var nowSku = that.jiSuanSku().sku;
        if(userToken){
          if(nowSku){
            if(that.global.getUser()){
              var sendData = {};
              sendData.details = [];

              var obj = {
                itemId:that.nowGoodDetails.itemId,
                itemName:that.nowGoodDetails.itemName,
                picPath:that.itemDetail.itemPica,
                num:that.goodDefaultNum,
                itemSKU:nowSku,
                price:that.nowGoodDetails.itemPrice,
                goodBrandName:that.nowGoodDetails.itemBrand.itemBrandName,
                goodSort:that.nowGoodDetails.itemSort
              };
              sendData.allMoney = that.nowGoodDetails.itemPrice * 100 * that.goodDefaultNum / 100;
              var list = that.nowGoodDetails.itemValueList;
              for(let i in list){
                if(nowSku==list[i].itemSKU){
                  obj.itemPropertyInfo = list[i].itemPropertyInfo;
                  obj.itemPropertyTwoValue = list[i].itemPropertyTwoValue;
                  obj.itemPropertyThreeValue = list[i].itemPropertyThreeValue;
                  obj.itemPropertyFourValue = list[i].itemPropertyFourValue;
                  obj.itemPropertyFiveValue = list[i].itemPropertyFiveValue;
                  obj.itemPropertySixValue = list[i].itemPropertySixValue;
                  break;
                }
              }
              sendData.haveSelectedGoodNum = that.goodDefaultNum;
              sendData.details.push(obj)
              window.sessionStorage.setItem("suborderData",JSON.stringify(sendData));
              that.$router.push({path: '/suborder'})
            }
          }else{
            that.$alert('请选择正确的商品属性！',  {confirmButtonText: '确定',});
          }
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
.priceWrap{
  margin-bottom: 20px;
}
.fontColorRed{
  color: red !important;
}
  .onePxLine{
    border: none;border-top: 1px solid #e5e5e5;background:#e5e5e5;border-color:#e5e5e5;margin-bottom: 20px;
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
  }
  .infoRight .shuxing{
    height:auto;
    padding-left: 100px;
    margin-bottom: 20px;
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
.goodInfo .infoRight .attSty1{
  background: none;
}
  .goodInfo .infoRight .attSty1:hover {
    /*color:#5db7e8;
    border:1px solid #5db7e8;*/
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
    margin-bottom: 20px;
  }
  .infoRight .attSty1{
  display:inline-block;
    width:92px;
    line-height:28px;
    text-align: center;
    border:1px solid #e5e5e5;
    cursor: pointer;
    margin-right: 15px;
  }
  .infoLeft_1{
    width:400px;
    height:400px;
    border:1px solid #e5e5e5;
    text-align: center;
  }
  .infoLeft_1 img{
    display: block;
    vertical-align: middle;
    max-width: 100%;
    max-height: 100%;
    margin: auto;
    margin-top: 50%;
    transform: translateY(-50%);
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


  .infoLeft_2 li img{
  display: block;
  margin: auto;
  margin-top: 50%;
  transform: translateY(-50%);
  max-width: 100%;
  max-height: 100%;
  }
  .infoLeft_3{
    text-align: right;
    width: 400px;
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
    margin-right:74.1%;
    width:92px;
    border:1px solid #e5e5e5;
    height:30px;
    position: relative;
  }
  .calculator .kucunbuzu{
    position: absolute;
    right: -50px;
  }
  .calculator span{
    width:30px;
    height:30px;
    display:inline-block;
    float:left;
    /*font-size:20px;*/
        text-align: center;
        cursor: pointer;
        line-height: 30px;
  }
  .calculator span:nth-child(2){
    border-left:1px solid #e5e5e5;
    border-right:1px solid #e5e5e5;
  }

  .goodBtn{
    padding-left: 102px;
  }
  .kucunbuzu span{
    color: #333 !important;
    background: #ececec !important;
  }
  .goodBtn span{
      display: inline-block;
      width: 160px;
      text-align: center;
      border-radius: 3px;
      line-height: 40px;
      margin-right: 20px;
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
    margin-top: 30px;

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
