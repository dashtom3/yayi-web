<template>
  <div class="">
    <publicHeader></publicHeader>
    <img class="notLogin" v-if="gwcGoods.length<=0" src="../../../images/gwc/5.png" alt="">
    <div v-else class="gwcWrap" >
      <div class="lgoinConfirm" v-if="isLogin==false">
        您还没有登陆，登录后购物车的商品将保存到您账户中!
        <img src="../../../images/gwc/gwc3.png" alt="">
      </div>
      <div class="allGoods">  全部商品（{{gwcGoods.length}}）</div>
      <div class="gwcTitle">
        <span class="cursorPointer" v-on:click="checkAll()">
          <el-checkbox v-model="selectaLL">全选</el-checkbox>
        </span>
        <span>商品信息</span>
        <span>单价(元)</span>
        <span>数量</span>
        <span>小计(元)</span>
        <span>操作</span>
      </div>
      <div style="min-height:455px;padding-bottom:90px;">
      <div :class="{thisGoodIsNokuCun:good.state!=1}" class="oneGood" v-for="(good,index) in gwcGoods" :key="good.itemPropertyInfo" >
        <div v-if="good.state==1">
          <div class="">
            <el-checkbox  style="float:left;margin-top:33px;"  v-model="good.checked"></el-checkbox>
            <div class="imgWrap" @click="goToThisDetail(good)">
                <img :src="good.pic+'?imageView2/1/w/80/h/80'" alt="">
            </div>
          </div>
          <div class="goodInfo">
            <span>{{good.name}}</span>
            <p>
              <span v-if="good.itemPropertyInfo">{{good.itemPropertyInfo}}</span>
              <span v-if="good.itemPropertyTwoValue">；{{good.itemPropertyTwoValue}}</span>
              <span v-if="good.itemPropertyThreeValue">；{{good.itemPropertyThreeValue}}</span>
              <span v-if="good.itemPropertyFourValue">；{{good.itemPropertyFourValue}}</span>
              <span v-if="good.itemPropertyFiveValue">；{{good.itemPropertyFiveValue}}</span>
              <span v-if="good.itemPropertySixValue">；{{good.itemPropertySixValue}}</span>
            </p>
          </div>
          <div class="onePrice">
            <span>￥{{good.price}}</span>
          </div>
          <div class="jisuanqi">
            <div class="" :class="{thismargin:good.num<good.goodLeaveNum}">
              <span :class="{colorBlue:good.num>1}" v-on:click="reduceGood(index,good)">-</span>
              <input @change="oneGoodNumChange(index,good)" type="text" v-model="good.num">
              <span :class="{colorBlue:good.num<good.goodLeaveNum-1}" v-on:click="addGood(index,good)">+</span>
            </div>
            <div class="" v-show="good.num>=good.goodLeaveNum">(库存{{good.goodLeaveNum}}件)</div>
          </div>
          <div class="thisPrice">
              ￥{{good.price*good.num}}
          </div>
          <div class="operas">
            <span :class="{colorBlue:index==addBlueColor}" v-on:mouseenter="showBlue(index)" v-on:mouseleave="hideBlue(index)" v-on:click="saveOne(index,good)">收藏</span>
            <span class="colorRed" v-on:click="deleteOne(index,good)">删除</span>
          </div>
          <div style="clear:both"> </div>
        </div>
        <div v-else class="goodIsNoUser">
          <span class="thisGoodIsNoUser">
            <img src="../../../images/gwc/nouser.png" alt="">
            <!-- <span style="width: 0;
              height: 0;
              border-top: 50px solid #999999;
              border-right: 50px solid transparent;position:absolute;top:0;left:0;z-index:0"></span>
              <span style="z-index:100">失效</span> -->
            </span>
          <div class="" @click="goToThisDetail(good)">
            <span class="nowUserGood">失效</span>
            <div style="margin-left:0;" class="imgWrap" ><img :src="good.pic+'?imageView2/1/w/80/h/80'" alt=""></div>
          </div>
          <div class="goodInfo">
            <span>{{good.name}}</span>
            <p>
              <span v-if="good.itemPropertyInfo">{{good.itemPropertyInfo}}</span>
              <span v-if="good.itemPropertyTwoValue">；{{good.itemPropertyTwoValue}}</span>
              <span v-if="good.itemPropertyThreeValue">；{{good.itemPropertyThreeValue}}</span>
              <span v-if="good.itemPropertyFourValue">；{{good.itemPropertyFourValue}}</span>
              <span v-if="good.itemPropertyFiveValue">；{{good.itemPropertyFiveValue}}</span>
              <span v-if="good.itemPropertySixValue">；{{good.itemPropertySixValue}}</span>
            </p>
          </div>
          <div class="onePrice"> <span>￥{{good.price}}</span></div>
          <div class="jisuanqi">
            <div class="" :class="{thismargin:good.num<good.goodLeaveNum}">
              <span>-</span>
              <input style="background:#cccccc" type="text" disabled="true" v-model="good.num">
              <span>+</span>
            </div>
            <div class=""  v-show="good.num>=good.goodLeaveNum">（库存为0）</div>
          </div>
          <div class="thisPrice"> ￥{{good.price*good.num}} </div>
          <div class="operas" style="width:154px;text-align:right">
            <span style="margin-top:28px;margin-right:6px;cursor:pointer !important" class="colorRed" v-on:click="deleteOne(index,good)">删除</span>
          </div>
          <div style="clear:both"> </div>
        </div>
      </div>
</div>

<!-- <div style="height:128px;" v-if="jiwsuanbtnFixed"></div> -->
<div class="goodFooterWrap" :class="{jiwsuanbtnFixedClass:jiwsuanbtnFixed}">
  <div class="goodsFooter" >
    <div class="selectaLLFooter cursorPointer" v-on:click="checkAll()">
      <el-checkbox v-model="selectaLL">全选</el-checkbox>
    </div>
    <div class="footerOpera">
      <span v-on:click="deleteAll()">删除</span>
      <span v-on:click="saveAll()" class="colorBlue">收藏</span>
      <span v-on:click="clearAllGoodNoUser()" class="colorBlue">清空失效商品</span>
    </div>
    <div class="haveSelectedGoodNum">
      <span>已选择<span class="colorRed">{{haveSelectedGoodNum}}</span>件商品</span>
    </div>
    <div class="zongji">
      <span class="asdg">总计:<span class="colorRed">￥{{allMoeny}}</span></span>
    </div>
    <div class="jiesuanbtn">
      <span v-on:click="goToSuborder()">结算</span>
    </div>
  </div>
</div>

    </div>
    <publicFooter></publicFooter>
  </div>
</template>

<script>
  import publicHeader from '../index/publicHeader'
  import classify from '../index/classify'
  import publicFooter from '../index/publicFooter'
  export default {
    name: 'gwc',
    data () {
      return {
        isLogin:true,
        jiwsuanbtnFixed:false,
        addBlueColor:null,
        allMoeny:0,
        haveSelectedGoodNum:0,
        selectaLL:false,
        gwcGoods:[],
        sendDataList:[]
      }
    },
    components: {
      publicHeader,
      classify,
      publicFooter
    },
    watch:{
      selectaLL:function(){
        // if(this.selectaLL){
        //   for(let a= 0;a<this.gwcGoods.length;a++){
        //       this.gwcGoods[a].checked=true;;
        //   }
        // }else{
        //   for(let a= 0;a<this.gwcGoods.length;a++){
        //       this.gwcGoods[a].checked=false;;
        //   }
        // }
      },
      gwcGoods:{
        handler:function(){
          this.allMoeny = 0;
          this.haveSelectedGoodNum = 0;
          this.sendDataList = [];
          var flag = true;
          for(let a= 0;a<this.gwcGoods.length;a++){
            if(this.gwcGoods[a].checked&&this.gwcGoods[a].state==1){
              this.allMoeny+=this.gwcGoods[a].price*this.gwcGoods[a].num;
              this.haveSelectedGoodNum+= parseInt(this.gwcGoods[a].num);
              this.sendDataList.push(this.gwcGoods[a]);
            }else{
              this.selectaLL = false;
              flag = false;
            }
          }
          if(flag){
            this.selectaLL = true;
          }else{
            this.selectaLL = false;
          }
        },
        deep:true
      }
    },

    created:function(){
      var that = this
      that.getGwcList();

    },
    methods: {
      oneGoodNumChange:function(index,good){
        if(good.num < 0 ){
          return false;
        }
        if(good.num>good.goodLeaveNum){
          good.num = good.goodLeaveNum;
        }else{
          good.num = parseInt(good.num);
        }
        var that = this;
        that.updataNum(this.gwcGoods[index].num,good);
      },
      clearAllGoodNoUser:function(){
        var that = this;
        that.global.axiosPostReq('/cart/clear')
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.getGwcList();
          } else {
            // that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      getGwcList:function(){
        var that = this;
        var obj = {
          token:that.global.getToken()
        };
        that.global.axiosGetReq('/cart/list', obj)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            var data = res.data.data;
            for(let i in data){
              data[i].checked = false;
              data[i].totalMoney = data[i].num*data[i].price;
            }
            this.gwcGoods = data;
            that.calculationPayBtnPosi();
            window.onscroll = function(){
              var HEIGHT = window.innerHeight; //网页的高度
              var flag = document.body.scrollHeight - document.body.scrollTop - HEIGHT;
              if(flag < 275){
                that.jiwsuanbtnFixed = false;
              }
              if(flag > 375){
                that.jiwsuanbtnFixed = true;
              }
              // console.log(that.jiwsuanbtnFixed)
            };
          } else {
            // that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      goToSuborder:function(){
        var that = this;
        var sendData = {};
        sendData.allMoney = that.allMoeny;
        if(sendData.allMoney>0){
          //验证该用户有无完善个人资料
          var params = {
            phone: that.global.getUser().phone,
            token: that.global.getToken()
          }
          that.global.axiosGetReq('/userPersonalInfo/detail', params).then((res) => {
            if (res.data.callStatus === 'SUCCEED') { 
              if(res.data.data && res.data.data.trueName === '' || res.data.data.trueName === null){
                this.$alert('请先完善个人信息', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$router.push({name: '个人资料', params: {message: 4}});
                  }
                });
              }else{
                for(let i in that.sendDataList){
                  that.sendDataList[i].totalMoney = that.sendDataList[i].price*that.sendDataList[i].num;
                  that.sendDataList[i].itemName = that.sendDataList[i].name;
                  that.sendDataList[i].picPath = that.sendDataList[i].pic;
                  that.sendDataList[i].goodBrandName = that.sendDataList[i].itemBrandName;
                  that.sendDataList[i].goodSort = that.sendDataList[i].itemSort;
                }
                sendData.details = that.sendDataList;
                sendData.haveSelectedGoodNum = that.haveSelectedGoodNum;
                window.sessionStorage.setItem("suborderData",JSON.stringify(sendData));
                that.$router.push({path: '/suborder'})
              }
            }
          })
        }else{
          that.$alert("请至少选择一件商品！", {confirmButtonText: '确定'});
        }
      },
      deleteAll:function(){
        var that = this;
        if(that.sendDataList.length==0){
            that.$alert("请至少选择一件商品！", {confirmButtonText: '确定'});
        }else{
          that.$confirm('此操作将移除所有商品, 是否继续?', '删除所有商品', {
            confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'
          }).then(() => {
            var obj = {
              token:that.global.getToken(),
              itemSKU:[]
            };
            for(let i in that.sendDataList){
              obj.itemSKU.push(that.sendDataList[i].itemSKU);
            }
            obj.itemSKU = obj.itemSKU.join(",");
            that.global.axiosPostReq('/cart/delete', obj)
            .then((res) => {
              if (res.data.callStatus === 'SUCCEED') {
                that.gwcGoods=[];
                that.$message({  type: 'success',  message: '删除成功!'});
              } else {
                // that.$message.error('网络出错，请稍后再试！');
              }
            })
          }).catch(() => {
            that.$message({type: 'info',message: '已取消'});
          });
        }
      },
      saveAll:function(){
        var that = this;
        if(that.sendDataList.length==0){
            that.$alert("请至少选择一件商品！", {confirmButtonText: '确定'});
        }else{
          that.$confirm('添加至收藏夹后，商品将不在购物车显示，是否全部添加到收藏夹', '全部添加至收藏夹', {
            confirmButtonText: '确定',cancelButtonText: '取消', type: 'warning'
          }).then(() => {
            var obj = {
              token:that.global.getToken(),
              itemId:[],
              itemSKU:[]
            };
            for(let i in that.sendDataList){
                itemId.push(that.sendDataList[i].itemId);
                itemSKU.push(that.sendDataList[i].itemSKU);
            }
            obj.itemSKU = obj.itemSKU.join(",");
            obj.itemId = obj.itemId.join(",");
            that.global.axiosPostReq('/cart/star', obj)
            .then((res) => {
              if (res.data.callStatus === 'SUCCEED') {
                this.gwcGoods=[];
              } else {
                // that.$message.error('网络出错，请稍后再试！');
              }
            })
          }).catch(() => {
            that.$message({type: 'info',message: '已取消'});
          });
        }
      },
      checkAll:function () {
        if(this.selectaLL){
          for(var i=0;i<this.gwcGoods.length;i++){
            var data = this.gwcGoods[i];
            data.checked = true;
            this.gwcGoods.splice(i,1,data);
             }
        }else{
          for(var i=0;i<this.gwcGoods.length;i++){
            var data = this.gwcGoods[i];
            data.checked = false;
            this.gwcGoods.splice(i,1,data);
            // this.gwcGoods[i].checked = false;
          }
        }
        this.selectaLL = !this.selectaLL;
      },
      reduceGood:function (index,good) {
        var that = this;
        if(this.gwcGoods[index].num!=1){
          this.gwcGoods[index].num--;
          that.updataNum(this.gwcGoods[index].num,good);
        }else{

        }
      },
      addGood:function(index,good){
        var that = this;
        if(this.gwcGoods[index].num<this.gwcGoods[index].goodLeaveNum){
          this.gwcGoods[index].num++;
          that.updataNum(this.gwcGoods[index].num,good);
        }
      },
      updataNum:function(num,good){
        var that = this;
        var obj = {
          phone:that.global.getUser().phone,
          num:num,
          itemSKU:good.itemSKU,
          token:that.global.getToken()
        };
        // console.log(obj)
        that.global.axiosPostReq('/cart/updateNum', obj)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            // this.gwcGoods.splice(index,1);
            // this.$message({type: 'success',  message: '商品收藏成功!' });
          } else {
            // that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      showBlue:function(index){
        this.addBlueColor = index;
      },
      hideBlue:function(index){
        this.addBlueColor = null;
      },
      calculationPayBtnPosi:function(){
        var that = this;
        var HEIGHT = window.innerHeight;
        HEIGHT = HEIGHT-28-63-50-21-50-21-10;
        var flag = HEIGHT - that.gwcGoods.length*148-375;
        // console.log(flag)
        if(flag<0){
          that.jiwsuanbtnFixed = true;
        }else{
          that.jiwsuanbtnFixed = false
        }
        // console.log(HEIGHT)
      },
      saveOne:function(index,good){
        var that = this;
        that.$confirm('添加至收藏夹后，该商品将不在购物车显示!', '添加至收藏夹', {
          confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'
        }).then(() => {
          var obj = {
            phone:that.global.getUser().phone,
            itemId:good.itemId,
            itemSKU:good.itemSKU,
            token:that.global.getToken()
          };
          that.global.axiosPostReq('/cart/star', obj)
          .then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              that.gwcGoods.splice(index,1);
            } else {
              // that.$message.error('网络出错，请稍后再试！');
            }
          })
        })
      },
      deleteOne:function(index,good){
        var that = this;
        that.$confirm('此操作将该商品移出购物车, 是否继续?', '提示', {
          confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'
        }).then(() => {
          var obj = {
            phone:that.global.getUser().phone,
            itemSKU:good.itemSKU,
            token:that.global.getToken()
          };
          that.global.axiosPostReq('/cart/delete', obj)
          .then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              that.gwcGoods.splice(index,1);
            } else {
              // that.$message.error('网络出错，请稍后再试！');
            }
          })
        })
      },
      goToThisDetail:function(good){
        var that = this;
        window.open('/details/' + good.itemId)
        // that.$router.push({path:"/details/"+good.itemId});
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.goodIsNoUser *{
  cursor: auto !important;
}
.notLogin{
  display: block;
  margin: auto;
  margin-bottom: 330px;
  margin-top: 187px;
}
.cursorPointer{
  cursor: pointer;
}
.sdf{
  position: relative;
top: 3px;

}
 .gwcWrap .colorBlue{
  color: #005aab;
}
.gwcWrap .colorRed{
  color:#cb1700;
}
.gwcWrap{
  width: 1200px;
  margin: auto;
}
.gwcWrap .lgoinConfirm{
  width: 460px;
  line-height: 40px;
  color: white;
  background: #005aab;
text-align: center;
box-shadow: 3px 3px 10px #96ccea;
margin: auto;
position: relative;
margin-bottom: 40px;
}
.gwcWrap .lgoinConfirm img{
  position: absolute;
  top: -47px;
right: -150px;
}
.gwcWrap *{
  font-size: 14px;
  color:#333333;
}
.gwcWrap .thisGoodIsNokuCun{
  background: #cccccc;
}
/*.gwcWrap .thisGoodIsNokuCun *{
  color: gray !important;
}*/
.gwcWrap .allGoods{
  text-align: center;
  font-size: 16px;
  margin-bottom: 50px;
}
.gwcWrap .gwcTitle{
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 10px;
  font-weight: 600;
}
.gwcWrap .gwcTitle span{
  display: inline-block;
  }
  .gwcWrap .gwcTitle span:nth-child(1){
margin-right: 124px;
  }
  .gwcWrap .gwcTitle span:nth-child(2){
margin-right: 266px;
  }
  .gwcWrap .gwcTitle span:nth-child(3){
margin-right: 156px;
  }
  .gwcWrap .gwcTitle span:nth-child(4){
margin-right: 212px;
  }
  .gwcWrap .gwcTitle span:nth-child(5){
margin-right: 140px;
  }
  .gwcWrap .oneGood{
    padding: 40px 20px 29px 0;
    border-bottom: 1px solid #eeeeee;
    height: 78px;
    padding-right: 0;

    position: relative;
  }
  .gwcWrap .oneGood  .selecta{
position: relative;
top: 5px;
  }
.gwcWrap .oneGood  .thisGoodIsNoUser{
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  width: 50px;
  height: 50px;
  color: white;
  line-height: 50px;
}
 .gwcWrap .oneGood .nowUserGood{
   /*border-radius: 5px;*/
   display: inline-block;
   /*background: #F2F2F2;*/
   text-align: center;
   float:left;
   margin-top:33px;
   padding: 3px ;
   width: 34px;
   color: #cccccc;
 }
  .gwcWrap .oneGood div{
    display: inline-block;
    float: left;
  }
  .gwcWrap .oneGood .imgWrap{
    width: 78px;
    height:78px;
    border: 1px solid #eeeeee;
    float: none;
    text-align: center;
    margin-left: 16px;
    cursor: pointer;
  }

    .gwcWrap .oneGood .imgWrap img{
      display: block;
    margin: auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
      max-width: 100%;
      max-height: 100%;
    }
      .gwcWrap .oneGood  .goodInfo {
        margin-left: 20px;
        width: 250px;
        overflow:hidden;
        text-overflow:ellipsis;
       white-space:nowrap;
      }
  .gwcWrap .oneGood  .goodInfo p{
    display: block;
    margin-top: 42px;
    }
  .gwcWrap .oneGood  .onePrice{
    margin-left: 104px;
    width: 80px;
    text-align: center;
    margin-right: 120px;
    line-height: 78px;
    font-weight: 600;
  }
  .gwcWrap .oneGood .jisuanqi{
    margin-right: 155px;
    text-align: center;
  }
  .gwcWrap .oneGood .jisuanqi .thismargin{
    margin-top: 27px;
  }
    .gwcWrap .oneGood .jisuanqi div:nth-child(1){
      border: 1px solid #c8c8c8;
    }
    .gwcWrap .oneGood .jisuanqi div:nth-child(2){
      color: #5db7e8;
      margin-top: 42px;
    }
  .gwcWrap .oneGood .jisuanqi span{
    width: 18px;
    height: 18px;
    display: inline-block;
    cursor: pointer;
    line-height: 18px;
  }
  .gwcWrap .oneGood .jisuanqi input{
    width: 42px;
    border:none;
    text-align: center;
    border-left: 1px solid #c8c8c8;
    border-right: 1px solid #c8c8c8;

  }
    .gwcWrap .oneGood .jisuanqi span:nth-child(2){
      width: 42px;
      border-left: 1px solid #c8c8c8;
      border-right: 1px solid #c8c8c8;
    }
    .gwcWrap .oneGood .jisuanqi div{
      display: block;
      float: none;
    }
    .gwcWrap .oneGood  .thisPrice{
      line-height: 78px;
      width: 100px;
      text-align: center;
      color: #cb1700;
      font-weight: 600;
    }
    .gwcWrap .oneGood  .operas{
      float: right;
          width: 154px;
    text-align: right;
    }
  .gwcWrap .oneGood  .operas span{
    display: block;
    cursor: pointer;
  }
  .gwcWrap .oneGood  .operas span:nth-child(2){
    margin-top: 42px;
  }
  .gwcWrap   .goodsFooter{
    padding-top: 52px;
    padding-bottom: 50px;
    background: white;
    width: 1200px;
    margin: auto;
    border-top: 1px solid #eeeeee;
  }
  .gwcWrap .goodsFooterWrap{

  }
  .gwcWrap .jiwsuanbtnFixedClass{
    position: fixed;
    bottom: 0;
    left: 0;
    /*left:50%;
    transform: translateX(-50%);*/
    width: 100%;
    background: white;
    z-index: 999;

  }
.gwcWrap   .goodsFooter div{
  display: inline-block;

}
.gwcWrap  .goodsFooter .selectaLLFooter{
  margin-right: 58px;
}
.gwcWrap  .goodsFooter .selectaLLFooter img{
margin-right: 16px;
}
.gwcWrap  .goodsFooter .footerOpera span{
  cursor: pointer;
}
.gwcWrap  .goodsFooter .footerOpera span:nth-child(1){
  margin-right: 20px;
}
.gwcWrap  .goodsFooter .footerOpera span:nth-child(2){
  margin-right: 20px;
}
.gwcWrap  .goodsFooter  .haveSelectedGoodNum{
  margin-left: 234px;
}
.gwcWrap  .goodsFooter .zongji{
  margin-left: 277px;
}
.gwcWrap  .goodsFooter .zongji span:nth-child(1){
  font-weight: 600;
  margin-right: 10px;
  font-size: 18px;
}
.gwcWrap  .goodsFooter .zongji .asdg{

  /*font-size: 18px;*/
}
.gwcWrap  .goodsFooter .jiesuanbtn{
  float: right;
}
.gwcWrap  .goodsFooter .jiesuanbtn span{
  width: 120px;
  line-height: 40px;
  display: inline-block;
  border-radius: 2px;
  text-align: center;
  color: white;
  background: #cb1700;
  margin-top: -10px;
  cursor: pointer;
}
.selectaLLFooter .el-checkbox .el-checkbox__label{
  padding-left: 20px !important;
}
</style>
