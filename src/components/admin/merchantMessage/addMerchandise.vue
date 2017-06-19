<template>
  <div class="addMerchandise">
    <!--   添加商品开始 开始  -->
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin/merchantMessage' }"><b>商品信息管理</b></el-breadcrumb-item>
        <div class="retrunList" @click="retrunList">返回商品列表</div>
        <el-breadcrumb-item>添加商品</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <div class="clearfix"></div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin-top: 20px;" v-show="firstStep">
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
      <div class="active_box" v-for="(item,index) in items" :key="item">
        <span class="choose_title">{{item.property}}</span>
        <el-button type="primary" @click="removeDes(item)">删除</el-button>
<!--         <el-checkbox-group v-model="item.checkItem" class="choose_des"> -->
        <div style="margin-top: 15px;">
          <el-checkbox v-for="sitem in item.type" :label="sitem" :key="item" v-model="sitem.checked" @change="checkActive(sitem,item,index)">{{sitem.des}}</el-checkbox>
        </div>
<!--         </el-checkbox-group> -->
      </div>
      <!--  添加属性变换表格 开始 -->
      <table class="activeTable_box" v-show="active">
        <tr class="activeTable_title">
          <th class="type1" v-show="num[0].num1!==0">{{property1}}</th>
          <th class="type2" v-show="num[1].num2!==0">{{property2}}</th>
          <th class="type3" v-show="num[2].num3!==0">{{property3}}</th>
          <th class="skuCode">SKU代码</th>
          <th class="price">价格</th>
          <th class="percent">提成（%）</th>
          <th class="coin">乾币（%）</th>
          <th class="stock">库存</th>
          <th class="enable">是否启用</th>
        </tr>
        <tr class="activeTable_des" v-for="(table,index) in number" :key="table">
          <td v-if="index%(num[1].num2*num[2].num3)==0" :rowspan="num[1].num2*num[2].num3" class="des_type1">{{des1[index]}}</td>
          <td v-if="index%num[2].num3==0" :rowspan="num[2].num3" class="des_type2">{{des2[index]}}</td>
          <td class="des_type3">{{des3[index]}}</td>
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
  <!--       v-if="num[0].num1!==0&&num[1].num2!==0&&num[2].num3!==0" -->
<!--         <tr v-else class="activeTable_des" v-for="(table,index) in number" :key="table">
          <td :rowspan="num[0].num1" class="des_type1" v-show="desType1">11</td>
          <td :rowspan="num[1].num2" class="des_type2" v-show="desType2">22</td>
          <td class="des_type3" v-show="desType3">33</td>
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
        </tr> -->
      </table>
      <!--  添加属性变换表格 结束 -->
      <el-form-item style="margin-top:50px;">
        <el-button type="primary" @click="nextToFirst()">下一步</el-button>
<!--         <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
      <!-- 选择属性弹出框 开始 -->
      <el-dialog title="选择商品属性" :visible.sync="dialogTableVisible">
        <el-table ref="multipleTable" :data="tableData2" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="property" label="属性名称">
          </el-table-column>
          <el-table-column prop="type" label="规格值">
            <template scope="scope">
              <span v-for="type in scope.row.type" :key="type">{{type.des}}/ </span>
            </template> 
          </el-table-column>
        </el-table>
        <div class="btn_box">
          <el-button type="primary" @click="confirm_type">确定</el-button>
          <el-button type="primary" @click="dialogTableVisible = false">取消</el-button>
        </div>
      </el-dialog>
      <!-- 选择属性弹出框 结束 -->
    </el-form>
    <secondStep v-on:listenToChildEvent="showMsgFromSecondStep" v-show="secondStep"></secondStep>
  </el-row>
  <!--   添加商品开始 结束  -->
  </div>
</template>

<script>
  import secondStep from './secondStep';
  export default {
    name: 'addMerchandise',
    data () {
      return {
        list: true,
        addMerchandise: false,
        firstStep: true,
        secondStep: false,
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
        active: true,
        num : [{
          num1: 0
        },{
          num2: 0
        },{
          num3: 0
        }],
        num1: 0,
        num2: 0,
        num3: 0,   
        number: null,    
        Type1: true,
        Type2: true,
        Type3: true,
        desType1: false,
        desType2: false,
        desType3: false,
        input_sku: '',
        input_price: '',
        input_percent: '',
        input_coin: '',
        input_stock: '',
        input_enable: false,
        activeTable: [],
        activeTable1: [
          {first: '男装',
           num: 4,
           children1:[
              {second:'正装',
                children2: [
                  {third:'T恤1'},
                  {third:'裤衩'},
                ],
              },
              {second:'童装',
                children2: [
                  {third:'哈伦裤'},
                  {third:'T恤2'},
                ],
              },
            ]
          },
        ],
        ggId1: null,
        ggId2: null,
        ggId3: null,
        property1: '',
        property2: '',
        property3: '',
        des1: [],
        des2: [],
        des3: [],
      }
    },
    components: {
      secondStep,
    },
    watch: {
      //监听属性变换表格
      activeTable: function() {
        var that = this;
        if (that.activeTable.length == 0) {
          that.active = false;
        }
      },
      num: {
        handler: function() {
          var that = this;
          var sum = 1;
          var nn = that.num;
          for (var i = 0; i < nn.length; i++) {
            let aa = '';
            for (aa in nn[i]) {
              // console.log(aa);
            }
            // console.log(nn[i][aa]);
            if (nn[i][aa] !== 0) {
              sum *= nn[i][aa]
            }
            //console.log('num' + (i +1));
          }
          that.number = sum;
        },
        deep: true
      },
    },
    created: function() {
      //console.log(this.num.num1);
    },
    methods: {
      //返回商品列表
      retrunList: function() {
        var that = this;
        that.list = true;
        that.addMerchandise = false;
        that.$emit('listenToChildEvent',that.list);
      },
      // 组件传值
      showMsgFromSecondStep: function(data) {
        var that = this;
        that.secondStep = data;
        that.firstStep = true;
        //console.log(data);
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
      },
      //选择勾选属性
      checkActive: function(sitem, item, index) {
        var that = this;
        var a = item.type;
        if (sitem.checked == true) {
          if (sitem.type1 == undefined) {
            sitem.type1 = sitem.des;
            that.activeTable.push(sitem);
            that.active = true;
            that.Type1 = true;
          } else {
            console.log('frisco');
          }
          if (that.num[0].num1 == 0 || that.ggId1 == a[0].typeId) {
            var a1 = a.filter(function(ele,index,arr) {
              return ele.checked == true;
            })
            that.num[0].num1 = a1.length;
            that.ggId1 = a[0].typeId;
            that.desType1 == true;
            that.property1 = item.property;
            that.des1.push(sitem.des);
            console.log(that.des1);
            return false
          } else {
            if (that.num[1].num2 == 0 || that.ggId2 == a[0].typeId) {
              var a2 = a.filter(function(ele,index,arr) {
                return ele.checked == true;
              })
              that.num[1].num2 = a2.length;
              that.ggId2 = a[0].typeId;
              that.desType2 == true;
              that.property2 = item.property;
              that.des2.push(sitem.des);
              return false
            } else {
              if (that.num[2].num3 == 0 || that.ggId3 == a[0].typeId) {
                var a3 = a.filter(function(ele,index,arr) {
                  return ele.checked == true;
                })
                that.num[2].num3 = a3.length;
                that.ggId3 = a[0].typeId;
                that.desType3 == true;
                that.property3 = item.property;
                that.des3.push(sitem.des);
                console.log(that.num);
                return false
              } else {
                sitem.checked = false;
                that.$message({
                  message: '只能勾选三个属性哦！',
                  type: 'warning'
                });
                return false
              }
            }
          }
          // for (var i = 0; i < a1.length; i++) {
          //   if(a1[i].checked == true) {
          //     that.num1 += 1;
          //   }
          // }
        }
        if (sitem.checked == false) {
          var a = item.type;
          var b = that.activeTable.filter(function(ele,index,arr) {
            return ele.des !== sitem.des;   
          });
          that.activeTable = b;
          sitem.type1 = undefined;
          if (a[0].typeId == that.ggId1) {
            var a1 = a.filter(function(ele,index,arr) {
              return ele.checked == true;
            })
            that.num[0].num1 = a1.length;
            that.ggId1 = a[0].typeId;
            console.log(that.num);
            return false
          }
          if (a[0].typeId == that.ggId2) {
            var a2 = a.filter(function(ele,index,arr) {
              return ele.checked == true;
            })
            that.num[1].num2 = a2.length;
            that.ggId2 = a[0].typeId;
            console.log(that.num);
            return false
          }
          if (a[0].typeId == that.ggId3) {
            var a3 = a.filter(function(ele,index,arr) {
              return ele.checked == true;
            })
            that.num[2].num3 = a3.length;
            that.ggId3 = a[0].typeId;
            console.log(that.num);
            return false
          }
          // that.active = false;
        }
      },
      nextToFirst: function() {
        var that = this;
        that.$router.push({ path: '/admin/secondStep' });
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table { 
 border-collapse:collapse; 
 border-spacing:0; 
} 
th,td { 
 padding: 0; 
}
td {
  height: 36px;
  line-height: 36px;
}
.left {
  float: left;
}
.el-input  {
  width: 80% !important;
  padding-right: 0px !important;
}
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
/*.choose_des {
  margin-top: 15px;
}*/
.btn_box {
  margin-top: 20px;
  text-align: right;
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
</style>
