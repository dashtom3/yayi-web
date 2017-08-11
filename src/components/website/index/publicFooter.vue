<template>
  <div class="publicFooter">
    <div class="footerDes clearfix">
      <ul>
        <li class="foot-title icon01">关于我们</li>
        <li><span @click="jumpHandler1">资质证件</span></li>
        <li><span @click="jumpHandler2">关于牙医abc</span></li>
      </ul>
      <ul>
        <li class="foot-title icon02">乾币规则</li>
        <li><span @click="jumpHandler3">乾币服务与管理协议</span></li>
        <li><span @click="jumpHandler4">道邦品牌乾币赠予标准</span></li>
        <li><span @click="jumpHandler5">乾币赠予标准</span></li>
        <li><span @click="jumpHandler6">乾币兑换标准</span></li>
      </ul>
      <ul>
        <li class="foot-title icon03">售后服务</li>
        <li><span @click="jumpHandler7">退款说明</span></li>
        <li><span @click="jumpHandler8">退换货政策</span></li>
        <li><span @click="jumpHandler9">退换货流程</span></li>
      </ul>
      <ul>
        <li class="foot-title icon04">更多</li>
        <li><span @click="jumpHandler10">产品采购服务协议</span></li>
        <li><span @click="jumpHandler11">牙医abc注册协议</span></li>
        <li><span @click="jumpHandler12">发票说明</span></li>
        <li><span @click="question">意见反馈</span></li>
      </ul>
      <div class="qr-code fr">
        <img src="../../../images/index/qr_code.png" alt="二维码">
        <p>TEL：400-001-4980</p>
        <p>E-mail：yayiabc@yayiabc.com</p>
      </div>
    </div>
    <p class="copyright">Copyright © 2017 yayiABC.com 版权所有 <span @click="beian">沪ICP 备14038156-2</span></p>
  </div>
</template>

<script>
  export default {
    name: 'publicFooter',
    data () {
      return {
      }
    },
    methods: {
      //回到顶部
      backToTop: function() {
        var that = this;
        var timer = null;
        var isTop = true;
        // 滚动条滚动时出发
        window.onscroll = function() {
          if (!isTop) {
            clearInterval(timer);
          }
          isTop = false;
        }
        timer = setInterval(function(){
          var osTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
          var ispeed = Math.floor(-osTop / 5);
          document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
          isTop = true;
          if (osTop == 0) {
            clearInterval(timer);
          }
        },30);
      },
      jumpHandler1(){
        this.backToTop()
        this.$router.push({path: '/protocols/certificate'})
      },
      jumpHandler2(){
        this.backToTop()
        this.$router.push({path: '/protocols/aboutABC'})
      },
      jumpHandler3(){
        this.backToTop()
        this.$router.push({path: '/protocols/currencyService'})
      },
      jumpHandler4(){
        this.backToTop()
        this.$router.push({path: '/protocols/daobangStandard'})
      },
      jumpHandler5(){
        this.backToTop()
        this.$router.push({path: '/protocols/currencyGift'})
      },
      jumpHandler6(){
        this.backToTop()
        this.$router.push({path: '/protocols/currencyExchange'})
      },
      jumpHandler7(){
        this.backToTop()
        this.$router.push({path: '/protocols/refundDes'})
      },
      jumpHandler8(){
        this.backToTop()
        this.$router.push({path: '/protocols/returnPolicy'})
      },
      jumpHandler9(){
        this.backToTop()
        this.$router.push({path: '/protocols/returnFlow'})
      },
      jumpHandler10(){
        this.backToTop()
        this.$router.push({path: '/protocols/purchaseService'})
      },
      jumpHandler11(){
        this.backToTop()
        this.$router.push({path: '/protocols/registration'})
      },
      jumpHandler12(){
        this.backToTop()
        this.$router.push({path: '/protocols/invoiceDes'})
      },   
      //意见反馈
      question: function() {
        var that = this
        window.open('http://cn.mikecrm.com/BvO3hVU')
      },
      beian: function() {
        var that = this
        window.open('http://www.miibeian.gov.cn')
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .icon01{
    background: url(../../../images/index/about_us.png) 2px 15px no-repeat;
  }
  .icon02{
    background: url(../../../images/index/qian_bi.png) 2px 15px no-repeat;
  }
  .icon03{
    background: url(../../../images/index/saled_service.png) 2px 16px no-repeat;
  }
  .icon04{
    background: url(../../../images/index/more.png) 2px 16px no-repeat;
  }
  .fr{
    float: right;
  }
  .qr-code img{
    margin-top: 76px;
  }
  .qr-code p{
    margin-top: 22px;
  }
  .clearfix{
    zoom: 1;
  }
  .clearfix:after{
    content: "";
    clear: both;
    display: block;
  }
  .foot-title{
    font-size: 16px;
    font-weight: bold;
  }
  .footerDes ul{
    width: 240px; 
    font-size: 14px;
    float: left;
    color: #333;
  }
  .footerDes li{
    height: 54px;
    line-height: 54px;
    padding-left: 34px;
  } 
  .publicFooter {
    width: 100%;
    background-color: #F2F2F2;
    padding-top: 30px;
  }
  .footerDes {
    width: 1200px;
    margin: auto;
    margin-bottom: 35px;
  }
  .footerDes span:hover {
    cursor: pointer;
    color: #005aab;
    transition: all ease 0.5s;
    text-decoration: underline;
  }
  .copyright {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #000;
    text-align: center;
    background: #ddd;
  }
  .copyright span{
    cursor: pointer;
  }
  .copyright span:hover{
    color: #005aab;
    text-decoration: underline;
  }
</style>
