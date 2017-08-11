<template>
	<el-row class="warp">
		<el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>视频管理</b></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-button type="primary" class="add_btn" @click="videoAddHandler">+添加视频</el-button>

    <!--视频列表-->
    <el-table :data="videoList" border>
      <el-table-column prop="vidName" label="视频" :span="8" align="center">
      </el-table-column>
      <el-table-column prop="vidRoute" label="链接" :span="8" align="center">
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

    <!-- 添加视频 -->
    					 
    <el-dialog :title="!isEdit? '添加视频':'修改视频'" size="tiny" v-model="videoVisible" :close-on-click-modal="true">
	    <ul class="video_wrap">
		    <li class="clearfix">
		    	<span class="fl span_nav"><span class="fr"><i class="i_col_red">*</i>视频名称：</span></span>
		      <el-input v-model="input_video" class="fl" style="width:200px;"></el-input>
		    </li>
		    <li class="clearfix">
		    	<span class="fl span_nav"><span class="fr"><i class="i_col_red">*</i>上传方式：</span></span>
		      <el-radio class="radio" v-model="radio" label="1">本地上传</el-radio>
  				<el-radio class="radio" v-model="radio" label="2">输入外部视频网址</el-radio>
		    </li>
		    <li class="clearfix" style="padding-left:92px;padding-bottom:20px;">
		    	<el-input v-model="video_link" class="fl" style="width:200px;padding-right:20px;" :placeholder="ifPlaceHolderShow"></el-input>
		      <el-upload
					  class="upload-demo"
					  :action="qiNiuUrl"
					  :on-success="uploadFile"
					  :data="qiNiuToken"
					  :file-list="fileList">
					  <el-button slot="trigger" type="primary" v-if="radio==='1'" >选择</el-button>
					</el-upload>
		    </li>
		  </ul>
    <div style="margin-top:30px;">
      <el-button class="btn_" type="primary" @click="saveVideo">保存</el-button>
      <el-button class="btn_" @click="cancelVideo">取消</el-button>
    </div>
    </el-dialog>
  </el-row>
</template>

<script>
	import global from '../../global/global'
	export default {
		data(){
			return {
				videoList: [],
				qiNiuToken: null,
        qiNiuUrl: global.qiNiuUrl,
				videoVisible: false,
				radio: '1',
				viId: '',
				input_video: '',
				video_link: '',
				isEdit: false,
				fileList: [],
				ifPlaceHolder: ''
			}
		},
		created(){
      //获取七牛token
      global.axiosGetReq('/file/getUpToken', null).then((res) => {
        if (res.data.callStatus === 'SUCCEED') { 
          this.qiNiuToken = {
            token: res.data.msg
          }
        }
      })
      this.queryHandler();
    },
		computed: {
			ifPlaceHolderShow: function(){
				return this.radio === '1' ? this.ifPlaceHolder = '' : this.ifPlaceHolder = '请输入视频地址'
			}
		},
		methods: {
			queryHandler(){
				global.axiosPostReq('/vid/showVid',{}).then((res) => {
          if (res.data.callStatus === 'SUCCEED') { 
            this.videoList = res.data.data
          }else{
            this.$message.error('查询失败！');
          }
        })
			},
			videoAddHandler(){
				this.videoVisible = true;
				this.isEdit = false;
				this.input_video = '';
				this.video_link = '';
				this.fileList = [];
			},
			uploadFile(res, file) {
        this.video_link = global.qiniuShUrl + file.response.key
        this.fileList = [];
        this.fileList.push({
        	name: this.video_link,
        	url: this.video_link
        })
      },
      cancelVideo(){
      	this.videoVisible = false;
      },
      validate(){
      	if(!this.input_video){
      		this.$message.error('请填写视频名称！');
          return false;
      	}
      	if(!this.video_link){
      		this.$message.error('请完成视频上传！');
          return false;
      	}
      },
			saveVideo(){
				if(!this.isEdit){
					let params = {
						vidName: this.input_video,
						videoType: this.radio,
						vidRoute: this.video_link
					}
					this.validate();
	        global.axiosPostReq('/vid/insertVid',params).then((res) => {
	          if (res.data.callStatus === 'SUCCEED') { 
	            this.$message({
	              message: '添加成功',
	              type: 'success'
	            });
	            this.fileList = [];
	            this.videoVisible = false;
	            this.queryHandler();
	          }else{
	            this.$message.error('添加失败！');
	          }
	        })
	        
				}else{
					let params = {
						viId: this.viId,
						vidName: this.input_video,
						vidType: this.radio,
						vidRoute: this.video_link
					}
					this.validate();
	        global.axiosPostReq('/vid/updateVid',params).then((res) => {
	          if (res.data.callStatus === 'SUCCEED') { 
	            this.$message({
	              message: '修改成功',
	              type: 'success'
	            });
	            this.fileList = [];
	            this.videoVisible = false;
	            this.queryHandler();
	          }else{
	            this.$message.error('修改失败！');
	          }
	        })
	        
				}
				
			},
			handleEdit(index, row){
				this.videoVisible = true;
				this.isEdit = true;
				this.input_video = row.vidName;
				this.radio = row.videoType;
				this.video_link = row.vidRoute,
				this.viId = row.viId
			},
			handleDel(index, row){
				this.$confirm('确定删除吗？')
          .then(_ => {
            let params = {
							viId: row.viId
						}
		        global.axiosPostReq('/vid/deleteVid',params).then((res) => {
		          if (res.data.callStatus === 'SUCCEED') { 
		            this.$message({
		              message: '删除成功',
		              type: 'success'
		            });
		            this.queryHandler();
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
.fr{
	float:right;
}
.clearfix{
	zoom:1;
}
.clearfix:after{
	content:"";
	clear:both;
	display:block;
}
.i_col_red{
  color: #cb1700;
  font-style: normal;
}
.video_wrap li{
	height: 40px;
	line-height: 40px;
}
.span_nav{
	display: inline-block;
	width: 84px;
	padding-right: 6px;
}
.btn_{
	width: 80px;
  margin-left: 92px;
}
.add_btn{
	float:right;
	margin: 20px 118px 20px 0;
}
</style>