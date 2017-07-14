webpackJsonp([25],{

/***/ 310:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(635)
}
var Component = __webpack_require__(8)(
  /* script */
  __webpack_require__(441),
  /* template */
  __webpack_require__(779),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 336:
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

/***/ 441:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_util__ = __webpack_require__(336);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      someOneUserDetails: {},
      getMoneyList: [],
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      infoList: [],
      showIncomeInfor: false,
      searchSaleContent: '',
      searchDataPrev: [],
      searchDataNext: null,
      searchSaleType: "手机号",
      searchMoneyType: "",
      searchGetType: "",
      nowUserMoneyNum: null,
      // selectSearchType:"用户编号",
      showChangeUserMoney: false,
      orderTime: '',
      orderState: ''
    };
  },
  created: function () {
    var that = this;
    that.getAllIn();
  },
  methods: {
    //获取收入列表
    getAllIn: function () {
      var that = this;
      var obj = {
        saleId: '',
        saleName: '',
        salePhone: '',
        orderId: '',
        signLateSeven: '',
        getState: '',
        startDate: '',
        endDate: '',
        currentPage: '',
        numberPerPage: '',
        token: ''
      };
      that.global.axiosGetReq('/saleIncomeList/query', obj).then(res => {
        if (res.data.callStatus === 'SUCCEED') {
          that.getMoneyList = res.data.data;
          for (var i = 0; i < that.getMoneyList.length; i++) {
            if (that.getMoneyList[i].orderVoList.length !== 0) {
              that.getMoneyList[i].orderCreated = that.getMoneyList[i].orderVoList[0].orderCreated;
              that.getMoneyList[i].orderId = that.getMoneyList[i].orderVoList[0].orderId;
              that.getMoneyList[i].orderState = that.getMoneyList[i].orderVoList[0].orderState;
            }
          }
        } else {
          that.$message.error('网络出错，请稍后再试！');
        }
      });
    },
    incomeList: function (scope) {
      var that = this;
      console.log(scope.row, 'scope');
      if (scope.row.orderVoList.length !== 0) {
        that.someOneUserDetails = scope.row;
        that.infoList = scope.row.orderVoList;
        that.orderTime = scope.row.orderVoList[0].orderCreated;
        that.orderState = scope.row.orderVoList[0].orderState;
        that.showIncomeInfor = true;
      } else {
        that.someOneUserDetails = scope.row;
        that.showIncomeInfor = true;
        that.infoList = [];
        that.orderTime = '';
        that.orderState = '';
      }
    },
    // 查询收入列表
    search: function () {
      var that = this;
      if (that.searchDataPrev.length == 0) {
        var startDate = '';
        var endDate = '';
      } else {
        var startDate = __WEBPACK_IMPORTED_MODULE_0__common_util__["a" /* default */].formatDate.format(new Date(that.searchDataPrev[0]));
        var endDate = __WEBPACK_IMPORTED_MODULE_0__common_util__["a" /* default */].formatDate.format(new Date(that.searchDataPrev[1]));
      }
      if (that.searchSaleType == '手机号') {
        var salePhone = that.searchSaleContent;
        var saleName = '';
      } else {
        var saleName = that.searchSaleContent;
        var salePhone = '';
      }
      var obj = {
        saleName: saleName,
        salePhone: salePhone,
        signLateSeven: that.searchGetType,
        getState: that.searchMoneyType,
        startDate: startDate,
        endDate: endDate,
        token: ''
      };
      that.global.axiosGetReq('/saleIncomeList/query', obj).then(res => {
        if (res.data.callStatus === 'SUCCEED') {
          that.getMoneyList = res.data.data;
          for (var i = 0; i < that.getMoneyList.length; i++) {
            if (that.getMoneyList[i].orderVoList.length !== 0) {
              that.getMoneyList[i].orderCreated = that.getMoneyList[i].orderVoList[0].orderCreated;
              that.getMoneyList[i].orderId = that.getMoneyList[i].orderVoList[0].orderId;
              that.getMoneyList[i].orderState = that.getMoneyList[i].orderVoList[0].orderState;
            }
          }
          console.log(that.getMoneyList, '222');
        } else {
          that.$message.error('网络出错，请稍后再试！');
        }
      });
    }
  }
});

/***/ }),

/***/ 499:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(292)(true);
// imports


// module
exports.push([module.i, ".incomeWrap .asgagewgf h3{font-weight:500;line-height:50px;color:#20a0ff}.incomeWrap .el-select .el-input{width:120px}.incomeWrap .asgagewgf .personalInfor{position:relative}.incomeWrap .asgagewgf .personalInfor img{position:absolute;top:0;right:0;width:150px;height:150px}.incomeWrap .asgagewgf span{width:30%;display:inline-block;line-height:35px}.incomeWrap .asgagewgf .ordertable span{display:inline-block;width:auto}.incomeWrap .asgagewgf .ordertable td{line-height:30px;padding-left:10px}.incomeWrap .asgagewgf .ordertable .maniCont{text-align:center}.incomeWrap .asgagewgf .ordertable .lastTr{color:red}.incomeWrap .asgagewgf .ordertable .lastTr td:nth-child(2){text-align:right;padding-right:10px}.datail_tb{width:100%;border-collapse:collapse;border:none;margin-top:20px}.datail_tb tr{width:100%;height:30px;line-height:30px;border:1px solid #ccc}.datail_tb td{width:100px;text-align:center;border:1px solid #ccc}", "", {"version":3,"sources":["/Users/daifeili/yayi-web/src/components/admin/salesManner/incomeList.vue"],"names":[],"mappings":"AACA,0BACE,gBAAiB,AACjB,iBAAkB,AAClB,aAAe,CAChB,AACD,iCACE,WAAa,CACd,AACD,sCACE,iBAAmB,CACpB,AACD,0CACE,kBAAmB,AACnB,MAAO,AACP,QAAS,AACT,YAAa,AACb,YAAc,CACf,AACD,4BACE,UAAW,AACX,qBAAsB,AACtB,gBAAkB,CACnB,AACD,wCACE,qBAAsB,AACtB,UAAY,CACb,AACD,sCACE,iBAAkB,AAClB,iBAAmB,CACpB,AACD,6CACE,iBAAmB,CACpB,AACD,2CACE,SAAW,CACZ,AACD,2DACE,iBAAkB,AAClB,kBAAoB,CACrB,AACD,WACE,WAAY,AACZ,yBAA0B,AAC1B,YAAa,AACb,eAAiB,CAClB,AACD,cACE,WAAY,AACZ,YAAa,AACb,iBAAkB,AAClB,qBAAuB,CACxB,AACD,cACE,YAAa,AACb,kBAAmB,AACnB,qBAAuB,CACxB","file":"incomeList.vue","sourcesContent":["\n.incomeWrap   .asgagewgf h3{\n  font-weight: 500;\n  line-height: 50px;\n  color: #20a0ff;\n}\n.incomeWrap .el-select .el-input{\n  width: 120px;\n}\n.incomeWrap   .asgagewgf .personalInfor{\n  position: relative;\n}\n.incomeWrap   .asgagewgf .personalInfor img{\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 150px;\n  height: 150px;\n}\n.incomeWrap   .asgagewgf  span{\n  width: 30%;\n  display: inline-block;\n  line-height: 35px;\n}\n.incomeWrap .asgagewgf .ordertable span{\n  display: inline-block;\n  width: auto;\n}\n.incomeWrap .asgagewgf .ordertable td{\n  line-height: 30px;\n  padding-left: 10px;\n}\n.incomeWrap .asgagewgf .ordertable .maniCont{\n  text-align: center;\n}\n.incomeWrap .asgagewgf .ordertable  .lastTr{\n  color: red;\n}\n.incomeWrap .asgagewgf .ordertable  .lastTr td:nth-child(2){\n  text-align: right;\n  padding-right: 10px;\n}\n.datail_tb{\n  width: 100%;\n  border-collapse: collapse;/* 边框合并属性  */\n  border: none;\n  margin-top: 20px;\n}\n.datail_tb tr{\n  width: 100%;\n  height: 30px;\n  line-height: 30px;\n  border: 1px solid #ccc;\n}\n.datail_tb td{\n  width: 100px;\n  text-align: center;\n  border: 1px solid #ccc;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 635:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(499);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(293)("15b20a2c", content, true);

/***/ }),

/***/ 779:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('el-row', {
    staticClass: "incomeWrap"
  }, [_c('el-col', {
    staticClass: "warp-breadcrum",
    attrs: {
      "span": 24
    }
  }, [_c('el-breadcrumb', {
    attrs: {
      "separator": "/"
    }
  }, [_c('el-breadcrumb-item', [_c('b', [_vm._v("销售员管理")])]), _vm._v(" "), _c('el-breadcrumb-item', [_vm._v("收入列表")])], 1)], 1), _vm._v(" "), _c('el-col', {
    staticClass: "toolbar",
    staticStyle: {
      "padding-bottom": "0px",
      "padding-top": "20px"
    }
  }, [_c('el-form', {
    attrs: {
      "inline": true
    }
  }, [_c('el-form-item', [_c('el-input', {
    model: {
      value: (_vm.searchSaleContent),
      callback: function($$v) {
        _vm.searchSaleContent = $$v
      },
      expression: "searchSaleContent"
    }
  }, [_c('el-select', {
    slot: "prepend",
    model: {
      value: (_vm.searchSaleType),
      callback: function($$v) {
        _vm.searchSaleType = $$v
      },
      expression: "searchSaleType"
    }
  }, [_c('el-option', {
    attrs: {
      "label": "手机号",
      "value": "手机号"
    }
  }), _vm._v(" "), _c('el-option', {
    attrs: {
      "label": "真实姓名",
      "value": "真实姓名"
    }
  })], 1)], 1)], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "签收已过7天："
    }
  }, [_c('el-select', {
    model: {
      value: (_vm.searchGetType),
      callback: function($$v) {
        _vm.searchGetType = $$v
      },
      expression: "searchGetType"
    }
  }, [_c('el-option', {
    attrs: {
      "label": "全部",
      "value": ""
    }
  }), _vm._v(" "), _c('el-option', {
    attrs: {
      "label": "是",
      "value": "1"
    }
  }), _vm._v(" "), _c('el-option', {
    attrs: {
      "label": "否",
      "value": "2"
    }
  })], 1)], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "收入状态："
    }
  }, [_c('el-select', {
    model: {
      value: (_vm.searchMoneyType),
      callback: function($$v) {
        _vm.searchMoneyType = $$v
      },
      expression: "searchMoneyType"
    }
  }, [_c('el-option', {
    attrs: {
      "label": "全部",
      "value": ""
    }
  }), _vm._v(" "), _c('el-option', {
    attrs: {
      "label": "待结算",
      "value": "1"
    }
  }), _vm._v(" "), _c('el-option', {
    attrs: {
      "label": "已结算",
      "value": "2"
    }
  }), _vm._v(" "), _c('el-option', {
    attrs: {
      "label": "已取消",
      "value": "3"
    }
  })], 1)], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "结算日期："
    }
  }, [_c('el-date-picker', {
    attrs: {
      "type": "daterange",
      "placeholder": "选择日期"
    },
    model: {
      value: (_vm.searchDataPrev),
      callback: function($$v) {
        _vm.searchDataPrev = $$v
      },
      expression: "searchDataPrev"
    }
  })], 1), _vm._v(" "), _c('el-form-item', [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.search
    }
  }, [_vm._v("查询")])], 1)], 1)], 1), _vm._v(" "), _c('el-table', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "data": _vm.getMoneyList,
      "border": ""
    }
  }, [_c('el-table-column', {
    attrs: {
      "prop": "saleName",
      "align": "center",
      "label": "真实姓名"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "salePhone",
      "align": "center",
      "label": "手机号"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "orderId",
      "align": "center",
      "label": "订单编号"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "orderState",
      "align": "center",
      "label": "订单状态"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [(scope.row.getState == 0) ? _c('span', [_vm._v("订单取消")]) : _vm._e(), _vm._v(" "), (scope.row.getState == 1) ? _c('span', [_vm._v("待付款")]) : _vm._e(), _vm._v(" "), (scope.row.getState == 2) ? _c('span', [_vm._v("待发货")]) : _vm._e(), _vm._v(" "), (scope.row.getState == 3) ? _c('span', [_vm._v("待收货")]) : _vm._e(), _vm._v(" "), (scope.row.getState == 4) ? _c('span', [_vm._v("待评价")]) : _vm._e(), _vm._v(" "), (scope.row.getState == 5) ? _c('span', [_vm._v("订单确认")]) : _vm._e(), _vm._v(" "), (scope.row.getState == 6) ? _c('span', [_vm._v("退款退货中")]) : _vm._e()]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "orderCreated",
      "align": "center",
      "label": "下单日期"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "signLateSeven",
      "align": "center",
      "label": "签收已过7天"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [(scope.row.getState == 1) ? _c('span', [_vm._v("是")]) : _vm._e(), _vm._v(" "), (scope.row.getState == 2) ? _c('span', [_vm._v("否")]) : _vm._e()]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "getMoney",
      "align": "center",
      "label": "收入"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "getState",
      "align": "center",
      "label": "收入状态"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [(scope.row.getState == 1) ? _c('span', [_vm._v("待结算")]) : _vm._e(), _vm._v(" "), (scope.row.getState == 2) ? _c('span', [_vm._v("已结算")]) : _vm._e(), _vm._v(" "), (scope.row.getState == 3) ? _c('span', [_vm._v("已取消")]) : _vm._e()]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "getUpdated",
      "align": "center",
      "label": "结算日期"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
      "label": "操作"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-button', {
          on: {
            "click": function($event) {
              _vm.incomeList(scope)
            }
          }
        }, [_vm._v("详情")])]
      }
    }])
  })], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "custom-class": "asgagewgf",
      "title": "收入详情",
      "visible": _vm.showIncomeInfor
    },
    on: {
      "update:visible": function($event) {
        _vm.showIncomeInfor = $event
      }
    }
  }, [_c('div', {
    staticClass: "personalInfor"
  }, [_c('h3', [_vm._v("销售员信息")]), _vm._v(" "), _c('div', {}, [_c('span', [_vm._v("销售员编号：" + _vm._s(_vm.someOneUserDetails.saleId))]), _vm._v(" "), _c('span', [_vm._v("销售员姓名：" + _vm._s(_vm.someOneUserDetails.saleName))]), _vm._v(" "), _c('span', [_vm._v("销售员手机号：" + _vm._s(_vm.someOneUserDetails.salePhone))])])]), _vm._v(" "), _c('div', {
    staticClass: "certification"
  }, [_c('h3', [_vm._v("用户信息")]), _vm._v(" "), _c('div', {}, [_c('span', [_vm._v("用户编号：" + _vm._s(_vm.someOneUserDetails.userId))]), _vm._v(" "), _c('span', [_vm._v("用户姓名：" + _vm._s(_vm.someOneUserDetails.userName))]), _vm._v(" "), _c('span', [_vm._v("用户手机号：" + _vm._s(_vm.someOneUserDetails.userPhone))])])]), _vm._v(" "), _c('h3', [_vm._v("订单信息")]), _vm._v(" "), _c('div', {
    staticClass: "ordertable"
  }, [_c('table', {
    staticClass: "datail_tb"
  }, [_c('tr', [_c('td', {
    attrs: {
      "colspan": "7"
    }
  }, [_c('span', {
    staticClass: "pad_l_30"
  }, [_vm._v("下单时间：" + _vm._s(_vm.orderTime))]), _c('span', {
    staticClass: "pad_l_30"
  }, [_vm._v("订单状态：" + _vm._s(_vm.orderState))])])]), _vm._v(" "), _c('tr', {
    staticClass: "trs"
  }, [_c('td', [_vm._v("商品名称")]), _vm._v(" "), _c('td', [_vm._v("价格（元）")]), _vm._v(" "), _c('td', [_vm._v("数量")]), _vm._v(" "), _c('td', [_vm._v("小计")]), _vm._v(" "), _c('td', [_vm._v("退款金额（元）")]), _vm._v(" "), _c('td', [_vm._v("收入状态")]), _vm._v(" "), _c('td', [_vm._v("总收入元")])]), _vm._v(" "), _vm._l((_vm.infoList), function(item, index) {
    return _c('tr', {
      key: index,
      staticClass: "trs"
    }, [_c('td', [_vm._v(_vm._s(item.itemName))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(item.price))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(item.num))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(item.price * item.num))]), _vm._v(" "), (index == 0) ? _c('td', {
      attrs: {
        "rowspan": _vm.infoList.length
      }
    }, [_vm._v(_vm._s(item.refundMoney))]) : _vm._e(), _vm._v(" "), (index == 0) ? _c('td', {
      attrs: {
        "rowspan": _vm.infoList.length
      }
    }, [_vm._v(_vm._s(item.signUpdated))]) : _vm._e(), _vm._v(" "), (index == 0) ? _c('td', {
      attrs: {
        "rowspan": _vm.infoList.length
      }
    }, [_vm._v(_vm._s(item.totalFee))]) : _vm._e()])
  })], 2)])])], 1)
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=25.fd18c2d26e5136036c7e.js.map