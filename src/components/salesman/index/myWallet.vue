<template>
	<el-row class="brandWarp">
    <el-col :span="24" class="warp-breadcrum1">
      <div class="grid-content bg-purple-dark" style="position:relative;height:36px;line-height:36px;">
        <span>钱包余额：<i class="i_col_red">￥{{withTotalAmt}}</i></span>
        <el-button class="margin_l withBtn" style="position:absolute;left:131px;" type="primary" @click="withDrawHandler" :disabled="withDrawState">提现</el-button>
        <span class="infoColor" v-show="withDrawState">正在审核中，请耐心等待...</span>
      </div>
      <div class="curOrder">钱包明细</div>
      <ul class="sel_wrap">
        <li>
          <div class="block">
            <span class="demonstration">时间：</span>
            <el-date-picker
              v-model="dateVal"
              type="daterange"
              placeholder="选择日期范围" @change="getMyWallet">
            </el-date-picker>
          </div>
        </li>
<!--         <li>
          <div class="block">
            <span class="demonstration">最近：</span>
            <span class="nav_select margin_r_30" v-for="(item, index) in selectDate" :key="index" :class="{active_nav: dateStat === index}" @click="choose(index)">{{item}}</span>
          </div>
        </li> -->
        <li>
          <div class="block">
            <span class="demonstration">分类：</span>
            <span class="nav_select margin_r_30" v-for="(item, index) in classify" :key="index" :class="{active_nav: classStat === index}"  @click="getMyWallet(item,index)">{{item}}</span>
          </div>
        </li>
      </ul>
      <div class="wallet_title">
        <span>进账总额：<i class="i_col_blue">{{houstonJZ}}</i>元</span>
        <span class="margin_l">出账总额：<i class="i_col_red">{{withdrawalsTX}}</i>元</span>
      </div> 
    </el-col>
    <el-col :span="24" class="warp-main" style="margin: auto;margin-bottom:100px;height:280px;">
      <el-table :data="tableData" align="center" border style="width: 100%">
        <el-table-column prop="created" align="center" label="日期">
          <template scope="scope">
            <span v-if="scope.row.created">{{new Date(scope.row.created).getFullYear()+'-'+ fillZero(new Date(scope.row.created).getMonth()+1)+'-'+fillZero(new Date(scope.row.created).getDate())+' '+fillZero(new Date(scope.row.created).getHours())+":"+fillZero(new Date(scope.row.created).getMinutes())+":"+fillZero(new Date(scope.row.created).getSeconds())}}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="balanceIn" align="center" label="进账">
          <template scope="scope">
            <span class="col_blue">{{scope.row.balanceIn}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="balanceOut" align="center" label="出账">
          <template scope="scope">
            <span class="col_red" v-if="scope.row.balanceOut === 0"></span>
            <span class="col_red" v-else>{{scope.row.balanceOut}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="balance" align="center" label="账户余额">
        </el-table-column>
        <el-table-column prop="handler" align="center" label="操作">
          <template scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="queryDetail(scope.$index, scope.row)">查看详情</el-button>
          </template>  
        </el-table-column>
      </el-table>
      <div class="block" v-show="this.totalCount > this.pagesize" style="position:absolute;top:820px;right:0;">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pagesize"
          layout="prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>
    </el-col>
    <!-- 提现设置 -->
    <el-dialog
      :visible.sync="withDrawSets"
      size="tiny" style="text-align:center;">
      <i class="el-icon-information" style="color:#fbb308;font-size:30px;margin-bottom:10px;"></i>
      <div>请先设置提现方式</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="withDrawSets = false">取 消</el-button>
        <el-button type="primary" @click="gotoSet">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 状态提示 -->
    <el-dialog
      :visible.sync="statTip"
      size="tiny" style="text-align:center;">
      <i class="el-icon-information" style="color:#fbb308;font-size:30px;margin-bottom:10px;"></i>
      <div>正在审核中，请耐心等待~~</div>
    </el-dialog>

    <!-- 进账详情 -->
    <el-dialog
      :visible.sync="incomeVisible"
      size="small">
      <div class="detail_title">详情</div> 
      <div style="margin-bottom:10px;"><b>时间： {{this.incomeDetail[0].created}}</b></div>
      <el-table :data="incomeDetail" border show-summary style="width: 100%">
        <el-table-column prop="commodityType" label="商品类型" align="center">
        </el-table-column>
        <el-table-column prop="saleVal" label="销售额（元）" align="center">
        </el-table-column>
        <el-table-column prop="refundAmt" label="已退款金额（元）" align="center">
        </el-table-column>
        <el-table-column prop="actualAmt" label="实际销售额（元）" align="center">
        </el-table-column>
        <el-table-column prop="income" label="收入（元）" align="center">
        </el-table-column>
      </el-table>
      <div class="rules">
        <a href="javascript:;"><img src="../../../images/salesman/question.png" alt="收入规则"><span style="padding-left:20px;">收入规则</span></a>
      </div>
      <div style="text-align:center;margin-top:20px;">
        <el-button @click="incomeVisible = false">关 闭</el-button>
      </div>
    </el-dialog>

    <!-- 出账详情 -->
    <el-dialog
      :visible.sync="outVisible"
      size="small">
      <div class="detail_title">详情</div>
      <el-table :data="outDetail" border style="width: 100%;margin-top:20px;">
        <el-table-column prop="created" label="时间" align="center">
        </el-table-column>
        <el-table-column prop="describey" label="描述" align="center">
        </el-table-column>
      </el-table>
      <div style="text-align:center;margin-top:20px;">
        <el-button @click="outVisible = false">关 闭</el-button>
      </div>
    </el-dialog>

    <!-- 银行卡提现 -->
    <el-dialog
      title="提现"
      :visible.sync="withDrawBank"
      size="small">
      <div>
        <el-row>
          <el-col :span="24" align="center"><div class="i_red i_title">请检查账户是否正确！</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24" align="center">
            <div class="i_title">
              <span class="padding_l">类型：{{postalType}}</span>
              <span v-if="bankName">（{{bankName}}）</span>
              <span class="padding_l">开户者：{{openName}}</span>
              <span class="padding_l">{{postalType}}账户：{{bankNo}}</span>
            </div>
          </el-col>
        </el-row>
        <el-form style="padding-top:10px;margin:0 auto;width:380px;" :model="WithDrawForm" :rules="rulesWithDraw" id="WithDrawForm" ref="WithDrawForm">
          <el-form-item label="提现金额：" prop="withDrawAccount">
            <el-input v-model="WithDrawForm.withDrawAccount" class="item_w_input fl"></el-input>
          </el-form-item>
          <el-form-item label="手机号：" style="padding-left:14px;">
            <el-input v-model="WithDrawForm.withDrawPhone" class="item_w_input fl" :disabled="true"></el-input>
          </el-form-item>
          <div style="margin-bottom:16px;">
            <span class="fl" style="padding-left:15px;">验证码：</span>
            <el-input v-model="WithDrawForm.rg_code" class="item_c_input fl" style="margin-left:12px;"></el-input>
            <button v-if="hYzm" class="btn_col" @click.prevent="hasYzm()">{{Yzm}}</button>
            <button v-else class="btn_col" style="background-color: #C8C8C8;" disabled>{{Yzm1}}</button>
          </div> 
        </el-form>
        <div style="margin:30px auto;width:380px;">
            <button class="withDrawBtn btn_col" @click="applyHandler('WithDrawForm')">申请提现</button>
            <el-button class="withDrawBtn1" @click="withDrawBank = false">取 消</el-button>
          </div>
      </div>
    </el-dialog>
  <el-dialog title="" :visible.sync="dialogVisibleInit" size="tiny" :before-close="handleClose">
    <span>您好，您查看的相关个人销售数据需要完善个人资料～</span>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="nowComplete">立即完善</el-button>
      <el-button @click="noSee">暂时不看</el-button>
    </span>
  </el-dialog>
	</el-row> 
</template>

<script>
  import global from '../../global/global'
  import util from '../../../common/util'
  import Bus from '../../global/bus.js'
  export default {
    data(){
      var checkAmt = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入正确的金额'));
        }
        setTimeout(() => {
          if (!this.isAmt(value)) {
            callback(new Error('金额只能是有两位小数的正数'));
          } else {
            if (value - this.withTotalAmt > 0) {
              callback(new Error('当前金额已超出提现总额'));
            } else {
              callback()
            }
          }
        }, 1000);
      };
      return {
        //默认查询日期
        dateVal: [new Date(new Date().setMonth(new Date().getMonth() - 1)), new Date()],
        //当前是否有提钱申请
        withDrawState: false,
        queryState: '',
        value: '',
        hYzm: true,
        //默认每页数据量
        pagesize: 10,
        //当前页码
        currentPage: 1,
        //默认数据总数
        totalCount: 1,
        tableData: [],
        classify: ['全部','进账','出账'],
        classStat: 0,
        withDrawSets: false,
        statTip: false,
        withDrawBank: false,
        withDrawBank01:false,
        incomeVisible: false,
        outVisible: false,
        withTotalAmt: 0,
        WithDrawForm: {
          withDrawAccount: '',
          withDrawPhone: global.getSalesUser().phone,
          rg_code: '',
        },
        rulesWithDraw: {
          withDrawAccount: [
            { validator: checkAmt, trigger: 'blur' }
          ]
        },
        Yzm1: '',
        Yzm: '获取验证码',
        postalType: '',
        trueName: '',
        openName: '',
        bankName: '',
        bankNo: '',
        infoList: [],
        houstonJZ: '0.00',//进账总额
        withdrawalsTX: '0.00',//提现总额
        incomeDetail: [{
          commodityType: '耗材类',
          saleVal: 0,
          refundAmt: 0,
          actualAmt: 0,
          income: 0
        },
        {
          commodityType: '工具设备类',
          saleVal: 0,
          refundAmt: 0,
          actualAmt: 0,
          income: 0
        }],
        outDetail: [],
        dialogVisibleInit: false
      }
    },
    props: ['toMySon'],
    created: function() {
      var that = this
      var getSalesUser = that.global.getSalesUser()
      var trueName = getSalesUser.trueName
      var sex = getSalesUser.sex
      var idCard = getSalesUser.idCard
      var weChar = getSalesUser.weChar
      if (trueName==null||sex==null||idCard==null||weChar==null) {
        that.dialogVisibleInit = true
      }
      that.queryInfo();
      that.getMyWallet();
      this.getBalance();
      
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
      // 检查提现金额是否合法
      isAmt: function(str) {
        var reg = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }
      },
      //补0
      fillZero: function(n){
        return n<10 ? '0'+ n: n 
      },
      // 获取验证码
      hasYzm: function() {
        var that = this;
        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        var sec = 60;
        if (that.WithDrawForm.withDrawPhone == '' || !mb.test(that.WithDrawForm.withDrawPhone)) {
          that.$message.error('请输入正确的手机号！');
          return false
        } else {
          var obj = { phone: that.WithDrawForm.withDrawPhone }
          that.global.axiosPostReq('/witManage/gitVcode', obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              for(let i=0; i<=60; i++) {
                window.setTimeout(function(){
                  if (sec != 0) {
                    that.hYzm = false;
                    that.Yzm1 =   sec + "秒后重发验证" ;
                    sec--;
                  } else {
                    sec = 60;//如果倒计时结束就让  获取验证码显示出来
                    that.hYzm = true;
                    that.Yzm = '获取验证码';
                  }
                }, i * 1000)
              }
            }
          })
        }
      },
      //跳转到提现设置
      gotoSet: function(){
        var that = this;
        var editWithDraw = {
          isActive: true,
          flag: 'editWithDraw',
        }
        that.$emit('msgFromChild',editWithDraw);
        this.withDrawSets = false
      },
      //获取余额
      getBalance: function() {
        var that = this;
        var params = {
          token: global.getSalesToken()
        }
        that.global.axiosGetReq('/PW/show',params).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            this.withDrawState = res.data.data && res.data.data.split(",")[0].indexOf("申请中") !== -1 ? true : false
            that.withTotalAmt = res.data.data && parseFloat(res.data.data.split(",")[1]).toFixed(2) || '0.00'
          }
        })
      },
      //查询提现方式
      queryInfo: function(){
        let params = {
          phone: global.getSalesUser().phone,
          token: global.getSalesToken()
        }
        global.axiosGetReq('/saleInfo/query',params).then((res) => {
          if(res.data.callStatus === 'SUCCEED'){
            this.postalType = res.data.data.postalType
            this.openName = res.data.data.openName
            this.trueName = res.data.data.trueName
            this.bankName = res.data.data.bankName
            this.bankNo = res.data.data.accountNumber
          }
          if(this.toMySon.isActive == true){
            this.withDrawHandler()
          }
        })
      },
      handleCurrentChange: function(val) {
        this.currentPage = val 
        this.getMyWallet(val)
      },
      //获取钱包列表
      getMyWallet: function(val, item) {
        var that = this;
        that.classStat = item || 0;
        if (val == undefined || typeof(val) == 'string') {
          this.currentPage = 1
        } else {
          this.currentPage = val
        }

        //选择分类
        if(val == '全部' || !val || (typeof(val) !== 'number' && val.indexOf('-') !== -1)) {
          this.queryState = ''
        }else if(val == '进账'){
          this.queryState = '进账'
        }else if(val == '出账'){
          this.queryState = '出账'
        }
        //时间查询条件
        if(that.dateVal && that.dateVal[0]){
          var startDate = util.formatDate.format(new Date(that.dateVal[0]));
          //结束时间默认为当日0点，往后推迟24小时
          var endDate = util.formatDate.format(new Date(that.dateVal[1].getTime() + 3600 * 1000 * 24)); 
        }else{
          var startDate = '';
          var endDate = '';  
        }

        var obj = {
          token: that.global.getSalesToken(),
          state: this.queryState,
          starTime: startDate,
          endTime: endDate,
          currentPage: this.currentPage,
          numberPerpage: this.pagesize
        }
        
        that.global.axiosGetReq('/myWallet/detail',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            this.houstonJZ = res.data.data[0] && res.data.data[0].jzze.toFixed(2) || '0.00'
            this.withdrawalsTX = res.data.data[0] && res.data.data[0].czze.toFixed(2) || '0.00'
            this.tableData = res.data.data
            this.totalCount = res.data.totalNumber
          }
        })
      },
      //查看详情
      queryDetail(index, row){ 
        var that = this;
        var obj = {
          balanceId: row.balanceId
        }
        
        var describeyStr = "";
        that.global.axiosPostReq('/myWallet/details',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            describeyStr = res.data.data.describey
            
            //改变展示描述
            if(describeyStr.indexOf("管理员增加") !== -1){
              describeyStr = "管理员增加￥" + (res.data.data.balanceIn || 0)
            }else if(describeyStr.indexOf("管理员减少") !== -1){
              describeyStr = "管理员扣除￥" + (res.data.data.balanceOut || 0)
            }else if(describeyStr.indexOf("出账提现成功") !== -1){
              describeyStr = "提现￥" + (res.data.data.balanceOut || 0)
            }

            //出账数据
            this.outDetail[0] = {
              created: new Date(res.data.data.created).getFullYear()+'-'+ this.fillZero(new Date(res.data.data.created).getMonth()+1)+'-'+this.fillZero(new Date(res.data.data.created).getDate())+' '+this.fillZero(new Date(res.data.data.created).getHours())+":"+this.fillZero(new Date(res.data.data.created).getMinutes())+":"+this.fillZero(new Date(res.data.data.created).getSeconds()),
              describey: describeyStr
            }
            //入账数据
            this.incomeDetail[0] = {
              created: new Date(res.data.data.created).getFullYear()+'-'+ this.fillZero(new Date(res.data.data.created).getMonth()+1)+'-'+this.fillZero(new Date(res.data.data.created).getDate())+' '+this.fillZero(new Date(res.data.data.created).getHours())+":"+this.fillZero(new Date(res.data.data.created).getMinutes())+":"+this.fillZero(new Date(res.data.data.created).getSeconds()),
              commodityType: '耗材类',
              saleVal: res.data.data.haocaiMoney || 0,
              refundAmt: res.data.data.haocaiRefund || 0,
              actualAmt: res.data.data.haocaiMoney - res.data.data.haocaiRefund,
              income: res.data.data.haoCaiIncome || 0
            }
            this.incomeDetail[1] = {
              commodityType: '工具设备类',
              saleVal: res.data.data.gongjuMoney || 0,
              refundAmt: res.data.data.gongjuRefund || 0,
              actualAmt: res.data.data.gongjuMoney - res.data.data.gongjuRefund,
              income: res.data.data.gongJuIncome || 0
            }
            //判断是管理员操作，出账，还是收入 
            if(row.describey.indexOf("出账提现成功") !== -1 || describeyStr.indexOf("管理员增加") !== -1 || describeyStr.indexOf("管理员扣除") !== -1){
              this.outVisible = true
            }else{
               this.incomeVisible = true
            }
          }
        }) 
      },
      withDrawHandler(){
        if(this.postalType ==='银行卡'){
          this.withDrawBank = true
        }else if(this.postalType ==='支付宝'){
          this.withDrawBank = true
        }else if(this.postalType === null){
          this.withDrawSets = true
          this.withDrawBank = false
        }      
      },
      //申请提现
      applyHandler(formName){
        this.$refs[formName].validate((valid) => {
          var that = this
          if (valid) {
            let params = {
              token: global.getSalesToken(),
              phone: global.getSalesUser().phone,
              moneyNnm: this.WithDrawForm.withDrawAccount,
              vCode: this.WithDrawForm.rg_code
            }
            //验证验证码
            if(!this.WithDrawForm.rg_code){
              this.$message.error('请输入正确的验证码！');
              return false
            }
            global.axiosPostReq('/witManage/submitWit',params).then((res) => {
              if (res.data.callStatus === 'SUCCEED') {
                this.statTip = true
                this.WithDrawForm.withDrawAccount = ''
                this.WithDrawForm.rg_code = ''
                this.withDrawBank = false
                this.withDrawState = true
                //提示框3s后自动消隐藏
                setTimeout(function(){
                  that.statTip = false
                },3000)
              }else if(res.data.callStatus === 'FAILED'){
                this.$message.error('请输入正确的验证码！')
              }
            })
          } else {
            return false;
          }
        }); 
      }
    }
  }
</script>
<style>
  #WithDrawForm .el-form-item__error{
    margin-left: 92px;
  }
</style>
<style scoped>
  .el-button--primary {
    color: #fff;
    background-color: #005aab!important;
    border-color: #005aab!important;
  }
  .el-button--primary:hover {
    color: #fff;
    background-color: #329af0!important;
    border-color: #329af0!important;
  }
  .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
    color: #bfcbd9;
    cursor: not-allowed;
    background-image: none;
    background-color: #eef1f6!important;
    border-color: #d1dbe5!important;
  }
  .brandWarp{
    width: 1200px;
    height: 900px;
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
  .i_col_red{
    color: #cb1700;
    font-weight: bold;
    font-style: normal;
  }
  .col_red{
    color: #cb1700;
  }
  .i_col_blue{
    color: #005aab;
    font-weight: bold;
    font-style: normal;
  }
  .infoColor{
    position: absolute;
    top: 0;
    left: 320px;
    color: #005aab;
    margin-left: 30px;
  }
  .col_blue{
    color: #005aab;
  }
  .margin_l{
    margin-left: 76px;
  }
  .warp-breadcrum1{
    margin-top: 36px;
  }
  .wallet_title{
    margin: 32px 0;
    text-align: center;
  }
  .curOrder{
    height: 30px;
    line-height: 30px;
    margin-top: 30px;
    padding-left: 24px;
    border-bottom: 1px dotted #ccc;
    background: url(../../../images/salesman/arrow.png) 0 8px no-repeat;
  }
  .nav_select{
    width: 60px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    display: inline-block;
    border-radius: 6px;
    cursor: pointer;
  }
  .margin_r_30{
    margin-right: 30px;
  }
  .active_nav{
    background: #005aab;
    color: #fff;
  }
  .btn_col{
    width: 120px;
    height: 36px;
    border-radius: 4px;
    cursor: pointer;
    background: #005aab;
    border: none;
    color: #fff;
  }
  .withBtn{
    width: 100px;
  }
  .sel_wrap{
    border: 1px solid #eee;
    margin-top: 26px;
    padding-left: 10px;
    padding-bottom: 20px;
  }
  .sel_wrap li{
    margin-top: 20px;
  }
  .item_w_input{
    width: 280px;
  }
  .item_c_input{
    width: 140px;
    margin-right: 20px;
  }
  .i_red{
    color: #cb1700;
  }
  .i_title{
    height: 30px;
    line-height: 30px;
  }
  .padding_l{
    padding-left: 8px;
  }
  .withDrawBtn{
    width: 100px;
    margin-left: 82px;
  }
  .withDrawBtn1{
    width: 100px;
    margin-left: 58px;
  }

  .custInfo{
    height: 30px;
    line-height: 30px;
    padding-left: 24px;
    border-bottom: 1px dotted #ccc;
    background: url(../../../images/salesman/arrow.png) 0 8px no-repeat;
  }
  .detail_title{
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    background: url(../../../images/salesman/titlebg.png) no-repeat;
    background-position: center bottom;
  }
  
  .datail_tb{
    width: 100%;
    border-collapse: collapse;/* 边框合并属性  */
    border: none;
    margin-top: 20px;
  }
  .custContent{
    height: 70px;
    line-height: 70px;
    padding-left: 52px;
  }
  .datail_tb tr{
    width: 100%;
    height: 30px;
    line-height: 30px;
    border: 1px solid #ccc;
  }
  .trs td{
    width: 100px;
    text-align: center;
    border: 1px solid #ccc;
  }
  .rules{
    height: 20px;
    line-height: 20px;
    margin-top: 20px;
  }
  .rules img{
    position: absolute;
    top: 1px;
    width: 18px;
  }
  .rules a{
    color: #005aab;
    margin-left: 20px;
    position: relative;
  }
</style>