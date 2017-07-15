<template>
  <el-row class="incomeWrap">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>销售员管理</b></el-breadcrumb-item>
        <el-breadcrumb-item>收入列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col  class="toolbar" style="padding-bottom: 0px;padding-top:20px;">
      <el-form :inline="true" >
        <el-form-item>
          <el-input v-model="searchSaleContent">
            <el-select v-model="searchSaleType" slot="prepend" >
              <el-option label="手机号" value="手机号"></el-option>
              <el-option label="真实姓名" value="真实姓名"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="签收已过7天：">
          <el-select v-model="searchGetType">
            <el-option label="全部" value=""></el-option>
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收入状态：">
          <el-select v-model="searchMoneyType">
            <el-option label="全部" value=""></el-option>
            <el-option label="待结算" value="1"></el-option>
            <el-option label="已结算" value="2"></el-option>
            <el-option label="已取消" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结算日期：">
          <el-date-picker v-model="searchDataPrev" type="daterange" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="~">
          <el-date-picker  v-model="searchDataNext"  type="date"  placeholder="选择日期"  :picker-options="pickerOptions1"> </el-date-picker>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" v-on:click="search">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- <el-form :inline="true" >

    </el-form> -->
  </el-col>
  <el-table :data="getMoneyList"  border style="width: 100%">
    <!-- <el-table-column  prop="id"  width="200px"  align="center"  label="销售员编号"></el-table-column> -->
    <el-table-column prop="saleIncomeVo.saleName" align="center" label="真实姓名"></el-table-column>
    <el-table-column prop="saleIncomeVo.salePhone" align="center" label="手机号"></el-table-column>
    <el-table-column prop="orderId" align="center" label="订单编号"></el-table-column>
    <el-table-column prop="orderState" align="center" label="订单状态">
      <template scope="scope">
        <span v-if="scope.row.orderState == 0">订单取消</span>
        <span v-if="scope.row.orderState == 1">待付款</span>
        <span v-if="scope.row.orderState == 2">待发货</span>
        <span v-if="scope.row.orderState == 3">待收货</span>
        <span v-if="scope.row.orderState == 4">待评价</span>
        <span v-if="scope.row.orderState == 5">订单确认</span>
        <span v-if="scope.row.orderState == 6">退款退货中</span>
      </template>
    </el-table-column>
    <el-table-column prop="orderCreated" align="center" label="下单日期"></el-table-column>
    <el-table-column prop="saleIncomeVo.signLateSeven" align="center" label="签收已过7天">
      <template scope="scope">
        <span v-if="scope.row.saleIncomeVo.signLateSeven == 1">是</span>
        <span v-if="scope.row.saleIncomeVo.signLateSeven == 2">否</span>
      </template>s
    </el-table-column>
    <el-table-column prop="saleIncomeVo.getMoney" align="center" label="收入"></el-table-column>
    <el-table-column prop="saleIncomeVo.getState" align="center" label="收入状态">
      <template scope="scope">
        <span v-if="scope.row.saleIncomeVo.getState == 1">待结算</span>
        <span v-if="scope.row.saleIncomeVo.getState == 2">已结算</span>
        <span v-if="scope.row.saleIncomeVo.getState == 3">已取消</span>
      </template>
    </el-table-column>
    <el-table-column prop="saleIncomeVo.getUpdated" align="center" label="结算日期"></el-table-column>
    <el-table-column align="center" label="操作">
      <template scope="scope">
        <el-button v-on:click="incomeList(scope)">详情</el-button>
      </template>
    </el-table-column>
  </el-table>


  <el-dialog custom-class="asgagewgf" title="收入详情" :visible.sync="showIncomeInfor">
    <div class="personalInfor">
      <h3>销售员信息</h3>
      <div class="">
        <span>销售员编号：{{someOneUserDetails.saleId}}</span>
        <span>销售员姓名：{{someOneUserDetails.saleName}}</span>
        <span>销售员手机号：{{someOneUserDetails.salePhone}}</span>
      </div>
    </div>
    <div class="certification">
      <h3>用户信息</h3>
      <div class="">
        <span>用户编号：{{someOneUserDetails.userId}}</span>
        <span>用户姓名：{{someOneUserDetails.userName}}</span>
        <span>用户手机号：{{someOneUserDetails.userPhone}}</span>
      </div>
    </div>
    <h3>订单信息</h3>
    <div class="ordertable">
      <table class="datail_tb">
        <tr><td colspan="7"><span class="pad_l_30">下单时间：{{orderTime}}</span><span class="pad_l_30">订单状态：{{orderState}}</span></td></tr>
        <tr class="trs">
          <td>商品名称</td>
          <td>价格（元）</td>
          <td>数量</td>
          <td>小计</td>
          <td>退款金额（元）</td>
          <td>收入状态</td>
          <td>总收入元</td>
        </tr>
        <tr class="trs" v-for="(item, index) in infoList" :key="index">
          <td>{{item.itemName}}</td>
          <td>{{item.price}}</td>
          <td>{{item.num}}</td>
          <td>{{item.price*item.num}}</td>
          <td :rowspan="infoList.length" v-if="index == 0">{{item.refundMoney}}</td>
          <td :rowspan="infoList.length" v-if="index == 0">{{item.signUpdated}}</td>
          <td :rowspan="infoList.length" v-if="index == 0">{{item.totalFee}}</td>
        </tr>
      </table>
    </div>
    </el-dialog>
    <paging :childmsg="pageProps" class="pageC" @childSay="pageHandler"></paging>
  </el-row>
</template>
<script>
  import util from '../../../common/util'
  import paging from '../../website/brandLib/paging0'
  export default{
    data(){
      return {
        someOneUserDetails:{},
        getMoneyList:[],
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        infoList: [],
        showIncomeInfor:false,
        searchSaleContent: '',
        searchDataPrev:[],
        searchDataNext:null,
        searchSaleType:"手机号",
        searchMoneyType: "",
        searchGetType: "",
        nowUserMoneyNum:null,
        // selectSearchType:"用户编号",
        showChangeUserMoney:false,
        orderTime: '',
        orderState: '',
        pageProps: {
          pageNum: 1,
          totalPage: 1
        },
      }
    },
    components: {
      paging,
    },
    created: function() {
      var that = this;
      that.getAllIn();
    },
    methods: {
      //分页
      pageHandler:function(data){
        var that = this
        that.pageProps.pageNum = data
        that.getAllIn()
      },
      //获取收入列表
      getAllIn: function() {
        var that = this;
        if (that.searchDataPrev.length == 0 || util.formatDate.format(new Date(that.searchDataPrev[0])) == '1970-01-01') {
          var startDate = ''
          var endDate = ''
        } else {
          var startDate = util.formatDate.format(new Date(that.searchDataPrev[0]));
          var endDate = util.formatDate.format(new Date(that.searchDataPrev[1]));
        }
        if (that.searchSaleType == '手机号') {
          var salePhone = that.searchSaleContent
          var saleName = ''
        } else {
          var saleName = that.searchSaleContent
          var salePhone = ''
        }
        var obj = {
          saleName: saleName,
          salePhone: salePhone,
          signLateSeven : that.searchGetType,
          getState: that.searchMoneyType,
          startDate: startDate,
          endDate: endDate,
          currentPage: that.pageProps.pageNum,
          numberPerPage: 10,
          token: ''
        }
        that.global.axiosPostReq('/saleIncomeList/query',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            console.log(res.data)
            that.getMoneyList = res.data.data
            that.pageProps.totalPage = res.data.totalPage
          } else {
            that.$message.error('网络出错，请稍后再试！')
          }
        })
      },
      // 查看详情
      incomeList:function(scope){
        var that = this
        var obj = {
          saleId: scope.row.saleIncomeVo.saleId,
          orderId: scope.row.orderId,
          userId: scope.row.saleIncomeVo.userId,
        }
        console.log(scope.row,obj,'scope')
        that.global.axiosGetReq('/saleIncomeList/detail',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.someOneUserDetails = res.data.data;
            that.infoList = res.data.data.orderVoList;
            that.showIncomeInfor = true;
            console.log(res.data)
          } else {
            that.$message.error('网络出错，请稍后再试！')
          }
        })
      },
      // 查询收入列表
      search:function(){
        var that = this;
        if (that.searchDataPrev.length == 0 || util.formatDate.format(new Date(that.searchDataPrev[0])) == '1970-01-01') {
          var startDate = ''
          var endDate = ''
        } else {
          var startDate = util.formatDate.format(new Date(that.searchDataPrev[0]));
          var endDate = util.formatDate.format(new Date(that.searchDataPrev[1]));
        }
        if (that.searchSaleType == '手机号') {
          var salePhone = that.searchSaleContent
          var saleName = ''
        } else {
          var saleName = that.searchSaleContent
          var salePhone = ''
        }
        var obj = {
          saleName: saleName,
          salePhone: salePhone,
          signLateSeven : that.searchGetType,
          getState: that.searchMoneyType,
          startDate: startDate,
          endDate: endDate,
          currentPage: that.pageProps.pageNum,
          numberPerPage: 10,
          token: ''
        }
        that.global.axiosPostReq('/saleIncomeList/query',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.getMoneyList = res.data.data
            that.pageProps.totalPage = res.data.totalPage
            // for (var i = 0; i < that.getMoneyList.length; i++) {
            //   if (that.getMoneyList[i].orderVoList.length !== 0) {
            //     that.getMoneyList[i].orderCreated = that.getMoneyList[i].orderVoList[0].orderCreated
            //     that.getMoneyList[i].orderId = that.getMoneyList[i].orderVoList[0].orderId
            //     that.getMoneyList[i].orderState = that.getMoneyList[i].orderVoList[0].orderState
            //   }
            // }
            console.log(res.data,'222');
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      }
    },
  }
</script>

<style>
  .incomeWrap   .asgagewgf h3{
    font-weight: 500;
    line-height: 50px;
    color: #20a0ff;
  }
  .incomeWrap .el-select .el-input{
    width: 120px;
  }
  .incomeWrap   .asgagewgf .personalInfor{
    position: relative;
  }
  .incomeWrap   .asgagewgf .personalInfor img{
    position: absolute;
    top: 0;
    right: 0;
    width: 150px;
    height: 150px;
  }
  .incomeWrap   .asgagewgf  span{
    width: 30%;
    display: inline-block;
    line-height: 35px;
  }
  .incomeWrap .asgagewgf .ordertable span{
    display: inline-block;
    width: auto;
  }
  .incomeWrap .asgagewgf .ordertable td{
    line-height: 30px;
    padding-left: 10px;
  }
  .incomeWrap .asgagewgf .ordertable .maniCont{
    text-align: center;
  }
  .incomeWrap .asgagewgf .ordertable  .lastTr{
    color: red;
  }
  .incomeWrap .asgagewgf .ordertable  .lastTr td:nth-child(2){
    text-align: right;
    padding-right: 10px;
  }
  .datail_tb{
    width: 100%;
    border-collapse: collapse;/* 边框合并属性  */
    border: none;
    margin-top: 20px;
  }
  .datail_tb tr{
    width: 100%;
    height: 30px;
    line-height: 30px;
    border: 1px solid #ccc;
  }
  .datail_tb td{
    width: 100px;
    text-align: center;
    border: 1px solid #ccc;
  }
  .pageC {
    text-align: center;
    margin-top: 20px;
/*    bottom: 50px; 
    right: 20px; */
/*    left: 0px; 
    margin: 0 auto;*/
  }
</style>
