<template>
	<div class="benefitWrap">
		<div class="benefitpbox">
			<span class="benefitp">优惠码： </span>
			<el-input v-model="benefitCode" placeholder="请输入优惠码" class="benefitCode"></el-input>
			<transition name="shake">
        <i class="i_color_red" v-show="error">{{errMsg}}</i>
      </transition>
		</div>
		<!-- <div>
			<span class="moneyNo">可获得乾币数： </span>
			<span class="moneyPos">{{finalyMoney}}</span>
		</div> -->
		<button class="btnBox" @click="exchangeHandler">兑换</button>
	</div>
</template>

<script>
import Bus from '../../../global/bus.js'
	export default{
		data(){
			return {
				benefitCode: '',
				finalyMoney: 0,
				errMsg: '',
				error: false
			}
		},
		watch: {
			benefitCode: function(){
				this.error = false
			},
		},
		methods: {
			//兑换乾币
			exchangeHandler(){
				var that = this
				var obj = {
	        benefitCode: this.benefitCode
	      };

	      //验证优惠码不能未空
	      if(this.benefitCode === ''){
	      	this.errMsg = "请输入优惠码"
	      	this.error = true
	      	return false
	      }

	      that.global.axiosGetReq('/benefit/use', obj).then((res) => {
	        if (res.data.callStatus === 'SUCCEED') {
	        	this.$message({
              message: '您已成功兑换'+ res.data.num +'乾币',
              type: 'success'
            });
	        Bus.$emit('getTarget', 'succeedChange');
            this.benefitCode = ''
	        }else if(res.data.callStatus === 'FAILED'){
	        	this.errMsg = res.data.msg
	        	this.error = true
	        }
	      })
			}
		}
	}
</script>

<style scoped>
  .moneyPos{
  	padding-left: 12px;
  	color: #cb1700;
  }
	.i_color_red{
		font-weight: normal;
		color: #cb1700;
		font-style: normal;
		margin-left: 20px;
	}
	.btnBox{
		margin: 44px 312px 0;
		width: 100px;
		height: 38px;
		border-radius: 4px;
		color: #fff;
		background: #005aab;
		cursor: pointer;
	}
  .moneyNo{
  	padding-left: 11px;
  }
  .benefitpbox{
  	width: 600px;
  	margin: 0 auto;
  	margin-bottom: 20px;
  }
  .benefitWrap{
  	padding: 35px 20px;
  	font-size: 14px;
  	width: 866px;
  	border: 1px solid #eee;
  	margin: 40px auto;
  }
	.benefitCode{
		width: 300px;
	}
	.benefitp{
		padding-left: 52px;
		padding-right: 7px;
	}
</style>