webpackJsonp([28],{

/***/ 306:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(668)
}
var Component = __webpack_require__(8)(
  /* script */
  __webpack_require__(433),
  /* template */
  __webpack_require__(790),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-775ae044",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 433:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'addMerchandise',
  data() {
    return {
      options: [],
      brandOptions: [],
      typeOptions: [{ itemTypeName: '耗材类' }, { itemTypeName: '工具设备类' }],
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
        // itemBrand: '',
        // itemBrandName: '', //品牌名称
        itemBrandId: '', //商品品牌ID
        registerId: '', //商品注册证号
        isThrow: '', //是否推荐
        itemSort: '' //商品类型
      },
      rules: {
        itemId: [{ required: true, message: '请填写商品编号', trigger: 'blur' }],
        itemName: [{ required: true, message: '请填写商品名称', trigger: 'blur' }],
        type: [{ type: 'array', required: true, message: '请选择商品分类', trigger: 'blur' }],
        itemBrandId: [{ required: true, message: '请选择品牌名称', trigger: 'blur' }],
        itemSort: [{ required: true, message: '请选择商品类型', trigger: 'blur' }],
        registerId: [{ required: true, message: '请填写注册证号', trigger: 'blur' }],
        isThrow: [{ required: true, message: '请选择是否推荐', trigger: 'blur' }]
        // shopType: [
        //   { required: true, message: '请选择是否添加商品属性', trigger: 'blur' }
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
      input_price: null,
      input_percent: '',
      input_coin: '',
      input_stock: null,
      input_enable: false,
      canUse: 0,
      activeTable: [],
      newArr: [],
      editCargo: {}
    };
  },
  components: {},
  watch: {
    //监听属性变换表格
    activeTable: function () {
      var that = this;
      if (that.activeTable.length == 0) {
        that.active = false;
      }
    },
    shopType: function () {
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
      handler: function () {
        var that = this;
        if (that.ruleForm.type.length !== 0) {
          that.ruleForm.oneClassify = that.ruleForm.type[0];
          that.ruleForm.twoClassify = that.ruleForm.type[1];
          that.ruleForm.threeClassify = that.ruleForm.type[2];
          return false;
        }
        // console.log(that.ruleForm)
      },
      deep: true
    },
    input_enable: function () {
      var that = this;
      if (that.input_enable == false) {
        that.canUse = 0;
      } else {
        that.canUse = 1;
      }
    }
  },
  created: function () {
    var that = this;
    that.editCargo = JSON.parse(window.sessionStorage.getItem('editCargo'));
    if (that.$route.params.ruleForm == undefined) {
      if (that.editCargo !== null) {
        that.getAllClassify();
        that.getAllProperty();
        that.ruleForm.itemId = that.editCargo.itemId;
        that.ruleForm.itemName = that.editCargo.itemName;
        that.ruleForm.oneClassify = that.editCargo.oneClassify;
        that.ruleForm.twoClassify = that.editCargo.twoClassify;
        that.ruleForm.threeClassify = that.editCargo.threeClassify;
        that.ruleForm.type.push(that.editCargo.oneClassify, that.editCargo.twoClassify, that.editCargo.threeClassify);
        // that.ruleForm.itemBrand = that.editCargo.itemBrand.itemBrandName;
        // that.ruleForm.itemBrandName = that.editCargo.itemBrand.itemBrandName;
        that.ruleForm.itemBrandId = that.editCargo.itemBrand.itemBrandId;
        that.ruleForm.registerId = that.editCargo.itemDetail.registerId;
        that.ruleForm.isThrow = that.editCargo.itemDetail.isThrow;
      } else {
        that.getItemId();
        that.getAllClassify();
        that.getAllProperty();
      }
    } else {
      // if (that.$route.params.ruleForm.itemBrand.itemBrandName == undefined) {
      //   that.ruleForm.itemBrand = that.ruleForm.itemBrandName
      // }
      that.ruleForm = that.$route.params.ruleForm;
      that.ruleForm.isThrow = String(that.$route.params.ruleForm.isThrow);
      that.getAllClassify();
      that.getAllProperty();
      console.log(that.ruleForm, 'kk');
    }

    // console.log(that.ruleForm);
  },
  methods: {
    //获取获取商品编号
    getItemId: function () {
      var that = this;
      that.global.axiosGetReq('/item/getItemId').then(res => {
        if (res.data.callStatus === 'SUCCEED') {
          that.ruleForm.itemId = res.data.msg;
          that.input_sku = that.ruleForm.itemId + '1';
          // console.log(that.ruleForm.itemId);
        } else {
          that.$message.error('网络出错，请稍后再试！');
        }
      });
    },
    //获取所有分类列表
    getAllClassify: function () {
      var that = this;
      that.global.axiosGetReq('/item/getAllClassifyAndBrand').then(res => {
        if (res.data.callStatus === 'SUCCEED') {
          that.options = res.data.data.classifyList;
          that.brandOptions = res.data.data.itemBrandList;
          for (var i = 0; i < that.options.length; i++) {
            that.options[i].label = that.options[i].oneClassify;
            that.options[i].children = that.options[i].classifyTwoList;
            for (var k in that.options[i].children) {
              that.options[i].children[k].label = that.options[i].children[k].classifyTwoName;
              that.options[i].children[k].children = that.options[i].children[k].classifyThreeList;
              for (var j in that.options[i].children[k].children) {
                that.options[i].children[k].children[j].label = that.options[i].children[k].children[j].classifyThreeName;
              }
            }
          }
        } else {
          that.$message.error('网络出错，请稍后再试！');
        }
      });
    },
    //获取商品属性列表
    getAllProperty: function () {
      var that = this;
      that.global.axiosGetReq('/item/queryProperty').then(res => {
        if (res.data.callStatus === 'SUCCEED') {
          that.tableData2 = res.data.data;
          for (var i = 0; i < that.tableData2.length; i++) {
            for (var k in that.tableData2[i].itempropertydList) {
              that.tableData2[i].itempropertydList[k].checked = false;
              // that.tableData2[i].itempropertydList[k].canUse = false;
            }
          }
        } else {
          that.$message.error('网络出错，请稍后再试！');
        }
      });
    },
    // 获取商品品牌ID
    // getBrandId: function(key) {
    //   var that = this;
    //   that.ruleForm.itemBrandId = parseInt(key.itemBrandId);
    //   that.ruleForm.itemBrandName = key.itemBrandName;
    // },
    //返回商品列表
    retrunList: function () {
      var that = this;
      that.$router.push({ path: '/admin/merchantMessage' });
    },
    // 组件传值
    showMsgFromSecondStep: function (data) {
      var that = this;
      that.secondStep = data;
      that.firstStep = true;
      //console.log(data);
    },
    //选择属性
    chooseType: function () {
      var that = this;
      that.dialogTableVisible = true;
    },
    //选择属性详细
    handleSelectionChange(val) {
      var that = this;
      that.multipleSelection = val;
      console.log(that.multipleSelection, '222');
    },
    //确定商品属性
    confirm_type: function () {
      var that = this;
      that.items = that.multipleSelection.slice(0);
      that.multipleSelection.splice(0, that.multipleSelection.length);
      that.dialogTableVisible = false;
      that.checkAllActive();
    },
    //删除已选属性
    removeDes: function (index) {
      var that = this;
      that.items.splice(index, 1);
      that.checkAllActive();
    },
    //选择勾选属性
    checkAllActive: function () {
      var that = this;
      that.activeItems = [];
      that.setActiveItems({}, 0);
    },
    setActiveItems: function (tempItem, tempK) {
      var that = this;
      var temp = 0;
      for (var i = 0; i < this.items[tempK].itempropertydList.length; i++) {
        if (this.items[tempK].itempropertydList[i].checked == true) {
          // tempItem.push(this.items[tempK].itempropertydList[i])
          tempItem[this.items[tempK].itemPropertyName] = this.items[tempK].itempropertydList[i].itemPparam;
          temp++;
          this.items[tempK].hasItem = true;
          if (tempK < this.items.length - 1) {
            this.setActiveItems(tempItem, tempK + 1);
          } else {
            // this.activeItems.push(tempItem.slice(0))
            this.activeItems.push(that.global.extendCopy(tempItem)
            //console.log(this.activeItems)
            );
          }
        }
      }
      if (temp == 0) {
        this.items[tempK].hasItem = false;
        if (tempK < this.items.length - 1) {
          this.setActiveItems(tempItem, ++tempK);
        } else {
          // this.activeItems.push(tempItem.slice(0))
          this.activeItems.push(that.global.extendCopy(tempItem)
          //console.log(this.activeItems)
          );
        }
      }
    },
    nextToFirst: function (formName) {
      var that = this;
      console.log(that.ruleForm.itemBrand);
      that.$refs[formName].validate(valid => {
        if (valid) {
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
              itemPropertySixValue: ''
            };
            var subitem = [];
            subitem.push(obj);
            // var subitem = JSON.stringify(obj)
            that.ruleForm.itemValueList = subitem;
            that.ruleForm.isThrow = parseInt(that.ruleForm.isThrow);
            console.log(that.ruleForm, '223355');
            that.$router.push({ name: 'secondStep', params: { ruleForm: that.ruleForm, editCargo: that.editCargo } });
          } else {
            var subitem = that.activeItems;
            for (var i = 0; i < that.activeItems.length; i++) {
              subitem[i].itemSKU = that.ruleForm.itemId + (i + 1);
              subitem[i].itemId = that.ruleForm.itemId;
              subitem[i].itemSkuPrice = parseInt(that.activeItems[i].itemSkuPrice);
              subitem[i].tiChen = parseInt(that.activeItems[i].tiChen);
              subitem[i].itemQb = parseInt(that.activeItems[i].itemQb);
              subitem[i].stockNum = parseInt(that.activeItems[i].stockNum);
              if (subitem[i].canUse == true) {
                subitem[i].canUse = 1;
              } else {
                subitem[i].canUse = 0;
              }
            }
            window.sessionStorage.setItem('property', JSON.stringify(subitem));
            for (var i = 0; i < subitem.length; i++) {
              delete subitem[i].itemSkuPrice;
              delete subitem[i].tiChen;
              delete subitem[i].itemQb;
              delete subitem[i].stockNum;
              delete subitem[i].canUse;
              delete subitem[i].itemId;
              delete subitem[i].itemSKU;
              delete subitem[i].itemPropertyName;
              delete subitem[i].itemPropertyInfo;
              delete subitem[i].itemPropertyNameTwo;
              delete subitem[i].itemPropertyTwoValue;
              delete subitem[i].itemPropertyNameThree;
              delete subitem[i].itemPropertyThreeValue;
              delete subitem[i].itemPropertyFourName;
              delete subitem[i].itemPropertyFourValue;
              delete subitem[i].itemPropertyFiveName;
              delete subitem[i].itemPropertyFiveValue;
              delete subitem[i].itemPropertySixName;
              delete subitem[i].itemPropertySixValue;
              var a = 0;
              for (var k in subitem[i]) {
                if (a == 0) {
                  subitem[i].itemPropertyName = k;
                  subitem[i].itemPropertyInfo = subitem[i][k];
                  subitem[i].itemPropertyNameTwo = '';
                  subitem[i].itemPropertyTwoValue = '';
                  subitem[i].itemPropertyNameThree = '';
                  subitem[i].itemPropertyThreeValue = '';
                  subitem[i].itemPropertyFourName = '';
                  subitem[i].itemPropertyFourValue = '';
                  subitem[i].itemPropertyFiveName = '';
                  subitem[i].itemPropertyFiveValue = '';
                  subitem[i].itemPropertySixName = '';
                  subitem[i].itemPropertySixValue = '';
                } else if (a == 1) {
                  subitem[i].itemPropertyNameTwo = k;
                  subitem[i].itemPropertyTwoValue = subitem[i][k];
                  subitem[i].itemPropertyNameThree = '';
                  subitem[i].itemPropertyThreeValue = '';
                  subitem[i].itemPropertyFourName = '';
                  subitem[i].itemPropertyFourValue = '';
                  subitem[i].itemPropertyFiveName = '';
                  subitem[i].itemPropertyFiveValue = '';
                  subitem[i].itemPropertySixName = '';
                  subitem[i].itemPropertySixValue = '';
                } else if (a == 2) {
                  subitem[i].itemPropertyNameThree = k;
                  subitem[i].itemPropertyThreeValue = subitem[i][k];
                  subitem[i].itemPropertyFourName = '';
                  subitem[i].itemPropertyFourValue = '';
                  subitem[i].itemPropertyFiveName = '';
                  subitem[i].itemPropertyFiveValue = '';
                  subitem[i].itemPropertySixName = '';
                  subitem[i].itemPropertySixValue = '';
                } else if (a == 3) {
                  subitem[i].itemPropertyFourName = k;
                  subitem[i].itemPropertyFourValue = subitem[i][k];
                  subitem[i].itemPropertyFiveName = '';
                  subitem[i].itemPropertyFiveValue = '';
                } else if (a == 4) {
                  subitem[i].itemPropertyFiveName = k;
                  subitem[i].itemPropertyFiveValue = subitem[i][k];
                  subitem[i].itemPropertySixName = '';
                  subitem[i].itemPropertySixValue = '';
                } else if (a == 5) {
                  subitem[i].itemPropertySixName = k;
                  subitem[i].itemPropertySixValue = subitem[i][k];
                }
                a += 1;
              }
            }
            that.newArr = JSON.parse(window.sessionStorage.getItem('property'));
            console.log(subitem, 'lll');
            for (var i = 0; i < subitem.length; i++) {
              that.newArr[i] = Object.assign(subitem[i], that.newArr[i]);
            }
            console.log(that.newArr, 'sheng');
            that.ruleForm.itemValueList = that.newArr;
            that.ruleForm.isThrow = parseInt(that.ruleForm.isThrow);
            //console.log(that.ruleForm, that.newArr,'223355');
            that.$router.push({ name: 'secondStep', params: { ruleForm: that.ruleForm } });
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
});

/***/ }),

/***/ 541:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(293)(true);
// imports


// module
exports.push([module.i, "table[data-v-775ae044]{border-collapse:collapse;border-spacing:0}td[data-v-775ae044],th[data-v-775ae044]{padding:0}td[data-v-775ae044]{height:36px;line-height:36px;text-align:center}.left[data-v-775ae044]{float:left}.el-input[data-v-775ae044]{width:80%!important;padding-right:0!important}.retrunList[data-v-775ae044]{float:right;cursor:pointer}.retrunList[data-v-775ae044]:hover{color:#5db7e7;transition:all .5s ease}.choose_title[data-v-775ae044]{font-size:14px;color:#48576a;margin-right:20px}.active_box[data-v-775ae044]{margin-left:100px;padding-bottom:10px;border-bottom:1px solid #eaeaea;margin-bottom:20px}.btn_box[data-v-775ae044]{margin-top:20px;text-align:right}.activeTable_box[data-v-775ae044]{width:100%;border:1px solid #dfe6ec}.activeTable_title[data-v-775ae044]{width:100%;height:40px;line-height:40px;border-bottom:1px solid #dfe6ec}.coin[data-v-775ae044],.des_coin[data-v-775ae044],.des_percent[data-v-775ae044],.des_price[data-v-775ae044],.des_skuCode[data-v-775ae044],.des_stock[data-v-775ae044],.percent[data-v-775ae044],.price[data-v-775ae044],.skuCode[data-v-775ae044],.stock[data-v-775ae044]{width:12.5%;text-align:center;font-size:14px;border-right:1px solid #dfe6ec}.des_enable[data-v-775ae044],.enable[data-v-775ae044]{width:12.5%;text-align:center;font-size:14px}.activeTable_des[data-v-775ae044]{width:100%;border-bottom:1px solid #dfe6ec}.elcheck[data-v-775ae044]{display:inline-block;position:relative;border:1px solid #bfcbd9;border-radius:4px;background-color:#fff;z-index:1;transition:border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46)}.elcheck[data-v-775ae044]:hover{border-color:#20a0ff}", "", {"version":3,"sources":["/Users/daifeili/yayi-web/src/components/admin/merchantMessage/addMerchandise.vue"],"names":[],"mappings":"AACA,uBACC,yBAAyB,AACzB,gBAAiB,CACjB,AACD,wCACC,SAAW,CACX,AACD,oBACE,YAAa,AACb,iBAAkB,AAClB,iBAAmB,CACpB,AACD,uBACE,UAAY,CACb,AACD,2BACE,oBAAsB,AACtB,yBAA8B,CAC/B,AACD,6BACE,YAAa,AACb,cAAgB,CACjB,AACD,mCACE,cAAe,AACf,uBAA0B,CAC3B,AACD,+BACE,eAAgB,AAChB,cAAe,AACf,iBAAmB,CACpB,AACD,6BACE,kBAAmB,AACnB,oBAAqB,AACrB,gCAAiC,AACjC,kBAAoB,CACrB,AACD,0BACE,gBAAiB,AACjB,gBAAkB,CACnB,AACD,kCACE,WAAY,AACZ,wBAA0B,CAC3B,AACD,oCACE,WAAY,AACZ,YAAa,AACb,iBAAkB,AAClB,+BAAiC,CAClC,AAyBD,0QACE,YAAa,AACb,kBAAmB,AACnB,eAAgB,AAChB,8BAAgC,CACjC,AACD,sDACE,YAAa,AACb,kBAAmB,AACnB,cAAgB,CACjB,AACD,kCACE,WAAY,AAGZ,+BAAiC,CAClC,AACD,0BACE,qBAAsB,AACtB,kBAAmB,AACnB,yBAA0B,AAC1B,kBAAmB,AACnB,sBAAuB,AACvB,UAAW,AACX,kHAAoH,CACrH,AACD,gCACE,oBAAsB,CACvB","file":"addMerchandise.vue","sourcesContent":["\ntable[data-v-775ae044] {\n border-collapse:collapse;\n border-spacing:0;\n}\nth[data-v-775ae044],td[data-v-775ae044] {\n padding: 0;\n}\ntd[data-v-775ae044] {\n  height: 36px;\n  line-height: 36px;\n  text-align: center;\n}\n.left[data-v-775ae044] {\n  float: left;\n}\n.el-input[data-v-775ae044]  {\n  width: 80% !important;\n  padding-right: 0px !important;\n}\n.retrunList[data-v-775ae044] {\n  float: right;\n  cursor: pointer;\n}\n.retrunList[data-v-775ae044]:hover{\n  color: #5DB7E7;\n  transition: all ease 0.5s;\n}\n.choose_title[data-v-775ae044] {\n  font-size: 14px;\n  color: #48576a;\n  margin-right: 20px;\n}\n.active_box[data-v-775ae044] {\n  margin-left: 100px;\n  padding-bottom: 10px;\n  border-bottom: 1px solid #eaeaea;\n  margin-bottom: 20px;\n}\n.btn_box[data-v-775ae044] {\n  margin-top: 20px;\n  text-align: right;\n}\n.activeTable_box[data-v-775ae044] {\n  width: 100%;\n  border: 1px solid #dfe6ec;\n}\n.activeTable_title[data-v-775ae044] {\n  width: 100%;\n  height: 40px;\n  line-height: 40px;\n  border-bottom: 1px solid #dfe6ec;\n}\n.skuCode[data-v-775ae044], .des_skuCode[data-v-775ae044]{\n  width: 12.5%;\n  text-align: center;\n  font-size: 14px;\n  border-right: 1px solid #dfe6ec;\n}\n.price[data-v-775ae044], .des_price[data-v-775ae044]{\n  width: 12.5%;\n  text-align: center;\n  font-size: 14px;\n  border-right: 1px solid #dfe6ec;\n}\n.percent[data-v-775ae044], .des_percent[data-v-775ae044]{\n  width: 12.5%;\n  text-align: center;\n  font-size: 14px;\n  border-right: 1px solid #dfe6ec;\n}\n.coin[data-v-775ae044], .des_coin[data-v-775ae044]{\n  width: 12.5%;\n  text-align: center;\n  font-size: 14px;\n  border-right: 1px solid #dfe6ec;\n}\n.stock[data-v-775ae044], .des_stock[data-v-775ae044]{\n  width: 12.5%;\n  text-align: center;\n  font-size: 14px;\n  border-right: 1px solid #dfe6ec;\n}\n.enable[data-v-775ae044], .des_enable[data-v-775ae044]{\n  width: 12.5%;\n  text-align: center;\n  font-size: 14px;\n}\n.activeTable_des[data-v-775ae044] {\n  width: 100%;\n  /*height: 100px;*/\n  /*line-height: 100px;*/\n  border-bottom: 1px solid #dfe6ec;\n}\n.elcheck[data-v-775ae044] {\n  display: inline-block;\n  position: relative;\n  border: 1px solid #bfcbd9;\n  border-radius: 4px;\n  background-color: #fff;\n  z-index: 1;\n  transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);\n}\n.elcheck[data-v-775ae044]:hover {\n  border-color: #20a0ff;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 668:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(541);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(294)("3a5e4eb3", content, true);

/***/ }),

/***/ 790:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "addMerchandise"
  }, [_c('el-row', {
    staticClass: "warp"
  }, [_c('el-col', {
    staticClass: "warp-breadcrum",
    attrs: {
      "span": 24
    }
  }, [_c('el-breadcrumb', {
    attrs: {
      "separator": "/"
    }
  }, [_c('el-breadcrumb-item', {
    attrs: {
      "to": {
        path: '/admin/merchantMessage'
      }
    }
  }, [_c('b', [_vm._v("商品信息管理")])]), _vm._v(" "), _c('div', {
    staticClass: "retrunList",
    on: {
      "click": _vm.retrunList
    }
  }, [_vm._v("返回商品列表")]), _vm._v(" "), _c('el-breadcrumb-item', [_vm._v("添加商品")])], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "clearfix"
  }), _vm._v(" "), _c('el-form', {
    ref: "ruleForm",
    staticClass: "demo-ruleForm",
    staticStyle: {
      "margin-top": "20px"
    },
    attrs: {
      "model": _vm.ruleForm,
      "rules": _vm.rules,
      "label-width": "100px"
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "商品编号",
      "prop": "itemId"
    }
  }, [_c('el-input', {
    staticStyle: {
      "width": "300px !important"
    },
    attrs: {
      "disabled": true
    },
    model: {
      value: (_vm.ruleForm.itemId),
      callback: function($$v) {
        _vm.ruleForm.itemId = $$v
      },
      expression: "ruleForm.itemId"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "商品名称",
      "prop": "itemName"
    }
  }, [_c('el-input', {
    staticStyle: {
      "width": "300px !important"
    },
    model: {
      value: (_vm.ruleForm.itemName),
      callback: function($$v) {
        _vm.ruleForm.itemName = $$v
      },
      expression: "ruleForm.itemName"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "商品分类",
      "prop": "type"
    }
  }, [_c('el-cascader', {
    staticClass: "cascader",
    attrs: {
      "props": {
        value: 'label'
      },
      "options": _vm.options,
      "show-all-levels": false,
      "change-on-select": ""
    },
    model: {
      value: (_vm.ruleForm.type),
      callback: function($$v) {
        _vm.ruleForm.type = $$v
      },
      expression: "ruleForm.type"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "品牌名称",
      "prop": "itemBrandId"
    }
  }, [_c('el-select', {
    attrs: {
      "placeholder": "请选择"
    },
    model: {
      value: (_vm.ruleForm.itemBrandId),
      callback: function($$v) {
        _vm.ruleForm.itemBrandId = $$v
      },
      expression: "ruleForm.itemBrandId"
    }
  }, _vm._l((_vm.brandOptions), function(brand) {
    return _c('el-option', {
      key: brand,
      attrs: {
        "label": brand.itemBrandName,
        "value": brand.itemBrandId
      }
    })
  }))], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "商品类型",
      "prop": "itemSort"
    }
  }, [_c('el-select', {
    attrs: {
      "placeholder": "请选择"
    },
    model: {
      value: (_vm.ruleForm.itemSort),
      callback: function($$v) {
        _vm.ruleForm.itemSort = $$v
      },
      expression: "ruleForm.itemSort"
    }
  }, _vm._l((_vm.typeOptions), function(type) {
    return _c('el-option', {
      key: type,
      attrs: {
        "label": type.itemTypeName,
        "value": type.itemTypeName
      }
    })
  }))], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "注册证号",
      "prop": "registerId"
    }
  }, [_c('el-input', {
    staticStyle: {
      "width": "300px !important"
    },
    model: {
      value: (_vm.ruleForm.registerId),
      callback: function($$v) {
        _vm.ruleForm.registerId = $$v
      },
      expression: "ruleForm.registerId"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "推荐",
      "prop": "isThrow"
    }
  }, [_c('el-radio', {
    staticClass: "radio",
    attrs: {
      "label": "1"
    },
    model: {
      value: (_vm.ruleForm.isThrow),
      callback: function($$v) {
        _vm.ruleForm.isThrow = $$v
      },
      expression: "ruleForm.isThrow"
    }
  }, [_vm._v("是")]), _vm._v(" "), _c('el-radio', {
    staticClass: "radio",
    attrs: {
      "label": "0"
    },
    model: {
      value: (_vm.ruleForm.isThrow),
      callback: function($$v) {
        _vm.ruleForm.isThrow = $$v
      },
      expression: "ruleForm.isThrow"
    }
  }, [_vm._v("否")])], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "商品属性",
      "prop": "shopType"
    }
  }, [_c('el-radio', {
    staticClass: "radio",
    attrs: {
      "label": "1"
    },
    model: {
      value: (_vm.shopType),
      callback: function($$v) {
        _vm.shopType = $$v
      },
      expression: "shopType"
    }
  }, [_vm._v("是")]), _vm._v(" "), _c('el-radio', {
    staticClass: "radio",
    attrs: {
      "label": "2"
    },
    model: {
      value: (_vm.shopType),
      callback: function($$v) {
        _vm.shopType = $$v
      },
      expression: "shopType"
    }
  }, [_vm._v("否")]), _vm._v(" "), (_vm.chooseShopType) ? _c('el-button', {
    attrs: {
      "type": "primary",
      "disabled": true
    },
    on: {
      "click": function($event) {
        _vm.chooseType()
      }
    }
  }, [_vm._v("选择属性")]) : _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.chooseType()
      }
    }
  }, [_vm._v("选择属性")])], 1), _vm._v(" "), _vm._l((_vm.items), function(item, index) {
    return _c('div', {
      key: item,
      staticClass: "active_box"
    }, [_c('span', {
      staticClass: "choose_title"
    }, [_vm._v(_vm._s(item.itemPropertyName))]), _vm._v(" "), _c('el-button', {
      attrs: {
        "type": "primary"
      },
      on: {
        "click": function($event) {
          _vm.removeDes(index)
        }
      }
    }, [_vm._v("删除")]), _vm._v(" "), _c('div', {
      staticStyle: {
        "margin-top": "15px"
      }
    }, _vm._l((item.itempropertydList), function(sitem) {
      return _c('el-checkbox', {
        key: item,
        attrs: {
          "label": sitem
        },
        on: {
          "change": function($event) {
            _vm.checkAllActive()
          }
        },
        model: {
          value: (sitem.checked),
          callback: function($$v) {
            sitem.checked = $$v
          },
          expression: "sitem.checked"
        }
      }, [_vm._v(_vm._s(sitem.itemPparam))])
    }))], 1)
  }), _vm._v(" "), _c('table', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.no_active),
      expression: "no_active"
    }],
    staticClass: "activeTable_box"
  }, [_c('tr', {
    staticClass: "activeTable_title"
  }, [_c('th', {
    staticClass: "skuCode"
  }, [_vm._v("SKU代码")]), _vm._v(" "), _c('th', {
    staticClass: "price"
  }, [_vm._v("价格")]), _vm._v(" "), _c('th', {
    staticClass: "percent"
  }, [_vm._v("提成（%）")]), _vm._v(" "), _c('th', {
    staticClass: "coin"
  }, [_vm._v("乾币（%）")]), _vm._v(" "), _c('th', {
    staticClass: "stock"
  }, [_vm._v("库存")]), _vm._v(" "), _c('th', {
    staticClass: "enable"
  }, [_vm._v("是否启用")])]), _vm._v(" "), _c('tr', {
    staticClass: "activeTable_des"
  }, [_c('td', {
    staticClass: "des_skuCode"
  }, [_c('span', [_vm._v(_vm._s(_vm.ruleForm.itemId + 1))])]), _vm._v(" "), _c('td', {
    staticClass: "des_price"
  }, [_c('el-input', {
    model: {
      value: (_vm.input_price),
      callback: function($$v) {
        _vm.input_price = $$v
      },
      expression: "input_price"
    }
  })], 1), _vm._v(" "), _c('td', {
    staticClass: "des_percent"
  }, [_c('el-input', {
    model: {
      value: (_vm.input_percent),
      callback: function($$v) {
        _vm.input_percent = $$v
      },
      expression: "input_percent"
    }
  })], 1), _vm._v(" "), _c('td', {
    staticClass: "des_coin"
  }, [_c('el-input', {
    model: {
      value: (_vm.input_coin),
      callback: function($$v) {
        _vm.input_coin = $$v
      },
      expression: "input_coin"
    }
  })], 1), _vm._v(" "), _c('td', {
    staticClass: "des_stock"
  }, [_c('el-input', {
    model: {
      value: (_vm.input_stock),
      callback: function($$v) {
        _vm.input_stock = $$v
      },
      expression: "input_stock"
    }
  })], 1), _vm._v(" "), _c('td', {
    staticClass: "des_enable"
  }, [_c('el-checkbox', {
    model: {
      value: (_vm.input_enable),
      callback: function($$v) {
        _vm.input_enable = $$v
      },
      expression: "input_enable"
    }
  })], 1)])]), _vm._v(" "), _c('table', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.active),
      expression: "active"
    }],
    staticClass: "activeTable_box"
  }, [_c('tr', {
    staticClass: "activeTable_title"
  }, [_vm._l((_vm.items), function(item) {
    return (item.hasItem) ? _c('th', [_vm._v(_vm._s(item.itemPropertyName))]) : _vm._e()
  }), _vm._v(" "), _c('th', {
    staticClass: "skuCode"
  }, [_vm._v("SKU代码")]), _vm._v(" "), _c('th', {
    staticClass: "price"
  }, [_vm._v("价格")]), _vm._v(" "), _c('th', {
    staticClass: "percent"
  }, [_vm._v("提成（%）")]), _vm._v(" "), _c('th', {
    staticClass: "coin"
  }, [_vm._v("乾币（%）")]), _vm._v(" "), _c('th', {
    staticClass: "stock"
  }, [_vm._v("库存")]), _vm._v(" "), _c('th', {
    staticClass: "enable"
  }, [_vm._v("是否启用")])], 2), _vm._v(" "), _vm._l((_vm.activeItems), function(activeItem, index) {
    return _c('tr', {
      staticClass: "activeTable_des"
    }, [_vm._l((activeItem), function(item, key) {
      return _c('td', [_vm._v(_vm._s(item))])
    }), _vm._v(" "), _c('td', {
      staticClass: "des_skuCode"
    }, [_c('span', [_vm._v(_vm._s(_vm.ruleForm.itemId + (index + 1)))])]), _vm._v(" "), _c('td', {
      staticClass: "des_price"
    }, [_c('el-input', {
      model: {
        value: (activeItem.itemSkuPrice),
        callback: function($$v) {
          activeItem.itemSkuPrice = $$v
        },
        expression: "activeItem.itemSkuPrice"
      }
    })], 1), _vm._v(" "), _c('td', {
      staticClass: "des_percent"
    }, [_c('el-input', {
      model: {
        value: (activeItem.tiChen),
        callback: function($$v) {
          activeItem.tiChen = $$v
        },
        expression: "activeItem.tiChen"
      }
    })], 1), _vm._v(" "), _c('td', {
      staticClass: "des_coin"
    }, [_c('el-input', {
      model: {
        value: (activeItem.itemQb),
        callback: function($$v) {
          activeItem.itemQb = $$v
        },
        expression: "activeItem.itemQb"
      }
    })], 1), _vm._v(" "), _c('td', {
      staticClass: "des_stock"
    }, [_c('el-input', {
      model: {
        value: (activeItem.stockNum),
        callback: function($$v) {
          activeItem.stockNum = $$v
        },
        expression: "activeItem.stockNum"
      }
    })], 1), _vm._v(" "), _c('td', {
      staticClass: "des_enable"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (activeItem.canUse),
        expression: "activeItem.canUse"
      }],
      staticClass: "elcheck",
      attrs: {
        "type": "checkbox"
      },
      domProps: {
        "checked": Array.isArray(activeItem.canUse) ? _vm._i(activeItem.canUse, null) > -1 : (activeItem.canUse)
      },
      on: {
        "__c": function($event) {
          var $$a = activeItem.canUse,
            $$el = $event.target,
            $$c = $$el.checked ? (true) : (false);
          if (Array.isArray($$a)) {
            var $$v = null,
              $$i = _vm._i($$a, $$v);
            if ($$c) {
              $$i < 0 && (activeItem.canUse = $$a.concat($$v))
            } else {
              $$i > -1 && (activeItem.canUse = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
            }
          } else {
            activeItem.canUse = $$c
          }
        }
      }
    })])], 2)
  })], 2), _vm._v(" "), _c('el-form-item', {
    staticStyle: {
      "margin-top": "50px"
    }
  }, [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.nextToFirst('ruleForm')
      }
    }
  }, [_vm._v("下一步")])], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "选择商品属性",
      "visible": _vm.dialogTableVisible
    },
    on: {
      "update:visible": function($event) {
        _vm.dialogTableVisible = $event
      }
    }
  }, [_c('el-table', {
    ref: "multipleTable",
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "data": _vm.tableData2,
      "border": "",
      "tooltip-effect": "dark"
    },
    on: {
      "selection-change": _vm.handleSelectionChange
    }
  }, [_c('el-table-column', {
    attrs: {
      "type": "selection",
      "width": "55"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "itemPropertyName",
      "label": "属性名称"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "itempropertydList",
      "label": "规格值"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return _vm._l((scope.row.itempropertydList), function(type) {
          return _c('span', {
            key: type
          }, [_vm._v(_vm._s(type.itemPparam) + "/ ")])
        })
      }
    }])
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "btn_box"
  }, [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.confirm_type
    }
  }, [_vm._v("确定")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.dialogTableVisible = false
      }
    }
  }, [_vm._v("取消")])], 1)], 1)], 2)], 1)], 1)
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=28.3b9a821c95460cc487e8.js.map