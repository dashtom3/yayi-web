<template>
	<el-row class="brandWarp">
    <el-col :span="24" class="warp-breadcrum1">
      <div class="grid-content bg-purple-dark">
        <span>钱包余额：<i class="i_col_red">￥700</i></span>
        <button class="margin_l btn_col" @click="withDrawHandler">提现</button>
      </div>
      <div class="curOrder">钱包明细</div>
      <ul class="sel_wrap">
        <li>
          <div class="block">
            <span class="demonstration">时间：</span>
            <el-date-picker
              v-model="value"
              type="daterange"
              placeholder="选择日期范围" @change="chooseDate">
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
            <span class="nav_select margin_r_30" v-for="(item, index) in classify" :key="index" :class="{active_nav: classStat === index}"  @click="selClass(item,index)">{{item}}</span>
          </div>
        </li>
      </ul>
      <div class="grid-content bg-purple-dark wallet_title">
        <span>进账总额：<i class="i_col_blue">￥20000</i></span>
        <span class="margin_l">提现总额：<i class="i_col_red">￥10000</i></span>
      </div> 
    </el-col>
    <el-col :span="24" class="warp-main" style="margin: auto;margin-bottom:100px;height:280px;">
      <el-table :data="tableData" align="center" border style="width: 100%">
        <el-table-column prop="updated" align="center" label="日期">
        </el-table-column>
        <el-table-column  prop="getMoney" align="center" label="进账">
          <template scope="scope">
            <span class="col_blue">{{scope.row.income}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="getMoney" align="center" label="提现">
          <template scope="scope">
            <span class="col_red">{{scope.row.withDrawals}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="account" align="center" label="账户余额">
        </el-table-column>
        <el-table-column prop="handler" align="center" label="操作">
          <template scope="scope">
            <el-button
              size="mini"
              type="info"
              @click="queryDetail(scope.$index, scope.row)">查看详情</el-button>
          </template>  
        </el-table-column>
      </el-table>
    </el-col>
    <!-- 提现设置 -->
    <el-dialog
      :visible.sync="withDrawSets"
      size="tiny" style="text-align:center;">
      <i class="el-icon-information" style="color:#fbb308;font-size:30px;margin-bottom:10px;"></i>
      <div>请先设置提现方式</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="withDrawSets = false">取 消</el-button>
        <el-button type="primary" @click="withDrawSets = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 状态提示 -->
    <el-dialog
      :visible.sync="statTip"
      size="tiny" style="text-align:center;">
      <i class="el-icon-information" style="color:#fbb308;font-size:30px;margin-bottom:10px;"></i>
      <div>正在审核中，请耐心等待~~</div>
    </el-dialog>

    <!-- 详情 -->
    <el-dialog
      :visible.sync="detailVisible"
      size="small">
      <div class="detail_title">订单详情</div>
      <div class="custInfo">客户信息</div>
      <div class="custContent"><b>客户姓名：</b><span>李志芳</span><b style="margin-left:80px;">客户手机号：</b><span>13861637946</span></div>
      <div class="custInfo">订单信息</div>
      <table class="datail_tb">
        <tr><td colspan="7"><span class="pad_l_30">下单时间：2017-06-08</span><span class="pad_l_30">订单状态：卖家已发货</span></td></tr>
        <tr class="trs">
          <td>商品名称</td>
          <td>价格（元）</td>
          <td>数量</td>
          <td>小计</td>
          <td>退款金额（元）</td>
          <td>收入状态</td>
          <td>总收入元</td>
        </tr>
        <tr class="trs" v-for="(item, index) in infoList" :key="index">
          <td>{{item.goodsName}}</td>
          <td>{{item.price}}</td>
          <td>{{item.num}}</td>
          <td>{{item.totalPrice}}</td>
          <td :rowspan="infoList.length" v-if="index == 0">123</td>
          <td :rowspan="infoList.length" v-if="index == 0">已结算</td>
          <td :rowspan="infoList.length" v-if="index == 0">123</td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailVisible = false">取 消</el-button>
        <el-button type="primary" @click="detailVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 银行卡提现 -->
    <el-dialog
      title="提现"
      :visible.sync="withDrawBank"
      size="tiny">
      <div style="margin:0 auto;width:460px;">
        <el-row>
          <el-col :span="24" align="center"><div class="i_red i_title">请检查账户是否正确</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24" align="center"><div class="i_title"><span>姓名：{{trueName}} 账号：{{bankNo}}</span></div></el-col>
        </el-row>
        <el-form>
          <el-form-item label="提现金额：">
            <el-input v-model="withDrawAccount" class="item_w_input fl"></el-input>
          </el-form-item>
          <el-form-item label="手机号：" style="padding-left:14px;">
            <el-input v-model="withDrawPhone" class="item_w_input fl"></el-input>
            <transition name="shake">
              <p v-show="msPhone_alert" class="error">请输入正确的手机号!</p>
            </transition>
          </el-form-item>
          <el-form-item label="验证码：" style="padding-left:14px;">
            <el-input v-model="rg_code" class="item_c_input fl"></el-input>
            <button class="btn_col" @click="hasYzm(withDrawPhone)" v-if="hYzm">{{Yzm}}</button>
            <button class="btn_col" style="background-color: #C8C8C8;" disabled v-else>{{Yzm1}}</button>
            <transition name="shake">
              <p v-show="msCode_alert" class="error">请输入正确的验证码!</p>
            </transition>
          </el-form-item>
        </el-form>
        <div>
          <button class="withDrawBtn btn_col" @click="applyHandler">申请提现</button>
          <el-button class="withDrawBtn1" @click="withDrawBank = false">取 消</el-button>
        </div>
      </div>
    </el-dialog>

    <!-- 支付宝提现 -->
    <!-- <el-dialog
      title="提现"
      :visible.sync="withDrawBank01"
      size="small">
      <div style="margin:0 auto;width:460px;">
        <el-row>
          <el-col :span="24" align="center"><div class="i_red i_title">请检查账户是否正确</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24" align="center"><div class="i_title"><span>姓名：支付宝：18652599279</span></div></el-col>
        </el-row>
        <el-form>
          <el-form-item label="提现金额：">
            <el-input v-model="withDrawAccount" class="item_w_input fl"></el-input>
          </el-form-item>
          <el-form-item label="手机号：" style="padding-left:14px;">
            <el-input v-model="withDrawPhone" class="item_w_input fl"></el-input>
          </el-form-item>
          <el-form-item label="验证码：" style="padding-left:14px;">
            <el-input v-model="rg_code" class="item_c_input fl"></el-input>
            <button class="btn_col">获取验证码</button>
          </el-form-item>
        </el-form>
        <div>
          <button class="withDrawBtn btn_col" @click="withDrawBank = false">申请提现</button>
          <el-button class="withDrawBtn1" @click="withDrawBank = false">取 消</el-button>
        </div>
      </div>
    </el-dialog> -->
	</el-row> 
</template>

<script>
  import global from '../../global/global'
  import util from '../../../common/util'
  export default {
    data(){
      return {
        value: null,
        value: '',
        hYzm: true,
        tableData: [],
        classify: ['全部','进账','提现'],
        classStat: 0,
        withDrawSets: false,
        statTip: false,
        withDrawBank: false,
        withDrawBank01:false,
        detailVisible: false,
        withDrawAccount: '',
        withDrawPhone: '',
        rg_code: '',
        Yzm1: '',
        Yzm: '获取验证码',
        postalType: '',
        msPhone_alert: false,
        msCode_alert: false,
        trueName: '',
        bankNo: '',
        infoList: []
      }
    },
    props: ['toMySon'],
    created: function() {
      var that = this;
      if (that.toMySon.isActive == true) {
        that.withDrawBank = that.toMySon.isActive
      }
      that.queryInfo();
      that.getMyWallet();
      console.log(that.toMySon,'son')
    },
    watch: {
      //监听短信登录手机号验证
      withDrawPhone: function() {
        var that = this;
        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (that.withDrawPhone !== '' && mb.test(that.withDrawPhone)) {
          that.msPhone_alert = false;
        }
      },
      //监听注册页验证码验证
      rg_code: function() {
        var that = this;
        if (that.rg_code !== '' && that.rg_code.length >= 6) {
          that.msPhone_alert = false;
        }
      },
    },
    methods: {
      // 获取验证码
      hasYzm: function() {
        debugger
        var that = this;
        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        var sec = 60;
        if (that.withDrawPhone == '' || !mb.test(that.withDrawPhone)) {
          that.$message.error('请输入正确的手机号！');
          return false
        } else {
          var obj = { phone: that.withDrawPhone }
          that.global.axiosPostReq('/witManage/gitVcode', obj)
          .then((res) => {
            console.log('验证码',res)
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
            } else {
              that.$message.error('获取验证码失败！');
            }
          })
        }
      },
      //查询提现方式
      queryInfo: function(){
        let params = {
          phone: global.getSalesUser().phone,
          token: global.getSalesToken(),
        }
        global.axiosGetReq('/saleInfo/query',params).then((res) => {
          if(res.data.callStatus === 'SUCCEED'){
            this.postalType = res.data.data.postalType
            this.trueName = res.data.data.trueName
            this.bankNo = res.data.data.accountNumber
          }
        })
      },
      //获取钱包明细
      getMyWallet: function() {
        var that = this;
        var obj = {
          token: that.global.getSalesToken(),
          state: 0,
        }
        console.log(obj)
        that.global.axiosPostReq('/myWallet/detail',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            console.log(res,'232323')
            //that.tableData = res.data.data;
            //console.log(that.tableData)
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      // 选择时间段
      chooseDate: function() {
        var that = this;
        var startDate = util.formatDate.format(new Date(that.value[0]));
        var endDate = util.formatDate.format(new Date(that.value[1]));
        // var obj = {
        //   token: that.global.getSalesToken(),
        //   state: 0,
        // }
        // that.global.axiosPostReq('/myWallet/detail',obj).then((res) => {
        //   if (res.data.callStatus === 'SUCCEED') {
        //     console.log(res)
        //     // that.tableData = res.data.data;
        //     console.log(that.tableData)
        //   } else {
        //     that.$message.error('网络出错，请稍后再试！');
        //   }
        // })
      },
      // 选择分类
      selClass: function(item,index){
        var that = this;
        that.classStat = index;
        if (item == '全部') {
          var obj = {
            token: that.global.getSalesToken(),
            state: 0,
          }
          that.global.axiosPostReq('/myWallet/detail',obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              that.tableData = res.data.data;
              console.log(that.tableData)
            } else {
              that.$message.error('网络出错，请稍后再试！');
            }
          })
        } else if (item == '进账') {
          var obj = {
            token: that.global.getSalesToken(),
            state: 1,
          }
          that.global.axiosPostReq('/myWallet/detail',obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              that.tableData = res.data.data;
              console.log(that.tableData)
            } else {
              that.$message.error('网络出错，请稍后再试！');
            }
          })
        } else if (item == '提现') {
          var obj = {
            token: that.global.getSalesToken(),
            state: 2,
          }
          that.global.axiosPostReq('/myWallet/detail',obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              that.tableData = res.data.data;
              console.log(that.tableData)
            } else {
              that.$message.error('网络出错，请稍后再试！');
            }
          })
        }
      },
      queryDetail(index, row){
        this.detailVisible = true
      },
      withDrawHandler(){
        console.log(this.postalType)
        if(this.postalType ==='银行'){
          this.withDrawBank = true
        }else if(this.postalType ==='支付宝'){
          this.withDrawBank = true
        }else if(this.postalType === null){
          this.withDrawSets = true
        }       
      },
      applyHandler(){
        let params = {
          token: global.getSalesToken(),
          phone: global.getSalesUser().phone,
          type: this.postalType,
          cashMoney: this.withDrawAccount,
          realName: this.trueName,
          anumber: this.withDrawAccount,
          vCode: this.rg_code
        }
        global.axiosPostReq('/witManage/submitWit',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            this.$message({
              type: 'success',
              message: '提现成功!'
            });
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
        this.withDrawBank = false
      }
    }
  }
</script>

<style scope="scope">
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
  .i_col_red{
    color: red;
    font-weight: bold;
    font-style: normal;
  }
  .col_red{
    color: red;
  }
  .i_col_blue{
    color: #20a0ff;
    font-weight: bold;
    font-style: normal;
  }
  .col_blue{
    color: #20a0ff;
  }
  .margin_l{
    margin-left: 20px;
  }
  .warp-breadcrum1{
    margin-top: 36px;
  }
  .wallet_title{
    margin-top: 30px;
    margin-bottom: 8px;
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
    background: #56bff8;
    color: #fff;
  }
  .btn_col{
    width: 120px;
    height: 36px;
    border-radius: 4px;
    cursor: pointer;
    background: #5db7e8;
    border: none;
    color: #fff;
  }
  .btn_col:hover{
    background: #57a5cf;
    border: none;
    color: #fff;
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
    width: 350px;
  }
  .item_c_input{
    width: 210px;
    margin-right: 20px;
  }
  .i_red{
    color: red;
  }
  .i_title{
    height: 30px;
    line-height: 30px;
  }
  .withDrawBtn{
    width: 140px;
    margin-left: 82px;
  }
  .withDrawBtn1{
    width: 140px;
    margin-left: 66px;
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
    background: url(../../../images/salesman/titlebg.png) 400px 34px no-repeat;
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
</style>