<template>
  <div class="pay">
    <publicHeader></publicHeader>
    <div class="pay_title">
      <img class="pay_img" src="../../../images/gwc/pay1.png" alt="img">
      <div class="pay_des">
        <p class="first_p">订单提交成功，请您尽快付款。</p>
        <p class="second_p">未成功支付订单将在 <span style="color:#D81E06; font-weight: bold;">{{time}}分钟</span> 后自动取消，请及时付款</p>
      </div>
      <p class="pay_price">应付金额：<span style="color:#D81E06; font-weight: bold;">¥{{orderDetail.actualPay}}</span></p>
    </div>
    <div class="pay_container">
      <div class="pay_header">支付方式</div>
      <div class="pay_box">
        <div class="alipay" :class="{ active: isActive1 }" @click="alipay">
          <img v-show="aliPay" class="activePay" src="../../../images/gwc/choosePay.png" alt="img">
        </div>
        <div class="wxpay" :class="{ active: isActive2 }" @click="wxpay">
          <img v-show="wxPay" class="activePay" src="../../../images/gwc/choosePay.png" alt="img">
        </div>
      </div>
      <div class="nowPay" @click="nowpay">立即支付</div>
    </div>
    <el-dialog :visible.sync="WxTableVisible" :before-close="handleClose" size="small">
      <div style="margin-bottom:30px;">
        <img class="WePayLogo" src="../../../images/gwc/WePayLogo.png" alt="img">
        <img class="wxR" src="../../../images/gwc/wxR.png" alt="img">
        <p class="wxRealPay">应付金额：<span style="color:#D81E06; font-weight: bold;">¥{{orderDetail.actualPay}}</span></p>
      </div>
      <div style="text-align:center;margin-bottom:10px;">
        <img style="width:260px;height:260px;" :src="wxImg" alt="img">
      </div>
      <div style="text-align:center">
        <img src="../../../images/gwc/wxDes.png" alt="img">
      </div>
    </el-dialog>
    <publicFooter></publicFooter>
  </div>
</template>

<script>
  import publicHeader from '../index/publicHeader'
  import publicFooter from '../index/publicFooter'
  export default {
    name: 'pay',
    data () {
      return {
        time: 30,
        aliPay: false,
        wxPay: false,
        isActive1: false,
        isActive2: false,
        orderDetail: null,
        WxTableVisible: false,
        wxImg: '',
        kk: 1,
      }
    },
    components: {
      publicHeader,
      publicFooter,
    },
    //*******导航钩子*********//
    beforeRouteEnter (to, from, next) {
      // 通过 `vm` 访问组件实例
      next(vm => {
        var that = vm;
        if (JSON.parse(window.sessionStorage.getItem('order')) == null) {
          that.$router.push({path:'/'})
        }else {
          // console.log('uiuiuiu')
        }
      })
    },
    created: function() {
      var that = this;
      that.orderDetail = JSON.parse(window.sessionStorage.getItem('order'))
    },
    methods: {
      alipay: function() {
        var that = this;
        that.isActive1 = !that.isActive1;
        that.aliPay = !that.aliPay;
        that.isActive2 = false;
        that.wxPay = false;
      },
      wxpay: function() {
        var that = this;
        that.isActive2 = !that.isActive2;
        that.wxPay = !that.wxPay;
        that.isActive1 = false;
        that.aliPay = false;
      },
      // 确认关闭
      handleClose: function() {
        var that = this
        that.$confirm('确认关闭微信支付页面？').then(_ => {
          that.kk = 600
          that.WxTableVisible = false
          that.$router.go(0)
          done();
        }).catch(_ => {});
      },
      // 立即支付
      nowpay: function() {
        var that = this;
        if (that.isActive1 == true) {
          var obj = {
            orderId: that.orderDetail.OrderId
          }
          that.global.axiosGetReq('/pay/payParames',obj).then((res) => {
            //console.log(res.request.responseURL,'pay')
            window.location.href=res.request.responseURL
          })
          return false
        } 
        if (that.isActive2 == true) {  // 微信支付
          that.WxTableVisible = true
          that.wxImg = 'http://47.93.48.111:8080/api/weixin/unifiedOrderReturnUrl' + '?orderId=' + that.orderDetail.OrderId
          that.kk = 1
          var timer = setInterval(function(){
              if (that.kk == 600) {
                clearInterval(timer)
                return false
              }
              var obj = {
                out_trade_no: that.orderDetail.OrderId
              }
              that.global.axiosGetReq('/weixin/checkOrderState',obj).then((res) => {
                if (res.data.num == 2) {
                  clearInterval(timer)
                  that.$router.push({name:'paySuccess', params: { payData: 'success' }})
                } else {
                  that.kk++
                  // that.$message.error('网络出错，请稍后再试！');
                }
              })
            },3000);
          return false
        }
        if (that.isActive1 == false && that.isActive2 == false){ 
          that.$message.error('请选择支付方式！');
          return false
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pay_title {
  width: 1200px;
  height: 80px;
  margin: 0 auto;
  margin-bottom: 50px;
  background-color: rgba(93,183,231,0.1);
  position: relative;
}
.pay_img {
  position: absolute;
  top: 13px;
  left: 19px;
}
.pay_des {
  position: absolute;
  top: 13px;
  left: 70px;
}
.first_p {
  font-size: 16px;
  color: #000;
  margin-bottom: 10px;
}
.second_p {
  font-size: 12px;
  color: #000;
}
.pay_price {
  font-size: 14px;
  position: absolute;
  top: 30px;
  right: 20px;
}
.pay_container {
  width: 1200px;
  margin: 0 auto;
}
.pay_header {
  width: 150px;
  height: 52px;
  line-height: 52px;
  text-align: center;
  font-size: 18px;
  color: #000;
  background-color: rgba(93,183,231,0.15);
  border-bottom: 3px solid #D81E06;
  margin-bottom: 50px;
}
.pay_box {
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
}
.alipay {
  width: 236px;
  height: 40px;
  border: 1px solid #E9E9E9;
  background: url(../../../images/gwc/ali.png) no-repeat;
  background-position: center center;
  cursor: pointer;
  margin-right: 150px;
  position: relative;
}
.wxpay {
  width: 236px;
  height: 40px;
  border: 1px solid #E9E9E9;
  background: url(../../../images/gwc/wx.png) no-repeat;
  background-position: center center;
  cursor: pointer;
  position: relative;
}
.activePay {
  position: absolute;
  right: 0;
  bottom: 0;
}
.nowPay {
  width: 160px;
  height: 45px;
  margin: 0 auto;
  margin-bottom: 320px;
  line-height: 45px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  background-color: #005aab;
}
.active {
  border: 1px solid #005aab !important;
}
.nowPay:hover {
  cursor: pointer;
  background-color: #329af0;
  transition: all ease 0.5s;
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
