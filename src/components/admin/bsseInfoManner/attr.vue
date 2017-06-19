<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>商品基础资料管理</b></el-breadcrumb-item>
        <el-breadcrumb-item>商品属性管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <!--工具条-->
      <el-col  class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" >
          <el-form-item>
            <el-input v-model="searchAttrName" placeholder="请输入属性名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="search()">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col style="text-align:right;line-height:40px;">
        <el-button type="text" @click="addGoodAttr()">+添加商品属性</el-button>
      </el-col>


      <!--列表-->
      <el-table  :data="tableData"  border  style="width: 100%">
        <el-table-column  type="index"  width="200px"  align="center"label="序号"></el-table-column>
        <el-table-column  prop="shuxingname"  align="center"  label="属性名"></el-table-column>
        <el-table-column  prop="shuxingzhi" align="center"  label="属性值">
          <template scope="scope">
            <span v-for="(one,index) in scope.row.shuxingzhi">
              {{one.name}}
              <span v-if="index!=scope.row.shuxingzhi.length-1">/</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column  align="center"  label="操作">
          <template scope="scope">
            <el-button  type="text"  v-on:click="changeOneAttr(scope.$index)"  >修改</el-button>
            <el-button  type="text"  v-on:click="DELEONE(scope.$index)"  >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <el-dialog title="添加商品属性" :visible.sync="showAddGoodAttr">
      <el-form label-width="100px" class="demo-dynamic">
        <el-form-item  prop="addName"  label="属性名称：">
          <el-input v-model="addGoodAttrName"></el-input>
        </el-form-item>
        <span v-if="addGoodAttrValues.length>=1">
          <el-form-item  v-for="(value, index) in addGoodAttrValues"  :label="'属性值：'"  :property="value.name">
            <el-input v-model="value.name"></el-input>
          </el-form-item>
        </span>
        <el-form-item>
          <el-input v-model="addGoodAttrOneVal"></el-input>
          <el-button v-on:click="addOneAttrVal()">添加</el-button>
        </el-form-item>
      </el-form>

      <el-table border :data="addGoodAttrValues" style="windth:80%"  >
        <el-table-column align="center" property="name" label="属性值" >
          <template scope="scope">
            <el-input @blur="changThisAttrVal(scope.$index,$event)" :disabled="scope.$index!=changeThisAll" :value="scope.row.name"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template scope="scope">
            <el-button  type="text"  v-on:click="changeThisAttr(scope.$index)">修改</el-button>
            <el-button  v-on:click="deleOneAttrVal(scope.$index)"  type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveOneAttrs()">保存</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>
<script>

  export default{
    data(){
      return {
        addGoodAttrName:null,
        addGoodAttrValues:[],
        addGoodAttrOneVal:null,
        searchAttrName:null,
        changeThisAll:null,
        changAttrIndex:null,
        // 1是增加，2是修改
        attOperaType:1,
        wantAddAttr:{
          addName:null,
          willname:null,
          addAttrValues:[],
        },
        addAttrShow:[],
        tableData:[
          {shuxingname:"sdfg",shuxingzhi:[{id:1,name:"1"},{id:1,name:"1"},{id:1,name:"1"}]},
          {shuxingname:"sdfg",shuxingzhi:[{id:1,name:"1"},{id:1,name:"1"},{id:1,name:"1"}]},
          {shuxingname:"sdfg",shuxingzhi:[{id:1,name:"1"},{id:1,name:"1"},{id:1,name:"1"}]},
          {shuxingname:"sdfg",shuxingzhi:[{id:1,name:"1"},{id:1,name:"1"},{id:1,name:"1"}]},
          {shuxingname:"sdfg",shuxingzhi:[{id:1,name:"1"},{id:1,name:"1"},{id:1,name:"1"}]}
        ],
        showAddGoodAttr: false,
      }
    },
    methods: {
      addGoodAttr:function(){
        this.showAddGoodAttr = true;
        this.attOperaType = 1;
        this.addGoodAttrName = null;
        this.addGoodAttrValues = [];
      },
      changThisAttrVal:function(index,e){
        this.changeThisAll = null;
        this.addGoodAttrValues[index].name = e.target._value;
      },
      changeThisAttr:function(index){
        this.changeThisAll = index;
      },
      search:function(){
        this.filters.name;
      },
      DELEONE:function(index){
        this.$confirm('确定删除该属性吗, 是否继续?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.tableData.splice(index,1);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      changeOneAttr:function(index){
        this.addGoodAttrName = this.tableData[index].shuxingname;
        this.addGoodAttrValues = this.tableData[index].shuxingzhi;
        this.changAttrIndex = index;
        this.attOperaType = 2;
        this.showAddGoodAttr = true;
      },
      saveOneAttrs:function(){
        if(this.attOperaType==1){
          var obj={};
          obj.shuxingname = this.addGoodAttrName;
          obj.shuxingzhi = this.addGoodAttrValues;
          this.tableData.push(obj);
          this.addGoodAttrValues = [];
          this.addGoodAttrName= null;
        }
        if(this.attOperaType==2){
          this.tableData[this.changAttrIndex].shuxingname = this.addGoodAttrName;
          this.tableData[this.changAttrIndex].shuxingzhi = this.addGoodAttrValues;
        }
        this.showAddGoodAttr  = false;
      },
      deleOneAttrVal:function(index){
        this.addGoodAttrValues.splice(index, 1);
        this.changeThisAll = null;
      },
      addOneAttrVal:function(){
        var aa= {};
        aa.id="1",
        aa.name = this.addGoodAttrOneVal;
        this.addGoodAttrValues.push(aa);
        this.addGoodAttrOneVal = null;
      },
      // -----------------------------
    },
  }
</script>

<style>
  .demo-table-expand label {
    font-weight: bold;

  }
  .warp  .warp-main .el-input{
    width: 100%;
    padding-right: 0px;
  }
  .warp .el-input{
    width: 70%;
    padding-right: 20px;
  }
</style>
