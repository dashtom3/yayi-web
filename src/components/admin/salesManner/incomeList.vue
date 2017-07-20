<template>
  <el-row class="incomeWrap">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>销售员管理</b></el-breadcrumb-item>
        <el-breadcrumb-item>销售员业绩列表</el-breadcrumb-item>
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
    <el-table-column prop="saleIncomeVo.saleName" align="center" label="销售额（元）"></el-table-column>
    <el-table-column prop="saleIncomeVo.salePhone" align="center" label="已退款金额（元）"></el-table-column>
    <el-table-column prop="saleIncomeVo.salePhone" align="center" label="实际销售额（元）"></el-table-column>
<!--     <el-table-column prop="orderId" align="center" label="订单编号"></el-table-column>
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
    </el-table-column> -->
    <el-table-column prop="saleIncomeVo.getMoney" align="center" label="收入" sortable></el-table-column>
    <el-table-column prop="saleIncomeVo.salePhone" align="center" label="收入所属年月"></el-table-column>
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

  <el-button @click="details">详情</el-button>  
  <el-dialog custom-class="asgagewgf" title="收入详情" :visible.sync="showIncomeInfor" size="large">
    <div class="personalInfor">
      <h3>销售员信息</h3>
      <div class="">
        <span>销售员姓名：{{someOneUserDetails.saleName}}</span>
        <span>销售员手机号：{{someOneUserDetails.salePhone}}</span>
      </div>
    </div>
    <div class="certification">
      <h3>业绩统计</h3>
      <div class="">
        <span>收入所属年月：{{someOneUserDetails.userId}}</span>
        <span>收入状态：{{someOneUserDetails.userName}}</span>
      </div>
      <el-table :data="inComeTableData" border show-summary style="width: 100%">
        <el-table-column prop="type" label="商品类型">
        </el-table-column>
        <el-table-column prop="salesMoney" label="销售额（元）">
        </el-table-column>
        <el-table-column prop="returnMoney" label="已退款金额（元）">
        </el-table-column>
        <el-table-column prop="actualMoney" label="实际销售额（元">
        </el-table-column>
        <el-table-column prop="inCome" label="收入">
        </el-table-column>
      </el-table>
    </div>
    <h3>业绩明细</h3>
    <el-table :data="inComeDetailTableData" border style="width: 100%">
      <el-table-column prop="orderId" label="订单编号">
      </el-table-column>
      <el-table-column prop="name" label="客户姓名">
      </el-table-column>
      <el-table-column prop="phone" label="客户手机号">
      </el-table-column>
      <el-table-column prop="orderState" label="订单状态">
        <template scope="scope">
          <span v-if="scope.row.orderState == 1">待结算</span>
          <span v-if="scope.row.orderState == 2">已结算</span>
          <span v-if="scope.row.orderState == 3">已取消</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalPrice" label="商品总价（元）">
      </el-table-column>
      <el-table-column prop="haocai" label="耗材类（元）">
      </el-table-column>
      <el-table-column prop="gongju" label="工具设备类（元）">
      </el-table-column>
      <el-table-column prop="returnMoneyH" label="已退款金额--耗材类（元）">
      </el-table-column>
      <el-table-column prop="returnMoneyG" label="已退款金额--工具设备类（元）">
      </el-table-column>
      <el-table-column prop="actualMoney" label="实际销售额（元）">
      </el-table-column>
      <el-table-column prop="orderDate" label="下单时间">
      </el-table-column>
    </el-table>
<!--     <div class="ordertable">
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
    </div> -->
    </el-dialog>
    <div class="block">
      <!-- 分页 -->
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" layout="prev, pager, next, jumper" :total="totalCount" v-show="this.totalCount > this.pagesize">
      </el-pagination>
      <!-- 分页 -->
    </div>
  </el-row>
</template>
<script>
  import util from '../../../common/util'
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
        //默认每页数据量
        pagesize: 10,
        //当前页码
        currentPage: 1,
        //默认数据总数
        totalCount: 1000,
        // 业绩统计
        inComeTableData: [{
          type: '耗材类',
          salesMoney: '90',
          returnMoney: '30',
          actualMoney: '60',
          inCome: '60'
        }, {
          type: '工具设备类',
          salesMoney: '9',
          returnMoney: '3',
          actualMoney: '6',
          inCome: '6'
        }, {
          type: '耗材类',
          salesMoney: '100',
          returnMoney: '310',
          actualMoney: '66',
          inCome: '80'
        }],
        // 业绩明细
        inComeDetailTableData: [{
          orderId: '112211221',
          name: '小辉哥',
          phone: '15900000000',
          orderState: 1,
          totalPrice: 60,
          haocai: 30,
          gongju: 30,
          returnMoneyH: 0,
          returnMoneyG: 0,
          actualMoney: 60,
          orderDate: '2017-6-17',
        }],
      }
    },
    created: function() {
      var that = this;
      that.getAllIn();
    },
    methods: {
      //分页
      handleCurrentChange(val) {
        var that = this
        that.currentPage = val
        that.search(val)
      },
      details: function() {
        var that = this
        that.showIncomeInfor = true
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
          currentPage: that.currentPage,
          numberPerPage: that.pagesize,
          token: ''
        }
        that.global.axiosPostReq('/saleIncomeList/query',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            console.log(res.data)
            that.getMoneyList = res.data.data
            that.totalCount = res.data.totalNumber;
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
        }).catch(function (error) {
          that.$message.error('网络出错，请稍后再试！')
          console.log(error,'oopio')
        });
      },
      // 查询收入列表
      search:function(val){
        var that = this;
        if (val == undefined || typeof(val) == 'object') {
          that.currentPage = 1
        } else {
          that.currentPage = val
        }
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
          currentPage: that.currentPage,
          numberPerPage: that.pagesize,
          token: ''
        }
        that.global.axiosPostReq('/saleIncomeList/query',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.getMoneyList = res.data.data
            that.totalCount = res.data.totalNumber;
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
</style>
