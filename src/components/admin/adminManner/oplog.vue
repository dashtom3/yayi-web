<template>
	<el-row class="warp">
		<el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>操作日志</b></el-breadcrumb-item>
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
        <el-input v-model="trueName" class="fl t_input_w"></el-input>
        <el-form-item label="操作内容" class="fl t_input_width">
          <el-input v-model="optContent"></el-input>
        </el-form-item>
        <el-form-item class="fl">
          <el-button type="primary">查询</el-button>
        </el-form-item>
	    </el-form>
    </el-col>

    <!--回复列表-->
    <el-table :data="optList" border :default-sort = "{prop: 'optTime', order: 'descending'}">
      <el-table-column prop="trueName" label="真实姓名" :span="6" align="center" >
      </el-table-column>
      <el-table-column prop="mobile" label="手机号" :span="6" align="center" >
      </el-table-column>
      <el-table-column prop="optContent" label="操作内容" :span="6" align="center" >
      </el-table-column>
      <el-table-column prop="optTime" label="操作时间" sortable :span="6" align="center" >
      </el-table-column>
    </el-table>
	</el-row>
</template>

<script>
  export default {
    data() {
      return {
        optSelect: [{
          value: '1',
          label: '手机号'
        }, {
          value: '2',
          label: '真实姓名'
        }],
        value: '1',
        trueName: '',
        optContent: '',
        optList: [{
        	trueName: '小小',
        	mobile: '110',
        	optContent: '开车',
        	optTime: '2017-01-01'
        },{
        	trueName: '小小',
        	mobile: '110',
        	optContent: '开车',
        	optTime: '2017-01-02'
        }]
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
		width:260px;
	}
	.t_input_width{
		width:340px;
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