<template>
  <div class="">
    <publicHeader></publicHeader>
    <img class="notLogin" v-if="!islogin" src="../../../images/gwc/4.png" alt="">
    <div v-else class="gwcWrap">
      <div class="lgoinConfirm">
        登录后购物车的商品将保存到您账户中!
        <img src="../../../images/gwc/gwc3.png" alt="">
      </div>
      <div class="allGoods">
        全部商品（{{gwcGoods.length}}）
      </div>
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
      <div class="oneGood" v-for="(good,index) in gwcGoods">
        <div class="">
          <el-checkbox v-model="good.checked"></el-checkbox>
          <div class="imgWrap">
              <img src="../../../images/gwc/small.png" alt="">
              <span></span>
          </div>
        </div>
        <div class="goodInfo">
          <span>{{good.goodTitle}}</span>
          <span>{{good.goodColor}}</span>
        </div>
        <div class="onePrice">
          <span>￥{{good.goodPrice}}</span>
        </div>
        <div class="jisuanqi">
          <div class="" :class="{thismargin:good.goodSureNum<good.goodLeaveNum}">
            <span :class="{colorBlue:good.goodSureNum>1}" v-on:click="reduceGood(index)">-</span>
            <span>{{good.goodSureNum}}</span>
            <span :class="{colorBlue:good.goodSureNum<good.goodLeaveNum-1}" v-on:click="addGood(index)">+</span>
          </div>
          <div class=""  v-show="good.goodSureNum>=good.goodLeaveNum">
            （库存不足）
          </div>
        </div>
        <div class="thisPrice">
            ￥{{good.goodPrice*good.goodSureNum}}
        </div>
        <div class="operas">
          <span :class="{colorBlue:index==addBlueColor}" v-on:mouseenter="showBlue(index)" v-on:click="saveOne(index)">收藏</span>
            <span class="colorRed" v-on:click="deleteOne(index)">删除</span>
        </div>
        <div style="clear:both"> </div>
      </div>
      <div class="goodsFooter">
        <div class="selectaLLFooter cursorPointer" v-on:click="checkAll()">
          <el-checkbox v-model="selectaLL">全选</el-checkbox>
        </div>
        <div class="footerOpera">
          <span v-on:click="deleteAll()">删除</span>
          <span v-on:click="saveAll()" class="colorBlue">收藏</span>
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
        islogin:true,
        addBlueColor:null,
        allMoeny:0,
        haveSelectedGoodNum:0,
        selectaLL:false,
        gwcGoods:[
          {
            goodImg:"1.png",
            goodTitle:"测试标配提测试标配提测试标配提测试标配提",
            goodColor:"红色红色",
            goodPrice:10,
            goodSureNum:1,
            goodLeaveNum:8,
            checked:false,
            totalMoney:20
          },
          {
            goodImg:"1.png",
            goodTitle:"测试标配提测试标配提测试标配提测试标配提",
            goodColor:"红色红色",
            goodPrice:20,
            goodSureNum:1,
            goodLeaveNum:200,
            checked:false,
            totalMoney:20
          },
          {
            goodImg:"1.png",
            goodTitle:"测试标配提测试标配提测试标配提测试标配提",
            goodColor:"红色红色",
            goodPrice:30,
            goodSureNum:1,
            goodLeaveNum:200,
            checked:false,
            totalMoney:20
          },
          {
            goodImg:"1.png",
            goodTitle:"测试标配提测试标配提测试标配提测试标配提",
            goodColor:"红色红色",
            goodPrice:40,
            goodSureNum:1,
            goodLeaveNum:200,
            checked:false,
            totalMoney:20
          },
          {
            goodImg:"1.png",
            goodTitle:"测试标配提测试标配提测试标配提测试标配提",
            goodColor:"红色红色",
            goodPrice:50,
            goodSureNum:1,
            checked:false,
            goodLeaveNum:200,
            totalMoney:20
          },
        ]
      }
    },
    components: {
      publicHeader,
      classify,
      publicFooter
    },
    watch:{
      selectaLL:function(){
        if(this.selectaLL){
          for(let a= 0;a<this.gwcGoods.length;a++){
              this.gwcGoods[a].checked=true;;
          }
        }else{
          for(let a= 0;a<this.gwcGoods.length;a++){
              this.gwcGoods[a].checked=false;;
          }
        }
      },
      gwcGoods:{
        handler:function(){
          this.allMoeny = 0;
          this.haveSelectedGoodNum = 0;
          for(let a= 0;a<this.gwcGoods.length;a++){
            if(this.gwcGoods[a].checked){
              this.allMoeny+=this.gwcGoods[a].goodPrice*this.gwcGoods[a].goodSureNum;
              this.haveSelectedGoodNum+= this.gwcGoods[a].goodSureNum;
            }else{
              this.selectaLL = false;
            }
          }
        },
        deep:true
      }
    },
    methods: {
      goToSuborder:function(){
      this.$router.push({path: '/suborder'})
      },
      deleteAll:function(){
        if(this.selectaLL==false){
            this.$alert("请点击全选按钮", {confirmButtonText: '确定'});
        }else{
          this.$confirm('此操作将移除所有商品, 是否继续?', '删除所有商品', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.gwcGoods = [];
            this.$message({
              type: 'success',
              message: '商品收藏成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        }
      },
      saveAll:function(){
        if(this.selectaLL==false){
            this.$alert("请点击全选按钮", {confirmButtonText: '确定'});
        }else{
          this.$confirm('添加至收藏夹后，商品将不在购物车显示，是否全部添加到收藏夹', '全部添加至收藏夹', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.gwcGoods = [];
            this.$message({
              type: 'success',
              message: '商品收藏成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        }
      },
      checkAll:function () {
        if(this.selectaLL){
          for(var i=0;i<this.gwcGoods.length;i++){
            this.gwcGoods[i].checked = true;
          }
        }else{
          for(var i=0;i<this.gwcGoods.length;i++){
            this.gwcGoods[i].checked = false;
          }
        }
        this.selectaLL = !this.selectaLL;
      },
      reduceGood:function (index) {
        if(this.gwcGoods[index].goodSureNum!=1){
          this.gwcGoods[index].goodSureNum--;
        }
      },
      addGood:function(index){
        if(this.gwcGoods[index].goodSureNum<this.gwcGoods[index].goodLeaveNum){
          this.gwcGoods[index].goodSureNum++;
        }
      },
      showBlue:function(index){
        this.addBlueColor = index;
      },
      saveOne:function(index){
        this.$confirm('添加至收藏夹后，该商品将不在购物车显示!', '添加至收藏夹', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.gwcGoods.splice(index,1);
          this.$message({
            type: 'success',
            message: '商品收藏成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      deleteOne:function(index){
        this.$confirm('此操作将该商品移出购物车, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.gwcGoods.splice(index,1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  color: #5db7e8;
}
.gwcWrap .colorRed{
  color:#e0645b;
}
.gwcWrap{
  width: 1200px;
  margin: auto;
}
.gwcWrap .lgoinConfirm{
  width: 460px;
  line-height: 40px;
  color: white;
  background: #5db7e8;
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
  }
  .gwcWrap .oneGood  .selecta{
position: relative;
top: 5px;
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
  }
.gwcWrap .oneGood .imgWrap span{
display: inline-block;
height: 100%;
vertical-align: middle;
}
    .gwcWrap .oneGood .imgWrap img{
      display: inline-block;
vertical-align: middle;
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
  .gwcWrap .oneGood  .goodInfo span:nth-child(2){
    display: block;
    margin-top: 42px;
    }
  .gwcWrap .oneGood  .onePrice{
    margin-left: 100px;
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
    margin-top: 26px;
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
      color: #e0645b;
      font-weight: 600;
    }
    .gwcWrap .oneGood  .operas{
      float: right;
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
  margin-right: 40px;
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
  background: #d81e06;
  margin-top: -10px;
  cursor: pointer;
}
</style>
