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
    <el-dialog :visible.sync="WxTableVisible" :before-close="handleClose" size="small">
      <div style="margin-bottom:30px;">
        <img class="WePayLogo" src="../../../../images/gwc/WePayLogo.png" alt="img">
        <img class="wxR" src="../../../../images/gwc/wxR.png" alt="img">
        <p class="wxRealPay">应付金额：<span style="color:#D81E06; font-weight: bold;">¥{{payMuch}}</span></p>
      </div>
      <div style="text-align:center;margin-bottom:10px;">
        <img style="width:260px;height:260px;" :src="wxImg" alt="img">
      </div>
      <div style="text-align:center">
        <img src="../../../../images/gwc/wxDes.png" alt="img">
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'myMoneyAdd',
  data () {
    return {
      payType: "1",
      payMuch: '',
      payMuchErrMsg: null,
      finalyMoney: 0,
      WxTableVisible: false,
      wxImg: '',
      kk: 1,
    }
  },
  watch:{
    payMuch: function() {
      var that = this;
      var nowPayMuch = that.payMuch;
      var finalyPayMuch = null;
      var errMsg = null;
      if(!isNaN(nowPayMuch)) {
        if(nowPayMuch > 0){
          finalyPayMuch = nowPayMuch;
        } else {
          errMsg = "请输入合法的钱币数量";
        }
      } else {
        errMsg = "请输入合法的钱币数量";
      }
      that.payMuch = finalyPayMuch;
      that.payMuchErrMsg = errMsg;
      that.finalyMoney = that.global.moneyToMoney(that.payMuch)
    },
  },
  created: function() {
    var that = this
    // that.getMoneyListFn()
  },
  methods: {
    getMoneyListFn:function(){
      var that = this;
      var obj = {
        token:that.global.getToken()
      };
      that.global.axiosGetReq('/userMyQb/query', obj).then((res) => {
        // console.log(res)
        if (res.data.callStatus === 'SUCCEED') {
          // this.getMoneyList = res.data.data;
          console.log(res.data,'i')
          // that.totalCount=res.data.totalNumber;
          // this.childConfig.pageNum = parseInt(this.getMoneyList.length/this.everyPageShowNum)+1;
        } else {
          that.$message.error('网络出错，请稍后再试！');
        }
      })
    },
    //充值乾币
    sureExchange: function() {
      var that = this;
      if(that.payMuch !== '') {
        if (that.payType == '1') {
          console.log('支付宝充值')
        } else {
          // let chargeId = that.global.uuid() 
          let money = parseInt(that.payMuch)
          let token = that.global.getToken()
          // console.log(chargeId,'sds')
          that.WxTableVisible = true
          that.wxImg = 'http://47.93.48.111:8080/api/weixin/unifiedOrderCharge' + '?money=' + money + '&token=' + token
          that.kk = 1
          var timer = setInterval(function(){
            console.log(that.kk,'kkkkk')
              if (that.kk == 600) {
                clearInterval(timer)
                return false
              }
              var obj = {
                token: that.global.getToken()
              }
              that.global.axiosGetReq('/weixin/checkChargeState',obj).then((res) => {
                console.log(res.data,'opopopop')
                if (res.data.num == 2) {
                  clearInterval(timer)
                  that.WxTableVisible = false
                  that.$alert('恭喜您，充值成功', {
                    confirmButtonText: '确定',
                    callback: action => {
                      that.$router.go(0)
                    }
                  });
                  // that.$alert("恭喜您，充值成功！", {confirmButtonText: '确定'});
                  // that.$message('恭喜您，充值成功！')
                } else {
                  that.kk++
                  // that.$message.error('网络出错，请稍后再试！');
                }
              })
            },3000);
        }
      } else {
        that.$alert('请输入兑换钱币数量', {confirmButtonText: '确定',});
      }
    },
    // 确认关闭
    handleClose: function() {
      var that = this
      that.$confirm('确认关闭微信支付页面？').then(_ => {
        that.kk = 600
        that.WxTableVisible = false
        done();
      }).catch(_ => {});
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
.WePayLogo {
  width: 125px;
  height: 34px;
}
.wxR {
  width: 79px;
  height: 34px;
}
.wxRealPay {
  float: right;
  margin-top: 10px;
  font-size: 14px;
  color: #333;
  font-weight: bold;
}
</style>
