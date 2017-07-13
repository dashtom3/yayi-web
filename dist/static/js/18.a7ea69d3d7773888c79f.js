webpackJsonp([18],{

/***/ 307:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(671)
  __webpack_require__(672)
}
var Component = __webpack_require__(8)(
  /* script */
  __webpack_require__(434),
  /* template */
  __webpack_require__(793),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-78a92ad3",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by jerry on 2017/4/14.
 */
var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding(s, len) {
  let l = len - (s + '').length;
  for (var i = 0; i < l; i++) {
    s = '0' + s;
  }
  return s;
};

/* harmony default export */ __webpack_exports__["a"] = ({
  getQueryStringByName: function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    var context = '';
    if (r != null) {
      context = r[2];
    }
    reg = null;
    r = null;
    return context === null || context === '' || context === 'undefined' ? '' : context;
  },
  formatDate: {

    format: function (date, pattern) {
      pattern = pattern || DEFAULT_PATTERN;
      return pattern.replace(SIGN_REGEXP, function ($0) {
        switch ($0.charAt(0)) {
          case 'y':
            return padding(date.getFullYear(), $0.length);
          case 'M':
            return padding(date.getMonth() + 1, $0.length);
          case 'd':
            return padding(date.getDate(), $0.length);
          case 'w':
            return date.getDay() + 1;
          case 'h':
            return padding(date.getHours(), $0.length);
          case 'm':
            return padding(date.getMinutes(), $0.length);
          case 's':
            return padding(date.getSeconds(), $0.length);
        }
      });
    },
    parse: function (dateString, pattern) {
      var matchs1 = pattern.match(SIGN_REGEXP);
      var matchs2 = dateString.match(/(\d)+/g);
      if (matchs1.length === matchs2.length) {
        var _date = new Date(1970, 0, 1);
        for (var i = 0; i < matchs1.length; i++) {
          var _int = parseInt(matchs2[i]);
          var sign = matchs1[i];
          switch (sign.charAt(0)) {
            case 'y':
              _date.setFullYear(_int);break;
            case 'M':
              _date.setMonth(_int - 1);break;
            case 'd':
              _date.setDate(_int);break;
            case 'h':
              _date.setHours(_int);break;
            case 'm':
              _date.setMinutes(_int);break;
            case 's':
              _date.setSeconds(_int);break;
          }
        }
        return _date;
      }
      return null;
    }

  }

});

/***/ }),

/***/ 434:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_util__ = __webpack_require__(335);
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
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      tableData: [],
      cargo: {
        id: '',
        name: '',
        class: [],
        brand: ''
      },
      options1: [{
        label: '全部',
        value: '1'
      }, {
        label: '是',
        value: '2'
      }, {
        label: '否',
        value: '3'
      }],
      options2: [{
        label: '全部',
        value: ''
      }, {
        label: '已上架',
        value: 1
      }, {
        label: '已下架',
        value: 0
      }],
      list: true,
      coinValue: '',
      stateValue: '',
      dialogTableVisible: false,
      ruleForm: {
        cargoId: '',
        name: '',
        type: [],
        brand: '',
        rgAcount: '',
        qian: ''
      },
      rules: {
        cargoId: [{ required: true, message: '请填写商品编号', trigger: 'blur' }],
        name: [{ required: true, message: '请填写商品名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择商品分类', trigger: 'change' }],
        brand: [{ required: true, message: '请选择品牌名称', trigger: 'change' }],
        rgAcount: [{ required: true, message: '请填写注册账号', trigger: 'blur' }],
        qian: [{ required: true, message: '请选择是否乾币抵扣状态', trigger: 'change' }],
        date1: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
        date2: [{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }],
        type: [{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
      },
      radio: '',
      labelPosition: 'right',
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
      details: {
        itemId: '',
        itemBrand: {
          itemBrandName: ''
        },
        itemDetail: {
          video: ''
        }
      },
      propertyList: [],
      editCargo: {},
      options: [],
      brandOptions: []
    };
  },
  created: function () {
    var that = this;
    that.getItemInfo();
    that.getAllClassify();
  },
  mounted: function () {
    var that = this;
    if (that.$route.params.list == undefined || that.$route.params.addMerchandise == undefined) {
      return false;
    } else {
      that.list = that.$route.params.list;
      that.addMerchandise = that.$route.params.addMerchandise;
    }
  },
  methods: {
    // 获取商品列表
    getItemInfo: function () {
      var that = this;
      that.global.axiosPostReq('/item/itemInfoList').then(res => {
        if (res.data.callStatus === 'SUCCEED') {
          that.tableData = res.data.data;
          that.tableData.reverse();
          for (var i = 0; i < that.tableData.length; i++) {
            that.tableData[i].classify = that.tableData[i].oneClassify + '/' + that.tableData[i].twoClassify + '/' + that.tableData[i].threeClassify;
          }
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
    // 组件传值
    showMsgFromChild: function (data) {
      var that = this;
      that.list = data;
      that.addMerchandise = false;
      //console.log(data);
    },
    search: function () {
      var that = this;
      var obj = {
        itemId: that.cargo.id,
        itemName: that.cargo.name,
        itemClassify: that.cargo.class.pop(),
        itemBrandName: that.cargo.brand.itemBrandName,
        state: that.stateValue
      };
      console.log(obj, 'llll');
      that.global.axiosPostReq('/item/itemInfoList', obj).then(res => {
        if (res.data.callStatus === 'SUCCEED') {
          that.tableData = res.data.data;
          for (var i = 0; i < that.tableData.length; i++) {
            that.tableData[i].classify = that.tableData[i].oneClassify + '/' + that.tableData[i].twoClassify + '/' + that.tableData[i].threeClassify;
          }
          console.log(that.tableData);
        } else {
          that.$message.error('网络出错，请稍后再试！');
        }
      });
    },
    //清空
    clearWord: function () {
      var that = this;
      that.cargo.id = '';
      that.cargo.name = '';
      that.cargo.class = [];
      that.cargo.brand = '';
      that.stateValue = '';
    },
    //添加商品
    add: function () {
      var that = this;
      that.list = false;
      window.sessionStorage.removeItem('editCargo');
      that.$router.push({ path: '/admin/addMerchandise' });
    },
    //编辑商品属性
    edit: function (scope) {
      var that = this;
      var obj = {
        itemId: scope.row.itemId
      };
      that.global.axiosPostReq('/item/itemDetailDes', obj).then(res => {
        if (res.data.callStatus === 'SUCCEED') {
          that.editCargo = res.data.data;
          if (that.editCargo !== {}) {
            window.sessionStorage.setItem('editCargo', JSON.stringify(that.editCargo));
            that.$router.push({ name: 'addMerchandise' });
            //that.$router.push({ name: 'addMerchandise', params: {editCargo:that.editCargo}});
            console.log(that.editCargo, 'oooooo');
          }
        } else {
          that.$message.error('网络出错，请稍后再试！');
        }
      });
    },
    //预览商品
    preview: function (scope) {
      var that = this;
      // that.$router.push({path: '/details/' + item.itemId})
      // window.scroll(0,0);
      window.open('/preview/' + scope.row.itemId);
    },
    //商品属性详情
    detail: function (scope) {
      var that = this;
      var obj = {
        itemId: scope.row.itemId,
        token: null
      };
      that.global.axiosPostReq('/item/itemDetailDes', obj).then(res => {
        if (res.data.callStatus === 'SUCCEED') {
          that.details = res.data.data;
          var a = that.details.propertyList;
          that.propertyList = a.filter(function (ele, index, arr) {
            // console.log(ele);
            return ele.propertyName !== '';
          });
          console.log(that.details, 'ppp');
        } else {
          that.$message.error('网络出错，请稍后再试！');
        }
      });
      that.dialogTableVisible = true;
    },
    //上架商品
    grounding: function (scope) {
      var that = this;
      that.$confirm('确定上架该商品吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var obj = {
          itemId: scope.row.itemId
        };
        that.global.axiosPostReq('/item/up', obj).then(res => {
          if (res.data.callStatus === 'SUCCEED') {
            that.getItemInfo();
            that.$message({
              type: 'success',
              message: '上架成功!'
            });
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        });
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    //下架商品
    soldOut: function (scope) {
      var that = this;
      that.$confirm('确定下架该商品吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var obj = {
          itemId: scope.row.itemId
        };
        that.global.axiosPostReq('/item/down', obj).then(res => {
          if (res.data.callStatus === 'SUCCEED') {
            that.getItemInfo();
            that.$message({
              type: 'success',
              message: '下架成功!'
            });
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        });
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    //删除商品
    remove: function (scope) {
      var that = this;
      that.$confirm('确定删除该商品吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var obj = {
          itemId: scope.row.itemId
        };
        that.global.axiosPostReq('/item/delete', obj).then(res => {
          if (res.data.callStatus === 'SUCCEED') {
            console.log(res.data);
            that.getItemInfo();
            that.$message({
              type: 'success',
              message: '删除成功!'
            });
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        });
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    }
  }
});

/***/ }),

/***/ 544:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(293)(true);
// imports


// module
exports.push([module.i, ".detail_word img{width:100%;height:100%;display:block;margin:auto}", "", {"version":3,"sources":["/Users/daifeili/yayi-web/src/components/admin/merchantMessage/merchantMessage.vue"],"names":[],"mappings":"AACA,iBACE,WAAY,AACZ,YAAa,AACb,cAAe,AACf,WAAa,CACd","file":"merchantMessage.vue","sourcesContent":["\n.detail_word img {\n  width: 100%;\n  height: 100%;\n  display: block;\n  margin: auto;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 545:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(293)(true);
// imports


// module
exports.push([module.i, "table[data-v-78a92ad3]{border-collapse:collapse;border-spacing:0}td[data-v-78a92ad3],th[data-v-78a92ad3]{padding:0}.left[data-v-78a92ad3]{float:left}.activeTable_box[data-v-78a92ad3]{width:100%;border:1px solid #dfe6ec}.activeTable_title[data-v-78a92ad3]{width:100%;height:40px;line-height:40px;border-bottom:1px solid #dfe6ec}.des_type1[data-v-78a92ad3],.type1[data-v-78a92ad3]{width:8%;text-align:center;font-size:14px;border-right:1px solid #dfe6ec}.coin[data-v-78a92ad3],.des_coin[data-v-78a92ad3],.des_percent[data-v-78a92ad3],.des_price[data-v-78a92ad3],.des_skuCode[data-v-78a92ad3],.des_stock[data-v-78a92ad3],.percent[data-v-78a92ad3],.price[data-v-78a92ad3],.skuCode[data-v-78a92ad3],.stock[data-v-78a92ad3]{width:12.5%;text-align:center;font-size:14px;border-right:1px solid #dfe6ec}.des_enable[data-v-78a92ad3],.enable[data-v-78a92ad3]{width:12.5%;text-align:center;font-size:14px}.activeTable_des[data-v-78a92ad3]{width:100%;border-bottom:1px solid #dfe6ec}.detail_box[data-v-78a92ad3]{width:100%;height:100%;margin-bottom:10px}.detail_cargo[data-v-78a92ad3]{font-size:15px;display:inline-block}.detail_word[data-v-78a92ad3]{font-size:14px;color:#000;line-height:25px;display:inline-block}", "", {"version":3,"sources":["/Users/daifeili/yayi-web/src/components/admin/merchantMessage/merchantMessage.vue"],"names":[],"mappings":"AACA,uBACC,yBAAyB,AACzB,gBAAiB,CACjB,AACD,wCACC,SAAW,CACX,AACD,uBACE,UAAY,CACb,AACD,kCACE,WAAY,AACZ,wBAA0B,CAC3B,AACD,oCACE,WAAY,AACZ,YAAa,AACb,iBAAkB,AAClB,+BAAiC,CAClC,AACD,oDACE,SAAU,AACV,kBAAmB,AACnB,eAAgB,AAChB,8BAAgC,CACjC,AAyBD,0QACE,YAAa,AACb,kBAAmB,AACnB,eAAgB,AAChB,8BAAgC,CACjC,AACD,sDACE,YAAa,AACb,kBAAmB,AACnB,cAAgB,CACjB,AACD,kCACE,WAAY,AAGZ,+BAAiC,CAClC,AACD,6BACE,WAAY,AACZ,YAAa,AACb,kBAAoB,CACrB,AACD,+BACE,eAAgB,AAChB,oBAAsB,CACvB,AACD,8BACE,eAAgB,AAChB,WAAY,AACZ,iBAAkB,AAClB,oBAAsB,CACvB","file":"merchantMessage.vue","sourcesContent":["\ntable[data-v-78a92ad3] {\n border-collapse:collapse;\n border-spacing:0;\n}\nth[data-v-78a92ad3],td[data-v-78a92ad3] {\n padding: 0;\n}\n.left[data-v-78a92ad3] {\n  float: left;\n}\n.activeTable_box[data-v-78a92ad3] {\n  width: 100%;\n  border: 1px solid #dfe6ec;\n}\n.activeTable_title[data-v-78a92ad3] {\n  width: 100%;\n  height: 40px;\n  line-height: 40px;\n  border-bottom: 1px solid #dfe6ec;\n}\n.type1[data-v-78a92ad3], .des_type1[data-v-78a92ad3]{\n  width: 8%;\n  text-align: center;\n  font-size: 14px;\n  border-right: 1px solid #dfe6ec;\n}\n.skuCode[data-v-78a92ad3], .des_skuCode[data-v-78a92ad3]{\n  width: 12.5%;\n  text-align: center;\n  font-size: 14px;\n  border-right: 1px solid #dfe6ec;\n}\n.price[data-v-78a92ad3], .des_price[data-v-78a92ad3]{\n  width: 12.5%;\n  text-align: center;\n  font-size: 14px;\n  border-right: 1px solid #dfe6ec;\n}\n.percent[data-v-78a92ad3], .des_percent[data-v-78a92ad3]{\n  width: 12.5%;\n  text-align: center;\n  font-size: 14px;\n  border-right: 1px solid #dfe6ec;\n}\n.coin[data-v-78a92ad3], .des_coin[data-v-78a92ad3]{\n  width: 12.5%;\n  text-align: center;\n  font-size: 14px;\n  border-right: 1px solid #dfe6ec;\n}\n.stock[data-v-78a92ad3], .des_stock[data-v-78a92ad3]{\n  width: 12.5%;\n  text-align: center;\n  font-size: 14px;\n  border-right: 1px solid #dfe6ec;\n}\n.enable[data-v-78a92ad3], .des_enable[data-v-78a92ad3]{\n  width: 12.5%;\n  text-align: center;\n  font-size: 14px;\n}\n.activeTable_des[data-v-78a92ad3] {\n  width: 100%;\n  /*height: 100px;*/\n  /*line-height: 100px;*/\n  border-bottom: 1px solid #dfe6ec;\n}\n.detail_box[data-v-78a92ad3] {\n  width: 100%;\n  height: 100%;\n  margin-bottom: 10px;\n}\n.detail_cargo[data-v-78a92ad3] {\n  font-size: 15px;\n  display: inline-block;\n}\n.detail_word[data-v-78a92ad3] {\n  font-size: 14px;\n  color: #000;\n  line-height: 25px;\n  display: inline-block;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 671:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(544);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(294)("5b207011", content, true);

/***/ }),

/***/ 672:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(545);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(294)("395caaff", content, true);

/***/ }),

/***/ 793:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('el-row', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.list),
      expression: "list"
    }],
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
  }, [_c('b', [_vm._v("商品信息管理")])]), _vm._v(" "), _c('el-breadcrumb-item', [_vm._v("商品列表")])], 1)], 1), _vm._v(" "), _c('el-col', {
    staticClass: "warp-main",
    attrs: {
      "span": 24
    }
  }, [_c('el-col', {
    staticClass: "toolbar",
    staticStyle: {
      "padding-bottom": "0px"
    },
    attrs: {
      "span": 24
    }
  }, [_c('el-form', {
    attrs: {
      "inline": true,
      "model": _vm.cargo
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "商品编号："
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.cargo.id),
      callback: function($$v) {
        _vm.cargo.id = $$v
      },
      expression: "cargo.id"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "商品名称："
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.cargo.name),
      callback: function($$v) {
        _vm.cargo.name = $$v
      },
      expression: "cargo.name"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "商品分类"
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
      value: (_vm.cargo.class),
      callback: function($$v) {
        _vm.cargo.class = $$v
      },
      expression: "cargo.class"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "品牌名称"
    }
  }, [_c('el-select', {
    attrs: {
      "placeholder": "请选择"
    },
    model: {
      value: (_vm.cargo.brand),
      callback: function($$v) {
        _vm.cargo.brand = $$v
      },
      expression: "cargo.brand"
    }
  }, _vm._l((_vm.brandOptions), function(brand) {
    return _c('el-option', {
      key: brand,
      attrs: {
        "label": brand.itemBrandName,
        "value": brand
      }
    })
  }))], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "商品状态："
    }
  }, [_c('el-select', {
    attrs: {
      "placeholder": "请选择"
    },
    model: {
      value: (_vm.stateValue),
      callback: function($$v) {
        _vm.stateValue = $$v
      },
      expression: "stateValue"
    }
  }, _vm._l((_vm.options2), function(state) {
    return _c('el-option', {
      key: state.value,
      attrs: {
        "label": state.label,
        "value": state.value
      }
    })
  }))], 1)], 1), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.search()
      }
    }
  }, [_vm._v("查询")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.clearWord()
      }
    }
  }, [_vm._v("重置")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.add()
      }
    }
  }, [_vm._v("添加商品")])], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "clearfix"
  }), _vm._v(" "), _c('el-table', {
    staticStyle: {
      "margin-top": "26px",
      "width": "100%"
    },
    attrs: {
      "data": _vm.tableData,
      "border": ""
    }
  }, [_c('el-table-column', {
    attrs: {
      "label": "商品编号",
      "prop": "itemId"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "商品名称",
      "prop": "itemName"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "商品分类",
      "prop": "classify"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "品牌名称",
      "prop": "itemBrand.itemBrandName"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "推荐"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [(scope.row.isThrow == 1) ? _c('span', [_vm._v("是")]) : _vm._e(), _vm._v(" "), (scope.row.isThrow == 0) ? _c('span', [_vm._v("否")]) : _vm._e()]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "商品状态"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [(scope.row.state == true) ? _c('span', [_vm._v("已上架")]) : _vm._e(), _vm._v(" "), (scope.row.state == false) ? _c('span', [_vm._v("已下架")]) : _vm._e()]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "操作"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [(scope.row.state == true) ? _c('div', [_c('el-button', {
          attrs: {
            "size": "small"
          },
          on: {
            "click": function($event) {
              _vm.detail(scope)
            }
          }
        }, [_vm._v("详情")]), _vm._v(" "), _c('el-button', {
          attrs: {
            "size": "small"
          },
          on: {
            "click": function($event) {
              _vm.soldOut(scope)
            }
          }
        }, [_vm._v("下架")])], 1) : _c('div', [_c('el-button', {
          attrs: {
            "size": "small"
          },
          on: {
            "click": function($event) {
              _vm.detail(scope)
            }
          }
        }, [_vm._v("详情")]), _vm._v(" "), _c('el-button', {
          attrs: {
            "size": "small"
          },
          on: {
            "click": function($event) {
              _vm.edit(scope)
            }
          }
        }, [_vm._v("编辑")]), _vm._v(" "), _c('el-button', {
          attrs: {
            "size": "small"
          },
          on: {
            "click": function($event) {
              _vm.preview(scope)
            }
          }
        }, [_vm._v("预览")]), _vm._v(" "), _c('el-button', {
          attrs: {
            "size": "small"
          },
          on: {
            "click": function($event) {
              _vm.grounding(scope)
            }
          }
        }, [_vm._v("上架")]), _vm._v(" "), _c('el-button', {
          attrs: {
            "size": "small",
            "type": "danger"
          },
          on: {
            "click": function($event) {
              _vm.remove(scope)
            }
          }
        }, [_vm._v("删除")])], 1)]
      }
    }])
  })], 1)], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "商品详情",
      "visible": _vm.dialogTableVisible,
      "size": "small"
    },
    on: {
      "update:visible": function($event) {
        _vm.dialogTableVisible = $event
      }
    }
  }, [_c('el-form', {
    ref: "ruleForm",
    staticClass: "demo-ruleForm",
    attrs: {
      "model": _vm.ruleForm,
      "rules": _vm.rules,
      "label-width": "100px"
    }
  }, [_c('div', {
    staticClass: "detail_box"
  }, [_c('div', {
    staticClass: "detail_cargo"
  }, [_vm._v("商品编号：")]), _vm._v(" "), _c('p', {
    staticClass: "detail_word"
  }, [_vm._v(_vm._s(_vm.details.itemId))])]), _vm._v(" "), _c('div', {
    staticClass: "detail_box"
  }, [_c('div', {
    staticClass: "detail_cargo"
  }, [_vm._v("商品名称：")]), _vm._v(" "), _c('p', {
    staticClass: "detail_word"
  }, [_vm._v(_vm._s(_vm.details.itemName))])]), _vm._v(" "), _c('div', {
    staticClass: "detail_box"
  }, [_c('div', {
    staticClass: "detail_cargo"
  }, [_vm._v("商品分类：")]), _vm._v(" "), _c('p', {
    staticClass: "detail_word"
  }, [_vm._v(_vm._s(_vm.details.oneClassify) + "/" + _vm._s(_vm.details.twoClassify) + "/" + _vm._s(_vm.details.threeClassify))])]), _vm._v(" "), _c('div', {
    staticClass: "detail_box"
  }, [_c('div', {
    staticClass: "detail_cargo"
  }, [_vm._v("品牌名称：")]), _vm._v(" "), _c('p', {
    staticClass: "detail_word"
  }, [_vm._v(_vm._s(_vm.details.itemBrand.itemBrandName))])]), _vm._v(" "), _c('div', {
    staticClass: "detail_box"
  }, [_c('div', {
    staticClass: "detail_cargo"
  }, [_vm._v("注册证号：")]), _vm._v(" "), _c('p', {
    staticClass: "detail_word"
  }, [_vm._v(_vm._s(_vm.details.itemDetail.registerId))])]), _vm._v(" "), _c('div', {
    staticClass: "detail_box"
  }, [_c('div', {
    staticClass: "detail_cargo"
  }, [_vm._v("商品属性：")])]), _vm._v(" "), _c('table', {
    staticClass: "activeTable_box",
    attrs: {
      "border": "1"
    }
  }, [_c('tr', {
    staticClass: "activeTable_title"
  }, [_vm._l((_vm.propertyList), function(property) {
    return _c('th', {
      staticClass: "type1"
    }, [_vm._v(_vm._s(property.propertyName))])
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
  }, [_vm._v("是否启用")])], 2), _vm._v(" "), _vm._l((_vm.details.itemValueList), function(table, index) {
    return _c('tr', {
      key: table,
      staticClass: "activeTable_des"
    }, [_vm._l((_vm.propertyList), function(name) {
      return _c('td', [_c('span', [_vm._v(_vm._s(name.propertyInfoList[index]))])])
    }), _vm._v(" "), _c('td', {
      staticClass: "des_skuCode"
    }, [_c('span', [_vm._v(_vm._s(table.itemSKU))])]), _vm._v(" "), _c('td', {
      staticClass: "des_price"
    }, [_c('span', [_vm._v(_vm._s(table.itemSkuPrice))])]), _vm._v(" "), _c('td', {
      staticClass: "des_percent"
    }, [_c('span', [_vm._v(_vm._s(table.tiChen))])]), _vm._v(" "), _c('td', {
      staticClass: "des_coin"
    }, [_c('span', [_vm._v(_vm._s(table.itemQb))])]), _vm._v(" "), _c('td', {
      staticClass: "des_stock"
    }, [_c('span', [_vm._v(_vm._s(table.stockNum))])]), _vm._v(" "), _c('td', {
      staticClass: "des_enable"
    }, [_c('span', [_vm._v(_vm._s(table.canUse))])])], 2)
  })], 2), _vm._v(" "), _c('div', {
    staticClass: "detail_box"
  }, [_c('div', {
    staticClass: "detail_cargo"
  }, [_vm._v("商品详情：")]), _vm._v(" "), _c('p', {
    staticClass: "detail_word",
    domProps: {
      "innerHTML": _vm._s(_vm.details.itemDetail.itemDesc)
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "detail_box"
  }, [_c('div', {
    staticClass: "detail_cargo"
  }, [_vm._v("图片说明：")]), _vm._v(" "), _c('p', {
    staticClass: "detail_word",
    domProps: {
      "innerHTML": _vm._s(_vm.details.itemDetail.itemUse)
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "detail_box"
  }, [_c('div', {
    staticClass: "detail_cargo"
  }, [_vm._v("视频说明：")]), _vm._v(" "), _c('p', {
    staticClass: "detail_word"
  }, [_vm._v(_vm._s(_vm.details.itemDetail.video))])])])], 1)], 1)
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=18.a7ea69d3d7773888c79f.js.map