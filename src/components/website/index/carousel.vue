<template>
  <div class="carousel">
    <div class="block">
      <el-carousel height="630px">
        <el-carousel-item>
          <img src="../../../images/index/banner.jpg" alt="img">    
        </el-carousel-item>
        <el-carousel-item>
          <img src="../../../images/index/banner.jpg" alt="img">    
        </el-carousel-item>
        <el-carousel-item>
          <img src="../../../images/index/banner.jpg" alt="img">    
        </el-carousel-item>
<!--         <el-carousel-item v-for="item in items" :key=item>
          <img :src=item.picture alt="img">
        </el-carousel-item> -->
      </el-carousel>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'carousel',
    data () {
      return {
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.block {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  text-align: center;
}
img {
  width: 100%;
  height: 100%;
}
</style>
