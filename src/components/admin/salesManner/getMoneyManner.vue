<template>
  <el-row class="userListWrap">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>销售员管理</b></el-breadcrumb-item>
        <el-breadcrumb-item>提现管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <!--工具条-->
      <el-col  class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" >
          <el-form-item>
            <el-input v-model="searchUserContent" placeholder='请输入销售员姓名或手机号'></el-input>
          </el-form-item>
          <el-form-item label="提现状态：">
            <el-select v-model="searchType" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="申请中" value="0"></el-option>
              <el-option label="提现成功" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--列表-->
      <el-table :data="getMoneyList" border style="width: 100%">
        <!-- <el-table-column prop="userId" align="center" label="销售员编号"></el-table-column> -->
        <el-table-column prop="trueName" align="center" label="真实姓名"></el-table-column>
        <el-table-column prop="phone" align="center" label="手机号"></el-table-column>
        <el-table-column prop="balanceOut" align="center" label="提现金额"></el-table-column>
        <el-table-column prop="postalType" align="center" label="类型"></el-table-column>
        <el-table-column prop="openName" align="center" label="开户者"></el-table-column>
        <el-table-column prop="bankName" align="center" label="银行"></el-table-column>
        <el-table-column prop="accountNumber" align="center" label="账号" width="200"></el-table-column>
        <el-table-column prop="createFormate" align="center" label="申请时间" width="230">
          <template scope="scope">
            <span>{{new Date(scope.row.create).getFullYear()+'-'+ fillZero(new Date(scope.row.create).getMonth()+1)+'-'+fillZero(new Date(scope.row.create).getDate())+' '+fillZero(new Date(scope.row.create).getHours())+":"+fillZero(new Date(scope.row.create).getMinutes())+":"+fillZero(new Date(scope.row.create).getSeconds())}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="describey" align="center" label="提现状态">
          <template scope="scope">
            <span v-if="scope.row.describey.indexOf('申请中') !== -1 ">申请中</span>
            <span v-if="scope.row.describey.indexOf('提现成功') !== -1 ">提现成功</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <span v-if="scope.row.describey.indexOf('申请中') !== -1 ">
              <el-button type="text" v-on:click="passThisGet(scope.row)">通过</el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="position:absolute;top:650px;right:0;" v-show="this.totalCount > this.pagesize">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pagesize"
          layout="prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  export default{
    data(){
      return {
        searchUserContent: '',
        searchType: '',
        state: '',
        getMoneyList: [],
        //默认每页数据量
        pagesize: 10,
        //当前页码
        currentPage: 1,
        //默认数据总数
        totalCount: 1,
      }
    },
    created: function() {
      this.search()
    },
    methods: {
      handleCurrentChange(val) {
        this.currentPage = val 
        this.search(val)
      },
      //补0
      fillZero: function(n){
        return n<10 ? '0'+ n: n 
      },
      //获取提现列表
      search:function(val){
        var that = this;

        if (val == undefined || typeof(val) == 'object') {
          this.currentPage = 1
        } else {
          this.currentPage = val
        }

        if (that.searchType == '') {
          that.state = '';
        }else if (that.searchType == 1) {
          that.state = '成功'
        }else if (that.searchType == 0) {
          that.state = '申请中'
        }
        var obj = {
          state: that.state,
          message: that.searchUserContent,
          currentPage: this.currentPage,
          numberPerpage: this.pagesize
        }
        that.global.axiosPostReq('/witManage/query',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.getMoneyList = res.data.data;
            this.totalCount = res.data.totalNumber;
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      //通过操作
      passThisGet:function(row){
        var that = this;
        that.$confirm('确定通过将打款至该账户，是否继续?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var obj = {
            balacceId: row.balanceId,
          }
          that.global.axiosGetReq('/witManage/oper',obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              that.getAllMoney();
              that.$message({
                type: 'success',
                message: '提现成功!'
              });
            } else {
              that.$message.error('网络出错，请稍后再试！');
            }
          })
        }).catch(() => {
          
        });
      },
    },
  }
</script>

<style>
.userListWrap .el-select .el-input {
    width: 110px;
  }
.userListWrap   .asgagewgf h3{
    font-weight: 500;
    line-height: 50px;
    color: #20a0ff;
  }
.userListWrap   .asgagewgf .personalInfor{
    position: relative;
  }
.userListWrap   .asgagewgf .personalInfor img{
    position: absolute;
    top: 0;
    right: 0;
    width: 150px;
    height: 150px;
  }
.userListWrap   .asgagewgf  span{
    width: 40%;
    display: inline-block;
    line-height: 35px;
  }
  /*.demo-table-expand label {
    font-weight: bold;
  }
  .warp  .warp-main .el-input{
    width: 100%;
    padding-right: 0px;
  }
  .warp .el-input{
    width: 70%;
    padding-right: 20px;
  }*/
</style>
