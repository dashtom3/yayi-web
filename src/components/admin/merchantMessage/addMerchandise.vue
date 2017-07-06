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
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin-top: 20px;">
      <el-form-item label="商品编号" prop="itemId">
        <el-input v-model="ruleForm.itemId" style="width: 300px !important;" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="商品名称" prop="itemName">
        <el-input v-model="ruleForm.itemName" style="width: 300px !important;"></el-input>
      </el-form-item>
      <el-form-item label="商品分类" prop="type">
        <el-cascader class="cascader" :props="{value:'label'}" :options="options" :show-all-levels="false" v-model="ruleForm.type" change-on-select>
        </el-cascader>
      </el-form-item>
      <el-form-item label="品牌名称" prop="itemBrandName">
        <el-select v-model="ruleForm.itemBrand" placeholder="请选择" @change="getBrandId">
          <el-option v-for="brand in brandOptions" :key="brand" :label="brand.itemBrandName" :value="brand">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="注册证号" prop="registerId">
        <el-input v-model="ruleForm.registerId" style="width: 300px !important;"></el-input>
      </el-form-item>
      <el-form-item label="推荐" prop="qian">
        <el-radio class="radio" v-model="ruleForm.isThrow" label="1">是</el-radio>
        <el-radio class="radio" v-model="ruleForm.isThrow" label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="商品属性" prop="qian">
        <el-radio class="radio" v-model="shopType" label="1">是</el-radio>
        <el-radio class="radio" v-model="shopType" label="2">否</el-radio>
        <el-button v-if="chooseShopType" type="primary" @click="chooseType()" :disabled='true'>选择属性</el-button>
        <el-button v-else type="primary" @click="chooseType()">选择属性</el-button>
      </el-form-item>
      <div class="active_box" v-for="(item,index) in items" :key="item">
        <span class="choose_title">{{item.itemPropertyName}}</span>
        <el-button type="primary" @click="removeDes(index)">删除</el-button>
<!--         <el-checkbox-group v-model="item.checkItem" class="choose_des"> -->
        <div style="margin-top: 15px;">
          <el-checkbox v-for="sitem in item.itempropertydList" :label="sitem" :key="item" v-model="sitem.checked" @change="checkAllActive()">{{sitem.itemPparam}}</el-checkbox>
        </div>
<!--         </el-checkbox-group> -->
      </div>
      <!--  添加属性变换表格 开始 -->
      <table class="activeTable_box" v-show="no_active">
        <tr class="activeTable_title">
          <th class="skuCode">SKU代码</th>
          <th class="price">价格</th>
          <th class="percent">提成（%）</th>
          <th class="coin">乾币（%）</th>
          <th class="stock">库存</th>
          <th class="enable">是否启用</th>
        </tr>
        <tr class="activeTable_des">
          <td class="des_skuCode">
            <el-input v-model="input_sku" :disabled="true"></el-input>
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
      <table class="activeTable_box" v-show="active">
        <tr class="activeTable_title">
          <!-- <th class="type1" v-show="num[0].num1!==0">{{property1}}</th>
          <th class="type2" v-show="num[1].num2!==0">{{property2}}</th>
          <th class="type3" v-show="num[2].num3!==0">{{property3}}</th> -->
          <th v-if="item.hasItem" v-for="item in items">{{item.itemPropertyName}}</th>
          <th class="skuCode">SKU代码</th>
          <th class="price">价格</th>
          <th class="percent">提成（%）</th>
          <th class="coin">乾币（%）</th>
          <th class="stock">库存</th>
          <th class="enable">是否启用</th>
        </tr>
        <tr class="activeTable_des" v-for="(activeItem,index) in activeItems" :key="">
        <!-- <span>{{activeItem}}</span> -->
          <!-- <td v-for="(item,index) in activeItem">{{item.itemPparam}}</td> -->
          <td v-for="(item,key) in activeItem">{{item}}</td>
          <td class="des_skuCode">
            <el-input v-model="activeItem.itemSKU" :disabled="true"></el-input>
<!--             <span>{{ruleForm.itemId+(index+1)}}</span> -->
          </td>
          <td class="des_price">
            <el-input v-model="activeItem.itemSkuPrice"></el-input>
          </td>
          <td class="des_percent">
            <el-input v-model="activeItem.tiChen"></el-input>
          </td>
          <td class="des_coin">
            <el-input v-model="activeItem.itemQb"></el-input>
          </td>
          <td class="des_stock">
            <el-input v-model="activeItem.stockNum"></el-input>
          </td>
          <td class="des_enable">
            <input class="elcheck" type="checkbox" v-model="activeItem.canUse">
          </td>
        </tr>
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
          <el-table-column prop="itemPropertyName" label="属性名称">
          </el-table-column>
          <el-table-column prop="itempropertydList" label="规格值">
            <template scope="scope">
              <span v-for="type in scope.row.itempropertydList" :key="type">{{type.itemPparam}}/ </span>
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
  </el-row>
  <!--   添加商品开始 结束  -->
  </div>
</template>

<script>
  export default {
    name: 'addMerchandise',
    data () {
      return {
        options: [],
        brandOptions: [],
        list: true,
        shopType: '',
        chooseShopType: true,
        ruleForm: {
          itemId: '', //商品编号
          itemName: '', //商品名称
          type: [], //商品分类
          oneClassify: '', //商品一级分类
          twoClassify: '', //商品二级分类
          threeClassify: '', //商品三级分类
          itemBrand: '',
          itemBrandName: '', //品牌名称
          itemBrandId: '', //商品品牌ID
          registerId:'', //商品注册证号
          isThrow: '', //是否推荐
        },
        rules: {
          itemId: [
            { required: true, message: '请填写商品编号', trigger: 'blur' }
          ],
          itemName: [
            { required: true, message: '请填写商品名称', trigger: 'blur' }
          ],
          type: [
            { type: 'array', required: true, message: '请选择商品分类', trigger: 'blur' }
          ],
          itemBrandName: [
            { required: true, message: '请选择品牌名称', trigger: 'blur' }
          ],
          registerId: [
            { required: true, message: '请填写注册证号', trigger: 'blur' }
          ],
          qian: [
            { required: true, message: '请选择是否乾币抵扣状态', trigger: 'change' }
          ]
        }, //验证规则
        tableData2: [],
        multipleSelection: [],
        dialogTableVisible: false,
        items: [],
        activeItems: [],
        active: false,
        no_active: false,
        input_sku: '',
        input_price: null,
        input_percent: '',
        input_coin: '',
        input_stock: null,
        input_enable: false,
        canUse: 0,
        activeTable: [],
        newArr: [],
      }
    },
    components: {
    },
    watch: {
      //监听属性变换表格
      activeTable: function() {
        var that = this;
        if (that.activeTable.length == 0) {
          that.active = false;
        }
      },
      shopType: function() {
        var that = this;
        if (that.shopType == 1) {
          that.chooseShopType = false;
          that.active = true;
          that.no_active = false;
        } else { 
          that.chooseShopType = true;
          that.active = false;
          that.no_active = true;
        }
      },
      ruleForm: {
        handler: function() {
          var that = this;
          if (that.ruleForm.type.length !== 0) {
            that.ruleForm.oneClassify = that.ruleForm.type[0];
            that.ruleForm.twoClassify = that.ruleForm.type[1];
            that.ruleForm.threeClassify = that.ruleForm.type[2];
            return false
          }
          // console.log(that.ruleForm)
        },
        deep: true
      },
      input_enable: function() {
        var that = this;
        if (that.input_enable == false) {
          that.canUse = 0;
        } else {
          that.canUse = 1;
        }
      }
    },
    created: function() {
      var that = this;
      //console.log(that.$route.params.ruleForm,'223232323');
      //that.ruleForm = that.$route.params.ruleForm;
      that.getItemId();
      that.getAllClassify();
      that.getAllProperty();
    },
    methods: {
      //获取获取商品编号
      getItemId: function() {
        var that = this;
        that.global.axiosGetReq('/item/getItemId').then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.ruleForm.itemId = res.data.msg;
            that.input_sku =  that.ruleForm.itemId + '1';
            // console.log(that.ruleForm.itemId);
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      //获取所有分类列表
      getAllClassify: function() {
        var that = this;
        that.global.axiosGetReq('/item/getAllClassifyAndBrand').then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.options = res.data.data.classifyList;
            that.brandOptions = res.data.data.itemBrandList;
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
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      //获取商品属性列表
      getAllProperty: function() {
        var that = this;
        that.global.axiosGetReq('/item/queryProperty').then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.tableData2 = res.data.data;
            for (var i = 0; i < that.tableData2.length; i++) {
              for(var k in that.tableData2[i].itempropertydList) {
                that.tableData2[i].itempropertydList[k].checked = false;
                // that.tableData2[i].itempropertydList[k].canUse = false;
              }
            }
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      // 获取商品品牌ID
      getBrandId: function(key) {
        var that = this;
        that.ruleForm.itemBrandId = parseInt(key.itemBrandId);
        that.ruleForm.itemBrandName = key.itemBrandName;
      },
      //返回商品列表
      retrunList: function() {
        var that = this
        that.$router.push({path: '/admin/merchantMessage'});
      },
      // 组件传值
      showMsgFromSecondStep: function(data) {
        var that = this
        that.secondStep = data
        that.firstStep = true
        //console.log(data);
      },
      //选择属性
      chooseType: function() {
        var that = this
        that.dialogTableVisible = true
      },
      //选择属性详细
      handleSelectionChange(val) {
        var that = this
        that.multipleSelection = val
        console.log(that.multipleSelection,'222');
      },
      //确定商品属性
      confirm_type: function() {
        var that = this
        that.items = that.multipleSelection.slice(0)
        that.multipleSelection.splice(0, that.multipleSelection.length)
        that.dialogTableVisible = false
        that.checkAllActive()
      },
      //删除已选属性
      removeDes: function(index) {
        var that = this
        that.items.splice(index, 1)
        that.checkAllActive()
      },
      //选择勾选属性
      checkAllActive: function() {
        var that = this
        that.activeItems = []
        that.setActiveItems({}, 0)
      },
      setActiveItems: function(tempItem, tempK) {
        var that = this
        var temp = 0
        for(var i = 0; i < this.items[tempK].itempropertydList.length; i++) {
          if (this.items[tempK].itempropertydList[i].checked == true) {
            // tempItem.push(this.items[tempK].itempropertydList[i])
            tempItem[this.items[tempK].itemPropertyName] = this.items[tempK].itempropertydList[i].itemPparam
            temp++
            this.items[tempK].hasItem = true
            if (tempK < this.items.length-1) {
              this.setActiveItems(tempItem, tempK + 1)
            } else {
              // this.activeItems.push(tempItem.slice(0))
              this.activeItems.push(that.global.extendCopy(tempItem))
              //console.log(this.activeItems)
            }
          }
        }
        if (temp == 0) {
          this.items[tempK].hasItem = false
          if (tempK < this.items.length-1) {
            this.setActiveItems(tempItem, ++tempK)
          } else {
            // this.activeItems.push(tempItem.slice(0))
            this.activeItems.push(that.global.extendCopy(tempItem))
            //console.log(this.activeItems)
          }
        }
      },
      nextToFirst: function() {
        var that = this;
        if (that.shopType !== '1') {
          var obj = {
            itemId: that.ruleForm.itemId,
            itemSKU: that.input_sku,
            itemSkuPrice: parseInt(that.input_price),
            tiChen: parseInt(that.input_percent),
            itemQb: parseInt(that.input_coin),
            stockNum: parseInt(that.input_stock),
            canUse: parseInt(that.canUse),
            itemPropertyName: '',
            itemPropertyInfo: '',
            itemPropertyNameTwo: '',
            itemPropertyTwoValue: '',
            itemPropertyNameThree: '',
            itemPropertyThreeValue: '',
            itemPropertyFourName: '',
            itemPropertyFourValue: '',
            itemPropertyFiveName: '',
            itemPropertyFiveValue: '',
            itemPropertySixName: '',
            itemPropertySixValue: '',
          }
          var subitem = [];
          subitem.push(obj);
          // var subitem = JSON.stringify(obj)
          that.ruleForm.itemValueList = subitem;
          that.ruleForm.isThrow = parseInt(that.ruleForm.isThrow);
          console.log(that.ruleForm,'223355');
          that.$router.push({ name: 'secondStep', params:{ ruleForm: that.ruleForm }});
        } else {
          var subitem = that.activeItems;
          for (var i = 0; i < that.activeItems.length; i++) {
            // subitem[i].itemSkuPrice = parseInt(that.activeItems[i].itemSkuPrice);
            // subitem[i].tiChen = parseInt(that.activeItems[i].tiChen);
            // subitem[i].itemQb = parseInt(that.activeItems[i].itemQb);
            // subitem[i].stockNum = parseInt(that.activeItems[i].stockNum);
              // if (subitem[i].canUse == true) {
              //   subitem[i].canUse = 1
              // } else {
              //   subitem[i].canUse = 0
              // }
              //subitem[i].itemSKU = 12345 + (i+1)
              // subitem[i].itemSKU = that.ruleForm.itemId + (i+1)
              // subitem[i].itemId = that.ruleForm.itemId
              delete subitem[i].itemSkuPrice
              delete subitem[i].tiChen
              delete subitem[i].itemQb
              delete subitem[i].stockNum
              delete subitem[i].canUse
              // delete that.activeItems[i].itemPropertyName
              var a = 0
              // arr = [['itemPropertyName','itemPropertyInfo'],['itemPropertyNameTwo','itemPropertyTwoValue'],['itemPropertyNameThree','itemPropertyThreeValue'],['itemPropertyFourName','itemPropertyFourValue'],['itemPropertyFiveName','itemPropertyFiveValue'],['itemPropertySixName','itemPropertySixValue']]
              for ( var k in that.activeItems[i]) {
                if (a == 0) {
                  subitem[i].itemPropertyName = k
                  subitem[i].itemPropertyInfo = that.activeItems[i][k]
                  subitem[i].itemPropertyNameTwo = ''
                  subitem[i].itemPropertyTwoValue = ''
                  subitem[i].itemPropertyNameThree = ''
                  subitem[i].itemPropertyThreeValue = ''
                  subitem[i].itemPropertyFourName = ''
                  subitem[i].itemPropertyFourValue = ''
                  subitem[i].itemPropertyFiveName = ''
                  subitem[i].itemPropertyFiveValue = ''
                  subitem[i].itemPropertySixName = ''
                  subitem[i].itemPropertySixValue = ''
                } else if (a == 1){
                  subitem[i].itemPropertyNameTwo = k
                  subitem[i].itemPropertyTwoValue = that.activeItems[i][k]
                  subitem[i].itemPropertyNameThree = ''
                  subitem[i].itemPropertyThreeValue = ''
                  subitem[i].itemPropertyFourName = ''
                  subitem[i].itemPropertyFourValue = ''
                  subitem[i].itemPropertyFiveName = ''
                  subitem[i].itemPropertyFiveValue = ''
                  subitem[i].itemPropertySixName = ''
                  subitem[i].itemPropertySixValue = ''
                } else if (a == 2){
                  subitem[i].itemPropertyNameThree = k
                  subitem[i].itemPropertyThreeValue = that.activeItems[i][k]
                  subitem[i].itemPropertyFourName = ''
                  subitem[i].itemPropertyFourValue = ''
                  subitem[i].itemPropertyFiveName = ''
                  subitem[i].itemPropertyFiveValue = ''
                  subitem[i].itemPropertySixName = ''
                  subitem[i].itemPropertySixValue = ''
                } else if (a == 3){
                  subitem[i].itemPropertyFourName = k
                  subitem[i].itemPropertyFourValue = that.activeItems[i][k]
                  subitem[i].itemPropertyFiveName = ''
                  subitem[i].itemPropertyFiveValue = ''
                } else if (a == 4){
                  subitem[i].itemPropertyFiveName = k
                  subitem[i].itemPropertyFiveValue = that.activeItems[i][k]
                  subitem[i].itemPropertySixName = ''
                  subitem[i].itemPropertySixValue = ''
                } else if (a == 5){
                  subitem[i].itemPropertySixName = k
                  subitem[i].itemPropertySixValue = that.activeItems[i][k]
                }
                // console.log(that.activeItems[i],"pp")
                a += 1;
                // console.log(subitem[i].itemPropertyName)
              }
              //that.activeItems[i].itemPropertyName = that.activeItems[i]
            }
            console.log(that.activeItems,'lll')
            // console.log(subitem,'p');
            that.ruleForm.itemValueList = subitem;
            that.ruleForm.isThrow = parseInt(that.ruleForm.isThrow);
            console.log(that.ruleForm,'223355');
            //that.$router.push({ name: 'secondStep', params:{ ruleForm: that.ruleForm }});
            // console.log(that.activeItems[i].canUse,'ee');
            // that.activeItems[i].canUse = that.activeItems[i].canUse;
            // that.get()
          //   for ( var k in that.activeItems[i]) {
          //     console.log(k,that.activeItems[i][k])
          //     subitem[i].itemPropertyName = k;
          //     subitem[i].itemPropertyInfo = that.activeItems[i][k]
          //     // var str = k + '=' + that.activeItems[i][k]
          //     // that.newArr.push(str);
          // }
        }
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
  text-align: center;
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
.elcheck {
  display: inline-block;
  position: relative;
  border: 1px solid #bfcbd9;
  border-radius: 4px;
  background-color: #fff;
  z-index: 1;
  transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
}
.elcheck:hover {
  border-color: #20a0ff;
}
</style>
