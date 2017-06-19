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
            <el-input v-model="searchUserContent" placeholder='请输入销售员姓名或编号或手机号'></el-input>
          </el-form-item>
          <el-form-item label="提现状态：">
            <el-select v-model="searchType" placeholder="请选择">
              <el-option label="全部" value="全部"></el-option>
              <el-option label="申请中" value="申请中"></el-option>
              <el-option label="提现失败" value="提现失败"></el-option>
              <el-option label="提现成功" value="提现成功"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" v-on:click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>



      <!--列表-->
      <el-table :data="getMoneyList"  border style="width: 100%">
        <el-table-column  prop="userId"   align="center"  label="销售员编号"></el-table-column>
        <el-table-column  prop="userName"  align="center"  label="真实姓名">  </el-table-column>
        <el-table-column  prop="userPhone"  align="center"  label="手机号"> </el-table-column>
        <el-table-column  prop="getNum"  align="center"  label="提现金额">  </el-table-column>
        <el-table-column  prop="zhufubaoCount"  align="center"  label="支付宝账号">  </el-table-column>
        <el-table-column  prop="time"  align="center"  label="申请时间">  </el-table-column>
        <el-table-column  prop="state" align="center"  label="提现状态">  </el-table-column>
        <el-table-column  label="操作" align="center">
          <template scope="scope">
            <el-button type="text"  v-on:click="passThisGet(scope.$index)">通过</el-button>
            <el-button type="text"   v-on:click="dotPassThisGet(scope.$index)">不通过</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>


  </el-row>
</template>
<script>
  export default{
    data(){
      return {
        searchUserContent:null,
        searchType:"全部",
        getMoneyList:[
          {userId:"1",userName:"小酱",userPhone:'1234565787912',getNum:"13241232",zhufubaoCount:"13414141341",time:"是",state:'小酱'},
          {userId:"1",userName:"小酱",userPhone:'1234565787912',getNum:"13241232",zhufubaoCount:"13414141341",time:"是",state:'小酱'},
          {userId:"1",userName:"小酱",userPhone:'1234565787912',getNum:"13241232",zhufubaoCount:"13414141341",time:"是",state:'小酱'},
          {userId:"1",userName:"小酱",userPhone:'1234565787912',getNum:"13241232",zhufubaoCount:"13414141341",time:"是",state:'小酱'},
          {userId:"1",userName:"小酱",userPhone:'1234565787912',getNum:"13241232",zhufubaoCount:"13414141341",time:"是",state:'小酱'},
          {userId:"1",userName:"小酱",userPhone:'1234565787912',getNum:"13241232",zhufubaoCount:"13414141341",time:"是",state:'小酱'},
        ],
      }
    },
    methods: {
      search:function(){

      },
      dotPassThisGet:function(index){
        this.$confirm('不通过该用户的提现申请？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '该申请未通过!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '操作已经取消'
          });
        });
      },
      passThisGet:function(index){
        this.$confirm('确定通过将打款至该支付宝账户，是否继续?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '打款成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '打款取消'
          });
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
