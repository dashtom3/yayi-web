<template>
  <div class="myMoney">
    <div class="moneyHaed">
      <!-- <span>当前乾币：{{myAllMoney.currentMoney}}</span> -->
    </div>
    <el-table  :data="myAllMoney.details"  border  style="width: 100%;text-align:center;border-color:#dddddd;background-color:#f8f8f8;">
    <el-table-column  label="收入"  width="100"  align="center">
      <template scope="scope">
        <span class="colorBlue">{{scope.row.qbRget}}</span>
      </template>
    </el-table-column>
    <el-table-column  label="支出"  width="100"  align="center">
      <template scope="scope">
        <span class="colorRed">{{scope.row.qbRout}}</span>
      </template>
    </el-table-column>
    <el-table-column  prop="remark"  label="描述"  width="610"  align="center"></el-table-column>
    <el-table-column  prop="qbTime"  label="时间"  align="center"></el-table-column>
  </el-table>
  <!-- <div class="fenyeWrap" v-if="childConfig.pageNum>1">
    <paging0 :childmsg="childConfig" v-on:childSay="msgFromChlid"></paging0>
  </div> -->
  <div class="block" v-if="totalCount > 0">
    <!-- 分页 -->
    <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" layout="prev, pager, next, jumper" :total="totalCount" v-show="this.totalCount > this.pagesize">
    </el-pagination>
    <!-- 分页 -->
  </div>

  </div>
</template>

<script>
  // import paging0 from "../../brandLib/paging0"
import util from '../../../../common/util'
  export default {
    name: 'myMoney',
    data () {
      return {
        //默认每页数据量
        pagesize: 10,
        //当前页码
        currentPage: 1,
        //默认数据总数
        totalCount: 0,
        childConfig:{
          pageNum:null
        },
        getData:[],
        currentPage:1,
        everyPageShowNum:10,
        myAllMoney:{
          currentMoney:0,
          details:[{}]
        }
      }
    },
    // components:{
    //   paging0,
    // },
    created:function(){
      this.getMoneyList();

    },
    methods: {
      handleCurrentChange(val) {
        var that = this
        that.currentPage = val
        if (val == undefined) {
          that.currentPage = 1
        } else {
          that.currentPage = val
        }
        this.fenYeGetData(that.currentPage);
      },
      fenYeGetData:function(data){
        var that = this;
        var obj = {};
        obj.currentPage = data;
        obj.numberPerpage = 10;
        obj.token = this.global.getToken()
        that.global.axiosGetReq('/userMyQb/query', obj)
        .then((res) => {
          // console.log(res)
          if (res.data.callStatus === 'SUCCEED') {
            if(res.data.data.length>0){
              // that.currentMoney = res.data.data[0].user.qbBalance;
              for(let i in res.data.data){
                res.data.data[i].qbTime = util.formatDate.format(new Date(res.data.data[i].qbTime),'yyyy-MM-dd hh:mm:ss' );
              }
            }
            this.getData = res.data.data;
            that.totalCount=res.data.totalNumber;
            // this.childConfig.pageNum = parseInt(this.getData.length/this.everyPageShowNum)+1;
          } else {
            // that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      getMoneyList:function(){
        var that = this;
        var obj = {
          token:that.global.getToken()
        };
        that.global.axiosGetReq('/userMyQb/query', obj)
        .then((res) => {
          // console.log(res)
          if (res.data.callStatus === 'SUCCEED') {
            this.$emit("msgFromChild","hah")
            if(res.data.data.length>0){
              // that.currentMoney = res.data.data[0].user.qbBalance;
              for(let i in res.data.data){
                res.data.data[i].qbTime = util.formatDate.format(new Date(res.data.data[i].qbTime),'yyyy-MM-dd hh:mm:ss' );
              }
            }
            this.getData = res.data.data;
            that.totalCount=res.data.totalNumber;
            // this.childConfig.pageNum = parseInt(this.getData.length/this.everyPageShowNum)+1;
          } else {
            // that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
    },
    watch:{
      getData:{
        handler:function(){ // 计算当前乾币
          for(var i in this.getData){
            if(this.getData[i].qbRget!=0){
              this.myAllMoney.currentMoney += this.getData[i].qbRget;
            }
            if(this.getData[i].qbRout!=0){
              this.myAllMoney.currentMoney -= this.getData[i].qbRout;
            }
          }
          this.myAllMoney.details = this.getData.slice(0,this.everyPageShowNum);
        },
        deep:true
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.moneyHaed{
  line-height: 40px;
  padding-left: 38px;
  margin-bottom: 30px;
}
.colorBlue{
  color: #5db7e8;
}
.colorRed{
  color: #D81E06;
}
.fenyeWrap{
  padding-top: 40px;
  text-align: center;
  padding-bottom: 30px;
}
</style>
<style >
.myMoney .el-table  .is-center{
    border-color: #e9e9e9;
  }
.myMoney .el-table   .is-leaf{
  border-right: none;
}
.myMoney {
  font-size: 14px;
  min-height: 569px;
}
.myMoney .el-table th{
  background-color: #F2F2F2
}
.myMoney .el-table__footer-wrapper thead div, .myMoney .el-table__header-wrapper thead div{
  background-color: #F2F2F2;
}
.myMoney .el-table--enable-row-hover .el-table__body tr:hover>td{
background-color: #F2F2F2;
}
</style>
