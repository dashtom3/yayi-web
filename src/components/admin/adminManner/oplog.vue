<template>
	<el-row class="warp" v-if="accountP">
		<el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>操作日志</b></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24" class="warp-main">
    	<el-form label-width="80px" class="clearfix">
        <el-form-item label="手机号" class="fl t_input_width">
          <el-input v-model="phone"></el-input>
        </el-form-item>
        <el-form-item label="操作内容" class="fl t_input_width">
          <el-input v-model="optContent"></el-input>
        </el-form-item>
        <el-form-item label="系统名称" class="fl t_input_width">
        <el-select v-model="systemName">
          <el-option
            v-for="item in optSelect"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item class="fl">
          <el-button type="primary" @click="queryHandler">查询</el-button>
        </el-form-item>
	    </el-form>
    </el-col>

    <!--回复列表-->
    <el-table :data="optList" border :default-sort = "{prop: 'created', order: 'descending'}">
      <el-table-column prop="phone" label="手机号"  align="center" >
      </el-table-column>
      <el-table-column prop="userName" label="姓名"  align="center" >
      </el-table-column>
      <el-table-column prop="operate" label="操作内容"  align="center" >
      </el-table-column>
      <el-table-column prop="created" label="操作时间" sortable  align="center" >
        <template scope="scope">
          <span>{{new Date(scope.row.created).getFullYear()+'-'+ fillZero(new Date(scope.row.created).getMonth()+1)+'-'+fillZero(new Date(scope.row.created).getDate())+' '+fillZero(new Date(scope.row.created).getHours())+":"+fillZero(new Date(scope.row.created).getMinutes())+":"+fillZero(new Date(scope.row.created).getSeconds())}}</span>
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
  <el-row class="warp" v-else>
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>操作日志</b></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <div>权限不足</div>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        //默认每页数据量
        pagesize: 10,
        //当前页码
        currentPage: 1,
        //默认数据总数
        totalCount: 1,
        optSelect: [{
          value: '1',
          label: '牙医ABC'
        },{
          value: '2',
          label: '后台系统'
        },{
          value: '3',
          label: '创客系统'
        }],
        systemName: '1',
        phone: '',
        optContent: '',
        optList: [],
        accountP: false
      }
    },
    created(){
      var that = this
      let accountType = window.sessionStorage.getItem('accountType')
      if( accountType == 2 ){
        that.accountP = true
      } else {
        that.accountP = false
      }
      this.queryHandler()
    },
    methods: {
      handleCurrentChange(val) {
        this.currentPage = val 
        this.queryHandler(val)
      },
      fillZero(n){
        return n<10 ? '0'+ n: n 
      },
      queryHandler(val){
        var that = this;
        var params = {
          operate: this.optContent,
          phone: this.phone,
          currentPage: this.currentPage,
          numberPerPage: this.pagesize
        }

        if (val == undefined || typeof(val) == 'object') {
          this.currentPageList = 1
        } else {
          this.currentPageList = val
        }

        if(this.systemName === '1'){
          that.global.axiosGetReq('/log/showUserLogList',params).then((res) => {
            if(res.data.callStatus === 'SUCCEED'){
              this.optList = res.data.data
              this.totalCount = res.data.totalNumber
            }
          })
        }else if(this.systemName === '2'){
          that.global.axiosGetReq('/log/showAdminstratorLogList',params).then((res) => {
            if(res.data.callStatus === 'SUCCEED'){
              this.optList = res.data.data
              this.totalCount = res.data.totalNumber
            }
          })
        }else{
          that.global.axiosGetReq('/log/showSaleLogList',params).then((res) => {
            if(res.data.callStatus === 'SUCCEED'){
              this.optList = res.data.data
              this.totalCount = res.data.totalNumber
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
	.fl{
		float:left;
	}
	.clearfix{
		zoom:1;
	}
	.clearfix:after{
		content:"";
		clear:both;
		display:block;
	}
	.t_input_w{
		width:320px!important;
	}
	.t_input_width{
		width:300px;
	}
	.t_select_width{
		width:110px;
	}
	.btn_{
	  margin-left: 154px;
	}
	.btn_box{
	  width: 260px;
	  margin: 20px auto;
	}
	.add_btn{
		float:right;
		margin-right:118px;
		margin-bottom:20px;
	}
	.admin_layout{
		height:40px;
		line-height:40px;
		padding-left:80px;
	}
</style>