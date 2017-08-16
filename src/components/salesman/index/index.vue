<template>
    <div class="salesIndex">
        <salesHead v-on:msgFromChild="getMsg"></salesHead>
        <div class="saleSecond">
            <img class="logo_img" src="../../../images/index/logo.png" alt="img" @click="changeActive1(tab01Text)"/>
            <div class="tab_box">
                <div class="tab_item" :class="{spe: isActive1}" @click="changeActive1(tab01Text);">首页</div>
                <div class="tab_item" :class="{spe: isActive7}" @click="changeActive7(tab07Text);">销售排行榜</div>
                <div class="tab_item" :class="{spe: isActive3}" @click="changeActive3(tab03Text);">发现客户</div>
                <div class="tab_item" :class="{spe: isActive2}" @click="changeActive2(tab02Text);">我的业绩</div>
                <div class="tab_item" :class="{spe: isActive4}" @click="changeActive4(tab04Text);">我的客户</div>
                <div class="tab_item" :class="{spe: isActive5}" @click="changeActive5(tab05Text);">我的钱包</div>
                <div class="tab_item" :class="{spe: isActive6}" @click="changeActive6(tab06Text);">个人信息</div>
            </div>
            <div class="clearfix"></div>
        </div>
        <!-- 点击导航后要切换的内容 -->
        <transition name="component-fade" mode="out-in">
            <component v-on:msgFromChild="getMsg" :toMySon="dataValue" :toEditPay="dataValue2" :toEditDraw="dataValue1" :is="currentView"
                       keep-alive></component>
        </transition>
        <div class="clearfix"></div>
        <salesFoot></salesFoot>
    </div>
</template>

<script>
  import Vue from 'vue'
  import salesHead from "./header"
  import salesFoot from "./footer"
  import findClient from "./findClient"
  import myClient from "./myClient"
  import personalData from "./personalData"
  import homePage from "./homePage"
  import myOrder from "./myorder"
  import myWallet from "./myWallet"
  import saleCharts from "./saleCharts"
  import messafe from "./saleCharts"
  import Bus from '../../global/bus.js'

  export default {
    name: 'salesIndex',
    data() {
      return {
        isActive1: true,
        isActive2: false,
        isActive3: false,
        isActive4: false,
        isActive5: false,
        isActive6: false,
        isActive7: false,
        tab01Text: "tab01",
        tab02Text: "tab02",
        tab03Text: "tab03",
        tab04Text: "tab04",
        tab05Text: "tab05",
        tab06Text: "tab06",
        tab07Text: "tab07",
        currentView: 'tab01', //默认选中的导航栏
        dataValue: null,
        dataValue1: null,
        dataValue2: null
      }
    },
    components: {
      salesHead,
      salesFoot,
      tab01: homePage,
      tab02: myOrder,
      tab03: findClient,
      tab04: myClient,
      tab05: myWallet,
      tab06: personalData,
      tab07: saleCharts,
      myOrder,
    },
    //*******导航钩子*********//
    // beforeRouteEnter (to, from, next) {
    //   // 通过 `vm` 访问组件实例
    //   next(vm => {
    //     var that = vm;
    //     console.log(that,'0000')
    //   })
    // },
    created: function() {
      var that = this
      Bus.$on('getTarget', target => {
        if (target == 'noSee') {
          that.changeActive1(that.tab01Text);
        }else if (target == 'nowComplete') {
          that.changeActive6(that.tab06Text);
          that.dataValue = '';
          that.dataValue1 = '';
          that.dataValue2 = '';
        }
      });  
    },
    methods: {
      getMsg: function (data) {
        var that = this;
        if (data == "goToMyClient") {
          that.changeActive4(that.tab04Text);
          that.dataValue = '';
        } else if (data == "goToFindClient") {
          that.changeActive3(that.tab03Text);
          that.dataValue = '';
        } else if (data == "editMyPersData") {
          that.changeActive6(that.tab06Text);
          that.dataValue = '';
        } else if (data.flag == "editMyPersPay") {
          that.changeActive6(that.tab06Text);
          that.dataValue2 = data;
        } else if (data.myMoney == 'getMyMoney') {
          that.changeActive5(that.tab05Text);
          that.dataValue = data;
        } else if (data.flag == "editWithDraw") {
          that.changeActive6(that.tab06Text);
          that.dataValue1 = data;
        }
      },
      changeActive1: function (tabText) {
        this.currentView = tabText;
        this.isActive1 = true;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = false;
        this.isActive5 = false;
        this.isActive6 = false;
        this.isActive7 = false;
        this.dataValue = '';
      },
      changeActive2: function (tabText) {
        this.currentView = tabText;
        this.isActive1 = false;
        this.isActive2 = true;
        this.isActive3 = false;
        this.isActive4 = false;
        this.isActive5 = false;
        this.isActive6 = false;
        this.isActive7 = false;
        this.dataValue = '';
      },
      changeActive3: function (tabText) {
        this.currentView = tabText;
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = true;
        this.isActive4 = false;
        this.isActive5 = false;
        this.isActive6 = false;
        this.isActive7 = false;
        this.dataValue = '';
      },
      changeActive4: function (tabText) {
        this.currentView = tabText;
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = true;
        this.isActive5 = false;
        this.isActive6 = false;
        this.isActive7 = false;
        this.dataValue = '';
      },
      changeActive5: function (tabText) {
        this.currentView = tabText;
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = false;
        this.isActive5 = true;
        this.isActive6 = false;
        this.isActive7 = false;
        this.dataValue = '';
      },
      changeActive6: function (tabText) {
        this.currentView = tabText;
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = false;
        this.isActive5 = false;
        this.isActive6 = true;
        this.isActive7 = false;
        this.dataValue = '';
      },
      changeActive7: function (tabText) {
        this.currentView = tabText;
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = false;
        this.isActive5 = false;
        this.isActive6 = false;
        this.isActive7 = true;
        this.dataValue = '';
      },
      // logo: function() {
      //   var that = this;
      //   that.$router.push({path: '/'});
      // }
    }
  }
</script>

<style scoped>
    .saleSecond {
        width: 1200px;
        height: 90px;
        margin: auto;
        margin-bottom: 3px;
        border-bottom: 1px solid #eeeeee;
    }

    .logo_img {
        float: left;
        margin-top: 20px;
        margin-right: 88px;
        cursor: pointer;
    }

    .tab_box {
        float: left;
    }

    .tab_item {
        float: left;
        width: 130px;
        height: 90px;
        line-height: 90px;
        color: #000;
        text-align: center;
        font-size: 16px;
        cursor: pointer;
    }

    .spe {
        color: #005aab;
        border-bottom: 3px solid #005aab;
    }
</style>
