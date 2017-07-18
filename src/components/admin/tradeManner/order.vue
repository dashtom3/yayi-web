<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>交易管理</b></el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col class="warp-main">
      <el-form label-width="80px" class="clearfix">
        <el-form-item label="订单编号" class="fl t_input_width">
          <el-input v-model="orderCode"></el-input>
        </el-form-item>
        <el-form-item label="买家信息" class="fl t_input_width">
          <el-input v-model="buyerInfo" placeholder="输入收件人姓名或手机号"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" class="fl">
          <el-select v-model="value" placeholder="全部" class="t_select_width">
				    <el-option v-for="item in state" :key="item.value" :label="item.label" :value="item.value"> </el-option>
				  </el-select>
        </el-form-item>
        <el-form-item label="是否退款" class="fl">
          <el-select v-model="value1" class="fl t_select_width">
				    <el-option v-for="item in drawback" :key="item.value1" :label="item.label1" :value="item.value1"></el-option>
				  </el-select>
        </el-form-item>
        <el-form-item label="下单时间" class="fl" style="width:300px;margin-right:12px;">
	          <el-date-picker  v-model="value3"  type="daterange"  placeholder="选择时间范围">  </el-date-picker>
        </el-form-item>
        <el-button type="primary" class="fl" @click="search()">查询</el-button>
      </el-form>

      <!--列表-->
      <el-table :data="orderList" border>
        <el-table-column prop="orderId" label="订单编号" width="180" align="center" ></el-table-column>
        <el-table-column prop="totalFee" label="总价（元）" width="120" align="center" ></el-table-column>
        <el-table-column prop="qbDed" label="乾币抵扣（元）" width="140" align="center" ></el-table-column>
        <el-table-column prop="actualPay" label="实际付款（元）" width="140" align="center" ></el-table-column>
        <el-table-column  label="买家信息" width="140" align="center" >
          <template  scope="scope">
            <span>{{scope.row.phone}}</span><br>
            <span>{{scope.row.reName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="created" label="下单时间" min-width="120" align="center" >
          <template scope="scope">
            <span>{{scope.row.created}}</span>
          </template >
        </el-table-column>
        <el-table-column prop="state" label="订单状态" min-width="120" align="center" >
          <template scope="scope">
            <span v-if="scope.row.state == '1'">等待买家付款</span>
            <span v-if="scope.row.state == '2'">买家已付款</span>
            <span v-if="scope.row.state == '5'">订单已确认</span>
            <span v-if="scope.row.state == '3'">卖家已发货</span>
            <span v-if="scope.row.state == '4'">交易成功</span>
            <span v-if="scope.row.state == '0'">交易关闭</span>
          </template>
        </el-table-column>
        <el-table-column prop="shippingName" label="物流信息" min-width="150" align="center" >
          <template scope="scope">
            <span>{{scope.row.shippingName}}</span><br>
            <span>{{scope.row.shippingCode}}</span>
          </template>
        </el-table-column>
        <!-- <result property="shippingCode" column="shipping_code" />物流编号 -->
        <el-table-column prop="refund" label="是否退款" min-width="100" align="center" >
          <template scope="scope">
            <span v-if="scope.row.refund == '0'">否</span>
            <span v-if="scope.row.refund == '1'">是</span>
          </template>
        </el-table-column>
        <el-table-column prop="handle" label="操作" min-width="180" align="center" >
          <template scope="scope">
            <el-button  size="mini"  type="info"  @click="getOneOrderDetailsById(scope.$index, scope.row)">详情</el-button>
            <el-button  size="mini"  v-show='scope.row.state!=0&&scope.row.state!=4'  @click="handleClose(scope.$index, scope.row)">关闭交易</el-button>
            <el-button  size="mini"  type="success"  v-show='scope.row.state === "2"'  @click="handleSure(scope.$index, scope.row)">确认订单</el-button>
            <el-button  size="mini"  type="danger"  v-show='scope.row.state>=2&&scope.row.state<=5'  @click="handleDrawback(scope.$index, scope.row)">退款处理</el-button>
            <el-button  size="mini"  type="primary"  v-show='scope.row.state === "5"'  @click="handleDelivery(scope.$index, scope.row)">仓库发货</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pageC" v-if="pageProps">
        <paging v-if="pageProps.totalPage>1" :childmsg="pageProps" class="pageC" @childSay="pageHandler"></paging>

      </div>

      <!--详情界面-->
      <el-dialog v-if="nowOrderDetails" title="订单详情" v-model="detailVisible" size="small" :close-on-click-modal="true">
        <h3 class="detail_h3">订单状态:<span style="padding-left:20px;">{{nowOrderDetails.state | frisco}}</span></h3>
        <h4 class="detail_h4">收货信息</span></h4>
        <template>
          <el-table :data="receivingInfo" style="width: 100%" >
            <el-table-column prop="receiverName" label="收货人" :span="3" align="center">
            </el-table-column>
            <el-table-column prop="userPhone" label="收件人手机号" :span="3" align="center">
            </el-table-column>
            <el-table-column  label="所在地区" :span="3" align="center">
              <template scope="scope">
                <span>{{scope.row.province}}&nbsp;</span>
                <span>{{scope.row.city}}&nbsp;</span>
                <span>{{scope.row.county}}&nbsp;</span>
              </template>
            </el-table-column>
            <el-table-column prop="receiverDetail" label="详细地址" width="500" >
            </el-table-column>
          </el-table>
        </template>
        <h4 class="detail_h4">订单信息</h4>
        <el-row class="order_header">
          <el-col :span="8" align="center"><span v-if="nowOrderDetails.created">下单时间：{{nowOrderDetails.created}}</span><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="8" style="overflow:hidden" align="center">订单号：{{nowOrderDetails.orderId}}<div class="grid-content bg-purple-light"></div></el-col>
          <el-col :span="8" align="center"><span v-if="nowOrderDetails.endTime">签收时间：{{nowOrderDetails.endTime}}</span><div class="grid-content bg-purple"></div></el-col>
        </el-row>

        <div class="order_header">
          <el-col :span="3" align="center"><div class="grid-content bg-purple">&nbsp;</div></el-col>
          <el-col :span="3" align="center">商品<div class="grid-content bg-purple"></div></el-col>
          <el-col :span="4" align="center">SKU代码<div class="grid-content bg-purple"></div></el-col>
          <el-col :span="3" align="center">单价<div class="grid-content bg-purple"></div></el-col>
          <el-col :span="4" align="center">数量<div class="grid-content bg-purple"></div></el-col>
          <el-col :span="7"><div class="grid-content bg-purple"></div></el-col>
        </div>
        <div class="order_box clearfix">
          <div class="order_content fl" v-for="item in nowOrderDetails.orderitemList">
            <el-col :span="4" align="center"><div class="grid-content bg-purple"><img style="width:50px;" :src="item.picPath" alt="图片无法显示"></div></el-col>
            <el-col :span="5" align="center">{{item.itemInfo.itemName}}<div class="grid-content bg-purple"></div></el-col>
            <el-col :span="5" align="center">{{item.itemSKU}}<div class="grid-content bg-purple"></div></el-col>
            <el-col :span="5" align="center">{{item.price}}<div class="grid-content bg-purple"></div></el-col>
            <el-col :span="5" align="center">{{item.num}}<div class="grid-content bg-purple"></div></el-col>
          </div>
          <div class="order_sum fl">
            <div class="order_h">{{'￥'+nowOrderDetails.totalFee}}</div>
            <div class="order_h">{{'（含运费: '+nowOrderDetails.postFee+ '）'}}</div>
            <div class="order_h">{{'（乾币已抵扣: '+nowOrderDetails.qbDed+ '）'}}</div>
          </div>
        </div>
        <div class="pay_info clearfix">
          <ul class="fl" style="width:130px;">
            <li>支付方式</li>
            <li>发票</li>
            <li>产品注册证</li>
            <li>订单留言</li>
          </ul>
          <ul class="fl">
            <li v-if="nowOrderDetails.payType==1">微信支付</li>
            <li v-else-if="nowOrderDetails.payType==0">支付宝支付</li>
            <li>
              <div v-if="nowOrderDetails.invoiceHand">不申请发票</i></div>
              <div v-else>
                发票抬头：{{nowOrderDetails.invoiceHand}}
              </div>
            </li>
            <li>
              <div v-if="nowOrderDetails.isRegister==0">不需要产品认证</div>
              <div v-else>需要产品认证</div>
            </li>
            <li v-if="!nowOrderDetails.buyerMessage">留言为空</li>
            <li v-else>{{nowOrderDetails.buyerMessage}}</li>
          </ul>
        </div>
        <div class="refund_info">
          <div>退款信息</div>
          <table class="refund_tb">
            <tr class="bgc">
            <td colspan="7" style="text-align:left;"><span style="padding-left:20px;">实付款：{{'￥'+orderInfo.totalPrice.toFixed(2)}}</span><span style="padding-left:100px;">运费：包邮</span><span style="padding-left:100px;">乾币抵扣：{{'￥'+orderInfo.deductible.toFixed(2)}}</span></td>
            </tr>
            <tr class="bgc">
              <td>sku代码</td>
              <td>商品名称+属性</td>
              <td>价格*数量</td>
              <td>退货数量</td>
              <td>退款金额</td>
              <td>退回的乾币数</td>
              <td>扣除的乾币数</td>
            </tr>
            <tr v-for="(item, index) in orderInfo.goodsInfo" :key="index">
              <td></td>
              <td>{{item.goodsName}}</td>
              <td>{{item.price + '*' + item.goodsNum}}</td>
              <td>{{item.backNo>item.goodsNum ? "" : item.count}}</td>
              <td :rowspan="orderInfo.goodsInfo.length" v-if="index == 0">{{orderInfo.refundAmt}}</td>
              <td :rowspan="orderInfo.goodsInfo.length" v-if="index == 0">{{orderInfo.untread}}</td>
              <td :rowspan="orderInfo.goodsInfo.length" v-if="index == 0">{{orderInfo.outCoins}}</td>
            </tr>
          </table>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="detailVisible=false">关闭</el-button>
        </div>
      </el-dialog>

      <!-- 仓库发货 -->
      <el-dialog title="发货" size="tiny" v-model="deliveryVisible" :close-on-click-modal="true">
        <div style="height:40px;padding-left:60px;">
          <i class="i_col_red">*</i>
          <span>物流公司：</span>
          <template>
            <el-select v-model="wuliu" size="small"></el-select>
          </template>
        </div>
        <div style="height:40px;padding-left:60px;">
          <i class="i_col_red">*</i>
          <span>快递单号：</span>
          <template>
            <el-input v-model="wuLiuBianHao" style="width:215px;" size="small"></el-input>
          </template>
        </div>
        <div>
          <el-button class="btn_" @click="sureFaHuo()">确定</el-button>
          <el-button type="primary" @click="deliveryVisible = false" style="margin-left:60px;">取消</el-button>
        </div>
      </el-dialog>

      <!-- 退款处理 -->
      <el-dialog title="退款处理" v-model="refundVisible" :close-on-click-modal="true">
        <table class="refund_tb">
            <tr class="bgc">
              <td colspan="7" style="text-align:left;"><span style="padding-left:20px;">订单编号：{{orderInfo.orderNo}}</span><span style="padding-left:100px;">乾币抵扣：{{orderInfo.deductible}}</span></td>
            </tr>
            <tr class="bgc">
              <td>是否退款</td>
              <td>商品名称+属性</td>
              <td>价格*数量</td>
              <td>退货数量</td>
              <td>退款金额</td>
              <td>退回乾币数</td>
              <td>扣除乾币数</td>
            </tr>
            <tr v-for="(item, index) in orderInfo.goodsInfo" :key="index" style="height:46px;">
              <td>
                <template>
                  <el-checkbox v-model="item.checked" size="small"></el-checkbox>
                </template>
              </td>
              <td>{{item.goodsName}}</td>
              <td>{{item.price + '*' + item.goodsNum}}</td>
              <td style="width:200px;position:relative;">
                <div id="inputCenter" v-show="item.goodsNum" style="position:absolute;top:4px;">
                  <i style="position:absolute;left:30px;top:2px;" class="icon_i_l" :class="{i_disabled: !item.checked}" @click="reduceCount(index, item)">-</i>
                  <el-input v-model="item.count" :disabled="!item.checked" style="width:88px;position:absolute;left:60px;"></el-input>
                  <i style="position:absolute;left:150px;top:2px" class="icon_i_r" :class="{i_disabled: !item.checked}" @click="addCount(index, item)">+</i>
                </div>
              </td>
              <td :rowspan="orderInfo.goodsInfo.length" v-if="index == 0">{{orderInfo.refundAmt}}</td>
              <td :rowspan="orderInfo.goodsInfo.length" v-if="index == 0">{{orderInfo.untread}}</td>
              <td :rowspan="orderInfo.goodsInfo.length" v-if="index == 0">{{orderInfo.outCoins}}</td>
            </tr>
          </table>
          <div class="btn_box">
            <el-button class="_btn" type="primary" @goToBackMoney()>保存</el-button>
            <el-button class="_btn" @click="refundVisible = false">取消</el-button>
          </div>
      </el-dialog>
    </el-col>
	</el-row>
</template>

<script>
  import paging from '../../website/brandLib/paging0'
  export default {
    data() {
      return {
        // wuliu:[
        //   {value:"申通快递",label:"申通快递"}
        // ],
        pageProps:null,
        nowOrderDetails:null,
        wuLiuBianHao:null,
        wuliu:"申通快递",
        //订单状态
        state: [
            {value: '',label: '全部'},
            {value: '1',label: '等待买家付款'},
            {value: '2',label: '买家已付款'},
            {value: '5',label: '订单已确认'},
            {value: '3',label: '卖家已发货'},
            {value: '4',label: '交易成功'},
            {value: '0',label: '交易关闭'}
          ],
        //是否退款
        drawback: [{
            value1: '0',
            label1: '全部'
          },{
            value1: '1',
            label1: '是'
          }, {
            value1: '2',
            label1: '否'
        }],
        orderCode: '',//订单编号
        buyerInfo: '',//买家信息
        value: '全部',//订单状态的value
        value1: '全部',//是否退款的value
        value3:[],
        // value3: [new Date(2017, 10, 10, 10, 10), new Date(2017, 10, 11, 10, 10)],//下单时间
        //订单列表
        orderList: [],
          detailVisible: false,//详情界面开关
          dialogVisible: false,//关闭开关
          deliveryVisible: false,//仓库发货开关
          refundVisible: false,//退款处理开关
          //收货信息
          receivingInfo: [{
            userCode: 'xxxxxx',
            userName: '张三',
            localtion: '上海市静安区',
            detailAddr: '共和新路街道洛川中路1100弄31号103（居委会）'
          }],
        //订单信息
        orderInfo: {
          orderDate: '2017-05-27',
          orderNo: '173828478CSJHC',
          orderTime: 'xxxxxxxxxxx',
          totalPrice: 156,
          refundAmt: 78,
          outCoins: 2,
          untread: 6,
          freight: 68,
          deductible: 2,
          //商品信息
          goodsInfo:[{
            goodsSrc: '',
              goodsName: '商品名称1',
              SKUCode: 'xxxxxxxxx',
              price: 39,
              goodsNum: 2,
              checked: false,
              count: 1//退款数量
            },{
              goodsSrc: '',
              goodsName: '商品名称2',
              SKUCode: 'xxxxxxxxx',
              price: 39,
              goodsNum: 1,
              checked: false,
              count: 1//退款数量
            },{
              goodsSrc: '',
              goodsName: '商品名称3',
              SKUCode: 'xxxxxxxxx',
              price: 39,
              goodsNum: 1,
              checked: false,
              count: 1//退款数量
          }]
        }
      }
    },
    components:{
      paging
    },
    created:function(){
      var that = this;
      that.getOrderList();
    },
    methods: {
      pageHandler:function(data){
        this.fenYeGetData(data);
      },
      fenYeGetData:function(data){
        var that = this;
        var obj = {};
        obj.currentPage = data;
        obj.numberPerpage = 10;
        console.log(obj)
        that.global.axiosGetReq('/showUserOrderManage/showOrder',obj)
        .then((res) => {
          console.log(res,"getOrderList")
          if (res.data.callStatus === 'SUCCEED') {
            that.orderList = res.data.data;
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      sureFaHuo:function(){
        var that = this;
        var obj = {};
        obj.logisticsName = that.wuliu;
        obj.orderId = that.faHuoOrder.orderId;
        obj.logisticsCode = that.wuLiuBianHao;
        if(that.wuLiuBianHao){
          that.global.axiosPostReq('/showUserOrderManage/warehouseDelivery',obj)
          .then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              var data =  that.orderList[that.fahuoIndex];
              data.state = "3";
              data.shippingCode = that.wuLiuBianHao
              data.shippingName = that.wuliu;
              that.orderList.splice(that.fahuoIndex,1,data);
              // that.orderList[that.fahuoIndex].state = "3";
              that.deliveryVisible = false;
            } else {
              that.$message.error('网络出错，请稍后再试！');
            }
          })
        }else{
          that.$alert('请填写物流编号！', {confirmButtonText: '确定',});
        }
      },
      search:function(){
        var that = this;
        var obj = {};
        var flag = false;
        if(that.orderCode){
          obj.orderId = that.orderCode;
        }
        if(that.buyerInfo){
          obj.buyerInfo = that.buyerInfo;
        }
        if(that.value){
          // 订单状态
          // {value: '0',label: '全部'},
              for(let b in that.state){
                if(that.state[b].label==that.value&&that.state[b].value!="0"){
                  obj.state = that.state[b].value;
                }
              }
              obj.orderState = that.value;
        }
        if(that.value3.length!=0){
          var date1,date2;
          date1 = that.value3[0].toLocaleString();
          date2 = that.value3[1].toLocaleString();
          date1 = date1.split(" ");
          date2 = date2.split(" ");
          date1 = date1[0].split("/").join("-");
          date2 = date2[0].split("/").join("-");
          obj.orderCTime = date1;
          obj.orderETime = date2;
        }
        if(that.value1){
          // 退款状态
            for(let a in that.drawback){
              if(that.value1 == that.drawback[a].label1&&that.drawback[a].value1!="0"){
                obj.isRefund = that.drawback[a].value1;
              }
            }
        }
        console.log(obj,"searchObj")
        that.global.axiosPostReq('/showUserOrderManage/showOrder',obj)
        .then((res) => {
          console.log(res,"searchOrderList")
          if (res.data.callStatus === 'SUCCEED') {
            that.orderList = res.data.data;
            var obj = {
              totalPage:res.data.totalPage,
              totalNumber:res.data.totalNumber,
              numberPerPage:res.data.numberPerPage
            }
            that.pageProps = obj;
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      getOneOrderDetailsById:function(index,oneOrder){
        var that = this;
        var obj = {
          orderId:oneOrder.orderId
        };
        console.log(oneOrder)
        that.global.axiosPostReq('/showUserOrderManage/queryOrderDetails',obj)
        .then((res) => {
          console.log(res,"getOneOrderDetailsById")
          if (res.data.callStatus === 'SUCCEED') {
            this.detailVisible = true;
            this.nowOrderDetails = res.data.data;
            this.receivingInfo = [];
            res.data.data.receiver.userPhone = oneOrder.phone;
            this.receivingInfo.push(res.data.data.receiver);
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      getOrderList:function(){
        var that = this;
        var obj = {
          orderId:"",
          buyerInfo:"",
          state:"",
          orderCTime:"",
          orderETime:"",
          isRefund:""
        };
        that.global.axiosPostReq('/showUserOrderManage/showOrder')
        .then((res) => {
          console.log(res,"getOrderList")
          if (res.data.callStatus === 'SUCCEED') {
            that.orderList = res.data.data;
            var obj = {
              totalPage:res.data.totalPage,
              totalNumber:res.data.totalNumber,
              numberPerPage:res.data.numberPerPage
            }
            that.pageProps = obj;
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      //详情
      handleDetail(index, row) {
        var that = this;
        this.detailVisible = true;
        that.getOneOrderDetailsById(row.orderId);
      },
      //关闭交易
      handleClose(index, row) {
        var that = this;
        that.$confirm('确认关闭交易吗？')
          .then(_ => {
            var obj = {};
            obj.orderId = row.orderId;
            obj.flagBit = "0";
            that.global.axiosPostReq('/showUserOrderManage/closeTrading',obj)
            .then((res) => {
              if (res.data.callStatus === 'SUCCEED') {
                that.orderList[index].state = "0";
              } else {
                that.$message.error('网络出错，请稍后再试！');
              }
            })
          })
          .catch(_ => {});
      },
      //确认订单
      handleSure(index, row) {
        var that = this;
        that.$confirm('该订单的款已到账？')
          .then(_ => {
            var obj = {};
            obj.orderId = row.orderId;
            obj.flagBit = "5";
            that.global.axiosPostReq('/showUserOrderManage/closeTrading',obj)
            .then((res) => {
              if (res.data.callStatus === 'SUCCEED') {
                that.orderList[index].state = "5";
              } else {
                that.$message.error('网络出错，请稍后再试！');
              }
            })
          })
          .catch(_ => {});
      },
      //退款处理
      handleDrawback(index, row) {
        this.refundVisible = true;
      },
      //仓库发货
      handleDelivery(index, row) {
        var that = this;
        that.deliveryVisible = true;
        that.faHuoOrder = row;
        that.fahuoIndex = index;
      },
      reduceCount(index, item){
        if(item.checked && this.orderInfo.goodsInfo[index].count !== 1){
          this.orderInfo.goodsInfo[index].count -= 1;
        }
      },
      addCount(index, item){
        if(item.checked && this.orderInfo.goodsInfo[index].count < this.orderInfo.goodsInfo[index].goodsNum){
          this.orderInfo.goodsInfo[index].count += 1;
        }
      },
      goToBackMoney:function(){

      },
    }
  }
</script>
<style>
  #inputCenter input{
    text-align: center;
  }
</style>
<style scoped>
.el-table th>.cell{
  text-align: center;
}
.fl{
	float:left;
}
.clearfix{
	zoom:1;
}
.clearfix:after{
	content:"";
	clear:both;
	display:block;
}
.t_input_width{
	width:300px;
}
.t_select_width{
	width:220px;
}
.t_data_width{
	width:400px;
}
.detail_h3{
  margin-bottom:16px;
}
.detail_h4{
  border-bottom:1px solid #ccc;
  margin-bottom:8px;
  padding-bottom:4px;
}
/*订单信息*/
.order_header{
  background: #eee;
  /*height: 40px;*/
  line-height: 40px;
}
.order_box{
  position: relative;
  border: 1px solid #eee;
}
.order_content{
  width: 70%;
  padding: 20px 0;
  border-right: 1px solid #eee;
  border-top:1px solid #eee;
  box-sizing:border-box;
}
.order_sum{
  position: absolute;
  right: 0;
  top: -1px;
  width: 30%;
  border-left: none;
  text-align: center;
  box-sizing:border-box;
}
.order_content:nth-of-type(1){
  border-top: none;
}
.order_h{
  /*padding-top: 18px;*/
  line-height: 31px;
}
.img_list{
  text-align: center;
  margin-left: 18px;
  border: 1px solid #ccc;
  padding-left: 6px;
}
.goods_common{
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.i_col_red{
  color: red;
  font-style: normal;
}
.margin_l_30{
  margin-left: 30px;
}
/*支付方式*/
.pay_info{
  padding-bottom: 30px;
}
.pay_info li{
  height: 40px;
  line-height: 40px;
}
/*卖家备注*/
.seller_remark{
  height: 120px;
  padding-top: 20px;
  border-top: 1px solid #666;
}
.remark_content{
  padding-left: 60px;
}
/*退款信息*/
.refund_info{
  padding-top: 20px;
  border-top: 1px solid #666;
}
.refund_tb{
  width: 100%;
  border-collapse: collapse;/* 边框合并属性  */
  border: none;
  margin-top: 20px;
}
.refund_tb tr{
  width: 100%;
  height: 46px;
  border: 1px solid #ccc;
}
.bgc{
  background: #eee;
}
.refund_tb td{
  text-align: center;
  padding: 4px 2px;
  border: 1px solid #ccc;
}
.icon_i_l{
  font-style:normal;
  font-size:20px;
  padding-right:12px;
  cursor: pointer;
}
.icon_i_r{
  font-style:normal;
  font-size:20px;
  padding-left:12px;
  cursor: pointer;
}
.i_disabled{
  color: #ccc;
  cursor: default;
}

/* 仓库发货 */
.btn_{
  margin-left: 154px;
}
.btn_box{
  width: 260px;
  margin: 20px auto;
}
._btn{
  width: 120px;
}
</style>
