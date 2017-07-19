<template>
	<el-row class="brandWarp">
    <el-col :span="24" class="warp-breadcrum">
      <div class="block fl">
        <span class="demonstration" style="margin-right:20px;">时间</span>
        <el-date-picker
          v-model="value"
          type="month"
          placeholder="选择日期"
          @change="selHandler">
        </el-date-picker>
      </div>
      <div class="fr total_box">
        累计收入：<i class="i_col">￥<span>{{overYearHasCommission}}</span></i>
      </div>
    </el-col>
    <dataTable :orderInfo="orderInfo" :echartData="echartData" v-if="orderInfo.myOrderVoList"></dataTable>
    <div class="clearfix"></div>
    <paging :childmsg="pageProps" style="text-align:center;margin-bottom:20px;" v-show="this.orderInfo.length" @childSay="pageHandler"></paging>
	</el-row> 
</template>

<script>
import dataTable from './dataTable'
import global from '../../global/global'
import paging from '../../website/brandLib/paging0'
export default {
  data() {
    return {
      value: '',
      overYearHasCommission: '',
      pageProps: {
        pageNum: 1,
        totalPage: 1
      },
      dateInfo: {
        year: new Date().getFullYear(),
        month: new Date().getMonth()+1
      },
      orderInfo: {
        allCommission: '',
        dayCommission: '',
        dayOrderNum: '',
        getUpdated: '',
        hasCommission: '',
        orderNum: '',
        saleIncomeVoList: '',
        stayCommission: '',
        sumOrderMoney: '',
        myOrderVoList: [{
          orderTime: '2017-01-01',
          custName: '测试01',
          custPhone: '18652599279',
          saleAmt: '200',
          materialAmt: '50',
          equipAmt: '70',
          refundAmt: '40',
          realSaleAmt: '60'
        },{
          orderTime: '2017-01-01',
          custName: '测试01',
          custPhone: '18652599279',
          saleAmt: '200',
          materialAmt: '50',
          equipAmt: '70',
          refundAmt: '40',
          realSaleAmt: '60'
        },{
          orderTime: '2017-01-01',
          custName: '测试01',
          custPhone: '18652599279',
          saleAmt: '200',
          materialAmt: '50',
          equipAmt: '70',
          refundAmt: '40',
          realSaleAmt: '60'
        },{
          orderTime: '2017-01-01',
          custName: '测试01',
          custPhone: '18652599279',
          saleAmt: '200',
          materialAmt: '50',
          equipAmt: '70',
          refundAmt: '40',
          realSaleAmt: '60'
        },{
          orderTime: '2017-01-01',
          custName: '测试01',
          custPhone: '18652599279',
          saleAmt: '200',
          materialAmt: '50',
          equipAmt: '70',
          refundAmt: '40',
          realSaleAmt: '60'
        }]
      },
      echartData: []
    }
  },
  created(){
    this.init()
    this.echartPic()
  },
  components:{
    dataTable,
    paging
  },
  methods: {
    //查询订单数据
    init(){
      let params = {
        currentPage: this.pageProps.pageNum,
        numberPerPage: 10,
        token: global.getSalesToken()
      }
      console.log('查询订单数据',params)
      global.axiosGetReq('/saleMyOrder/myOrder',params).then((res) => {
        if (res.data.callStatus === 'SUCCEED') { 
          // this.replayList = res.data.data
          // this.pageProps.totalPage = res.data.totalPage
          console.log('查询订单数据',res.data.data)
          // this.orderInfo = res.data.data
          this.overYearHasCommission = res.data.data.overYearHasCommission
          this.pageProps.totalPage = res.data.totalPage
        }else{
          this.$message.error('查询订单失败！');
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
      console.log('echart数据',params)
      global.axiosGetReq('/saleMyOrder/chart',params).then((res) => {
        if (res.data.callStatus === 'SUCCEED') { 
          // this.replayList = res.data.data
          console.log('echart数据',res.data.data)
          this.echartData = res.data.data
        }else{
          this.$message.error('查询收入失败！');
        }
      })
    },
    pageHandler(data){
      this.pageProps.pageNum = data
      this.init();
    },
    selHandler(val){
      this.dateInfo.year = val.split("-")[0],
      this.dateInfo.month = val.split("-")[1]
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