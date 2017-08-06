<template>
  <div class="myOrder">
    <div class="tab_box">
      <div class="tab_item" :class="{spe: isActive1}" @click="changeActive1(tab01Text);">全部订单</div>
      <div class="tab_item" :class="{spe: isActive2}" @click="changeActive2(tab02Text);">待付款</div>
      <div class="tab_item" :class="{spe: isActive3}" @click="changeActive3(tab03Text);">待发货</div>
      <div class="tab_item" :class="{spe: isActive4}" @click="changeActive4(tab04Text);">待收货</div>
      <div class="tab_item" :class="{spe: isActive5}" @click="changeActive5(tab05Text);">待评价</div>
<!--       <div class="tab_item" :class="{spe: isActive6}" @click="changeActive6(tab06Text);">退款／退货／换货中</div> -->
    </div>
    <!-- 点击导航后要切换的内容 -->
    <transition name="component-fade" mode="out-in">
      <component :is="currentView" keep-alive></component>
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue'
  import allOrder from './allOrder'
  import waitOrder from './waitOrder'
  import waitSend from './waitSend'
  import waitRec from './waitRec'
  import waitComment from './waitComment'
  import returnSales from './returnSales'
  var tab03 = Vue.extend({
    template: '<div>this is 待评价03</div>',
  });
  export default {
    name: 'myOrder',
    data () {
      return {
        isActive1: true,
        isActive2: false,
        isActive3: false,
        isActive4: false,
        isActive5: false,
        isActive6: false,
        tab01Text: "tab01",
        tab02Text: "tab02",
        tab03Text: "tab03",
        tab04Text: "tab04",
        tab05Text: "tab05",
        tab06Text: "tab06",
        currentView: 'tab01', //默认选中的导航栏
      }
    },
    components: {
      tab01: allOrder,
      tab02: waitOrder,
      tab03: waitSend,
      tab04: waitRec,
      tab05: waitComment,
      tab06: returnSales,
    },
    mounted: function() {
      var that = this;
      if(that.$route.params.currentView == 'tab01') {
        that.$emit('listenToChildEvent','tab01')
      }
      // that.getOrdersNums();
    },
    methods: {
      getOrdersNums:function(){
        var that = this;
        that.global.axiosPostReq('/OrderDetails/queryOrderNums')
        .then((res) => {
          console.log(res,"nums")
          if (res.data.callStatus === 'SUCCEED') {

          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })

      },
      changeActive1: function(tabText) {
        this.currentView = tabText;
        this.isActive1 = true;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = false;
        this.isActive5 = false;
        this.isActive6 = false;
      },
      changeActive2: function(tabText) {
        this.currentView = tabText;
        this.isActive1 = false;
        this.isActive2 = true;
        this.isActive3 = false;
        this.isActive4 = false;
        this.isActive5 = false;
        this.isActive6 = false;
      },
      changeActive3: function(tabText) {
        this.currentView = tabText;
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = true;
        this.isActive4 = false;
        this.isActive5 = false;
        this.isActive6 = false;
      },
      changeActive4: function(tabText) {
        this.currentView = tabText;
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = true;
        this.isActive5 = false;
        this.isActive6 = false;
      },
      changeActive5: function(tabText) {
        this.currentView = tabText;
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = false;
        this.isActive5 = true;
        this.isActive6 = false;
      },
      changeActive6: function(tabText) {
        this.currentView = tabText;
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = false;
        this.isActive5 = false;
        this.isActive6 = true;
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*-------animation start------*/
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-active {
  opacity: 0;
}
.spe {
  background-color: #5DB7E7;
  color: #fff !important;
}
.myOrder {
  width: 100%;
  height: 100%;
/*  background-color: #A08F65;*/
}
.tab_box {
  width: 1069px;
  height: 40px;
  border-bottom: 1px solid #e9e9e9;
}
.tab_item {
  width: 139px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  color: #000;
  float: left;
}
.tab_item:hover {
  cursor: pointer;
  background-color: #5DB7E7;
  transition: all ease 0.5s;
  color: #fff;
}
</style>
