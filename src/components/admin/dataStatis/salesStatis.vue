<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>销售员统计</b></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24" class="warp-main">
      <el-form :inline="true" class="clearfix">
        <el-input v-model="selectInput" class="fl t_input_w">
          <el-select v-model="sel_value" slot="prepend" class="fl t_select_width" @change="selectOpt">
            <el-option
              v-for="item in optSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-input>
        <el-form-item class="fl" style="margin-left:10px;">
          <el-button type="primary" @click="queryHandler">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--销售员列表-->
    <el-table :data="salesList" border :default-sort = "{prop: 'lateOrder'}">
      <el-table-column prop="trueName" label="真实姓名" align="center" >
      </el-table-column>
      <el-table-column prop="phone" label="手机号" align="center" >
      </el-table-column>
      <el-table-column prop="saleAllMoney" label="销售额（元）" sortable align="center" >
      </el-table-column>
      <el-table-column prop="money" label="总收入（元）" sortable align="center" >
      </el-table-column>
      <el-table-column prop="bindUserNum" label="客户数" sortable align="center" >
      </el-table-column>
      <el-table-column prop="latelyOrderDate" label="最近一次下单时间" sortable align="center" >
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
  import global from '../../global/global'
  export default {
    data() {
      return {
        optSelect: [{
          value: '1',
          label: '手机号'
        }, {
          value: '2',
          label: '真实姓名'
        }],
        sel_value: '1',
        selectInput: '',
        salesList: []
      }
    },
    created(){
      this.queryHandler()
    },
    methods: {
      selectOpt(key){
        this.sel_value = key;
        this.selectInput = '';
      },
      queryHandler(){
        var params;
        if(this.sel_value == '1'){
          params = {
            phone: this.selectInput,
            trueName: '',
            currentPage: 1,
            numberPerPage: 1,
            token: global.getToken()
          }
        }else if(this.sel_value == '2'){
          params = {
            phone: '',
            trueName: this.selectInput,
            currentPage: 1,
            numberPerPage: 1,
            token: global.getToken()
          }
        }
        global.axiosGetReq('/saleStatistics/query',params).then((res) => {
          if(res.data.callStatus === 'SUCCEED'){
            this.salesList = res.data.data
          }
        })
      }
    }
  }
</script>

<style scoped>
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
  .t_input_w{
    width:320px!important;
  }
  .t_select_width{
    width:110px;
  }
</style>