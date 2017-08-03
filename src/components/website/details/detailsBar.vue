<template>
  <div class="detailsBar">
    <span v-for="(one ,index) in fenlei">
      <span :class="{goodName:has===index,goodName1:fenlei.length-1==index}" v-on:mouseenter="hover(index)" v-on:mouseleave="leave(index)" @click="goToThisPage(index,one)">{{one}}</span>
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
        index1:0,
        index2:0,
        index3:0,
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
            console.log(that.allClassfy,'allClassfy')
          } else {
            // that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      goToThisPage:function(index,one){
        var that = this;
        if(index==0){
          that.$router.push({path:"/index/"});
        }
        if(index==1){
          for(let i in that.allClassfy){
            if(that.fenlei[1]==that.allClassfy[i].oneClassify){
              this.index1 = i;
            }
          }
          var str = parseInt(this.index1)+1+"-0-0AND0";
          that.$router.push({path:"/brandLib/"+str,});
        }
        if(index==2){
          for(let i in that.allClassfy){
            if(that.fenlei[1]==that.allClassfy[i].oneClassify){
              this.index1 = i;
            }
          }
          var towList = that.allClassfy[this.index1].classifyTwoList;
          for(let t in towList){
            if(that.fenlei[2]==towList[t].classifyTwoName){
              that.index2 = t;
            }
          }
          var dfaf = parseInt(this.index2)+1;
          var str = parseInt(this.index1)+1+"-"+dfaf+"-0AND0";
          that.$router.push({path:"/brandLib/"+str,});
        }
        if(index==3){
          for(let i in that.allClassfy){
            if(that.fenlei[1]==that.allClassfy[i].oneClassify){
              this.index1 = i;
            }
          }
          var towList = that.allClassfy[this.index1].classifyTwoList;
          for(let t in towList){
            if(that.fenlei[2]==towList[t].classifyTwoName){
              that.index2 = t;
            }
          }
          var threeList = towList[that.index2].classifyThreeList;
          for(let th in threeList){
            if(that.fenlei[3]==threeList[th].classifyThreeName){
              that.index3 = th;
              console.log(th)
            }
          }
          var str = (parseInt(this.index1)+1)+"-"+(parseInt(this.index2)+1)+"-"+(parseInt(this.index3)+1);
          that.$router.push({path:"/brandLib/"+str,});
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
            // that.$message.error('网络出错，请稍后再试！');
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
    /*height: 30px;*/
    margin: 0 auto;
    /*padding: 40px 0;*/
    border-top: 1px solid #e5e5e5;
    /*margin-top: 10px;*/
    /*padding-top: 60px;*/
    padding: 20px 0;
}
.detailsBar .goodName{
  color: #5db7e8 !important;
  cursor: pointer;
}
.detailsBar .goodName1{
  color: #5db7e8 !important;
}
</style>
