<template>
  <el-row class="certificationWarp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>资质列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>


    <el-col  class="toolbar" style="padding-bottom: 0px;padding-top:20px;">
      <el-form :inline="true" >
        <el-form-item>
          <el-input v-model="searchUserContent">
            <el-select v-model="searchUserType" slot="prepend" placeholder="请选择">
              <el-option label="用户编号" value="用户编号"></el-option>
              <el-option label="真实姓名" value="真实姓名"></el-option>
              <el-option label="手机号" value="手机号"></el-option>
              <el-option label="单位名称" value="单位名称"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="类型：">
          <el-select v-model="searchType"  placeholder="请选择" >
            <el-option  v-for="item in userTypes"  :key="item.value"  :label="item.label"  :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="searchState" placeholder="请选择" >
            <el-option  v-for="item in states"  :key="item.value"  :label="item.label"  :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-dialog title="照片大图" :visible.sync="ifShowBigImg">
      <img src="1.png" style="width:350px;height:350px;display:block;margin:auto;">
    </el-dialog>


    <el-table :data="certificationList"  border style="width: 100%">
      <el-table-column  prop="userId"  width="200px"  align="center"  label="用户编号"></el-table-column>
      <el-table-column  prop="nameAndPhone"  align="center"  label="真实姓名+手机号">  </el-table-column>
      <el-table-column  prop="userType"  align="center"  label="类型">  </el-table-column>
      <el-table-column  prop="userCompony"  align="center"  label="单位名称">  </el-table-column>
      <el-table-column  prop="place"  align="center"  label="所在地+详细地址">  </el-table-column>
      <el-table-column  prop="certification"  align="center"  label="资格证" class-name="imgWrap">
        <template scope="scope">
          <el-tooltip class="item" effect="dark" content="点击查看大图" placement="left">
            <img style="width:150px;height:150px;cursor:pointer" src="1.png" v-on:click="showBigImg(scope.$index)">
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column  prop="state"  align="center"  label="状态">  </el-table-column>
      <el-table-column  label="操作"  align="center" >
        <template scope="scope">
          <span v-if="certificationList[scope.$index].state=='待审核'">
            <el-button type="text"  v-on:click="pass(scope.$index)">通过</el-button>
            <el-button type="text"   v-on:click="dontPass(scope.$index)">不通过</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>
<script>
  export default{
    data(){
      return {
        ifShowBigImg:false,
        searchUserContent:null,
        searchUserType:"用户编号",
        searchType:"不限",
        searchState:"全部",
        certificationList:[
          {userId:12121,nameAndPhone:'asdfaf&&1234141414',userType:"asdfa",userCompony:"aewfaef",place:"adfgagfaggrefg",certification:"1.png",state:"待审核"},
          {userId:12121,nameAndPhone:'asdfaf&&1234141414',userType:"asdfa",userCompony:"aewfaef",place:"adfgagfaggrefg",certification:"1.png",state:"审核通过"},
          {userId:12121,nameAndPhone:'asdfaf&&1234141414',userType:"asdfa",userCompony:"aewfaef",place:"adfgagfaggrefg",certification:"1.png",state:"待审核"},
          {userId:12121,nameAndPhone:'asdfaf&&1234141414',userType:"asdfa",userCompony:"aewfaef",place:"adfgagfaggrefg",certification:"1.png",state:"审核不通过"},
          {userId:12121,nameAndPhone:'asdfaf&&1234141414',userType:"asdfa",userCompony:"aewfaef",place:"adfgagfaggrefg",certification:"1.png",state:"待审核"},
          {userId:12121,nameAndPhone:'asdfaf&&1234141414',userType:"asdfa",userCompony:"aewfaef",place:"adfgagfaggrefg",certification:"1.png",state:"待审核"},
          {userId:12121,nameAndPhone:'asdfaf&&1234141414',userType:"asdfa",userCompony:"aewfaef",place:"adfgagfaggrefg",certification:"1.png",state:"待审核"},
          {userId:12121,nameAndPhone:'asdfaf&&1234141414',userType:"asdfa",userCompony:"aewfaef",place:"adfgagfaggrefg",certification:"1.png",state:"待审核"},
          {userId:12121,nameAndPhone:'asdfaf&&1234141414',userType:"asdfa",userCompony:"aewfaef",place:"adfgagfaggrefg",certification:"1.png",state:"待审核"},
          {userId:12121,nameAndPhone:'asdfaf&&1234141414',userType:"asdfa",userCompony:"aewfaef",place:"adfgagfaggrefg",certification:"1.png",state:"待审核"}
        ],
        userTypes: [
          {value: '不限',label: '不限'},
          {value: '个人',label: '个人'},
          {value: '机构',label: '机构'}
        ],
        states:[
          {value: '全部',label: '全部'},
          {value: '待审核',label: '待审核'},
          {value: '审核通过',label: '审核通过'},
          {value: '审核不通过',label: '审核不通过'}
        ],
      }
    },
    watch:{

    },
    methods: {
      search:function(){},
      pass:function(index){
        this.$confirm('确定通过审核吗?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.certificationList[index].state = "审核通过";
          this.$message({
            type: 'success',
            message: '审核通过!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '审核取消'
          });
        });
      },
      dontPass:function(index){
        this.$confirm('确定审核不通过吗?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.certificationList[index].state = "审核不通过";
          this.$message({
            type: 'success',
            message: '审核不通过!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '审核取消'
          });
        });
      },
      showBigImg:function(idnex){
        this.ifShowBigImg = true;
      },
    },
  }
</script>

<style>
  .certificationWarp .el-select .el-input {
      min-width: 110px;
      max-width: 150px;
    }

</style>
