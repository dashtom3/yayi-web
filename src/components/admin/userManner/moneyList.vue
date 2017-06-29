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
          <el-date-picker  v-model="searchDataPrev"   type="daterange"  placeholder="选择日期"  :picker-options="pickerOptions0"> </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="~">
          <el-date-picker  v-model="searchDataNext"  type="date"  placeholder="选择日期"  :picker-options="pickerOptions1"> </el-date-picker>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" v-on:click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col style="text-align:right;line-height:40px;">
      <el-button type="text" @click="changeUserMoney"><i class="el-icon-edit"></i>修改用户乾币</el-button>
    </el-col>

    <el-table :data="moneyList"  border style="width: 100%">
      <el-table-column  prop="userId"  width="200px"  align="center"  label="用户手机号"></el-table-column>
      <el-table-column  prop="get"  align="center"  label="收入">  </el-table-column>
      <el-table-column  prop="pay"  align="center"  label="支出"> </el-table-column>
      <el-table-column  prop="leave"  align="center"  label="余额">  </el-table-column>
      <el-table-column  prop="time"  align="center"  label="时间">  </el-table-column>
      <el-table-column  prop="descrition"  align="center"  label="描述">  </el-table-column>
    </el-table>

    <el-dialog custom-class="" title="修改用户乾币：" :visible.sync="showChangeUserMoney">
      <el-form :inline="true" >
        <el-form-item>
          <el-input  v-model="nowUserMoneyNum" >
            <el-select  v-model="selectSearchType" slot="prepend" placeholder="请选择">
              <el-option label="用户编号" value="1"></el-option>
              <el-option label="真实姓名" value="2"></el-option>
              <el-option label="手机号" value="3"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="search">查询</el-button>
        </el-form-item>
      </el-form>
      <el-form :inline="true" >
        <el-form-item label="当前钱币币数：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="saveUserMoney">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>
</template>
<script>
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
        searchDataPrev:null,
        searchDataNext:null,
        searchUserId:null,
        nowUserMoneyNum:null,
        selectSearchType:"用户编号",
        showChangeUserMoney:false,
        moneyList:[
          {userId:"1",get:3214,pay:'',leave:'232',time:"1234-12-12 12:12",descrition:'adfadkjbakdfakjnhkajf'},
          {userId:"1",get:3214,pay:'',leave:'232',time:"1234-12-12 12:12",descrition:'adfadkjbakdfakjnhkajf'},
          {userId:"1",get:3214,pay:'',leave:'232',time:"1234-12-12 12:12",descrition:'adfadkjbakdfakjnhkajf'},
          {userId:"1",get:3214,pay:'',leave:'232',time:"1234-12-12 12:12",descrition:'adfadkjbakdfakjnhkajf'},
          {userId:"1",get:3214,pay:'',leave:'232',time:"1234-12-12 12:12",descrition:'adfadkjbakdfakjnhkajf'},
          {userId:"1",get:3214,pay:'',leave:'232',time:"1234-12-12 12:12",descrition:'adfadkjbakdfakjnhkajf'},
          {userId:"1",get:3214,pay:'',leave:'232',time:"1234-12-12 12:12",descrition:'adfadkjbakdfakjnhkajf'}
        ]
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
          token: '11'
        }
        that.global.axiosGetReq('/userQbList/list',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.moneyList = res.data.data;
            console.log(that.moneyList)
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      search:function(){

      },
      changeUserMoney:function(){
        this.showChangeUserMoney = true;
      },
      saveUserMoney:function(){
        this.showChangeUserMoney = false;
      },

    },
  }
</script>

<style>
    .moneyWrap .el-select .el-input {
    min-width: 110px;
  }
</style>
