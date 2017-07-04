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
        <el-table-column  prop="itemPropertyName"  align="center"  label="属性名"></el-table-column>
        <el-table-column  prop="itempropertydList" align="center"  label="属性值">
          <template scope="scope">
            <span v-for="(one,index) in scope.row.itempropertydList">
              {{one.itemPparam}}
              <span v-if="index!=scope.row.itempropertydList.length-1">/</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column  align="center"  label="操作">
          <template scope="scope">
            <el-button  type="text"  v-on:click="changeOneAttr(scope.$index,scope.row)">修改</el-button>
            <el-button  type="text"  v-on:click="DELEONE(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <el-dialog :title="bindTitle" :visible.sync="showAddGoodAttr">
      <el-form label-width="100px" class="demo-dynamic" :model="formData" ref="formData" :rules="rules1">
        <el-form-item  prop="addGoodAttrName"  label="属性名称：">
          <el-input v-model="formData.addGoodAttrName"></el-input>
        </el-form-item>
        <el-form-item prop="addGoodAttrOneVal" label="属性值：" >
          <el-input v-model="formData.addGoodAttrOneVal"></el-input>
          <el-button v-on:click="addOneAttrVal('formData')">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="addGoodAttrValues" style="windth:80%"  >
        <el-table-column align="center" property="itemPparam" label="属性值">
          <template scope="scope" >
            <el-input :minlength="5" @blur="changThisAttrVal(scope.$index,$event,scope.row)" :disabled="scope.$index!=changeThisAll" :value="scope.row.itemPparam"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="100">
          <template scope="scope">
            <!-- <el-button  type="text"  v-on:click="changeThisAttr(scope.$index,scope.row)">修改</el-button> -->
            <el-button  v-on:click="deleOneAttrVal(scope.$index,scope.row)"  type="text">删除</el-button>
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
        formData:{
          addGoodAttrName:null,
          addGoodAttrOneVal:null
        },
        rules1:{
          addGoodAttrName:{ required: true, message: '请输入属性名称', trigger: 'blur' },
          addGoodAttrOneVal:{required: true, message: '请输入属性值', trigger: 'blur'}
        },
        bindTitle:null,
        addGoodAttrValues:[],
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
          // {itemPropertyName:"sdfg",itempropertydList:[{name:"1"},{name:"1"},{name:"1"}]},
        ],
        showAddGoodAttr: false,
        channgAttrId:null,
        flag1:true,
      }
    },
    created:function(){
      var that = this;
      that.getGoodAttrList();
    },
    methods: {
      getGoodAttrList:function(){
        var that = this;
        that.global.axiosGetReq('/item/queryProperty')
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            var data = res.data.data;
            that.tableData = data;
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        },(err) => {that.$message.error('网络出错，请稍后再试！');})
      },
      addGoodAttr:function(){
        var that = this;
        that.bindTitle = "添加商品属性";
        that.showAddGoodAttr = true;
        that.attOperaType = 1;
        that.formData.addGoodAttrName = null;
        that.addGoodAttrValues = [];
        that.flag1 = false;
      },
      changThisAttrVal:function(index,e,item){
        var that = this;
        if(e.target._value){
          if(that.attOperaType==2){//修改已有属性属性值
            that.$confirm('确定修改该属性值吗, 是否继续?', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'})
            .then(() => {
                var obj = {
                  itemPparam:e.target._value,
                  itemSKU:item.itemSKU
                };
                that.global.axiosPostReq('/item/updatePropertyd',obj)
                .then((res) => {
                  that.addGoodAttrValues[index].itemPparam = e.target._value;
                  that.changeThisAll = null;
                  that.flag1 = true;
                });
            });
          }
        }else{
          this.$alert('请填写完整商品的属性值', {confirmButtonText: '确定',});
          that.flag1 = false;
        }
      },
      changeThisAttr:function(index,item){
        // console.log(item)
        this.changeThisAll = index;
        this.flag1 = false;
        this.attOperaType = 2;
      },
      search:function(){
        var that = this;
        var obj = {
          itemPropertyName:that.searchAttrName,
          token:"awfa"
        }
        if(that.searchAttrName){
          that.global.axiosPostReq('/item/queryProperty',obj)
          .then((res) => {
            // console.log(res.data.data,"search")
            if (res.data.callStatus === 'SUCCEED') {
              that.tableData = res.data.data;
              // console.log(that.tableData)
              that.searchAttrName = null;//清空收索内容
            } else {
              that.$message.error('网络出错，请稍后再试！');
            }
          })
        }else{
          this.$alert('请输入属性名', {confirmButtonText: '确定',});
        }
      },
      DELEONE:function(index,item){
        var that = this;
        that.$confirm('确定删除该属性吗, 是否继续?', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'})
        .then(() => {
            var obj = {
              itemPropertyId:item.itemPropertyId
            };
            that.global.axiosGetReq('/item/deleteProperty',obj)
            .then((res) => {
              if (res.data.callStatus === 'SUCCEED') {
                that.$message({type: 'success',message: '删除成功!'});
                that.tableData.splice(index,1);
              } else {
                that.$message.error('网络出错，请稍后再试！');
              }
          })
        });
      },
      changeOneAttr:function(index,item){
        var that = this;
        that.bindTitle = "修改商品属性";
        that.formData.addGoodAttrName = item.itemPropertyName;
        that.addGoodAttrValues = item.itempropertydList;
        that.channgAttrId = item.itemPropertyId;
        that.changAttrIndex = index;
        that.attOperaType = 2;
        that.showAddGoodAttr = true;
      },
      saveOneAttrs:function(){
        var that = this;
        if(that.attOperaType==1){
          //添加
          if(that.flag1){
            var obj={};
            var arr = [];
            var arr2 = [];
            for(let i in that.addGoodAttrValues){
              arr.push(that.addGoodAttrValues[i].itemPparam);
              arr2.push({name:that.addGoodAttrValues[i].itemPparam});
            }
            obj.itemPparamList = arr;
            obj.itemPropertyName = that.formData.addGoodAttrName;
            that.global.axiosPostReq('/item/addPropertydAndPropertyName',obj)
            .then((res) => {
              if (res.data.callStatus === 'SUCCEED') {
                obj.itempropertydList = arr2;
                that.tableData.push(obj);
                that.addGoodAttrValues = [];
                that.formData.addGoodAttrName= null;
                that.showAddGoodAttr  = false;
              } else {
                that.$message.error('网络出错，请稍后再试！');
              }
            })
          }else{
            this.$alert('请填写完整商品的属性名或属性值', {confirmButtonText: '确定',});
          }
        }
        if(that.attOperaType==2){
          // 修改
          if(that.flag1){
            var obj2 = {
              itemPropertyId:that.channgAttrId,
              itemPropertyName:that.formData.addGoodAttrName
            };
            console.log(that.tableData[that.changAttrIndex])
            that.global.axiosPostReq('/item/updateProperty',obj2)
            .then((res) => {
              if (res.data.callStatus === 'SUCCEED') {
                that.tableData[that.changAttrIndex].itemPropertyName = that.formData.addGoodAttrName;
                that.tableData[that.changAttrIndex].itempropertydList = that.addGoodAttrValues;
                that.showAddGoodAttr  = false;
              } else {
                that.$message.error('网络出错，请稍后再试！');
              }
            })
          }else{
            this.$alert('请填写完整商品的属性名或属性值', {confirmButtonText: '确定',});
          }
        }
      },
      deleOneAttrVal:function(index,item){
        var that = this;
        if(that.attOperaType==2){
          that.$confirm('确定删除该属性值吗, 是否继续?', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'})
          .then(() => {
              var obj = {
                itemSKU:item.itemSKU
              };
              that.global.axiosPostReq('/item/deletePropertyd',obj)
              .then((res) => {
                if (res.data.callStatus === 'SUCCEED') {
                  that.addGoodAttrValues.splice(index, 1);
                  that.changeThisAll = null;
                } else {
                  that.$message.error('网络出错，请稍后再试！');
                }
            })
          });
        }else{
          that.addGoodAttrValues.splice(index, 1);
          that.changeThisAll = null;
        }
      },
      addOneAttrVal:function(formName){
        var that = this;
        that.$refs[formName].validate((valid) => {
          if (valid) {
            var aa= {};
            aa.itemPparam = that.formData.addGoodAttrOneVal;
            that.addGoodAttrValues.push(aa);
            that.formData.addGoodAttrOneVal = null;
            that.flag1 = true;
            if(that.attOperaType==2){
              
            }
          } else {
            that.$alert('请填写完整商品的属性名或属性值', {confirmButtonText: '确定',});
            that.flag1 = false;
            return false;
          }
        });
      },
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
    /*padding-right: 20px;*/
  }
</style>
