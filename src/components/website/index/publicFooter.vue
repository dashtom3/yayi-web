<template>
  <div class="publicFooter">
    <p class="footerDes">
      <span @click="aboutUs">关于我们</span>
      <span>联系我们</span>
      <span>联系客服</span>
      <span style="margin-right:0px; border:none;" @click="question">意见反馈</span>
    </p> 
    <p class="copyright">Copyright © 2017 yayiABC.com 版权所有 <span @click="beian">沪ICP 备14038156</span></p>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'publicFooter',
    data () {
      return {
      }
    },
    created: function() { 
    },
    methods: {
      //意见反馈
      question: function() {
        var that = this
        window.open('http://cn.mikecrm.com/BvO3hVU')
      },
      beian: function() {
        var that = this
        window.open('http://www.miibeian.gov.cn')
      },
      aboutUs: function() {
        // var that = this;
        // axios.defaults.headers['token'] = that.global.getToken()
        // that.global.axiosPostReq('/test').then((res) => {
        //   console.log(res,'opop')
        // })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .publicFooter {
    width: 100%;
    height: 110px;
    background-color: #F2F2F2;
    text-align: center;
    padding-top: 35px;
  }
  .footerDes {
    font-size: 14px;
    color: #000;
    margin-bottom: 35px;
  }
  .footerDes span {
    /*  margin-right: 92px;*/
    padding-right: 46px;
    padding-left: 46px;
    border-right: 1px #bcbcbc solid;
  }
  span:hover {
    cursor: pointer;
    color: #5DB7E7;
    transition: all ease 0.5s;
    text-decoration: underline;
  }
  .copyright {
    font-size: 14px;
    color: #000;
  }
</style>
