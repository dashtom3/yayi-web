<template>
  <div class="">
    <publicHeader></publicHeader>
    <div class="gwcWrap">
      <div class="allGoods">
        全部商品（{{gwcGoods.length}}）
      </div>
      <div class="gwcTitle">
        <span class="cursorPointer" v-on:click="checkAll()">
          <img class="sdf" v-if="selectaLL" src="../../../images/gwc/gwc1.png" alt="">
          <img class="sdf" v-else src="../../../images/gwc/gwc2.png" alt="">
          全选
        </span>
        <span>商品信息</span>
        <span>单价(元)</span>
        <span>数量</span>
        <span>小计(元)</span>
        <span>操作</span>
      </div>
      <div class="oneGood" v-for="(good,index) in gwcGoods">
        <div class="">
          <img v-on:click="selectThisGood(index)" class="selecta cursorPointer" v-show="selectedWhicd[index]" src="../../../images/gwc/gwc1.png" alt="">
          <img v-on:click="selectThisGood(index)" class="selecta cursorPointer" v-show="!selectedWhicd[index]" src="../../../images/gwc/gwc2.png" alt="">
          <div class="imgWrap">
              <img src="../../../images/gwc/small.png" alt="">
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
          <span class="colorBlue" v-on:click="saveOne(index)">收藏</span>
            <span v-on:click="deleteOne(index)">删除</span>
        </div>
        <div style="clear:both"> </div>
      </div>
      <div class="goodsFooter">
        <div class="selectaLLFooter cursorPointer" v-on:click="checkAll()">
          <img class="sdf" v-if="selectaLL" src="../../../images/gwc/gwc1.png" alt="">
          <img class="sdf" v-else src="../../../images/gwc/gwc2.png" alt="">
          <span>全选</span>
        </div>
        <div class="footerOpera">
          <span >删除</span>
          <span class="colorBlue">收藏</span>
        </div>
        <div class="haveSelectedGoodNum">
          <span>已选择<span class="colorRed">2</span>件商品</span>
        </div>
        <div class="zongji">
          <span>总计:<span class="colorRed">￥{{allMoeny}}</span></span>
          <span>已节约:<span class="colorRed">￥20</span></span>
        </div>
        <div class="jiesuanbtn">
          <span>结算</span>
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
        selectedWhicd:[true,true,true,true,true],
        allMoeny:0,
        selectaLL:true,
        gwcGoods:[
          {
            goodImg:"1.png",
            goodTitle:"测试标配提测试标配提测试标配提测试标配提",
            goodColor:"红色红色",
            goodPrice:20,
            goodSureNum:1,
            goodLeaveNum:8,
            totalMoney:20
          },
          {
            goodImg:"1.png",
            goodTitle:"测试标配提测试标配提测试标配提测试标配提",
            goodColor:"红色红色",
            goodPrice:20,
            goodSureNum:1,
            goodLeaveNum:200,
            totalMoney:20
          },
          {
            goodImg:"1.png",
            goodTitle:"测试标配提测试标配提测试标配提测试标配提",
            goodColor:"红色红色",
            goodPrice:20,
            goodSureNum:1,
            goodLeaveNum:200,
            totalMoney:20
          },
          {
            goodImg:"1.png",
            goodTitle:"测试标配提测试标配提测试标配提测试标配提",
            goodColor:"红色红色",
            goodPrice:20,
            goodSureNum:1,
            goodLeaveNum:200,
            totalMoney:20
          },
          {
            goodImg:"1.png",
            goodTitle:"测试标配提测试标配提测试标配提测试标配提",
            goodColor:"红色红色",
            goodPrice:20,
            goodSureNum:1,
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
    methods: {
      selectThisGood:function(index){
        this.selectedWhicd[index] = true;;
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
      saveOne:function(index){
        this.$confirm('添加至收藏夹后，该商品将不在购物车显示!', '添加至收藏夹', {
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
.cursorPointer{
  cursor: pointer;
}
.sdf{
  position: relative;
top: 3px;

}
.colorBlue{
  color: #5db7e8;
}
.colorRed{
  color:#e0645b;
}
.gwcWrap{
  width: 1200px;
  margin: auto;
}
.gwcWrap *{
  font-size: 14px;
}
.gwcWrap .allGoods{
  text-align: center;
  font-size: 16px;
  margin-bottom: 55px;
}
.gwcWrap .gwcTitle{
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 10px;
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
    padding: 40px 20px 28px 0;
    border-bottom: 1px solid #eeeeee;
    height: 58px;
  }
  .gwcWrap .oneGood  .selecta{
position: relative;
top: -19px;
  }
  .gwcWrap .oneGood div{
    display: inline-block;
    float: left;
  }
  .gwcWrap .oneGood .imgWrap{
    width: 58px;
    height:58px;
    border: 1px solid #eeeeee;
    float: none;
    margin-left: 16px;
  }
    .gwcWrap .oneGood .imgWrap img{
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
    margin-top: 20px;
    }
  .gwcWrap .oneGood  .onePrice{
    margin-left: 140px;
    width: 80px;
    text-align: center;
    margin-right: 112px;
    line-height: 58px;
  }
  .gwcWrap .oneGood .jisuanqi{
    margin-right: 136px;
    text-align: center;
  }
  .gwcWrap .oneGood .jisuanqi .thismargin{
    margin-top: 20px;
  }
    .gwcWrap .oneGood .jisuanqi div:nth-child(1){
      border: 1px solid #c8c8c8;
    }
    .gwcWrap .oneGood .jisuanqi div:nth-child(2){
      color: #5db7e8;
      margin-top: 20px;
    }
  .gwcWrap .oneGood .jisuanqi span{
    width: 18px;
    height: 18px;
    display: inline-block;
    cursor: pointer;
    line-height: 18px;
  }
    .gwcWrap .oneGood .jisuanqi span:nth-child(2){
      width: 50px;
      border-left: 1px solid #c8c8c8;
      border-right: 1px solid #c8c8c8;
    }
    .gwcWrap .oneGood .jisuanqi div{
      display: block;
      float: none;
    }
    .gwcWrap .oneGood  .thisPrice{
      line-height: 58px;
      width: 100px;
      text-align: center;
      color: #e0645b;
    }
    .gwcWrap .oneGood  .operas{
      float: right;
    }
  .gwcWrap .oneGood  .operas span{
    display: block;
    cursor: pointer;
  }
  .gwcWrap .oneGood  .operas span:nth-child(2){
    margin-top: 20px;
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
