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
          <el-select v-model="value"  class="t_select_width">
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
          </template>
        </el-table-column> 
        <el-table-column prop="state" label="订单状态" min-width="120" align="center" >
          <template scope="scope">
            <span v-if="scope.row.state == '1'">等待买家付款</span>
            <span v-if="scope.row.state == '2'">买家已付款</span>
            <span v-if="scope.row.state == '5'">订单已确认</span>
            <span v-if="scope.row.state == '3'">卖家已发货</span>
            <span v-if="scope.row.state == '4'">交易成功</span>
            <span v-if="scope.row.state == '9'">交易成功</span>
            <span v-if="scope.row.state == '10'">买家已付款</span>
            <span v-if="scope.row.state == '0'">交易关闭</span>
          </template>
        </el-table-column>
        <el-table-column prop="shippingName" label="物流信息" min-width="150" align="center" >
          <template scope="scope">
            <span>{{scope.row.shippingName}}</span><br>
            <span>{{scope.row.shippingCode}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="refund" label="是否退款" min-width="100" align="center" >
          <template scope="scope">
            <span v-if="scope.row.refundInfo=='是'">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column prop="handle" label="操作" min-width="180" align="center" >
          <template scope="scope">
            <el-button  size="mini"  type="info"  @click="getOneOrderDetailsById(scope.$index, scope.row)">详情</el-button>
            <el-button  size="mini"  v-show='scope.row.state!=0&&scope.row.state!=4'  @click="handleClose(scope.$index, scope.row)">关闭交易</el-button>
            <el-button  size="mini"  type="success"  v-show='scope.row.state === "2"'  @click="handleSure(scope.$index, scope.row)">确认订单</el-button>
            <el-button  size="mini"  type="danger"  v-show='scope.row.state!=0 && scope.row.state!=1 && scope.row.refundInfo!="是"'  @click="handleDrawback(scope.$index, scope.row)">退款处理</el-button>
            <el-button  size="mini"  v-show='scope.row.refundInfo=="是"'  @click="lookAtTuiKuanOrder(scope.$index, scope.row)">查看退款</el-button>
            <el-button  size="mini"  type="primary"  v-show='scope.row.state === "5"'  @click="handleDelivery(scope.$index, scope.row)">仓库发货</el-button>
          </template>
        </el-table-column>
      </el-table> 

      <div class="block">
        <!-- 分页 -->
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" layout="prev, pager, next, jumper" :total="totalCount" v-show="this.totalCount > this.pagesize">
        </el-pagination>
        <!-- 分页 -->
      </div>
      <!-- 发票详情 -->
      <el-dialog  title="发票详情" :visible.sync="lookAtFaPiaoWrap" size="tiny" >
        <ul v-if="thisOrderInvoice" class="invoiceDetails">
          <li v-if="thisOrderInvoice.invoiceStyle"><span>发票类型：</span><span>{{thisOrderInvoice.invoiceStyle==1?"增值税发票":"普通发票"}}</span></li>
          <li v-if="thisOrderInvoice.invoiceState"><span>发票性质：</span><span>{{thisOrderInvoice.invoiceState==0?"个人":"公司"}}</span></li>
          <li v-if="thisOrderInvoice.companyName"><span>{{thisOrderInvoice.invoiceState==0?"发票抬头":"发票抬头"}}：</span><span>{{thisOrderInvoice.companyName}}</span></li>
          <li v-if="thisOrderInvoice.taxpayerNum"><span>纳税人识别号：</span><span>{{thisOrderInvoice.taxpayerNum}}</span></li>
          <li v-if="thisOrderInvoice.registeredAddress"><span>纳税人识别号：</span><span>{{thisOrderInvoice.registeredAddress}}</span></li>
          <li v-if="thisOrderInvoice.registeredPhone"><span>注册电话：</span><span>{{thisOrderInvoice.registeredPhone}}</span></li>
          <li v-if="thisOrderInvoice.opneBank"><span>开户行：</span><span>{{thisOrderInvoice.opneBank}}</span></li>
          <li v-if="thisOrderInvoice.bankNumber"><span>卡号：</span><span>{{thisOrderInvoice.bankNumber}}</span></li>
          <li v-if="thisOrderInvoice.stickNanme"><span>收票人姓名：</span><span>{{thisOrderInvoice.stickNanme}}</span></li>
          <li v-if="thisOrderInvoice.stickPhone"><span>收票人电话：</span><span>{{thisOrderInvoice.stickPhone}}</span></li>
          <li v-if="thisOrderInvoice.stickaddress"><span>收票人地址：</span><span>{{thisOrderInvoice.stickaddress}}</span></li>
          <li v-if="thisOrderInvoice.invoiceHead"><span>发票抬头：</span><span>{{thisOrderInvoice.invoiceHead}}</span></li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="lookAtFaPiaoWrap = false">关 闭</el-button>
        </span>
      </el-dialog>

      <!--详情界面-->
      <el-dialog v-if="nowOrderDetails" title="订单详情" v-model="detailVisible" size="small" :close-on-click-modal="true" :before-close="handleCloseDetails">
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
          <el-col :span="7" align="center">实际付款<div class="grid-content bg-purple"></div></el-col>
          <el-col :span="7"><div class="grid-content bg-purple"></div></el-col>
        </div>
        <div class="order_box clearfix">
          <div class="order_content fl" v-for="item in nowOrderDetails.orderitemList" :key="item"> 
            <el-col :span="4" align="center"><div class="grid-content bg-purple"><img style="width:50px;" :src="item.picPath" alt="图片无法显示"></div></el-col>
            <el-col :span="5" align="center">{{item.itemInfo.itemName}}<br />{{item.itemPropertyNamea}}<span v-if="item.itemPropertyNameb">;</span>{{item.itemPropertyNameb}}<span v-if="item.itemPropertyNamec">;</span>{{item.itemPropertyNamec}}<div class="grid-content bg-purple"></div></el-col>
            <el-col :span="5" align="center">{{item.itemSKU}}<div class="grid-content bg-purple"></div></el-col>
            <el-col :span="5" align="center">{{item.price}}<div class="grid-content bg-purple"></div></el-col>
            <el-col :span="5" align="center">{{item.num}}<div class="grid-content bg-purple"></div></el-col>
          </div>
          <div class="order_sum fl">
            <div class="order_h">{{'￥'+nowOrderDetails.actualPay}}</div>
            <div class="order_h">{{'（含运费: '+nowOrderDetails.postFee+ '）'}}</div>
            <div class="order_h">{{'（乾币已抵扣: '+nowOrderDetails.qbDed+ '）'}}</div>
          </div>
        </div>
        <div class="pay_info clearfix">
          
          <ul class="fl" style="width:130px;">
            <li v-if="nowOrderDetails.payType">支付方式</li>
            <li>发票</li>
            <li>产品注册证</li>
            <li>订单留言</li>
          </ul>
          <ul class="fl">
            <li v-if="nowOrderDetails.payType">
              <div v-if="nowOrderDetails.payType==1"> 微信支付 </div>
              <div v-else-if="nowOrderDetails.payType==0">支付宝支付</div>
            </li>
            <li>
              <div v-if="nowOrderDetails.invoiceHand==0">不申请发票</i></div>
              <div v-else><el-button class="_btn" @click="lookAtFaPiaoFun(nowOrderDetails)">查看发票详情</el-button></div>
            </li>
            <li>
              <div v-if="nowOrderDetails.isRegister==0">不需要产品认证</div>
              <div v-else>需要产品认证</div>
            </li>
            <li>
              <div v-if="!nowOrderDetails.buyerMessage"> 留言为空 </div>
              <div v-else>{{nowOrderDetails.buyerMessage}}</div>
            </li>
          </ul>
        </div>
        <div class="refund_info" v-if="nowOrderDetails.refundInfo=='是'">
          <div>退款信息</div>
          <table class="refund_tb">
            <tr class="bgc">
            <td colspan="7" style="text-align:left;"><span style="padding-left:20px;">实付款：{{'￥'+nowOrderDetails.actualPay}}</span><span style="padding-left:100px;">运费：{{nowOrderDetails.actualPay}}</span><span style="padding-left:100px;">乾币抵扣：{{'￥'+nowOrderDetails.qbDed}}</span></td>
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
            <tr v-for="(item, index) in nowOrderDetails.orderitemList" :key="item" v-show="item.refunNum>0">
              <td>{{item.itemSKU}}</td>
              <td>{{item.itemInfo.itemName}}</td>
              <td>{{item.price + '*' + (parseInt(item.num))}}</td>
              <td>{{item.refunNum}}</td>
              <td :rowspan="nowOrderDetails.tuikuanzhonglei" v-if="index==0" >{{nowOrderDetails.refundAmt}}</td>
              <td :rowspan="nowOrderDetails.tuikuanzhonglei" v-if="index==0"  >{{nowOrderDetails.untread}}</td>
              <td :rowspan="nowOrderDetails.tuikuanzhonglei" v-if="index==0"  >{{nowOrderDetails.outCoins}}</td>
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
              <td colspan="7" style="text-align:left;">
                <span style="padding-left:20px;">订单编号：{{orderInfo.orderId}}</span>
                <span style="padding-left:100px;">乾币抵扣：{{orderInfo.qbDed}}</span>
              </td>
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
            <tr v-for="(item, index) in orderInfo.orderitemList" :key="index" style="height:46px;">
              <td>
                <template>
                  <el-checkbox v-model="item.checked" size="small"></el-checkbox>
                </template>
              </td>
              <td>{{item.itemName}}</td>
              <td>{{item.price + '*' + item.num}}</td>
              <td style="width:200px;position:relative;">
                <div id="inputCenter" v-show="item.num" style="position:absolute;top:4px;">
                  <i style="position:absolute;left:30px;top:2px;" class="icon_i_l" :class="{i_disabled: !item.checked}" @click="reduceCount(index, item)">-</i>
                  <el-input v-model="item.count" :disabled="!item.checked" style="width:88px;position:absolute;left:60px;"></el-input>
                  <i style="position:absolute;left:150px;top:2px" class="icon_i_r" :class="{i_disabled: !item.checked}" @click="addCount(index, item)">+</i>
                </div>
              </td>
              <td :rowspan="orderInfo.orderitemList.length" v-if="index == 0">{{orderInfo.refundAmt}}</td>
              <td :rowspan="orderInfo.orderitemList.length" v-if="index == 0">{{orderInfo.untread}}</td>
              <td :rowspan="orderInfo.orderitemList.length" v-if="index == 0">{{orderInfo.outCoins}}</td>
            </tr>
          </table>
          <div class="btn_box">
            <el-button class="_btn" type="primary" @click="goToBackMoney()">保存</el-button>
            <el-button class="_btn" @click="refundVisible = false">取消</el-button>
          </div>
      </el-dialog>

      <!-- 查看退款 -->
      <el-dialog title="退款详情" v-model="lookTuiKun" :close-on-click-modal="true">
        <table class="refund_tb">
            <tr class="bgc">
              <td colspan="7" style="text-align:left;">
                <span style="padding-left:20px;">订单编号：{{orderInfo.orderId}}</span>
                <span style="padding-left:100px;">乾币抵扣：{{orderInfo.qbDed}}</span>
              </td>
            </tr>
            <tr class="bgc">
              <td>商品名称+属性</td>
              <td>价格*数量</td>
              <td>退货数量</td>
              <td>退款金额</td>
              <td>退回乾币数</td>
              <td>扣除乾币数</td>
            </tr>
            <tr v-for="(item, index) in orderInfo.orderitemList" :key="item" style="height:46px;" v-if="item.refunNum>=1">
              <td>{{item.itemName}}<br />{{item.itemPropertyNamea}}<span v-if="item.itemPropertyNameb">;</span>{{item.itemPropertyNameb}}<span v-if="item.itemPropertyNamec">;</span>{{item.itemPropertyNamec}}</td>
              <td>{{item.price + '*' + item.num}}</td>
              <td style="width:200px;position:relative;">
                <div id="inputCenter" v-show="item.num" style="position:absolute;top:4px;">
                  <el-input v-model="item.refunNum" :disabled="true" style="width:88px;position:absolute;left:60px;"></el-input>
                </div>
              </td>
              <td :rowspan="orderInfo.orderitemList.length" v-if="index == 0">{{orderInfo.refund.returnMoney}}</td>
              <td :rowspan="orderInfo.orderitemList.length" v-if="index == 0">{{orderInfo.refund.returnQb}}</td>
              <td :rowspan="orderInfo.orderitemList.length" v-if="index == 0">{{orderInfo.refund.dedQb}}</td>
            </tr>
          </table>
          <div class="btn_box">
            <el-button class="_btn" style="margin:auto;display:block" @click="lookTuiKun = false">关闭</el-button>
          </div>
      </el-dialog>
    </el-col>
	</el-row>
</template>

<script>
  export default {
    data() {
      return {
        thisOrderInvoice:null,
        lookAtFaPiaoWrap:false,
        lookTuiKun:false,
        //默认每页数据量
        pagesize: 10,
        //当前页码
        currentPage: 1,
        //默认数据总数
        totalCount: 1000,
        // wuliu:[
        //   {value:"申通快递",label:"申通快递"}
        // ],
        wacthTuiKuanList:[],
        pageProps:null,
        nowOrderDetails:null,
        wuLiuBianHao:null,
        wuliu:"STO",
        //订单状态
        state: [
            {value: '',label: '全部'},
            {value: '1',label: '等待买家付款'},
            {value: '2',label: '买家已付款'},
            {value: '5',label: '订单已确认'},
            {value: '3',label: '卖家已发货'},
            {value: '4',label: '交易成功'},
            {value: '0',label: '交易关闭'},
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
    created:function(){
      var that = this;
      that.getOrderList();
    },
    watch:{
      wacthTuiKuanList:{
        handler:function(){
          var that = this;
          that.orderInfo.refundAmt = 0;
          that.orderInfo.untread = 0;
          that.orderInfo.outCoins = 0;
          var money = 0;
          var jiSuanArr = [];
          for(let i in that.wacthTuiKuanList){
            var obj = {
              goodBrandName:that.wacthTuiKuanList[i].itemBrandName,
              goodSort:that.wacthTuiKuanList[i].itemType,
              price:that.wacthTuiKuanList[i].price
            };
            if(that.wacthTuiKuanList[i].checked){
              that.orderInfo.refundAmt += that.wacthTuiKuanList[i].count * that.wacthTuiKuanList[i].price;
              money += that.wacthTuiKuanList[i].count * that.wacthTuiKuanList[i].price;
              obj.num = parseInt(that.wacthTuiKuanList[i].num) - parseInt(that.wacthTuiKuanList[i].count);
            }else{
              obj.num = that.wacthTuiKuanList[i].num;
            }
            jiSuanArr.push(obj);
          }
          //显示退款金额最终数据
          if(that.orderInfo.actualPay<=that.orderInfo.refundAmt){
            that.orderInfo.refundAmt = that.orderInfo.actualPay;//退还的钱
          }
          //显示退款退回钱币最终数据    当退款的金额 大于 实际支付的金额，
          that.orderInfo.untread = money - that.orderInfo.refundAmt;
          //显示退款扣除钱币数据
          that.orderInfo.outCoins = that.orderInfo.giveQb - this.global.goodToMoney(jiSuanArr); //扣除乾币数
        },
        deep:true
      },

    },
    methods: {
      lookAtFaPiaoFun:function(order){
        console.log(order);
        var that = this;
        var obj = {
          orderId:order.orderId
        };
        that.global.axiosPostReq('/showUserOrderManage/queryOrderInvoice',obj)
        .then((res) => {
          console.log(res,"lookAtFaPiaoFun")
          if (res.data.callStatus === 'SUCCEED') {
          that.lookAtFaPiaoWrap = true;
           that.thisOrderInvoice = res.data.data
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      handleCloseDetails:function(){
        this.nowOrderDetails = null;
      },
      jisuanbuzhidao:function(list){
        var that = this;
          var refundAmt = 0;
          var untread = 0;
          var outCoins = 0;
          var jiSuanArr = [];
          for(let i in list){
            var obj = {
              goodBrandName:list[i].itemBrandName,
              goodSort:list[i].itemType,
              price:list[i].price
            };
            if(list[i].checked){
              refundAmt += list.refunNum * list.price;
              // money += list.refunNum * list.price;
              obj.num = parseInt(list[i].num) - parseInt(list.refunNum);
            }else{
              obj.num = list[i].num;
            }
            jiSuanArr.push(obj);
          }
          //显示退款金额最终数据
          
          //显示退款退回钱币最终数据    当退款的金额 大于 实际支付的金额，
          // untread = money - refundAmt;
          //显示退款扣除钱币数据
          outCoins =  this.global.goodToMoney(jiSuanArr); //计算剩余数量的东西赠送的铅笔
          console.log(outCoins)
          var returnObj = {
            refundAmt:refundAmt,
            untread:untread,
            outCoins:outCoins,
          };
          return returnObj;
      },
      lookAtTuiKuanOrder:function(index,row){
        var that = this;
        var obj = {
          orderId:row.orderId
        };
        console.log(obj)
        that.lookTuiKun = true;
        that.global.axiosPostReq('/showUserOrderManage/showRefundOrderMessage',obj)
        .then((res) => {
          console.log(res,"lookAtTuiKuanOrder")
          if (res.data.callStatus === 'SUCCEED') {
            that.orderInfo = res.data.data;
          } else {
            that.$message.error('错误，请刷新页面！');
          }
        })
      },
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
        if(that.orderCode){
          obj.orderId = that.orderCode;
        }
        if(that.buyerInfo){
          obj.buyerInfo = that.buyerInfo;
        }
        if(that.value){
          // 订单状态
          // {value: '0',label: '全部'},
              // for(let b in that.state){
              //   if(that.state[b].label==that.value&&that.state[b].value!="0"){
              //     obj.state = that.state[b].value;
              //   }
              // }
              if(that.value!="全部"){
                obj.orderState = that.value;
              }
        }
        if(that.value3.length!=0){
          console.log(that.value3,"11111111")
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
        // if(that.value1){
        //   // 退款状态
        //     for(let a in that.drawback){
        //       if(that.value1 == that.drawback[a].label1){
        //         obj.isRefund = that.drawback[a].value1;
        //       }
        //     }
        // }
        obj.currentPage = data;
        obj.numberPerpage = 10;
        that.global.axiosGetReq('/showUserOrderManage/showOrder',obj)
        .then((res) => {
          console.log(res,"getOrderList")
          if (res.data.callStatus === 'SUCCEED') {
            that.orderList = res.data.data;
            that.totalCount=res.data.totalNumber;
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
        console.log(obj)
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
        if(that.orderCode){
          obj.orderId = that.orderCode;
        }
        if(that.buyerInfo){
          obj.buyerInfo = that.buyerInfo;
        }
        if(that.value){
          // 订单状态
              if(that.value!="全部"){
                obj.orderState = that.value;
              }
        }
        if(that.value3.length!=0){
          console.log(that.value3,"22222222222")
          var date1,date2;
          if(that.value3[0]){
            date1 = that.value3[0].toLocaleString();
            date2 = that.value3[1].toLocaleString();
          }
          date1 = date1.split(" ");
          date2 = date2.split(" ");
          date1 = date1[0].split("/").join("-");
          date2 = date2[0].split("/").join("-");
          obj.orderCTime = date1;
          obj.orderETime = date2;
        }
        if(that.value1){
          console.log(that.value1)
          // 退款状态
          if(that.value1=="全部"){
            obj.isRefund = "";
          }else if(that.value1==1){
            obj.isRefund = "是";
          }else if(that.value1==2){
            obj.isRefund = "否";
          }
        }
        console.log(obj,"searchObj")
        that.global.axiosPostReq('/showUserOrderManage/showOrder',obj)
        .then((res) => {
          console.log(res,"searchOrderList")
          if (res.data.callStatus === 'SUCCEED') {
            that.orderList = res.data.data;
            that.totalCount=res.data.totalNumber;
            that.currentPage = 1;
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
        that.global.axiosPostReq('/showUserOrderManage/queryOrderDetails',obj)
        .then((res) => {
          console.log(res,"getOneOrderDetailsById")
          if (res.data.callStatus === 'SUCCEED') {
            this.detailVisible = true;
            this.nowOrderDetails = res.data.data;
            var num = 0;
            var allMoney = 0;
            var arr = [];
            for(let i in this.nowOrderDetails.orderitemList){
              if(this.nowOrderDetails.orderitemList[i].refunNum>0){
                num += 1;
                var datqa = this.nowOrderDetails.orderitemList[i];
                datqa.num = parseInt(datqa.num) - parseInt(datqa.refunNum);
                arr.push(datqa);
                allMoney += this.nowOrderDetails.orderitemList[i].refunNum * this.nowOrderDetails.orderitemList[i].price;
              }
            }
            // console.log(this.global.goodToMoney(arr),"0000");
            this.nowOrderDetails.tuikuanzhonglei = num;
            // 计算
            var returndata = this.jisuanbuzhidao(this.nowOrderDetails.orderitemList);
            this.nowOrderDetails.outCoins = 0;
            this.nowOrderDetails.refundAmt = 0;
            this.nowOrderDetails.untread = 0;
            if(this.nowOrderDetails.actualPay<=allMoney){
              this.nowOrderDetails.refundAmt = this.nowOrderDetails.actualPay;
              this.nowOrderDetails.untread = allMoney - this.nowOrderDetails.actualPay;
            }else{
              this.nowOrderDetails.refundAmt = this.nowOrderDetails.actualPay;
              // this.nowOrderDetails.untread = allMoney - this.nowOrderDetails.actualPay;
            }
            this.nowOrderDetails.outCoins = this.nowOrderDetails.giveQb - returndata.outCoins;

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
          isRefund:"",
          currentPage:this.currentPage
        };
        that.global.axiosPostReq('/showUserOrderManage/showOrder')
        .then((res) => {
          console.log(res,"getOrderList")
          if (res.data.callStatus === 'SUCCEED') {
            that.orderList = res.data.data;
          // that.pagesize=res.data.totalPage;
            //当前页码
            // that.currentPage=res.data.currentPage;
            //默认数据总数
            that.totalCount=res.data.totalNumber;
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
        var that = this;
        var obj = {
          orderId:row.orderId
        };
        that.tuiKuanIndex = index;
        that.global.axiosPostReq('/showUserOrderManage/showRefundProcessing',obj)
        .then((res) => {
          console.log(res,"getOneOrderDetailsById")
          if (res.data.callStatus === 'SUCCEED') {
            for(let i in res.data.data.orderitemList){
              res.data.data.orderitemList[i].count = 1;
              res.data.data.orderitemList[i].checked= false;
            }
            res.data.data.refundAmt = 0;//退金额
            res.data.data.untread = 0;//返回钱币
            res.data.data.outCoins = 0;//扣除钱币
            that.orderInfo = res.data.data;
            this.refundVisible = true;
            this.wacthTuiKuanList = that.orderInfo.orderitemList;
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      //仓库发货
      handleDelivery(index, row) {
        var that = this;
        that.deliveryVisible = true;
        that.faHuoOrder = row;
        that.fahuoIndex = index;
      },
      reduceCount(index, item){
        if(item.checked && this.orderInfo.orderitemList[index].count !== 1){
          var data = this.orderInfo.orderitemList[index];
          data.count -=1;
          this.orderInfo.orderitemList.splice(index,1,data);
          // this.orderInfo.orderitemList[index].count -= 1;
        }
      },
      addCount(index, item){
        if(item.checked && this.orderInfo.orderitemList[index].count < this.orderInfo.orderitemList[index].num){
          var data = this.orderInfo.orderitemList[index];
          data.count +=1;
          this.orderInfo.orderitemList.splice(index,1,data);
          // this.orderInfo.orderitemList[index].count += 1;
        }
      },
      goToBackMoney:function(){ 
        var that = this;
        var data = that.wacthTuiKuanList;
        var sendObj = {
          orderItem:[]
        };
        for(let i in data){
          if(data[i].checked){
            var obj = {
              orderId:that.orderInfo.orderId,
              refunNum:data[i].count,
              itemSKU:data[i].itemSKU
            };
            sendObj.orderItem.push(obj);
          }
        }
        if(sendObj.orderItem.length==0){
          that.$alert('请至少选择一件退款的商品',  {confirmButtonText: '确定',});
        }else{
          sendObj.orderItem = JSON.stringify(sendObj.orderItem);
          console.log(sendObj)
          that.global.axiosPostReq('/showUserOrderManage/makeRefundData',sendObj)
          .then((res) => {
            console.log(res)
            if (res.data.callStatus === 'SUCCEED') {
              // var data = that.orderList[that.tuiKuanIndex];
              // data.state = 10;
              // that.orderList.splice(that.tuiKuanIndex,1,data);
              that.refundVisible = false;
              that.getOrderList();
            } else {
              that.$message.error('网络出错，请稍后再试！');
            }
          })
        }
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
.invoiceDetails li {
  line-height:40px;
}
.invoiceDetails li span:nth-child(1){
  display:inline-block;
  width:100px;
  text-align: right;
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
