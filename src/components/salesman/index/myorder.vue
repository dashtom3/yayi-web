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
    <dataTable :orderInfo="orderInfo" :echartsTitle="echartsTitle" :monthX="monthX" :maxEchartVal="maxEchartVal" :echartData="echartData" v-if="orderInfo.myOrderVoList"></dataTable>
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
      //日期select
      monthVal: '',
      //月份
      monthX: '',
      //echarts数据最大值
      maxEchartVal: 0,
      allCommission: 0,
      //标题
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
        year: this.dateInfo.year,
        month: this.dateInfo.month,
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
        year: this.dateInfo.year,
        month: this.dateInfo.month,
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
    //根据当前月份计算当月总天数
    getDaysInMonth(year,month){ 
      month = parseInt(month,10);  
      var temp = new Date(year,month,0); 
      return temp.getDate(); 
    },
    //查询销售额
    echartPic(){
      let params = {
        year: this.dateInfo.year,
        month: this.fillZero(this.dateInfo.month),
        token: global.getSalesToken()
      }
      let day = 0
      let echartsArr = []
      this.echartData = []
      global.axiosGetReq('/saleMyOrder/chart',params).then((res) => {
        if (res.data.callStatus === 'SUCCEED') { 
          //是否为当前月份
          if(this.dateInfo.month === new Date().getMonth()+1){
            day = new Date().getDate() + 1
          }else{
            //找出最大天数
            day = this.getDaysInMonth(this.dateInfo.year,this.dateInfo.month) + 1
          }
          
          //初始化所有数据为0
          for(var j=0;j<day;j++){
            this.echartData.push({
              name: '(￥' + 0 + '， ' + 0 + '单)',
              value:  0
            })
          }
          
          //遍历数组替换初始化数据
          for(var i=0;i<res.data.data.length;i++){
            echartsArr.push(res.data.data[i].dayCommission)
            this.echartData.splice(new Date(res.data.data[i].created).getDate(),1,{
              name: '(￥' + res.data.data[i].dayCommission + '， ' +  res.data.data[i].dayOrderNum + '单)',
              value:  res.data.data[i].dayCommission
            })
          }
          //根据数据设置一个最大值
          if(res.data.data.length){
            this.maxEchartVal = Math.max.apply(null, echartsArr)
            this.maxEchartVal = (Math.ceil(this.maxEchartVal/1000)*1000)<8000?8000:(Math.ceil(this.maxEchartVal/1000)*1000)
          }else{
            this.maxEchartVal = 8000
          }
          
        }else{
          this.$message.error('网络出错，请稍后再试！');
        }
      })
    },
    selHandler(val){
      this.dateInfo.year = val.split("-")[0]
      this.dateInfo.month = Number(val.split("-")[1])
      this.echartsTitle = this.dateInfo.year + '年'+ parseInt(this.dateInfo.month) +'月份业绩记录'
      this.monthX = parseInt(this.dateInfo.month)
      this.echartData = []
      this.echartPic()
      this.queryOrderList()
      this.init()
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