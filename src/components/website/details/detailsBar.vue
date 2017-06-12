<template>
  <div class="detailsBar">
    <span v-for="(one ,index) in fenlei">
      <span  :class="{goodName:has===index,goodName1:fenlei.length-1==index}" v-on:mouseenter="hover(index)" v-on:mouseleave="leave(index)">{{one}}</span><span v-if="index!=fenlei.length-1">></span>
    </span>
  </div>
</template>

<script>

  export default {
    name: 'detailsbar',
    data () {
      return {
        has:null,
        fenlei:["首页","预防护理","义齿用品","咬合纸","爱丽丝 标准直丝带环(4*1)"]
      }
    },
    mounted: function() {

    },
    methods: {
      hover:function(indexs){
        this.has = indexs;
      },
      leave:function(indexs){
        this.has = false;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.detailsBar{
	width: 1200px;
    height: 30px;
    margin: 0 auto;
    padding: 40px 0;
    border-top: 1px solid #e5e5e5;
    margin-top: 10px;
    padding-top: 60px;
}
.detailsBar .goodName{
  color: #5db7e8 !important;
  cursor: pointer;
}
.detailsBar .goodName1{
  color: #5db7e8 !important;
}
</style>
