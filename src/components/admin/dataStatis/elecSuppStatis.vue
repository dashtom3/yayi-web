<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>电商用户统计</b></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24" class="warp-main">
      <el-form :inline="true" class="clearfix">
        <el-input v-model="selectInput" class="fl t_input_w" @change="pageInitHandler">
          <el-select v-model="sel_value" slot="prepend" class="fl t_select_width"  @change="selectOpt">
            <el-option
              v-for="item in optSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-input>
        <el-form-item label="下单时间" class="fl" style="margin-left:10px;" @change="pageInitHandler">
          <div class="block">
            <el-date-picker
              v-model="data_val"
              type="daterange"
              format="yyyy-MM-dd"
              @change="changeHandler"
              placeholder="选择时间范围">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item class="fl">
          <el-button type="primary" @click="queryHandler">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--电商用户列表-->
    <el-table :data="elecList" border :default-sort = "{prop: 'orderTimes'}">
      <el-table-column prop="trueName" label="真实姓名" align="center" >
      </el-table-column>
      <el-table-column prop="phone" label="手机号" align="center" >
      </el-table-column>
      <el-table-column prop="orderaCount" label="累计下单次数" sortable align="center" >
      </el-table-column>
      <el-table-column prop="orderaMoneyCount" label="累计下单金额（元）" sortable align="center" >
      </el-table-column>
      <el-table-column prop="latelyOrderDate" label="最近一次下单时间" sortable align="center" >
      </el-table-column>
    </el-table>
    <paging :childmsg="pageProps" style="position:absolute;top:650px;right:0;" @childSay="pageHandler" v-show="this.elecList.length"></paging>
  </el-row>
</template>

<script>
  import global from '../../global/global'
  import paging from '../../website/brandLib/paging0'
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
        pageProps: {
          pageNum: 1,
          totalPage: 1
        },
        sel_value: '1',
        data_val: '',
        selectInput: '',
        startDate: '',
        endDate: '',
        elecList: []
      }
    },
    components: {
      paging
    },
    created(){
      this.queryHandler()
    },
    methods: {
      //查询条件改变时初始化pageNum为1
      pageInitHandler(){
        this.pageProps.pageNum = 1;
      },
      selectOpt(key){
        this.sel_value = key;
        this.selectInput = '';
        this.pageProps.pageNum = 1;
      },
      changeHandler(val){  
        if(val){
          this.startDate = val.split(' - ')[0],
          this.endDate = val.split(' - ')[1]
        }else{
          this.startDate = '',
          this.endDate = ''
        }
      },
      pageHandler(data){
        this.pageProps.pageNum = data
        this.queryHandler();
      },
      queryHandler(){
        var params;
        if(this.sel_value == '1'){
          params = {
            phone: this.selectInput,
            trueName: '',
            startDate: this.startDate,
            endDate: this.endDate,
            currentPage: this.pageProps.pageNum,
            numberPerPage: 10,
            token: global.getToken()
          }
        }else if(this.sel_value == '2'){
          params = {
            phone: '',
            trueName: this.selectInput,
            startDate: this.startDate,
            endDate: this.endDate,
            currentPage: this.pageProps.pageNum,
            numberPerPage: 10,
            token: global.getToken()
          }
        }
        global.axiosGetReq('/userStatistics/query',params).then((res) => {
          if(res.data.callStatus === 'SUCCEED'){
            this.elecList = res.data.data
            this.pageProps.totalPage = res.data.totalPage
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