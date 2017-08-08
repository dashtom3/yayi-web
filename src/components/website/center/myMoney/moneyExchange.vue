<template>
	<div class="benefitWrap">
		<div class="benefitpbox">
			<span class="benefitp">优惠码： </span>
			<el-input v-model="benefitCode" placeholder="请输入优惠码" class="benefitCode"></el-input>
			<i class="i_color_red">该优惠码已失效</i>
		</div>
		<div>
			<span class="moneyNo">可获得乾币数： </span>
			<span class="moneyPos">{{finalyMoney}}</span>
		</div>
		<button class="btnBox">兑换</button>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				benefitCode: '',
				finalyMoney: 0,
			}
		},
		created(){
			this.getMoneyListFn()
		},
		methods: {
			getMoneyListFn(){
				var that = this
				var obj = {
	        token:that.global.getToken()
	      };
	      that.global.axiosGetReq('/userMyQb/query', obj).then((res) => {
	        if (res.data.callStatus === 'SUCCEED') {
	          
	          console.log(res.data,'i')
	          
	        }
	      })
			}
		}
	}
</script>

<style scoped>
  .moneyPos{
  	padding-left: 12px;
  	color: red;
  }
	.i_color_red{
		font-weight: normal;
		color: red;
		font-style: normal;
		margin-left: 20px;
	}
	.btnBox{
		margin-top: 44px;
		margin-left: 120px;
		width: 100px;
		height: 38px;
		border-radius: 4px;
		color: #fff;
		background: #005aab;
	}
  .moneyNo{
  	padding-left: 11px;
  }
  .benefitpbox{
  	margin-bottom: 20px;
  }
  .benefitWrap{
  	padding: 35px 20px;
  	font-size: 14px;
  	width: 600px;
  	margin: 0 auto;
  }
	.benefitCode{
		width: 300px;
	}
	.benefitp{
		padding-left: 52px;
		padding-right: 7px;
	}
</style>