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
      <el-table :data="replayLists" border>
        <el-table-column label="sku代码" :span="3" align="center">
          <template scope="scope" >
            <span>{{scope.row.itemSKU}}</span>
          </template> 
        </el-table-column>
        <el-table-column label="商品名称+属性" width="170" align="center" >
          <template scope="scope">
            <span>{{scope.row.itemName}}</span>
            <span>{{scope.row.itemPropertyNamea}}</span>
            <span>{{scope.row.itemPropertyNameb}}</span>
            <span>{{scope.row.itemPropertyNamec}}</span>
          </template>
        </el-table-column>
        <el-table-column label="评论内容" :span="3" align="center">
          <template scope="scope">
            <span>{{scope.row.commentContent}}</span>
          </template>
        </el-table-column>
        <el-table-column label="评分" width="70" align="center">
          <template scope="scope">
            <span>{{scope.row.commentGrade}}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单编号" width="170" align="center" >
          <template scope="scope">
            <span>{{scope.row.orderId}}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户名" width="170" align="center" >
          <template scope="scope">
            <span>{{scope.row.userName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="回复状态" :span="3" align="center" >
          <template scope="scope">
            <span v-if="scope.row.recoveryState == '0'">未回复</span>
            <span v-if="scope.row.recoveryState == '1'">已回复</span>
          </template>  
        </el-table-column>
        <el-table-column label="回复内容" :span="3" align="center" >
          <template scope="scope">
            <span>{{scope.row.replyContent}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" :span="3" align="center" >
          <template scope="scope">
            <el-button
              size="small"
              type="info"
              @click="handleReplay(scope.$index, scope.row)" v-show="scope.row.recoveryState == '0'">回复</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="position:absolute;top:650px;right:0;" v-show="this.totalCount > this.pagesize">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pagesize"
          layout="prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>
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
	export default {
		data(){
			return {
				orderCode: "",
				userCode: "",
        //默认每页数据量
        pagesize: 10,
        //当前页码
        currentPage: 1,
        //默认数据总数
        totalCount: 1,
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
        value: '',
        //回复列表
        replayList: [],
        replayBtn: false,
        replayText: '',
        orderId: '',
        itemId: '',
        replayLists: []
			}
		},
    created(){
      this.queryHandler()
    },
		methods: {
      handleCurrentChange(val) {
        this.currentPage = val 
        this.queryHandler(val)
      },
      queryHandler(val){
        if (val == undefined || typeof(val) == 'object') {
          this.currentPage = 1
        } else {
          this.currentPage = val
        }
        let params = {
          orderId: this.orderCode,
          phone: this.userCode,
          recoveryState: this.value,
          currentPage: this.currentPage,
          numberPerpage: this.pagesize
        }
        console.log(params)
        global.axiosPostReq('/commentManage/show',params).then((res) => {
          if (res.data.callStatus === 'SUCCEED') { 
            this.replayList = res.data.data
            this.totalCount = res.data.totalNumber
            console.log(res.data.data)
            for(var i=0;i<res.data.data.length;i++){
              for(var j=0;j<res.data.data[i].orderitemList.length;j++){
                this.replayLists.push({
                  itemSKU: res.data.data[i].orderitemList[j].itemSKU,
                  itemName: res.data.data[i].orderitemList[j].itemName,
                  itemPropertyNamea: res.data.data[i].orderitemList[j].itemPropertyNamea,
                  itemPropertyNameb: res.data.data[i].orderitemList[j].itemPropertyNameb,
                  itemPropertyNamec: res.data.data[i].orderitemList[j].itemPropertyNamec,
                  commentContent: res.data.data[i].orderitemList[j].commentList.commentContent,
                  commentGrade: res.data.data[i].orderitemList[j].commentList.commentGrade,
                  orderId: res.data.data[i].orderId,
                  itemId: res.data.data[i].orderitemList[j].commentList.itemId,
                  userName: res.data.data[i].orderitemList[j].commentList.userName,
                  recoveryState: res.data.data[i].orderitemList[j].commentList.recoveryState,
                  replyContent: res.data.data[i].orderitemList[j].commentList.replyContent,
                })
              }
            }
            console.log(this.replayLists)
          }else{
            this.$message.error('网络出错，请稍后再试！');
          }
        })
      },
			handleReplay(index, row){
        console.log(index, row)
        this.orderId = row.orderId;
        this.itemId = row.sku;
				this.replayBtn = true;
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