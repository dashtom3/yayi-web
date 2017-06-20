<template>
	<el-row class="warp">
		<el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>首页广告设置</b></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <!--广告设置列表-->
    <el-table :data="advertList" border>
		  <el-table-column prop="index" label="序号" width="80" align="center" >
		  </el-table-column>
      <el-table-column prop="advName" label="名称" :span="4" align="center">
      </el-table-column>
      <el-table-column prop="advImg" label="图片" :span="4" align="center">
      	<template scope="scope">
      		<img src="../../../images/center/order.png" alt="该图片无法显示" style="width:100px;" align="center">
      	</template>
      </el-table-column>
      <el-table-column prop="advSrc" label="链接" width="300" align="center">
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
					  action="https://jsonplaceholder.typicode.com/posts/"
					  :on-preview="handlePreview"
					  :on-remove="handleRemove"
					  :file-list="fileList2"
					  list-type="picture">
					  <el-button size="small" type="primary">选择</el-button>
					</el-upload>
		    </li>
	    	<li class="clearfix">
		    	<span class="fl span_nav"><span class="fr"><i class="i_col_red">*</i>链接：</span></span>
		      <el-input v-model="img_src" class="fl" style="width:230px;"></el-input>
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
				advertList:[{
					index: 1,
					advName: 'xxxxxxx',
					advImg: 'xxxxxxx',
					advSrc: 'xxxxxxxxxxx',
					advType: '登录注册页'
				},{
					index: 2,
					advName: 'xxxxxxx',
					advImg: 'xxxxxxx',
					advSrc: 'xxxxxxxxxxx',
					advType: '首页轮播'
				},{
					index: 3,
					advName: 'xxxxxxx',
					advImg: 'xxxxxxx',
					advSrc: 'xxxxxxxxxxx',
					advType: '首页轮播'
				},{
					index: 4,
					advName: 'xxxxxxx',
					advImg: 'xxxxxxx',
					advSrc: 'xxxxxxxxxxx',
					advType: '首页轮播'
				},{
					index: 5,
					advName: 'xxxxxxx',
					advImg: 'xxxxxxx',
					advSrc: 'xxxxxxxxxxx',
					advType: '首页轮播'
				}],
				advertVisible: false,
				input_adv: '',
				img_src: '',
				advNo: '',
				advertType: '',
				fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
			}
		},
		methods : {
			handleEdit(index, row){
				this.advertVisible = true;
				this.advNo = row.index;
				this.advertType = row.advType;
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
</style>