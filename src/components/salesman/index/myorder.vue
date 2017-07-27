<template>
	<el-row class="brandWarp">
    <el-col :span="24" class="warp-breadcrum">
      <div class="block fl">
        <span class="demonstration" style="margin-right:20px;">时间</span>
        <el-date-picker
          v-model="monthVal"
          type="month"
          placeholder="选择日期"
          :clearable="false"
          @change="selHandler">
        </el-date-picker>
      </div>
      <div class="fr total_box">
        累计收入：<i class="i_col">￥<span>{{allCommission}}</span></i>
      </div>
    </el-col>
    <dataTable :orderInfo="orderInfo" :echartsTitle="echartsTitle" :monthX="monthX" :echartData="echartData" v-if="orderInfo.myOrderVoList"></dataTable>
    <div class="clearfix"></div>
    <div class="block" style="margin-bottom:20px;" v-show="this.totalCount > this.pagesize">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pagesize"
        layout="prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>
	</el-row> 
</template>

<script>
import dataTable from './dataTable'
import global from '../../global/global'
export default {
  data() {
    return {
      monthVal: '',
      monthX: '',
      allCommission: 0,
      echartsTitle: '',
      //默认每页数据量
      pagesize: 10,
      //当前页码
      currentPage: 1,
      //默认数据总数
      totalCount: 1,
      dateInfo: {
        year: new Date().getFullYear(),
        month: new Date().getMonth()+1
      },
      orderInfo: {
        saleAllMoney: 0,
        haocaiAllMoney: 0,
        gongjuAllMoney: 0,
        orderNum: 0,
        myOrderVoList: []
      },
      echartData: []
    }
  },
  created(){
    this.init()
    this.echartPic()
    this.queryOrderList()
    //初始化为当前月份
    this.monthVal = new Date().getFullYear() + '-' + this.fillZero(new Date().getMonth() + 1)
    //默认echarts标题
    this.echartsTitle = new Date().getFullYear() + '年'+ (new Date().getMonth() + 1) +'月份业绩记录'
    //默认月份
    this.monthX = new Date().getMonth() + 1
  },
  components:{
    dataTable
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val 
      this.init(val)
      this.queryOrderList(val)
    },
    //月份补0
    fillZero(n){
      return n<10 ? '0'+ n: n 
    },
    //查询订单数据
    init(val){

      if(val == undefined || typeof(val) == 'object') {
        this.currentPage = 1
      } else {
        this.currentPage = val
      }
      let params = {
        currentPage: this.currentPage,
        numberPerPage: this.pagesize,
        token: global.getSalesToken()
      }
      global.axiosGetReq('/saleMyOrder/myOrderData',params).then((res) => {
        if (res.data.callStatus === 'SUCCEED') { 
          this.orderInfo.gongjuAllMoney = res.data.data.gongjuAllMoney.toFixed(2) || '0.00'
          this.orderInfo.haocaiAllMoney = res.data.data.haocaiAllMoney.toFixed(2) || '0.00'
          this.orderInfo.saleAllMoney = res.data.data.saleAllMoney.toFixed(2) || '0.00'
          this.orderInfo.orderNum = res.data.data.orderNum || 0
          this.allCommission = res.data.data.allCommission.toFixed(2) || '0.00'
        }else{
          this.$message.error('网络出错，请稍后再试！');
        }
      })
    },
    //查询订单列表
    queryOrderList(val){

      if(val == undefined || typeof(val) == 'object') {
        this.currentPage = 1
      } else {
        this.currentPage = val
      }

      let params = {
        currentPage: this.currentPage,
        numberPerPage: this.pagesize,
        token: global.getSalesToken()
      }
      global.axiosGetReq('/saleMyOrder/myOrderList',params).then((res) => {
        if (res.data.callStatus === 'SUCCEED') { 
          this.orderInfo.myOrderVoList = res.data.data
          this.totalCount = res.data.totalNumber
        }else{
          this.$message.error('网络出错，请稍后再试！');
        }
      })
    },
    //查询收入
    echartPic(){
      let params = {
        year: this.dateInfo.year,
        month: this.dateInfo.month,
        token: global.getSalesToken()
      }
      global.axiosGetReq('/saleMyOrder/chart',params).then((res) => {
        console.log(res.data.data)
        if (res.data.callStatus === 'SUCCEED') { 
          for(var i=0;i<res.data.data.length;i++){
            this.echartData.push({
              name: '(￥' + res.data.data[i].dayCommission * res.data.data[i].dayOrderNum + ', ' +  res.data.data[i].dayOrderNum + '单)',
              value:  res.data.data[i].dayCommission * res.data.data[i].dayOrderNum
            })
          }
          this.echartData.unshift({
            name: '(￥' + 0 + ', ' + 0 + '单)',
            value:  0
          })
        }else{
          this.$message.error('网络出错，请稍后再试！');
        }
      })
    },
    selHandler(val){
      this.dateInfo.year = val.split("-")[0]
      this.dateInfo.month = val.split("-")[1]
      this.echartsTitle = this.dateInfo.year + '年'+ parseInt(this.dateInfo.month) +'月份业绩记录'
      this.monthX = parseInt(this.dateInfo.month)
      this.echartData = []
      this.echartPic()
    } 
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