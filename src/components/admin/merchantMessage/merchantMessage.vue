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
<!--           <el-form-item label="乾币抵扣：">
            <el-select v-model="coinValue" placeholder="请选择">
              <el-option v-for="coin in options1" :key="coin.value" :label="coin.label" :value="coin.value">
              </el-option>
            </el-select>
          </el-form-item> -->
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
<!--         <el-table-column label="支持乾币抵扣">
          <template scope="scope">
            <span v-if="scope.row.coin == 1">是</span>
            <span v-if="scope.row.coin == 0">否</span>
          </template> 
        </el-table-column> -->
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
  <!-- 查看商品属性详情面板 开始 -->
  <el-dialog title="商品详情" :visible.sync="dialogTableVisible">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="商品编号" prop="cargoId">
        <el-input v-model="ruleForm.cargoId" placeholder="默认的，不需要修改" style="width: 300px !important;"></el-input>
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="ruleForm.name" style="width: 300px !important;"></el-input>
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
        <el-input v-model="ruleForm.rgAcount" style="width: 300px !important;"></el-input>
      </el-form-item>
      <el-form-item label="乾币抵扣" prop="qian">
        <el-radio class="radio" v-model="radio" label="1">支持</el-radio>
        <el-radio class="radio" v-model="radio" label="2">不支持</el-radio>
      </el-form-item>
      <el-form-item label="商品属性">
        <el-button type="primary" @click="chooseType()">选择属性</el-button>
      </el-form-item>
      <table class="activeTable_box">
        <tr class="activeTable_title">
          <th class="type1">属性一</th>
          <th class="type2">属性二</th>
          <th class="type3">属性三</th>
          <th class="skuCode">SKU代码</th>
          <th class="price">价格</th>
          <th class="percent">提成（%）</th>
          <th class="coin">乾币（%）</th>
          <th class="stock">库存</th>
          <th class="enable">是否启用</th>
        </tr>
        <tr class="activeTable_des" v-for="(table,index) in 8" :key="table">
          <td v-if="index == 0 || index == 4" :rowspan="4">11</td>
          <td v-if="index == 0 || index == 2 || index ==4 || index==6" :rowspan="2" class="des_type2">22</td>
          <td class="des_type3">33</td>
          <td class="des_skuCode">
            <el-input v-model="input_sku"></el-input>
          </td>
          <td class="des_price">
            <el-input v-model="input_price"></el-input>
          </td>
          <td class="des_percent">
            <el-input v-model="input_percent"></el-input>
          </td>
          <td class="des_coin">
            <el-input v-model="input_coin"></el-input>
          </td>
          <td class="des_stock">
            <el-input v-model="input_stock"></el-input>
          </td>
          <td class="des_enable">
            <el-checkbox v-model="input_enable"></el-checkbox>
          </td>
        </tr>
      </table>
      <div class="detail_box">
        <div class="left detail_cargo">商品详情：</div>
        <p class="left detail_word">商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情</p>
      </div>
      <div class="clearfix"></div>
      <div class="detail_box">
        <div class="left detail_cargo">图片说明：</div>
        <p class="left detail_word">图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明</p>
      </div>
      <div class="clearfix"></div>
      <div class="detail_box">
        <div class="left detail_cargo">视频说明：</div>
        <p class="left detail_word">视频说明</p>
      </div>
    </el-form>
  </el-dialog>
  <!-- 查看商品属性详情面板 结束 -->
  <addMerchandise v-on:listenToChildEvent="showMsgFromChild" v-show="addMerchandise"></addMerchandise>
</div>
</template>
<script>
  import util from '../../../common/util'
  import addMerchandise from './addMerchandise'
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
        list: true,
        addMerchandise: false,
        coinValue: '',
        stateValue: '',
        dialogTableVisible: false,
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
        radio: '',
        labelPosition: 'right',
        tableData2: [{
          property: '工作电压',
          type: [
            { 
              des: '12V',
              checked: false,
              typeId: 1,
            },{ 
              des: '24V',
              checked: false,
              typeId: 1,
            },{ 
              des: '36V',
              checked: false,
              typeId: 1,
            },{ 
              des: '48V',
              checked: false,
              typeId: 1,
            },{ 
              des: '60V',
              checked: false,
              typeId: 1,
            },{ 
              des: '72V',
              checked: false,
              typeId: 1,
            }],
            checkItem: [],
        }, {
          property: '额定电流',
          type: [
            { 
              des: '50A',
              checked: false,
              typeId: 2,
            },{ 
              des: '100A',
              checked: false,
              typeId: 2,
            },{ 
              des: '150A',
              checked: false,
              typeId: 2,
            },{ 
              des: '200A',
              checked: false,
              typeId: 2,
            },{ 
              des: '300A',
              checked: false,
              typeId: 2,
            },{ 
              des: '400A',
              checked: false,
              typeId: 2,
            }],
            checkItem: [],
        }, {
          property: '品牌类别',
          type: [{ 
              des: '进口品牌',
              checked: false,
              typeId: 3,
            },{ 
              des: '国产品牌',
              checked: false,
              typeId: 3,
            },{ 
              des: 'OEM',
              checked: false,
              typeId: 3,
            }],
            checkItem: [],
        }, {
          property: '产品类别',
          type: [
            { 
              des: '原厂配套件',
              checked: false,
              typeId: 4,
            },{ 
              des: '副厂件',
              checked: false,
              typeId: 4,
            }],
            checkItem: [],
        }, {
          property: '车辆吨位',
          type: [
            { 
              des: '1T以下',
              checked: false,
              typeId: 5,
            },{ 
              des: '1-1.8T',
              checked: false,
              typeId: 5,
            },{ 
              des: '2-2.5T',
              checked: false,
              typeId: 5,
            },{ 
              des: '3-3.5T',
              checked: false,
              typeId: 5,
            },{ 
              des: '4-4.5T',
              checked: false,
              typeId: 5,
            },{ 
              des: '5-7T',
              checked: false,
              typeId: 5,
            },{ 
              des: '8-10T',
              checked: false,
              typeId: 5,
            },{ 
              des: '10T以上',
              checked: false,
              typeId: 5,
            }],
            checkItem: [],
        }, {
          property: '动力分类',
          type: [
            { 
              des: '铅酸蓄电池',
              checked: false,
              typeId: 6,
            },{ 
              des: '柴油车',
              checked: false,
              typeId: 6,
            },{ 
              des: '汽油车',
              checked: false,
              typeId: 6,
            },{ 
              des: '液化天然气',
              checked: false,
              typeId: 6,
            },{ 
              des: '锂电池',
              checked: false,
              typeId: 6,
            }],
            checkItem: [],
        }, {
          property: '车型分类',
          type: [
            { 
              des: '四支点平衡重',
              checked: false,
              typeId: 7,
            },{ 
              des: '三支点平衡重',
              checked: false,
              typeId: 7,
            },{ 
              des: '前移式叉车',
              checked: false,
              typeId: 7,
            },{ 
              des: '托盘搬运车',
              checked: false,
              typeId: 7,
            },{ 
              des: '托盘堆垛车',
              checked: false,
              typeId: 7,
            },{ 
              des: '牵引车',
              checked: false,
              typeId: 7,
            }],
            checkItem: [],
        }],
        multipleSelection: [],
        dialogTableVisible: false,
        items: [],
        checkedItems: [],
        input_sku: '',
        input_price: '',
        input_percent: '',
        input_coin: '',
        input_stock: '',
        input_enable: false,
      }
    },
    components: {
      addMerchandise,
    },
    mounted: function() {
      var that = this;
      if (that.$route.params.list == undefined || that.$route.params.addMerchandise == undefined) {
        return false
      } else {
        that.list = that.$route.params.list;
        that.addMerchandise = that.$route.params.addMerchandise;
      }
    },
    methods: {
      // 组件传值
      showMsgFromChild: function(data) {
        var that = this;
        that.list = data;
        that.addMerchandise = false;
        //console.log(data);
      },
      search: function() {
        var that = this;
      },
      //添加商品
      add: function() {
        var that = this;
        that.list = false;
        that.addMerchandise = true;
      },
      //编辑商品属性
      edit: function() {
        var that = this;
        that.list = false;
        that.addMerchandise = true;
      },
      //商品属性详情
      detail: function() {
        var that = this;
        that.dialogTableVisible = true;
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
    }
  }
</script>
<style scoped>
.left {
  float: left;
}
.activeTable_box {
  width: 100%;
  border: 1px solid #dfe6ec;
}
.activeTable_title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #dfe6ec;
}
.type1, .des_type1{
  width: 8%;
  text-align: center;
  font-size: 14px;
  border-right: 1px solid #dfe6ec;
}
.type2, .des_type2{
  width: 8%;
  text-align: center;
  font-size: 14px;
  border-right: 1px solid #dfe6ec;
}
.type3, .des_type3{
  width: 8%;
  text-align: center;
  font-size: 14px;
  border-right: 1px solid #dfe6ec;
}
.skuCode, .des_skuCode{
  width: 12.5%;
  text-align: center;
  font-size: 14px;
  border-right: 1px solid #dfe6ec;
}
.price, .des_price{
  width: 12.5%;
  text-align: center;
  font-size: 14px;
  border-right: 1px solid #dfe6ec;
}
.percent, .des_percent{
  width: 12.5%;
  text-align: center;
  font-size: 14px;
  border-right: 1px solid #dfe6ec;
}
.coin, .des_coin{
  width: 12.5%;
  text-align: center;
  font-size: 14px;
  border-right: 1px solid #dfe6ec;
}
.stock, .des_stock{
  width: 12.5%;
  text-align: center;
  font-size: 14px;
  border-right: 1px solid #dfe6ec;
}
.enable, .des_enable{
  width: 12.5%;
  text-align: center;
  font-size: 14px;
}
.activeTable_des {
  width: 100%;
  /*height: 100px;*/
  /*line-height: 100px;*/
  border-bottom: 1px solid #dfe6ec;
}
.detail_box {
  margin-top: 15px;
  width: 100%;
}
.detail_cargo {
  width: 10%;
  font-size: 15px;
}
.detail_word {
  width: 90%;
  font-size: 14px;
  color: #000;
  line-height: 25px;
}
</style>
