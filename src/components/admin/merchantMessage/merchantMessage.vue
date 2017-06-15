<template>
<div>
  <el-row class="warp" v-show="list">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin/merchantMessage' }"><b>商品信息管理</b></el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24" class="warp-main">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="cargo">
          <el-form-item label="商品编号：">
            <el-input v-model="cargo.id"></el-input>
          </el-form-item>
          <el-form-item label="商品名称：">
            <el-input v-model="cargo.name"></el-input>
          </el-form-item>
          <el-form-item label="商品分类：">
            <el-input v-model="cargo.class"></el-input>
          </el-form-item>
          <el-form-item label="品牌名称：">
            <el-input v-model="cargo.brand"></el-input>
          </el-form-item>
          <el-form-item label="乾币抵扣：">
            <el-select v-model="coinValue" placeholder="请选择">
              <el-option v-for="coin in options1" :key="coin.value" :label="coin.label" :value="coin.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品状态：">
            <el-select v-model="stateValue" placeholder="请选择">
              <el-option v-for="state in options2" :key="state.value" :label="state.label" :value="state.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="search()">查询</el-button>
        <el-button type="primary" @click="add()">添加商品</el-button>
      </el-col>
    </el-col>
      <div class="clearfix"></div>
      <el-table :data="tableData" border style="margin-top: 26px;width: 100%">
        <el-table-column label="商品编号" prop="id"></el-table-column>
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="商品分类" prop="class"></el-table-column>
        <el-table-column label="品牌名称" prop="brand"></el-table-column>
        <el-table-column label="支持乾币抵扣">
          <template scope="scope">
            <span v-if="scope.row.coin == 1">是</span>
            <span v-if="scope.row.coin == 0">否</span>
          </template> 
        </el-table-column>
        <el-table-column label="商品状态">
          <template scope="scope">
            <span v-if="scope.row.state == true">已上架</span>
            <span v-if="scope.row.state == false">已下架</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <div v-if="scope.row.state == true">
              <el-button size="small" @click="detail()">详情</el-button>
              <el-button size="small" @click="soldOut()">下架</el-button>
            </div>
            <div v-else>
              <el-button size="small" @click="detail()">详情</el-button>
              <el-button size="small" @click="edit()">编辑</el-button>
              <el-button size="small" @click="preview()">预览</el-button>
              <el-button size="small" @click="grounding()">上架</el-button>
              <el-button size="small" type="danger" @click="remove()">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
  </el-row>
  <!--   添加商品开始 开始  -->
  <el-row class="warp" v-show="addMerchandise">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin/merchantMessage' }"><b>商品信息管理</b></el-breadcrumb-item>
        <div class="retrunList" @click="retrunList">返回商品列表</div>
        <el-breadcrumb-item>添加商品</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <div class="clearfix"></div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin-top: 20px;">
      <el-form-item label="商品编号" prop="cargoId">
        <el-input v-model="ruleForm.cargoId" placeholder="默认的，不需要修改" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="ruleForm.name" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="商品分类" prop="type">
        <el-cascader :options="options4" :show-all-levels="false" v-model="ruleForm.type"></el-cascader>
<!--         <el-input v-model="ruleForm.classify" style="width: 300px;" icon="search" :on-icon-click="handleIconClick"></el-input> -->
      </el-form-item>
      <el-form-item label="品牌名称" prop="brand">
        <el-select v-model="ruleForm.brand" placeholder="请选择">
          <el-option v-for="brand in options3" :key="brand.value" :label="brand.label" :value="brand.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="注册账号" prop="rgAcount">
        <el-input v-model="ruleForm.rgAcount" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="乾币抵扣" prop="qian">
        <el-radio class="radio" v-model="radio" label="1">支持</el-radio>
        <el-radio class="radio" v-model="radio" label="2">不支持</el-radio>
      </el-form-item>
      <el-form-item label="商品属性">
        <el-button type="primary" @click="chooseType()">选择属性</el-button>
      </el-form-item>
      <div class="active_box" v-show="active" v-for="item in items" :key="item">
        <span class="choose_title">{{item.property}}</span>
        <el-button type="primary" @click="removeDes(item)">删除</el-button>
        <el-checkbox-group v-model="checkedItems" class="choose_des">
          <el-checkbox v-for="sitem in item.type" :label="sitem" :key="item" v-model="checked">{{sitem.des}}</el-checkbox>
        </el-checkbox-group>
      </div>
<!--       <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item> -->
    </el-form>
  </el-row>
  <!-- 选择属性弹出框 开始 -->
  <el-dialog title="选择商品属性" :visible.sync="dialogTableVisible">
    <el-table ref="multipleTable" :data="tableData2" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="property" label="属性名称">
      </el-table-column>
      <el-table-column prop="type" label="规格值">
        <template scope="scope">
          <span v-for="type in scope.row.type" :key="type">{{type.des}}</span>
        </template> 
      </el-table-column>
    </el-table>
    <div class="btn_box">
      <el-button type="primary" @click="confirm_type">确定</el-button>
      <el-button type="primary" @click="dialogTableVisible = false">取消</el-button>
    </div>
  </el-dialog>
  <!-- 选择属性弹出框 结束 -->
  <!--   添加商品开始 结束  -->
</div>
</template>
<script>
  import util from '../../../common/util'

  export default{
    data () {
      return {
        cargo: {
          id: '',
          name: '',
          class: '',
          brand: '',
        },
        options1: [{
          label: '全部',
          value: '1'
        },{
          label: '支持',
          value: '2'
        },{
          label: '不支持',
          value: '3'
        }],
        options2: [{
          label: '全部',
          value: '1'
        },{
          label: '已上架',
          value: '2'
        },{
          label: '已下架',
          value: '3'
        }],
        options3: [{
          label: '哈哈',
          value: '1'
        },{
          label: '嘿嘿',
          value: '2'
        },{
          label: '呵呵',
          value: '3'
        }],
        options4: [{
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
        tableData: [{
          id: '1122334455667788',
          name: '朗力 口洁宝抑菌含漱液',
          class: '漱口水',
          brand: '武汉朗力生物',
          coin: 1,
          state: true,
        }, {
          id: '1122334455667788',
          name: '武汉金光 脸颊牵开器-T型 小',
          class: '漱口水',
          brand: '武汉朗力生物',
          coin: 0,
          state: true,
        }, {
          id: '1122334455667788',
          name: '朗力 口洁宝抑菌含漱液',
          class: '漱口水',
          brand: '武汉朗力生物',
          coin: 0,
          state: false,
        }],
        ruleForm: {
          cargoId: '',
          name: '',
          type: [],
          brand: '',
          rgAcount:'',
          qian: '',
        },
        rules: {
          cargoId: [ 
            { required: true, message: '请填写商品编号', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请填写商品名称', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择商品分类', trigger: 'change' }
          ],
          brand: [
            { required: true, message: '请选择品牌名称', trigger: 'change' }
          ],
          rgAcount: [
            { required: true, message: '请填写注册账号', trigger: 'blur' }
          ],
          qian: [
            { required: true, message: '请选择是否乾币抵扣状态', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
        coinValue: '',
        stateValue: '',
        radio: '',
        list: false,
        addMerchandise: true,
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
        tableData2: [{
          property: '工作电压',
          type: [
            { 
              des: '12V/'
            },{ 
              des: '24V/'
            },{ 
              des: '36V/'
            },{ 
              des: '48V/'
            },{ 
              des: '60V/'
            },{ 
              des: '72V/'
            }],
        }, {
          property: '额定电流',
          type: [
            { 
              des: '12V/'
            },{ 
              des: '24V/'
            },{ 
              des: '36V/'
            },{ 
              des: '48V/'
            },{ 
              des: '60V/'
            },{ 
              des: '72V/'
            }],
        }, {
          property: '品牌类别',
          type: [
            { 
              des: '12V/'
            },{ 
              des: '24V/'
            },{ 
              des: '36V/'
            },{ 
              des: '48V/'
            },{ 
              des: '60V/'
            },{ 
              des: '72V/'
            }],
        }, {
          property: '产品类别',
          type: [
            { 
              des: '12V/'
            },{ 
              des: '24V/'
            },{ 
              des: '36V/'
            },{ 
              des: '48V/'
            },{ 
              des: '60V/'
            },{ 
              des: '72V/'
            }],
        }, {
          property: '车辆吨位',
          type: [
            { 
              des: '12V/'
            },{ 
              des: '24V/'
            },{ 
              des: '36V/'
            },{ 
              des: '48V/'
            },{ 
              des: '60V/'
            },{ 
              des: '72V/'
            }],
        }, {
          property: '动力分类',
          type: [
            { 
              des: '12V/'
            },{ 
              des: '24V/'
            },{ 
              des: '36V/'
            },{ 
              des: '48V/'
            },{ 
              des: '60V/'
            },{ 
              des: '72V/'
            }],
        }, {
          property: '车型分类',
          type: [
            { 
              des: '12V/'
            },{ 
              des: '24V/'
            },{ 
              des: '36V/'
            },{ 
              des: '48V/'
            },{ 
              des: '60V/'
            },{ 
              des: '72V/'
            }],
        }],
        multipleSelection: [],
        dialogTableVisible: false,
        items: [],
        checkedItems: [],
        active: true,
        checked: false,
      }
    },
    methods: {
      search: function() {
        var that = this;
      },
      //添加商品
      add: function() {
        var that = this;
        that.list = false;
        that.addMerchandise = true;
      },
      //返回商品列表
      retrunList: function() {
        var that = this;
        that.list = true;
        that.addMerchandise = false;
      },
      //上架
      grounding: function() {
        var that = this;
        that.$confirm('确定上架该商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$message({
            type: 'success',
            message: '上架成功!'
          });
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
      },
      //下架
      soldOut: function() {
        var that = this;
        that.$confirm('确定下架该商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$message({
            type: 'success',
            message: '下架成功!'
          });
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
      },
      //删除
      remove: function() {
        var that = this;
        that.$confirm('确定删除该商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
      },
      //选择属性
      chooseType: function() {
        var that = this;
        that.dialogTableVisible = true;
      },
      //选择属性详细
      handleSelectionChange(val) {
        var that = this;
        that.multipleSelection = val;
      },
      //确定商品属性
      confirm_type: function() {
        var that = this;
        that.items = that.multipleSelection;
        that.dialogTableVisible = false;
      },
      //删除已选属性
      removeDes: function(item) {
        var that = this;
        var items = that.items;
        console.log(item.property);
        var a = items.filter(function(ele,index,arr) {
          return ele.property !== item.property;   
        });
        // console.log(a);
        that.items = a;
        that.multipleSelection = a;
        that.$refs.multipleTable.clearSelection();
      }
    },
    mounted() {
    }
  }
</script>
<style scoped>
.retrunList {
  float: right;
  cursor: pointer;
}
.retrunList:hover{
  color: #5DB7E7;
  transition: all ease 0.5s;
}
.choose_title {
  font-size: 14px;
  color: #48576a;
  margin-right: 20px;
}
.active_box {
  margin-left: 100px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eaeaea;
  margin-bottom: 20px;
}
.choose_des {
  margin-top: 15px;
}
.btn_box {
  margin-top: 20px;
  text-align: right;
}
</style>
