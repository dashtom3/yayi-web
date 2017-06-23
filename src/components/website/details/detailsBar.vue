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
        fenlei:[]
      }
    },
    created: function() {
      this.getNowGoodDetail();
    },
    methods: {
      getNowGoodDetail:function(){
        var that = this;
        var obj = {
          itemId:that.$route.params.goodId
        };
        that.global.axiosGetReq('/item/itemDetailDes',obj)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            console.log(res.data.data)
            var arr = [];
            arr[0] ="首页";
            arr[1] = res.data.data.oneClassify;
            arr[2] = res.data.data.twoClassify;
            arr[3] = res.data.data.threeClassify;
            arr[4] = res.data.data.itemName;
            this.fenlei = arr;
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
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
