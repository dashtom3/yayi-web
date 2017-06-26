<template>
  <div class="medical">
    <div class="preventive_box">
      <div class="img_box_change" @mouseover="img_in" @mouseout="img_out">
        <img class="brand_img" v-if="img_change" src="../../../images/index/apparatus.png" alt="img">
        <img class="brand_img" v-else src="../../../images/index/apparatus_c.png" alt="img">
      </div>
      <div class="preventive_container">
        <div class="preventive_item" v-for="item in items" :key="item">
          <img class="item_img" src="" alt="img">
          <p class="item_des">{{item.des}}</p>
          <p class="item_price">￥{{item.price}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'medical',
  data () {
    return {
      img_change: true,
      items: [{
        des: '商品描述商品描述商品描述商品描述商品描述商品描述',
        price: '24',
      },{
        des: '商品描述商品描述商品描述商品描述商品描述商品描述',
        price: '24',
      },{
        des: '商品描述商品描述商品描述商品描述商品描述商品描述',
        price: '24',
      },{
        des: '商品描述商品描述商品描述商品描述商品描述商品描述',
        price: '24',
      },{
        des: '商品描述商品描述商品描述商品描述商品描述商品描述',
        price: '24',
      },{
        des: '商品描述商品描述商品描述商品描述商品描述商品描述',
        price: '24',
      },{
        des: '商品描述商品描述商品描述商品描述商品描述商品描述',
        price: '24',
      },{
        des: '商品描述商品描述商品描述商品描述商品描述商品描述',
        price: '24',
      }],
    }
  },
  methods: {
    img_in() {
      var that = this;
      that.img_change = false;
    },
    img_out() {
      var that = this;
      that.img_change = true;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.preventive_box {
  width: 100%;
  height: 800px;
  margin: 0 auto;
  position: relative;
  text-align: center;
  background-color: #F2F2F2;
}
.brand_img {
  margin-top: 20px;
  margin-bottom: 30px;
}
.preventive_container {
  width: 1200px;
/*  height: 1000px;*/
  margin: 0 auto;
/*  background-color: #EECE7C;*/
}
.preventive_item {
  width: 275px;
  height: 295px;
  border: 1px #bcbcbc solid;
  float: left;
  padding: 5px 5px 0 5px;
  margin-right: 17px;
  margin-bottom: 17px;
}
.preventive_item:nth-child(4n+0) {
  margin-right: 0px;
}
.preventive_item:hover {
  cursor: pointer;
}
.preventive_item img:hover {
  box-shadow: 7px 7px 28px #bcbcbc;
  transition: all 0.5s ease;
}
.preventive_item .item_des:hover {
  color: #5DB7E7;
  transition: all 0.5s ease;
}
.preventive_item .item_des{
  font-size: 14px;
  color: #000;
  margin-top: 10px;
  text-align: left;
}
.item_price {
  font-size: 18px;
  color: #D81E06;
  text-align: right;
  margin-right: 15px;
  margin-top: 10px
}
.item_img {
  width: 263px;
  height: 200px;
  background-color: #bcbcbc;
}
</style>
