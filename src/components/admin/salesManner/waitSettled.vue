<template>
  <el-row class="incomeWrap">
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
        <el-form-item label="收入所属年月">
          <el-date-picker
            v-model="beYearMonth"
            type="month"
            placeholder="选择月">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="search">查询</el-button>
        </el-form-item>
      </el-form>
  </el-col>
  <el-table :data="getMoneyList"  border style="width: 100%">
    <el-table-column prop="saleName" align="center" label="真实姓名"></el-table-column>
    <el-table-column prop="salePhone" align="center" label="手机号"></el-table-column>
    <el-table-column prop="allMoney" align="center" label="销售额（元）"></el-table-column>
    <el-table-column prop="moneyRefund" align="center" label="已退款金额（元）"></el-table-column>
    <el-table-column prop="allActual" align="center" label="实际销售额（元）"></el-table-column>
    <el-table-column prop="getMoney" align="center" label="收入"></el-table-column>
    <el-table-column prop="beYearMonth" align="center" label="收入所属年月"></el-table-column>
<!--     <el-table-column prop="settlementTime" align="center" label="结算日期"></el-table-column> -->
    <el-table-column align="center" label="操作">
      <template scope="scope">
        <el-button v-on:click="details(scope)">详情</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog custom-class="asgagewgf" title="销售员业绩详情" :visible.sync="showIncomeInfor" size="large">
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
        <span>收入所属年月：{{someOneUserDetails.date}}</span>
        <span>收入状态：{{someOneUserDetails.state}}</span>
      </div>
      <el-table :data="inComeTableData" border show-summary style="width: 100%">
        <el-table-column prop="type" label="商品类型">
        </el-table-column>
        <el-table-column prop="salesMoney" label="销售额（元）">
        </el-table-column>
        <el-table-column prop="returnMoney" label="已退款金额（元）">
        </el-table-column>
        <el-table-column prop="actualMoney" label="实际销售额（元）">
        </el-table-column>
        <el-table-column prop="inCome" label="收入">
        </el-table-column>
      </el-table>
    </div>
    <h3>业绩明细</h3>
    <el-table :data="inComeDetailTableData" border style="width: 100%">
      <el-table-column prop="orderId" label="订单编号">
      </el-table-column>
      <el-table-column prop="userName" label="客户姓名">
      </el-table-column>
      <el-table-column prop="userPhone" label="客户手机号">
      </el-table-column>
      <el-table-column prop="state" label="订单状态">
        <template scope="scope">
          <span v-if="scope.row.state == 1">待结算</span>
          <span v-if="scope.row.state == 2">已结算</span>
          <span v-if="scope.row.state == 3">已取消</span>
        </template>
      </el-table-column>
      <el-table-column prop="itemSumMoney" label="商品总价（元）">
      </el-table-column>
      <el-table-column prop="orderMoneyHaocai" label="耗材类（元）">
      </el-table-column>
      <el-table-column prop="orderMoneyGongju" label="工具设备类（元）">
      </el-table-column>
      <el-table-column prop="refundMoneyHaocai" label="已退款金额--耗材类（元）">
      </el-table-column>
      <el-table-column prop="refundMoneyGongju" label="已退款金额--工具设备类（元）">
      </el-table-column>
      <el-table-column prop="actualMoney" label="实际销售额（元）">
      </el-table-column>
      <el-table-column prop="orderCreated" label="下单时间">
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
        beYearMonth: '',
        someOneUserDetails:{
          saleName: '',
          salePhone: '',
          date: '',
          state: '',
        },
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
        inComeTableData: [],
        // 业绩明细
        inComeDetailTableData: [],
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
      // 查看详情
      details: function(scope) {
        var that = this
        console.log(scope.row,'详情')
          var obj = {
          saleId: scope.row.saleId,
          beYearMonth: scope.row.beYearMonth,
          getState: scope.row.getState,
          // startDate: startDate,
          // endDate: endDate,
          currentPage: that.currentPage,
          numberPerPage: that.pagesize,
        }
        that.global.axiosGetReq('/saleIncomeList/detail',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            console.log(res.data,'详情接口')
            that.someOneUserDetails.saleName = res.data.data.saleName
            that.someOneUserDetails.salePhone = res.data.data.salePhone
            that.someOneUserDetails.date = scope.row.beYearMonth
            that.someOneUserDetails.state = scope.row.getState
            var objData = res.data.data.saleDataStatistics
            that.inComeTableData = []
            var obj1 = {
              type: '耗材类',
              salesMoney: objData.haocaiMoney,
              returnMoney: objData.haocaiRefund,
              actualMoney: objData.haocaiActual,
              inCome: '60'
            }
            var obj2 = {
              type: '工具设备类',
              salesMoney: objData.gongjuMoney,
              returnMoney: objData.gongjuRefund,
              actualMoney: objData.gongjuActual,
              inCome: '60'
            }
            that.inComeTableData.push(obj1,obj2)
            // that.getMoneyList = res.data.data
            that.inComeDetailTableData = res.data.data.orderVoList
            that.totalCount = res.data.totalNumber;
          } else {
            that.$message.error('网络出错，请稍后再试！')
          }
        })
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
          beYearMonth: that.beYearMonth,
          startDate: startDate,
          endDate: endDate,
          currentPage: that.currentPage,
          numberPerPage: that.pagesize,
        }
        that.global.axiosPostReq('/saleIncomeList/queryNot',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            console.log(res.data,'pppap')
            that.getMoneyList = res.data.data
            that.totalCount = res.data.totalNumber;
          } else {
            that.$message.error('网络出错，请稍后再试！')
          }
        })
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
        if (that.beYearMonth !== '') {
          that.beYearMonth = util.formatDate.format(new Date(that.beYearMonth)).substring(0,7)
        } else {
          that.beYearMonth = ''
        }
        var obj = {
          saleName: saleName,
          salePhone: salePhone,
          beYearMonth: that.beYearMonth,
          startDate: startDate,
          endDate: endDate,
          currentPage: that.currentPage,
          numberPerPage: that.pagesize,
        }
        that.global.axiosPostReq('/saleIncomeList/queryNot',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.getMoneyList = res.data.data
            that.totalCount = res.data.totalNumber
            console.log(res.data,'222')
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
