<template>
  <div class="center">
    <publicHeader></publicHeader>
    <backToTop></backToTop>
    <div class="big_box">
      <div class="left_box">
        <div class="left_item" :class="{spe: isActive1}" @click="changeActive1(tab01Text);">我的订单</div>
        <div class="left_item" :class="{spe: isActive2}" @click="changeActive2(tab02Text);">我的乾币</div>
        <div class="left_item" :class="{spe: isActive3}" @click="changeActive3(tab03Text);">我的收藏</div>
        <div class="left_item" :class="{spe: isActive4}" @click="changeActive4(tab04Text);">个人资料</div>
        <div class="left_item" :class="{spe: isActive5}" @click="changeActive5(tab05Text);">收货地址</div>
      </div>
      <div class="right_box">
        <!-- 点击导航后要切换的内容 -->
        <!-- <transition name="component-fade" mode="out-in">
          <component :salesman="message" :is="currentView" keep-alive></component>
        </transition> -->
        <transition name="component-fade" mode="out-in">
          <router-view :salesman="message" v-on:listenToChildEvent="MsgFromChild"></router-view>
        </transition>
      </div>
      <div class="clearfix"></div>
    </div>
    <publicFooter></publicFooter>
  </div>
</template>

<script>
  import Vue from 'vue'
  import publicHeader from '../index/publicHeader'
  // import myOrder from './myOrder/myOrder'
  import publicFooter from '../index/publicFooter'
  // import myMoneyList from './myMoney/myMoneyDetails'
  // import myCollection from './myCollection/myCollection'
  // import personal from './personalData/personal'
  // import myAdd from './myAdd/myAdd'
  import backToTop from '../index/backToTop'
  // var tab02 = Vue.extend({
  //   template: '<div>this is 待评价02</div>',
  // });
  export default {
    name: 'center',
    data () {
      return {
        isActive1: true,
        isActive2: false,
        isActive3: false,
        isActive4: false,
        isActive5: false,
        tab01Text: "tab01",
        tab02Text: "tab02",
        tab03Text: "tab03",
        tab04Text: "tab04",
        tab05Text: "tab05",
        // currentView: 'tab01', //默认选中的导航栏
        message: 2,
      }
    },
    components: {
      publicHeader,
      publicFooter,
      backToTop,
      // tab01: myOrder,
      // tab02: myMoneyList,
      // tab03: myCollection,
      // tab04: personal,
      // tab05: myAdd,
    },
    //*******导航钩子*********//
    beforeRouteEnter (to, from, next) {
      // 通过 `vm` 访问组件实例
      next(vm => {
        var that = vm;
        var obj = {
          phone:that.global.getUser().phone,
          token:that.global.getToken()
        };
        that.global.axiosGetReq('/cart/list', obj).then((res) => {
          if(res.data.errorCode === 'RE_LOGIN'){
            that.$router.push({name:'index', params: { data: 'RE_LOGIN'}})
            return false;
          }
        })
        if (that.$router.history.current.name == '我的乾币') {
          that.isActive1 = false;
          that.isActive2 = true;
          that.isActive3 = false;
          that.isActive4 = false;
          that.isActive5 = false;
        }else if(that.$router.history.current.name == '我的收藏'){
          that.isActive1 = false;
          that.isActive2 = false;
          that.isActive3 = true;
          that.isActive4 = false;
          that.isActive5 = false;
        }else if(that.$router.history.current.name == '个人资料'){
          that.isActive1 = false;
          that.isActive2 = false;
          that.isActive3 = false;
          that.isActive4 = true;
          that.isActive5 = false;
        }else if(that.$router.history.current.name == '收货地址'){
          that.isActive1 = false;
          that.isActive2 = false;
          that.isActive3 = false;
          that.isActive4 = false;
          that.isActive5 = true;
        }else if(that.$router.history.current.name == '我的订单'){
          that.isActive1 = true;
          that.isActive2 = false;
          that.isActive3 = false;
          that.isActive4 = false;
          that.isActive5 = false;
        }
      })
    },
    mounted: function() {
      var that = this;
      if (that.$route.params.currentView == 'tab04'){
        that.isActive1 = false;
        that.isActive2 = false;
        that.isActive3 = false;
        that.isActive4 = true;
        that.isActive5 = false;
      }
    },
    methods: {
      MsgFromChild: function(data) {
        var that = this;
        if (data == 'tab01') {
          that.isActive1 = true;
          that.isActive2 = false;
          that.isActive3 = false;
          that.isActive4 = false;
          that.isActive5 = false;
        } else if(data == 'tab0401') {
          that.isActive1 = false;
          that.isActive2 = false;
          that.isActive3 = false;
          that.isActive4 = true;
          that.isActive5 = false;
        }
      },
      changeActive1: function(tabText) {
        // this.currentView = tabText;
        this.$router.push({path: '/center/myOrder'});
        this.isActive1 = true;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = false;
        this.isActive5 = false;
      },
      changeActive2: function(tabText) {
        // this.currentView = tabText;
        this.$router.push({path: '/center/myMoney'});
        this.isActive1 = false;
        this.isActive2 = true;
        this.isActive3 = false;
        this.isActive4 = false;
        this.isActive5 = false;
      },
      changeActive3: function(tabText) {
        // this.currentView = tabText;
        this.$router.push({path: '/center/myCollection'});
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = true;
        this.isActive4 = false;
        this.isActive5 = false;
      },
      changeActive4: function(tabText) {
        // this.currentView = tabText;
        this.$router.push({path: '/center/personalData'});
        this.message = 4;
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = true;
        this.isActive5 = false;
      },
      changeActive5: function(tabText) {
        // this.currentView = tabText;
        this.$router.push({path: '/center/myAdd'});
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = false;
        this.isActive5 = true;
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
  background-color: #329af0 !important;
}
.big_box {
  width: 1200px;
  min-height: 583px;
/*  height: 1000px;*/
  margin: auto;
  margin-bottom: 50px;
  position: relative;
}
.left_box {
  width: 110px;
  height: 204px;
  float: left;
}
.left_item {
  width: 110px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  margin-bottom: 1px;
  background-color: #005aab;
}
.left_item:hover {
  cursor: pointer;
  background-color: #329af0;
  transition: all ease 0.5s;
}
.right_box {
  width: 1069px;
/*  height: 1000px;*/
  float: right;
/*  background-color: #EECE7C;*/
}
</style>
