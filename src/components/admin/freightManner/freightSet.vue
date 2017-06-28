<template>
  <div class="freightSet">
    <el-row class="warp">
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item><b>运费管理</b></el-breadcrumb-item>
          <el-breadcrumb-item>运费设置</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
<el-col>
    <el-tabs v-model="activeName2" type="card">
      <el-tab-pane label="自定义邮费" name="first">
        <div class="btnWrap">
          <el-button v-if="tab1_allInputDisable" @click="tab1_changeAllFreight()">修改运费</el-button>
          <el-button type="primary" v-else @click="tab1_saveAllFreight()">保存</el-button>
        </div>
        <el-table  :data="tab1_tableData"  stripe  style="width: 100%">
          <el-table-column  prop="places" align="center"  label="运送到" >
            <template scope="scope">
              <span v-for="place in scope.row.places">{{place}}&nbsp;</span>
              <el-button type="text" v-if="!tab1_allInputDisable" @click="tab1_editThis(scope.$index)">编辑</el-button>
            </template>
          </el-table-column>
          <el-table-column  prop="firstNum" align="center"  label="首件数（件）"  width="200">
            <template scope="scope">
              <el-input v-model="scope.row.firstNum" :disabled="tab1_allInputDisable"></el-input>
            </template>
          </el-table-column>
          <el-table-column  prop="firstPay" align="center"  label="首费（元）"  width="200">
            <template scope="scope">
              <el-input v-model="scope.row.firstPay" :disabled="tab1_allInputDisable"></el-input>
            </template>
          </el-table-column>
          <el-table-column  prop="moreNum" align="center"  label="续件数（件）"  width="200">
            <template scope="scope">
              <el-input v-model="scope.row.firstPay" :disabled="tab1_allInputDisable"></el-input>
            </template>
          </el-table-column>
          <el-table-column  prop="morePay" align="center"  label="续费（元）"  width="200">
            <template scope="scope">
              <el-input v-model="scope.row.firstPay" :disabled="tab1_allInputDisable"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center"   :label="tab1_operaName"  width="200">
            <template scope="scope"  >
              <el-button v-on:click="tab1_delete(scope.$index)" type="text" v-if="!tab1_allInputDisable">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="">
          <el-button v-show="!tab1_allInputDisable" v-on:click="tab1_addOneFreight()" type="text">为指定地区城市添加邮费</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="包邮" name="fourth">
        <el-table  :data="tab2_tableData"  stripe  style="width: 100%">
          <el-table-column  prop="places" align="center"  label="选择地区" >
            <template scope="scope">
              <span v-for="place in scope.row.places">{{place}}&nbsp;</span>
            </template>
          </el-table-column>
          <el-table-column  prop="places" align="center"  width="100">
            <template scope="scope" >
              <el-button v-if="!tab2_allInputDisable" v-on:click="tab2_editThis(scope.$index)" type="text">编辑</el-button>
            </template>
          </el-table-column>
          <el-table-column  prop="firstNum" align="center"  label="设置包邮金额"  width="300">
            <template scope="scope">
              <span>满</span>
              <el-input v-model="scope.row.firstNum" :disabled="tab2_allInputDisable"></el-input>
              <span>元包邮</span>
            </template>
          </el-table-column>
          <el-table-column  prop="firstPay" align="center"  label="状态"  width="200">
            <template scope="scope">
              <!-- <el-input v-model="scope.row.firstPay" :disabled="tab2_allInputDisable"></el-input> -->
              <el-select :disabled="tab2_allInputDisable" v-model="tab2_selectedState" @change="tab2SelectedStateChange()">
                <el-option value="停用">停用</el-option>
                <el-option value="启用">启用</el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column  prop="moreNum" align="center"  label="操作"  width="200">
            <template scope="scope">
              <el-button v-if="tab2_allInputDisable" v-on:click="tab2_change(scope.$index)" >修改</el-button>
              <el-button v-else v-on:click="tab2_save(scope.$index)" >保存</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-col>
  <tableBoard :childrenState="state" v-on:listenChildren="listenChildrenFun"></tableBoard>
  </el-row >
  </div>
</template>
<script>
  import tableBoard from './tableBoard'
  export default {
    name: 'freightSet',
    data () {
      return {
        state:false,
        tab1_allInputDisable:true,
        tab1_editIndex:null,
        tab1_showAddFreightBtn:false,
        tab1_operaName:'',
        tab2_allInputDisable:true,
        tab2_selectedState:"停用",
        tab2_tableData:[
          {places:["未添加地区"],firstNum:0,firstPay:0,moreNum:0,morePay:0}
        ],
        tab1_tableData:[
          {places:["未添加地区"],firstNum:0,firstPay:0,moreNum:0,morePay:0}
        ],
        activeName2: 'first'
      }
    },
    components:{
      tableBoard
    },
    methods: {
      listenChildrenFun:function(data){
        var oldData =  this.tab1_tableData[this.tab1_editIndex].places;
        if(data!="1"){
          this.tab1_tableData[this.tab1_editIndex].places = data;
        }else{
          this.tab1_tableData[this.tab1_editIndex].places = oldData;
        }
        this.state = false;
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      tab1_changeAllFreight:function(){
        this.tab1_allInputDisable = false;
        this.tab1_operaName = "操作";
      },
      tab1_saveAllFreight:function(){
        this.tab1_allInputDisable = true;
        this.tab1_operaName = "";
      },
      tab1_addOneFreight:function(){
        var obj = {places:["未添加地区"],firstNum:0,firstPay:0,moreNum:0,morePay:0};
        this.tab1_tableData.push(obj);
      },
      tab1_delete:function(index){
        console.log(index)
        this.tab1_tableData.splice(index,)
      },
      tab1_editThis:function(index){
        console.log(index)
        this.state = true;
        this.tab1_editIndex = index;
      },
      tab2_change:function(){
        this.tab2_allInputDisable = false;
      },
      tab2_editThis:function(index){
        console.log(index)
      },
      tab2_save:function(index){
        console.log(index)
        this.tab2_allInputDisable = true;
      },
      tab2SelectedStateChange:function(){
        console.log(this.tab2_selectedState)
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btnWrap{
  text-align: right;
  padding: 10px 0;
}
.warp .warp-breadcrum{
  margin-bottom: 10px;
}

</style>
<style>
.freightSet .el-input{
  width: 100px;
  padding-right: 0;
}
</style>
