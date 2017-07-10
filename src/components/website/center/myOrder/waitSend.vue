<template>
  <div class="waitSend">
    <div class="order_table">
      <div class="left cargo">商品</div>
      <div class="left price">单价（元）</div>
      <div class="left num">数量</div>
      <div class="left cargo_operate">商品操作</div>
      <div class="left now_pay">实付款（元）</div>
      <div class="left deal_state">交易状态</div>
      <div class="left deal_operate">交易操作</div>
    </div>
    <!--  暂无订单开始 -->
    <div class="no_order" v-show="no_order">
      <div style="margin-top:67px; margin-bottom:40px;"><img src="../../../../images/center/noOrder.png" alt="img"></div>
      <div><img src="../../../../images/center/noOrderWord.png" alt="img"></div>
    </div>
    <!--  暂无订单结束 -->
    <div class="order_item" v-for="item in items" :key="item" v-show="order_list">
      <div class="order_title">
        <span class="order_date">{{item.date}}</span>
        <span class="order_num">订单号: {{item.orderId}}</span>
      </div>
      <!--  订单详情item 开始 -->
      <div class="order_des" v-for="cargo in item.orderitemList" :key="cargo">
        <div class="left des_img" style="width:81px;height:85px;">
          <img :src="cargo.picPath" alt="img">
        </div>
        <div class="left des_p">
          <p style="margin-bottom: 20px;">{{cargo.itemInfo.itemName}}</p>
          <p>{{cargo.itemPropertyNamea}}{{cargo.itemPropertyNameb}}{{cargo.itemPropertyNamec}}</p>
        </div>
        <div class="left des_price">￥{{cargo.price}}</div>
        <div class="left des_num">{{cargo.num}}</div>
        <div class="left des_state">￥{{cargo.price*cargo.num}}</div>
      </div>
      <!--  订单详情item 结束 -->
      <div class="order_des_right">
        <div class="left now_pay_des">
          <p class="spe_p">￥{{item.actualPay}}</p>
          <p>（含运费：￥{{item.qbDed}}）</p>
          <p>（乾币已抵扣：￥{{item.yunfei}}）</p>
        </div>
        <div class="left wait_pay_des">{{item.state | frisco}}</div>
        <p class="payBtn" @click="lookOrderDetails(item)">订单详情</p>
        <div class="left operate_des" v-if="item.state!==0">
          <!-- <p class="payBtn" @click="operate(item)">{{item.state | operate}}</p> -->
          <p class="cancelBtn" @click="cancel_order(item)">取消订单</p>
        </div>
      </div>
    </div>
<!--     <paging0></paging0> -->
<el-dialog title="订单详情" :visible.sync="dialogVisibleToOrderDetails" size="tiny" custom-class="orderDetails" >
  <div class="">
    <p>收货信息：</p>
    <p>收货信息：</p>
  </div>
  <div class="">
    <p>订单信息：</p>
    <p>订单编号：<span>{{nowOrderDetails.orderId}}</span>
    <span style="float:right">创建时间：{{nowOrderDetails.created}}</span></p>
    <div class="">
      <div class="order_table" style="width:100%" >
        <div style="width:150px;" class="left cargo">商品</div>
        <div class="left price">单价（元）</div>
        <div class="left num">数量</div>
        <div class="left now_pay">实付款（元）</div>
        <div class="left deal_state">交易状态</div>
      </div>
      <div style="width:100%" class="order_item" v-if="nowOrderDetails.orderitemList">
        <!--  订单详情item 开始 -->
        <div class="order_des" style="border:none;" v-for="cargo in nowOrderDetails.orderitemList" :key="cargo">
          <div class="left des_img" style="width:81px;height:85px;">
            <img :src="cargo.picPath" alt="img">
          </div>
          <div style="width:220px;" class="left des_p">
            <p style="margin-bottom: 20px;">{{cargo.itemInfo.itemName}}</p>
            <p>{{cargo.itemPropertyNamea}}{{cargo.itemPropertyNameb}}{{cargo.itemPropertyNamec}}</p>
          </div>
          <div style="width:83px;" class="left des_price">￥{{cargo.price}}</div>
          <div class="left des_num">{{cargo.num}}</div>
        </div>
        <!--  订单详情item 结束 -->
        <div class="order_des_right" style="width:auto;right:25px;top:0">
          <div class="left now_pay_des" style="margin-top:0">
            <p class="spe_p">￥{{nowOrderDetails.actualPay}}</p>
            <p>（含运费：￥{{nowOrderDetails.qbDed}}）</p>
            <p>（乾币已抵扣：￥{{nowOrderDetails.yunfei}}）</p>
          </div>
          <div class="left wait_pay_des">{{nowOrderDetails.state | frisco}}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="" v-if="nowOrderDetails.buyerMessage">
    <p>订单留言：</p>
    <p>订单留言：</p>
  </div>
  <div class="">
    <p>本单赠送乾币：<span style="color:#d8qe06;font-weight:600">{{nowOrderDetails.giveQb}}</span></p>
  </div>
</el-dialog>
  </div>
</template>

<script>
  import paging0 from '../../brandLib/paging0'
  export default {
    name: 'waitSend',
    data () {
      return {
        dialogVisibleToOrderDetails:false,
        nowOrderDetails:{},
        items: [],
        no_find: '暂无订单～',
        operate_state: '付款',
        order_list: true,
        no_order: false,
      }
    },
    components: {
      paging0,
    },
    created:function(){
      var that = this;
      that.getAllOrder();
    },
    methods: {
      getAllOrder: function() {
        var that = this;
        var obj = {
          token:that.global.getToken(),
        };
        that.global.axiosPostReq('/OrderDetails/show',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            var b = res.data.data.filter(function(ele,index,arr) {
                return ele.state == "2";
            });
            console.log(b,"getAllOrder_waitSend");
            that.items = b;
            if(that.items.length==0){
              that.no_order = true;
            }
          } else {
            that.$message.error('网络错误！');
          }
        })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .left {
    float: left;
  }
  .search_box {
    width: 300px;
    height: 40px;
    margin-top: 30px;
    position: relative;
  }
  .search_word {
    width: 300px;
    height: 40px;
    padding-left: 10px;
    font-size: 14px;
    border: 1px solid #5DB7E8;
    outline: medium;
  }
  .search_word:focus {
    border: 1px solid #5DB7E7 !important;
/*    transition: all linear 0.2s;*/
  }
  .search_img {
    position: absolute;
    top: 9px;
    right: 2px;
  }
  .order_table {
    width: 1069px;
    height: 40px;
    margin-top: 30px;
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: bold;
    color: #000;
    background-color: #F8F8F8;
  }
  .cargo {
    width: 200px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    margin-right: 180px;
  }
  .price {
    width: 98px;
    height: 40px;
    text-align: center;
    line-height: 40px;
  }
  .num {
    width: 80px;
    height: 40px;
    text-align: center;
    line-height: 40px;
  }
  .cargo_operate {
    width: 110px;
    height: 40px;
    text-align: center;
    line-height: 40px;
  }
  .now_pay {
    width: 183px;
    height: 40px;
    text-align: center;
    line-height: 40px;
  }
  .deal_state {
    width: 108px;
    height: 40px;
    text-align: center;
    line-height: 40px;
  }
  .deal_operate {
    width: 109px;
    height: 40px;
    text-align: center;
    line-height: 40px;
  }
  .order_item {
    width: 1067px;
    font-size: 14px;
    border: 1px solid #D7D7D7;
    position: relative;
    margin-bottom: 40px;
  }
  .order_title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #000;
    background-color: #F8F8F8;
  }
  .order_date {
    margin-left: 43px;
    margin-right: 43px;
  }
  .order_des {
    width: 633px;
    height: 82px;
    padding: 30px 20px 30px 20px;
    border-right: 1px solid #D7D7D7;
    border-top: 1px solid #D7D7D7;
    background-color: #fff;
  }
  .order_des:nth-child(2) {
    border-top: none !important;
  }
  .des_img {
    margin-right: 20px;
    border: 1px solid #D7D7D7;
  }
  .des_p {
    width: 270px;
  }
  .des_price {
    width: 100px;
    margin-top: 26px;
    margin-left: 10px;
  }
  .des_num {
    width: 70px;
    margin-top: 26px;
    margin-left: 10px;
  }
  .des_state {
    width: 70px;
    margin-top: 26px;
  }
  .order_des_right {
    position: absolute;
    top: 40px;
    right: 0px;
    width: 393px;
    background-color: #fff;
  }
  .now_pay_des {
    width: 180px;
    text-align: center;
    margin-top: 30px;
  }
  .now_pay_des p {
    margin-bottom: 5px;
    color: #999999;
    font-size: 14px;
  }
  .spe_p {
    color: #D81E06 !important;
  }
  .wait_pay_des {
    width: 100px;
    margin-top: 53px;
    margin-left: 10px;
    text-align: center;
  }
  .operate_des {
    width: 103px;
    text-align: center;
  }
  .payBtn {
    width: 70px;
    height: 28px;
    margin: 0 auto;
    /*margin-top: 36px;*/
    margin-bottom: 5px;
    line-height: 28px;
    background-color: #5DB7E7;
    color: #fff;
    border-radius: 5px;
  }
  .payBtn:hover {
    cursor: pointer;
    background-color: #5ed6dc;
    transition: all ease 0.2s;
  }
  .cancelBtn {
    font-size: 14px;
    color: #999999;
  }
  .cancelBtn:hover {
    cursor: pointer;
    color: #D81E06;
    transition: all ease 0.2s;
  }
/* 暂无订单,没有符合条件的订单*/
  .no_order {
    width: 1067px;
    height: 180px;
    text-align: center;
    font-size: 20px;
    color: #000;
/*    border-left: 1px solid #D7D7D7;
    border-right: 1px solid #D7D7D7;
    border-bottom: 1px solid #D7D7D7;*/
  }
</style>
