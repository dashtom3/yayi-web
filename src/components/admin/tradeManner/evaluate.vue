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
        <el-form-item label="用户名" class="fl t_input_width">
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
          <el-button type="primary" @click="queryHandler">查询</el-button>
        </el-form-item>
	    </el-form>

	    <!--回复列表-->
      <el-table :data="replayList" border>
        <el-table-column prop="sku" label="sku代码" :span="3" align="center">
        </el-table-column>
        <el-table-column prop="nameAddAttribute" label="商品名称+属性" width="170" align="center" >
        </el-table-column>
        <el-table-column prop="commentContent" label="评论内容" :span="3" align="center" >
        </el-table-column>
        <el-table-column prop="score" label="评分" width="70" align="center" >
        </el-table-column>
        <el-table-column prop="OrderId" label="订单编号" width="170" align="center" >
        </el-table-column>
        <el-table-column prop="userId" label="用户名" width="170" align="center" >
        </el-table-column>
        <el-table-column prop="recoveryState" label="回复状态" :span="3" align="center" >
          <template scope="scope">
            <span v-if="scope.row.recoveryState == '0'">未回复</span>
            <span v-if="scope.row.recoveryState == '1'">已回复</span>
          </template>  
        </el-table-column>
        <el-table-column prop="replayInfo" label="回复内容" :span="3" align="center" >
        </el-table-column>
        <el-table-column prop="handle" label="操作" :span="3" align="center" >
          <template scope="scope">
            <el-button
              size="small"
              type="info"
              @click="handleReplay(scope.$index, scope.row)" v-show="scope.row.recoveryState == '0'">回复</el-button>
          </template>
        </el-table-column>
      </el-table>

      <paging :childmsg="pageProps" style="text-align:center;margin-top:20px;" @childSay="pageHandler"></paging>

      <!-- 回复弹窗 -->
      <el-dialog title="回复评价" size="tiny" v-model="replayBtn" :close-on-click-modal="true">
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
  import global from '../../global/global'
  import paging from '../../website/brandLib/paging0'
	export default {
		data(){
			return {
				orderCode: "",
				userCode: "",
				replayStat: [{
          value: '',
          label: '全部'
        },{
          value: '0',
          label: '未回复'
        },{
          value: '1',
          label: '已回复'
        }],
        pageProps: {
          pageNum: 1,
          totalPage: 1
        },
        value: '',
        //回复列表
        replayList: [],
        replayBtn: false,
        replayText: '',
        orderId: '',
        itemId: ''
			}
		},
    components: {
      paging
    },
    created(){
      this.queryHandler()
    },
		methods: {
      queryHandler(){
        let params = {
          orderId: this.orderCode,
          phone: this.userCode,
          recoveryState: this.value,
          currentPage: this.pageProps.pageNum,
          numberPerPage: 10,
        }
        console.log(params)
        global.axiosPostReq('/commentManage/show',params).then((res) => {
          if (res.data.callStatus === 'SUCCEED') { 
            this.replayList = res.data.data
            this.pageProps.totalPage = res.data.totalPage
            console.log(res.data.data)
          }else{
            this.$message.error('查询评论失败！');
          }
        })
      },
			handleReplay(index, row){
        console.log(index, row)
        this.orderId = row.OrderId;
        this.itemId = row.sku;
				this.replayBtn = true;
			},
      pageHandler(data){
        this.pageProps.pageNum = data
        this.queryHandler();
      },
			replayOkHandler(){
        let params = {
          orderId: this.orderId,
          itemId: this.itemId,
          data: this.replayText,
          recoveryState: '1'
        }
        console.log(params)
        global.axiosPostReq('/commentManage/reply',params).then((res) => {
          if (res.data.callStatus === 'SUCCEED') { 
            this.replayBtn = false;
            this.queryHandler()
          }else{
            this.$message.error('回复评论失败！');
          }
        })

				this.replayBtn = false;
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
.t_select_width{
	width:220px;
}
.btn_{
  margin-left: 140px;
}
.btn_box{
  width: 260px;
  margin: 20px auto;
}
._btn{
  width: 120px;
}
</style>