<template>
  <div class="index">
    <div v-show="isActive" class="sidebar">
<!--       <div class="sideBtn" v-for="(item,index) in items" @click="jump(index)">{{item.des}}</div> -->
      <div class="sideBtn" :class="{spe: isSpe1}" @click="jump(0)">品牌库</div>
      <div class="sideBtn" :class="{spe: isSpe2}" @click="jump(1)">品牌护理</div>
      <div class="sideBtn" :class="{spe: isSpe3}" @click="jump(2)">口内材料</div>
      <div class="sideBtn" :class="{spe: isSpe4}" @click="jump(3)">医用耗材</div>
      <div class="sideBtn" :class="{spe: isSpe5}" @click="jump(4)">器械</div>
      <div class="sideBtn" :class="{spe: isSpe6}" @click="jump(5)">仪器</div>
    </div>
    <div v-show="top" class="top_box" @click="backToTop">
       <p class="top_title">置顶</p>
      <img src="../../../images/index/top.png" alt="img" />
    </div>
    <div v-show="contact" class="contact_box">
       <p class="contact_title">联系客服</p>
      <img src="../../../images/index/contact.png" alt="img" />
    </div>
    <publicHeader></publicHeader>
    <classify></classify>
    <carousel></carousel>
    <brand class="d_jump"></brand>
    <preventive class="d_jump"></preventive>
    <dental class="d_jump"></dental>
    <medical class="d_jump"></medical>
    <apparatus class="d_jump"></apparatus>
    <instrument class="d_jump"></instrument>
    <publicFooter></publicFooter>
  </div>
</template>

<script>
  import publicHeader from './publicHeader'
  import publicFooter from './publicFooter'
  import classify from './classify'
  import carousel from './carousel'
  import brand from './brand'
  import preventive from './preventive'
  import dental from './dental'
  import medical from './medical'
  import apparatus from './apparatus'
  import instrument from './instrument'

  export default {
    name: 'index',
    data () {
      return {
        isActive: false,
        top: false,
        contact: false,
        isSpe1: false,
        isSpe2: false,
        isSpe3: false,
        isSpe4: false,
        isSpe5: false,
        isSpe6: false,
      }
    },
    components: {
      publicHeader,
      classify,
      carousel,
      brand,
      preventive,
      dental,
      medical,
      apparatus,
      instrument,
      publicFooter,
    },
    created: function() {
      var that = this;
      window.addEventListener('scroll', that.menu);
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
          var ispeed = Math.floor(-osTop / 6);
          document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
          isTop = true;
          if (osTop == 0) {
            clearInterval(timer);
          }
        },30);
      },
      menu: function() {
        var that = this;
        var scroll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if(scroll >= 819) {
          that.isActive = true;
        } else {
          that.isActive = false;
        }
        if(scroll >= 1577) {
          that.top = true;
          that.contact = true;
        } else {
          that.top = false;
          that.contact = false;
        }
        if(scroll >= 819 && scroll < 982) {
          that.isSpe1 = true;
        } else {
          that.isSpe1 = false;
        }
        if(scroll >= 982 && scroll < 1831) {
          that.isSpe2 = true;
        } else {
          that.isSpe2 = false;
        }
        if(scroll >= 1831 && scroll < 2730) {
          that.isSpe3 = true;
        } else {
          that.isSpe3 = false;
        }
        if(scroll >= 2730 && scroll < 3613) {
          that.isSpe4 = true;
        } else {
          that.isSpe4 = false;
        }
        if(scroll >= 3613 && scroll < 4390) {
          that.isSpe5 = true;
        } else {
          that.isSpe5 = false;
        }
        if(scroll >= 4390) {
          that.isSpe6 = true;
        } else {
          that.isSpe6 = false;
        }
        // console.log(scroll, 'frisco')
      },
      // 根据锚点跳转并实现动画
      jump: function(index) {
        var that = this;
        // 用 class="d_jump" 添加锚点
        var jump = document.querySelectorAll('.d_jump')
        var total = jump[index].offsetTop
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
          var hei = total - osTop;
          // var ispeed = Math.floor(-hei / 6);
          if( hei > 0) {
            document.documentElement.scrollTop = document.body.scrollTop = osTop + 15;
            isTop = true;
            if (document.body.scrollTop >= total || document.documentElement.scrollTo >= total){
              clearInterval(timer);
            }
          } else {
            document.documentElement.scrollTop = document.body.scrollTop = osTop - 15;
            isTop = true;
            if (document.body.scrollTop <= total || document.documentElement.scrollTo <= total){
              clearInterval(timer);
            } 
          }
        },1);
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a {
    color: #fff;
  }
  .sidebar {
    width: 145px;
    height: 246px;
    position: fixed;
    z-index: 9999;
    top: 140px;
    /*  left: -165px;*/
  }
  .sideBtn {
    width: 145px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-bottom: 1px;
    color: #fff;
    background-color: #5DB7E7;
  }
  .sideBtn:hover {
    cursor: pointer;
    background-color: #5ed6dc;
    transition: all ease 0.5s;
  }
  .spe {
    background-color: #5ed6dc;
    transition: all ease 0.5s;
  }
  .top_box {
    width: 64px;
    height: 86px;
    padding: 5px;
    font-size: 14px;
/*    background-color: #EECE7C;*/
    position: fixed;
    top: 150px;
    right:0px;
    z-index: 999;
    text-align: center;
  }
  .top_box:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  .top_title {
    margin-bottom: 8px;
  }
  .contact_box {
    width: 64px;
    height: 86px;
    padding: 5px;
    font-size: 14px;
/*    background-color: #EECE7C;*/
    position: fixed;
    top: 250px;
    right:0px;
    z-index: 999;
    text-align: center;
  }
  .contact_box:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  .contact_title {
    margin-bottom: 8px;
  }
</style>
