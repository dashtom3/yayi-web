<template>
  <div class="medical">
    <!--  锚点侧边栏 开始 -->
    <div v-show="isActive" class="sidebar">
      <div class="sideBtn" :class="{spe: 0==yayi}" @click="jump(0)">品牌库</div>
      <div class="sideBtn" v-for="(sideItem,index) in classifyItems" :key="sideItem" :class="{spe: (index+1)==yayi}" @click="jump(index+1)">{{sideItem.oneClassify}}</div>
    </div>
    <!--  锚点侧边栏 结束 -->
    <!--  品牌库页面 开始 -->
    <div class="brand_box d_jump">
      <div class="img_box">
        <img class="brand_img" src="../../../images/index/brand.png" alt="img">
      </div>
      <div class="prev" @click="prev()">
        <img src="../../../images/index/prev.png" alt="img">
      </div>
      <div class="next" @click="next()">
        <img src="../../../images/index/next.png" alt="img">
      </div>
      <el-carousel :autoplay="true" :interval="5000" height="500px" trigger="click" arrow="never" indicator-position="none" ref="carousel">
        <el-carousel-item>
          <div class="brand_container">
            <div class="brand_item" v-for="oneBrand in brandListData" @click="goToThisBrand(oneBrand.itemBrandId)">
              <img :src="oneBrand.itemBrandLogo" alt="img">
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!--  品牌库页面 结束 -->
    <!--  一级分类页面 开始 -->
    <div class="preventive_box d_jump" :class="{active:index%2==1}" v-for="(classifyItem,index) in classifyItems" :key="classifyItem">
      <div class="img_box_change" @mouseover="img_in" @mouseout="img_out" @click="toBrand(index)">
        <img class="brand_img" v-if="img_change" src="../../../images/index/yayi.png" alt="img">
        <img class="brand_img" v-else src="../../../images/index/yayi_hover.png" alt="img">
        <p class="classifyName">{{classifyItem.oneClassify}}</p>
      </div>
      <div class="preventive_container">
        <div class="preventive_item" v-for="item in filteredItems[index]" :key="item" @click="toDetail(item)">
          <img class="item_img" :src=item.itemDetail.itemPica alt="img">
          <p class="item_des">{{item.itemName}}</p>
          <p class="item_price">￥{{item.itemPrice}}</p>
        </div>
      </div>
    </div>
    <!--  一级分类页面 结束 -->
  </div>
</template>

<script>
export default {
  name: 'medical',
  data () {
    return {
      img_change: true,
      yayi: null,
      isActive: false,
      classifyItems: [],
      items: [],
      sideItems: [],
      brandListData:[]
    }
  },
  computed: {
    filteredItems: function () {
      return this.items.slice(0, 7)
    }
  },
  created: function () {
    var that = this;
    window.addEventListener('scroll', that.menu);
    that.getAllBrandList();
    that.global.axiosGetReq('/item/getAllClassifyAndBrand').then((res) => {
      console.log(res.data)
      if (res.data.callStatus === 'SUCCEED') {
        that.classifyItems = res.data.data.classifyList;
        // console.log(that.classifyItems,'fff');
        for (var i = 0; i < that.classifyItems.length; i++) {
          // console.log(that.classifyItems[i].oneClassify);
          var obj = {
            oneClassify: that.classifyItems[i].oneClassify,
          };
          that.global.axiosPostReq('/item/queryItemSearch', obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              that.items.push(res.data.data);
            } else {
              that.$message.error('网络出错，请稍后再试！');
            }
          })
        }
        // console.log(that.items[i])
      } else {
        that.$message.error('网络出错，请稍后再试！');
      }
    })
  },
  methods: {
    menu: function() {
      var that = this;
      var scroll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      if(scroll >= 800) {
        that.isActive = true;
      } else {
        that.isActive = false;
      }
      var num = parseInt((scroll-650)/800);
      that.yayi = num;
      console.log(scroll);
    },
    // 根据锚点跳转并实现动画
    jump: function(index) {
      var that = this;
      that.yayi = index;
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
    toBrand: function(index) {
      var that = this;
      var kk = index + 1
      var classfyArg = kk +"-0-0AND0";
      that.$router.push({path: '/brandLib/'+classfyArg})
      window.scroll(0,0);
    },
    toDetail: function(item) {
      var that = this;
      that.$router.push({path: '/details/' + item.itemId})
      window.scroll(0,0);
    },
    img_in(index) {
      var that = this;
      that.img_change = false;
    },
    img_out(index) {
      var that = this;
      that.img_change = true;
    },
    getAllBrandList:function(){
      var that = this;
      that.global.axiosGetReq('/item/brandList')
      .then((res) => {
        console.log(res.data.data)
        if (res.data.callStatus === 'SUCCEED') {
          that.brandListData = res.data.data;
        } else {
          that.$message.error('网络出错，请稍后再试！');
        }
      })
    },
    goToThisBrand:function(id){
      var that = this;
      that.$router.push({
        path:"/brandLib/1AND"+id,
      });
    },
    prev() {
      var that = this;
      that.$refs.carousel.prev();
    },
    next() {
      var that = this;
      that.$refs.carousel.next();
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
  background-color: #5ed6dc !important;
  transition: all ease 0.5s;
}
/*----------品牌库页面 开始-------------*/
  .brand_box {
    width: 1200px;
    height: 800px;
    margin: 0 auto;
    text-align: center;
    position: relative;
    /*    background-color: #EECE7C;*/
  }
  .prev {
    position: absolute;
    left: 0;
/*    z-index: 998;*/
  }
  .next {
    position: absolute;
    right: 0;
/*    z-index: 998;*/
  }
  .prev:hover, .next:hover{
    opacity: 0.8;
    cursor: pointer;
  }
  .brand_box .brand_img {
    margin-top: 82px;
  }
  .brand_container {
    width: 800px;
    height: 500px;
    margin: 0 auto;
/*    background-color: #A08F65;*/
    overflow: hidden;
  }
  .brand_container .brand_item {
    float: left;
    width: 163px;
    height: 163px;
    margin-top: 70px;
    margin-left: 46px;
    border: 1px #e9e9e9 solid;
    border-radius: 50%;
    display:flex;
    justify-content:center;
    align-items:center
  }
  .brand_item:hover {
    cursor: pointer;
    box-shadow: 7px 7px 28px #eaeaea;
    transform: translateY(-25px);
    transition: all 0.5s ease;
  }
  .brand_container .brand_item img {
    width: 112px;
    height: 80px;
  }
/*-------------品牌库页面 结束-------------*/
.preventive_box {
  width: 100%;
  height: 800px;
  margin: 0 auto;
  position: relative;
  text-align: center;
  background-color: #F2F2F2;
}
.active {
  background-color: #fff !important;
}
.brand_img {
  margin-top: 20px;
  margin-bottom: 30px;
}
.preventive_container {
  width: 1200px;
/*  height: 1000px;*/
  margin: 0 auto;
/*  background-color: #EECE7C;*/
}
.preventive_item {
  width: 275px;
  height: 295px;
  border: 1px #bcbcbc solid;
  float: left;
  padding: 5px 5px 0 5px;
  margin-right: 17px;
  margin-bottom: 17px;
}
.preventive_item:nth-child(4n+0) {
  margin-right: 0px;
}
.preventive_item:hover {
  cursor: pointer;
}
.preventive_item img:hover {
  box-shadow: 7px 7px 28px #bcbcbc;
  transition: all 0.5s ease;
}
.preventive_item .item_des:hover {
  color: #5DB7E7;
  transition: all 0.5s ease;
}
.preventive_item .item_des{
  font-size: 14px;
  color: #000;
  margin-top: 10px;
  text-align: left;
}
.item_price {
  font-size: 18px;
  color: #D81E06;
  text-align: right;
  margin-right: 15px;
  margin-top: 10px
}
.item_img {
  width: 263px;
  height: 200px;
  background-color: #bcbcbc;
}
.classifyName {
  position: absolute;
  color: #fff;
  top: 45px;
  left: 0px;
  right: 0px;
  transform: translateX(-19px);
}
</style>
