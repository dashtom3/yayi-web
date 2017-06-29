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
          <el-select v-model="searchGetType" >
            <el-option label="全部" value="全部"></el-option>
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收入状态：">
          <el-select v-model="searchMoneyType">
            <el-option label="全部" value="全部"></el-option>
            <el-option label="待结算" value="待结算"></el-option>
            <el-option label="已结算" value="已结算"></el-option>
            <el-option label="已取消" value="已取消"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结算日期：">
          <el-date-picker  v-model="searchDataPrev"  type="daterange"  placeholder="选择日期"  :picker-options="pickerOptions0"> </el-date-picker>
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
      <el-table-column  prop="name"  align="center"  label="真实姓名">  </el-table-column>
      <el-table-column  prop="phone"  align="center"  label="手机号"> </el-table-column>
      <el-table-column  prop="orderId"  align="center"  label="订单编号">  </el-table-column>
      <el-table-column  prop="orderState"  align="center"  label="订单状态">  </el-table-column>
      <el-table-column  prop="orderTime"  align="center"  label="下单日期">  </el-table-column>
      <el-table-column  prop="getOver7"  align="center"  label="签收已过7天">  </el-table-column>
      <el-table-column  prop="getMoney"  align="center"  label="收入">  </el-table-column>
      <el-table-column  prop="getState"  align="center"  label="收入状态">  </el-table-column>
      <el-table-column  prop="getTime"  align="center"  label="结算日期">  </el-table-column>
      <el-table-column  align="center"  label="操作">
        <template scope="scope">
          <el-button v-on:click="incomeList(scope.$index)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog custom-class="asgagewgf" title="收入详情" :visible.sync="showIncomeInfor">
      <div class="personalInfor">
        <h3>销售员信息</h3>
        <div class="">
          <span>销售员编号：{{someOneUserDetails.info.bianhao}}</span>
          <span>真实姓名：{{someOneUserDetails.info.name}}</span>
          <span>真实姓名：{{someOneUserDetails.info.name}}</span>
        </div>
      </div>
      <div class="certification">
        <h3>用户信息</h3>
        <div class="">
          <span>销售员编号：{{someOneUserDetails.info.bianhao}}</span>
          <span>真实姓名：{{someOneUserDetails.info.name}}</span>
          <span>真实姓名：{{someOneUserDetails.info.name}}</span>
        </div>
      </div>
      <h3>订单信息</h3>
      <div class="ordertable">
        <table style="width:100%;border-color:#dfe6ec;" cellpadding="0" cellspacing="0" border="1">
          <tr>
            <td colspan="6">
              <span>订单编号：xxxxxxxxxxxxx</span>
              <span>订单状态：交易成功</span>
            </td>
            <td>签收时间：1234134143</td>
          </tr>
          <tr class="maniCont">
            <td>商品名称</td>
            <td>sku代码</td>
            <td>价格（元）</td>
            <td>数量</td>
            <td>小计（元）</td>
            <td>已退款金额（元）</td>
            <td>收入（元）</td>
          </tr>
          <tr class="maniCont">
            <td>1111111</td>
            <td>111111</td>
            <td>1111</td>
            <td>1111</td>
            <td>111</td>
            <td>11111</td>
            <td>111111</td>
          </tr>
          <tr class="lastTr" style="border:none">
            <td colspan="6">
              <span>收入状态：已结算</span>
              <span>结算日期：2017-07-11 17:00</span>
            </td>
            <td>总收入：￥10</td>
          </tr>
        </table>
      </div>
      <!-- <el-table :data="someOneUserDetails.bindUsers" border>
        <el-table-column align="center" property="bianhao" label="用户编号" width="150"></el-table-column>
        <el-table-column align="center" property="phone" label="手机号"></el-table-column>
        <el-table-column align="center" property="name" label="真实姓名" width="200"></el-table-column>
        <el-table-column align="center" property="componey" label="公司名称"></el-table-column>
      </el-table> -->
    </el-dialog>
  </el-row>
</template>
<script>
  export default{
    data(){
      return {
        someOneUserDetails:{
          info:{
            bianhao:"123134",
            name:"23545",
            phone:"1234",
            sex:'aef',
            ID:"134141341431341414",
            time:"1234-12-12",
            leaveMoney:'2112',
            bindUserNum:123,
            saleImg:"1.png"
          },
          getMoneyStyle:{
            type:"a",
            count:1231313123
          },
          bindUsers:[
            {bianhao:'12',name:'w4er',phone:'32424',componey:'2w323'},
            {bianhao:'12',name:'w4er',phone:'32424',componey:'2w323'},
            {bianhao:'12',name:'w4er',phone:'32424',componey:'2w323'},
            {bianhao:'12',name:'w4er',phone:'32424',componey:'2w323'},
          ]

        },
        getMoneyList:[
          {id:12,name:'ada',phone:'adf',orderId:'adfa',orderState:'ad',ordreTime:"dsfadfa",getOver7:'adf',getMoney:"adsfa",getState:'aaaf',getTime:'sdadafaf'},
          {id:12,name:'ada',phone:'adf',orderId:'adfa',orderState:'ad',ordreTime:"dsfadfa",getOver7:'adf',getMoney:"adsfa",getState:'aaaf',getTime:'sdadafaf'},
          {id:12,name:'ada',phone:'adf',orderId:'adfa',orderState:'ad',ordreTime:"dsfadfa",getOver7:'adf',getMoney:"adsfa",getState:'aaaf',getTime:'sdadafaf'},
          {id:12,name:'ada',phone:'adf',orderId:'adfa',orderState:'ad',ordreTime:"dsfadfa",getOver7:'adf',getMoney:"adsfa",getState:'aaaf',getTime:'sdadafaf'},
          {id:12,name:'ada',phone:'adf',orderId:'adfa',orderState:'ad',ordreTime:"dsfadfa",getOver7:'adf',getMoney:"adsfa",getState:'aaaf',getTime:'sdadafaf'},
          {id:12,name:'ada',phone:'adf',orderId:'adfa',orderState:'ad',ordreTime:"dsfadfa",getOver7:'adf',getMoney:"adsfa",getState:'aaaf',getTime:'sdadafaf'},
          {id:12,name:'ada',phone:'adf',orderId:'adfa',orderState:'ad',ordreTime:"dsfadfa",getOver7:'adf',getMoney:"adsfa",getState:'aaaf',getTime:'sdadafaf'},
          {id:12,name:'ada',phone:'adf',orderId:'adfa',orderState:'ad',ordreTime:"dsfadfa",getOver7:'adf',getMoney:"adsfa",getState:'aaaf',getTime:'sdadafaf'},
          {id:12,name:'ada',phone:'adf',orderId:'adfa',orderState:'ad',ordreTime:"dsfadfa",getOver7:'adf',getMoney:"adsfa",getState:'aaaf',getTime:'sdadafaf'},
        ],
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
        showIncomeInfor:false,
        searchSaleContent:null,
        searchDataPrev:null,
        searchDataNext:null,
        searchSaleType:"手机号",
        searchMoneyType:"全部",
        searchGetType:"全部",
        nowUserMoneyNum:null,
        // selectSearchType:"用户编号",
        showChangeUserMoney:false,
      }
    },
    methods: {
      incomeList:function(index){
        console.log(index);
        this.showIncomeInfor = true;
      },
      search:function(){

      },
      changeUserMoney:function(){
        this.showChangeUserMoney = true;
      },
      saveUserMoney:function(){
        this.showChangeUserMoney = false;
      },

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
</style>
