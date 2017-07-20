<template>
  <div class="backToTop">
    <div v-show="top" class="top_box" @click="backToTop" @mouseover="img_in" @mouseout="img_out">
<!--        <p class="top_title">置顶</p> -->
      <img v-if="hoverTop" src="../../../images/index/top2.png" alt="img"/>
      <img v-else src="../../../images/index/top2_hover.png" alt="img"/>
    </div>
    <div v-show="contact" class="contact_box" @click="question" @mouseover="img_in2" @mouseout="img_out2">
<!--        <p class="contact_title">意见反馈</p> -->
      <img v-if="hoverTop2" src="../../../images/index/contact.png" alt="img"/>
      <img v-else src="../../../images/index/contact_h.png" alt="img"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'backToTop',
    data () {
      return {
        hoverTop: true,
        hoverTop2: true,
        top: false,
        contact: false,
      }
    },
    created: function() {
      var that = this;
      window.addEventListener('scroll', that.menu);
    },
    methods: {
      //意见反馈
      question: function() {
        var that = this;
        window.open('http://cn.mikecrm.com/BvO3hVU');
      },
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
      menu: function() {
        var that = this;
        var scroll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if(scroll >= 270) {
          that.top = true;
          that.contact = true;
        } else {
          that.top = false;
          that.contact = false;
        }
        //console.log(scroll, 'frisco')
      },
      img_in() {
        var that = this;
        that.hoverTop = false;
      },
      img_out() {
        var that = this;
        that.hoverTop = true;
      },
      img_in2() {
        var that = this;
        that.hoverTop2 = false;
      },
      img_out2() {
        var that = this;
        that.hoverTop2 = true;
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .top_box {
    width: 64px;
    height: 86px;
    padding: 5px;
    font-size: 14px;
    position: fixed;
    top: 350px;
    right:0px;
    z-index: 999;
    text-align: center;
  }
  .top_box:hover {
    cursor: pointer;
  }
  .top_title {
    margin-bottom: 8px;
  }
  .contact_box {
    width: 64px;
    height: 46px;
    padding: 5px;
    font-size: 14px;
    position: fixed;
    top: 290px;
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
