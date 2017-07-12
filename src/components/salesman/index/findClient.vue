<template>
  <div class="findClient">
    <div class="findClientHeadBtn">
      <span @click='changBtn(1)' :class="{sapnActive:nowBtn==true}">已注册，待绑定</span>
      <span @click='changBtn(2)' :class="{sapnActive:nowBtn==false}">未注册</span>
    </div>
    <div class="searchWrap" >
      <input type="text" v-model="searchData" placeholder="输入客户姓名，手机号或单位名称查询">
      <div class="imgWrap" @click="search()">
        <img src="../../../images/salesMan/search.png" alt="">
      </div>
    </div>
    <div class="bindedClient" @click="goToMyClient()">
      <img src="../../../images/salesMan/toRight.png" alt="">
      我已绑定的客户
    </div>
    <div class="clientList">
      <el-table v-if="showBindOrNoBindList" :data="tableData" border style="width: 100%;text-align:center">
        <el-table-column align="center" label="单位名称"  >
          <template scope='scope'>
            <span>{{scope.row.certification.companyName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="单位地址" >
          <template scope='scope'>
            <span>{{scope.row.certification.workAddress}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="trueName"  label="联系人"></el-table-column>
        <el-table-column align="center" prop="phone"  label="联系方式"></el-table-column>
      </el-table>
      <el-table v-else :data="tableData1" border style="width: 100%;text-align:center">
        <el-table-column align="center"  prop="unitName" label="单位名称"  ></el-table-column>
        <el-table-column align="center" prop="unitAddress"  label="单位地址" ></el-table-column>
        <el-table-column align="center" prop="contacts"  label="联系人"></el-table-column>
        <el-table-column align="center" prop="contactsPhone"  label="联系方式"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'findClient',
    data () {
      return {
        showBindOrNoBindList:true,
        nowBtn:1,
        searchData:null,
        tableData1:[],
        tableData:[
          // {companyName:"qwerqew",companyPlace:"fasdfsef",linkMan:"adfaf",phone:"1324141243"},

        ]
      }
    },
    components: {

    },
    created: function() {
      var that = this;
      that.getWaitBindUserList();
    },
    methods: {
      getNoRegistUserList:function(){
        var that =this;
        that.global.axiosPostReq('/findCus/unregistered')
        .then((res) => {
          console.log(res,"")
          if (res.data.callStatus === 'SUCCEED') {
            that.tableData1 = res.data.data;
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      getWaitBindUserList:function(){
        var that =this;
        that.global.axiosPostReq('/findCus/registered')
        .then((res) => {
          console.log(res,"getWaitBindUserList")
          if (res.data.callStatus === 'SUCCEED') {
            that.tableData = res.data.data;
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      changBtn:function(arg){
        var that = this;
        if(arg==1){
          that.nowBtn = true;
          that.getWaitBindUserList();
          that.showBindOrNoBindList = true;
        }else{
          that.nowBtn = false;
          that.getNoRegistUserList();
          that.showBindOrNoBindList = false;
        }
      },
      goToMyClient:function(){
        var that = this;
        that.$emit('msgFromChild', 'goToMyClient' )
      },
      searchUserBySearchConet:function(content){
        var that = this;
        var searchUrl ;
        var obj = {
          state:content
        };
        if(that.nowBtn){
          searchUrl = '/findCus/registered';
        }else{
          searchUrl = '/findCus/unregistered';
        }
        that.global.axiosPostReq(searchUrl, obj)
        .then((res) => {
          console.log(res,"searchUserBySearchConet")
          if (res.data.callStatus === 'SUCCEED') {
            that.tableData = res.data.data;
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      search:function(){
        var that = this;
        // if(that.searchData){
          that.searchUserBySearchConet(that.searchData);
        // }else{
        //   that.$alert('请输入搜索内容',  {confirmButtonText: '确定',});
        // }
      }
    }
  }
</script>

<style scoped>
.findClient{
  width: 1200px;
  margin: auto;
  min-height: 676px;
}
.clientList{
  margin-bottom: 100px;
}
.bindedClient{
  text-align: right;
  color:#5db7e8;
  margin-bottom: 5px;
  margin-top: 5px;
  cursor: pointer;
}
.searchWrap{
  border: 1px solid #5db7e8;
  width: 500px;
  border-radius: 2px;
  margin-top: 30px;
  cursor: pointer;
}
.findClientHeadBtn{
  margin-top: 30px;
}
.findClientHeadBtn span{
display: inline-block;
line-height: 40px;
text-align: center;
padding: 0 10px;
cursor: pointer;
}
.findClientHeadBtn .sapnActive{
  color: white;
  background: #5db7e8;
}
.searchWrap input{
  border: none;
  outline: none;
  line-height: 40px;
  margin-left: 30px;
  width: 400px;
}
.searchWrap .imgWrap{
  display: inline-block;
  float: right;
  width: 46px;
  border-left: 1px solid #5db7e8;
  height: 40px;
}
.searchWrap .imgWrap img{
  margin-top: 8px;
  margin-left: 8px;
}

</style>
