<template>
  <div class="findClient">
    <div class="findClientHeadBtn">
      <span @click='changBtn(1)' :class="{sapnActive:nowBtn==true}">已注册，待绑定</span>
      <span @click='changBtn(2)' :class="{sapnActive:nowBtn==false}">未注册</span>
    </div>
    <div class="searchWrap" >
      <input type="text" v-model="searchData" placeholder="输入客户姓名，手机号或单位名称查询">
      <div class="imgWrap" @click="search()">
        <img src="../../../images/salesMan/search.png" alt="">
      </div>
    </div>
    <div class="bindedClient" @click="goToMyClient()">
      <img src="../../../images/salesMan/toRight.png" alt="">
      我已绑定的客户
    </div>
    <div class="clientList">
      <div v-if="showBindOrNoBindList">
        <el-table  :data="tableData" border style="width: 100%;text-align:center">
          <el-table-column align="center" label="单位名称"  >
            <template scope='scope'>
              <span v-if="scope.row.certification">{{scope.row.certification.companyName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"  label="单位地址" width="400" >
            <template scope='scope'>
              <span v-if="scope.row.certification">{{scope.row.certification.workAddress}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"  label="联系人">
            <template scope='scope'>
              <span >{{scope.row.trueName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"  label="联系方式">
            <template scope='scope'>
              <span >{{scope.row.phone}}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" v-show="this.totalCounted > this.pagesizeed">
          <el-pagination
            @current-change="handleCurrentedChange"
            :current-page.sync="currentPageed"
            :page-size="pagesizeed"
            layout="prev, pager, next, jumper"
            :total="totalCounted">
          </el-pagination>
        </div>
      </div>
      <div v-else>
        <el-table  :data="tableDataNoRegist" border style="width: 100%;text-align:center">
          <el-table-column align="center"   label="单位名称"  >
            <template scope='scope'>
              <span>{{scope.row.unitName}}</span>
            </template></el-table-column>
          <el-table-column align="center"  label="单位地址" width="400" >
            <template scope='scope'>
              <span>{{scope.row.unitAddress}}</span>
            </template></el-table-column>
          </el-table-column>
          <el-table-column align="center"  label="联系人">
            <template scope='scope'>
              <span>{{scope.row.contacts}}</span>
            </template></el-table-column>
          </el-table-column>
          <el-table-column align="center"  label="联系方式">
            <template scope='scope'>
              <span>{{scope.row.contactsPhone}}</span>
            </template></el-table-column>
          </el-table-column>
        </el-table>
        <div class="block" v-show="this.totalCount > this.pagesize">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pagesize"
            layout="prev, pager, next, jumper"
            :total="totalCount">
          </el-pagination>
        </div>
      </div>
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
    name: 'findClient',
    data () {
      return {
        showBindOrNoBindList:true,
        nowBtn:1,
        searchData:null,
        tableDataNoRegist:[],
        tableData:[],
        pagesize: 10,
        currentPage: 1,
        totalCount: 1,
        pagesizeed: 10,
        currentPageed: 1,
        totalCounted: 1,
        dialogVisibleInit: false,
      }
    },
    created: function() {
      var that = this;
      var trueName = that.global.getSalesUser().trueName
      var sex = that.global.getSalesUser().sex
      var idCard = that.global.getSalesUser().idCard
      var weChar = that.global.getSalesUser().weChar
      if (trueName==null||sex==null||idCard==null||weChar==null) {
        that.dialogVisibleInit = true
      }
      that.getWaitBindUserList();
      that.getNoRegistUserList();
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
      handleCurrentChange(val) {
        this.currentPage = val 
        this.getNoRegistUserList(val)
      },
      handleCurrentedChange(val) {
        this.currentPageed = val 
        this.getWaitBindUserList(val)
      },
      //未注册的
      getNoRegistUserList(val){
        var that =this;
        if (val == undefined || typeof(val) == 'object') {
          this.currentPage = 1
        } else {
          this.currentPage = val
        }
        var obj = {
          state: this.searchData,
          currentPage: this.currentPage,
          numberPerPage: this.pagesize
        };
        that.global.axiosPostReq('/findCus/unregistered', obj)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.tableDataNoRegist = res.data.data;
            this.totalCount = res.data.totalNumber;
          }
        })
      },
      //已注册
      getWaitBindUserList(val){
        var that =this;
        if (val == undefined || typeof(val) == 'object') {
          this.currentPageed = 1
        } else {
          this.currentPageed = val
        }
        var obj = {
          state: this.searchData,
          currentPage: this.currentPageed,
          numberPerPage: this.pagesizeed
        };
        that.global.axiosPostReq('/findCus/registered', obj)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.tableData = res.data.data;
            this.totalCounted = res.data.totalNumber;
          }
        })
      },
      changBtn:function(arg){
        var that = this;
        if(arg==1){
          that.nowBtn = true;
          that.searchData = "";
          that.getWaitBindUserList();
          that.showBindOrNoBindList = true;
        }else{
          that.nowBtn = false;
          that.searchData = "";
          that.getNoRegistUserList();
          that.showBindOrNoBindList = false;
        } 
      },
      goToMyClient:function(){
        var that = this;
        that.$emit('msgFromChild', 'goToMyClient' )
      },
      search:function(){
        var that = this;
        that.getNoRegistUserList();
        that.getWaitBindUserList();
      }
    }
  }
</script>

<style scoped>
.findClient{
  width: 1200px;
  margin: auto;
  min-height: 676px;
}
.clientList{
  margin-bottom: 60px;
}
.bindedClient{
  text-align: right;
  color:#005aab;
  margin-bottom: 5px;
  margin-top: 5px;
  cursor: pointer;
}
.searchWrap{
  border: 1px solid #005aab;
  width: 500px;
  border-radius: 2px;
  margin-top: 30px;
  cursor: pointer;
}
.findClientHeadBtn{
  margin-top: 30px;
}
.findClientHeadBtn span{
display: inline-block;
line-height: 40px;
text-align: center;
padding: 0 10px;
cursor: pointer;
}
.findClientHeadBtn .sapnActive{
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
