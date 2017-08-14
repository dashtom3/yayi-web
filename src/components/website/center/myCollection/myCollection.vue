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
              <img :src="good.item_pica+'?imageView2/1/w/140/h/140'" >
              <span></span>
            </div>
            <p v-if="good.item_name.length < 9" class="title">
              {{good.item_name}}
            </p>
            <p v-else class="title2">
              {{good.item_name}}
            </p>
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
        that.global.axiosPostReq('/mystar/shows', obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            this.allGoods = res.data.data;
          } else {
            // that.$message.error('网络出错，请稍后再试！');
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
        that.$confirm('确定取消收藏该商品吗？', '取消收藏商品', {
          confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'
        }).then(() => {
          that.global.axiosPostReq('/mystar/deleteOne', obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              that.$alert('取消收藏成功！', {confirmButtonText: '确定',});
              that.allGoods.splice(index,1);
            }
          })
        }).catch(() => {
          
        });
      },
      clearAllCollection:function(){
        var that = this;
        var obj = {
          phone:that.global.getUser().phone,
          token:that.global.getToken()
        };
        that.$confirm('此操作将移除所有收藏商品，是否继续?', '清除收藏商品', {
          confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'
        }).then(() => {
          that.global.axiosPostReq('/mystar/deleteAll', obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              this.$alert('删除全部收藏成功！', {confirmButtonText: '确定',});
              that.allGoods = [];
            }
          })
        }).catch(() => {
          
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
    color:  #cb1700;
  }
  .myCollection .colorBlue{
    color:  #005aab;
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
    color: #005aab;
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
    border: 1px solid #efefef;
    margin-right: 19px;
    margin-bottom: 19px;
    display: inline-block;
    position: relative;
    float: left;
  }
  .goodDetail li:hover{
    box-shadow: 7px 7px 28px #bcbcbc;
    transition: all 0.5s ease;
    border-color:white;
    cursor: pointer;
  }
  .goodDetail .gold{
    position: absolute;
    top: 0;
    right: 0;
    z-index: 999;
  }
  .goodDetail .title {
    height: 20px;
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis; 
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
  .title2 {
    max-width:160px;
    height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-left: 8px;
    padding-right: 10px;
  }
  .title2:after {
    content: "...";
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
  .goodDetail li:hover .title{
    color: #005aab;
  }
  .goodDetail li:hover .title2{
    color: #005aab;
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
