<template>
	<el-row class="brandWarp">
    <el-col :span="24" class="warp-breadcrum">
      <div class="block fl">
        <span class="demonstration" style="margin-right:20px;">时间</span>
        <el-date-picker
          v-model="value"
          type="month"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <div class="fr total_box">
        历年已结算收入：<i class="i_col">￥20000</i>
      </div>
    </el-col>
    <dataTable></dataTable>
	</el-row> 
</template>

<script>
import dataTable from './dataTable'
export default {
	name: 'hello',
  data() {
    return {
      value: '',
    }
  },
  components:{
    dataTable
  }
}
</script>

<style scope>
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
  .i_col{
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    font-style: normal;
  }
  .total_box{
    width: 300px;
    height: 44px;
    font-size: 14px;
    line-height: 44px;
    background: #5db7e8;
    color: #fff;
    text-align: center;
  }
  .warp-breadcrum{
    margin-top: 36px;
  }
</style>