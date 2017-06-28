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
                <!-- <el-option label="用户编号" value="用户编号"></el-option> -->
                <el-option label="手机号" value="手机号"></el-option>
                <el-option label="真实姓名" value="真实姓名"></el-option>
                <el-option label="单位名称" value="单位名称"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item label="是否绑定销售：">
            <el-select v-model="searchIfBindSale" placeholder="请选择">
              <el-option  v-for="item in options"  :key="item.value"  :label="item.label"  :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型：">
            <el-select v-model="searchUserType" placeholder="请选择">
              <el-option  v-for="item in userTypes"  :key="item.value"  :label="item.label"  :value="item.value"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销售员名称：">
            <el-input v-model="searchSaleName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>



      <!--列表-->
      <el-table :data="userList"  border style="width: 100%">
        <!-- <el-table-column  prop="userId"  width="200px"  align="center"  label="用户编号"></el-table-column> -->
        <el-table-column  prop="userName"  align="center"  label="用户姓名">  </el-table-column>
        <el-table-column  prop="userPhone"  align="center"  label="手机号"> </el-table-column>
        <el-table-column  prop="userCompony"  align="center"  label="单位名称">  </el-table-column>
        <el-table-column  prop="userType"  align="center"  label="类型">  </el-table-column>
        <el-table-column  prop="ifBindSale"  align="center"  label="是否绑定销售">  </el-table-column>
        <el-table-column  prop="saleName" align="center"  label="销售员姓名">  </el-table-column>
        <el-table-column  label="操作" align="center">
          <template scope="scope">
          <el-button v-if="userList[scope.$index].ifBindSale=='是'"  type="text"  v-on:click="cancelBindSale(scope.$index)">取消绑定</el-button>
          <el-button v-else  type="text"  v-on:click="addBindSale(scope.$index)">绑定销售</el-button>
          <el-button type="text"   v-on:click="details(scope.$index)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-dialog custom-class="" title="绑定销售员" :visible.sync="showBindSalAlert">
      <el-form :inline="true" >
        <el-form-item>
            <el-select v-model="bindSaleSearchType" placeholder="请选择">
              <!-- <el-option label="用户编号" value="用户编号"></el-option> -->
              <el-option label="手机号" value="手机号"></el-option>
              <el-option label="真实姓名" value="真实姓名"></el-option>
              <!-- <el-option label="单位名称" value="单位名称"></el-option> -->
            </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="bindSaleSearchCont" placeholder="请输入内容">
            <el-button slot="append" icon="search"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <el-table height="500"  :data="salesList" border>
        <!-- <el-table-column align="center" property="bianhao" label="销售员编号" width="150"></el-table-column> -->
        <el-table-column align="center" property="phone" label="手机号"></el-table-column>
        <el-table-column align="center" property="name" label="真实姓名" width="200"></el-table-column>
        <el-table-column align="center" property="hehushu" label="操作">
          <template scope="scope">
            <el-button type="text" v-on:click="bandThisSale(scope.$index)">绑定</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog custom-class="asgagewgf" title="用户详情" :visible.sync="showUserDetailInfor">
      <div class="personalInfor">
        <img src="" alt="">
        <h3>个人信息</h3>
        <div class="">
          <span>用户编号：{{someOneUserDetails.info.bianhao}}</span>
          <span>真实姓名：{{someOneUserDetails.info.name}}</span>
        </div>
        <div class="">
          <span>手机号：{{someOneUserDetails.info.phone}}</span>
          <span>性别：{{someOneUserDetails.info.sex}}</span>
        </div>
        <div class="">
          <span>生日：{{someOneUserDetails.info.shengri}}</span>
          <span>QQ：{{someOneUserDetails.info.qq}}</span>
        </div>
      </div>
      <div class="certification">
        <h3>资质认证</h3>
        <div class="">
          <span>类型：{{someOneUserDetails.info.type}}</span>
          <span>单位名称：{{someOneUserDetails.info.compony}}</span>
        </div>
        <div class="">
          <span>所在地：{{someOneUserDetails.info.place}}</span>
          <span>详细地址：{{someOneUserDetails.info.detailPlace}}</span>
        </div>
        <div class="">
          <span>口腔执业医师资格证：</span>
          <img style="width:100px;height:100px;display:block" src="a.png" alt="">
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
      <el-table :data="someOneUserDetails.address">
        <el-table-column align="center" property="name" label="收货人" width="150"></el-table-column>
        <el-table-column align="center" property="place" label="所在地区" width="200"></el-table-column>
        <el-table-column align="center" property="detailPlace" label="详细地址"></el-table-column>
        <el-table-column align="center" property="phone" label="手机/电话"></el-table-column>
      </el-table>
    </el-dialog>
  </el-row>
</template>
<script>

  export default{
    data(){
      return {
        needBindSaleUserIndex:null,
        showBindSalAlert:false,
        showUserDetailInfor:false,
        searchUserContent:null,
        searchUserStyle: "手机号",
        searchUserType:'全部',
        searchIfBindSale:"全部",
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
          ifBindSale: "全部",
          userTypes: [{
            value: '选项1',
            label: '全部'
          }, {
            value: '选项2',
            label: '个人'
          }, {
            value: '选项3',
            label: '机构'
          },],

        userList:[
          {userId:"1",userName:"小酱",userPhone:'1234565787912',userCompony:"小酱",userType:"不限",ifBindSale:"是",saleName:'小酱'},
          {userId:"1",userName:"小酱",userPhone:'1234565787912',userCompony:"小酱",userType:"个人",ifBindSale:"否",saleName:''},
          {userId:"1",userName:"小酱",userPhone:'1234565787912',userCompony:"小酱",userType:"机构",ifBindSale:"是",saleName:'小酱'},
          {userId:"1",userName:"小酱",userPhone:'1234565787912',userCompony:"小酱",userType:"个人",ifBindSale:"否",saleName:''},
          {userId:"1",userName:"小酱",userPhone:'1234565787912',userCompony:"小酱",userType:"机构",ifBindSale:"是",saleName:'小酱'},
          {userId:"1",userName:"小酱",userPhone:'1234565787912',userCompony:"小酱",userType:"不限",ifBindSale:"否",saleName:''},
        ],
        someOneUserDetails:{
          info:{
            bianhao:"123134",
            name:"23545",
            phone:"1234",
            sex:'aef',
            shengri:"aef",
            qq:"aef"
          },
          certification:{
            type:"a",
            compony:"adf",
            place:"aafg",
            detailPlace:"aa",
            imgUrl:'ww'
          },
          bindSales:[
            {bianhao:'12',name:'w4er',phone:'32424',time:'werwarf',hehushu:'2w323'}
          ],
          address:[
            {name:'232',place:'43ef',detailPlace:'sdsfs',phone:"3412341412"},
            {name:'232',place:'43ef',detailPlace:'sdsfs',phone:"3412341412"},
            {name:'232',place:'43ef',detailPlace:'sdsfs',phone:"3412341412"},
            {name:'232',place:'43ef',detailPlace:'sdsfs',phone:"3412341412"},
            {name:'232',place:'43ef',detailPlace:'sdsfs',phone:"3412341412"}
          ]
        },
        salesList:[
          {bianhao:'12',name:'w4er',phone:'32424'},
          {bianhao:'12',name:'w4er',phone:'32424'},
          {bianhao:'12',name:'w4er',phone:'32424'},
          {bianhao:'12',name:'w4er',phone:'32424'},
          {bianhao:'12',name:'w4er',phone:'32424'},
          {bianhao:'12',name:'w4er',phone:'32424'},
          {bianhao:'12',name:'w4er',phone:'32424'},
          {bianhao:'12',name:'w4er',phone:'32424'},
          {bianhao:'12',name:'w4er',phone:'32424'},
          {bianhao:'12',name:'w4er',phone:'32424'},
          {bianhao:'12',name:'w4er',phone:'32424'},
          {bianhao:'12',name:'w4er',phone:'32424'},
          {bianhao:'12',name:'w4er',phone:'32424'},
          {bianhao:'12',name:'w4er',phone:'32424'},
          {bianhao:'12',name:'w4er',phone:'32424'},
          {bianhao:'12',name:'w4er',phone:'32424'},
          {bianhao:'12',name:'w4er',phone:'32424'},
          {bianhao:'12',name:'w4er',phone:'32424'},
          {bianhao:'12',name:'w4er',phone:'32424'},
          {bianhao:'12',name:'w4er',phone:'32424'},
          {bianhao:'12',name:'w4er',phone:'32424'},
          {bianhao:'12',name:'w4er',phone:'32424'},
          {bianhao:'12',name:'w4er',phone:'32424'},
          {bianhao:'12',name:'w4er',phone:'32424'},
          {bianhao:'12',name:'w4er',phone:'32424'},
          {bianhao:'12',name:'w4er',phone:'32424'},{bianhao:'12',name:'w4er',phone:'32424'},
        ]
      }
    },
    methods: {
      bandThisSale:function(index){
        this.userList[this.needBindSaleUserIndex].ifBindSale = "是";
        this.userList[this.needBindSaleUserIndex].saleName = this.salesList[index].name;
        this.showBindSalAlert = false;
      },
      addBindSale:function(index){
        this.needBindSaleUserIndex = index;
        this.showBindSalAlert = true;
      },
      details:function(index){
        this.showUserDetailInfor = true;
      },
      search:function(){

      },
      cancelBindSale:function(index){
        console.log(index);
        this.$confirm('确定取消该绑定吗?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.userList[index].ifBindSale = "否";
          this.userList[index].saleName = "";
          this.$message({
            type: 'success',
            message: '解除成功!'
          });
        }).catch(() => {
          this.$message({
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
