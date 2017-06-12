<template>
  <div class="publicFooter">
    <p class="footerDes">
      <span>关于我们</span>
      <span>联系我们</span>
      <span>联系客服</span>
      <span style="margin-right:0px; border:none;">意见反馈</span>
    </p> 
    <p class="copyright">Copyright © 2017 yayiABC.com 版权所有</p>
  </div>
</template>

<script>
  export default {
    name: 'publicFooter',
    data () {
      return {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.publicFooter {
  width: 100%;
  height: 150px;
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
.footerDes span:hover {
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
