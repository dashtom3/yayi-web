<template>
  <div class="myMoneyAddWrap">
    <div class="contentWrap">
      <div class="payForm">
        <div class="oneLine">
          <span>兑换金额：</span>
          <span><input  v-model="payMuch" type="text" class="payMuch"></span>
          <span v-if="payMuchErrMsg" class="errMsg">{{payMuchErrMsg}}</span>
        </div>
        <div class="">
          <span>兑换钱币数：</span>
          <span class="showPayMuch">{{finalyMoney}}</span>
        </div>
        <div class="">
          <span>支付方式：</span>
          <span>
            <el-radio class="radio" v-model="payType" label="1">支付宝</el-radio>
            <el-radio class="radio" v-model="payType" label="2">微信支付</el-radio>
          </span>
        </div>
        <div @click="sureExchange()" class="sureBtn">支付</div>
      </div>
      <div class="exchangeRule">
        <p>乾币兑换标准</p>
        <ul>
          <li>(1) 1000元≤单次购买金额<2000元，兑换钱币数量=当次实际兑换金额*110%；</li>
          <li>(2) 2000元≤单次购买金额<5000元，兑换钱币数量=当次实际兑换金额*115%；</li>
          <li>(3) 5000元≤单次购买金额<10000元，兑换钱币数量=当次实际兑换金额*120%；</li>
          <li>(4) 单次购买金额≥10000元，兑换钱币数量=当次实际兑换金额*125%。</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myMoneyAdd',
  data () {
    return {
      payType:"1",
      payMuch:null,
      payMuchErrMsg:null,
      finalyMoney:0
    }
  },
  watch:{
    payMuch:function(){
      var that = this;
      var nowPayMuch = that.payMuch;
      var finalyPayMuch = null;
      var errMsg = null;
      if(!isNaN(nowPayMuch)){
        if(nowPayMuch>0){
          finalyPayMuch = nowPayMuch;
        }else{
          errMsg = "请输入合法的钱币数量";
        }
      }else{
        errMsg = "请输入合法的钱币数量";
      }
      that.payMuch = finalyPayMuch;
      that.payMuchErrMsg = errMsg;
      this.finalyMoney = that.global.moneyToMoney(that.payMuch)
    },
  },
  methods: {
    sureExchange:function(){
      var that = this;
      if(that.payMuch){
        console.log(that.payMuch)
      }else{
        that.$alert('请输入兑换钱币数量', {confirmButtonText: '确定',});
      }
    },
  },
}
</script>

<style scoped>
.myMoneyAddWrap .contentWrap{
  width: 592px;
  margin: auto;
  margin-top: 40px;
  border: 1px solid #eeeeee;
  padding: 50px 136px;
  font-size: 14px;
}
.myMoneyAddWrap .exchangeRule{

}
.myMoneyAddWrap .exchangeRule p{
  font-weight: 600;
  text-align: center;
}
.myMoneyAddWrap .payForm{
  width: 382px;
      margin: auto;
}
.oneLine{
  position: relative;
}
.oneLine .errMsg{
  position: absolute;
  top: 10px;
  left:390px;
  color: #d81e06;
  width: 200px;
}
.myMoneyAddWrap .payForm div{
  margin-bottom: 40px;
}
.myMoneyAddWrap .payForm div span:nth-child(1){
  margin-right: 18px;
  width: 85px;
  text-align: right;
  display: inline-block;
}
.myMoneyAddWrap .payForm div span .payMuch{
  width: 260px;
  height: 38px;
}
.myMoneyAddWrap .payForm div  .showPayMuch{
  color: #d81e06;
}
.myMoneyAddWrap .payForm div span .payMuch:focus{
  outline: none;
}
.myMoneyAddWrap .exchangeRule ul{
  margin: auto;
  width: 518px;
}
.myMoneyAddWrap .exchangeRule li{
  margin-top: 20px;
  color: #666;
}
.sureBtn{
    text-align: center;
    width: 160px;
    line-height: 40px;
    color: white;
    background: #5DB7E7;
    margin: 30px auto;
    border-radius: 5px;
    cursor: pointer;

}
</style>
