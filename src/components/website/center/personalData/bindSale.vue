<template>
  <div class="bindSale">
    <div class="content">
      <el-row v-if="!saleData.saleName">
        <el-col>
          <div class="searchWrap">
            <span>客服代表手机号：</span>
            <input class="inputClass" v-model="willBindSale" />
          </div>
          <div v-show="showSearchInfo" class="showSearchInfoClass">
            <span style="padding-left:14px;">真实姓名：{{findSaleName}}</span>
          </div>
          <div v-show="noSearchSale" class="showSearchInfoClass">
            <span style="color:#cb1700;padding-left:14px;">非常抱歉，未找到该客服代表</span>
          </div>
        </el-col>
        <el-col>
          <el-button type="primary" @click="bindHandler" class="btnPos" :disabled="!showSearchInfo">绑定</el-button>
        </el-col>
      </el-row>
      <div v-else class="binded">
        <p>
          <span class="left">客服代表手机号：</span>
          <span class="right">{{saleData.salePhone}}</span>
        </p>
        <p>
          <span class="left">真实姓名：</span>
          <span class="right">{{saleData.saleName}}</span>
        </p>
        <p class="colorRed">
          <span class="left">温馨提示：</span>
          <span class="right ">若想重新绑定客服代表，可联系客服400-001-4980。</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import global from '../../../global/global'
  export default {
    name: 'bindSale',
    data () {
      return {
        noSearchSale: false,
        showSearchInfo: false,
        willBindSale:null,
        findSaleName: '',
        saleData:{
          salePhone:'',
          saleName:''
        }
      }
    },
    watch: {
      willBindSale: function(){
        if(this.willBindSale.length === 11){
          if(this.isPhone(this.willBindSale)){
            this.validateHandler()
          }else {
            this.showSearchInfo = false
            this.noSearchSale = true
          }
        }else if(!this.willBindSale.length){
          this.showSearchInfo = false
          this.noSearchSale = false
        }
      }
    },
    created(){
      this.queryHandler()
    },
    methods:{
      // 检查字符串是否为合法手机号码
      isPhone(str) {
        var reg = /^(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/;
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }
      },
      //查询是否绑定
      queryHandler(){
        let params = {
          token: global.getToken()
        }
        global.axiosGetReq('/userPersonalInfo/queryBind',params).then((res) => {
          if(res.data.callStatus === 'SUCCEED'){
            this.saleData = res.data.data
          }
        })
      },
      //绑定客服代表
      bindHandler(){
        let params = {
          salePhone: this.willBindSale,
          userPhone: global.getUser().phone,
          token: global.getToken()
        }
        //验证手机号码
        if(!this.isPhone(this.willBindSale)){
          this.noSearchSale = true
          this.showSearchInfo = false
          return false
        }
        global.axiosPostReq('/userManageList/bind',params).then((res) => {
          if(res.data.callStatus === 'SUCCEED'){
            this.$message({
              message: '绑定成功',
              type: 'success'
            });
            this.queryHandler()
          } else {
            this.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      validateHandler(){
        let params = {
          salePhone: this.willBindSale,
          state: 2,
          token: global.getToken()
        }
        global.axiosGetReq('/userPersonalInfo/queryBind',params).then((res) => {
          if(res.data.callStatus === 'SUCCEED'){
            if(res.data.data){
              this.findSaleName = res.data.data.true_name || '未知'
              this.showSearchInfo = true
              this.noSearchSale = false
            }else{
              this.noSearchSale = true
              this.showSearchInfo = false
            }
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
    color: #bfcbd9!important;
    cursor: not-allowed!important;
    background-image: none!important;
    background-color: #eef1f6!important;
    border-color: #d1dbe5!important;
  }
</style>
<style scoped>
.searchWrap{
  margin-top:20px;
  height: 30px;
  color: #333;
}
.inputClass{
  width: 300px;
  height: 34px;
  line-height: 34px;
  padding-left: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline:none;
}
.bindSale{
  height: 550px;
}
.btnPos{
  color:#fff;
  position:absolute;
  top:100px;
  left:350px;
}
.content{
  margin-left: 42px;
  width: 970px;
  color: #005aab;
}
.showSearchInfoClass{
  color: #005aab;
  line-height: 50px;
  padding-left: 110px;
}
.showSearchInfoClass span:nth-child(2){
  margin-left: 50px;
}
.binded p .left{
  display: inline-block;
  margin-top: 30px;
}
.binded p:last-child{
  margin-bottom : 170px;
}
.colorRed{
  color:#cb1700;
}
</style>
<style>
.bindSale .el-button--primary{
  display: block;
  margin: auto;
  background-color: #005aab;
  border-color: #005aab;
  width: 160px;
  line-height: 42px;
  margin-top: 20px;
  padding: 0;
}
.bindSale .el-form-item{
  width: 985px;
}
.bindSale form{
  margin-top: 62px;
}
</style>
