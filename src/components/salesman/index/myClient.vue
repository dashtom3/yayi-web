<template>
  <div class="myClient">
    <div class="searchWrap" >
      <input type="text" v-model="searchData" placeholder="输入客户姓名，手机号或单位名称查询">
      <div class="imgWrap" @click="search()">
        <img src="../../../images/salesMan/search.png" alt="">
      </div>
    </div>
    <div class="bindedClient" @click="goToFindClient()">
      <span class="span1">
        已绑定客户数：
        <span>{{tableData.length}}</span>
      </span>
      <span class="span2">
        <img src="../../../images/salesMan/toRight.png" alt="">
        发现更多客户
      </span>
    </div>
    <div class="clientList">
      <el-table :data="tableData" border :default-sort = "{prop: 'bindTime', order: 'descending'}" style="width: 100%;text-align:center">
        <el-table-column align="center"  prop="trueName" label="客户姓名"  ></el-table-column>
        <el-table-column align="center"  prop="phone" label="客户手机号"  ></el-table-column>
        <el-table-column align="center"  prop="companyName" label="单位名称"  ></el-table-column>
        <el-table-column align="center"  prop="workAddress" label="单位地址"  ></el-table-column>
        <el-table-column align="center"  prop="orderaCount" label="累计订单数"  ></el-table-column>
        <el-table-column align="center"  prop="orderaMoneyCount" width="140" label="累计消费（元）"  ></el-table-column>
        <el-table-column align="center"  prop="latelyOrderDate" label="最近一次下单时间" sortable width="200"  ></el-table-column>
        <el-table-column align="center"  prop="bindSaleTime" label="绑定时间" sortable  width="200"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'myClient',
    data () {
      return {
        nowBtn:1,
        searchData:null,
        tableData:[
          // {userName:"dfaf",userPhone:'213414',company:"123553",place:"25235",orderCount:'143',spendMoney:'121',orderTime:'2017-11-11 1:00',bindTime:'2017-11-16 2:00'},
        ]
      }
    },
    components: {

    },
    created: function() {
      var that = this;
      that.getMyClientList();
    },
    methods: {
      getMyClientList:function(){
        var that = this;
        var obj = {
          token:that.global.getSalesToken()
        };
        that.global.axiosGetReq("/saleMyClient/myClient",obj)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.tableData = res.data.data;
          }
        })
      },
      goToFindClient:function(){
        var that = this;
        that.$emit('msgFromChild', 'goToFindClient' )
      },
      search:function(){
        var that = this;
        // if(that.searchData){
          var obj = {
            value:that.searchData,
            token:that.global.getSalesToken()
          };
          that.global.axiosGetReq("/saleMyClient/myClient",obj)
          .then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              that.tableData = res.data.data;
            }
          })
        // }else{
        //   that.$alert('请输入搜索内容',  {confirmButtonText: '确定',});
        // }
      }
    }
  }
</script>

<style scoped>
.myClient{
  width: 1200px;
  margin: auto;
  min-height:676px;
}
.clientList{
  margin-bottom: 100px;
}
.bindedClient{
  margin-bottom: 5px;
  margin-top: 5px;
}
.bindedClient .span1 span{
  color: #db1e06;
  font-weight: 600;
}
.bindedClient .span2{
  float: right;
  cursor: pointer;
  color:#5db7e8;
}
.searchWrap{
  border: 1px solid #5db7e8;
  width: 500px;
  border-radius: 2px;
  margin-top: 30px;
  cursor: pointer;
  margin-bottom: 25px;
}
.myClientHeadBtn{
  margin-top: 30px;
}
.myClientHeadBtn span{
display: inline-block;
line-height: 40px;
text-align: center;
padding: 0 10px;
cursor: pointer;
}
.myClientHeadBtn .sapnActive{
  color: white;
  background: #5db7e8;
}
.searchWrap input{
  border: none;
  outline: none;
  line-height: 40px;
  margin-left: 30px;
  width: 400px;
}
.searchWrap .imgWrap{
  display: inline-block;
  float: right;
  width: 46px;
  border-left: 1px solid #5db7e8;
  height: 40px;
}
.searchWrap .imgWrap img{
  margin-top: 8px;
  margin-left: 8px;
}

</style>
