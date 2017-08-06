<template>
  <div class="waitRec" :class="{noOrderClass:no_order}">
    <div class="order_table">
      <div class="left cargo">商品</div>
      <div class="left price">单价（元）</div>
      <div class="left num">数量</div>
      <div class="left cargo_operate">小计（元）</div>
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
        <span class="order_date">{{item.created.split(" ")[0]}}</span>
        <span class="order_num">订单号: {{item.orderId}}</span>
        <span class="orderDetailsBtn"  @click="lookOrderDetails(item)">订单详情</span>
      </div>
      <!--  订单详情item 开始 -->
      <div class="order_des" v-for="cargo in item.orderitemList" :key="cargo">
        <div class="left des_img" style="width:81px;height:85px;" @click="goToThisDetails(cargo)">
          <img :src="cargo.picPath+'?imageView2/1/w/80/h/80'" alt="img">
        </div>
        <div class="left des_p">
          <p style="margin-top:0;margin-bottom:20px;">{{cargo.itemInfo.itemName}}</p>
          <p>
            {{cargo.itemPropertyNamea}}<span v-if="cargo.itemPropertyNameb">；</span>
            {{cargo.itemPropertyNameb}}<span v-if="cargo.itemPropertyNamec">；</span>
            {{cargo.itemPropertyNamec}}
          </p>
        </div>
        <div class="left des_price">￥{{cargo.price}}</div>
        <div class="left des_num">{{cargo.num}}</div>
        <div class="left des_state">￥{{cargo.price*cargo.num}}</div>
      </div>
      <!--  订单详情item 结束 -->
      <div class="order_des_right" :style="{marginTop:item.btnsMarginTop}">
        <div class="left now_pay_des" >
          <p class="spe_p">￥{{item.actualPay}}</p>
          <p>（含运费：￥{{item.postFee}}）</p>
          <p>（乾币已抵扣：￥{{item.qbDed}}）</p>
        </div>
        <div class="left wait_pay_des">{{item.state | frisco}}</div>
        <div  class="left operate_des" v-if="item.state!==0">
          <p class="payBtn" @click="operate(item)">{{item.state | operate}}</p>
          <p class="cancelBtn" v-if="item.state==3" @click="haveALookAtWuLiu(item)">查看物流</p>
        </div>
      </div>
    </div>
    <div class="block" v-if="items.length!=0">
      <!-- 分页 -->
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" layout="prev, pager, next, jumper" :total="totalCount" v-show="this.totalCount > this.pagesize">
      </el-pagination>
      <!-- 分页 -->
    </div>

<el-dialog title="订单详情" :visible.sync="dialogVisibleToOrderDetails" size="tiny" custom-class="orderDetails" >
  <div v-if="nowOrderDetails.receiver">
    <p>收货信息</p>
    <p>
      <span>{{nowOrderDetails.receiver.receiverName}}&nbsp;</span>
      <span>{{nowOrderDetails.receiver.phone}}&nbsp;</span>
      <span>{{nowOrderDetails.receiver.province}}</span>
      <span>{{nowOrderDetails.receiver.city}}&nbsp;</span>
      <span>{{nowOrderDetails.receiver.county}}&nbsp;</span>
      <span>{{nowOrderDetails.receiver.receiverDetail}}&nbsp;</span>
    </p>
  </div>
  <div  v-if="nowOrderDetails.receiver">
    <p>订单信息</p>
    <p style="margin-bottom: 20px;">订单编号：<span>{{nowOrderDetails.orderId}}</span>
      <span style="float:right">下单时间：{{nowOrderDetails.created}}</span>
    </p>
    <div class="">
      <div class="order_table" style="width:100%;margin-top:10px;" >
        <div style="width:150px;" class="left cargo">商品</div>
        <div class="left price">单价（元）</div>
        <div class="left num">数量</div>
        <div class="left now_pay">实付款（元）</div>
        <div class="left deal_state">交易状态</div>
      </div>
      <div style="width:100%;border-color:#eeeeee;" class="order_item" v-if="nowOrderDetails.orderitemList">
        <!--  订单详情item 开始 -->
        <div class="order_des" style="border:none;" v-for="cargo in nowOrderDetails.orderitemList" :key="cargo">
          <div class="left des_img" style="width:81px;height:85px;">
            <img :src="cargo.picPath+'?imageView2/1/w/80/h/80'" alt="img">
          </div>
          <div style="width:200px;" class="left des_p">
            <p class="orderDetail_title">{{cargo.itemInfo.itemName}}</p>
            <p>
              {{cargo.itemPropertyNamea}}<span v-if="cargo.itemPropertyNameb">；</span>
              {{cargo.itemPropertyNameb}}<span v-if="cargo.itemPropertyNamec">；</span>
              {{cargo.itemPropertyNamec}}
            </p>
          </div>
          <div style="width:98px;margin-left:0;text-align:center;" class="left des_price">￥{{cargo.price}}</div>
          <div style="text-align:center" class="left des_num">{{cargo.num}}</div>
        </div>
        <!--  订单详情item 结束 -->
        <div class="order_des_right" style="width:auto;right:25px;top:0" :style="{marginTop:nowOrderDetails.btnsMarginTop}">
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
    <p>本单赠送乾币：<span style="color:#d8qe06;font-weight:600">{{nowOrderDetails.giveQb?nowOrderDetails.giveQb:0}}</span></p>
  </div>
  <div class="closeBtn" @click="dialogVisibleToOrderDetails=false">关闭</div>
</el-dialog>
<el-dialog title="提示" :visible.sync="dialogVisible" size="tiny">
  <span>确定取消订单吗？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible=false">取 消</el-button>
    <el-button type="primary" @click="confirm_cancel()">确 定</el-button>
  </span>
</el-dialog>
<el-dialog title="物流信息" :visible.sync="dialogVisibleHaveALookAtWuLiu" custom-class="wlxxWrapWrap">
  <div class="wlxxWrap" v-if="wuliuxinxi">
    <div class="wlxxLeft">
      <span v-if="index!==wuliuxinxi.Traces.length-1" :style="{height:one.height}" class="line" v-for="(one,index) in wuliuxinxi.Traces"><span class="circle"></span></span>
      <span class="lastCircle"></span>
    </div>
    <div class="wlxxRight">
      <ul>
        <li v-for="one in wuliuxinxi.Traces">
          <span class="data">{{one.AcceptTime.split(" ")[0]}}</span>
          <div class="placeWrap">
            <span class="place">{{one.AcceptStation}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisibleHaveALookAtWuLiu=false">确 定</el-button>
  </span>
</el-dialog>
<el-dialog title="提示" :visible.sync="dialogVisibleGetGood" size="tiny">
  <span>确定确认收货吗？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibleGetGood=false">取 消</el-button>
    <el-button type="primary" @click="sureGetGood()">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
  import paging from '../../brandLib/paging0'
  import util from '../../../../common/util'
  export default {
    name: 'waitRec',
    data () {
      return {
        //默认每页数据量
        pagesize: 10,
        //当前页码
        currentPage: 1,
        //默认数据总数
        totalCount: 1000,
        wuliuxinxi:false,
        pageProps:null,
        items: [],
        dialogVisibleToOrderDetails:false,
        nowOrderDetails:{},
        no_find: '暂无订单～',
        operate_state: '付款',
        order_list: true,
        no_order: false,
        dialogVisible:false,
        dialogVisibleHaveALookAtWuLiu:false,
        dialogVisibleGetGood:false,
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
      handleCurrentChange(val) {
        var that = this
        that.currentPage = val
        if (val == undefined) {
          that.currentPage = 1
        } else {
          that.currentPage = val
        }
        this.fenYeGetData(that.currentPage);
      },
      lookOrderDetails:function(item){
        var that = this;
        that.nowOrderDetails = item;
        that.dialogVisibleToOrderDetails = true;
      },
      fenYeGetData:function(data){
        var that = this;
        var obj = {};
        obj.currentPage = data;
        obj.numberPerpage = 10;
        obj.state = 3;
        that.global.axiosPostReq('/OrderDetails/show',obj)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            console.log(res,"..........")
            that.items = res.data.data;
            for(let i in that.items){
              that.items[i].created = util.formatDate.format(new Date(that.items[i].created),'yyyy-MM-dd hh:mm:ss');
              that.items[i].btnsMarginTop = 142 * that.items[i].orderitemList.length / 2 + "px";
            }
            that.totalCount=res.data.totalNumber;

          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      operate: function(item) {
        var that = this;
        that.nowToOperateItem = item;
        var obj = {
          token:that.global.getToken(),
          orderId:item.orderId
        };
        if(item.state == 3){
          // 确认收货
          that.dialogVisibleGetGood = true;
        }
      },
      sureGetGood:function () {
        var that = this;
        var obj = {
          token:that.global.getToken(),
          orderId:that.nowToOperateItem.orderId
        };
        that.global.axiosPostReq('/OrderDetails/confirmReceipt',obj).then((res) => {
           console.log(res,"sureGetGoodConsole");
          if (res.data.callStatus === 'SUCCEED') {
            for(let i in that.items){
              if(that.items[i].orderId==that.nowToOperateItem.orderId){
                console.log(that.items[i].orderId,that.nowToOperateItem.orderId,that.items.length)
                that.items.splice(i,1);
                that.dialogVisibleGetGood = false;
                break;
              }else{
                continue;
              }
            }
          } else {
            that.$message.error('网络错误！');
          }
        })
      },
      haveALookAtWuLiu:function(item){
        var that = this;
        console.log(item)
        var obj = {
          token:that.global.getToken(),
          orderId:item.orderId
        };
        that.global.axiosPostReq('/OrderDetails/seeLog',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            var data = res.data.data;
            that.wuliuxinxi = JSON.parse(data);
            console.log(JSON.parse(data),"haveALookAtWuLiu  ");
            for(let i in that.wuliuxinxi.Traces){
              var temp = 25;
              if(that.wuliuxinxi.Traces[i].AcceptStation.length<temp){
                that.wuliuxinxi.Traces[i].height = 36 + "px";
              }else{
                var num = that.wuliuxinxi.Traces[i].AcceptStation.length/temp;
                num = parseInt(num)
                that.wuliuxinxi.Traces[i].height = 35*(1+1) + "px";
              }
            }
            that.dialogVisibleHaveALookAtWuLiu = true;
          } else {
            that.$message.error('网络错误！');
          }
        })
      },
      goToThisDetails:function(item){
        var that = this;
        that.$router.push({
          path:"/details/"+item.itemId,
        });
      },
      getAllOrder: function() {
        var that = this;
        var obj = {
          token:that.global.getToken(),
          state:3
        };
        that.global.axiosPostReq('/OrderDetails/show',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            var b = res.data.data.filter(function(ele,index,arr) {
                return ele.state == "3";
            });
            console.log(res,"getAllOrder_waitRec");
            that.items = b;
            for(let i in that.items){
              that.items[i].created = util.formatDate.format(new Date(that.items[i].created),'yyyy-MM-dd hh:mm:ss');
              that.items[i].btnsMarginTop = 142 * that.items[i].orderitemList.length / 2 + "px";
            }
            if(that.items.length==0){
              that.no_order = true;
            }else{
              // var obj = {
              //   totalPage:res.data.totalPage,
              //   totalNumber:res.data.totalNumber,
              //   numberPerPage:res.data.numberPerPage
              // }
              // that.pageProps = obj;
            }
            that.totalCount=res.data.totalNumber;
// that.no_order = true;
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
.waitRec{
  margin-top: 30px;
}
.noOrderClass{
  border:1px solid #d7d7d7;
  height: 300px;
}
.orderDetails .order_table{
  margin-bottom: 0;
  margin-top: 0;
}
.orderDetails .order_item{
  border-top: none;
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
    /*margin-top: 30px;*/
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
    /*margin-top: 36px;*/
    /*margin-bottom: 5px;*/
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
