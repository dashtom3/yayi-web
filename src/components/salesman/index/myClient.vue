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
  <el-dialog title="" :visible.sync="dialogVisibleInit" size="tiny" :before-close="handleClose">
    <span>您好，您查看的相关个人销售数据需要完善个人资料～</span>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="nowComplete">立即完善</el-button>
      <el-button @click="noSee">暂时不看</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
  import Bus from '../../global/bus.js'
  export default {
    name: 'myClient',
    data () {
      return {
        nowBtn:1,
        searchData:null,
        tableData:[
          // {userName:"dfaf",userPhone:'213414',company:"123553",place:"25235",orderCount:'143',spendMoney:'121',orderTime:'2017-11-11 1:00',bindTime:'2017-11-16 2:00'},
        ],
        dialogVisibleInit: false
      }
    },
    components: {

    },
    created: function() {
      var that = this
      var trueName = that.global.getSalesUser().trueName
      var sex = that.global.getSalesUser().sex
      var idCard = that.global.getSalesUser().idCard
      var weChar = that.global.getSalesUser().weChar
      if (trueName==null||sex==null||idCard==null||weChar==null) {
        that.dialogVisibleInit = true
      }
      that.getMyClientList();
    },
    methods: {
      // dialog关闭
      handleClose: function() {
        var that = this
        that.dialogVisibleInit = false
        Bus.$emit('getTarget', 'noSee');
      },
      // 立即完善
      nowComplete: function() {
        var that = this
        Bus.$emit('getTarget', 'nowComplete');
      },
      // 暂时不看
      noSee: function() {
        var that = this
        Bus.$emit('getTarget', 'noSee');
      },
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
  color:#005aab;
}
.searchWrap{
  border: 1px solid #005aab;
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
  background: #005aab;
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
  border-left: 1px solid #005aab;
  height: 40px;
}
.searchWrap .imgWrap img{
  margin-top: 8px;
  margin-left: 8px;
}

</style>
