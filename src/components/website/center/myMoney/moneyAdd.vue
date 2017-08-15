<template>
  <div class="myMoneyAddWrap">
    <div class="contentWrap">
      <div class="payForm">
        <div class="oneLine">
          <span>充值金额：</span>
          <span>
            <el-input v-model="payMuch" class="payMuch"></el-input>
          </span>
          <span v-if="payMuchErrMsg" class="errMsg">{{payMuchErrMsg}}</span>
        </div>
        <div>
          <span>可获得乾币数：</span>
          <span class="showPayMuch">{{finalyMoney}}</span>
        </div>
        <div>
          <span>支付方式：</span>
          <span>
            <el-radio class="radio" v-model="payType" label="1">支付宝</el-radio>
            <el-radio class="radio" v-model="payType" label="2">微信支付</el-radio>
          </span>
        </div>
        <div @click="sureExchange()" class="sureBtn">支付</div>
      </div>
      <div class="bg_col">
        <div class="exchangeRule">
        <p><strong>乾币充值标准</strong></p>
          <ul>
            <li>(1) 1000元≤单次充值金额<2000元，可获得乾币数量=当次实际充值金额*110%；</li>
            <li>(2) 2000元≤单次充值金额<5000元，可获得乾币数量=当次实际充值金额*115%；</li>
            <li>(3) 5000元≤单次充值金额<10000元，可获得乾币数量=当次实际充值金额*120%；</li>
            <li>(4) 单次充值金额≥10000元，可获得乾币数量=当次实际充值金额*125%。</li>
          </ul>
        </div>
        <div class="tips">
          <p><strong>温馨提示：</strong></p>
          <ul>
            <li>（1）根据国家规定，乾币充值不开发票。</li>
            <li>（2）购买商品时，发票金额包含用户实际支付金额，加上充值乾币的支付金额。</li>
          </ul>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="WxTableVisible" :before-close="handleClose" size="small">
      <div style="margin-bottom:30px;">
        <img class="WePayLogo" src="../../../../images/gwc/WePayLogo.png" alt="img">
        <img class="wxR" src="../../../../images/gwc/wxR.png" alt="img">
        <p class="wxRealPay">应付金额：<span style="color:#cb1700; font-weight: bold;">¥{{payMuch}}</span></p>
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
          // errMsg = "请输入合法的乾币数量";
        }
      } else {
        errMsg = "请输入合法的乾币数量";
      }
      that.payMuch = finalyPayMuch;
      that.payMuchErrMsg = errMsg;
      that.finalyMoney = that.global.moneyToMoney(that.payMuch) || 0;
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
          // that.totalCount=res.data.totalNumber;
          // this.childConfig.pageNum = parseInt(this.getMoneyList.length/this.everyPageShowNum)+1;
        } else {
          // that.$message.error('网络出错，请稍后再试！');
        }
      })
    },
    //充值乾币
    sureExchange: function() {
      var that = this;
      // console.log(that.payMuch)
      if(that.payMuch) {
        if (that.payType == '1') {
          var obj = {
            token: that.global.getToken(),
            money: parseInt(that.payMuch)
          }
          that.global.axiosGetReq('/pay/recharge',obj).then((res) => {
            window.location.href = res.request.responseURL
          })
        } else {
          // let chargeId = that.global.uuid()
          let money = parseInt(that.payMuch)
          let token = that.global.getToken()
          // console.log(chargeId,'sds')
          that.WxTableVisible = true
          that.wxImg = 'http://47.93.48.111:8080/api/weixin/unifiedOrderCharge' + '?money=' + money + '&token=' + token
          that.kk = 1
          var timer = setInterval(function(){
              if (that.kk == 600) {
                clearInterval(timer)
                return false
              }
              var obj = {
                token: that.global.getToken()
              }
              that.global.axiosGetReq('/weixin/checkChargeState',obj).then((res) => {
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
        that.$alert('请填写本次购买金额', {confirmButtonText: '确定',});
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
.bg_col{
  background: #f7f7f7;
  padding: 20px 0;
}
.tips{
  width: 522px;
  margin:0 auto;
  margin-top:28px;
  text-align: left;
  color: #cb1700;
}
.tips li{
  height: 22px;
  line-height: 22px;
}
.myMoneyAddWrap .contentWrap{
  width: 675px;
  margin: auto;
  margin-top: 40px;
  border: 1px solid #eeeeee;
  padding: 50px 136px;
  font-size: 14px;
}
.myMoneyAddWrap .exchangeRule{
width: 522px;
margin: auto;
}
.myMoneyAddWrap .exchangeRule p{
  font-weight: 600;
  text-align: center;
}
.myMoneyAddWrap .payForm{
  width: 402px;
  margin: auto;
}
.oneLine{
  position: relative;
}
.oneLine .errMsg{
  position: absolute;
  top: 10px;
  left:390px;
  color: #cb1700;
  width: 200px;
}
.myMoneyAddWrap .payForm div{
  height: 36px;
  line-height: 36px;
  margin-bottom: 36px;
}
.myMoneyAddWrap .payForm div span:nth-child(1){
  margin-right: 18px;
  width: 100px;
  text-align: right;
  display: inline-block;
}
.myMoneyAddWrap .payForm div span .payMuch{
  width: 260px;
  height: 38px;
}
.myMoneyAddWrap .payForm div  .showPayMuch{
  color: #cb1700;
}
.myMoneyAddWrap .payForm div span .payMuch:focus{
  outline: none;
}
.myMoneyAddWrap .exchangeRule ul{
  margin: auto;
  width: 100%;
}
.myMoneyAddWrap .exchangeRule li{
  margin-top: 20px;
  color: #333;
}
.sureBtn{
    text-align: center;
    width: 160px;
    line-height: 40px;
    color: white;
    background: #005aab;
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
