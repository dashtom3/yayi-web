<template>
  <div class="bindSale">
    <div class="content">
      <el-form v-if="!saleData.saleId" ref="userData" :model="saleData" label-width="80px">
        <el-form-item label="销售员ID：" label-width="100px">
          <el-input v-model="willBindSale"></el-input>
          <div v-show="showSearchInfo" class="showSearchInfoClass">
            <span>真实姓名：上海小酱</span>
            <span>手机号：12345678912</span>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">绑定</el-button>
        </el-form-item>
      </el-form>
      <div v-else class="binded">
        <p>
          <span class="left">销售员ID：</span>
          <span class="right">{{saleData.saleId}}</span>
        </p>
        <p>
          <span class="left">真实姓名：</span>
          <span class="right">{{saleData.saleName}}</span>
        </p>
        <p>
          <span class="left">手机号：</span>
          <span class="right">{{saleData.salePhone}}</span>
        </p>
        <p class="colorRed">
          <span class="left">温馨提示：</span>
          <span class="right ">若想重新绑定销售员，可联系客服021-66065505。</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'bindSale',
    data () {
      return {
        willBindSale:null,
        showSearchInfo:false,
        saleData:{
          saleId:1324567890,
          salePhone:12345678912,
          saleName:"上海小酱"
        }
      }
    },
    watch:{
      willBindSale:function(){
        if(this.willBindSale.length>=6){
          this.showSearchInfo = true;
        }else{
          this.showSearchInfo = false;
        }
      }
    },
    methods:{

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bindSale{

}
.content{
/*margin-top: 62px;*/
margin-left: 44px;
/*margin-right: 50px;*/
width: 970px;
}
.showSearchInfoClass{
  color: #5db7e8;
  line-height: 50px;
}
.showSearchInfoClass span:nth-child(2){
  margin-left: 50px;
}
.colorRed{
  color:#D81E06;
}
.binded p .left{
  display: inline-block;
  width: 71px;
  text-align: right;
  margin-top: 30px;
}
.binded p:nth-child(2) , .binded p:nth-child(3){
  color: #5db7e8;
}
.binded p:last-child{
  margin-bottom : 170px;
}
</style>
<style>
.bindSale .el-button--primary{
  display: block;
  margin: auto;
  background-color: #5db7e8;
  border-color: #5db7e8;
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
