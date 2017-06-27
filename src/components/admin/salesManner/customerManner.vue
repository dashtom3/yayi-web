<template>
	<el-row class="userListWrap">
		<el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>销售员管理</b></el-breadcrumb-item>
        <el-breadcrumb-item>客户资源管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24" class="warp-main">
    	<el-form label-width="80px" class="clearfix">
	    	<el-select v-model="value" class="fl t_select_width">
			    <el-option
			      v-for="item in optSelect"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
        <el-input v-model="select_input" class="fl t_input_w"></el-input>
        <el-form-item class="fl">
          <el-button type="primary">查询</el-button>
        </el-form-item>
	    </el-form>
    </el-col>
    <el-button type="primary" class="add_btn" @click="customerAddHandler">+添加新客户</el-button>

    <!--客户列表-->
    <el-table :data="customerList" border>
      <el-table-column prop="company_name" label="单位名称" :span="12" align="center">
      </el-table-column>
      <el-table-column prop="company_add" label="单位地址" :span="12" align="center">
      </el-table-column>
      <el-table-column prop="linkman" label="联系人" :span="12" align="center">
      </el-table-column>
      <el-table-column prop="contact" label="联系电话" :span="12" align="center">
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

    <!-- 添加视频 -->
    					 
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
	      <el-button class="btn_" type="primary">保存</el-button>
	    </div>
    </el-dialog>
	</el-row>
</template>

<script>
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
        value: '1',
        select_input: '',
        customerList: [{
        	'company_name': '小酱软件',
        	'company_add': '同济',
        	'linkman': '小小',
        	'contact': 13187570389
        },{
        	'company_name': '小酱软件',
        	'company_add': '同济',
        	'linkman': '小小',
        	'contact': 13187570389
        },{
        	'company_name': '小酱软件',
        	'company_add': '同济',
        	'linkman': '小小',
        	'contact': 13187570389
        }],
        customerVisible: false,
        isEdit: false,
        companyName: '',
        companyAdd: '',
        linkMan: '',
        contact_: ''
			}
		},
		methods: {
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
				this.companyName = row.company_name,
				this.companyAdd = row.company_add,
				this.linkMan = row.linkman,
				this.contact_ = row.contact
			},
			handleDel(index, row){
				this.$confirm('确定删除吗？')
          .then(_ => {
            done();
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
		width:220px!important;
	}
	.t_select_width{
		width:110px;
	}
	.add_btn{
		float:right;
		margin: 20px 118px 20px 0;
	}
	.i_col_red{
	  color: red;
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