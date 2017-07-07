<template>
  <el-row class="userListWrap">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>用户管理</b></el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <!--工具条-->
      <el-col  class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" >
          <el-form-item>
            <el-input v-model="searchUserContent">
              <el-select v-model="searchUserStyle" slot="prepend" placeholder="请选择">
                <el-option label="手机号" value="手机号"></el-option>
                <el-option label="真实姓名" value="真实姓名"></el-option>
                <el-option label="单位名称" value="单位名称"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item label="是否绑定销售：">
            <el-select v-model="searchisBindSale" placeholder="请选择">
              <el-option  v-for="item in options"  :key="item.value"  :label="item.label"  :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型：">
            <el-select v-model="searchtype" placeholder="请选择">
              <el-option  v-for="item in types"  :key="item.value"  :label="item.label"  :value="item.value"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销售员名称：">
            <el-input v-model="searchSaleName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="search()">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--列表-->
      <el-table :data="userList"  border style="width: 100%">
        <el-table-column  prop="trueName"  align="center"  label="用户姓名">  </el-table-column>
        <el-table-column  prop="phone"  align="center"  label="手机号"> </el-table-column>
        <el-table-column  prop="companyName"  align="center"  label="单位名称">  </el-table-column>
        <el-table-column  prop="type"  align="center"  label="类型">
          <template scope="scope">
            <span v-if="scope.row.type==1">个人</span>
            <span v-else>机构</span>
          </template>
        </el-table-column>
        <el-table-column  prop="isBindSale"  align="center"  label="是否绑定销售">
          <template scope="scope">
            <span v-if="scope.row.isBindSale==1">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column  prop="saleName" align="center"  label="销售员姓名">  </el-table-column>
        <el-table-column  label="操作" align="center">
          <template scope="scope">
            <el-button v-if="scope.row.isBindSale==1"  type="text"  v-on:click="cancelBindSale(scope.$index,scope.row)">取消绑定</el-button>
            <el-button v-else  type="text"  v-on:click="addBindSale(scope.$index,scope.row)">绑定销售</el-button>
            <el-button type="text" v-on:click="details(scope.$index,scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-dialog title="绑定销售员" :visible.sync="showBindSalAlert">
      <el-form :inline="true" >
        <el-form-item>
            <el-select v-model="bindSaleSearchType" placeholder="请选择">
              <el-option label="手机号" value="手机号"></el-option>
              <el-option label="真实姓名" value="真实姓名"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="bindSaleSearchCont" placeholder="请输入内容">
            <el-button slot="append" icon="search" v-on:click="searchSalse()"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <el-table height="500"  :data="salesList" border>
        <el-table-column align="center" property="phone" label="手机号"></el-table-column>
        <el-table-column align="center" property="trueName" label="真实姓名" width="200"></el-table-column>
        <el-table-column align="center" property="hehushu" label="操作">
          <template scope="scope">
            <el-button type="text" v-on:click="bandThisSale(scope.$index,scope.row)">绑定</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 用户详情 -->
    <el-dialog custom-class="asgagewgf" title="用户详情" :visible.sync="showUserDetailInfor">
      <div class="personalInfor">
        <img :src="someOneUserDetails.userPic" alt="">
        <h3>个人信息</h3>
        <div class="">
          <span>用户编号：{{someOneUserDetails.userId}}</span>
          <span>真实姓名：{{someOneUserDetails.trueName}}</span>
        </div>
        <div class="">
          <span>手机号：{{someOneUserDetails.phone}}</span>
          <span>性别：{{someOneUserDetails.sex}}</span>
        </div>
        <div class="">
          <span>生日：{{someOneUserDetails.birthday}}</span>
          <span>QQ：{{someOneUserDetails.qq}}</span>
        </div>
      </div>
      <div class="certification">
        <h3>资质认证</h3>
        <div class="">
          <span>类型：{{someOneUserDetails.type | calculateUserType}}</span>
          <span>单位名称：{{someOneUserDetails.companyName}}</span>
        </div>
        <div class="">
          <span>所在地：{{someOneUserDetails.part}}</span>
          <span>详细地址：{{someOneUserDetails.workAddress}}</span>
        </div>
        <div class="">
          <span>口腔执业医师资格证：</span>
          <img style="width:100px;height:100px;display:block" :src="someOneUserDetails.doctorPic" alt="">
        </div>
      </div>
      <h3>绑定的销售</h3>
      <el-table :data="someOneUserDetails.bindSales" border>
        <el-table-column align="center" property="bianhao" label="销售员编号" width="150"></el-table-column>
        <el-table-column align="center" property="name" label="真实姓名" width="200"></el-table-column>
        <el-table-column align="center" property="phone" label="手机号"></el-table-column>
        <el-table-column align="center" property="time" label="注册时间"></el-table-column>
        <el-table-column align="center" property="hehushu" label="客户数"></el-table-column>
      </el-table>
      <h3>收货地址</h3>
      <el-table :data="someOneUserDetails.Receiver">
        <el-table-column align="center" property="receiverName" label="收货人" width="150"></el-table-column>
         <el-table-column align="center" label="所在地区" width="200">
          <template scope="scope">
            <span>{{scope.row.province}}</span>
            <span>{{scope.row.city}}</span>
            <span>{{scope.row.county}}</span>
         </template>
        </el-table-column>
        <el-table-column align="center" property="receiverDetail" label="详细地址"></el-table-column>
        <el-table-column align="center" property="receiverPhone" label="手机/电话"></el-table-column>
      </el-table>
    </el-dialog>
  </el-row>
</template>
<script>

  export default{
    data(){
      return {
        needBindSaleUserIndex:null,
        needBindUserPhone:null,
        showBindSalAlert:false,
        showUserDetailInfor:false,
        searchUserContent:null,
        searchUserStyle: "手机号",
        searchtype:'全部',
        searchisBindSale:"全部",
        searchSaleName:null,
        bindSaleSearchType:'手机号',
        bindSaleSearchCont:null,
        options: [{
            value: '选项1',
            label: '全部'
          }, {
            value: '选项2',
            label: '是'
          }, {
            value: '选项3',
            label: '否'
          },],
          isBindSale: "全部",
          types: [{
            value: '选项1',
            label: '全部'
          }, {
            value: '选项2',
            label: '个人'
          }, {
            value: '选项3',
            label: '机构'
          },],

        userList:[],
        someOneUserDetails:{
          bindSales:[],
          address:[]
        },
        salesList:[]
      }
    },
    created:function(){
      var that = this;
      that.getUserList();
      that.getSalesList();
    },
    filters: {
      calculateUserType:function(data){
        var str = "";
        if(data==1){
          str = "个人";
        }else{
          str = "机构";
        }
        return str;
      }
    },
    methods: {
      getUserList:function(){
        var that = this;
        var obj = {
          // token:that.global.getToken()
          phone:"",
          trueName:"",
          companyName:"",
          isBindSale:"",
          type:"",
          saleName:"",
          token:"111"
        };
        that.global.axiosGetReq('/userManageList/userlist',obj)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.userList = res.data.data;
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      getSalesList:function(){
        var that = this;
        var obj = {
          salePhone:'',
          saleName:'',
          token:"111"
        };
        that.global.axiosGetReq('/userManageList/salelist',obj)
        .then((res) => {
          console.log(res,"saleList");
          if (res.data.callStatus === 'SUCCEED') {
            that.salesList = res.data.data;
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      getOneUserDetails:function(userPhone){
        var that = this;
        var obj = {
          phone:userPhone,
          token:"1111"
        };
        that.global.axiosGetReq('/userManageList/detail',obj)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            console.log(res,"getOneUserDetails")
            that.someOneUserDetails = res.data.data;
            var boj2 = {
              name:that.someOneUserDetails.saleName,
              phone:that.someOneUserDetails.salePhone,
              time:that.someOneUserDetails.saleCreated,
              hehushu:that.someOneUserDetails.bindUserNum,
            };
            that.someOneUserDetails.bindSales = [];
            that.someOneUserDetails.bindSales.push(boj2);
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      bandThisSale:function(index,one){
        var that = this;
        var obj = {
          token:"1211",
          // token:that.global.getToken()
          salePhone:one.phone,
          userPhone:that.needBindUserPhone
        };
        that.global.axiosGetReq('/userManageList/bind',obj)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.userList[that.needBindSaleUserIndex].isBindSale = "是";
            that.userList[that.needBindSaleUserIndex].saleName = that.salesList[index].name;
            that.showBindSalAlert = false;
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      addBindSale:function(index,one){
        var that = this;
        that.needBindUserPhone = one.phone;
        that.needBindSaleUserIndex = index;
        that.showBindSalAlert = true;
      },
      details:function(index,user){
        var that = this;
        that.showUserDetailInfor = true;
        that.getOneUserDetails(user.phone);
      },
      searchSalse:function(){
        // bindSaleSearchType
        // that.bindSaleSearchCont
        var that = this;
        var obj = {
          token:"111"
        };
        if(that.bindSaleSearchCont){
          if(that.bindSaleSearchType == "手机号"){
            obj.salePhone = that.bindSaleSearchCont;
          }else{
            obj.saleName = that.bindSaleSearchCont;
          }
          that.global.axiosGetReq('/userManageList/salelist',obj)
          .then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              that.salesList = res.data.data;
            } else {
              that.$message.error('网络出错，请稍后再试！');
            }
          })
        }else{
          this.$alert('请输入查找内容', {confirmButtonText: '确定',});
        }
      },
      search:function(){
        var flag = true;
        var that = this;
        var obj = {
          saleName:that.searchSaleName,
          token:"111"
        };
        // 收索用户类型
        if(that.searchUserStyle=="手机号"){
          obj.phone = that.searchUserContent;
          obj.trueName = "";
          obj.companyName = "";
        }else if(that.searchUserStyle=="单位名称"){
          obj.phone = "";
          obj.trueName = "";
          obj.companyName = that.searchUserContent;
        }else if(that.searchUserStyle=="真实姓名"){
          obj.phone = "";
          obj.trueName = that.searchUserContent;
          obj.companyName = "";
        }
        //类型
        if(that.searchtype=="全部"){
          obj.type = "";
        }else if(that.searchtype=="个人"){
          obj.type = 1;
        }else if(that.searchtype=="机构"){
          obj.type = 2;
        }
        //是否绑定销售
        if(that.searchisBindSale=="全部"){
          obj.isBindSale = "";
        }else if(that.searchisBindSale=="是"){
          obj.isBindSale = 1;
        }else if(that.searchisBindSale=="否"){
          obj.isBindSale = 2;
        }
        if(!that.searchSaleName){
          that.searchSaleName = "";
        }
        // console.log(obj)
          that.global.axiosGetReq('/userManageList/userlist',obj)
          .then((res) => {
            // console.log(res,"searchList")
            if (res.data.callStatus === 'SUCCEED') {
              that.userList = res.data.data;
              //清空搜寻项目
              // that.searchSaleName = "";
              // that.searchUserContent = "";
            } else {
              that.$message.error('网络出错，请稍后再试！');
            }
          })
      },
      cancelBindSale:function(index,one){
        var that = this;
        that.$confirm('确定取消该绑定吗?', {  confirmButtonText: '确定',  cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var obj = {
            token:"1211",
            // token:that.global.getToken()
            salePhone:one.salePhone,
            userPhone:one.phone
          };
          that.global.axiosGetReq('/userManageList/disBind',obj)
          .then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              that.userList[index].isBindSale = "否";
              that.userList[index].saleName = "";
              that.$message({
                type: 'success',
                message: '解除成功!'
              });
            } else {
              that.$message.error('网络出错，请稍后再试！');
            }
          })
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消解除'
          });
        });
      },
    },
  }
</script>

<style>
.userListWrap .el-select .el-input {
    width: 110px;
  }
.userListWrap   .asgagewgf h3{
    font-weight: 500;
    line-height: 50px;
    color: #20a0ff;
  }
.userListWrap   .asgagewgf .personalInfor{
    position: relative;
  }
.userListWrap   .asgagewgf .personalInfor img{
    position: absolute;
    top: 0;
    right: 0;
    width: 150px;
    height: 150px;
  }
.userListWrap   .asgagewgf  span{
    width: 40%;
    display: inline-block;
    line-height: 35px;
  }
  /*.demo-table-expand label {
    font-weight: bold;
  }
  .warp  .warp-main .el-input{
    width: 100%;
    padding-right: 0px;
  }
  .warp .el-input{
    width: 70%;
    padding-right: 20px;
  }*/
</style>
