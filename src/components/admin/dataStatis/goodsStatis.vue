<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>商品统计</b></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24" class="warp-main">
      <el-form label-width="80px" class="clearfix">
        <el-select v-model="value" class="fl t_select_width">
          <el-option
            v-for="item in goodsName"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="goodName" class="fl t_input_w"></el-input>
        <el-form-item label="品牌名称" class="fl">
          <el-select v-model="value1">
            <el-option
              v-for="item in brands"
              :key="item.value1"
              :label="item.label1"
              :value="item.value1">
            </el-option>
          </el-select>
        </el-form-item>
        <div class="clearfix"></div>
        <el-form-item label="下单时间" class="fl">
          <div class="block" style="margin-left:30px;">
            <el-date-picker
              v-model="value3"
              type="daterange"
              placeholder="选择时间范围">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item class="fl">
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--商品列表-->
    <el-table :data="goodsList" border :default-sort = "{prop: 'salesNo'}">
      <el-table-column prop="goodsCode" label="商品编号" align="center" >
      </el-table-column>
      <el-table-column prop="goodsName" label="商品名称" align="center" >
      </el-table-column>
      <el-table-column prop="skuCode" label="sku代码" align="center" >
      </el-table-column>
      <el-table-column prop="brandName" label="品牌名称" align="center" >
      </el-table-column>
      <el-table-column prop="price" label="价格（元）" align="center" >
      </el-table-column>
      <el-table-column prop="salesNo" label="销量" sortable align="center" >
      </el-table-column>
      <el-table-column prop="salesVal" label="销量额（元）" sortable  align="center" >
      </el-table-column>
      <el-table-column prop="refundTimes" label="累计退款次数" align="center" >
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        goodsName: [{
          value: '1',
          label: '商品名称'
        }, {
          value: '2',
          label: '商品编号'
        }, {
          value: '3',
          label: 'sku代码'
        }],
        value: '1',
        value1: '0',
        brands: [{
          value1: '0',
          label1: '全部'
        },{
          value1: '1',
          label1: '品牌1'
        },{
          value1: '2',
          label1: '品牌2'
        },{
          value1: '3',
          label1: '品牌3'
        }],
        goodName: '',
        value3: '',
        goodsList: [{
          goodsCode: 'FGDS78473',
          goodsName: '超声波洗牙',
          skuCode: 'fhjdhjf',
          brandName: '微压',
          price: 300,
          salesNo: 20,
          salesVal: 8000,
          refundTimes: 20
        },{
          goodsCode: 'FGDS78473',
          goodsName: '超声波洗YAYA',
          skuCode: 'fhjdhjf',
          brandName: '微压',
          price: 200,
          salesNo: 120,
          salesVal: 9000,
          refundTimes: 10
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
    width:220px!important;
  }
  .t_select_width{
    width:110px;
  }
</style>