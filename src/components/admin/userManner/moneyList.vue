<template>
  <el-row class="moneyWrap">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>用户管理</b></el-breadcrumb-item>
        <el-breadcrumb-item>乾币列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col  class="toolbar" style="padding-bottom: 0px;padding-top:20px;">
      <el-form :inline="true" >
        <el-form-item label="用户手机号：">
          <el-input v-model="searchUserId"></el-input>
        </el-form-item>
        <el-form-item label="时间：">
          <el-date-picker v-model="searchDataPrev" type="daterange" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="searchAll" :loading='loadingCheckHead'>查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col style="text-align:right;line-height:40px;">
      <el-button type="text" @click="changeUserMoney"><i class="el-icon-edit"></i>修改用户乾币</el-button>
    </el-col>

    <el-table :data="moneyList"  border style="width: 100%">
      <el-table-column prop="user.phone" width="200px" align="center" label="用户手机号"></el-table-column>
      <el-table-column prop="qbRget" align="center" label="收入"></el-table-column>
      <el-table-column prop="qbRout" align="center" label="支出"></el-table-column>
      <el-table-column prop="qbBalances" align="center" label="余额"></el-table-column>
      <el-table-column prop="time" align="center" label="时间"></el-table-column>
      <el-table-column prop="remark" align="center" label="描述"></el-table-column>
    </el-table>

    <el-dialog custom-class="" title="修改用户乾币：" :visible.sync="showChangeUserMoney" :before-close="handleClose">
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="nowUserMoneyNum">
            <el-select  v-model="selectSearchType" slot="prepend" placeholder="请选择" :disabled="true">
              <el-option label="手机号" value="1"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="search" :loading='loadingCheck'>查询</el-button>
        </el-form-item>
      </el-form>
      <el-form :inline="true" >
        <el-form-item label="当前乾币币数：">
          <el-input v-model="yayiCoin"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="saveUserMoney">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>
</template>
<script>
  import util from '../../../common/util'
  export default{
    data(){
      return {
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        searchDataPrev: [],
        searchUserId: '',
        nowUserMoneyNum:'',
        yayiCoin: '',
        selectSearchType:"手机号",
        showChangeUserMoney:false,
        loadingCheck: false,
        loadingCheckHead: false,
        moneyList:[],
      }
    },
    created: function() {
      var that = this;
      that.getClassify()
    },
    methods: {
      //获取用户钱币列表
      getClassify: function() {
        var that = this;
        var obj = {
          phone: '',
          startDate: '',
          endDate: '',
          token: ''
        }
        that.global.axiosGetReq('/userQbList/list',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.moneyList = res.data.data;
            that.moneyList.reverse();
            for (var i = 0; i < that.moneyList.length; i++) {
              that.moneyList[i].time = util.formatDate.format(new Date(that.moneyList[i].qbTime));
            }
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      // 头部查询
      searchAll: function() {
        var that = this;
        if (that.searchDataPrev.length == 0 || that.searchDataPrev[0] == null) {
          var obj = {
            phone: that.searchUserId,
            startDate: '',
            endDate: '',
            token: ''
          }
          that.loadingCheckHead = true;
          that.global.axiosGetReq('/userQbList/list',obj).then((res) => {
            // console.log(res.data);
            if (res.data.callStatus === 'SUCCEED') {
              that.loadingCheckHead = false;
              that.moneyList = res.data.data;
              for (var i = 0; i < that.moneyList.length; i++) {
                that.moneyList[i].time = util.formatDate.format(new Date(that.moneyList[i].qbTime));
              }
            } else {
              that.loadingCheckHead = false;
              that.$message.error('网络出错，请稍后再试！');
            }
          })
        } else {
          var startDate = util.formatDate.format(new Date(that.searchDataPrev[0]));
          var endDate = util.formatDate.format(new Date(that.searchDataPrev[1]));
          var obj = {
            phone: that.searchUserId,
            startDate: startDate,
            endDate: endDate,
            token: ''
          }
          that.loadingCheckHead = true;
          that.global.axiosGetReq('/userQbList/list',obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              that.loadingCheckHead = false;
              that.moneyList = res.data.data;
              for (var i = 0; i < that.moneyList.length; i++) {
                that.moneyList[i].time = util.formatDate.format(new Date(that.moneyList[i].qbTime));
              }
            }
          })
        }
      },
      // 查询手机号
      search: function() {
        var that = this;
        if (that.nowUserMoneyNum == '') {
          that.$message.error('请填写手机号！');
          return false
        }
        var obj = {
          userPhone: that.nowUserMoneyNum,
        }
        that.loadingCheck = true;
        that.global.axiosGetReq('/userQbList/queryQb',obj).then((res) => {
          if (res.data.callStatus === 'FAILED') {
            that.loadingCheck = false
            that.$message.error('手机号不存在！')
          }
          if (res.data.callStatus === 'SUCCEED') {
            that.loadingCheck = false
            that.yayiCoin = res.data.data.qbBalance
            // console.log(that.yayiCoin,'okokoko');
          }
          // that.$message.error('网络出错，请稍后再试！');
        })
      },
      changeUserMoney:function() {
        this.showChangeUserMoney = true;
      },
      // 保存修改
      saveUserMoney:function() {
        var that = this;
        if (that.nowUserMoneyNum == '') {
          that.$message.error('请输入手机号！');
          return false
        }
        if (that.yayiCoin == '') {
          that.$message.error('请输入乾币数量！');
          return false
        }
        var obj = {
          phone: that.nowUserMoneyNum,
          qbBalance: that.yayiCoin,
          token: '',
        }
        console.log(obj);
        that.global.axiosPostReq('/userQbList/update',obj).then((res) => {
          console.log(res);
          if (res.data.callStatus === 'SUCCEED') {
            that.getClassify()
            that.nowUserMoneyNum = ''
            that.yayiCoin = ''
            that.showChangeUserMoney = false
          } else {
            that.$message.error('手机号不存在！');
          }
        })
      },
      // 关闭面板时候
      handleClose: function() {
        var that = this;
        that.nowUserMoneyNum = '';
        that.yayiCoin = '';
        that.showChangeUserMoney = false;
      }
    },
  }
</script>

<style>
    .moneyWrap .el-select .el-input {
    min-width: 110px;
  }
</style>
