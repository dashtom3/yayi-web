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
        <el-table  :data="tab1_tableData"  stripe  style="width: 100%">
          <el-table-column  prop="postCity" align="center"  label="运送到" >
            <template scope="scope">
              <span>{{scope.row.postCity}}</span>
              <el-button type="text" v-if="scope.row.changeState" @click="tab1_editThis(scope.$index,scope.row)">编辑</el-button>
            </template>
          </el-table-column>
          <el-table-column  prop="firstNum" align="center"  label="首件数（件）"  width="200">
            <template scope="scope">
              <el-input v-model="scope.row.firstNum" :disabled="!scope.row.changeState"></el-input>
            </template>
          </el-table-column>
          <el-table-column  prop="firstMoney" align="center"  label="首费（元/kg）"  width="200">
            <template scope="scope">
              <el-input v-model="scope.row.firstMoney" :disabled="!scope.row.changeState"></el-input>
            </template>
          </el-table-column>
          <el-table-column  prop="addNum" align="center"  label="续件数（件）"  width="200">
            <template scope="scope">
              <el-input v-model="scope.row.addNum" :disabled="!scope.row.changeState"></el-input>
            </template>
          </el-table-column>
          <el-table-column  prop="addMoney" align="center"  label="续费（元）"  width="200">
            <template scope="scope">
              <el-input v-model="scope.row.addMoney" :disabled="!scope.row.changeState"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="changeState"   width="200">
            <template scope="scope"  >
              <!-- <span>{{!scope.row.changeState}}</span> -->
              <el-button v-if="scope.row.changeState==false" v-on:click="tab1_changeOne(scope.$index)" type="text">修改</el-button>
              <el-button v-else v-on:click="tab1_saveOne(scope.$index,scope.row)" type="text">保存</el-button>
              <el-button v-on:click="tab1_delete(scope.$index,scope.row)" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="">
          <el-button v-show="!tab1_allInputDisable" v-on:click="tab1_addOneFreight()" type="text">为指定地区城市添加邮费</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="包邮" name="fourth">
        <el-table  :data="tab2_tableData"  stripe  style="width: 100%">
          <el-table-column  prop="postCity" align="center"  label="选择地区" >
            <template scope="scope">
              <span>{{scope.row.postCity}}</span>
            </template>
          </el-table-column>
          <el-table-column  prop="postCity" align="center"  width="100">
            <template scope="scope" >
              <el-button v-if="!tab2_allInputDisable" v-on:click="tab2_editThis(scope.$index)" type="text">编辑</el-button>
            </template>
          </el-table-column>
          <el-table-column  prop="firstNum" align="center"  label="设置包邮金额"  width="300">
            <template scope="scope">
              <span>满</span>
              <el-input v-model="scope.row.freeShippingMoney" :disabled="tab2_allInputDisable"></el-input>
              <span>元包邮</span>
            </template>
          </el-table-column>
          <el-table-column  prop="state" align="center"  label="状态"  width="200">
            <template scope="scope">
              <el-select :disabled="tab2_allInputDisable" v-model="scope.row.state">
                <el-option value="停用" name="停用">停用</el-option>
                <el-option value="启用" name="启用">启用</el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column  prop="addNum" align="center"  label="操作"  width="200">
            <template scope="scope">
              <el-button v-if="tab2_allInputDisable" v-on:click="tab2_change(scope.$index)" >修改</el-button>
              <el-button v-else v-on:click="tab2_save(scope.$index,scope.row)" >保存</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-col>
  <tableBoard :defaultSelectedCity="palceSelected" :childrenState="state" v-on:listenChildren="listenChildrenFun"></tableBoard>
  </el-row >
  </div>
</template>
<script>
  import tableBoard from './tableBoard'
  export default {
    name: 'freightSet',
    data () {
      return {
        palceSelected:null,
        state:false,
        tab1_allInputDisable:false,
        tab1_editIndex:null,
        tab1_showAddFreightBtn:false,
        tab1_operaName:'',
        tab2_allInputDisable:true,
        tab2_selectedState:"停用",
        tab2_tableData:[
          // {postCity:["未添加地区"],freeShippingMoney:12,state:1}
        ],
        tab1_tableData:[
          // {postCity:["未添加地区"],firstNum:1,firstMoney:0,addNum:0,addMoney:0,changeState:false}
        ],
        activeName2: 'first'
      }
    },
    components:{
      tableBoard
    },
    created:function(){
      var that = this;
      that.getSelfFreightList();
      that.getFreeFreightList();
    },
    methods: {
      getSelfFreightList:function(){
        var that = this;
        that.global.axiosPostReq('/freightManage/showFreeShipp')
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.tab2_tableData = res.data.data;
            if(that.tab2_tableData[0].state==1){
              that.tab2_tableData[0].state =  "启用";
            }else{
              that.tab2_tableData[0].state =  "停用";
            }
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      getFreeFreightList:function(){
        //自定义
        var that = this;
        that.global.axiosPostReq('/freightManage/show')
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.tab1_tableData = res.data.data;
            for(let i in that.tab1_tableData){
              that.tab1_tableData[i].changeState = false;
            }
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      listenChildrenFun:function(data){
        var that = this;
        if(data!="1"){
          if(that.selectPlaceStale == 1){
            // 自定义
            // that.tab1_tableData[that.tab1_editIndex].postCity = "";
            var str = data.join(",");
            // for(let i in data){
            //   that.tab1_tableData[that.tab1_editIndex].postCity.push(data[i]);
            // }
            that.tab1_tableData[that.tab1_editIndex].postCity = str;
          }else if(that.selectPlaceStale == 2){
            // 包邮
            var str = data.join(",");
            // that.tab2_tableData[0].postCity = [];
            // for(let i in data){
              // that.tab2_tableData[0].postCity.push(data[i]);
            // }
            that.tab2_tableData[0].postCity = str;
          }
        }
        this.state = false;
      },
      handleClick(tab, event) {
      },
      tab1_saveOne:function(index,one){
        var that = this;
        var obj = {};
        var str = null;
        if(one.firstNum<0){
          str = "请填写首件数！";
        }else{
          obj.firstNum =one.firstNum.toString();
        }
        if(one.firstMoney<0){
          str = "请填写首件数！";
        }else{
          obj.firstMoney =one.firstMoney.toString();
        }
        if(one.addNum<0){
          str = "请填写续件！";
        }else{
          obj.addNum =one.addNum.toString();
        }
        if(one.addMoney<0){
          str = "请填写续费！";
        }else{
          obj.addMoney = one.addMoney.toString();
        }
        if(one.postCity[0]=="未添加地区"){
          str = "请选择地区！";
        }else{
          obj.postCity = one.postCity;
        }
        if(str){
          this.$alert(str, {confirmButtonText: '确定'});
        }else{
          if(one.postFeeId){
            obj.postFeeId=one.postFeeId;
            that.global.axiosPostReq('/freightManage/customFreight',obj)
            .then((res) => {
              if (res.data.callStatus === 'SUCCEED') {
                var data = that.tab1_tableData[index];
                data.changeState = false;
                that.tab1_tableData.splice(index,1,data);
              }
            })
          }else{
            that.global.axiosPostReq('/freightManage//addCustomFreight',obj)
            .then((res) => {
              if (res.data.callStatus === 'SUCCEED') {
                that.tab1_tableData[index].changeState = false;
                that.getFreeFreightList();
              }
            })
          }

        }
      },
      tab1_changeOne:function(index){
        var that = this;
        var obj = that.tab1_tableData[index];
        obj.changeState = true;
        that.tab1_tableData.splice(index,1,obj);
      },
      tab1_addOneFreight:function(){
        var obj = {postCity:["未添加地区"],firstNum:1,firstMoney:0,addNum:0,addMoney:0,changeState:true};
        this.tab1_tableData.push(obj);
      },
      tab1_delete:function(index,one){
        var that = this;
        that.$confirm('此操作将删除该自定义邮费, 是否继续?', '提示', {  confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'
        }).then(() => {
          if(one.postFeeId){
            var obj = {
              postFeeId:one.postFeeId
            };
            that.global.axiosPostReq('/freightManage/deleteCustomFreight',obj)
            .then((res) => {
              if (res.data.callStatus === 'SUCCEED') {
                that.tab1_tableData.splice(index,1);
                that.$message({type: 'success',message: '删除成功!'});
              } else {
                that.$message.error('网络出错，请稍后再试！');
              }
            })
          }
        }).catch(() => {
        });
      },
      tab1_editThis:function(index,row){
        var that = this;
        that.selectPlaceStale = 1;
        that.state = true;
        that.tab1_editIndex = index;
        var data = that.tab1_tableData[index].postCity;
        data = data.split(",");
        that.palceSelected = data;
      },
      tab2_change:function(){
        this.tab2_allInputDisable = false;
      },
      tab2_editThis:function(index){
        var that = this;
        that.selectPlaceStale = 2;
        that.state = true;
        var data = that.tab2_tableData[index].postCity;
        data = data.split(",");
        that.palceSelected = data;
      },
      tab2_save:function(index,one){
        var that = this;
        that.tab2_allInputDisable = true;
        var obj = {};
        var str = null;
        obj.freePostId = one.freePostId;
        if(one.freeShippingMoney>=0){
          obj.freeShippingMoney = one.freeShippingMoney.toString();
        }else{
          str = "请填写包邮金额！";
        }
        if(one.state=="启用"){
          obj.state = "1";
        }else{
          obj.state = "2";
        }
        if(one.postCity[0]=="未添加地区 "){
          str = "请填写包邮地区！";
        }else{
          obj.postCity = one.postCity;
        }
        if(str){
          that.$alert(str, {confirmButtonText: '确定'});
        }else{
          that.global.axiosPostReq('/freightManage/updateFreeShipp',obj)
          .then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
            } else {
              that.$message.error('网络出错，请稍后再试！');
            }
          })
        }
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
