<template>
	<el-row class="userListWrap">
		<el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>销售员管理</b></el-breadcrumb-item>
        <el-breadcrumb-item>客户资源管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24" class="warp-main">
    	<el-form :inline="true" class="clearfix">
    		<el-input v-model="selectInput" class="fl t_input_w">
		    	<el-select v-model="sel_value" slot="prepend" class="fl t_select_width" @change="selectOpt">
				    <el-option
				      v-for="item in optSelect"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
        </el-input>
        <el-form-item class="fl" style="margin-left:10px;">
          <el-button type="primary" @click="queryHandler">查询</el-button>
        </el-form-item>
	    </el-form>
    </el-col>
    <el-button type="primary" class="add_btn" @click="customerAddHandler">+添加新客户</el-button>

    <!--客户列表-->
    <el-table :data="customerList" border>
      <el-table-column prop="unitName" label="单位名称" :span="12" align="center">
      </el-table-column>
      <el-table-column prop="unitAddress" label="单位地址" :span="12" align="center">
      </el-table-column>
      <el-table-column prop="contacts" label="联系人" :span="12" align="center">
      </el-table-column>
      <el-table-column prop="contactsPhone" label="联系电话" :span="12" align="center">
      </el-table-column>
      <el-table-column prop="handle" label="操作" :span="12" align="center">
        <template scope="scope">
          <el-button
            size="small"
            type="info"
            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button
            size="small"
            type="danger"
            @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
    <!-- 添加客户信息 -->				 
    <el-dialog :title="!isEdit? '添加客户信息':'修改客户信息'" size="tiny" v-model="customerVisible" :close-on-click-modal="true">
	    <ul class="customer_wrap">
		    <li class="clearfix">
		    	<span class="fl span_nav"><span class="fr"><i class="i_col_red">*</i>单位名称：</span></span>
		      <el-input v-model="companyName" class="fl" style="width:200px;"></el-input>
		    </li>
		    <li class="clearfix">
		    	<span class="fl span_nav"><span class="fr"><i class="i_col_red">*</i>单位地址：</span></span>
		      <el-input v-model="companyAdd" class="fl" style="width:200px;"></el-input>
		    </li>
		    <li class="clearfix">
		    	<span class="fl span_nav"><span class="fr"><i class="i_col_red">*</i>联系人：</span></span>
		      <el-input v-model="linkMan" class="fl" style="width:200px;"></el-input>
		    </li>
		    <li class="clearfix">
		    	<span class="fl span_nav"><span class="fr"><i class="i_col_red">*</i>联系电话：</span></span>
		      <el-input v-model="contact_" class="fl" style="width:200px;"></el-input>
		    </li>
		  </ul>
	    <div style="margin-top:30px;">
	      <el-button class="btn_" type="primary" @click="saveHandler">保存</el-button>
	    </div>
    </el-dialog>
	</el-row>
</template>

<script>
	import global from '../../global/global'
	import paging from '../../website/brandLib/paging0'
	export default {
		data(){
			return {
				optSelect: [{
          value: '1',
          label: '单位名称'
        }, {
          value: '2',
          label: '联系人'
        },{
          value: '3',
          label: '联系电话'
        }],
        //默认每页数据量
        pagesize: 10,
        //当前页码
        currentPage: 1,
        //默认数据总数
        totalCount: 1,
        sel_value: '1',
        selectInput: '',
        customerList: [],
        customerVisible: false,
        isEdit: false,
        companyName: '',
        companyAdd: '',
        linkMan: '',
        contact_: '',
        cusId: ''
			}
		},
		components: {
      paging
    },
		created(){
			this.queryHandler()
		},
		methods: {
			selectOpt(key){
        this.sel_value = key;
        this.selectInput = '';
      },
      handleCurrentChange(val) {
        this.currentPage = val 
        this.queryHandler(val)
      },
      queryHandler(val){
      	var params;
      	if (val == undefined || typeof(val) == 'object') {
          this.currentPage = 1
        } else {
          this.currentPage = val
        }
      	if(this.sel_value == '1'){
      		params = {
      			companyName: this.selectInput,
      			companyAdd: '',
      			linkMan: '',
      			currentPage: this.currentPage,
            numberPerpage: this.pagesize
      		}	
      	}else if(this.sel_value == '2'){
      		params = {
      			companyName: '',
      			companyAdd: this.selectInput,
      			linkMan: '',
      			currentPage: this.currentPage,
            numberPerpage: this.pagesize
      		}	
      	}else if(this.sel_value == '3'){
      		params = {
      			companyName: '',
      			companyAdd: '',
      			linkMan: this.selectInput,
      			currentPage: this.currentPage,
            numberPerpage: this.pagesize
      		}	
      	}
        global.axiosPostReq('/cus/show',params).then((res) => {
          if(res.data.callStatus === 'SUCCEED'){
            this.customerList = res.data.data
            this.totalCount = res.data.totalNumber
          }
        })
      },
      saveHandler(){
      	if(this.isEdit){
      		let params = {
	      		cusId: this.cusId,
	      		unitName: this.companyName,
	      		unitAddress: this.companyAdd,
	      		contacts: this.linkMan,
	      		contactsPhone: this.contact_
	      	}
	      	
	      	global.axiosPostReq('/cus/update',params).then((res) => {
	          if(res.data.callStatus === 'SUCCEED'){
	            this.$message({
	              message: '修改成功',
	              type: 'success'
	            });
	            this.customerVisible = false
	            this.queryHandler()
	          }
	        })
      	}else if(!this.isEdit){
      		let params = {
	      		unitName: this.companyName,
	      		unitAddress: this.companyAdd,
	      		contacts: this.linkMan,
	      		contactsPhone: this.contact_
	      	}
	      	global.axiosPostReq('/cus/insert',params).then((res) => {
	          if(res.data.callStatus === 'SUCCEED'){
	            this.$message({
	              message: '新增成功',
	              type: 'success'
	            });
	            this.customerVisible = false
	            this.queryHandler()
	          }
	        })
      	}
      },
			customerAddHandler(){
				this.customerVisible = true;
				this.isEdit = false;
				this.companyName = '',
				this.companyAdd = '',
				this.linkMan = '',
				this.contact_ = ''
			},
			handleEdit(index, row){
				this.customerVisible = true;
				this.isEdit = true;
				this.companyName = row.unitName,
				this.companyAdd = row.unitAddress,
				this.linkMan = row.contacts,
				this.contact_ = row.contactsPhone,
				this.cusId = row.cusId
			},
			handleDel(index, row){
				this.$confirm('确定删除吗？')
          .then(_ => {
            global.axiosPostReq('/cus/delete',{cusId: row.cusId}).then((res) => {
		          if(res.data.callStatus === 'SUCCEED'){
		            this.$message({
		              message: '删除成功',
		              type: 'success'
		            });
		            this.queryHandler()
		          }else{
		          	this.$message({
		              message: '删除失败',
		              type: 'success'
		            });
		          }
		        })
          })
          .catch(_ => {});
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
  .t_select_width{
    width:110px;
  }
	.add_btn{
		float:right;
		margin: 20px 118px 20px 0;
	}
	.i_col_red{
	  color: #cb1700;
	  font-style: normal;
	}
	.customer_wrap li{
		height: 40px;
		line-height: 40px;
	}
	.span_nav{
		display: inline-block;
		width: 84px;
		padding-right: 6px;
	}
	.btn_{
	  margin-left: 92px;
	}
</style>