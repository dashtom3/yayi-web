<template>
  <div class="medical">
    <!--  锚点侧边栏 开始 -->
    <div v-show="isActive" class="sidebar">
      <div class="sideBtn" :class="{spe: 0==yayi}" @click="jump(0)">品牌库</div>
      <div class="sideBtn" :class="{spe: 1==yayi}" @click="jump(1)">本期主推</div>
      <div class="sideBtn" v-for="(sideItem,index) in classifyList" v-if="sideItem.oneClassify" :key="sideItem.oneId" :class="{spe: (index+2)==yayi}" @click="jump(index+2)">{{sideItem.oneClassify}}</div>
    </div>
    <!--  锚点侧边栏 结束 -->
    <!--  品牌库页面 开始 -->
    <div class="brand_box d_jump">
      <div class="img_box">
        <img class="brandd_img" src="../../../images/index/brand.png" alt="img">
      </div>
      <div class="prev" @click="prev()">
        <img src="../../../images/index/prev.png" alt="img">
      </div>
      <div class="next" @click="next()">
        <img src="../../../images/index/next.png" alt="img">
      </div>
      <el-carousel :autoplay="true" :interval="3500" height="500px" trigger="click" arrow="never" indicator-position="none" ref="carousel">
        <el-carousel-item>
          <div class="brand_container">
            <div class="brand_item" v-for="oneBrand in filteredBrandListData" @click="goToThisBrand(oneBrand.itemBrandId)">
              <img :src="oneBrand.itemBrandLogo" alt="img">
            </div>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="brand_container">
            <div class="brand_item" v-for="oneBrand in filteredBrandListData1" @click="goToThisBrand(oneBrand.itemBrandId)">
              <img :src="oneBrand.itemBrandLogo" alt="img">
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!--  品牌库页面 结束 -->
    <!--  本期主推页面 开始 -->
    <div class="preventive_box d_jump">
      <div class="img_box">
        <img class="brand_img" src="../../../images/index/yayi.png" alt="img">
        <p class="classifyName">本期主推</p>
      </div>
      <div class="preventive_container">
        <div class="preventive_item" v-if="index<10" v-for="(item,index) in RecommendListData" :key="item.itemId" @click="toDetail(item)">
          <div class="item_img_box">
            <img class="item_img" :src="item.itemDetail.itemPica+'?imageView2/1/w/200/h/200'" alt="img">
            <span style="display: inline-block; height: 100%; vertical-align: middle;"></span>
          </div>
          <p class="item_des">{{item.itemName}}</p>
          <p class="item_price">￥{{item.itemPrice}}</p>
        </div>
      </div>
    </div>
    <!--  本期主推页面 结束 -->
    <!--  一级分类页面 开始 -->
    <div class="preventive_box d_jump" :style="{backgroundImage: 'url('+backgroundImgs[index%2==0?index/2:'']+')'}" :class="{active:index%2==1}"  v-for="(classifyItem,index) in classifyList" :key="classifyItem.oneClassify">
      <div class="img_box_change" @mouseover="img_in(classifyItem)" @mouseout="img_out(classifyItem)" @click="toBrand(index)">
        <img class="brand_img" v-if="img_change!==classifyItem.oneId" src="../../../images/index/yayi.png" alt="img">
        <img class="brand_img" v-else src="../../../images/index/yayi_hover.png" alt="img">
        <p class="classifyName">{{classifyItem.oneClassify}}</p>
      </div>
      <div class="preventive_container">
        <div class="preventive_item" v-if="index<10" v-for="(item,index) in classifyItem.items" :key="item.itemName" @click="toDetail(item)">
        <!--     <router-link :to="{ name: 'details', params: { goodId: item.itemId }}" target="_blank"></router-link> -->
          <div class="item_img_box">
            <img class="item_img" :src="item.itemDetail.itemPica+'?imageView2/1/w/200/h/200'" alt="img">
            <span style="display: inline-block; height: 100%; vertical-align: middle;"></span>
          </div>
          <p class="item_des">{{item.itemName}}</p>
          <p class="item_price">￥{{item.itemPrice}}</p>
        </div>
      </div>
    </div>
    <!--  一级分类页面 结束 -->
    <div class="clearfix" style="width: 100%; height:60px; background-color:#fff;"></div>
  </div>
</template>

<script>
export default {
  name: 'medical',
  data () {
    return {
      backgroundImgs:["http://oqhy88nu6.bkt.clouddn.com/%E9%A2%84%E9%98%B2%E6%8A%A4%E7%90%86.png","http://oqhy88nu6.bkt.clouddn.com/%E9%A2%84%E5%A4%87%E5%88%87%E7%A3%A8.png","http://orl5769dk.bkt.clouddn.com/yaYiBack_3_3.jpg","http://orl5769dk.bkt.clouddn.com/yaYiBack_4.jpg"],
      img_change: true,
      yayi: null,
      isActive: false,
      classifyItems: [],
      classifyList: [],
      // items: [],
      sideItems: [],
      brandListData:[],
      brandListData1: [],
      RecommendListData: [],
    }
  },
  computed: {
    filteredBrandListData: function () {
      return this.brandListData.slice(0, 8)
    },
    filteredBrandListData1: function () {
      return this.brandListData1.slice(8, 17)
    }
  },
  created: function () {
    var that = this;
    window.addEventListener('scroll', that.menu);
    that.getAllBrandList();
    that.getAllRecommend();
    that.global.axiosGetReq('/item/getAllClassifyAndBrand').then((res) => {
      if (res.data.callStatus === 'SUCCEED') {
        that.classifyItems = res.data.data.classifyList;
        for (let i = 0; i < that.classifyItems.length; i++) {
          that.classifyItems[i].items = []
          var obj = {
            oneClassify: that.classifyItems[i].oneClassify,
          };
          that.global.axiosPostReq('/item/queryItemSearchGet', obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              if (res.data.data.length == 0) {
                that.classifyItems[i].kong = 1
                that.classifyItems[i].items = res.data.data
              } else {
                that.classifyItems[i].kong = 2
                that.classifyItems[i].items = res.data.data
              }
              that.classifyList = that.classifyItems.filter(function(ele,index,arr) {
                return ele.kong == 2
              })
            } else {
              that.$message.error('网络出错，请稍后再试！');
            }
          })
        }
      }
    })
  },
  methods: {
    menu: function() {
      var that = this;
      var scroll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      if(scroll >= 636) {
        that.isActive = true;
      } else {
        that.isActive = false;
      }
      var num = parseInt((scroll-560)/636);
      that.yayi = num;
      // console.log(scroll);
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
        var osTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop; //网页被卷去的高
        var hei = total - osTop;
        var a = document.documentElement.clientHeight; //网页可见区域高
        var c = document.documentElement.scrollHeight; //网页正文全文高
        // var ispeed = Math.floor(-hei / 6);
        // console.log(total,'hei')
        if (osTop + a == c) {
          clearInterval(timer);
          // isTop = false;
        }
        if( hei > 0) {
          document.documentElement.scrollTop = document.body.scrollTop = osTop + 25;
          isTop = true;
          if (document.body.scrollTop >= total || document.documentElement.scrollTop >= total || window.pageYOffset >= total){
            clearInterval(timer);
          }
        } else {
          document.documentElement.scrollTop = document.body.scrollTop = osTop - 25;
          isTop = true;
          if (document.body.scrollTop !== 0 && document.body.scrollTop <= total) {
            clearInterval(timer);
          } else if (document.documentElement.scrollTop !== 0 && document.documentElement.scrollTop <= total) {
            clearInterval(timer);
          } else if (window.pageYOffset !== 0 && window.pageYOffset <= total) {
            clearInterval(timer);
          }
        }
      },1);
    },
    toBrand: function(index) {
      var that = this;
      var kk = index + 1
      var classfyArg = kk + "-0-0AND0";
      that.$router.push({path: '/brandLib/'+ classfyArg})
      window.scroll(0,0);
    },
    toDetail: function(item) {
      var that = this;
      window.open('/details/' + item.itemId)
      // that.$router.push({path: '/details/' + item.itemId})
      // window.scroll(0,0);
    },
    img_in(classifyItem) {
      var that = this;
      that.img_change = classifyItem.oneId;
    },
    img_out(classifyItem) {
      var that = this;
      that.img_change = -1;
    },
    getAllBrandList:function(){
      var that = this;
      that.global.axiosGetReq('/item/brandList').then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          that.brandListData = res.data.data;
          that.brandListData1 = res.data.data;
        } else {
          that.$message.error('网络出错，请稍后再试3！');
        }
      })
    },
    getAllRecommend:function(){
      var that = this;
      that.global.axiosGetReq('/item/getAllRecommendItemList').then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          that.RecommendListData = res.data.data;
        }
      })
    },
    goToThisBrand:function(id){
      var that = this;
      that.$router.push({
        path:"/brandLib/0-0-0AND"+id,
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
  width: 135px;
  height: 246px;
  position: fixed;
  z-index: 100;
  top: 139px;
}
.sideBtn {
  width: 135px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin-bottom: 1px;
  color: #fff;
  background-color: #005aab;
}
.sideBtn:hover {
  cursor: pointer;
  background-color: #329af0;
  transition: all ease 0.5s;
}
.spe {
  background-color: #329af0 !important;
  transition: all ease 0.5s;
}
/*----------品牌库页面 开始-------------*/
  .brand_box {
    width: 1200px;
    height: 636px;
    margin: 0 auto;
    text-align: center;
    position: relative;
  }
  .prev {
    position: absolute;
    left: 0;
    z-index: 99;
  }
  .next {
    position: absolute;
    right: 0;
    z-index: 99;
  }
  .prev:hover, .next:hover{
    opacity: 0.8;
    cursor: pointer;
  }
  .brand_box .brandd_img {
    margin-top: 40px;
  }
  .brand_container {
    width: 800px;
    height: 500px;
    margin: 0 auto;
    overflow: hidden;
  }
  .brand_container .brand_item {
    float: left;
    width: 152px;
    height: 152px;
    margin-top: 70px;
    margin-left: 17.5px;
    margin-right: 17.5px;
    border: 1px #efefef solid;
    border-radius: 50%;
    display:flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .brand_item:hover {
    cursor: pointer;
    box-shadow: 7px 7px 28px #eaeaea;
    transform: translateY(-25px);
    transition: all 0.5s ease;
  }
  .brand_container .brand_item img {
    max-width: 100%;
    max-height: 100%;
    display: inline-block;
    vertical-align: middle;
  }
/*-------------品牌库页面 结束-------------*/
.preventive_box {
  width: 100%;
  height: 681px;
  margin: 0 auto;
  position: relative;
  text-align: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.active {
  background-color: #fff !important;
}
.preventive_container {
  width: 1200px;
  margin: 0 auto;
}
.preventive_item {
  width: 220px;
  height: 241px;
  border: 1px #efefef solid;
  float: left;
  padding: 5px 5px 0 5px;
  margin-right: 10px;
  margin-bottom: 17px;
  position: relative;
  background-color: #fff;
}
.preventive_item:nth-child(5n+0) {
  margin-right: 0px;
}
.preventive_item:hover {
  cursor: pointer;
  box-shadow: 7px 7px 28px #bcbcbc;
  transition: all 0.5s ease;
  background-color: #fff;
  border: 1px solid #fff;
}
.preventive_item:hover .item_des{
  color: #005aab;
  transition: all 0.5s ease;
}
.preventive_item .item_img_box .item_img {
  max-width: 100%;
  max-height: 100%;
}
.preventive_item .item_des:hover {
  color: #005aab;
  transition: all 0.5s ease;
}
.preventive_item .item_des{
  font-size: 14px;
  margin-top: 10px;
}
.item_price {
  font-size: 18px;
  color: #cb1700;
  position: absolute;
  bottom: 10px;
  right: 15px;
}
.item_img_box {
  width: 170px;
  height: 158px;
  margin: 0 auto;
  background: white;
}
.item_img {
  max-width: 100%;
  max-height: 100%;
  display: inline-block;
  vertical-align: middle;
}
.classifyName {
  width: 100px;
  margin: auto;
  position: absolute;
  color: #fff;
  top: 45px;
  left: 0px;
  right: 0px;
  transform: translateX(-19px);
}
.brand_img {
  margin-top: 20px;
  margin-bottom: 30px;
}
</style>
