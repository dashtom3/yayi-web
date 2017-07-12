<template>
  <div class="pay">
    <publicHeader></publicHeader>
    <div class="pay_title">
      <img class="pay_img" src="../../../images/gwc/pay1.png" alt="img">
      <div class="pay_des">
        <p class="first_p">订单提交成功，请您尽快付款。</p>
        <p class="second_p">未成功支付订单将在 <span style="color:#D81E06; font-weight: bold;">{{time}}分钟</span> 后自动取消，请及时付款</p>
      </div>
      <p class="pay_price">应付金额：<span style="color:#D81E06; font-weight: bold;">¥{{price}}</span></p>
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
        price: 1222,
        aliPay: false,
        wxPay: false,
        isActive1: false,
        isActive2: false,
        orderDetail: null,
      }
    },
    components: {
      publicHeader,
      publicFooter,
    },
    created: function() {
      var that = this;
      that.orderDetail = JSON.parse(window.sessionStorage.getItem('order'))
      console.log(that.orderDetail,'order')
    },
    methods: {
      alipay: function() {
        var that = this;
        that.isActive1 = !that.isActive1;
        that.aliPay = !that.aliPay;
        that.isActive2 = false;
        that.wxPay = false;
        // if (that.isActive1 = true) {
        //   that.isActive1 = false;
        //   that.aliPay = false;
        // }
      },
      wxpay: function() {
        var that = this;
        that.isActive2 = !that.isActive2;
        that.wxPay = !that.wxPay;
        that.isActive1 = false;
        that.aliPay = false;
      },
      // 立即支付
      nowpay: function() {
        var that = this;
        that.$router.push({path:'/paySuccess'})
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
  background-color: #5DB7E7;
}
.active {
  border: 1px solid #5DB7E7 !important;
}
.nowPay:hover {
  cursor: pointer;
  background-color: #5ed6dc;
  transition: all ease 0.5s;
}
</style>
