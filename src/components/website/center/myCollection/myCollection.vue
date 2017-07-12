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
      <div v-else class="goodDetail">
        <ul>
          <li v-for="(good,index) in allGoods" v-on:click="goToThisDetail(good.itemId)">
            <i class="el-icon-delete2 myDele" v-on:click.stop="deleOneCollect(index,good)"></i>
            <img class="gold" v-if="good.ifGold" src="../../../../images/center/glod.png" alt="">
            <div class="imgwrap">
              <img :src="good.item_pica" >
              <span></span>
            </div>
            <div class="title">
              {{good.item_name}}
            </div>
            <div class="goodFooter">
              <span class="colorRed">￥{{good.item_price}}</span>
              <!-- <img src="../../../../images/center/gwc.png" alt=""> -->
            </div>
          </li>
          <div style="clear:both"></div>
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
        allGoods:[],
      }
    },
    created:function(){
      this.getMyCollection();
    },
    methods: {
      goToThisDetail:function(id){
        this.$router.push({
          path:"/details/"+id,
        });
      },
      getMyCollection:function(){
        var that = this;
        var obj = {
          phone:that.global.getUser().phone,
          token:that.global.getToken()
        };
        console.log(obj)
        that.global.axiosPostReq('/mystar/shows', obj).then((res) => {
          console.log(res,"getMyCollection")
          if (res.data.callStatus === 'SUCCEED') {
            this.allGoods = res.data.data;
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      deleOneCollect:function(index,good){
        var that = this;
        var obj = {
          itemId:good.itemId,
          phone:that.global.getUser().phone,
          token:that.global.getToken()
        };
        that.global.axiosPostReq('/mystar/deleteOne', obj).then((res) => {
          console.log(res,"asdfafsf")
          if (res.data.callStatus === 'SUCCEED') {
            that.$alert('删除收藏成功！', {confirmButtonText: '确定',});
            that.allGoods.splice(index,1);
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      clearAllCollection:function(){
        var that = this;
        var obj = {
          phone:that.global.getUser().phone,
          token:that.global.getToken()
        };
        that.$confirm('此操作将移除所有收藏商品, 是否继续?', '清除收藏商品', {
          confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'
        }).then(() => {
          that.global.axiosPostReq('/mystar/deleteAll', obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              this.$alert('删除全部收藏成功！', {confirmButtonText: '确定',});
              that.allGoods = [];
            } else {
              that.$message.error('网络出错，请稍后再试！');
            }
          })
        }).catch(() => {
          that.$message({type: 'info',message: '已取消'});
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
.myCollection .myDele{
  display: none;
  position: absolute;
  top: 5px;
  left: 5px;
}
.myCollection .myDele:hover{
  color: #5DB7E7;
}
.myCollection li:hover .myDele{
  cursor: pointer;
  display: block;
}
.head .clearAll{
  float: right;
  cursor: pointer;
}
.goodDetail{
  margin-left: 38px;
  margin-top: 29px;
  min-height: 590px;
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
width: 140px;
height: 140px;
text-align: center;
margin: auto;
margin-top: 4px;
}
.imgwrap img:hover{

box-shadow: 7px 7px 28px #bcbcbc;
transition: all 0.5s ease;
cursor: pointer;
}
.goodDetail .imgwrap img{
max-width: 100%;
max-height: 100%;
display: inline-block;
vertical-align: middle;
/*margin-left: 5px;*/
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
.goodDetail .title:hover{
  color: #5db7e8;
  cursor: pointer;
}
.goodDetail .goodFooter{
margin-top: 18px;
padding-left: 8px;
padding-right: 10px;
}
.goodDetail .goodFooter img{
  float: right;
  cursor: pointer;
}

.nogood{
  margin: 128px 0 138px 496px;
}























































</style>
