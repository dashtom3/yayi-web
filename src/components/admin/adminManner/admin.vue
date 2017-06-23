<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>管理员列表</b></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24" class="warp-main">
	    <el-form label-width="80px" class="clearfix">
	    	<el-form-item label="真实姓名" class="fl t_input_width">
          <el-input v-model="realName"></el-input>
        </el-form-item>
        <el-form-item label="用户名" class="fl t_input_width">
          <el-input v-model="userName"></el-input>
        </el-form-item>
        <el-form-item class="fl">
          <el-button type="primary">查询</el-button>
        </el-form-item>
	    </el-form>
			<el-button type="primary" class="add_btn" @click="adminAddHandler">+添加管理员</el-button>

	    <!--回复列表-->
      <el-table :data="adminList" border>
        <el-table-column prop="userName" label="用户名" :span="4" align="center" >
        </el-table-column>
        <el-table-column prop="pwd" label="密码" :span="4" align="center" >
        </el-table-column>
        <el-table-column prop="realName" label="真实姓名" :span="4" align="center" >
        </el-table-column>
        <el-table-column prop="registerTime" label="注册时间" :span="4" align="center" >
        </el-table-column>
        <el-table-column prop="handle" label="操作" :span="8" align="center">
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
			
      <!-- 回复弹窗 -->
      <el-dialog :title="!userName1? '添加管理员': '修改管理员'" size="tiny" v-model="adminAddBtn" :close-on-click-modal="true">
        <div class="admin_layout">
          <span>用户名：</span>
          <template>
            <el-input style="width:225px;margin-left:13px;" v-model="userName1" size="small"></el-input>
          </template>
        </div>
        <div class="admin_layout">
          <span>密码：</span>
          <template>
            <el-input style="width:225px;margin-left:27px;" v-model="pwd1" v-if="" size="small"></el-input>
          </template>
        </div>
        <div class="admin_layout">
          <span>真实姓名：</span>
          <template>
            <el-input style="width:225px;" v-model="realName1" size="small"></el-input>
          </template>
        </div>
        <div style="margin-top:30px;">
          <el-button class="btn_" >确定</el-button>
          <el-button type="primary" @click="adminAddBtn = false" style="margin-left:60px;">取消</el-button>
        </div>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script>
	export default {
		data(){
			return {
				realName: '',
				userName: '',
				pwd1: '',
				realName1: '',
				userName1: '',
				adminList: [{
					userName: '某一',
					pwd: '123456',
					realName: '张三',
					registerTime: '2017-04-03'
				},{
					userName: '某二',
					pwd: '123456',
					realName: '李四',
					registerTime: '2017-04-03'
				},{
					userName: '某三',
					pwd: '123456',
					realName: '王五',
					registerTime: '2017-04-03'
				}],
				adminAddBtn: false
			}
		},
		methods: {
			adminAddHandler(){
				this.adminAddBtn = true;
				this.userName1 = '';
				this.pwd1 = '';
				this.realName1 = '';
			},
			handleEdit(index, row){
				this.adminAddBtn = true;
				this.userName1 = row.userName;
				this.pwd1 = row.pwd;
				this.realName1 = row.realName;
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
	.t_input_width{
		width:300px;
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