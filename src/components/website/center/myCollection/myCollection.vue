<template>
  <div class="myCollection">

    <div>
      <div class="head">
        全部商品(<span class="colorRed">{{allGoods.length}}</span>)
        <span v-if="allGoods.length>0" class="colorBlue clearAll" v-on:click="clearAllCollection()">
          <img src="../../../../images/center/clear.png" alt="">
          全部清空
        </span>
      </div>
      <div v-if="allGoods.length<=0" class="nogood">
        <img src="../../../../images/center/nogoods.png" alt="">
      </div>
      <div  v-else class="goodDetail">
        <ul>
          <li v-for="(good,index) in allGoods">
            <img class="gold" v-if="good.ifGold" src="../../../../images/center/glod.png" alt="">
            <div class="imgwrap">
              <img src="../../../../images/center/goods.png" alt="">
              <span></span>
            </div>
            <div class="title">
              {{good.goodTitle}}
            </div>
            <div class="goodFooter">
              <span class="colorRed">￥{{good.goodPrice}}</span>
              <img src="../../../../images/center/gwc.png" alt="">
            </div>
          </li>
          <div style="clear:both">

          </div>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'myCollection',
    data () {
      return {
        allGoods:[
          {goodImg:"../../../../images/center/goods.png",goodTitle:"商品111111111111113333333333333333333111111111商品111111111111113333333333333333333111111111",goodPrice:23,ifGold:false},
          {goodImg:"./img/4.png",goodTitle:"商品111111111111",goodPrice:23,ifGold:false},
          {goodImg:"./img/4.png",goodTitle:"商品11111111111111111111111",goodPrice:23,ifGold:true},
          {goodImg:"./img/4.png",goodTitle:"商品11111111111111111111111",goodPrice:23,ifGold:false},
          {goodImg:"./img/4.png",goodTitle:"商品11111111111111111111111",goodPrice:23,ifGold:true},
          {goodImg:"./img/4.png",goodTitle:"商品11111111111111111111111",goodPrice:23,ifGold:false},
          {goodImg:"./img/4.png",goodTitle:"商品11111111111111111111111",goodPrice:23,ifGold:true},
          {goodImg:"./img/4.png",goodTitle:"商品11111111111111111111111",goodPrice:23,ifGold:false},
          {goodImg:"./img/4.png",goodTitle:"商品11111111111111111111111",goodPrice:23,ifGold:true},
          {goodImg:"./img/4.png",goodTitle:"商品11111111111111111111111",goodPrice:23,ifGold:false},
          {goodImg:"./img/4.png",goodTitle:"商品11111111111111111111111",goodPrice:23,ifGold:true},
          {goodImg:"./img/4.png",goodTitle:"商品11111111111111111111111",goodPrice:23,ifGold:false},
          {goodImg:"./img/4.png",goodTitle:"商品11111111111111111111111",goodPrice:23,ifGold:true},
          {goodImg:"./img/4.png",goodTitle:"商品11111111111111111111111",goodPrice:23,ifGold:false},
          {goodImg:"./img/4.png",goodTitle:"商品11111111111111111111111",goodPrice:23,ifGold:true},
          {goodImg:"./img/4.png",goodTitle:"商品11111111111111111111111",goodPrice:23,ifGold:false}
        ]
      }
    },

    methods: {
      clearAllCollection:function(){
        this.$confirm('此操作将移除所有收藏商品, 是否继续?', '清除收藏商品', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: "清除成功！"
          });
          this.allGoods = [];
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.myCollection{
  font-size: 14px;
  min-height: 440px;
}
.myCollection .colorRed{
color:  #D81E06;
}
.myCollection .colorBlue{
color:  #5db7e8;
}
.head{
  padding-left: 38px;
    line-height: 40px;
  border-bottom: 1px solid #eeeeee;
}

.head .clearAll{
  float: right;
  cursor: pointer;
}
.goodDetail{
  margin-left: 38px;
  margin-top: 29px;
  margin-bottom: 30px;
}
.goodDetail li{
  width: 148px;
  height: 208px;
  border: 1px solid #eeeeee;
  margin-right: 19px;
  margin-bottom: 19px;
  display: inline-block;
  position: relative;
  float: left;
}
.goodDetail .gold{
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
}
.goodDetail .title{
  word-break: break-all;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 1;
overflow: hidden;
}
.goodDetail .imgwrap{
width: 148px;
height: 148px;
text-align: center;
}
.goodDetail .imgwrap img{
max-width: 100%;
max-height: 100%;
display: inline-block;
vertical-align: middle;
}
.goodDetail .imgwrap span{
height: 100%;
display: inline-block;
vertical-align: middle;
}
.goodDetail .title{
  padding-left: 8px;
  padding-right: 10px;
}
.goodDetail .goodFooter{
margin-top: 18px;
padding-left: 8px;
padding-right: 10px;
}
.goodDetail .goodFooter img{
  float: right;
}

.nogood{
  margin: 128px 0 138px 496px;
}























































</style>
