<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>交易管理</b></el-breadcrumb-item>
        <el-breadcrumb-item>评价管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col class="warp-main">
	    <el-form label-width="80px" class="clearfix">
	    	<el-form-item label="订单编号" class="fl t_input_width">
          <el-input v-model="orderCode"></el-input>
        </el-form-item>
        <el-form-item label="用户编号" class="fl t_input_width">
          <el-input v-model="userCode"></el-input>
        </el-form-item>
        <el-form-item label="回复状态" class="fl">
          <el-select v-model="value" placeholder="全部" class="t_select_width">
				    <el-option
				      v-for="item in replayStat"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
        </el-form-item>
        <el-form-item class="fl">
          <el-button type="primary">查询</el-button>
        </el-form-item>
	    </el-form>

	    <!--回复列表-->
      <el-table :data="replayList" style="width：3000px;text-align:center;" border>
        <el-table-column prop="SKUCode" label="sku代码" width="120" >
        </el-table-column>
        <el-table-column prop="goodsInfo" label="商品名称+属性" width="140" >
        </el-table-column>
        <el-table-column prop="comment" label="评论内容" width="140" >
        </el-table-column>
        <el-table-column prop="deuce" label="评分" width="120" >
        </el-table-column>
        <el-table-column prop="orderCode" label="订单编号" width="160" >
        </el-table-column>
        <el-table-column prop="userCode" label="用户编号" min-width="120" >
        </el-table-column>
        <el-table-column prop="replayStat" label="回复状态" min-width="80" >
          <template scope="scope">
            <span v-if="scope.row.replayStat == '1'">已回复</span>
            <span v-if="scope.row.replayStat == '2'">未回复</span>
          </template>  
        </el-table-column>
        <el-table-column prop="replayInfo" label="回复内容" min-width="120" >
        </el-table-column>
        <el-table-column prop="handle" label="操作" min-width="180" >
          <template scope="scope">
            <el-button
              size="mini"
              type="info"
              @click="handleReplay(scope.$index, scope.row)">回复</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 回复弹窗 -->
      <el-dialog title="回复评价" style="width:860px;margin:auto;" v-model="replayBtn" :close-on-click-modal="false">
        <el-input
				  type="textarea"
				  :rows="4"
				  placeholder="请输入内容"
				  v-model="replayText">
				</el-input>
        <div style="margin-top:30px;">
          <el-button class="btn_" @click="replayOkHandler">确定</el-button>
          <el-button class="btn_" type="primary" @click="replayBtn = false">取消</el-button>
        </div>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script>
	export default {
		data(){
			return {
				orderCode: "",
				userCode: "",
				replayStat: [{
          value: '0',
          label: '全部'
        },{
          value: '1',
          label: '已回复'
        }, {
          value: '2',
          label: '未回复'
        }],
        value: '',
        //回复列表
        replayList: [{
        	SKUCode: 'xxxxx',
        	goodsInfo: '商品名称+属性',
        	comment: '6666666',
        	deuce: 5,
        	orderCode: 'FJDKS64236764',
        	userCode: 'FIOPOP753287',
        	replayInfo: '',
        	replayStat: 2
        },{
        	SKUCode: 'xxxxx',
        	goodsInfo: '商品名称+属性',
        	comment: '6666666',
        	deuce: 5,
        	orderCode: 'FJDKS64236764',
        	userCode: 'FIOPOP753287',
        	replayInfo: '',
        	replayStat: 2
        },{
        	SKUCode: 'xxxxx',
        	goodsInfo: '商品名称+属性',
        	comment: '6666666',
        	deuce: 5,
        	orderCode: 'FJDKS64236764',
        	userCode: 'FIOPOP753287',
        	replayInfo: '我回复完了',
        	replayStat: 1
        }],
        replayBtn: false,
        replayText: ''
			}
		},
		methods: {
			handleReplay(){
				this.replayBtn = true;
			},
			replayOkHandler(){
				this.replayBtn = false;
			}
		}
	}
</script>

<style>
.el-table th>.cell{
  text-align: center;
}
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
	width:340px;
}
.t_select_width{
	width:260px;
}
.btn_{
  margin-left: 120px;
}
.btn_box{
  width: 260px;
  margin: 20px auto;
}
._btn{
  width: 120px;
}
</style>