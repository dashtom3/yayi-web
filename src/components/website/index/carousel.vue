<template>
  <div class="carousel">
    <div class="block">
      <el-carousel height="630px">
        <el-carousel-item v-for="(item, index) in bannerList" :key="item">
          <img :src="item.advImg" alt="banner" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
  import global from '../../global/global'
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
        global.axiosGetReq('/adv/showAdv',{}).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            this.bannerList = res.data.data.splice(1)
          }else{
            this.$message.error('获取广告数据失败！');
          }
        })
      }
    }
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
