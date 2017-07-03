<template>
	<el-row class="brandWarp">
    <el-col :span="24" class="warp-breadcrum">
      <div class="grid-content bg-purple-dark">
        <span>钱包余额：<i class="i_col_red">￥700</i></span>
        <el-button type="primary" class="margin_l">提现</el-button>
      </div>
      <div class="curOrder">钱包明细</div>
      <ul class="sel_wrap">
        <li>
          <div class="block">
            <span class="demonstration">时间：</span>
            <el-date-picker
              v-model="value"
              type="daterange"
              placeholder="选择日期范围">
            </el-date-picker>
          </div>
        </li>
        <li>
          <div class="block">
            <span class="demonstration">最近：</span>
            <span class="nav_select margin_r_30 active_nav">1个月</span>
            <span class="nav_select margin_r_30">3个月</span>
            <span class="nav_select margin_r_30">半年</span>
            <span class="nav_select">1年</span>
          </div>
        </li>
        <li>
          <div class="block">
            <span class="demonstration">分类：</span>
            <span class="nav_select margin_r_30 active_nav">全部</span>
            <span class="nav_select margin_r_30">进账</span>
            <span class="nav_select">提现</span>
          </div>
        </li>
      </ul>
      <div class="grid-content bg-purple-dark wallet_title">
        <span>进账总额：<i class="i_col_blue">￥20000</i></span>
        <span class="margin_l">提现总额：<i class="i_col_red">￥10000</i></span>
      </div> 
    </el-col>
    <el-col :span="24" class="warp-main" style="margin: auto;margin-bottom:100px;">
      <el-table :data="tableData" align="center" border style="width: 100%">
        <el-table-column prop="date" align="center" label="日期">
        </el-table-column>
        <el-table-column  prop="income" align="center" label="进账">
          <template scope="scope">
            <span class="col_blue">{{scope.row.income}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="withDrawals" align="center" label="提现">
          <template scope="scope">
            <span class="col_red">{{scope.row.withDrawals}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="account" align="center" label="账户余额">
        </el-table-column>
        <el-table-column prop="handler" align="center" label="操作">
          <template scope="scope">
            <el-button
              size="mini"
              type="info"
              @click="queryDetail(scope.$index, scope.row)">查看详情</el-button>
          </template>  
        </el-table-column>
      </el-table>
    </el-col>
	</el-row> 
</template>

<script>
  export default {
    data(){
      return {
        value: '',
        tableData: [{
          date: '2017-01-01-17:00',
          income: 8888,
          withDrawals: -2000,
          account: 2000
        },{
          date: '2017-01-01-17:00',
          income: 8888,
          withDrawals: -2000,
          account: 2000
        },{
          date: '2017-01-01-17:00',
          income: 8888,
          withDrawals: -2000,
          account: 2000
        },{
          date: '2017-01-01-17:00',
          income: 8888,
          withDrawals: -2000,
          account: 2000
        },{
          date: '2017-01-01-17:00',
          income: 8888,
          withDrawals: -2000,
          account: 2000
        }]
      }
    }
  }
</script>

<style scope="scope">
  .brandWarp{
    width: 1200px;
    margin: auto;
  }
  .fl{
    float:left;
  }
  .fr{
    float: right;
  }
  .clearfix{
    zoom:1;
  }
  .clearfix:after{
    content:"";
    clear:both;
    display:block;
  }
  .i_col_red{
    color: red;
    font-weight: bold;
    font-style: normal;
  }
  .col_red{
    color: red;
  }
  .i_col_blue{
    color: #20a0ff;
    font-weight: bold;
    font-style: normal;
  }
  .col_blue{
    color: #20a0ff;
  }
  .margin_l{
    margin-left: 20px;
  }
  .warp-breadcrum{
    margin-top: 36px;
  }
  .wallet_title{
    margin-top: 30px;
    margin-bottom: 8px;
  }
  .curOrder{
    height: 30px;
    line-height: 30px;
    margin-top: 30px;
    padding-left: 24px;
    border-bottom: 1px dotted #ccc;
    background: url(../../../images/salesman/arrow.png) 0 8px no-repeat;
  }
  .nav_select{
    width: 60px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    display: inline-block;
    border-radius: 6px;
    cursor: pointer;
  }
  .margin_r_30{
    margin-right: 30px;
  }
  .active_nav{
    background: #20a0ff;
    color: #fff;
  }
  .sel_wrap{
    border: 1px solid #eee;
    margin-top: 26px;
    padding-left: 10px;
    padding-bottom: 20px;
  }
  .sel_wrap li{
    margin-top: 20px;
  }
</style>