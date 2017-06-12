<template>
  <div class="subOrder">
    <publicHeader></publicHeader>
    <div class="confirmAdd_box">
      <div class="title_box">
        <img class="confirmAdd_img" src="../../../images/gwc/subOrder.png" alt="img">
        <div class="line"></div>
      </div>
      <div class="address_box">
        <div class="address_title">
          <p class="left_word">收货信息</p>
          <p class="right_word">新增收货地址</p>
        </div>
        <div class="add_des_box">
          <div class="add_item" v-for="item in items" :key="item">
            <div class="clearfix"></div>
            <div class="first left">寄送至：</div>
            <div class="second left">
              <el-radio class="radio" v-model="radio" :label="item.num">{{item.add}}</el-radio>
            </div>
            <i class="el-icon-edit third"></i>
            <i class="el-icon-delete fouth"></i>
          </div>
          <div class="otherAdd">使用其它地址</div>
        </div>
      </div>
      <div class="list_box">
        <div class="list_title">商品清单</div>
        <div class="list_header">
          <div class="left message">商品信息</div>
          <div class="left price">单价（元）</div>
          <div class="left num">数量</div>
          <div class="left stotal">小计（元）</div>
        </div>
        <div class="list_des" v-for="cargo in cargos">
          <div class="left des_img">
            <img src="../../../images/center/order.png" alt="img">
          </div>
          <div class="left des_p">
            <p style="margin-bottom: 40px;">{{cargo.des}}</p>
            <p>{{cargo.color}}</p>
          </div>
          <div class="left des_price">¥{{cargo.price}}</div>
          <div class="left des_num">{{cargo.num}}</div>
          <div class="left des_stotal">¥{{cargo.price*cargo.num}}</div>
        </div>
      </div>
      <div class="qianbi_box">
        <div class="qianbi_title">钱币抵扣</div>
        <div class="qianbi_des">
          <el-checkbox v-model="checked1">使用钱币（1钱币=1元）</el-checkbox>
          <span style="margin-left: 50px;font-size:14px;">做多可使用<span style="color:#D81E06;">200</span>钱币</span>  
        </div>
      </div>
      <div class="qianbi_box">
        <div class="qianbi_title">发票</div>
        <div class="qianbi_des">
          <el-checkbox v-model="checked2">申请发票（发票5%）</el-checkbox>
        </div>
      </div>
      <div class="qianbi_box">
        <div class="qianbi_title">产品注册证</div>
        <div class="qianbi_des">
          <el-checkbox v-model="checked3">需要产品注册证号（纸质）</el-checkbox>
        </div>
      </div>
      <div class="leave_message">
        <div class="leave_title">订单留言</div>
        <input class="leave_word" type="text" placeholder="对本次交易的说明">
      </div>
      <div class="checked_box">
        <p><span>共5件商品</span><span>商品总额：¥245.00</span></p>
        <p>运费：¥8.00</p>
        <p>钱币抵扣：¥20.00</p>
        <p>合计：¥96.00</p>
        <p>本次可获得钱币：¥6.00</p>
        <p></p>
        <p></p>
      </div>
    </div>
    <publicFooter></publicFooter>
  </div>
</template>

<script>
  import publicHeader from '../index/publicHeader'
  import publicFooter from '../index/publicFooter'

  export default {
    name: 'subOrder',
    data () {
      return {
        items: [{
          add: '上海市 杨浦区 五角场镇 国定东路200号1号楼903室（王林娟 收）13122390809',
          num: '1'
        },{
          add: '上海市 杨浦区 五角场镇 国定东路200号1号楼903室（王林娟 收）13122390809',
          num: '2'
        },{
          add: '上海市 杨浦区 五角场镇 国定东路200号1号楼903室（王林娟 收）13122390809',
          num: '3'
        },{
          add: '上海市 杨浦区 五角场镇 国定东路200号1号楼903室（王林娟 收）13122390809',
          num: '4'
        },{
          add: '上海市 杨浦区 五角场镇 国定东路200号1号楼903室（王林娟 收）13122390809',
          num: '5'
        }],
        cargos: [{
          des: '爱丽丝 标准#',
          color: '红色厚',
          price: 134,
          num: 1,
        },{
          des: '爱丽丝 标准#',
          color: '红色厚',
          price: 134,
          num: 1,
        },{
          des: '爱丽丝 标准#',
          color: '红色厚',
          price: 134,
          num: 1,
        },{
          des: '爱丽丝 标准#',
          color: '红色厚',
          price: 134,
          num: 1,
        },{
          des: '爱丽丝 标准#',
          color: '红色厚',
          price: 134,
          num: 1,
        }],
        radio: '',
        checked1: false,
        checked2: false,
        checked3: false,
      }
    },
    components: {
      publicHeader,
      publicFooter,
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  border: 1px solid #e9e9e9;
  outline:medium;
  font-size: 15px;
  padding: 0 7px 0 7px;
}
input:focus {
  border: 1px solid #e9e9e9;
}
.left {
  float: left;
}
.confirmAdd_box {
  width: 1200px;
/*  background-color: #EECE7C;*/
  margin: 0 auto;
}
.title_box {
  text-align: center;
  margin-bottom: 30px;
}
.confirmAdd_img {
  width: 241px;
  height: 97px;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #5DB7E7;
  margin-top: 31px;
}
.address_box {
  width: 100%;
  border-bottom: 1px solid #E9E9E9;
  padding-bottom: 30px;
}
.address_title {
  width: 100%;
  height: 40px;
  position: relative;
  margin-bottom: 10px;
}
.left_word {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 14px;
  font-weight: bold;
  color: #000;
}
.right_word {
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 14px;
  color: #000;
}
.add_des_box {
  width: 100%;
}
.add_item {
  width: 1200px;
  height: 40px;
  line-height: 41px;
  position: relative;
  margin-bottom: 5px;
}
.add_item:hover {
  cursor: pointer;
  background-color: #5DB7E7;
  transition: all ease-out 0.3s;
  color: #fff;
}
.add_item:hover .el-radio{
  color: #fff !important;
  transition: all ease-out 0.3s;
}
.add_item:hover .first{
  opacity: 1;
}
.add_item:hover .third{
  opacity: 1;
}
.add_item:hover .fouth{
  opacity: 1;
}
.first {
  margin-left: 30px;
  margin-right: 77px;
  font-size: 14px;
  opacity: 0;
}
.second {
  font-size: 14px;
}
.third {
  position: absolute;
  top: 13px;
  right: 100px;
  opacity: 0;
}
.fouth {
  position: absolute;
  top: 13px;
  right: 20px;
  opacity: 0;
}
.el-icon-edit, .el-icon-delete {
  color: #fff;
}
.otherAdd {
  width: 160px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #E9E9E9;
  color: #010101;
  font-size: 14px;
  margin-left: 163px;
  margin-top: 40px;
}
.otherAdd:hover {
  cursor: pointer;
  opacity: 0.8;
}
.list_box {
  width: 1200px;
  margin-top: 23px;
  font-size: 14px;
  border-bottom: 1px solid #E9E9E9;
  padding-bottom: 20px;
  margin-bottom: 20px;
}
.list_title {
  font-weight: bold;
}
.list_header {
  width: 1200px;
  height: 40px;
  line-height: 40px;
  margin-top: 40px;
  background-color: #E9E9E9;
}
.message {
  margin-left: 160px;
}
.price {
  margin-left: 333px;
}
.num {
  margin-left: 200px;
}
.stotal {
  margin-left: 200px;
}
.list_des {
  width: 1160px;
  height: 63px;
  padding: 40px 20px 40px 20px;
/*  background-color: #A08F65;*/
}
.des_img {
  margin-right: 20px;
  border: 1px solid #D7D7D7;
}
.des_p {
  width: 420px;
} 
.des_price {
  width: 75px;
  text-align: center;
  margin-top: 26px;
  margin-right: 200px;
}
.des_num {
  width: 32px;
  margin-top: 26px;
  margin-right: 170px;
  text-align: center;
}
.des_stotal {
  width: 120px;
  margin-top: 26px;
  text-align: center;
  color: #D81E06;
}
.qianbi_box {
  width: 1200px;
  height: 80px;
  position: relative;
  margin-bottom: 50px;
}
.qianbi_title {
  font-weight: bold;
}
.qianbi_des {
  position: absolute;
  left: 150px;
  bottom: 0px;
}
.leave_message {
  width: 1200px;
  height: 80px;
  position: relative;
  border-bottom: 1px solid #E9E9E9;
  margin-bottom: 50px;
/*  background-color: #EECE7C;*/
  position: relative;
}
.leave_title {
  font-weight: bold;
  position: absolute;
  top: 8px;
}
.leave_word {
  width: 722px;
  height: 38px;
  position: absolute;
  top: 0px;
  left: 126px;
}
.checked_box {
  width: 512px;
  height: 378px;
  border: 1px solid #5DB7E7;
  background-color: #EECE7C;
}
</style>
