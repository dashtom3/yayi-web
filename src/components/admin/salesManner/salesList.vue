<template>
  <el-row class="saleListWarp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>销售员管理</b></el-breadcrumb-item>
        <el-breadcrumb-item>销售员列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <!-- 头部查询 -->
    <el-col  class="toolbar" style="padding-bottom: 0px;padding-top:20px;">
      <el-form :inline="true" class="clearfix">
        <el-form-item>
          <el-input v-model="searchUserContent" class="fl t_input_w"  @change="pageInitHandler">
            <el-select v-model="searchUserType" slot="prepend" class="fl t_select_width" placeholder="请选择"  @change="selectOpt">
              <el-option label="手机号" value="手机号"></el-option>
              <el-option label="销售员姓名" value="销售员姓名"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="是否绑定客户：">
          <el-select v-model="searchState" placeholder="请选择" @change="pageInitHandler">
            <el-option  v-for="item in states"  :key="item.value"  :label="item.label"  :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="queryHandler">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!-- 绑定弹窗 -->
    <el-dialog :visible.sync="bindSalseAlert">
      <h4>当前已绑定人数（人）：<span>{{totalCount}}</span></h4>
      <el-tabs v-model="activeName2" type="card" @tab-click="tabHandler">
        <el-tab-pane label="未绑定" name="first">
          <el-form :inline="true" >
            <el-form-item>
              <el-input placeholder="请输入内容" v-model="noBindSearchContent">
                <el-select  slot="prepend" v-model="noBindSearchType" @change="selectOption">
                  <el-option label="手机号" value="手机号"></el-option>
                  <el-option label="真实姓名" value="真实姓名"></el-option>
                  <el-option label="单位名称" value="单位名称"></el-option>
                </el-select>
                <el-button slot="append" icon="search" @click="noBindSearch()"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item style="float:right">
              <el-button type="primary" v-on:click="bindAlertSearch()">绑定</el-button>
            </el-form-item>
          </el-form>
          <el-table ref="multipleTable" :data="noBindUserList"  border style="width: 100%" @selection-change="handleSelectionChange1" height="480">
            <el-table-column  type="selection" width="55"></el-table-column>
            <el-table-column  prop="trueName" align="center" label="真实姓名"></el-table-column>
            <el-table-column  prop="phone" align="center" label="手机号"></el-table-column>
            <el-table-column  prop="certification.companyName" align="center" label="单位名称"></el-table-column>
            <el-table-column  label="操作" align="center">
              <template scope="scope">
                <el-button type="primary" v-on:click="bindThisUser(scope.row,scope.$index)">绑定</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block" style="position:absolute;top:502px;right:100px;" v-show="this.totalCountNoBind">
            <el-pagination
              @current-change="handleCurrentChangeNoBind"
              :current-page.sync="currentPageNoBind"
              :page-size="pagesizeNoBind"
              layout="prev, pager, next, jumper"
              :total="totalCountNoBind">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已绑定" name="second">
          <el-form :inline="true" >
            <el-form-item>
              <el-input placeholder="请输入内容" v-model="BindSearchContent">
                <el-select  slot="prepend" placeholder="请选择" v-model="BindSearchType">
                  <el-option label="手机号" value="手机号"></el-option>
                  <el-option label="真实姓名" value="真实姓名"></el-option>
                  <el-option label="单位名称" value="单位名称"></el-option>
                </el-select>
                <el-button slot="append" icon="search" @click="BindSearch()"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item style="float:right">
              <el-button type="primary" v-on:click="cancleBindAlert()">取消绑定</el-button>
            </el-form-item>
          </el-form>
          <el-table ref="multipleTable1" :data="bindedUserList"  border style="width: 100%" @selection-change="handleSelectionChange2" height="480">
            <el-table-column  type="selection"  width="55">  </el-table-column>
            <el-table-column  prop="trueName"  align="center"  label="真实姓名">  </el-table-column>
            <el-table-column  prop="phone"  align="center"  label="手机号">  </el-table-column>
            <el-table-column  prop="certification.companyName"  align="center"  label="单位名称">  </el-table-column>
            <el-table-column  label="操作"  align="center" >
              <template scope="scope">
                <el-button type="primary" v-on:click="cancleBindThisUser(scope.row,scope.$index)">取消绑定</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block" style="position:absolute;top:502px;right:100px;" v-show="this.totalCount">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="pagesize"
              layout="prev, pager, next, jumper"
              :total="totalCount">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <!-- 钱包 -->
    <el-dialog title="钱包" :visible.sync="walletVisible" size="small">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="修改余额" name="first">
          <el-form ref="form" :model="walletform" label-width="120px" class="tab01">
            <el-form-item label="当前余额：">
              <span class="amt_color">{{walletform.balance}}</span>
            </el-form-item>
            <el-form-item label="修改类型：">
              <el-radio-group v-model="walletform.type">
                <el-radio label="1">增加余额</el-radio>
                <el-radio label="2">减少余额</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="数量：">
              <el-input v-model="walletform.num" class="wallet_w"></el-input>
            </el-form-item>
            <el-form-item label="修改后的余额：">
              <span class="amt_color">{{walletform.remainder}}</span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="钱包明细" name="second">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="income" align="center" label="进账（元）" width="180">
            </el-table-column>
            <el-table-column prop="outAccount" align="center" label="出账（元）" width="180">
            </el-table-column>
            <el-table-column prop="wallet" align="center" label="钱包余额（元）">
            </el-table-column>
            <el-table-column prop="updateTime" align="center" label="更新时间">
            </el-table-column>
            <el-table-column prop="desc" align="center" label="描述">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <!-- 详情 -->
    <el-dialog custom-class="asgagewgf" title="销售员详情" :visible.sync="showSaleDetailInfor">
      <div class="personalInfor">
        <img :src="headImg" alt="头像" style="padding-right:50px;">
        <h3>个人资料</h3>
        <div>
          <span>真实姓名：{{someOneUserDetails.info.trueName}}</span>
        </div>
        <div>
          <span>手机号：{{someOneUserDetails.info.phone}}</span>
          <span>性别：{{sexShow}}</span>
        </div>
        <div>
          <span>微信：{{someOneUserDetails.info.weChar}}</span>
          <span>邮箱：{{someOneUserDetails.info.email}}</span>
        </div>
        <div>
          <span>出生日期：{{birthdayFormate}}</span>
          <span>学历：{{someOneUserDetails.info.education}}</span>
        </div>
        <div>
          <span>工作单位：{{someOneUserDetails.info.workUnit}}</span>
          <span>工作职位：{{someOneUserDetails.info.workPosition}}</span>
        </div>
        <div>
          <span>所在地省市区：{{partFormate}}</span>
          <span>详细地址：{{someOneUserDetails.info.address}}</span>
        </div>
        <div>
          <span>身份证号：{{someOneUserDetails.info.idCard}}</span>
          <span>注册时间：{{regTimeFormate}}</span>
        </div>
        <div>
          <span>钱包余额：{{someOneUserDetails.info.money}}</span>
          <span>已绑定的客户数：{{someOneUserDetails.info.bindUserNum}}</span>
        </div>
      </div>
      <div class="certification">
        <h3>提现方式</h3>
        <div>
          <span>类型：{{someOneUserDetails.getMoneyStyle.postalType}}</span>
          <span v-if="this.someOneUserDetails.getMoneyStyle.bankName">银行：{{someOneUserDetails.getMoneyStyle.bankName}}</span>
        </div>
        <div>
          <span>开户者：{{someOneUserDetails.getMoneyStyle.openName}}</span>
          <span>账号：{{someOneUserDetails.getMoneyStyle.accountNumber}}</span>
        </div>
      </div>
      <h3>绑定的客户信息</h3>
      <el-table :data="someOneUserDetails.bindUsers" border height="480">
        <el-table-column align="center" property="phone" label="手机号"></el-table-column>
        <el-table-column align="center" property="trueName" label="真实姓名"></el-table-column>
        <el-table-column align="center" property="certification.companyName" label="单位名称"></el-table-column>
      </el-table>
      <div class="block" style="position:absolute;top:1029px;right:100px;" v-show="this.totalCountDetail">
        <el-pagination
          @current-change="handleCurrentChangeDetail"
          :current-page.sync="currentPageDetail"
          :page-size="pagesizeDetail"
          layout="prev, pager, next"
          :total="totalCountDetail">
        </el-pagination>
      </div>
    </el-dialog>
    
    <!-- 主要列表 -->
    <el-table :data="salesList"  border style="width: 100%">
      <el-table-column  prop="trueName"  align="center"  label="销售员姓名"></el-table-column>
      <el-table-column  prop="phone"  align="center"  label="手机号"></el-table-column>
      <el-table-column  prop="created"  align="center"  label="注册时间"> 
        <template scope="scope">
          <span>{{new Date(scope.row.created).getFullYear()+'-'+ fillZero(new Date(scope.row.created).getMonth()+1)+'-'+fillZero(new Date(scope.row.created).getDate())}}</span>
        </template>
      </el-table-column>
      <el-table-column  prop="isBindUser"  align="center"  label="是否绑定客户"> 
        <template scope="scope">
          <span v-if="scope.row.isBindUser===1">是</span>
          <span v-else-if="scope.row.isBindUser===2">否</span>
        </template>
      </el-table-column>
      <el-table-column  prop="bindUserNum"  align="center"  label="客户数量"></el-table-column>
      <el-table-column  prop="bindUserNum"  align="center" sortable label="累计收入（元）"></el-table-column>
      <el-table-column  label="操作"  align="center">
        <template scope="scope">
            <el-button v-if="scope.row.isBindUser===2" type="text"  v-on:click="bindUser(scope.$index, scope.row)">绑定客户</el-button>
            <el-button v-else type="text" v-on:click="cancleBindUser(scope.$index, scope.row)">取消绑定</el-button>
            <el-button type="text" v-on:click="walletHandler(scope.$index,scope.row)">钱包</el-button>
            <el-button type="text" v-on:click="saleDetail(scope.$index,scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <paging :childmsg="pageProps" style="position:absolute;top:680px;right:0;" v-show="this.salesList.length" @childSay="pageHandler"></paging>
  </el-row>
</template>
<script>
  import global from '../../global/global'
  import paging from '../../website/brandLib/paging0'
  export default{
    data(){
      return {
        noBindSearchType:"手机号",
        BindSearchType:"手机号",
        headImg: '',
        pageProps: {
          pageNum: 1,
          totalPage: 1
        },
        //默认每页数据量
        pagesize: 10,
        //当前页码
        currentPage: 1,
        //默认数据总数
        totalCount: 1000,
        pagesizeNoBind: 10,
        currentPageNoBind: 1,
        totalCountNoBind: 1000,
        pagesizeDetail: 10,
        currentPageDetail: 1,
        totalCountDetail: 1000,
        noBindSearchContent:null,
        BindSearchContent:null,
        detailPhone: '',
        multipleSelection1: [],
        multipleSelection2: [],
        activeName2: 'first',
        showSaleDetailInfor:false,
        walletVisible: false,
        bindSalseAlert:false,
        searchUserContent:'',
        searchUserType:"手机号",
        searchState:"",
        salePhone: '',
        activeName: 'first',
        bindedUserList:[],
        noBindUserList:[],
        someOneUserDetails:{
          info:{},
          getMoneyStyle:{},
          bindUsers:[]
        },
        salesList:[],
        userTypes:[
          {value: '不限',label: '不限'},
          {value: '个人',label: '个人'},
          {value: '机构',label: '机构'}
        ],
        states:[
          {value: '',label: '全部'},
          {value: '1',label: '是'},
          {value: '2',label: '否'}       
        ],
        walletform: {
          balance: '100',
          type: '1',
          num: '10',
          remainder: '110'
        },
        tableData: [{
          income: '2016-05-02',
          outAccount: '王小虎',
          wallet: '上海市普陀区金沙江路 1518 弄',
          updateTime: '2017-01-01',
          desc: 'yayayayayay'
        }, {
          income: '2016-05-02',
          outAccount: '王小虎',
          wallet: '上海市普陀区金沙江路 1518 弄',
          updateTime: '2017-01-01',
          desc: 'yayayayayay'
        },{
          income: '2016-05-02',
          outAccount: '王小虎',
          wallet: '上海市普陀区金沙江路 1518 弄',
          updateTime: '2017-01-01',
          desc: 'yayayayayay'
        },{
          income: '2016-05-02',
          outAccount: '王小虎',
          wallet: '上海市普陀区金沙江路 1518 弄',
          updateTime: '2017-01-01',
          desc: 'yayayayayay'
        },{
          income: '2016-05-02',
          outAccount: '王小虎',
          wallet: '上海市普陀区金沙江路 1518 弄',
          updateTime: '2017-01-01',
          desc: 'yayayayayay'
        }]
      }
    },
    components: {
      paging
    },
    watch:{
      multipleSelection1:{
        handler:function(){
          
        },
        deep:true
      },
      bindSalseAlert: function(){
        if(!this.bindSalseAlert){
          this.queryHandler()
        }
      }
    },
    computed: {
      partFormate: function(){
        return this.someOneUserDetails.info.part && this.someOneUserDetails.info.part.split(',').join('/')
      },
      sexShow: function(){
        return this.someOneUserDetails.info.sex === 2 ? '女' : '男'
      },
      regTimeFormate: function(){
        return new Date(this.someOneUserDetails.info.created).getFullYear() + '-' + this.fillZero((new Date(this.someOneUserDetails.info.created).getMonth() + 1)) + '-' + this.fillZero(new Date(this.someOneUserDetails.info.birthday).getDate()) 
      },
      birthdayFormate: function(){
        return new Date(this.someOneUserDetails.info.birthday).getFullYear() + '-' + this.fillZero((new Date(this.someOneUserDetails.info.birthday).getMonth() + 1)) + '-' + this.fillZero(new Date(this.someOneUserDetails.info.birthday).getDate()) 
      }
    },
    created(){
      this.queryHandler()
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      walletHandler(index, row){
        this.walletVisible = true
        console.log(row)
      },
      //查询条件改变时初始化pageNum为1
      pageInitHandler(){
        this.pageProps.pageNum = 1;
      },
      handleCurrentChangeDetail(val){
        this.currentPageDetail = val 
        this.saleDetail()
      },
      handleCurrentChangeNoBind(val){
        this.currentPageNoBind = val 
        this.noBindSearch()
      },
      handleCurrentChange(val) {
        this.currentPage = val 
        this.BindSearch()
      },
      tabHandler(tab, event){
        if(tab.name === 'first'){
          this.noBindSearch()
        }else if(tab.name === 'second'){
          this.BindSearch()
        }
      },
      fillZero: function(n){
        return n<10 ? '0'+ n: n 
      },
      selectOpt(key){
        this.searchUserType = key;
        this.searchUserContent = '';
        this.pageProps.pageNum = 1;
      },
      selectOption(key){
        this.noBindSearchType = key;
        this.noBindSearchContent = '';
      },
      queryHandler: function(){
        var params;
        if(this.searchUserType === '手机号'){
          params = {
            saleId: '',
            phone: this.searchUserContent,
            trueName: '',
            isBindUser: this.searchState,
            currentPage: this.pageProps.pageNum,
            numberPerPage: 10
          }
        }else if(this.searchUserType === '销售员姓名'){
          params = {
            saleId: '',
            phone: '',
            trueName: this.searchUserContent,
            isBindUser: this.searchState,
            currentPage: this.pageProps.pageNum,
            numberPerPage: 10
          }
        }
        global.axiosGetReq('/saleList/query',params).then((res) => {
          if(res.data.callStatus === 'SUCCEED'){
            this.salesList = res.data.data
            this.pageProps.totalPage = res.data.totalPage
          }
        })
      },
      pageHandler(data){
        this.pageProps.pageNum = data
        this.queryHandler();
      },
      //查询已绑定用户
      BindSearch:function(){ 
        let params;
        if(this.BindSearchType === "手机号"){
          params = {
            salePhone: this.salePhone,
            userPhone: this.BindSearchContent,
            trueName: '',
            companyName: '',
            isBind: 2,
            currentPage: this.currentPage,
            numberPerPage: this.pagesize
          }
        }else if(this.BindSearchType === "真实姓名"){
          params = {
            salePhone: this.salePhone,
            userPhone: '',
            trueName: this.BindSearchContent,
            companyName: '',
            isBind: 2,
            currentPage: this.currentPage,
            numberPerPage: this.pagesize
          }
        }else if(this.BindSearchType === "单位名称"){
          params = {
            salePhone: this.salePhone,
            userPhone: '',
            trueName: '',
            companyName: this.BindSearchContent,
            isBind: 2,
            currentPage: this.currentPage,
            numberPerPage: this.pagesize
          }
        }
        global.axiosGetReq('/saleList/userlist',params).then((res) => {
          if(res.data.callStatus === 'SUCCEED'){
            this.bindedUserList = res.data.data
            this.totalCount = res.data.totalNumber
          }
        })
      },
      //查询未绑定的用户
      noBindSearch:function(){
        let params;
        if(this.noBindSearchType === "手机号"){
          params = {
            salePhone: this.salePhone,
            userPhone: this.noBindSearchContent,
            trueName: '',
            companyName: '',
            isBind: 1,
            currentPage: this.currentPageNoBind,
            numberPerPage: this.pagesizeNoBind
          }
        }else if(this.noBindSearchType === "真实姓名"){
          params = {
            salePhone: this.salePhone,
            userPhone: '',
            trueName: this.noBindSearchContent,
            companyName: '',
            isBind: 1,
            currentPage: this.currentPageNoBind,
            numberPerPage: this.pagesizeNoBind
          }
        }else if(this.noBindSearchType === "单位名称"){
          params = {
            salePhone: this.salePhone,
            userPhone: '',
            trueName: '',
            companyName: this.noBindSearchContent,
            isBind: 1,
            currentPage: this.currentPageNoBind,
            numberPerPage: this.pagesizeNoBind
          }
        }
        global.axiosGetReq('/saleList/userlist',params).then((res) => {
          if(res.data.callStatus === 'SUCCEED'){
            this.noBindUserList = res.data.data
            this.totalCountNoBind = res.data.totalNumber
          }
        })
        // this.noBindSearchContent = null;//清空搜索内容
      },
      //一次绑定多个
      bindAlertSearch:function(){
        var that = this;
        var userslist01 = [];
        if(that.multipleSelection1.length==0){
          that.$alert("最少选择一个", {confirmButtonText: '确定！'});
        }else{
          for(let i=0;i<that.multipleSelection1.length;i++){
            userslist01.push(that.multipleSelection1[i].phone)
          }
          let params = {
            salePhone: that.salePhone,
            userPhone: userslist01
          }
          global.axiosPostReq('/saleList/bind',params).then((res) => {
            if(res.data.callStatus === 'SUCCEED'){
              that.$message({
                type: 'success',
                message: '绑定成功!'
              });
              that.BindSearch()
              that.noBindSearch()
            }
          })
          
        }
      },
      //一次取消绑定多个
      cancleBindAlert:function(){
        var that = this;
        var userslist02 = [];
        if(that.multipleSelection2.length==0){
          that.$alert("最少选择一个", {confirmButtonText: '确定！'});
        }else{
          for(let i=0;i<that.multipleSelection2.length;i++){
            userslist02.push(that.multipleSelection2[i].phone)
          }
          let params = {
            salePhone: that.salePhone,
            userPhone: userslist02
          }
          global.axiosPostReq('/saleList/disBind',params).then((res) => {
            if(res.data.callStatus === 'SUCCEED'){
              that.$message({
                type: 'success',
                message: '取消绑定成功!'
              });
              that.BindSearch()
              that.noBindSearch()
            }
          })
        }
      },
      //绑定用户
      bindThisUser:function(nowUser,index){
        var that = this;
        var userList02 = [];
        userList02.push(nowUser.phone);
        var obj = {
          salePhone: this.salePhone,
          userPhone: userList02
        }
        global.axiosPostReq('/saleList/bind',obj).then((res) => {
          if(res.data.callStatus === 'SUCCEED'){
            this.$message({
              type: 'success',
              message: '绑定成功!'
            });
            this.BindSearch()
            this.noBindSearch()
          }
        })
      },
      //取消绑定用户
      cancleBindThisUser:function(nowUser,index){
        var that = this;
        var userlist01 = [];
        userlist01.push(nowUser.phone);
        var obj = {
          salePhone: this.salePhone,
          userPhone: userlist01
        }
        global.axiosPostReq('/saleList/disBind',obj).then((res) => {
          if(res.data.callStatus === 'SUCCEED'){
            this.$message({
              type: 'success',
              message: '取消绑定成功!'
            });
            this.BindSearch()
            this.noBindSearch()
          }
        })
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable1.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable1.clearSelection();
        }
      },
      handleSelectionChange1:function(val) {
        this.multipleSelection1 = val;
      },
      handleSelectionChange2:function(val) {
        this.multipleSelection2 = val;
      },
      bindUser:function(index, row){
        this.bindSalseAlert = true;
        this.activeName2 = "first";
        this.salePhone = row.phone;
        this.noBindSearch();
        this.BindSearch();
      },
      cancleBindUser:function(index, row){
        this.bindSalseAlert = true;
        this.activeName2 = "second";
        this.salePhone = row.phone;
        this.BindSearch();
        this.noBindSearch();
      },
      //查看详情
      saleDetail:function(index, row){
        this.showSaleDetailInfor = true;
        if(row){
          this.detailPhone = row.phone
        }
        let params = {
          phone: this.detailPhone,
          currentPage: this.currentPageDetail,
          numberPerPage: this.pagesizeDetail
        }
        global.axiosGetReq('/saleList/detail',params).then((res) => {
          if(res.data.callStatus === 'SUCCEED'){
            this.someOneUserDetails.info = res.data.data
            this.totalCountDetail = res.data.totalNumber
            this.someOneUserDetails.bindUsers = res.data.data.user
            this.someOneUserDetails.getMoneyStyle = {
              postalType: res.data.data.postalType,
              bankName: res.data.data.bankName,
              openName: res.data.data.openName,
              accountNumber: res.data.data.accountNumber
            }
            this.headImg = res.data.data.salePic
          }
        })
      }
    },
  }
</script>

<style>
  .saleListWarp .el-select .el-input{
    width: 120px;
  }
    .saleListWarp h4{
      line-height: 50px;
    }
  /*.saleListWarp .el-input__inner{
    width: 200px;
  }*/
  .saleListWarp   .asgagewgf h3{
      font-weight: 500;
      line-height: 50px;
      color: #20a0ff;
    }
  .saleListWarp   .asgagewgf .personalInfor{
      position: relative;
    }
  .saleListWarp   .asgagewgf .personalInfor img{
      position: absolute;
      top: 0;
      right: 0;
      width: 150px;
      height: 150px;
    }
  .saleListWarp   .asgagewgf  span{
      width: 40%;
      display: inline-block;
      line-height: 35px;
    }
  .t_input_w{
    width:320px!important;
  }
  .t_select_width{
    width:120px;
  }
  .wallet_w{
    width: 220px;
  }
  .tab01{
    width: 400px;
    height: 300px;
    margin: 100px auto;
  }
  .amt_color{
    color: #20a0ff;
  }
</style>
