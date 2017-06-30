<template>
  <el-row class="warp classfy">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>商品基础资料管理</b></el-breadcrumb-item>
        <el-breadcrumb-item>商品分类管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <!--工具条-->
      <el-col class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
          <el-form-item label="分类名称：">
            <el-input v-model="searchClassfyName"></el-input>
          </el-form-item>
          <el-form-item label="上级分类：">
            <el-input v-model="searchParentClassfyName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="search()">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col style="text-align:right;line-height:40px;">
        <el-button type="text" @click="addClassfy()">+添加商品分类</el-button>
      </el-col>

      <!--列表-->
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="itemClassifyName" align="center" label="分类名称"></el-table-column>
          <el-table-column prop="itemPreviousClassify" align="center" label="上级分类"></el-table-column>
          <el-table-column align="center" label="操作">
            <template scope="scope">
              <el-button type="text" v-on:click="changeOneAttr(scope)">修改</el-button>
              <el-button type="text" v-on:click="DELEONE(scope)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-col>
    <el-dialog :title="bindTitle" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="上级分类：" prop="upClass" :label-width="formLabelWidth">
          <el-cascader class="cascader" :props="{value:'label'}" :options="options" :show-all-levels="false" v-model="ruleForm.upClass"change-on-select>
            <el-button slot="append" icon="search"></el-button>
          </el-cascader>
        </el-form-item>
        <el-form-item label="分类名称：" prop="classname" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.classname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item style="text-align:right">
          <el-button type="primary" @click="saveOneAttrs('ruleForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>
</template>
<script>
  export default{
    data(){
      return {
        ruleForm:{
          upClass: [],
          classname: '',
          itemId: null,
        },
        searchClassfyName: '',
        searchParentClassfyName: '',
        // 1是增加，2是修改
        classfyOperaType:1,
        classfyChangeIndex:null,
        options: [],
        dialogFormVisible: false,
        formLabelWidth: '120px',
        bindTitle:null,
        // -----------------------------
        tableData:[],
        rules: {
          upClass: [
            { type: 'array', required: true, message: '请选择上级分类', trigger: 'change' }
          ],
          classname: [
            { required: true, message: '请输入分类名称', trigger: 'blur' }
          ],
        },
        a: [],
        // formLabelWidth: '120px'
        // -----------------------------------
      }
    },
    watch:{

    },
    components:{
      // abc
    },
    created: function () {
      var that = this;
      that.getClassify();
      that.getAllClassify();
    },
    methods: {
      //获取分类列表
      getClassify: function() {
        var that = this;
        that.global.axiosGetReq('/item/showItemClassify').then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.tableData = res.data.data;
            console.log(that.tableData)
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      //获取所有分类列表
      getAllClassify: function() {
        var that = this;
        that.global.axiosGetReq('/item/getAllClassifyAndBrand').then((res) => {
          console.log(res);
          if (res.data.callStatus === 'SUCCEED') {
            that.options = res.data.data.classifyList
            for (var i = 0; i < that.options.length; i++) {
              that.options[i].label = that.options[i].oneClassify
              that.options[i].children = that.options[i].classifyTwoList
              for (var k in that.options[i].children) {
                that.options[i].children[k].label = that.options[i].children[k].classifyTwoName
                that.options[i].children[k].children = that.options[i].children[k].classifyThreeList
                for (var j in that.options[i].children[k].children) {
                  that.options[i].children[k].children[j].label = that.options[i].children[k].children[j].classifyThreeName
                }
              }
            }
            //console.log(that.options);
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      // 添加商品分类
      addClassfy: function () {
        var that = this;
        that.bindTitle = "添加商品分类";
        that.dialogFormVisible = true;
      },
      // 查询分类
      search:function () {
        var that = this;
        // if (that.searchClassfyName == '' && that.searchParentClassfyName == '') {
        //   that.$message.error('请至少选择一项查询类型！');
        //   return false
        // }
        var obj = {
          itemClassifyName: that.searchClassfyName,
          itemPreviousClassify: that.searchParentClassfyName,
        }
        that.global.axiosPostReq('/item/showItemClassify',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.tableData = res.data.data;
            // console.log(that.tableData)
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      DELEONE:function(scope){
        var that = this;
        // console.log(scope.row.itemClassifyId);
        that.$confirm('确定删除该属性吗, 是否继续?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var obj = {
            itemClassifyId: scope.row.itemClassifyId,
          }
          console.log(scope.row.itemClassifyId)
          that.global.axiosPostReq('/item/deleteItemClassify',obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              console.log(res.data);
              that.getClassify();
              that.$message({
                type: 'success',
                message: '删除成功!'
              });
            } else {
              that.$message.error('网络出错，请稍后再试！');
            }
          })
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 修改商品分类
      changeOneAttr: function(scope) {
        var that = this;
        console.log(scope.row);
        that.bindTitle = "修改商品分类";
        that.dialogFormVisible = true;
        that.ruleForm.classname = scope.row.itemClassifyName;
        //that.ruleForm.upClass = scope.row.itemPreviousClassify;
        that.ruleForm.itemId = scope.row.itemClassifyId;
      },
      // 保存商品分类
      saveOneAttrs: function(formName) {
        var that = this;
        that.$refs[formName].validate((valid) => {
          if (valid) {
            var obj = {
              itemClassifyName: that.ruleForm.classname,
              itemPreviousClassify: that.ruleForm.upClass.slice(-1)[0],
            }
            console.log(obj);
            that.global.axiosPostReq('/item/addItemClassify',obj).then((res) => {
              if (res.data.callStatus === 'SUCCEED') {
                that.getClassify();
                that.ruleForm.classname = '';
                that.ruleForm.upClass = [];
                that.dialogFormVisible = false;
                that.$message({
                  type: 'success',
                  message: '添加成功成功!'
                });
                that.tableData = res.data.data;
              } else {
                that.$message.error('网络出错，请稍后再试！');
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
  }
</script>

<style>
.classfy  .el-dialog__footer{
  margin-left: 120px;
  text-align: left;
}
.cascader {
  width: 260px;
}
</style>
