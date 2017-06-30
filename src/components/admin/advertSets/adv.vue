<template>
	<el-row class="warp">
		<el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>广告设置</b></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <!--广告设置列表-->
    <el-table :data="advertList" border>
		  <el-table-column prop="advId" label="序号" width="80" align="center" >
		  </el-table-column>
      <el-table-column prop="advName" label="名称" :span="4" align="center">
      </el-table-column>
      <el-table-column prop="advImg" label="图片" :span="4" align="center">
      	<template scope="scope">
      		<img :src="scope.row.advImg" alt="该图片无法显示" style="width:100px;" align="center">
      	</template>
      </el-table-column>
      <el-table-column prop="advUrl" label="链接" width="300" align="center">
      </el-table-column>
      <el-table-column prop="advType" label="类型" :span="4" align="center">
      </el-table-column>
      <el-table-column prop="handle" label="操作" :span="4" align="center">
        <template scope="scope">
          <el-button
            size="small"
            type="info"
            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改设置 -->
    <el-dialog title="修改广告" size="tiny" v-model="advertVisible" :close-on-click-modal="true">
	    <ul class="adv_wrap">
	    	<li class="clearfix">
		    	<span class="fl span_nav"><span class="fr"><i class="i_col_red">*</i>序号：</span></span>
		      <span>{{advNo}}</span>
		    </li>
		    <li class="clearfix">
		    	<span class="fl span_nav"><span class="fr"><i class="i_col_red">*</i>类型：</span></span>
		      <span>{{advertType}}</span>
		    </li>
		    <li class="clearfix">
		    	<span class="fl span_nav"><span class="fr"><i class="i_col_red">*</i>广告名称：</span></span>
		      <el-input v-model="input_adv" class="fl" style="width:230px;"></el-input>
		    </li>
		    <li class="clearfix">
		    	<span class="fl span_nav"><span class="fr"><i class="i_col_red">*</i>广告图：</span></span>
		      <el-upload
					  class="upload-demo fl"
					  :action="qiNiuUrl"
					  :on-preview="handlePreview"
					  :on-success="uploadFile"
					  :file-list="fileList"
					  :data="qiNiuToken"
					  list-type="picture">
					  <el-button size="small" type="primary">选择</el-button>
					</el-upload>

					<!-- <el-upload
            :on-success="uploadFile"
            :action="qiNiuUrl"
            class="avatar-uploader"
            :show-file-list="false"
            :data="qiNiuToken">
            <el-button size="small" type="primary">选择</el-button>
            <img v-if="img_src" :src="img_src" class="avatar">
          </el-upload> -->
		    </li>
	    	<li class="clearfix">
		    	<span class="fl span_nav"><span class="fr"><i class="i_col_red">*</i>链接：</span></span>
		      <el-input v-model="img_src" class="fl" style="width:230px;"></el-input>
		    </li>
		  </ul>
	    <div style="margin-top:30px;">
	      <el-button class="btn_" type="primary" @click="saveBtn">保存</el-button>
	    </div>
    </el-dialog>
	</el-row>
</template>

<script>
	import global from '../../global/global' 
	export default {
		data(){
			return {
				// advertList: [],
				advertList:[{
					advId: 1,
					advName: '登录注册页',
					advImg: 'http://orl5769dk.bkt.clouddn.com/FsORTf3JFh3QU2OaJN2pV_bHnUFo',
					advUrl: 'http://orl5769dk.bkt.clouddn.com/FsORTf3JFh3QU2OaJN2pV_bHnUFo',
					advType: '登录注册页'
				},{
					advId: 2,
					advName: '首页轮播',
					advImg: 'http://orl5769dk.bkt.clouddn.com/FsORTf3JFh3QU2OaJN2pV_bHnUFo',
					advUrl: 'http://orl5769dk.bkt.clouddn.com/FsORTf3JFh3QU2OaJN2pV_bHnUFo',
					advType: '首页轮播'
				},{
					advId: 3,
					advName: '首页轮播',
					advImg: 'http://orl5769dk.bkt.clouddn.com/FsORTf3JFh3QU2OaJN2pV_bHnUFo',
					advUrl: 'http://orl5769dk.bkt.clouddn.com/FsORTf3JFh3QU2OaJN2pV_bHnUFo',
					advType: '首页轮播'
				},{
					advId: 4,
					advName: '首页轮播',
					advImg: 'http://orl5769dk.bkt.clouddn.com/FsORTf3JFh3QU2OaJN2pV_bHnUFo',
					advUrl: 'http://orl5769dk.bkt.clouddn.com/FsORTf3JFh3QU2OaJN2pV_bHnUFo',
					advType: '首页轮播'
				},{
					advId: 5,
					advName: '首页轮播',
					advImg: 'http://orl5769dk.bkt.clouddn.com/FsORTf3JFh3QU2OaJN2pV_bHnUFo',
					advUrl: 'http://orl5769dk.bkt.clouddn.com/FsORTf3JFh3QU2OaJN2pV_bHnUFo',
					advType: '首页轮播'
				}],
				qiNiuToken: null,
        qiNiuUrl: global.qiNiuUrl,
				advertVisible: false,
				input_adv: '',
				img_src: '',
				advNo: '',
				advertType: '',
				fileList: [{name: '', url: ''}]
			}
		},
    created(){
    	this.init();
      //获取七牛token
      global.axiosGetReq('/file/getUpToken', null).then((res) => {
        if (res.data.callStatus === 'SUCCEED') { 
          this.qiNiuToken = {
            token: res.data.msg
          }
        }
      })
    },
		methods : {
			init(){
				global.axiosGetReq('/adv/showAdv',{}).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            this.advertList = res.data.data || this.advertList
            this.img_src = res.data.data.advImg;
          }else{
            this.$message.error('获取广告数据失败！');
          }
        })
			},
			handleEdit(index, row){
				this.advertVisible = true;
				this.advNo = row.advId;
				this.advertType = row.advType;
				this.input_adv = row.advName;
				this.img_src = row.advUrl;
				this.fileList[0].url = this.img_src;
			},
      handlePreview(file) {
        // clearFiles();
      },
      uploadFile(res, file) {
        this.advUrl = global.qiniuShUrl + file.response.key
        this.img_src = global.qiniuShUrl + file.response.key
        this.fileList = [];
        this.fileList.push({
        	name: '',
        	url: this.img_src
        })
      },
      saveBtn(){
      	let params = {
      		advImg: this.img_src,
      		advName: this.input_adv,
      		advUrl: this.img_src,
      		advType: this.advertType,
      		advId: this.advNo 
      	}
      	//保存广告设置
        global.axiosPostReq('/adv/updateAdv', params).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.init();
          }else{
            this.$message.error('修改失败！');
          }
          this.advertVisible = false;
        })


      }
		}
	}
</script>

<style scoped>
.el-table th>.cell{
  text-align: center;
}
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
.margin_l_30{
  margin-left: 30px;
}
.t_input_width{
	width:340px;
}
.adv_wrap li{
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