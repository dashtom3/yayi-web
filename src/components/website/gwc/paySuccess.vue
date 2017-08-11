<template>
  <div class="paySuccess">
    <publicHeader></publicHeader>
    <div class="paySuccess_box" ref="contentHeight">
      <div class="paySuccess_word">
        <img class="special_img" src="../../../images/gwc/pay1.png" alt="img">
        <span class="special_word">恭喜您，付款成功！</span>
      </div>
      <div class="timer_word"><span style="color: #cb1700">{{timer}}</span>秒后自动跳转我的订单</div>
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
    name: 'paySuccess',
    data () {
      return {
        timer: 6,
        t: null
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
        if (that.global.getToken() == null) {
          that.$router.push({path:'/'})
        }
        //  that.$route.params.payData !== 'success'
        //console.log(that.$router.history,'222')
        // that.$router.history.current.name == 'eastshui'
      })
    },
    created: function() {
      var that = this;
      window.sessionStorage.removeItem('order');
      for(let i=0; i<=6; i++) {
        that.t = window.setTimeout(function(){
          if (that.timer !== 0) {
            that.timer--
          } else {
            that.$router.push({path:'/center/myOrder'})
          }
        }, i * 1000)
      }
    },
    mounted() {
      var kk = this.$refs.contentHeight;
      var wh = document.body.scrollHeight;
      kk.style.minHeight = wh - 122 - 199 + 'px';
    },
    methods: {
      see: function() {
        var that = this;
        window.clearTimeout(that.t);
        that.$router.push({path: '/center/myOrder'});
      },
      keep: function() {
        var that = this;
        window.clearTimeout(that.t);
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
}
.special_word {
  color: #555964;
  font-size: 18px;
  font-weight: bold;
  float: left;
  margin-top: 3.9px;
  text-align: right;
}
.timer_word {
  color: #555964;
  font-size: 16px;
  font-weight: bold;
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
  margin-top: 50px;
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
