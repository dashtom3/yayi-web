<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>商品统计</b></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24" class="warp-main">
      <el-form :inline="true" class="clearfix">
        <el-form-item class="fl">
          <el-input v-model="sel_input" class="t_input_w">
            <el-select v-model="sel_value" slot="prepend" class="t_select_width" @change="selectOpt">
              <el-option
                v-for="item in goodsName"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="品牌名称" class="fl">
          <el-select v-model="brandName">
            <el-option
              v-for="item in brands"
              :key="item.value1"
              :label="item.label1"
              :value="item.value1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="fl">
          <el-button type="primary" @click="queryHandler">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--商品列表-->
    <el-table :data="goodsList" border :default-sort = "{prop: 'salesNo'}">
      <el-table-column prop="itemId" label="商品编号" align="center" >
      </el-table-column>
      <el-table-column prop="itemName" label="商品名称" align="center" >
      </el-table-column>
      <el-table-column prop="itemSKU" label="sku代码" align="center" >
      </el-table-column>
      <el-table-column prop="itemBrandName" label="品牌名称" align="center" >
      </el-table-column>
      <el-table-column prop="price" label="价格（元）" align="center" >
      </el-table-column>
      <el-table-column prop="sales" label="销量" sortable align="center" >
      </el-table-column>
      <el-table-column prop="salesMoney" label="销售额（元）" sortable  align="center" >
      </el-table-column>
      <el-table-column prop="refundNum" label="累计退款次数" align="center" >
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
  import global from '../../global/global'
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
        sel_value: '1',
        brandName: '',
        brands: [{
          value1: '',
          label1: '全部'
        }],
        sel_input: '',
        goodsList: []
      }
    },
    created(){
      this.queryHandler()
      this.queryBrand()//查询所有品牌
    },
    methods: {
      queryBrand(){
        var params = {
          itemBrandName: '',
          itemBrandHome: ''
        }
        global.axiosPostReq('/item/queryItemBrand',params).then((res) => {
          if (res.data.callStatus === 'SUCCEED') { 
            var result = res.data.data;
            for(var i=0; i<result.length; i++){
              this.brands.push({
                value1: result[i].itemBrandName,
                label1: result[i].itemBrandName
              })
            }
          }else{
            this.$message.error('查询商品品牌失败！');
          }
        })
      },
      queryHandler(){
        var params;
        if(this.sel_value == '1'){
          params = {
            itemName: this.sel_input,
            itemId: '',
            itemSKU: '',
            itemBrandName: this.brandName,
            token: global.getToken()
          }
        }else if(this.sel_value == '2'){
          params = {
            itemName: '',
            itemId: this.sel_input,
            itemSKU: '',
            itemBrandName: this.brandName,
            token: global.getToken()
          }
        }else if(this.sel_value == '3'){
          params = {
            itemName: '',
            itemId: '',
            itemSKU: this.sel_input,
            itemBrandName: this.brandName,
            token: global.getToken()
          }
        }
        global.axiosGetReq('/itemStatistics/query',params).then((res) => {
          if(res.data.callStatus === 'SUCCEED'){
            this.goodsList = res.data.data
          }
        })
      },
      selectOpt(key){
        this.sel_value = key;
        this.sel_input = '';
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