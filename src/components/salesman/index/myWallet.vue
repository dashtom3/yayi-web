<template>
	<el-row class="brandWarp">
    <el-col :span="24" class="warp-breadcrum1">
      <div class="grid-content bg-purple-dark">
        <span>钱包余额：<i class="i_col_red">￥700</i></span>
        <button class="margin_l btn_col" @click="withDrawHandler">提现</button>
      </div>
      <div class="curOrder">钱包明细</div>
      <ul class="sel_wrap">
        <li>
          <div class="block">
            <span class="demonstration">时间：</span>
            <el-date-picker
              v-model="value"
              type="daterange"
              placeholder="选择日期范围" @change="chooseDate">
            </el-date-picker>
          </div>
        </li>
<!--         <li>
          <div class="block">
            <span class="demonstration">最近：</span>
            <span class="nav_select margin_r_30" v-for="(item, index) in selectDate" :key="index" :class="{active_nav: dateStat === index}" @click="choose(index)">{{item}}</span>
          </div>
        </li> -->
        <li>
          <div class="block">
            <span class="demonstration">分类：</span>
            <span class="nav_select margin_r_30" v-for="(item, index) in classify" :key="index" :class="{active_nav: classStat === index}"  @click="selClass(item,index)">{{item}}</span>
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
        <el-table-column prop="updated" align="center" label="日期">
        </el-table-column>
        <el-table-column  prop="getMoney" align="center" label="进账">
          <template scope="scope">
            <span class="col_blue">{{scope.row.income}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="getMoney" align="center" label="提现">
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
              @click="queryDetail()">查看详情</el-button>
          </template>  
        </el-table-column>
      </el-table>
    </el-col>
    <!-- 提现设置 -->
    <el-dialog
      :visible.sync="withDrawSets"
      size="tiny" style="text-align:center;">
      <i class="el-icon-information" style="color:#fbb308;font-size:30px;margin-bottom:10px;"></i>
      <div>请先设置提现方式</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="withDrawSets = false">取 消</el-button>
        <el-button type="primary" @click="withDrawSets = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 状态提示 -->
    <el-dialog
      :visible.sync="statTip"
      size="tiny" style="text-align:center;">
      <i class="el-icon-information" style="color:#fbb308;font-size:30px;margin-bottom:10px;"></i>
      <div>正在审核中，请耐心等待~~</div>
    </el-dialog>

    <!-- 银行卡提现 -->
    <el-dialog
      title="提现"
      :visible.sync="withDrawBank"
      size="small">
      <div style="margin:0 auto;width:460px;">
        <el-row>
          <el-col :span="24" align="center"><div class="i_red i_title">请检查账户是否正确</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24" align="center"><div class="i_title"><span>姓名：招商银行：6225842322152325</span></div></el-col>
        </el-row>
        <el-form>
          <el-form-item label="提现金额：">
            <el-input v-model="withDrawAccount" class="item_w_input fl"></el-input>
          </el-form-item>
          <el-form-item label="手机号：" style="padding-left:14px;">
            <el-input v-model="withDrawPhone" class="item_w_input fl"></el-input>
          </el-form-item>
          <el-form-item label="验证码：" style="padding-left:14px;">
            <el-input v-model="withDrawCode" class="item_c_input fl"></el-input>
            <button class="btn_col">获取验证码</button>
          </el-form-item>
        </el-form>
        <div>
          <button class="withDrawBtn btn_col" @click="withDrawBank = false">申请提现</button>
          <el-button class="withDrawBtn1" @click="withDrawBank = false">取 消</el-button>
        </div>
      </div>
    </el-dialog>
	</el-row> 
</template>

<script>
  import util from '../../../common/util'
  export default {
    data(){
      return {
        value: null,
        tableData: [],
        selectDate: ['1个月','2个月','半年','1年'],
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
        }],
        classify: ['全部','进账','提现'],
        classStat: 0,
        withDrawSets: false,
        statTip: false,
        withDrawBank: false,
        withDrawAccount: '',
        withDrawPhone: '',
        withDrawCode: ''
      }
    },
    created: function() {
      var that = this;
      that.getMyWallet();
    },
    methods: {
      //获取钱包明细
      getMyWallet: function() {
        var that = this;
        var obj = {
          token: that.global.getSalesToken(),
          state: 0,
        }
        console.log(obj)
        that.global.axiosPostReq('/myWallet/detail',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            console.log(res)
            // that.tableData = res.data.data;
            console.log(that.tableData)
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      // 选择时间段
      chooseDate: function() {
        var that = this;
        var startDate = util.formatDate.format(new Date(that.value[0]));
        var endDate = util.formatDate.format(new Date(that.value[1]));
        // var obj = {
        //   token: that.global.getSalesToken(),
        //   state: 0,
        // }
        // that.global.axiosPostReq('/myWallet/detail',obj).then((res) => {
        //   if (res.data.callStatus === 'SUCCEED') {
        //     console.log(res)
        //     // that.tableData = res.data.data;
        //     console.log(that.tableData)
        //   } else {
        //     that.$message.error('网络出错，请稍后再试！');
        //   }
        // })
      },
      // 选择分类
      selClass: function(item,index){
        var that = this;
        that.classStat = index;
        if (item == '全部') {
          var obj = {
            token: that.global.getSalesToken(),
            state: 0,
          }
          that.global.axiosPostReq('/myWallet/detail',obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              console.log(res)
              // that.tableData = res.data.data;
              console.log(that.tableData)
            } else {
              that.$message.error('网络出错，请稍后再试！');
            }
          })
        } else if (item == '进账') {
          var obj = {
            token: that.global.getSalesToken(),
            state: 1,
          }
          that.global.axiosPostReq('/myWallet/detail',obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              console.log(res)
              // that.tableData = res.data.data;
              console.log(that.tableData)
            } else {
              that.$message.error('网络出错，请稍后再试！');
            }
          })
        } else if (item == '提现') {
          var obj = {
            token: that.global.getSalesToken(),
            state: 2,
          }
          that.global.axiosPostReq('/myWallet/detail',obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              console.log(res)
              // that.tableData = res.data.data;
              console.log(that.tableData)
            } else {
              that.$message.error('网络出错，请稍后再试！');
            }
          })
        }
      },
      selClass(index){
        this.classStat = index;
      },
      withDrawHandler(){
        this.withDrawBank = true
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
  .warp-breadcrum1{
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
    background: #56bff8;
    color: #fff;
  }
  .btn_col{
    width: 120px;
    height: 36px;
    border-radius: 4px;
    cursor: pointer;
    background: #5db7e8;
    border: none;
    color: #fff;
  }
  .btn_col:hover{
    background: #57a5cf;
    border: none;
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
  .item_w_input{
    width: 350px;
  }
  .item_c_input{
    width: 210px;
    margin-right: 20px;
  }
  .i_red{
    color: red;
  }
  .i_title{
    height: 30px;
    line-height: 30px;
  }
  .withDrawBtn{
    width: 140px;
    margin-left: 82px;
  }
  .withDrawBtn1{
    width: 140px;
    margin-left: 66px;
  }
</style>