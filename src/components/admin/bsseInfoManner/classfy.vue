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
        <el-table  :data="tableData" border style="width: 100%">
          <el-table-column prop="shuxingname" align="center" label="分类名称"></el-table-column>
          <el-table-column prop="shuxingzhi" align="center" label="上级分类"></el-table-column>
          <el-table-column align="center" label="操作">
            <template scope="scope">
              <el-button type="text" v-on:click="changeOneAttr(scope.$index)">修改</el-button>
              <el-button type="text" v-on:click="DELEONE(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-col>
    <el-dialog :title="bindTitle" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="上级分类：" prop="upClass" :label-width="formLabelWidth">
          <el-cascader :options="options" :show-all-levels="false" v-model="ruleForm.upClass" expand-trigger="hover" change-on-select>
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
  // import abc from "./abc"
  export default{
    data(){
      return {
        ruleForm:{
          upClass: [],
          classname: '',
        },
        searchClassfyName:null,
        searchParentClassfyName:null,
        // 1是增加，2是修改
        classfyOperaType:1,
        classfyChangeIndex:null,
        // addClassfyParent:['', '', ''],
        // addClassfyName:null,
        options: [{
            value: 'zhinan',
              label: '指南',
              children: [{
                value: 'shejiyuanze',
                label: '设计原则',
                children: [{
                  value: 'yizhi',
                label: '一致'
              }, {
                value: 'fankui',
                label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
              }, {
                value: 'kekong',
                label: '可控'
              }]
            }, {
              value: 'daohang',
              label: '导航',
              children: [{
                value: 'cexiangdaohang',
                label: '侧向导航'
              }, {
                value: 'dingbudaohang',
                label: '顶部导航'
              }]
            }]
          }, {
              value: 'zujian',
              label: '组件',
              children: [{
                value: 'basic',
                label: 'Basic',
                children: [{
                  value: 'layout',
                  label: 'Layout 布局'
                }, {
                    value: 'color',
                label: 'Color 色彩'
              }, {
                value: 'typography',
                label: 'Typography 字体'
              }, {
                value: 'icon',
                label: 'Icon 图标'
              }, {
                value: 'button',
                label: 'Button 按钮'
              }]
            }, {
              value: 'form',
              label: 'Form',
              children: [{
                value: 'radio',
                label: 'Radio 单选框'
              }, {
                value: 'checkbox',
                label: 'Checkbox 多选框'
              }, {
                value: 'input',
                label: 'Input 输入框'
              }, {
                value: 'input-number',
                label: 'InputNumber 计数器'
              }, {
                value: 'select',
                label: 'Select 选择器'
              }, {
                value: 'cascader',
                label: 'Cascader 级联选择器'
              }, {
                value: 'switch',
                label: 'Switch 开关'
              }, {
                value: 'slider',
                label: 'Slider 滑块'
              }, {
                value: 'time-picker',
                label: 'TimePicker 时间选择器'
              }, {
                value: 'date-picker',
                label: 'DatePicker 日期选择器'
              }, {
                value: 'datetime-picker',
                label: 'DateTimePicker 日期时间选择器'
              }, {
                value: 'upload',
                label: 'Upload 上传'
              }, {
                  value: 'rate',
                label: 'Rate 评分'
              }, {
                value: 'form',
                label: 'Form 表单'
              }]
            }, {
              value: 'data',
              label: 'Data',
              children: [{
                value: 'table',
                label: 'Table 表格'
              }, {
                value: 'tag',
                label: 'Tag 标签'
              }, {
                value: 'progress',
                label: 'Progress 进度条'
              }, {
                value: 'tree',
                label: 'Tree 树形控件'
              }, {
                value: 'pagination',
                label: 'Pagination 分页'
              }, {
                value: 'badge',
                label: 'Badge 标记'
              }]
            }, {
              value: 'notice',
              label: 'Notice',
              children: [{
                value: 'alert',
                label: 'Alert 警告'
              }, {
                value: 'loading',
                label: 'Loading 加载'
              }, {
                value: 'message',
                label: 'Message 消息提示'
              }, {
                value: 'message-box',
                label: 'MessageBox 弹框'
              }, {
                value: 'notification',
                label: 'Notification 通知'
              }]
            }, {
              value: 'navigation',
              label: 'Navigation',
              children: [{
                value: 'menu',
                label: 'NavMenu 导航菜单'
              }, {
                value: 'tabs',
                label: 'Tabs 标签页'
              }, {
                value: 'breadcrumb',
                label: 'Breadcrumb 面包屑'
              }, {
                value: 'dropdown',
                label: 'Dropdown 下拉菜单'
              }, {
                value: 'steps',
                label: 'Steps 步骤条'
              }]
            }, {
              value: 'others',
              label: 'Others',
              children: [{
                value: 'dialog',
                label: 'Dialog 对话框'
              }, {
                value: 'tooltip',
                label: 'Tooltip 文字提示'
              }, {
                value: 'popover',
                label: 'Popover 弹出框'
              }, {
                value: 'card',
                label: 'Card 卡片'
              }, {
                value: 'carousel',
                label: 'Carousel 走马灯'
              }, {
                value: 'collapse',
                label: 'Collapse 折叠面板'
              }]
            }]
          }, {
            value: 'ziyuan',
            label: '资源',
            children: [{
              value: 'axure',
              label: 'Axure Components'
            }, {
              value: 'sketch',
              label: 'Sketch Templates'
            }, {
              value: 'jiaohu',
              label: '组件交互文档'
            }]
          }],
        dialogFormVisible: false,
        formLabelWidth: '120px',
        bindTitle:null,
        // -----------------------------
        tableData:[],
        rules: {
          upClass: [
            { required: true, message: '请选择上级分类', trigger: 'change' }
          ],
          classname: [
            { required: true, message: '请输入分类名称', trigger: 'blur' }
          ],
        }
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
      that.global.axiosGetReq('/item/showItemClassify').then((res) => {
        console.log(res);
        if (res.data.callStatus === 'SUCCEED') {
          console.log(res.data.data);
          that.tableData = res.data.data;
          // if (res.data.data.length == 0) {
          //   that.hasAddress = false;
          // } else {
          //   that.hasAddress = true;
          //   that.address = res.data.data;
          // }
          //this.getData = res.data.data;
        } else {
          that.$message.error('网络出错，请稍后再试！');
        }
      })
    },
    methods: {
      addClassfy: function () {
        var that = this;
        that.bindTitle = "添加商品分类";
        that.dialogFormVisible = true;
        that.classfyOperaType = 1;
        that.addClassfyParent = ["","",""];
        that.addClassfyName = null;
      },
      aaga:function(val){
        // console.log(val)
      },
      // 查询分类
      search:function () {
        var that = this;
        this.filters.name;
      },
      DELEONE:function(index){
        var that = this;
        that.$confirm('确定删除该属性吗, 是否继续?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$message({
            type: 'success',
            message: '删除成功!'
          });
          that.tableData.splice(index,1);
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      changeOneAttr: function(index) {
        var that = this;
        that.bindTitle = "修改商品分类";
        that.classfyOperaType = 2;
        that.classfyChangeIndex = index;
        that.dialogFormVisible = true;
        var thisData = that.tableData[index];
        that.addClassfyParent = ["","",thisData.shuxingzhi];
        that.addClassfyName = thisData.shuxingname;
      },
      // 保存商品分类
      saveOneAttrs: function(formName) {
        var that = this;
        that.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        // if(that.ruleForm1.addClassfyName==""||that.ruleForm1.addClassfyParent[0]==""){
        //   that.$alert("请填写完属性值！", {confirmButtonText: '确定'});
        // }else{
        //   if(that.classfyOperaType==1){
        //       var obj = {};
        //      obj.shuxingname = that.ruleForm1.addClassfyName;
        //      obj.shuxingzhi = that.ruleForm1.addClassfyParent;
        //      that.tableData.push(obj);
        //      that.addClassfyParent = ["","",""];
        //      that.addClassfyName = null;
        //   }
        //   if(that.classfyOperaType==2){
        //     that.tableData[that.classfyChangeIndex].shuxingname = that.ruleForm1.addClassfyName;
        //     that.tableData[that.classfyChangeIndex].shuxingzhi = that.ruleForm1.addClassfyParent;
        //   }
        //   that.dialogFormVisible  = false;
        // }
      },
      // -----------------------------
    },
  }
</script>

<style>
.classfy  .el-dialog__footer{
  margin-left: 120px;
  text-align: left;
  }
</style>
