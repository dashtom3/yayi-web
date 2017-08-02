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
        <el-cascader class="cascader" :props="{value:'label'}" :options="options" :show-all-levels="false" v-model="ruleForm.type">
        </el-cascader>
      </el-form-item>
      <el-form-item label="品牌名称" prop="itemBrandId">
        <el-select v-model="ruleForm.itemBrandId" placeholder="请选择">
          <el-option v-for="brand in brandOptions" :key="brand" :label="brand.itemBrandName" :value="brand.itemBrandId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品类型" prop="itemSort">
        <el-select v-model="ruleForm.itemSort" placeholder="请选择">
          <el-option v-for="type in typeOptions" :key="type" :label="type.itemTypeName" :value="type.itemTypeName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="注册证号">
        <el-input v-model="ruleForm.registerId" style="width: 300px !important;"></el-input>
      </el-form-item>
      <el-form-item label="推荐" prop="isThrow">
        <el-radio-group v-model="ruleForm.isThrow">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品属性" prop="shopType">
        <el-radio class="radio" v-model="shopType" label="1">有</el-radio>
        <el-radio class="radio" v-model="shopType" label="2">无</el-radio>
        <el-button v-if="chooseShopType" type="primary" @click="chooseType()" :disabled='true'>选择属性</el-button>
        <el-button v-else type="primary" @click="chooseType()">选择属性</el-button>
      </el-form-item>
      <div class="active_box" v-for="(item,index) in items" :key="item">
        <span class="choose_title">{{item.itemPropertyName}}</span>
        <el-button type="primary" @click="removeDes(index)">删除</el-button>
        <div style="margin-top: 15px;">
          <el-checkbox v-for="sitem in item.itempropertydList" :label="sitem" :key="item" v-model="sitem.checked" @change="checkAllActive()">{{sitem.itemPparam}}</el-checkbox>
        </div>
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
            <span>{{ruleForm.itemId+1}}</span>
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
          <td v-for="(item,key) in activeItem" v-if="key != 'itemSkuPrice' && key != 'tiChen' && key != 'itemQb' && key != 'stockNum' && key != 'canUse'" >{{item}}</td>
          <td class="des_skuCode">
            <span>{{ruleForm.itemId+(index+1)}}</span>
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
        <el-button type="primary" @click="nextToFirst('ruleForm')">下一步</el-button>
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
          <div class="block">
            <!-- 分页 -->
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" layout="prev, pager, next, jumper" :total="totalCount" v-show="this.totalCount > this.pagesize">
            </el-pagination>
            <!-- 分页 -->
          </div>
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
        typeOptions: [{itemTypeName:'耗材类'},{itemTypeName:'工具设备类'}],
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
          itemBrandId: '', //商品品牌ID
          registerId:'', //商品注册证号
          isThrow: '', //是否推荐
          itemSort: '', //商品类型
          // itemBrand: '',
          // itemBrandName: '', //品牌名称
        },
        rules: {
          itemId: [
            { required: true, message: '请填写商品编号', trigger: 'blur' }
          ],
          itemName: [
            { required: true, message: '请填写商品名称', trigger: 'blur' }
          ],
          type: [
            { type: 'array', required: true, message: '请选择商品分类', trigger: 'change' }
          ],
          itemBrandId: [
            { type: 'number', required: true, message: '请选择品牌名称', trigger: 'change' }
          ],
          itemSort: [
            { required: true, message: '请选择商品类型', trigger: 'change' }
          ],
          registerId: [
            { required: true, message: '请填写注册证号', trigger: 'blur' }
          ],
          isThrow: [
            { required: true, message: '请选择是否推荐', trigger: 'change' }
          ],
          // shopType: [
          //   { required: true, message: '请选择是否添加商品属性', trigger: 'change' }
          // ]
        }, //验证规则
        tableData2: [],
        multipleSelection: [],
        dialogTableVisible: false,
        items: [],
        activeItems: [],
        active: false,
        no_active: false,
        input_sku: '',
        input_price: '',
        input_percent: '',
        input_coin: '',
        input_stock: '',
        input_enable: false,
        canUse: 0,
        activeTable: [],
        newArr: [],
        editCargo: {},
        //默认每页数据量
        pagesize: 10,
        //当前页码
        currentPage: 1,
        //默认数据总数
        totalCount: 0,
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
      that.editCargo = JSON.parse(window.sessionStorage.getItem('editCargo'))
      if (that.$route.params.ruleForm == undefined) {
        // 编辑商品进入时
        if (that.editCargo !== null ) {
          that.getAllClassify();
          that.getAllProperty();
          that.ruleForm.itemId = that.editCargo.itemId;
          that.ruleForm.itemName = that.editCargo.itemName;
          that.ruleForm.oneClassify = that.editCargo.oneClassify;
          that.ruleForm.twoClassify = that.editCargo.twoClassify;
          that.ruleForm.threeClassify = that.editCargo.threeClassify;
          that.ruleForm.type.push(that.editCargo.oneClassify,that.editCargo.twoClassify,that.editCargo.threeClassify);
          that.ruleForm.itemBrandId = that.editCargo.itemBrand.itemBrandId;
          that.ruleForm.registerId = that.editCargo.itemDetail.registerId;
          that.ruleForm.isThrow = String(that.editCargo.isThrow);
          that.ruleForm.itemSort = that.editCargo.itemSort;
          that.shopType = that.editCargo.shopType;
          that.input_price = String(that.editCargo.itemValueList[0].itemSkuPrice)
          that.input_sku = that.editCargo.itemValueList[0].itemSKU
          that.input_percent = that.editCargo.itemValueList[0].tiChen
          that.input_coin = that.editCargo.itemValueList[0].itemQb
          that.input_stock = String(that.editCargo.itemValueList[0].stockNum)
          if (that.editCargo.itemValueList[0].canUse == 1) {
            that.input_enable = true
          } else {
            that.input_enable = false
          }
          for (var i = 0; i < that.editCargo.itemValueList.length; i++) {
            delete that.editCargo.itemValueList[i].itemPropertyName
            delete that.editCargo.itemValueList[i].itemPropertyInfo
            delete that.editCargo.itemValueList[i].itemPropertyNameTwo
            delete that.editCargo.itemValueList[i].itemPropertyTwoValue
            delete that.editCargo.itemValueList[i].itemPropertyNameThree
            delete that.editCargo.itemValueList[i].itemPropertyThreeValue
            delete that.editCargo.itemValueList[i].itemPropertyFourName
            delete that.editCargo.itemValueList[i].itemPropertyFourValue
            delete that.editCargo.itemValueList[i].itemPropertyFiveName
            delete that.editCargo.itemValueList[i].itemPropertyFiveValue
            delete that.editCargo.itemValueList[i].itemPropertySixName
            delete that.editCargo.itemValueList[i].itemPropertySixValue
          }
          that.activeItems = that.editCargo.itemValueList
          that.items = that.editCargo.propertyList.filter(function(ele,index,arr) {
              return ele.propertyName !== '';   
          });
          for (var i = 0; i < that.items.length; i++) {
            that.items[i].itemPropertyName = that.items[i].propertyName
            that.items[i].hasItem = true 
            //b[i].itempropertydList = b[i].propertyInfoList
            var obj = {
              itemPropertyName: that.items[i].propertyName
            }
            that.global.axiosPostReq('/item/queryProperty',obj).then((res) => {
                if (res.data.callStatus === 'SUCCEED') {
                  console.log(res.data.data[0].itempropertydList,'search')
                  // that.items[i].itempropertydList = new Array()
                    that.items[i].itempropertydList = res.data.data[0].itempropertydList
                } else {
                  that.$message.error('网络出错，请稍后再试！');
                }
            })
          }
          // console.log(that.activeItems,'bbbbbb')
        } else { // 添加商品进入时
          that.getItemId()
          that.getAllClassify()
          that.getAllProperty()
        }
      } else {
        // 添加商品时如果商品属性返回是
        if (that.$route.params.ruleForm.shopType == '1') {
          that.ruleForm = that.$route.params.ruleForm
          that.ruleForm.isThrow = String(that.$route.params.ruleForm.isThrow)
          that.items = that.$route.params.ruleForm.items
          that.shopType = that.ruleForm.shopType
          that.getAllClassify()
          that.getAllProperty()
          let activeItems = JSON.parse(window.sessionStorage.getItem('editChange'))
          for (var i = 0; i < activeItems[i].length; i++) {
            if (that.activeItems[i].canUse == 1) {
              that.activeItems[i].canUse = true
            } else {
              that.activeItems[i].canUse = false
            }
          }
          that.activeItems = activeItems
          console.log(that.activeItems,'Yes')
        } 
        else { // 添加商品时如果商品属性返回否
          if (that.$route.params.ruleForm.itemValueList[0].canUse == 1) {
            that.input_enable = true
          } else {
            that.input_enable = false
          }
          that.ruleForm = that.$route.params.ruleForm
          that.ruleForm.isThrow = String(that.$route.params.ruleForm.isThrow)
          that.shopType = that.ruleForm.shopType
          that.input_price = that.$route.params.ruleForm.itemValueList[0].itemSkuPrice
          that.input_sku = that.$route.params.ruleForm.itemValueList[0].itemSKU
          that.input_percent = that.$route.params.ruleForm.itemValueList[0].tiChen
          that.input_coin = that.$route.params.ruleForm.itemValueList[0].itemQb
          that.input_stock = that.$route.params.ruleForm.itemValueList[0].stockNum
          that.getAllClassify()
          that.getAllProperty()
        }
      }
    },
    methods: {
      handleCurrentChange(val) {
        var that = this
        that.currentPage = val
        that.getAllProperty()
        // that.search(val)
      },
      //获取获取商品编号
      getItemId: function() {
        var that = this;
        that.global.axiosGetReq('/item/getItemId').then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.ruleForm.itemId = res.data.msg;
            that.input_sku =  that.ruleForm.itemId + '1';
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
        var obj = {
          currentPage: that.currentPage,
          numberPerPage: that.pagesize,
          // numberPerPage: 500,
        }
        that.global.axiosGetReq('/item/queryProperty',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            console.log(res.data,'lihui')
            that.tableData2 = res.data.data
            that.totalCount = res.data.totalNumber;
            for (var i = 0; i < that.tableData2.length; i++) {
              for(var k in that.tableData2[i].itempropertydList) {
                that.tableData2[i].itempropertydList[k].checked = false;
              }
            }
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
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
        // console.log(that.multipleSelection,'222');
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
            tempItem[this.items[tempK].itemPropertyName] = this.items[tempK].itempropertydList[i].itemPparam
            temp++
            this.items[tempK].hasItem = true
            if (tempK < this.items.length-1) {
              this.setActiveItems(tempItem, tempK + 1)
            } else {
              this.activeItems.push(that.global.extendCopy(tempItem))
            }
          }
        }
        if (temp == 0) {
          this.items[tempK].hasItem = false
          if (tempK < this.items.length-1) {
            this.setActiveItems(tempItem, ++tempK)
          } else {
            this.activeItems.push(that.global.extendCopy(tempItem))
          }
        }
      },
      nextToFirst: function(formName) {
        var that = this;
        that.$refs[formName].validate((valid) => {
          if (that.shopType == '') {
            that.$message.error('请选择是否添加商品属性！');
            return false
          }
          if (valid) {
            if (that.shopType !== '1') {
              if (isNaN(that.input_price) || isNaN(that.input_stock) || that.input_price == '' || that.input_stock == '') {
                that.$message.error('请填写完整商品资料！价格，库存不能为空');
                return false
              }
              var obj = {
                itemId: that.ruleForm.itemId,
                itemSKU: that.ruleForm.itemId + '1',
                itemSkuPrice: that.input_price,
                tiChen: that.input_percent,
                itemQb: that.input_coin,
                stockNum: that.input_stock,
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
              var subitem = []
              subitem.push(obj)
              // var subitem = JSON.stringify(obj)
              that.ruleForm.itemValueList = subitem
              // that.ruleForm.isThrow = parseInt(that.ruleForm.isThrow)
              that.ruleForm.shopType = that.shopType
              console.log(that.ruleForm,'223355')
              that.$router.push({ name: 'secondStep', params:{ ruleForm: that.ruleForm, editCargo:that.editCargo}})
            } else {
              window.sessionStorage.setItem('editChange', JSON.stringify(that.activeItems))
              var subitem = that.activeItems
              for (var i = 0; i < that.activeItems.length; i++) {
                subitem[i].itemSkuPrice = String(that.activeItems[i].itemSkuPrice)
                subitem[i].stockNum = String(that.activeItems[i].stockNum)
                if (isNaN(subitem[i].itemSkuPrice) || isNaN(subitem[i].stockNum) || subitem[i].itemSkuPrice == '' || subitem[i].stockNum == '') {
                  that.$message.error('请填写完整商品资料！价格，库存不能为空');
                  return false
                }
                subitem[i].itemSKU = that.ruleForm.itemId + (i+1)
                subitem[i].itemId = that.ruleForm.itemId
                subitem[i].tiChen = that.activeItems[i].tiChen
                subitem[i].itemQb = that.activeItems[i].itemQb
                if (subitem[i].canUse == true) {
                  subitem[i].canUse = 1
                } else {
                  subitem[i].canUse = 0
                }
              }
              console.log(subitem,'tttt')
              window.sessionStorage.setItem('property', JSON.stringify(subitem))
              for (var i = 0; i < subitem.length; i++) {
                  delete subitem[i].itemSkuPrice
                  delete subitem[i].tiChen
                  delete subitem[i].itemQb
                  delete subitem[i].stockNum
                  delete subitem[i].canUse
                  delete subitem[i].itemId
                  delete subitem[i].itemSKU
                  delete subitem[i].itemPropertyName
                  delete subitem[i].itemPropertyInfo
                  delete subitem[i].itemPropertyNameTwo
                  delete subitem[i].itemPropertyTwoValue
                  delete subitem[i].itemPropertyNameThree
                  delete subitem[i].itemPropertyThreeValue
                  delete subitem[i].itemPropertyFourName
                  delete subitem[i].itemPropertyFourValue
                  delete subitem[i].itemPropertyFiveName
                  delete subitem[i].itemPropertyFiveValue
                  delete subitem[i].itemPropertySixName
                  delete subitem[i].itemPropertySixValue
                  var a = 0
                  for ( var k in subitem[i]) {
                    if (a == 0) {
                      subitem[i].itemPropertyName = k
                      subitem[i].itemPropertyInfo = subitem[i][k]
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
                      subitem[i].itemPropertyTwoValue = subitem[i][k]
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
                      subitem[i].itemPropertyThreeValue = subitem[i][k]
                      subitem[i].itemPropertyFourName = ''
                      subitem[i].itemPropertyFourValue = ''
                      subitem[i].itemPropertyFiveName = ''
                      subitem[i].itemPropertyFiveValue = ''
                      subitem[i].itemPropertySixName = ''
                      subitem[i].itemPropertySixValue = ''
                    } else if (a == 3){
                      subitem[i].itemPropertyFourName = k
                      subitem[i].itemPropertyFourValue = subitem[i][k]
                      subitem[i].itemPropertyFiveName = ''
                      subitem[i].itemPropertyFiveValue = ''
                    } else if (a == 4){
                      subitem[i].itemPropertyFiveName = k
                      subitem[i].itemPropertyFiveValue = subitem[i][k]
                      subitem[i].itemPropertySixName = ''
                      subitem[i].itemPropertySixValue = ''
                    } else if (a == 5){
                      subitem[i].itemPropertySixName = k
                      subitem[i].itemPropertySixValue = subitem[i][k]
                    }
                    a += 1
                  }
              }
              that.newArr = JSON.parse(window.sessionStorage.getItem('property'))
                for (var i = 0; i < subitem.length; i++) {
                  that.newArr[i] = Object.assign(subitem[i],that.newArr[i])
                }
                that.ruleForm.itemValueList = that.newArr
                that.ruleForm.shopType = that.shopType //是否有商品属性
                that.ruleForm.items = that.items //选择商品的属性
                console.log(that.ruleForm, that.newArr,'223355');
                that.$router.push({ name: 'secondStep', params:{ ruleForm: that.ruleForm }})
            }
          } else {
            console.log('error submit!!')
            return false;
          }
        });
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
