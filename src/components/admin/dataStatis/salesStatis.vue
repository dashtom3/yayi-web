<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>销售员统计</b></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24" class="warp-main">
      <el-form label-width="80px" class="clearfix">
        <el-select v-model="value" class="fl t_select_width">
          <el-option
            v-for="item in optSelect"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="goodName" class="fl t_input_w"></el-input>
        <el-form-item class="fl">
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--销售员列表-->
    <el-table :data="salesList" border :default-sort = "{prop: 'lateOrder'}">
      <el-table-column prop="trueName" label="真实姓名" align="center" >
      </el-table-column>
      <el-table-column prop="mobile" label="手机号" align="center" >
      </el-table-column>
      <el-table-column prop="salesVal" label="销售额（元）" sortable align="center" >
      </el-table-column>
      <el-table-column prop="totalAmount" label="总收入（元）" sortable align="center" >
      </el-table-column>
      <el-table-column prop="customerNo" label="客户数" sortable align="center" >
      </el-table-column>
      <el-table-column prop="lateOrder" label="最近一次下单时间" sortable align="center" >
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
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
        value: '1',
        salesList: [{
          trueName: '张三',
          mobile: '18947689378',
          salesVal: 3000,
          totalAmount: 6000,
          customerNo: 20,
          lateOrder: '2017-01-01',
        },{
          trueName: '李四',
          mobile: '18947689378',
          salesVal: 2000,
          totalAmount: 7000,
          customerNo: 30,
          lateOrder: '2017-01-02',
        }]
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
    width:220px;
  }
  .t_select_width{
    width:110px;
  }
</style>