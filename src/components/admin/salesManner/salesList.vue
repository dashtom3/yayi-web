<template>
  <el-row class="saleListWarp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>销售员管理</b></el-breadcrumb-item>
        <el-breadcrumb-item>销售员列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col  class="toolbar" style="padding-bottom: 0px;padding-top:20px;">
      <el-form :inline="true" >
        <el-form-item>
          <el-input v-model="searchUserContent">
            <el-select v-model="searchUserType" slot="prepend" placeholder="请选择">
              <!-- <el-option label="销售员编号" value="用户编号"></el-option> -->
              <el-option label="手机号" value="手机号"></el-option>
              <el-option label="真实姓名" value="真实姓名"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="是否绑定客户：">
          <el-select v-model="searchState" placeholder="请选择" >
            <el-option  v-for="item in states"  :key="item.value"  :label="item.label"  :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-dialog :visible.sync="bindSalseAlert">
      <h4>当前已绑定人数（人）：<span>12</span></h4>
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="未绑定" name="first">
          <el-form :inline="true" >
            <el-form-item>
              <el-input placeholder="请输入内容" >
                <el-select  slot="prepend" v-model="noBindSearchType">
                  <!-- <el-option label="用户编号" value="用户编号"></el-option> -->
                  <el-option label="手机号" value="手机号"></el-option>
                  <el-option label="真实姓名" value="真实姓名"></el-option>
                  <el-option label="单位名称" value="单位名称"></el-option>
                </el-select>
                <el-button slot="append" icon="search"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item style="font-size:40px;">
              <el-button type="primary" v-on:click="search">绑定</el-button>
            </el-form-item>
          </el-form>
          <el-table ref="multipleTable" :data="noBindUserList"  border style="width: 100%" @selection-change="handleSelectionChange1" height="500">
            <el-table-column  type="selection"  width="55">  </el-table-column>
            <!-- <el-table-column  prop="userId"  width="200px"  align="center"  label="销售员编号"></el-table-column> -->
            <el-table-column  prop="userName"  align="center"  label="真实姓名">  </el-table-column>
            <el-table-column  prop="userPhone"  align="center"  label="手机号">  </el-table-column>
            <el-table-column  prop="userCompony"  align="center"  label="注册时间">  </el-table-column>
            <el-table-column  label="操作"  align="center" >
              <template scope="scope">
                <el-button type="primary" v-on:click="search">绑定</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="已绑定" name="second">
          <el-form :inline="true" >
            <el-form-item>
              <el-input placeholder="请输入内容" >
                <el-select  slot="prepend" placeholder="请选择" v-model="BindSearchType">
                  <!-- <el-option label="用户编号" value="用户编号"></el-option> -->
                  <el-option label="手机号" value="手机号"></el-option>
                  <el-option label="真实姓名" value="真实姓名"></el-option>
                  <el-option label="公司名称" value="公司名称"></el-option>
                </el-select>
                <el-button slot="append" icon="search"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" v-on:click="search">取消绑定</el-button>
            </el-form-item>
          </el-form>
          <el-table ref="multipleTable" :data="bindedUserList"  border style="width: 100%" @selection-change="handleSelectionChange2" height="500">
            <el-table-column  type="selection"  width="55">  </el-table-column>
            <!-- <el-table-column  prop="userId"  width="200px"  align="center"  label="销售员编号"></el-table-column> -->
            <el-table-column  prop="userName"  align="center"  label="真实姓名">  </el-table-column>
            <el-table-column  prop="userPhone"  align="center"  label="手机号">  </el-table-column>
            <el-table-column  prop="userName"  align="center"  label="单位名称">  </el-table-column>
            <el-table-column  prop="userCompony"  align="center"  label="注册时间">  </el-table-column>
            <el-table-column  label="操作"  align="center" >
              <template scope="scope">
                <el-button type="primary" v-on:click="search">取消绑定</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <el-dialog custom-class="asgagewgf" title="销售员详情" :visible.sync="showSaleDetailInfor">
      <div class="personalInfor">
        <img src="" alt="">
        <h3>个人资料</h3>
        <div class="">
          <span>销售员编号：{{someOneUserDetails.info.bianhao}}</span>
          <span>真实姓名：{{someOneUserDetails.info.name}}</span>
        </div>
        <div class="">
          <span>手机号：{{someOneUserDetails.info.phone}}</span>
          <span>性别：{{someOneUserDetails.info.sex}}</span>
        </div>
        <div class="">
          <span>身份证号：{{someOneUserDetails.info.ID}}</span>
          <span>注册时间：{{someOneUserDetails.info.time}}</span>
        </div>
        <div class="">
          <span>钱包余额：{{someOneUserDetails.info.leaveMoney}}</span>
          <span>已绑定的客户数：{{someOneUserDetails.info.bindUserNum}}</span>
        </div>
      </div>
      <div class="certification">
        <h3>体现方式</h3>
        <div class="">
          <span>类型：{{someOneUserDetails.getMoneyStyle.type}}</span>
          <span>账号：{{someOneUserDetails.getMoneyStyle.count}}</span>
        </div>
      </div>
      <h3>绑定的客户信息</h3>
      <el-table :data="someOneUserDetails.bindUsers" border>
        <el-table-column align="center" property="bianhao" label="用户编号" width="150"></el-table-column>
        <el-table-column align="center" property="phone" label="手机号"></el-table-column>
        <el-table-column align="center" property="name" label="真实姓名" width="200"></el-table-column>
        <el-table-column align="center" property="componey" label="公司名称"></el-table-column>
      </el-table>
    </el-dialog>

    <el-table :data="salesList"  border style="width: 100%">
      <!-- <el-table-column  prop="saleId"  width="200px"  align="center"  label="销售员编号"></el-table-column> -->
      <el-table-column  prop="name"  align="center"  label="真实姓名">  </el-table-column>
      <el-table-column  prop="phone"  align="center"  label="手机号">  </el-table-column>
      <el-table-column  prop="time"  align="center"  label="注册时间">  </el-table-column>
      <el-table-column  prop="bindUser"  align="center"  label="是否绑定客户">  </el-table-column>
      <el-table-column  prop="userNum"  align="center"  label="客户数量">  </el-table-column>
      <el-table-column  label="操作"  align="center" >
        <template scope="scope">
            <el-button v-if="scope.row.bindUser=='否'" type="text"  v-on:click="bindUser(scope.$index)">绑定客户</el-button>
            <el-button v-else type="text"  v-on:click="cancleBindUser(scope.$index)">取消绑定</el-button>
            <el-button type="text"   v-on:click="saleDetail(scope.$index)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>
<script>
  export default{
    data(){
      return {
        noBindSearchType:"手机号",
        BindSearchType:"手机号",
        multipleSelection1: [],
        multipleSelection2: [],
        activeName2: 'first',
        showSaleDetailInfor:false,
        bindSalseAlert:false,
        searchUserContent:null,
        searchUserType:"手机号",
        searchState:"全部",
        bindedUserList:[
          {userId:12112,userName:"eqaer",userPhone:"12121211212",userCompony:"asdfadfaf"},
          {userId:12112,userName:"eqaer",userPhone:"12121211212",userCompony:"asdfadfaf"},
          {userId:12112,userName:"eqaer",userPhone:"12121211212",userCompony:"asdfadfaf"},
          {userId:12112,userName:"eqaer",userPhone:"12121211212",userCompony:"asdfadfaf"},
          {userId:12112,userName:"eqaer",userPhone:"12121211212",userCompony:"asdfadfaf"},
          {userId:12112,userName:"eqaer",userPhone:"12121211212",userCompony:"asdfadfaf"},
          {userId:12112,userName:"eqaer",userPhone:"12121211212",userCompony:"asdfadfaf"},
          {userId:12112,userName:"eqaer",userPhone:"12121211212",userCompony:"asdfadfaf"},
          {userId:12112,userName:"eqaer",userPhone:"12121211212",userCompony:"asdfadfaf"},
          {userId:12112,userName:"eqaer",userPhone:"12121211212",userCompony:"asdfadfaf"},
          {userId:12112,userName:"eqaer",userPhone:"12121211212",userCompony:"asdfadfaf"},
          {userId:12112,userName:"eqaer",userPhone:"12121211212",userCompony:"asdfadfaf"},
          {userId:12112,userName:"eqaer",userPhone:"12121211212",userCompony:"asdfadfaf"},
          {userId:12112,userName:"eqaer",userPhone:"12121211212",userCompony:"asdfadfaf"},
          {userId:12112,userName:"eqaer",userPhone:"12121211212",userCompony:"asdfadfaf"},
          {userId:12112,userName:"eqaer",userPhone:"12121211212",userCompony:"asdfadfaf"}
        ],
        noBindUserList:[
          {userId:12112,userName:"eqaer",userPhone:"12121211212",userCompony:"asdfadfaf"},
          {userId:12112,userName:"eqaer",userPhone:"12121211212",userCompony:"asdfadfaf"},
          {userId:12112,userName:"eqaer",userPhone:"12121211212",userCompony:"asdfadfaf"},
          {userId:12112,userName:"eqaer",userPhone:"12121211212",userCompony:"asdfadfaf"},
          {userId:12112,userName:"eqaer",userPhone:"12121211212",userCompony:"asdfadfaf"},
          {userId:12112,userName:"eqaer",userPhone:"12121211212",userCompony:"asdfadfaf"},
          {userId:12112,userName:"eqaer",userPhone:"12121211212",userCompony:"asdfadfaf"},
          {userId:12112,userName:"eqaer",userPhone:"12121211212",userCompony:"asdfadfaf"},
          {userId:12112,userName:"eqaer",userPhone:"12121211212",userCompony:"asdfadfaf"},
          {userId:12112,userName:"eqaer",userPhone:"12121211212",userCompony:"asdfadfaf"},
          {userId:12112,userName:"eqaer",userPhone:"12121211212",userCompony:"asdfadfaf"},
          {userId:12112,userName:"eqaer",userPhone:"12121211212",userCompony:"asdfadfaf"},
          {userId:12112,userName:"eqaer",userPhone:"12121211212",userCompony:"asdfadfaf"},
          {userId:12112,userName:"eqaer",userPhone:"12121211212",userCompony:"asdfadfaf"},
          {userId:12112,userName:"eqaer",userPhone:"12121211212",userCompony:"asdfadfaf"},
          {userId:12112,userName:"eqaer",userPhone:"12121211212",userCompony:"asdfadfaf"}
        ],
        someOneUserDetails:{
          info:{
            bianhao:"123134",
            name:"23545",
            phone:"1234",
            sex:'aef',
            ID:"134141341431341414",
            time:"1234-12-12",
            leaveMoney:'2112',
            bindUserNum:123,
            saleImg:"1.png"
          },
          getMoneyStyle:{
            type:"a",
            count:1231313123
          },
          bindUsers:[
            {bianhao:'12',name:'w4er',phone:'32424',componey:'2w323'},
            {bianhao:'12',name:'w4er',phone:'32424',componey:'2w323'},
            {bianhao:'12',name:'w4er',phone:'32424',componey:'2w323'},
            {bianhao:'12',name:'w4er',phone:'32424',componey:'2w323'},
          ]

        },
        salesList:[
          {saleId:12121,name:'asdfaf&&1234141414',phone:31414141414143,time:"asdfa",bindUser:"否",userNum:""},
          {saleId:12121,name:'asdfaf&&1234141414',phone:31414141414143,time:"asdfa",bindUser:"是",userNum:12},
          {saleId:12121,name:'asdfaf&&1234141414',phone:31414141414143,time:"asdfa",bindUser:"否",userNum:""},
          {saleId:12121,name:'asdfaf&&1234141414',phone:31414141414143,time:"asdfa",bindUser:"是",userNum:12},
          {saleId:12121,name:'asdfaf&&1234141414',phone:31414141414143,time:"asdfa",bindUser:"否",userNum:""},
          {saleId:12121,name:'asdfaf&&1234141414',phone:31414141414143,time:"asdfa",bindUser:"是",userNum:12}
        ],
        userTypes: [
          {value: '不限',label: '不限'},
          {value: '个人',label: '个人'},
          {value: '机构',label: '机构'}
        ],
        states:[
          {value: '全部',label: '全部'},
          {value: '是',label: '是'},
          {value: '否',label: '否'}        ],
      }
    },
    watch:{

    },
    methods: {
      handleSelectionChange1(val) {
        this.multipleSelection2 = val;
        console.log(this.multipleSelection2)
      },
      handleSelectionChange2(val) {
        this.multipleSelection2 = val;
        console.log(this.multipleSelection2)
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      bindUser:function(index){
        this.bindSalseAlert = true;
        this.activeName2 = "first";
      },
      cancleBindUser:function(index){
        this.bindSalseAlert = true;
        this.activeName2 = "second";
      },
      saleDetail:function(index){
        this.showSaleDetailInfor = true;
      },
      search:function(){},

    },
  }
</script>

<style>
  .saleListWarp .el-select .el-input{
width: 150px;
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

</style>
