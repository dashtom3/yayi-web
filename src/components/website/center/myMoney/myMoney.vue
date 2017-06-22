<template>
  <div class="myMoney">
    <div class="moneyHaed">
      <span>当前乾币：{{myAllMoney.currentMoney}}</span>
    </div>
    <el-table
    :data="myAllMoney.details"
    border
    style="width: 100%;text-align:center;border-color:#dddddd;background-color:#f8f8f8">
    <el-table-column
      label="收入"
      width="142"
      align="center">
      <template scope="scope">
        <span class="colorRed">{{scope.row.num}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="支出"
      width="143"
      align="center">
      <template scope="scope">
        <span class="colorBlue">{{scope.row.num2}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="describe"
      label="描述"
      width="610"
      align="center">
    </el-table-column>
    <el-table-column
      prop="time"
      label="时间"
      align="center">
    </el-table-column>
  </el-table>
  <div class="fenyeWrap">
    <paging0></paging0>
  </div>
  </div>
</template>

<script>
  import paging0 from "../../brandLib/paging0"
  // import axios from 'axios'
  // import global from '../../../global/global'

  export default {
    name: 'myMoney',
    data () {
      return {
        myAllMoney:{
          currentMoney:1234,
          waitMoney:433,
          howMany:100,
          details:[
            {
              num:null,
              num2:45,
              //1是收入，2是指出
              type:1,
              describe:"用来干嘛的我忘记了。。。。",
              time:"1234-12-12 12:12"
            },
            {
              num:null,
              num2:45,
              //1是收入，2是指出
              type:1,
              describe:"用来干嘛的我忘记了。。。。",
              time:"1234-12-12 12:12"
            },
            {
              num:null,
              num2:45,
              //1是收入，2是指出
              type:1,
              describe:"用来干嘛的我忘记了。。。。",
              time:"1234-12-12 12:12"
            },
            {
              num:null,
              num2:45,
              //1是收入，2是指出
              type:1,
              describe:"用来干嘛的我忘记了。。。。",
              time:"1234-12-12 12:12"
            },
            {
              num:null,
              num2:45,
              //1是收入，2是指出
              type:1,
              describe:"用来干嘛的我忘记了。。。。",
              time:"1234-12-12 12:12"
            },
            {
              num:null,
              num2:45,
              //1是收入，2是指出
              type:1,
              describe:"用来干嘛的我忘记了。。。。",
              time:"1234-12-12 12:12"
            },
            {
              num:12,
              num2:null,
              //1是收入，2是指出
              type:1,
              describe:"用来干嘛的我忘记了。。。。",
              time:"1234-12-12 12:12"
            },
            {
              num:12,
              num2:null,
              //1是收入，2是指出
              type:1,
              describe:"用来干嘛的我忘记了。。。。",
              time:"1234-12-12 12:12"
            },
            {
              num:12,
              num2:null,
              //1是收入，2是指出
              type:1,
              describe:"用来干嘛的我忘记了。。。。",
              time:"1234-12-12 12:12"
            }
          ]
        }
      }
    },
    components:{
      paging0,
    },
    methods: {

    },
    created:function(){
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
        } else {
          that.$message.error('账号或密码错误！');
        }
      })
    }
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
