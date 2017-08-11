<template>
  <div class="allOrder">
    <div class="order_table" v-show="order_table">
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
      <div class="order_table_spe">
        <div class="left cargo">商品</div>
        <div class="left price">单价（元）</div>
        <div class="left num">数量</div>
        <div class="left cargo_operate">小计（元）</div>
        <div class="left now_pay">实付款（元）</div>
        <div class="left deal_state">交易状态</div>
        <div class="left deal_operate">交易操作</div>
      </div>
      <div style="margin-top:67px; margin-bottom:40px;"><img src="../../../../images/center/noOrder.png" alt="img"></div>
      <div><img src="../../../../images/center/noOrderWord.png" alt="img"></div>
    </div>
    <!--  暂无订单结束 -->
    <!--  查询无数据订单开始 -->
    <div class="no_order" v-show="no_search_order">
      <div class="order_table_spe">
        <div class="left cargo">商品</div>
        <div class="left price">单价（元）</div>
        <div class="left num">数量</div>
        <div class="left cargo_operate">小计（元）</div>
        <div class="left now_pay">实付款（元）</div>
        <div class="left deal_state">交易状态</div>
        <div class="left deal_operate">交易操作</div>
      </div>
      <div style="margin-top:67px; margin-bottom:40px;"><img src="../../../../images/center/noOrder.png" alt="img"></div>
      <div><img src="../../../../images/center/noSearch.png" alt="img"></div>
    </div>
    <!--  查询无数据订单结束 -->
    <div class="order_item" v-for="(item,index) in items" :key="item.orderId" v-show="order_list">
      <div class="order_title">
        <span class="order_date">{{item.created.split(" ")[0]}}</span>
        <span class="order_num">订单号: {{item.orderId}}</span>
        <span class="orderDetailsBtn"  @click="lookOrderDetails(item)">订单详情</span>
      </div>
      <!--  订单详情item 开始 -->
      <div class="order_des" v-for="cargo in item.orderitemList" :key="cargo.itemPropertyNamea">
        <div class="left des_img" @click="goToThisDetails(cargo)">
          <img :src="cargo.picPath+'?imageView2/1/w/80/h/80'" alt="img">
        </div>
        <div class="left des_p">
           <p style="margin-bottom: 20px;" >{{cargo.itemInfo.itemName}}</p>
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
        <div class="left now_pay_des">
          <p class="spe_p">￥{{item.actualPay}}</p>
          <p>（含运费：￥{{item.postFee}}）</p>
          <p>（乾币已抵扣：￥{{item.qbDed}}）</p>
        </div>
        <div class="left wait_pay_des">{{item.state | frisco}}</div>
        <div  class="left operate_des" v-if="item.state!==0">
          <p class="payBtn" v-if="item.state!=2&&item.state!=5&&item.state!=9" @click="operate(item,index)">{{item.state | operate}}</p>
          <p class="cancelBtn" v-if="item.state==3" @click="haveALookAtWuLiu(item)">查看物流</p>
          <p  class="cancelBtn pjcgbtn"  v-if="item.state==9" >评价成功！</p>
          <p class="cancelBtn" style="margin-top:0;font-size:12px;" v-if="item.state==1" @click="cancel_order(item)">取消订单</p>
        </div>
      </div>
    </div>

    <div class="block" v-if="items.length!=0">
      <!-- 分页 -->
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" layout="prev, pager, next, jumper" :total="totalCount" v-show="this.totalCount > this.pagesize">
      </el-pagination>
      <!-- 分页 -->
    </div>
    <!-- <div v-if="pageProps">
      <paging v-if="pageProps.totalPage>1" :childmsg="pageProps" style="text-align:center;margin-top:20px;" @childSay="pageHandler"></paging>
    </div> -->

    <el-dialog title="订单详情" :visible.sync="dialogVisibleToOrderDetails" size="tiny" custom-class="orderDetails" >
      <div class="" v-if="nowOrderDetails.receiver">
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
      <div class="">
        <p>订单信息</p>
        <p>订单编号：<span>{{nowOrderDetails.orderId}}</span>
        <span style="float:right">下单时间：{{nowOrderDetails.created}}</span></p>
        <div class="">
          <div class="order_table" style="width:100%;margin-top:10px;;margin-bottom:0px;" v-show="order_table">
            <div style="width:150px;" class="left cargo">商品</div>
            <div class="left price">单价（元）</div>
            <div class="left num">数量</div>
            <div class="left now_pay">实付款（元）</div>
            <div class="left deal_state">交易状态</div>
          </div>
          <div style="width:100%;border-color:#eeeeee;" class="order_item" v-if="nowOrderDetails.orderitemList">
            <!--  订单详情item 开始 -->
            <div class="order_des" style="border:none;" v-for="cargo in nowOrderDetails.orderitemList" :key="cargo.itemPropertyNamea">
              <div class="left des_img">
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
    <!-- 取消订单 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" size="tiny">
      <span>确定取消订单吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="confirm_cancel()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 物流信息 -->
    <el-dialog title="物流信息" :visible.sync="dialogVisibleHaveALookAtWuLiu" custom-class="wlxxWrapWrap">
      <div class="wlxxWrap" v-if="wuliuxinxi">
        <div class="wlxxLeft">
          <span v-if="index!==wuliuxinxi.Traces.length-1" :style="{height:one.height}" class="line" v-for="(one,index) in wuliuxinxi.Traces" :key="one.AcceptStation"><span class="circle"></span></span>
          <span class="lastCircle"></span>
        </div>
        <div class="wlxxRight">
          <ul>
            <li v-for="one in wuliuxinxi.Traces" :key="one.AcceptStation">
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
    <!-- 确认收货 -->
    <el-dialog title="提示" :visible.sync="dialogVisibleGetGood" size="tiny">
      <span>确定确认收货吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleGetGood=false">取 消</el-button>
        <el-button type="primary" @click="sureGetGood()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 评价 -->
    <el-dialog title="评价" :visible.sync="dialogVisibleComment" size="tiny">
      <div class="comment_box" v-for="(item,index) in nowToOperateItem.orderitemList"  v-if="commentScores.length > 0" :key="item.itemInfo">
        <div class="commentImgWrap">
          <img class="comment_img" :src="item.picPath" alt="img">
        </div>
        <p class="comment_des">
          <span>{{item.itemInfo.itemName}}</span>
        </p>
        <div class="clearfix"></div>
        <div class="score_box" >
          <!-- <div class="score_word">评分：</div> -->
          <el-rate   v-model="commentScores[index].score" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" class="score_des"></el-rate>
          <div class="getScore"><span style="color: #D81E06">{{commentScores[index].score}}</span>分</div>
        </div>
        <div class="clearfix"></div>
        <div class="comment_word_box">
          <div class="comment_word_des">评价：</div>
          <el-input type="textarea" :rows="5" v-model="commentScores[index].commentContent" :autosize="{ minRows: 5, maxRows: 5}" class="textarea_des">
          </el-input>
        </div>
        <div class="clearfix"></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleComment = false">取 消</el-button>
        <el-button type="primary" @click="sureCommentThisOrder()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import paging from '../../brandLib/paging0'
  import util from '../../../../common/util'
  import Bus from '../../../global/bus.js' 
  export default {
    name: 'allOrder',
    data () {
      return {
        //默认每页数据量
        pagesize: 10,
        //当前页码
        currentPage: 1,
        //默认数据总数
        totalCount: 1000,
        commentScores:[],
        wuliuxinxi:null,
        pageProps:null,
        nowToOperateItem:{},
        nowOrderDetails:{},
        dialogVisibleToOrderDetails:false,
        items: [],
        cargos: [],
        // no_find: '暂无订单～',
        order_table: true,
        order_list: true,
        no_order: false,
        no_search_order: false,
        dialogVisible: false,
        dialogVisibleComment: false,
        operate_close: true,
        // value2: null,
        textarea: '',
        // score : '',
        getScore: false,
        dialogVisibleGetGood:false,
        dialogVisibleHaveALookAtWuLiu:false
      }
    },
    components: {
      paging,
    },
    created: function() {
      var that = this;
      that.getAllOrder();
    },
    mounted: function() {
      var that = this;
    },
    watch: {
      value2: function() {
        // var that = this;
        // if (that.value2 == 0) {
        //   that.getScore = false;
        // }
        // if (that.value2 == 1) {
        //   that.getScore = true;
        //   that.score = '1';
        // }
        // if (that.value2 == 2) {
        //   that.getScore = true;
        //   that.score = '2';
        // }
        // if (that.value2 == 3) {
        //   that.getScore = true;
        //   that.score = '3';
        // }
        // if (that.value2 == 4) {
        //   that.getScore = true;
        //   that.score = '4';
        // }
        // if (that.value2 == 5) {
        //   that.getScore = true;
        //   that.score = '5';
        // }
        // console.log(that.value2);
      }
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
      fenYeGetData:function(data){
        var that = this;
        var obj = {};
        obj.currentPage = data;
        obj.numberPerpage = 10;
        obj.token = that.global.getToken(),
        that.global.axiosPostReq('/OrderDetails/show',obj)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.items = res.data.data;
            for(let i in that.items){
              that.items[i].created = util.formatDate.format(new Date(that.items[i].created),'yyyy-MM-dd hh:mm:ss' );
              that.items[i].btnsMarginTop = 142 * that.items[i].orderitemList.length / 2 + "px";
            }
            that.totalCount=res.data.totalNumber;
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      lookOrderDetails:function(item){
        var that = this;
        that.nowOrderDetails = item;
        that.dialogVisibleToOrderDetails = true;
      },
      //显示所有订单
      getAllOrder: function() {
        var that = this;
        var obj = {
          token:that.global.getToken(),
        };
        that.global.axiosPostReq('/OrderDetails/show',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.items = res.data.data;
            for(let i in that.items){
              that.items[i].created = util.formatDate.format(new Date(that.items[i].created),'yyyy-MM-dd hh:mm:ss');
              that.items[i].btnsMarginTop = 142 * that.items[i].orderitemList.length / 2 + "px";
            }
            if(that.items.length==0){
              that.no_order = true;
              that.order_table = false;
            }else {

            }
            that.totalCount=res.data.totalNumber;
            
          } else {
            that.$message.error('网络错误！');
          }
        })
      },
      // 取消订单
      cancel_order: function(item) {
        var that = this;
        that.cancleOrderItemId = item.orderId;
        that.dialogVisible = true;
      },
      sureGetGood:function () {
        var that = this;
        var obj = {
          token:that.global.getToken(),
          orderId:that.nowToOperateItem.orderId
        };
        that.global.axiosPostReq('/OrderDetails/confirmReceipt',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {

            // for(let i in that.items){
            //   if(that.items.orderId==that.nowToOperateItem.orderId){
                that.items.splice(that.nowToOperateItemIndex,1);
                that.dialogVisibleGetGood = false;
                Bus.$emit('getTarget', 'succeed');
              //   break;
              // }else{
              //   continue;
              // }
            // }
          } else {
            that.$message.error('网络错误！');
          }
        })
      },
      haveALookAtWuLiu:function(item){
        var that = this;
        var obj = {
          token:that.global.getToken(),
          orderId:item.orderId
          // orderId:"3334140532021"
        };
        that.global.axiosPostReq('/Exp/queryExp',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            var data = res.data.data;
            that.wuliuxinxi = JSON.parse(data);
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
      sureCommentThisOrder:function () {
        var that = this;
        var obj = {
          token:that.global.getToken(),
          orderId:that.nowToOperateItem.orderId,
          itemIdList:[]
        };
        for(let i in that.nowToOperateItem.orderitemList){
          var obj2 = {
            itemId:that.nowToOperateItem.orderitemList[i].itemId,
            score:that.commentScores[i].score,
            data:that.commentScores[i].commentContent,
            itemSKU:that.nowToOperateItem.orderitemList[i].itemSKU
          };
          obj.itemIdList.push(obj2);
        }
        obj.itemIdList = JSON.stringify(obj.itemIdList);
        that.global.axiosPostReq('/OrderDetails/makeSureCom',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.dialogVisibleComment = false;
            var data = that.items[that.nowToOperateItemIndex];
            data.state = 9;
            that.items.splice(that.nowToOperateItemIndex,1,data);
            Bus.$emit('getTarget', 'succeedComment');
            that.$alert('评论成功！',  {confirmButtonText: '确定',});
          } else {
            that.$message.error('网络错误！');
          }
        })
      },
      // 确定取消
      confirm_cancel: function() {
        var that = this;
        var obj = {
          token:that.global.getToken(),
          orderId:that.cancleOrderItemId
        };
        that.global.axiosPostReq('/OrderDetails/cancel',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            for(let i in that.items){
              if(that.cancleOrderItemId==that.items[i].orderId){
                var data = that.items[i];
                data.state = 0;
                that.items.splice(i,1,data);
              }
            }
            that.dialogVisible = false;
            that.$message('取消订单成功！');
          } else {
            that.$message.error('网络错误！');
          }
        })
      },
      handleClose: function() {
        var that = this;
      },
      goToThisDetails:function(item){
        var that = this;
        that.$router.push({
          path:"/details/"+item.itemId,
        });
      },
      // 交易操作
      operate: function(item,index) {
        var that = this;
        that.nowToOperateItem = item;
        that.nowToOperateItemIndex = index;
        // var obj = {
        //   token:that.global.getToken(),
        //   orderId:item.orderId
        // };
        // if(value == 0) {
        // 	var hh = '交易关闭'
        // if (value == 2) {
        // 	var ee = '待发货'
        // if (value == 5) {
        // 	var ee = '确定定单'
        // if (value == 6) {
        // 	var ee = '退货中'
        if(item.state == 4) {
          // 评论
          that.commentScores = [];
          for(let i in that.nowToOperateItem.orderitemList){
            that.commentScores.push({score:5,commentContent:"默认好评！"});
          }
          that.dialogVisibleComment = true;
        }else if(item.state == 1){
          // 支付
          // actualPay
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
        }else if(item.state == 3){
          // 确认收货
          that.dialogVisibleGetGood = true;
        }
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
    border: 1px solid #005aab !important;
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
    /*margin-top: 30px;*/
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
    /*margin-top: 53px;*/
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
    /*margin-top: 49px;*/
    line-height: 28px;
    background-color: #005aab;
    color: #fff;
    border-radius: 5px;
  }
  .payBtn:hover {
    cursor: pointer;
    background-color: #329af0;
    transition: all ease 0.2s;
  }

/* 暂无订单,没有符合条件的订单*/
  .order_table_spe {
    width: 1069px;
    height: 40px;
    font-size: 14px;
    font-weight: bold;
    color: #000;
    background-color: #F8F8F8;
  }
  .no_order {
    width: 1069px;
    height: 300px;
    text-align: center;
    font-size: 20px;
    color: #000;
    margin-top: 30px;
    border: 1px solid #D7D7D7;
  }
  .pjcgbtn{
    cursor:auto !important;
    color: #999999 !important;
  }
</style>

<style >
.closeBtn{
  width: 160px;
  line-height: 44px;
  color: white;
  border-radius: 3px;
  background: #005aab;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: center;
  cursor: pointer;
}
.spe_p{
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}
.orderDetails{
  width: 860px !important;
}
.orderDetails .order_des_right{
  top: 0 !important;
}
.orderDetails .order_item .orderDetail_title{
   margin-bottom: 20px;
   margin-top:0;
   font-weight:500
}
.orderDetails .order_item .postFeeAndMoney{
  color: #999999;
}
.orderDetails .order_table{
  border: 1px solid #eeeeee;
  border-bottom: none;
}
.orderDetails .order_item *{
  color: #333;
}
.orderDetails .order_item{
  border-top: none;
}
.orderDetails .el-dialog__body{
  padding-top: 0;
}
.orderDetailsBtn{
  float: right;
  margin-right: 20px;
  cursor: pointer;
  color: #005aab;
}

.orderDetails div p:nth-child(1){
  margin-top: 30px;
  margin-bottom: 20px;
  font-weight: 600;
}
.orderDetails div p:nth-child(2){
color: #333333;
}
.order_item{
  overflow: hidden;
}
.order_item .des_img {
  margin-right: 20px;
  border: 1px solid #D7D7D7;
  cursor: pointer;
  position: relative;
  width: 80px;
  height: 80px;
}
.des_img > img{
 max-width: 100%;
 max-height: 100%;
 display: block;
 margin: auto;
 margin-top: 50%;
 transform: translateY(-50%);
}
.cancelBtn {
  font-size: 12px;
  color: #999999;
}
.cancelBtn:hover {
  cursor: pointer;
  color: #D81E06;
  transition: all ease 0.2s;
}
.order_des_right{
  transform: translateY(-50%);
}
.operate_des p {
  margin-bottom: 10px !important;
}
.payBtn{
  margin-top: 0;
}
.order_des_right .now_pay_des{
  margin-top: 0 !important;
}
.order_des_right .wait_pay_des{
  margin-top: 0 !important;
}
.wlxxWrap .wlxxLeft{
  float: left;
      padding-top: 15px;
      position: relative;
}
.wlxxWrap .wlxxLeft span{
  background: #dfdfdf;
}
 .wlxxWrap .wlxxLeft .lastCircle{
   background: #5db7e8;
   position: absolute;
   width: 6px;
   height: 6px;
   bottom: -3px;
   left: -2.5px;
   border-radius: 50%;
 }
.wlxxWrap .wlxxLeft .line{
  display: block;
  width: 1px;
  /*height: 16px;*/
  position: relative;
}
.wlxxWrap .wlxxLeft .circle{
  position: absolute;
  width: 6px;
  height: 6px;
  top: -3px;
  left: -2.5px;
  border-radius: 50%;
}
.wlxxWrap .wlxxRight{
  margin-left: 40px;
}
.wlxxWrap .wlxxRight li{
  line-height: 35px;
}

.wlxxWrap .wlxxRight li .data{
  font-weight: 600;
  margin-right: 50px;
  float: left;
}
.wlxxWrap .wlxxRight li .placeWrap{
  padding-left: 160px;
}
.wlxxWrapWrap{
  width: 622px !important;
}
.commentImgWrap{
  width: 60px;
  height: 60px;
  border: 1px solid #eeeeee;
  float: left;
  margin-right: 10px;
}
.comment_img {
  border: 1px solid #e9e9e9;
  margin-right: 15px;
  float: left;
  max-width: 60px;
  max-height: 60px;
}
./* 评论评分框 */
  .comment_box {
    width: 100%;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e9e9e9;
  }

  .comment_des {
    /*margin-top: 18px;*/
    float: left;
  }
  .score_box {
    width: 100%;
    margin-top: 20px;
  }
  .score_word {
    float: left;
    margin-right: 20px;
  }
  .score_des {
    float: left;
  }
  .comment_word_box {
    width: 100%;
    margin-top: 20px;
  }
  .comment_word_des {
    float: left;
    margin-right: 20px;
  }
  .textarea_des {
    width: 80%;
  }
  .getScore {
    float: left;
    margin-left: 20px;
  }
</style>
