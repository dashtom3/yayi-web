<template>
  <el-row class="certificationWarp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>用户管理</b></el-breadcrumb-item>
        <el-breadcrumb-item>资质列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col class="toolbar" style="padding-bottom: 0px;padding-top:20px;">
      <el-form :inline="true" >
        <el-form-item>
            <el-input v-model="searchUserContent">
            <el-select v-model="searchUserType" slot="prepend" @change="selectOpt">
              <el-option label="真实姓名" value="真实姓名"></el-option>
              <el-option label="手机号" value="手机号"></el-option>
              <el-option label="单位名称" value="单位名称"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="类型：">
          <el-select v-model="searchType">
            <el-option  v-for="item in userTypes"  :key="item.value"  :label="item.label"  :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="searchState">
            <el-option  v-for="item in states"  :key="item.value"  :label="item.label"  :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-dialog title="照片大图" :visible.sync="ifShowBigImg">
      <img :src="bigImgSrc" style="width:350px;height:350px;display:block;margin:auto;">
    </el-dialog>
    <el-table :data="certificationList"  border style="width: 100%;">
      <el-table-column  prop="trueName"  align="center" label="真实姓名"> 
      </el-table-column>
      <el-table-column  prop="phone"  align="center" label="手机号" width="140"> 
      </el-table-column>
      <el-table-column  prop="certification.type"  align="center" width="70" label="类型"> 
        <template scope="scope">
          <span v-if='scope.row.certification.type === 1'>个人</span>
          <span v-else-if='scope.row.certification.type === 2'>机构</span>
        </template>
       </el-table-column>
      <el-table-column  prop="certification.companyName"  align="center"  label="单位名称">  </el-table-column>
      <el-table-column  align="center" width="170" label="所在地"> 
        <template scope="scope">
            <span>{{scope.row.certification.part}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="certification.workAddress" align="center" width="160" label="详细地址"> 
      </el-table-column>
      <el-table-column  prop="certification.doctorPic"  align="center" width="80" label="资格证" class-name="imgWrap">
        <template scope="scope">
          <el-tooltip class="item" effect="dark" content="点击查看大图" placement="left">
            <img style="width:32px;height:32px;cursor:pointer;vertical-align:middle;" :src="certificationList[scope.$index].certification.doctorPic" v-on:click="showBigImg(scope.$index)">
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column align="center"  label="状态"> 
        <template scope="scope">
            <span v-if='scope.row.certification.state === 1'>待审核</span>
            <span v-else-if='scope.row.certification.state === 2'>审核通过</span>
            <span v-else='scope.row.certification.state === 3'>审核不通过</span>
        </template>
      </el-table-column>
      <el-table-column  label="操作"  align="center" >
        <template scope="scope">
          <span v-if="certificationList[scope.$index].certification.state=='1'">
            <el-button type="text"  v-on:click="pass(scope.$index)">通过</el-button>
            <el-button type="text"   v-on:click="dontPass(scope.$index)">不通过</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="position:absolute;top:650px;right:0;" v-show="this.totalCount > this.pagesize">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pagesize"
        layout="prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>
  </el-row>
</template>
<script>
  import global from '../../global/global'
  export default{
    data(){
      return {
        ifShowBigImg:false,
        searchUserContent:"",
        searchUserType:"真实姓名",
        searchType:"",
        searchState:"",
        certificationList:[],
        bigImgSrc: '',
        selectVal: '',
        //默认每页数据量
        pagesize: 10,
        //当前页码
        currentPage: 1,
        //默认数据总数
        totalCount: 1,
        userTypes: [
          {value: '',label: '全部'},
          {value: 1,label: '个人'},
          {value: 2,label: '机构'}
        ],
        states:[
          {value: '',label: '全部'},
          {value: 1,label: '待审核'},
          {value: 2,label: '审核通过'},
          {value: 3,label: '审核不通过'}
        ],
      }
    },
    created(){
      this.search();
    },
    methods: {
      handleCurrentChange(val) {
        this.currentPage = val 
        this.search(val)
      },
      selectOpt(key){
        this.selectVal = key;
        this.searchUserContent = '';
      },
      search:function(val){
        var params;
        if (val == undefined || typeof(val) == 'object') {
          this.currentPage = 1
        } else {
          this.currentPage = val
        }
        if(this.selectVal === "手机号"){
          params = {
            phone: this.searchUserContent,
            trueName: '',
            companyName: '',
            type: this.searchType,
            state: this.searchState,
            currentPage: this.currentPage,
            numberPerPage: this.pagesize
          }
        }else if(this.selectVal === "真实姓名"){
          params = {
            phone: '',
            trueName: this.searchUserContent,
            companyName: '',
            type: this.searchType,
            state: this.searchState,
            currentPage: this.currentPage,
            numberPerPage: this.pagesize
          }
        }else if(this.selectVal === "单位名称"){
          params = {
            phone: '',
            trueName: '',
            companyName: this.searchUserContent,
            type: this.searchType,
            state: this.searchState,
            currentPage: this.currentPage,
            numberPerPage: this.pagesize
          }
        }else{
          params = {
            phone: '',
            trueName: this.searchUserContent,
            companyName: '',
            type: this.searchType,
            state: this.searchState,
            currentPage: this.currentPage,
            numberPerPage: this.pagesize
          }
        }
        global.axiosGetReq('/userCertificationList/list',params).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            this.certificationList = res.data.data
            this.totalCount = res.data.totalNumber
          }else{
            this.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      pass:function(index){
        this.$confirm('确定通过审核吗?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.certificationList[index].certification.state = "2";
          let params = {
            phone: this.certificationList[index].phone,
            state: this.certificationList[index].certification.state,
            failReason: '',
            token: 'f02fa6e1-ddbe-462d-af65-b9ca4f4835e2'
          }
          global.axiosPostReq('/userCertificationList/verify',params).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              this.$message({
                type: 'success',
                message: '审核通过!'
              });
              this.search();
            }else{
              this.$message({
                type: 'info',
                message: '审核取消'
              });
            }
          })
        })
      },
      dontPass:function(index){
        this.$prompt('拒绝理由','确定审核不通过吗?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({value}) => {
          this.certificationList[index].certification.state = "3";
          let params = {
            phone: this.certificationList[index].phone,
            state: this.certificationList[index].certification.state,
            failReason: value,
            token: 'f02fa6e1-ddbe-462d-af65-b9ca4f4835e2'
          }
          console.log('ceshi jujue',params)
          global.axiosPostReq('/userCertificationList/verify',params).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              this.$message({
                type: 'success',
                message: '审核不通过!'
              });
              this.search();
            }else{
              this.$message({
                type: 'info',
                message: '审核取消'
              });
            }
          })
        })
      },
      showBigImg:function(index){
        this.ifShowBigImg = true;
        this.bigImgSrc = this.certificationList[index].certification.doctorPic;
      }
    },
  }
</script>

<style>
  .certificationWarp .el-select .el-input {
      min-width: 110px;
      max-width: 150px;
    }

</style>
