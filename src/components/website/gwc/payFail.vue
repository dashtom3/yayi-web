<template>
  <div class="payFail">
    <publicHeader></publicHeader>
    <div class="paySuccess_box" ref="contentHeight">
      <div class="paySuccess_word">
        <img class="special_img" src="../../../images/center/noOrder.png" alt="img">
        <span class="special_word">抱歉，付款失败！</span>
      </div>
<!--       <div class="paySuccess_detail">
        <p style="font-size:16px; margin-bottom:15px;">付款信息</p>
        <p>收货人：熊振</p>
        <p>收货地址：上海市市辖区杨浦区长阳路1687号1楼1109</p>
        <p>已付金额：<span style="color: #D73240;">490.00</span>元</p>
      </div> -->
      <div class="paySuccess_btn">
        <div class="seeOrder" @click="see">查看订单</div>
        <div class="keepShop" @click="keep">继续购物</div>
      </div>
    </div>
    <publicFooter></publicFooter>
  </div>
</template>

<script>
  import publicHeader from '../index/publicHeader'
  import publicFooter from '../index/publicFooter'
  export default {
    name: 'payFail',
    data () {
      return {
      }
    },
    components: {
      publicHeader,
      publicFooter,
    },
    mounted() {
      var kk = this.$refs.contentHeight;
      var wh = document.body.scrollHeight;
      kk.style.minHeight = wh - 122 - 199 + 'px';
    },
    methods: {
      see: function() {
        var that = this;
        that.$router.push({path: '/center/myOrder'});
      },
      keep: function() {
        var that = this;
        that.$router.push({path: '/index'});
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.paySuccess_box {
  width: 1024px;
  margin: 0 auto;
  text-align: center;
}
.paySuccess_word {
  width: 218px;
  height: 30px;
  margin: 0 auto;
  margin-top: 59px;
  margin-bottom: 61px;
  position: relative;
}
.special_img {
  float: left;
  margin-right: 10px;
  width: 30px;
  height: 30px;
}
.special_word {
  color: #555964;
  font-size: 18px;
  font-weight: bold;
  float: left;
  margin-top: 3.9px;
}
.paySuccess_detail {
  width: 330px;
  margin: 0 auto;
  text-align: left;
  color: #555964;
  font-size: 14px;
}
.paySuccess_btn {
  width: 320px;
  height: 40px;
  margin: 0 auto;
  margin-top: 100px;
}
.seeOrder {
  width: 140px;
  height: 40px;
  line-height: 40px;
  border: 1px solid #E0E0E0;
  color: #83868E;
  font-size: 14px;
  float: left;
}
.seeOrder:hover {
  cursor: pointer;
  opacity: 0.8;
}
.keepShop {
  width: 140px;
  height: 40px;
  line-height: 40px;
  border: 1px solid #E0E0E0;
  color: #83868E;
  font-size: 14px;
  float: right;
}
.keepShop:hover {
  cursor: pointer;
  opacity: 0.8;
}
</style>
