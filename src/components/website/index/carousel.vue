<template>
  <div class="carousel" style="min-width:1200px;">
    <div class="block">
      <el-carousel height="450px">
        <el-carousel-item v-for="(item, index) in bannerList" :key="item.advImg">
          <div class="bgImage" :style="{backgroundImage: 'url('+item.advImg+')'}" ></div>
          <!-- <img :src="item.advImg" alt="banner" /> -->
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'carousel',
    data () {
      return {
        bannerList: []
      }
    },
    created(){
      this.init()
    },
    methods: {
      init(){
        var that = this;
        that.global.axiosGetReq('/adv/showAdv',{}).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.bannerList = res.data.data && res.data.data.splice(1, 4)
          }
        })
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.block {
  max-width: 1920px;
  max-height: 450px;
  margin: 0 auto;
  text-align: center;
}
/*img {
  width: 1920px;
  max-width: 1920px; 
  vertical-align: middle;
  height: auto;
  display: block;
}*/
.bgImage {
  min-width: 1200px;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
