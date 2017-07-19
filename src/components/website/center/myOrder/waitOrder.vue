<template>
  <div class="waitOrder">
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
        <span class="order_date">{{item.created}}</span>
        <span class="order_num">订单号: {{item.orderId}}</span>
        <span class="orderDetailsBtn"  @click="lookOrderDetails(item)">订单详情</span>
      </div>
      <!--  订单详情item 开始 -->
      <div class="order_des" v-for="cargo in item.orderitemList" :key="cargo">
        <div class="left des_img" style="width:81px;height:85px;">
          <img :src="cargo.picPath" alt="img">
        </div>
        <div class="left des_p">
          <p style="margin-bottom: 20px;">{{cargo.itemInfo.itemName}}</p>
          <p>{{cargo.itemPropertyNamea}}&nbsp;{{cargo.itemPropertyNameb}}&nbsp;{{cargo.itemPropertyNamec}}</p>
        </div>
        <div class="left des_price">￥{{cargo.price}}</div>
        <div class="left des_num">{{cargo.num}}</div>
        <div class="left des_state">￥{{cargo.price*cargo.num}}</div>
      </div>
      <!--  订单详情item 结束 -->
      <div class="order_des_right" :style="{marginTop:item.btnsMarginTop}" >
        <div class="left now_pay_des">
          <p class="spe_p">￥{{item.actualPay}}</p>
          <p>（含运费：￥{{item.postFee}}）</p>
          <p>（乾币已抵扣：￥{{item.qbDed}}）</p>
        </div>
        <div class="left wait_pay_des">{{item.state | frisco}}</div>
        <div  class="left operate_des" v-if="item.state!==0">
          <p class="payBtn" v-if="item.state==3" @click="haveALookAtWuLiu(item)">查看物流</p>
          <p class="payBtn" v-if="item.state!=2" @click="operate(item)">{{item.state | operate}}</p>
          <p class="cancelBtn" style="margin-top:0;font-size:12px;" @click="cancel_order(item)">取消订单</p>
        </div>
      </div>
    </div>
    <div v-if="pageProps">
      <paging v-if="pageProps.totalNumber>pageProps.numberPerPage" :childmsg="pageProps" style="text-align:center;margin-top:20px;" @childSay="pageHandler"></paging>
    </div>
    <el-dialog title="订单详情" :visible.sync="dialogVisibleToOrderDetails" size="tiny" custom-class="orderDetails" >
      <div v-if="nowOrderDetails.receiver">
        <p>收货信息：</p>
        <p>
          <span>{{nowOrderDetails.receiver.receiverName}}&nbsp;</span>
          <span>{{nowOrderDetails.receiver.phone}}&nbsp;</span>
          <span>{{nowOrderDetails.receiver.province}}</span>
          <span>{{nowOrderDetails.receiver.city}}&nbsp;</span>
          <span>{{nowOrderDetails.receiver.county}}&nbsp;</span>
          <span>{{nowOrderDetails.receiver.receiverDetail}}&nbsp;</span>
        </p>
      </div>
      <div class="">
        <p>订单信息：</p>
        <p >订单编号：<span>{{nowOrderDetails.orderId}}</span>
        <span style="float:right">下单时间：{{nowOrderDetails.created}}</span></p>
        <div class="">
          <div class="order_table" style="width:100%;margin-top:10px;" >
            <div style="width:150px;" class="left cargo">商品</div>
            <div class="left price">单价（元）</div>
            <div class="left num">数量</div>
            <div class="left now_pay">实付款（元）</div>
            <div class="left deal_state">交易状态</div>
          </div>
          <div style="width:100%" class="order_item" v-if="nowOrderDetails.orderitemList">
            <!--  订单详情item 开始 -->
            <div class="order_des" style="border:none;" v-for="cargo in nowOrderDetails.orderitemList" :key="cargo">
              <div class="left des_img" style="width:81px;height:85px;" @click="goToThisDetails(cargo)">
                <img :src="cargo.picPath" alt="img">
              </div>
              <div style="width:220px;" class="left des_p">
                <p class="orderDetail_title">{{cargo.itemInfo.itemName}}</p>
                <p>{{cargo.itemPropertyNamea}}&nbsp;{{cargo.itemPropertyNameb}}&nbsp;{{cargo.itemPropertyNamec}}</p>
              </div>
              <div style="width:83px;" class="left des_price">￥{{cargo.price}}</div>
              <div class="left des_num">{{cargo.num}}</div>
            </div>
            <!--  订单详情item 结束 -->
            <div class="order_des_right" :style="{marginTop:nowOrderDetails.btnsMarginTop}" style="right: -77px;">
              <div class="left now_pay_des" style="margin-top:0">
                <p class="spe_p">￥{{nowOrderDetails.actualPay}}</p>
                <p class="postFeeAndMoney">（含运费：￥{{nowOrderDetails.postFee}}）</p>
                <p class="postFeeAndMoney">（乾币已抵扣：￥{{nowOrderDetails.qbDed}}）</p>
              </div>
              <div class="left wait_pay_des">{{nowOrderDetails.state | frisco}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="" v-if="nowOrderDetails.buyerMessage">
        <p>订单留言：</p>
        <p>{{nowOrderDetails.buyerMessage}}</p>
      </div>
      <div class="">
        <p>本单赠送乾币：<span style="color:#d8qe06;font-weight:600">{{nowOrderDetails.giveQb}}</span></p>
      </div>
      <div class="closeBtn" @click="dialogVisibleToOrderDetails=false">关闭</div>
    </el-dialog>
    <!-- 确定取消订单吗？ -->
    <el-dialog title="提示" :visible.sync="dialogVisible" size="tiny">
      <span>确定取消订单吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="confirm_cancel()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import paging from '../../brandLib/paging0'
  import util from '../../../../common/util'
  export default {
    name: 'waitOrder',
    data () {
      return {
        pageProps:null,
        nowOrderDetails:{},
        dialogVisibleToOrderDetails:false,
        dialogVisible:false,
        items: [],
        no_find: '暂无订单～',
        operate_state: '付款',
        order_list: true,
        no_order: false,
      }
    },
    components: {
      paging,
    },
    created:function(){
      var that = this;
      that.getAllOrder();
    },
    methods: {
      operate: function(item) {
        var that = this;
        that.nowToOperateItem = item;
        var obj = {
          token:that.global.getToken(),
          orderId:item.orderId
        };
       if(item.state == 1){
          // 支付
          var orderD = {
            OrderId: item.orderId,
            giveQbNum: item.giveQb,
            itemSum: '',
            postFee: item.postFee,
            sumPrice: item.actualPay,
            actualPay:item.actualPay
          }
          window.sessionStorage.setItem('order', JSON.stringify(orderD))
          that.$router.push({ path:'/pay' });
        }
      },
      goToThisDetails:function(item){
        var that = this;
        that.$router.push({
          path:"/details/"+item.itemId,
        });
      },
      lookOrderDetails:function(item){
        var that = this;
        that.nowOrderDetails = item;
        that.dialogVisibleToOrderDetails = true;
        console.log(item)
      },
      cancel_order: function(item) {
        var that = this;
        that.cancleOrderItemId = item.orderId;
        that.dialogVisible = true;
      },
      confirm_cancel: function() {
        var that = this;
        var obj = {
          token:that.global.getToken(),
          itemId:that.cancleOrderItemId
        };
        console.log(obj)
        that.global.axiosPostReq('/OrderDetails/cancel',obj).then((res) => {
           console.log(res,"sureCancleOrder");
          if (res.data.callStatus === 'SUCCEED') {
            for(let i in that.items){
              if(that.cancleOrderItemId==that.items[i].orderId){
                var data = that.items[i];
                data.state = 1;
                that.items[i].splice(i,1,data);
              }else{
                continue;
              }
            }
            that.dialogVisible = false;
          } else {
            that.$message.error('网络错误！');
          }
        })
      },
      pageHandler:function(data){
        this.fenYeGetData(data);
      },
      fenYeGetData:function(data){
        var that = this;
        var obj = {};
        obj.currentPage = data;
        obj.numberPerpage = 10;
        that.global.axiosPostReq('/OrderDetails/show',obj)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.items = res.data.data;
            for(let i in that.items){
              that.items[i].created = util.formatDate.format(new Date(that.items[i].created));
              that.items[i].btnsMarginTop = 142 * that.items[i].orderitemList.length / 2 + "px";
            }
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      getAllOrder: function() {
        var that = this;
        var obj = {
          token:that.global.getToken(),
          state:1
        };
        that.global.axiosPostReq('/OrderDetails/show',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.numberPerPage = res.data.numberPerPage;
            var b = res.data.data.filter(function(ele,index,arr) {
                return ele.state == "1";
            });
            console.log(b,"getAllOrder_waitPay");
            that.items = b;
            for(let i in that.items){
              that.items[i].created = util.formatDate.format(new Date(that.items[i].created));
              that.items[i].btnsMarginTop = 142 * that.items[i].orderitemList.length / 2 + "px";
            }
            if(that.items==0){
              that.no_order = true;
            }else {
              var obj = {
                totalPage:1,
                totalNumber:that.items.length,
                numberPerPage:res.data.numberPerPage
              }
              that.pageProps = obj;
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
.orderDetails .order_table{
  margin-bottom: 0
}
.orderDetails .order_item{
  border-top: none;
}
.waitOrder{
  /*border: 1px solid #d7d7d7;
  margin-top: 30px;*/
}
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
    margin-bottom: 20px;
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
  .des_img > img{
   width: 81px;
   height: 81px;
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
    margin-top: 36px;
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
  }
</style>
