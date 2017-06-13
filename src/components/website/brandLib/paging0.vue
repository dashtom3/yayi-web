<template>
  <div class="paging0">
    <span class="pageRedue" v-on:click="prev()">上一页</span>
    <span calss="indexPage" v-show="currentPage>0" v-on:click="goIndex()">首页</span>
    <span class="noBorder" v-show="showPageBegin>0">...</span>
    <span v-on:click="goToThisPage(index)" :class="{currentPageStyle:currentPage==index}" v-show="index >= showPageBegin && index <= showPageEnd" v-for="(item,index) in pageNum">{{item}}</span>
    <span class="noBorder" v-show="pageNum>showPageNum && currentPage<pageNum-1">...</span>
    <span class="pageAdd"  v-on:click="next()">下一页</span>
    共{{pageNum}}页，到第<input type="text" v-model="goToPage"><span class="sure" v-on:click="goToInputPage()">确定</span>
  </div>
</template>
<script>
  export default {
    name:"paging0",
    data() {
      return {
        pageNum:100,
        goToPage:1,
        showPageNum:8,
        currentPage: 0,
        showPageBegin:0,
        showPageEnd:7
      };
    },
    watch:{
      currentPage:function(){
        this.goToPage=this.currentPage+1;
      }
    },
    methods: {
      prev:function(){
        if(this.currentPage==0){
          this.$alert("已经是第一页了！", {confirmButtonText: '确定'});
        }else{
          this.currentPage--;
          if(this.showPageEnd<8){

          }else{
            this.showPageEnd--;
          }
          this.showPageBegin--;
        }
      },
      next:function(){
        if(this.currentPage>=this.pageNum){
          this.$alert("已经是最后一页了！", {confirmButtonText: '确定'});
        }else{
          this.currentPage++;
          this.showPageEnd++;
          this.showPageBegin++;
        }

      },
      goToThisPage:function(index){
        this.currentPage = index;
      },
      goToInputPage:function(){
        var num = this.goToPage;
        if(this.goToPage<8){
          this.showPageBegin=0;
          this.showPageEnd=7
        }else if(this.goToPage>this.pageNum){
          this.$alert("输入页码过大，请重新输入", {confirmButtonText: '确定'});
        }else{
          this.showPageEnd = this.goToPage;
          this.showPageBegin = this.showPageEnd - 8;
        }
        this.currentPage = num-1;
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
  border: 1px solid #5db7e8;
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
  border: 1px solid #5db7e8;
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
  background: #5db7e8;
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
