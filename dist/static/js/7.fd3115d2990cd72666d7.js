webpackJsonp([7],{

/***/ 304:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(704)
  __webpack_require__(703)
}
var Component = __webpack_require__(8)(
  /* script */
  __webpack_require__(433),
  /* template */
  __webpack_require__(839),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-8955e514",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 433:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tableBoard__ = __webpack_require__(739);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tableBoard___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__tableBoard__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'freightSet',
  data() {
    return {
      palceSelected: null,
      state: false,
      tab1_allInputDisable: false,
      tab1_editIndex: null,
      tab1_showAddFreightBtn: false,
      tab1_operaName: '',
      tab2_allInputDisable: true,
      tab2_selectedState: "停用",
      tab2_tableData: [
        // {postCity:["未添加地区"],freeShippingMoney:12,state:1}
      ],
      tab1_tableData: [
        // {postCity:["未添加地区"],firstNum:1,firstMoney:0,addNum:0,addMoney:0,changeState:false}
      ],
      activeName2: 'first'
    };
  },
  components: {
    tableBoard: __WEBPACK_IMPORTED_MODULE_0__tableBoard___default.a
  },
  created: function () {
    var that = this;
    that.getSelfFreightList();
    that.getFreeFreightList();
  },
  methods: {
    getSelfFreightList: function () {
      var that = this;
      that.global.axiosPostReq('/freightManage/showFreeShipp').then(res => {
        // console.log(res.data.data,"getSelfFreightList")
        if (res.data.callStatus === 'SUCCEED') {
          that.tab2_tableData = res.data.data;
          if (that.tab2_tableData[0].state == 1) {
            that.tab2_tableData[0].state = "启用";
          } else {
            that.tab2_tableData[0].state = "停用";
          }
        } else {
          that.$message.error('网络出错，请稍后再试！');
        }
      });
    },
    getFreeFreightList: function () {
      //自定义
      var that = this;
      that.global.axiosPostReq('/freightManage/show').then(res => {
        // console.log(res.data.data,"showFreeShipp")
        if (res.data.callStatus === 'SUCCEED') {
          that.tab1_tableData = res.data.data;
          for (let i in that.tab1_tableData) {
            that.tab1_tableData[i].changeState = false;
          }
          console.log(that.tab1_tableData);
        } else {
          that.$message.error('网络出错，请稍后再试！');
        }
      });
    },
    listenChildrenFun: function (data) {
      var that = this;
      if (data != "1") {
        if (that.selectPlaceStale == 1) {
          // 自定义
          // that.tab1_tableData[that.tab1_editIndex].postCity = "";
          var str = data.join(",");
          // for(let i in data){
          //   that.tab1_tableData[that.tab1_editIndex].postCity.push(data[i]);
          // }
          that.tab1_tableData[that.tab1_editIndex].postCity = str;
        } else if (that.selectPlaceStale == 2) {
          // 包邮
          var str = data.join(",");
          // that.tab2_tableData[0].postCity = [];
          // for(let i in data){
          // that.tab2_tableData[0].postCity.push(data[i]);
          // }
          that.tab2_tableData[0].postCity = str;
        }
      }
      this.state = false;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    tab1_saveOne: function (index, one) {
      var that = this;
      var obj = {};
      var str = null;
      if (one.firstNum < 0) {
        str = "请填写首件数！";
      } else {
        obj.firstNum = one.firstNum.toString();
      }
      if (one.firstMoney < 0) {
        str = "请填写首件数！";
      } else {
        obj.firstMoney = one.firstMoney.toString();
      }
      if (one.addNum < 0) {
        str = "请填写续件！";
      } else {
        obj.addNum = one.addNum.toString();
      }
      if (one.addMoney < 0) {
        str = "请填写续费！";
      } else {
        obj.addMoney = one.addMoney.toString();
      }
      if (one.postCity[0] == "未添加地区") {
        str = "请选择地区！";
      } else {
        // console.log(one.postCity)
        obj.postCity = one.postCity;
      }
      if (str) {
        this.$alert(str, { confirmButtonText: '确定' });
      } else {
        if (one.postFeeId) {
          obj.postFeeId = one.postFeeId;
          // console.log(one.postCity)
          that.global.axiosPostReq('/freightManage/customFreight', obj).then(res => {
            if (res.data.callStatus === 'SUCCEED') {
              var data = that.tab1_tableData[index];
              data.changeState = false;
              that.tab1_tableData.splice(index, 1, data);
              // that.tab1_tableData.splice()[index].changeState = false;
            } else {
              that.$message.error('网络出错，请稍后再试！');
            }
          });
        } else {
          that.global.axiosPostReq('/freightManage//addCustomFreight', obj).then(res => {
            if (res.data.callStatus === 'SUCCEED') {
              that.tab1_tableData[index].changeState = false;
            } else {
              that.$message.error('网络出错，请稍后再试！');
            }
          });
        }
      }
    },
    tab1_changeOne: function (index) {
      var that = this;
      // console.log(index)
      var obj = that.tab1_tableData[index];
      obj.changeState = true;
      that.tab1_tableData.splice(index, 1, obj);
    },
    tab1_addOneFreight: function () {
      var obj = { postCity: ["未添加地区"], firstNum: 1, firstMoney: 0, addNum: 0, addMoney: 0, changeState: true };
      this.tab1_tableData.push(obj);
    },
    tab1_delete: function (index, one) {
      var that = this;
      that.$confirm('此操作将删除该自定义邮费, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
      }).then(() => {
        if (one.postFeeId) {
          var obj = {
            postFeeId: one.postFeeId
          };
          that.global.axiosPostReq('/freightManage/deleteCustomFreight', obj).then(res => {
            if (res.data.callStatus === 'SUCCEED') {
              that.tab1_tableData.splice(index, 1);
              that.$message({ type: 'success', message: '删除成功!' });
            } else {
              that.$message.error('网络出错，请稍后再试！');
            }
          });
        }
      }).catch(() => {
        that.$message({ type: 'info', message: '已取消删除' });
      });
      // else{
      //   that.tab1_tableData.splice(index,1);
      // }
    },
    tab1_editThis: function (index, row) {
      console.log(row);
      var that = this;
      that.selectPlaceStale = 1;
      that.state = true;
      that.tab1_editIndex = index;
      var data = that.tab1_tableData[index].postCity;
      data = data.split(",");
      that.palceSelected = data;
    },
    tab2_change: function () {
      this.tab2_allInputDisable = false;
    },
    tab2_editThis: function (index) {
      var that = this;
      that.selectPlaceStale = 2;
      that.state = true;
      var data = that.tab2_tableData[index].postCity;
      data = data.split(",");
      that.palceSelected = data;
    },
    tab2_save: function (index, one) {
      var that = this;
      that.tab2_allInputDisable = true;
      var obj = {};
      var str = null;
      obj.freePostId = one.freePostId;
      if (one.freeShippingMoney >= 0) {
        obj.freeShippingMoney = one.freeShippingMoney.toString();
      } else {
        str = "请填写包邮金额！";
      }
      if (one.state == "启用") {
        obj.state = "1";
      } else {
        obj.state = "2";
      }
      if (one.postCity[0] == "未添加地区 ") {
        str = "请填写包邮地区！";
      } else {
        obj.postCity = one.postCity.join(",");
      }
      if (str) {
        that.$alert(str, { confirmButtonText: '确定' });
      } else {
        console.log(obj);
        that.global.axiosPostReq('/freightManage/updateFreeShipp', obj).then(res => {
          console.log(res.data.data, "tab2_save");
          if (res.data.callStatus === 'SUCCEED') {} else {
            that.$message.error('网络出错，请稍后再试！');
          }
        });
      }
    }
  }
});

/***/ }),

/***/ 434:
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

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'tableBoard',
  data() {
    return {
      state2: false,
      checkAll: false,
      checkedCities: [],
      isIndeterminate: false,
      items: [{
        area: '华东',
        allcheck: false,
        place: [{ city: '上海', checked: false }, { city: '江苏', checked: false }, { city: '浙江', checked: false }, { city: '安徽', checked: false }, { city: '江西', checked: false }]
      }, {
        area: '华北',
        allcheck: false,
        place: [{ city: '北京', checked: false }, { city: '天津', checked: false }, { city: '山西', checked: false }, { city: '山东', checked: false }, { city: '河北', checked: false }, { city: '内蒙古', checked: false }]
      }, {
        area: '华中',
        allcheck: false,
        place: [{ city: '湖南', checked: false }, { city: '湖北', checked: false }, { city: '河南', checked: false }]
      }, {
        area: '华南',
        allcheck: false,
        place: [{ city: '广东', checked: false }, { city: '广西', checked: false }, { city: '福建', checked: false }, { city: '海南', checked: false }]
      }, {
        area: '东北',
        allcheck: false,
        place: [{ city: '辽宁', checked: false }, { city: '吉林', checked: false }, { city: '黑龙江', checked: false }]
      }, {
        area: '西北',
        allcheck: false,
        place: [{ city: '陕西', checked: false }, { city: '新疆', checked: false }, { city: '甘肃', checked: false }, { city: '宁夏', checked: false }, { city: '青海', checked: false }]
      }, {
        area: '西南',
        allcheck: false,
        place: [{ city: '重庆', checked: false }, { city: '云南', checked: false }, { city: '贵州', checked: false }, { city: '西藏', checked: false }, { city: '四川', checked: false }]
      }, {
        area: '港澳台',
        allcheck: false,
        place: [{ city: '香港', checked: false }, { city: '澳门', checked: false }, { city: '台湾', checked: false }]
      }, {
        area: '海外',
        allcheck: false,
        place: [{ city: '海外', checked: false }]
      }],
      submitCities: [],
      watchItem: null
    };
  },
  props: ["childrenState", "defaultSelectedCity"],
  watch: {
    childrenState: function () {
      var that = this;
      that.state2 = that.childrenState;
    },
    defaultSelectedCity: {
      handler: function () {
        var that = this;
        if (that.defaultSelectedCity.length > 0) {
          for (let i in that.items) {
            var flag = true;
            for (let n in that.items[i].place) {
              for (let m in that.defaultSelectedCity) {
                if (that.defaultSelectedCity[m] == that.items[i].place[n].city) {
                  that.items[i].place[n].checked = true;
                }
              }
              if (that.items[i].place[n].checked == !true) {
                flag = false;
              }
            }
            if (flag) {
              that.items[i].allcheck = true;
            }
          }
        }
      },
      deep: true
    },
    items: {
      handler: function () {
        var that = this;
        // for (var i = 0; i < that.items.length; i++) {
        //   for (k in that.items[i].place)
        //     if (that.items[i].place[k].checked == ) {
        //       expression
        //     }
        // }
        // console.log(that.items,'2232323')
      },
      deep: true
    },
    checkedCities: {
      handler: function () {
        var that = this;
        var a = that.checkedCities;
        for (var i = a.length - 1; i >= 0; i--) {
          var targetNode = a[i];
          for (var j = 0; j < i; j++) {
            if (targetNode == a[j]) {
              a.splice(i, 1);
              break;
            }
          }
        }
        that.submitCities = a;
        // console.log(that.submitCities);
      },
      deep: true
    }
  },
  methods: {
    returnDefault: function () {
      var that = this;
      for (let i in that.items) {
        that.items[i].allcheck = false;
        for (let n in that.items[i].place) {
          that.items[i].place[n].checked = false;
        }
      }
    },
    handleClose: function () {
      this.returnDefault();
    },
    handleCheckAllChange(item) {
      var that = this;
      var arr = item.place;
      if (item.allcheck == true) {
        for (var i = 0; i < arr.length; i++) {
          arr[i].checked = true;
          that.checkedCities.push(arr[i].city);
        }
        return false;
      }
      if (item.allcheck == false) {
        for (var i = 0; i < arr.length; i++) {
          arr[i].checked = false;
          for (var j = 0; j < that.checkedCities.length; j++) {
            if (that.checkedCities[j] == arr[i].city) {
              that.checkedCities.splice(j, 1);
            }
          }
        }
        return false;
      }
    },
    handleCheckedCitiesChange(cities, item) {
      var that = this;
      if (cities.checked == true) {
        var a = [];
        that.checkedCities.push(cities.city);
        for (var i = 0; i < item.place.length; i++) {
          if (item.place[i].checked == true) {
            a.push(item.place[i].checked);
          }
        }
        if (a.length == item.place.length) {
          item.allcheck = true;
        }
        //console.log(a,'ppp')
      } else {
        for (var i = 0; i < item.place.length; i++) {
          if (item.place[i].checked == false) {
            item.allcheck = false;
          }
        }
        for (var i = 0; i < that.checkedCities.length; i++) {
          if (that.checkedCities[i] == cities.city) {
            that.checkedCities.splice(i, 1);
            break;
          }
        }
      }
    },
    lzy_returnData: function () {
      var that = this;
      var arr = [];
      for (let i in that.items) {
        for (let a in that.items[i].place) {
          if (that.items[i].place[a].checked == true) {
            arr.push(that.items[i].place[a].city);
          }
        }
      }
      return arr;
    },
    confirm: function () {
      var that = this;
      var arr = that.submitCities;
      var arr2 = that.lzy_returnData
      // that.$emit('listenChildren',arr);
      ();that.$emit('listenChildren', arr2);
      that.state2 = false;
      this.returnDefault();
    },
    cancel: function () {
      var that = this;
      that.$emit('listenChildren', "1");
      that.state2 = false;
      this.returnDefault();
    }
  }
});

/***/ }),

/***/ 512:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(292)(true);
// imports


// module
exports.push([module.i, ".allChoose_box[data-v-23c152e2]{margin-top:20px}.allchecked[data-v-23c152e2]{width:20%;float:left}.allchecked_box[data-v-23c152e2]{width:80%;float:left}", "", {"version":3,"sources":["/Users/daifeili/yayi-web/src/components/admin/freightManner/tableBoard.vue"],"names":[],"mappings":"AACA,gCACE,eAAiB,CAClB,AACD,6BACE,UAAW,AACX,UAAY,CACb,AACD,iCACE,UAAW,AACX,UAAY,CACb","file":"tableBoard.vue","sourcesContent":["\n.allChoose_box[data-v-23c152e2] {\n  margin-top: 20px;\n}\n.allchecked[data-v-23c152e2] {\n  width: 20%;\n  float: left;\n}\n.allchecked_box[data-v-23c152e2] {\n  width: 80%;\n  float: left;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 567:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(292)(true);
// imports


// module
exports.push([module.i, ".freightSet .el-input{width:100px;padding-right:0}", "", {"version":3,"sources":["/Users/daifeili/yayi-web/src/components/admin/freightManner/freightSet.vue"],"names":[],"mappings":"AACA,sBACE,YAAa,AACb,eAAiB,CAClB","file":"freightSet.vue","sourcesContent":["\n.freightSet .el-input{\n  width: 100px;\n  padding-right: 0;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 568:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(292)(true);
// imports


// module
exports.push([module.i, ".btnWrap[data-v-8955e514]{text-align:right;padding:10px 0}.warp .warp-breadcrum[data-v-8955e514]{margin-bottom:10px}", "", {"version":3,"sources":["/Users/daifeili/yayi-web/src/components/admin/freightManner/freightSet.vue"],"names":[],"mappings":"AACA,0BACE,iBAAkB,AAClB,cAAgB,CACjB,AACD,uCACE,kBAAoB,CACrB","file":"freightSet.vue","sourcesContent":["\n.btnWrap[data-v-8955e514]{\n  text-align: right;\n  padding: 10px 0;\n}\n.warp .warp-breadcrum[data-v-8955e514]{\n  margin-bottom: 10px;\n}\n\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 648:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(512);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(293)("ee35948a", content, true);

/***/ }),

/***/ 703:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(567);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(293)("0bac37e3", content, true);

/***/ }),

/***/ 704:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(568);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(293)("75795b4e", content, true);

/***/ }),

/***/ 739:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(648)
}
var Component = __webpack_require__(8)(
  /* script */
  __webpack_require__(434),
  /* template */
  __webpack_require__(791),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-23c152e2",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 791:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tableBoard"
  }, [_c('el-dialog', {
    attrs: {
      "title": "选择区域",
      "visible": _vm.state2,
      "before-close": _vm.handleClose,
      "show-close": false
    },
    on: {
      "update:visible": function($event) {
        _vm.state2 = $event
      }
    }
  }, [_vm._l((_vm.items), function(item) {
    return _c('div', {
      key: item,
      staticClass: "allChoose_bigbox"
    }, [_c('div', {
      staticClass: "allChoose_box"
    }, [_c('el-checkbox', {
      staticClass: "allchecked",
      attrs: {
        "indeterminate": _vm.isIndeterminate
      },
      on: {
        "change": function($event) {
          _vm.handleCheckAllChange(item)
        }
      },
      model: {
        value: (item.allcheck),
        callback: function($$v) {
          item.allcheck = $$v
        },
        expression: "item.allcheck"
      }
    }, [_vm._v(_vm._s(item.area))]), _vm._v(" "), _vm._l((item.place), function(cities) {
      return _c('el-checkbox', {
        key: cities,
        attrs: {
          "label": cities.city
        },
        on: {
          "change": function($event) {
            _vm.handleCheckedCitiesChange(cities, item)
          }
        },
        model: {
          value: (cities.checked),
          callback: function($$v) {
            cities.checked = $$v
          },
          expression: "cities.checked"
        }
      }, [_vm._v(_vm._s(cities.city))])
    }), _vm._v(" "), _c('div', {
      staticClass: "clearfix"
    })], 2)])
  }), _vm._v(" "), _c('span', {
    staticClass: "dialog-footer",
    slot: "footer"
  }, [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.confirm()
      }
    }
  }, [_vm._v("确 定")]), _vm._v(" "), _c('el-button', {
    on: {
      "click": function($event) {
        _vm.cancel()
      }
    }
  }, [_vm._v("取 消")])], 1)], 2)], 1)
},staticRenderFns: []}

/***/ }),

/***/ 839:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "freightSet"
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
  }, [_c('el-breadcrumb-item', [_c('b', [_vm._v("运费管理")])]), _vm._v(" "), _c('el-breadcrumb-item', [_vm._v("运费设置")])], 1)], 1), _vm._v(" "), _c('el-col', [_c('el-tabs', {
    attrs: {
      "type": "card"
    },
    model: {
      value: (_vm.activeName2),
      callback: function($$v) {
        _vm.activeName2 = $$v
      },
      expression: "activeName2"
    }
  }, [_c('el-tab-pane', {
    attrs: {
      "label": "自定义邮费",
      "name": "first"
    }
  }, [_c('el-table', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "data": _vm.tab1_tableData,
      "stripe": ""
    }
  }, [_c('el-table-column', {
    attrs: {
      "prop": "postCity",
      "align": "center",
      "label": "运送到"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('span', [_vm._v(_vm._s(scope.row.postCity))]), _vm._v(" "), (scope.row.changeState) ? _c('el-button', {
          attrs: {
            "type": "text"
          },
          on: {
            "click": function($event) {
              _vm.tab1_editThis(scope.$index, scope.row)
            }
          }
        }, [_vm._v("编辑")]) : _vm._e()]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "firstNum",
      "align": "center",
      "label": "首件数（件）",
      "width": "200"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-input', {
          attrs: {
            "disabled": !scope.row.changeState
          },
          model: {
            value: (scope.row.firstNum),
            callback: function($$v) {
              scope.row.firstNum = $$v
            },
            expression: "scope.row.firstNum"
          }
        })]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "firstMoney",
      "align": "center",
      "label": "首费（元）",
      "width": "200"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-input', {
          attrs: {
            "disabled": !scope.row.changeState
          },
          model: {
            value: (scope.row.firstMoney),
            callback: function($$v) {
              scope.row.firstMoney = $$v
            },
            expression: "scope.row.firstMoney"
          }
        })]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "addNum",
      "align": "center",
      "label": "续件数（件）",
      "width": "200"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-input', {
          attrs: {
            "disabled": !scope.row.changeState
          },
          model: {
            value: (scope.row.addNum),
            callback: function($$v) {
              scope.row.addNum = $$v
            },
            expression: "scope.row.addNum"
          }
        })]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "addMoney",
      "align": "center",
      "label": "续费（元）",
      "width": "200"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-input', {
          attrs: {
            "disabled": !scope.row.changeState
          },
          model: {
            value: (scope.row.addMoney),
            callback: function($$v) {
              scope.row.addMoney = $$v
            },
            expression: "scope.row.addMoney"
          }
        })]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
      "prop": "changeState",
      "width": "200"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [(scope.row.changeState == false) ? _c('el-button', {
          attrs: {
            "type": "text"
          },
          on: {
            "click": function($event) {
              _vm.tab1_changeOne(scope.$index)
            }
          }
        }, [_vm._v("修改")]) : _c('el-button', {
          attrs: {
            "type": "text"
          },
          on: {
            "click": function($event) {
              _vm.tab1_saveOne(scope.$index, scope.row)
            }
          }
        }, [_vm._v("保存")]), _vm._v(" "), _c('el-button', {
          attrs: {
            "type": "text"
          },
          on: {
            "click": function($event) {
              _vm.tab1_delete(scope.$index, scope.row)
            }
          }
        }, [_vm._v("删除")])]
      }
    }])
  })], 1), _vm._v(" "), _c('div', {}, [_c('el-button', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.tab1_allInputDisable),
      expression: "!tab1_allInputDisable"
    }],
    attrs: {
      "type": "text"
    },
    on: {
      "click": function($event) {
        _vm.tab1_addOneFreight()
      }
    }
  }, [_vm._v("为指定地区城市添加邮费")])], 1)], 1), _vm._v(" "), _c('el-tab-pane', {
    attrs: {
      "label": "包邮",
      "name": "fourth"
    }
  }, [_c('el-table', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "data": _vm.tab2_tableData,
      "stripe": ""
    }
  }, [_c('el-table-column', {
    attrs: {
      "prop": "postCity",
      "align": "center",
      "label": "选择地区"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('span', [_vm._v(_vm._s(scope.row.postCity))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "postCity",
      "align": "center",
      "width": "100"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [(!_vm.tab2_allInputDisable) ? _c('el-button', {
          attrs: {
            "type": "text"
          },
          on: {
            "click": function($event) {
              _vm.tab2_editThis(scope.$index)
            }
          }
        }, [_vm._v("编辑")]) : _vm._e()]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "firstNum",
      "align": "center",
      "label": "设置包邮金额",
      "width": "300"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('span', [_vm._v("满")]), _vm._v(" "), _c('el-input', {
          attrs: {
            "disabled": _vm.tab2_allInputDisable
          },
          model: {
            value: (scope.row.freeShippingMoney),
            callback: function($$v) {
              scope.row.freeShippingMoney = $$v
            },
            expression: "scope.row.freeShippingMoney"
          }
        }), _vm._v(" "), _c('span', [_vm._v("元包邮")])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "state",
      "align": "center",
      "label": "状态",
      "width": "200"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-select', {
          attrs: {
            "disabled": _vm.tab2_allInputDisable
          },
          model: {
            value: (scope.row.state),
            callback: function($$v) {
              scope.row.state = $$v
            },
            expression: "scope.row.state"
          }
        }, [_c('el-option', {
          attrs: {
            "value": "停用",
            "name": "停用"
          }
        }, [_vm._v("停用")]), _vm._v(" "), _c('el-option', {
          attrs: {
            "value": "启用",
            "name": "启用"
          }
        }, [_vm._v("启用")])], 1)]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "addNum",
      "align": "center",
      "label": "操作",
      "width": "200"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [(_vm.tab2_allInputDisable) ? _c('el-button', {
          on: {
            "click": function($event) {
              _vm.tab2_change(scope.$index)
            }
          }
        }, [_vm._v("修改")]) : _c('el-button', {
          on: {
            "click": function($event) {
              _vm.tab2_save(scope.$index, scope.row)
            }
          }
        }, [_vm._v("保存")])]
      }
    }])
  })], 1)], 1)], 1)], 1), _vm._v(" "), _c('tableBoard', {
    attrs: {
      "defaultSelectedCity": _vm.palceSelected,
      "childrenState": _vm.state
    },
    on: {
      "listenChildren": _vm.listenChildrenFun
    }
  })], 1)], 1)
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=7.fd3115d2990cd72666d7.js.map