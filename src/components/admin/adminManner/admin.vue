<template>
  <el-row class="warp" v-if="accountP">
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
          <el-button type="primary" @click="queryHandler">查询</el-button>
        </el-form-item>
	    </el-form>
			<el-button type="primary" class="add_btn" @click="adminAddHandler">+添加管理员</el-button>

	    <!--回复列表-->
      <el-table :data="adminList" border>
        <el-table-column prop="phone" label="用户名" :span="4" align="center" >
        </el-table-column>
        <el-table-column prop="adminstratorPwd" label="密码" :span="4" align="center" >
        </el-table-column>
        <el-table-column prop="trueName" label="真实姓名" :span="4" align="center" >
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
      <el-dialog :title="!isEdit? '添加管理员': '修改管理员'" size="tiny" v-model="adminAddBtn" :close-on-click-modal="true">
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
          <el-button class="btn_" @click="addOkHandler">确定</el-button>
          <el-button type="primary" @click="adminAddBtn = false" style="margin-left:60px;">取消</el-button>
        </div>
      </el-dialog>
    </el-col>
  </el-row>
   <el-row class="warp" v-else>
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>管理员列表</b></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <div>权限不足</div>
  </el-row>
</template>

<script>
	import global from '../../global/global'
	export default {
		data(){
			return {
				realName: '',
				userName: '',
				pwd1: '',
				realName1: '',
				userName1: '',
				adminList: [],
				adminAddBtn: false,
				adminstratorId: '',
				isEdit: false,
				accountP: false,
			}
		},
        //*******导航钩子*********//
        beforeRouteEnter (to, from, next) {
          // 通过 `vm` 访问组件实例
          next(vm => {
            var that = vm;
          })
        },
		created(){
			var that = this
            console.log(window.sessionStorage.getItem('accountType'),'ioioio')
            let accountType = window.sessionStorage.getItem('accountType')
            if( accountType == 2 ){
              that.accountP = true
            } else {
              that.accountP = false
            }
			that.queryHandler()
		},
		methods: {
			queryHandler(){
				let params = {
					phone: this.userName,
					trueName: this.realName
				}
				
        global.axiosPostReq('/adminstrator/query',params).then((res) => {
          if (res.data.callStatus === 'SUCCEED') { 
            this.adminList = res.data.data
          }else{
            this.$message.error('查询评论失败！');
          }
        })
			},
			adminAddHandler(){
				this.adminAddBtn = true;
				this.userName1 = '';
				this.pwd1 = '';
				this.realName1 = '';
				this.isEdit = false;
			},
			addOkHandler(){
				//添加管理员
				if(!this.isEdit){
					let params = {
						phone: this.userName1,
						adminstratorPwd: this.pwd1,
						trueName: this.realName1
					}
	        global.axiosPostReq('/adminstrator/add',params).then((res) => {
	          if (res.data.callStatus === 'SUCCEED') { 
	            this.$message({
	              message: '添加成功',
	              type: 'success'
	            });
	            this.adminAddBtn = false
	            this.queryHandler()
	          }else{
	            this.$message.error('添加失败！');
	          }
	        })
				}else if(this.isEdit){//修改管理员
					let params = {
						adminstratorId: this.adminstratorId,
						phone: this.userName1,
						adminstratorPwd: this.pwd1,
						trueName: this.realName1
					}
	        global.axiosPostReq('/adminstrator/update',params).then((res) => {
	          if (res.data.callStatus === 'SUCCEED') { 
	            this.$message({
	              message: '修改成功',
	              type: 'success'
	            });
	            this.adminAddBtn = false
	            this.queryHandler()
	          }else{
	            this.$message.error('修改失败！');
	          }
	        })
				}
				
			},
			handleEdit(index, row){
				this.adminAddBtn = true;
				this.userName1 = row.phone;
				this.pwd1 = row.adminstratorPwd;
				this.realName1 = row.trueName;
				this.adminstratorId = row.adminstratorId;
				this.isEdit = true
			},
			handleDel(index, row){
				this.$confirm('确定删除吗？')
          .then(_ => {
            let params = {
							adminstratorId: row.adminstratorId,
						}
		        global.axiosPostReq('/adminstrator/delete',params).then((res) => {
		          if (res.data.callStatus === 'SUCCEED') { 
		            this.$message({
		              message: '删除成功',
		              type: 'success'
		            });
		            this.queryHandler()
		          }else{
		            this.$message.error('删除失败！');
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