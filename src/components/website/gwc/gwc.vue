<template>
  <div class="">
    <publicHeader></publicHeader>
    <classify></classify>
    <div class="gwcWrap">
      <div class="allGoods">
        全部商品（{{gwcGoods.length}}）
      </div>
      <div class="gwcTitle">
        <span>
          <img v-if="selectaLL" src="../../../images/gwc/gwc1.png" alt="">
          <img v-else src="../../../images/gwc/gwc2.png" alt="">
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
          <img v-if="selectaLL" src="../../../images/gwc/gwc1.png" alt="">
          <img v-else src="../../../images/gwc/gwc2.png" alt="">
          <div class="">
              <img src="../../../images/gwc/small.png" alt="">
          </div>
        </div>
        <div class="">
          <span>{{good.goodTitle}}</span>
          <span>{{good.goodColor}}</span>
        </div>
        <div class="">
          <span>￥{{good.goodPrice}}</span>
        </div>
        <div class="">
          <div class="">
            <span>-</span>
            <span>{{good.goodSureNum}}</span>
            <span>+</span>
          </div>
          <div class=""  v-show="good.goodSureNum>good.goodLeaveNum">
            （库存不足）
          </div>
          <div class="">
              ￥{{good.totalMoney}}
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
        selectaLL:true,
        gwcGoods:[
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
            goodSureNum:1000,
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
    mounted: function() {

    },
    methods: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
margin-right: 147px;
  }
  .gwcWrap .oneGood{
    padding: 40px 20px 28px 0;
  }
  .gwcWrap .oneGood div{
    display: inline-block;
  }
</style>
