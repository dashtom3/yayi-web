<template>
	<el-row class="warp">
		<el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>优惠码设置</b></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col class="warp-main">
	    <el-form :inline="true" class="clearfix">
				<el-form-item label="优惠码名称" class="t_input_width">
	        <el-input v-model="couponName"></el-input>
	      </el-form-item>
	      <el-form-item label="是否有效">
          <el-select v-model="isValid" placeholder="请选择">
            <el-option  v-for="item in valids"  :key="item.value"  :label="item.label"  :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryHandler">查询</el-button>
        </el-form-item>
        <el-button type="primary" class="add_btn" @click="addHandler">新增优惠码</el-button>
	    </el-form>  
	  </el-col>
	  <!--列表-->
    <el-table :data="couponList" border>
      <el-table-column prop="benefitName" label="优惠码名称" align="center">
      </el-table-column>
      <el-table-column prop="benefitQb" label="可兑换乾币数" align="center">
      </el-table-column>
      <el-table-column prop="benefitNum" label="优惠码总数" align="center">
      </el-table-column>
      <el-table-column prop="benefitValueNum" label="未兑换数量" align="center">
      </el-table-column>
      <el-table-column prop="updated" label="有效期" align="center">
      	<template scope="scope">
          <span>{{new Date(scope.row.updated).getFullYear()+'-'+ fillZero(new Date(scope.row.updated).getMonth()+1)+'-'+fillZero(new Date(scope.row.updated).getDate())+' '+fillZero(new Date(scope.row.updated).getHours())+":"+fillZero(new Date(scope.row.updated).getMinutes())+":"+fillZero(new Date(scope.row.updated).getSeconds())}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="enable" label="是否有效" align="center">
      	<template scope="scope">
          <span v-if='scope.row.enable === 1'>是</span>
          <span v-else-if='scope.row.enable === 2'>否</span>
        </template>
      </el-table-column>
      <el-table-column prop="created" label="创建日期" align="center">
      	<template scope="scope">
      		<span>{{new Date(scope.row.created).getFullYear()+'-'+ fillZero(new Date(scope.row.created).getMonth()+1)+'-'+fillZero(new Date(scope.row.created).getDate())+' '+fillZero(new Date(scope.row.created).getHours())+":"+fillZero(new Date(scope.row.created).getMinutes())+":"+fillZero(new Date(scope.row.created).getSeconds())}}</span>
      	</template>
      </el-table-column>
      <el-table-column prop="handle" label="操作" align="center">
        <template scope="scope">
          <el-button
            size="small"
            type="info"
            @click="handleView(scope.$index, scope.row)">查看</el-button>
            <el-button
            size="small"
            @click="handleDownLoad(scope.$index, scope.row)">下载</el-button>
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

    <!-- 新增优惠码 -->		 
    <el-dialog title="添加优惠码" size="tiny" v-model="couponVisible" :close-on-click-modal="true">
	    <ul class="coupon_wrap">
		    <li class="clearfix">
		    	<span class="fl"><span class="fr" style="padding-left:20px;"><i class="i_col_red">*</i>优惠码名称：</span></span>
		      <el-input v-model="coupon_name" class="fl" style="width:200px;"></el-input>
		    </li>
		    <li class="clearfix">
		    	<span class="fl"><span class="fr" style="padding-left:6px;"><i class="i_col_red">*</i>可兑换乾币数：</span></span>
		      <el-input v-model="benefit_qb" class="fl" style="width:200px;"></el-input>
		    </li>
		    <li class="clearfix">
		    	<span class="fl"><span class="fr" style="padding-left:20px;"><i class="i_col_red">*</i>优惠码总数：</span></span>
		      <el-input v-model="benefit_num" class="fl" style="width:200px;"></el-input>
		    </li>
		    <li class="clearfix">
		    	<span class="fl"><span class="fr" style="padding-left:48px;"><i class="i_col_red">*</i>有效期：</span></span>
		      <el-input v-model="benefit_updated" class="fl" style="width:200px;"></el-input>
		    </li>
		  </ul>
	    <div style="margin-top:30px;">
	      <el-button class="btn_" type="primary" @click="saveHandler()">确定</el-button>
	      <el-button class="btn_" @click="couponVisible=false">取消</el-button>
	    </div>
    </el-dialog>

    <!-- 查看详情 -->		 
    <el-dialog title="优惠码详情" size="small" v-model="couponDetail" :close-on-click-modal="true">
	    <ul class="coupon_detail">
		    <li class="clearfix">
		    	<span class="fl"><span class="fr" style="padding-left:20px;">优惠码名称：</span></span>
		      <span></span>
		    </li>
		    <li class="clearfix">
		    	<span class="fl"><span class="fr" style="padding-left:6px;">可兑换乾币数：</span></span>
		      <span></span>
		    </li>
		    <li class="clearfix">
		    	<span class="fl"><span class="fr" style="padding-left:20px;">优惠码总数：</span></span>
		      <span></span>
		    </li>
		    <li class="clearfix">
		    	<span class="fl"><span class="fr" style="padding-left:20px;">未兑换数量：</span></span>
		      <span></span>
		    </li>
		    <li class="clearfix">
		    	<span class="fl"><span class="fr" style="padding-left:48px;">有效期：</span></span>
		      <span></span>
		    </li>
		  </ul>
		  <el-table :data="couponList" border>
      <el-table-column prop="couponName" label="优惠码" align="center">
      </el-table-column>
      <el-table-column prop="exchangeableNo" label="是否已兑换" align="center">
      </el-table-column>
      <el-table-column prop="couponTotal" label="兑换时间" align="center">
      </el-table-column>
      <el-table-column prop="canExchangeableNo" label="兑换人" align="center">
      </el-table-column>
    </el-table>
	    <div style="margin-top:30px;text-align:center;">
	      <el-button @click="couponDetail=false">关闭</el-button>
	    </div>
    </el-dialog>
	</el-row>
</template>

<script>
	export default {
		data(){
			return {
				//默认每页数据量
        pagesize: 10,
        //当前页码
        currentPage: 1,
        //默认数据总数
        totalCount: 1,
				couponName: '',
				isValid:'3',
				valids: [
					{value: '3',label: '全部'},
          {value: '1',label: '是'},
          {value: '2',label: '否'}
				],
				couponList: [],
				couponVisible: false,
				couponDetail: false,
				coupon_name: '',
				benefit_qb: '',
				benefit_num: 0,
				benefit_updated: ''
			}
		},
		created(){
			this.queryHandler()
		},
		methods: {
			fillZero(n){
        return n<10 ? '0'+ n: n 
      },
			handleCurrentChange(val) {
        this.currentPage = val 
        this.queryHandler(val)
      },
      saveHandler(){
      	var that = this
				var params = {
					benefitName: this.coupon_name,
					benefitQb: this.benefit_qb,
					benefitNum: this.benefit_num,
					updated: this.benefit_updated
				}
				that.global.axiosGetReq('/benefit/add',params).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
          }
        })
      },
			queryHandler(val){
				var that = this
				if (val == undefined || typeof(val) == 'object') {
          this.currentPage = 1
        } else {
          this.currentPage = val
        }
				var params = {
					benefitName: this.couponName,
					enable: this.isValid,
					currentPage: this.currentPage,
          numberPerPage: this.pagesize
				}
				that.global.axiosGetReq('/benefit/list',params).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            this.couponList = res.data.data
            this.totalCount = res.data.totalNumber
          }
        })
			},
			addHandler(){
				
				this.couponVisible = true
			},
			handleView(){
				this.couponDetail = true
			},
			handleDownLoad(){

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
	.t_input_width{
		width:300px;
	}
	.add_btn{
		float:right;
		margin: 40px 118px 20px 0;
	}
	.i_col_red{
	  color: red;
	  font-style: normal;
	}
	.coupon_wrap li{
		height: 50px;
		line-height: 50px;
	}
	.coupon_detail{
		margin-bottom: 20px;
	}
	.coupon_detail li{
		height: 30px;
		line-height: 30px;
	}
	.btn_{
		margin-left: 80px;
	}
</style>