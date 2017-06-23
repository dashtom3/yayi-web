<template>
  <div class="myMoney">
    <div class="moneyHaed">
      <span>当前乾币：{{myAllMoney.currentMoney}}</span>
    </div>
    <el-table  :data="myAllMoney.details"  border  style="width: 100%;text-align:center;border-color:#dddddd;background-color:#f8f8f8;">
    <el-table-column  label="收入"  width="142"  align="center">
      <template scope="scope">
        <span class="colorRed">{{scope.row.qbRget}}</span>
      </template>
    </el-table-column>
    <el-table-column  label="支出"  width="143"  align="center">
      <template scope="scope">
        <span class="colorBlue">{{scope.row.qbRout}}</span>
      </template>
    </el-table-column>
    <el-table-column  prop="remark"  label="描述"  width="610"  align="center"></el-table-column>
    <el-table-column  prop="qbTime"  label="时间"  align="center"></el-table-column>
  </el-table>
  <div class="fenyeWrap" v-if="childConfig.pageNum>1">
    <paging0 :childmsg="childConfig" v-on:childSay="msgFromChlid"></paging0>
  </div>
  </div>
</template>

<script>
  import paging0 from "../../brandLib/paging0"

  export default {
    name: 'myMoney',
    data () {
      return {
        childConfig:{
          pageNum:null
        },
        getData:[],
        currentPage:1,
        everyPageShowNum:8,
        myAllMoney:{
          currentMoney:0,
          details:[]
        }
      }
    },
    components:{
      paging0,
    },
    methods: {
      msgFromChlid:function(data){
        this.currentPage = data;
      },
      getMoneyList:function(){
        var that = this;
        var obj = {
          phone:that.global.getUser().phone,
          type:1,
          token:that.global.getToken()
        };
        that.global.axiosGetReq('/userMyQb/query', obj)
        .then((res) => {
          console.log(res)
          if (res.data.callStatus === 'SUCCEED') {
            this.getData = res.data.data;
            this.childConfig.pageNum = parseInt(this.getData.length/this.everyPageShowNum)+1;
          } else {
            that.$message.error('网络出错，请稍后再试！');
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
      currentPage:function(){
        this.myAllMoney.details = this.getData.slice(this.everyPageShowNum*(this.currentPage-1),this.everyPageShowNum*this.currentPage);
      },
    },
    created:function(){
      this.getMoneyList();
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.moneyHaed{
  border-bottom: 1px solid #eeeeee;
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
