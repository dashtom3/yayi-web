<template>
  <div class="bindSale">
    <div class="content">
      <el-form v-if="!saleData.saleId" ref="userData" :model="saleData" label-width="80px">
        <el-form-item label="销售员ID:">
          <el-input  v-model="saleData.saleId"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">绑定</el-button>
        </el-form-item>
      </el-form>
      <div v-else class="binded">
        <p>销售员ID:1324567890</p>
        <p class="colorRed">温馨提示：若想重新绑定销售员，可联系客服021-66065505.</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'bindSale',
    data () {
      return {
        saleData:{
          saleId:null
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
margin-top: 62px;
margin-left: 44px;
/*margin-right: 50px;*/
width: 970px;
}
.colorRed{
  color:#D81E06;
}
.binded p:nth-child(2){
  margin-top: 30px;
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
</style>
