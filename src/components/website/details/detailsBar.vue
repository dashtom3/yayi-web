<template>
  <div class="detailsBar">
    <span v-for="(one ,index) in fenlei">
      <span :class="{goodName:has===index,goodName1:fenlei.length-1==index}" v-on:mouseenter="hover(index)" v-on:mouseleave="leave(index)" @click="goToThisPage(index)">{{one}}</span>
      <span v-if="index!=fenlei.length-1">></span>
    </span>
  </div>
</template>

<script>

  export default {
    name: 'detailsbar',
    data () {
      return {
        has:null,
        fenlei:[],
        Classify:[],
        allClassfy:[],
      }
    },
    created: function() {
      this.getNowGoodDetail();
      this.getClassfy();
    },
    methods: {
      getClassfy:function(){
        var that = this;
        that.global.axiosGetReq('/item/showClassify')
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.allClassfy = res.data.data;
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      goToThisPage:function(index){
        console.log(that.allClassfy)
        var that = this;
        if(index==0){
          that.$router.push({path:"/index/"});
        }
        if(index==1){

        }
      },
      getNowGoodDetail:function(){
        var that = this;
        var obj = {
          itemId:that.$route.params.goodId,
          token:"'"+that.global.getToken()+"'"
        };
        that.global.axiosPostReq('/item/itemDetailDes',obj)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            var arr = [];
            arr[0] ="首页";
            arr[1] = res.data.data.oneClassify;
            arr[2] = res.data.data.twoClassify;
            arr[3] = res.data.data.threeClassify;
            arr[4] = res.data.data.itemName;
            this.fenlei = arr;
            this.Classify = res.data.data;
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
