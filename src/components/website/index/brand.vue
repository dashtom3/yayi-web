<template>
  <div class="brand">
    <div class="brand_box">
      <img class="brand_img" src="../../../images/index/brand.png" alt="img">
      <div class="prev" @click="prev()">
        <img src="../../../images/index/prev.png" alt="img">
      </div>
      <div class="next" @click="next()">
        <img src="../../../images/index/next.png" alt="img">
      </div>
      <el-carousel :autoplay="true" :interval="5000" height="500px" trigger="click" arrow="never" indicator-position="none" ref="carousel">
        <el-carousel-item>
          <div class="brand_container">
            <div class="brand_item" style="margin-left: 0px;">
              <img src="../../../images/index/item1.png" alt="img">
            </div>
            <div class="brand_item">
              <img src="../../../images/index/item2.png" alt="img">
            </div>
            <div class="brand_item">
              <img src="../../../images/index/item3.png" alt="img">
            </div>
            <div class="brand_item">
              <img src="../../../images/index/item4.png" alt="img">
            </div>
            <div class="brand_item" style="margin-left: 0px;">
              <img src="../../../images/index/item1.png" alt="img">
            </div>
            <div class="brand_item">
              <img src="../../../images/index/item2.png" alt="img">
            </div>
            <div class="brand_item">
              <img src="../../../images/index/item3.png" alt="img">
            </div>
            <div class="brand_item">
              <img src="../../../images/index/item4.png" alt="img">
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'brand',
    data () {
      return {
      }
    },
    methods: {
      prev() {
        var that = this;
        that.$refs.carousel.prev();
      },
      next() {
        var that = this;
        this.$refs.carousel.next();
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .brand_box {
    width: 1200px;
    height: 758px;
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
</style>
