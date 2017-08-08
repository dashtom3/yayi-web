<template>
  <div class="paging0" v-on:click="onClickChild()">
    <span class="pageRedue" v-on:click="prev()">上一页</span>
    <!-- <span class="indexPage" v-show="currentPage>0" v-on:click="goIndex()">首页</span> -->
    <!-- <span class="noBorder" v-show="showPageBegin>0">...</span> -->
    <span v-on:click="goToThisPage(index)" :class="{currentPageStyle:currentPage==index}" v-if="(index >= showPageBegin) && (index <= showPageEnd)" v-for="(item,index) in childmsg.totalPage">{{item}}</span>
    <!-- <span class="noBorder" v-show="childmsg.pageNum>showPageNum && currentPage<childmsg.pageNum-1">...</span> -->
    <span class="pageAdd"  v-on:click="next()">下一页</span>
    共{{childmsg.totalPage}}页，到第<input type="text" v-model="goToPage"><span class="sure" v-on:click="goToInputPage()">确定</span>
  </div>
</template>
<script>
  export default {
    name:"paging0",
    data() {
      return {
        goToPage:1,
        showPageNum:8,
        currentPage: 0,
        showPageBegin:0,
        showPageEnd:7
      };
    },
    props:["childmsg"],
    watch:{
      childmsg: {
        handler: function(){
          console.log(this.childmsg)
          if(this.childmsg.pageNum == 1){
            this.currentPage = 0;
            this.goIndex();
          }
        },
        deep: true
      },
      currentPage:function(){
        this.goToPage=this.currentPage+1;
      }
    },
    methods: {
      onClickChild:function(){
        this.$emit('childSay',this.currentPage+1);
      },
      prev:function(){
        if(this.currentPage==0){
          this.$alert("已经是第一页了！", {confirmButtonText: '确定'});
        }else{
          this.currentPage--;
          if(this.currentPage<4){
            this.showPageBegin = 0;
            this.showPageEnd = 7;
          }else{
            this.showPageEnd--;
            this.showPageBegin--;
          }
        }
      },
      next:function(){
        if(this.currentPage>=this.childmsg.totalPage-1){
          this.$alert("已经是最后一页了！", {confirmButtonText: '确定'});
        }else{
          this.currentPage++;
          if(this.currentPage<4){
            this.showPageEnd = 0;
            this.showPageBegin = 7;
          }else{
            this.showPageEnd++;
            this.showPageBegin++;
          }
        }
      },
      goToThisPage:function(index){
        this.currentPage = index;
      },
      goToInputPage:function(){
        var num = parseInt(this.goToPage);
        if(num>this.childmsg.totalPage){
          this.$alert("输入页码过大，请重新输入", {confirmButtonText: '确定'});
          this.currentPage = this.childmsg.pageNum-1;
        }else{
          if(num<8){
            this.showPageBegin=0;
            this.showPageEnd=7
            this.currentPage = num-1;
          }else{
            this.currentPage = num-1;
            this.showPageBegin=num-4;
            this.showPageEnd=num+3;
          }
        }
      },
      goIndex:function(){
        this.currentPage = 0;
        this.showPageEnd = 7;
        this.showPageBegin = 0;
      }
    }
  }
</script>
<style scoped>
.paging0 span{
  border: 1px solid #005aab;
  border-radius: 3px;
  height: 38px;
  width:38px;
  margin-left: 5px;
  display: inline-block;
  cursor: pointer;
  line-height: 40px;
  text-align: center;
}
.paging0 input{
  width: 38px;
  height: 38px;
  border: 1px solid #005aab;
  border-radius: 3px;
  position: relative;
  top: -2px;
  left: 10px;
  margin-right: 10px;
  text-align: center;
}
.paging0 input:focus{
  outline: none;

}
.paging0 .currentPageStyle{
  color: white;
  background: #005aab;
}
.paging0 .noBorder{
  border: none;
}
.paging0 .pageRedue{
  width: 100px;
}
.paging0 .pageAdd{
  width: 100px;
}
.paging0 .sure{
  width: 60px;
  height: 38px;
}
</style>
