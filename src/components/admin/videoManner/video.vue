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
      <el-table-column prop="video_id" label="视频" :span="12" align="center">
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
    					 
    <el-dialog :title="!isEdit? '添加视频':'修改视频'" style="width:860px;margin:auto;" v-model="videoVisible" :close-on-click-modal="false">
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
		    	<el-input v-model="video_link" class="fl" style="width:200px;padding-right:20px;"></el-input>
		      <el-upload
					  class="upload-demo"
					  ref="upload"
					  action="https://jsonplaceholder.typicode.com/posts/"
					  :on-preview="handlePreview"
					  :on-remove="handleRemove"
					  :file-list="fileList"
					  :auto-upload="false">
					  <el-button slot="trigger" type="primary">选择</el-button>
					</el-upload>
					</el-upload>
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
				videoList: [{
					video_id: 'xxxxxxx'
				}],
				videoVisible: false,
				input_video: '',
				video_link: '',
				radio: '1',
				isEdit: false,
				fileList: [{name: 'food.mp4', url: ''}]
			}
		},
		methods: {
			videoAddHandler(){
				this.videoVisible = true;
				this.isEdit = false;
				this.input_video = '';
			},
			handleEdit(index, row){
				this.videoVisible = true;
				this.isEdit = true;
				this.input_video = row.video_id;
			},
			handleDel(index, row){
				this.$confirm('确定删除吗？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
			},
			handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
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
  color: red;
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
  margin-left: 92px;
}
.add_btn{
	float:right;
	margin: 20px 118px 20px 0;
}
</style>