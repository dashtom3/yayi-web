<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>商品基础资料管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品属性管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <!--工具条-->
      <el-col  class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.name" placeholder="请输入属性名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col style="text-align:right;line-height:40px;">
        <el-button type="text" @click="dialogFormVisible = true">+添加商品属性</el-button>
      </el-col>


      <!--列表-->
      <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        width="200px"
        align="center"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="shuxingname"
        align="center"
        label="属性名"
        >
      </el-table-column>
      <el-table-column
        prop="shuxingzhi"
        align="center"
        label="属性值">
        <template scope="scope">
          <span v-for="(one,index) in scope.row.shuxingzhi">
            {{one.name}}
            <span v-if="index!=scope.row.shuxingzhi.length-1">/</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template scope="scope">
        <el-button
          type="text"
          v-on:click="changeOneAttr(scope.$index)"
          >修改</el-button>
        <el-button
          type="text"
          v-on:click="DELEONE(scope.$index)"
          >删除</el-button>
      </template>
      </el-table-column>
    </el-table>
    </el-col>

    <!-- Form -->


    <el-dialog title="添加商品属性" :visible.sync="dialogFormVisible">
      <el-form :model="wantAddAttr" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
        <el-form-item
          prop="addName"
          label="属性名称：">
          <el-input v-model="wantAddAttr.addName"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(value, index) in wantAddAttr.addAttrValues"
          :label="'属性值：'"
          :prop="value.name">
          <el-input v-model="value.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="wantAddAttr.willname"></el-input>
          <el-button v-on:click="addOneAttr(wantAddAttr.willname)">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="addAttrShow" style="windth:80%"  >
        <el-table-column align="center" property="name" label="属性值" >
          <template scope="scope">
            <input type="text" name="" :value="scope.row.name">
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template scope="scope">
          <el-button
          type="text"
            >修改</el-button>
          <el-button
            v-on:click="deleOneAttr(scope.$index)"
            type="text"
            >删除</el-button>
        </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveOneAttrs">保存</el-button>
      </div>
    </el-dialog>
  </el-row>


</template>
<script>
  // import util from '../../../common/util'
  // import {reqGetBookListPage, reqDeleteBook, reqEditBook, reqBatchDeleteBook, reqAddBook} from '../../../api/api';

  export default{
    data(){
      return {
        filters: {
          name: ''
        },
        // -----------------------------
        wantAddAttr:{
          addName:null,
          willname:null,
          addAttrValues:[],
        },
        // wantAddAttrName:null,
        addAttrShow:[],
        gridData:[],
        tableData:[
          {shuxingname:"sdfg",shuxingzhi:[{id:1,name:"1"},{id:1,name:"1"},{id:1,name:"1"}]},
          {shuxingname:"sdfg",shuxingzhi:[{id:1,name:"1"},{id:1,name:"1"},{id:1,name:"1"}]},
          {shuxingname:"sdfg",shuxingzhi:[{id:1,name:"1"},{id:1,name:"1"},{id:1,name:"1"}]},
          {shuxingname:"sdfg",shuxingzhi:[{id:1,name:"1"},{id:1,name:"1"},{id:1,name:"1"}]},
          {shuxingname:"sdfg",shuxingzhi:[{id:1,name:"1"},{id:1,name:"1"},{id:1,name:"1"}]}
        ],
        dialogFormVisible: false,
        // formLabelWidth: '120px'
        // -----------------------------------
      }
    },
    watch:{

    },
    methods: {
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
        this.dialogFormVisible = true;
        this.wantAddAttr.addName = this.tableData[index].shuxingname;
          this.wantAddAttr.addAttrValues=this.tableData[index].shuxingzhi;
          this.addAttrShow = this.tableData[index].shuxingzhi;
      },
      saveOneAttrs:function(){
        var obj={};
        obj.shuxingname = this.wantAddAttr.addName;
        obj.shuxingzhi = this.addAttrShow;
        this.tableData.push(obj);
        this.addAttrShow = [];
        this.wantAddAttr={
          addName:null,
          willname:null,
          addAttrValues:[{index:1,name:""}],
        };
        this.dialogFormVisible  = false;
      },
      deleOneAttr:function(index){
        console.log(index)
         this.addAttrShow.splice(index, 1);
         this.wantAddAttr.addAttrValues.splice(index,1)
      },
      addOneAttr:function(name){
        var aa= {};
        aa.id="1",
        aa.name = name;
        this.wantAddAttr.addAttrValues.push(aa);
        this.addAttrShow.push({id:"1",name:name});
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
