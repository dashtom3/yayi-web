webpackJsonp([27],{

/***/ 316:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(695)
}
var Component = __webpack_require__(8)(
  /* script */
  __webpack_require__(447),
  /* template */
  __webpack_require__(831),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 447:
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


/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      needBindSaleUserIndex: null,
      needBindUserPhone: null,
      showBindSalAlert: false,
      showUserDetailInfor: false,
      searchUserContent: null,
      searchUserStyle: "手机号",
      searchtype: '全部',
      searchisBindSale: "全部",
      searchSaleName: null,
      bindSaleSearchType: '手机号',
      bindSaleSearchCont: null,
      options: [{
        value: '选项1',
        label: '全部'
      }, {
        value: '选项2',
        label: '是'
      }, {
        value: '选项3',
        label: '否'
      }],
      isBindSale: "全部",
      types: [{
        value: '选项1',
        label: '全部'
      }, {
        value: '选项2',
        label: '个人'
      }, {
        value: '选项3',
        label: '机构'
      }],

      userList: [],
      someOneUserDetails: {
        bindSales: [],
        address: []
      },
      salesList: []
    };
  },
  created: function () {
    var that = this;
    that.getUserList();
    that.getSalesList();
  },
  filters: {
    calculateUserType: function (data) {
      var str = "";
      if (data == 1) {
        str = "个人";
      } else {
        str = "机构";
      }
      return str;
    }
  },
  methods: {
    getUserList: function () {
      var that = this;
      var obj = {
        // token:that.global.getToken()
        phone: "",
        trueName: "",
        companyName: "",
        isBindSale: "",
        type: "",
        saleName: "",
        token: "111"
      };
      that.global.axiosGetReq('/userManageList/userlist', obj).then(res => {
        if (res.data.callStatus === 'SUCCEED') {
          that.userList = res.data.data;
        } else {
          that.$message.error('网络出错，请稍后再试！');
        }
      });
    },
    getSalesList: function () {
      var that = this;
      var obj = {
        salePhone: '',
        saleName: '',
        token: "111"
      };
      that.global.axiosGetReq('/userManageList/salelist', obj).then(res => {
        console.log(res, "saleList");
        if (res.data.callStatus === 'SUCCEED') {
          that.salesList = res.data.data;
        } else {
          that.$message.error('网络出错，请稍后再试！');
        }
      });
    },
    getOneUserDetails: function (userPhone) {
      var that = this;
      var obj = {
        phone: userPhone,
        token: "1111"
      };
      that.global.axiosGetReq('/userManageList/detail', obj).then(res => {
        if (res.data.callStatus === 'SUCCEED') {
          console.log(res, "getOneUserDetails");
          that.someOneUserDetails = res.data.data;
          var boj2 = {
            name: that.someOneUserDetails.saleName,
            phone: that.someOneUserDetails.salePhone,
            time: that.someOneUserDetails.saleCreated,
            hehushu: that.someOneUserDetails.bindUserNum
          };
          that.someOneUserDetails.bindSales = [];
          that.someOneUserDetails.bindSales.push(boj2);
        } else {
          that.$message.error('网络出错，请稍后再试！');
        }
      });
    },
    bandThisSale: function (index, one) {
      var that = this;
      var obj = {
        token: "1211",
        // token:that.global.getToken()
        salePhone: one.phone,
        userPhone: that.needBindUserPhone
      };
      that.global.axiosPostReq('/userManageList/bind', obj).then(res => {
        if (res.data.callStatus === 'SUCCEED') {
          that.userList[that.needBindSaleUserIndex].isBindSale = "是";
          that.userList[that.needBindSaleUserIndex].saleName = that.salesList[index].name;
          that.showBindSalAlert = false;
        } else {
          that.$message.error('网络出错，请稍后再试！');
        }
      });
    },
    addBindSale: function (index, one) {
      var that = this;
      that.needBindUserPhone = one.phone;
      that.needBindSaleUserIndex = index;
      that.showBindSalAlert = true;
    },
    details: function (index, user) {
      var that = this;
      that.showUserDetailInfor = true;
      that.getOneUserDetails(user.phone);
    },
    searchSalse: function () {
      var that = this;
      var obj = {
        token: "111"
      };
      if (that.bindSaleSearchCont) {
        if (that.bindSaleSearchType == "手机号") {
          obj.salePhone = that.bindSaleSearchCont;
        } else {
          obj.saleName = that.bindSaleSearchCont;
        }
        that.global.axiosGetReq('/userManageList/salelist', obj).then(res => {
          if (res.data.callStatus === 'SUCCEED') {
            that.salesList = res.data.data;
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        });
      } else {
        this.$alert('请输入查找内容', { confirmButtonText: '确定' });
      }
    },
    search: function () {
      var flag = true;
      var that = this;
      var obj = {
        saleName: that.searchSaleName,
        token: "111"
      };
      // 收索用户类型
      if (that.searchUserStyle == "手机号") {
        obj.phone = that.searchUserContent;
        obj.trueName = "";
        obj.companyName = "";
      } else if (that.searchUserStyle == "单位名称") {
        obj.phone = "";
        obj.trueName = "";
        obj.companyName = that.searchUserContent;
      } else if (that.searchUserStyle == "真实姓名") {
        obj.phone = "";
        obj.trueName = that.searchUserContent;
        obj.companyName = "";
      }
      //类型
      if (that.searchtype == "全部") {
        obj.type = "";
      } else if (that.searchtype == "选项2") {
        obj.type = 1;
      } else if (that.searchtype == "选项3") {
        obj.type = 2;
      }
      //是否绑定销售
      if (that.searchisBindSale == "全部") {
        obj.isBindSale = "";
      } else if (that.searchisBindSale == "选项2") {
        obj.isBindSale = 1;
      } else if (that.searchisBindSale == "选项3") {
        obj.isBindSale = 2;
      }
      if (!that.searchSaleName) {
        that.searchSaleName = "";
      }
      // console.log(obj,"headSearchObj")
      that.global.axiosGetReq('/userManageList/userlist', obj).then(res => {
        console.log(res, "headSearchResult");
        if (res.data.callStatus === 'SUCCEED') {
          that.userList = res.data.data;
          //清空搜寻项目
        } else {
          that.$message.error('网络出错，请稍后再试！');
        }
      });
    },
    cancelBindSale: function (index, one) {
      var that = this;
      that.$confirm('确定取消该绑定吗?', { confirmButtonText: '确定', cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var obj = {
          token: "1211",
          // token:that.global.getToken()
          salePhone: one.salePhone,
          userPhone: one.phone
        };
        that.global.axiosPostReq('/userManageList/disBind', obj).then(res => {
          if (res.data.callStatus === 'SUCCEED') {
            that.userList[index].isBindSale = "否";
            that.userList[index].saleName = "";
            that.$message({
              type: 'success',
              message: '解除成功!'
            });
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        });
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '已取消解除'
        });
      });
    }
  }
});

/***/ }),

/***/ 559:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(292)(true);
// imports


// module
exports.push([module.i, ".userListWrap .el-select .el-input{width:110px}.userListWrap .asgagewgf h3{font-weight:500;line-height:50px;color:#20a0ff}.userListWrap .asgagewgf .personalInfor{position:relative}.userListWrap .asgagewgf .personalInfor img{position:absolute;top:0;right:0;width:150px;height:150px}.userListWrap .asgagewgf span{width:40%;display:inline-block;line-height:35px}", "", {"version":3,"sources":["/Users/daifeili/yayi-web/src/components/admin/userManner/userList.vue"],"names":[],"mappings":"AACA,mCACI,WAAa,CAChB,AACD,4BACI,gBAAiB,AACjB,iBAAkB,AAClB,aAAe,CAClB,AACD,wCACI,iBAAmB,CACtB,AACD,4CACI,kBAAmB,AACnB,MAAO,AACP,QAAS,AACT,YAAa,AACb,YAAc,CACjB,AACD,8BACI,UAAW,AACX,qBAAsB,AACtB,gBAAkB,CACrB","file":"userList.vue","sourcesContent":["\n.userListWrap .el-select .el-input {\n    width: 110px;\n}\n.userListWrap   .asgagewgf h3{\n    font-weight: 500;\n    line-height: 50px;\n    color: #20a0ff;\n}\n.userListWrap   .asgagewgf .personalInfor{\n    position: relative;\n}\n.userListWrap   .asgagewgf .personalInfor img{\n    position: absolute;\n    top: 0;\n    right: 0;\n    width: 150px;\n    height: 150px;\n}\n.userListWrap   .asgagewgf  span{\n    width: 40%;\n    display: inline-block;\n    line-height: 35px;\n}\n  /*.demo-table-expand label {\n    font-weight: bold;\n  }\n  .warp  .warp-main .el-input{\n    width: 100%;\n    padding-right: 0px;\n  }\n  .warp .el-input{\n    width: 70%;\n    padding-right: 20px;\n  }*/\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 695:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(559);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(293)("1847c902", content, true);

/***/ }),

/***/ 831:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('el-row', {
    staticClass: "userListWrap"
  }, [_c('el-col', {
    staticClass: "warp-breadcrum",
    attrs: {
      "span": 24
    }
  }, [_c('el-breadcrumb', {
    attrs: {
      "separator": "/"
    }
  }, [_c('el-breadcrumb-item', [_c('b', [_vm._v("用户管理")])]), _vm._v(" "), _c('el-breadcrumb-item', [_vm._v("用户列表")])], 1)], 1), _vm._v(" "), _c('el-col', {
    staticClass: "warp-main",
    attrs: {
      "span": 24
    }
  }, [_c('el-col', {
    staticClass: "toolbar",
    staticStyle: {
      "padding-bottom": "0px"
    }
  }, [_c('el-form', {
    attrs: {
      "inline": true
    }
  }, [_c('el-form-item', [_c('el-input', {
    model: {
      value: (_vm.searchUserContent),
      callback: function($$v) {
        _vm.searchUserContent = $$v
      },
      expression: "searchUserContent"
    }
  }, [_c('el-select', {
    attrs: {
      "placeholder": "请选择"
    },
    slot: "prepend",
    model: {
      value: (_vm.searchUserStyle),
      callback: function($$v) {
        _vm.searchUserStyle = $$v
      },
      expression: "searchUserStyle"
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
  }), _vm._v(" "), _c('el-option', {
    attrs: {
      "label": "单位名称",
      "value": "单位名称"
    }
  })], 1)], 1)], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "是否绑定销售："
    }
  }, [_c('el-select', {
    attrs: {
      "placeholder": "请选择"
    },
    model: {
      value: (_vm.searchisBindSale),
      callback: function($$v) {
        _vm.searchisBindSale = $$v
      },
      expression: "searchisBindSale"
    }
  }, _vm._l((_vm.options), function(item) {
    return _c('el-option', {
      key: item.value,
      attrs: {
        "label": item.label,
        "value": item.value
      }
    })
  }))], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "类型："
    }
  }, [_c('el-select', {
    attrs: {
      "placeholder": "请选择"
    },
    model: {
      value: (_vm.searchtype),
      callback: function($$v) {
        _vm.searchtype = $$v
      },
      expression: "searchtype"
    }
  }, _vm._l((_vm.types), function(item) {
    return _c('el-option', {
      key: item.value,
      attrs: {
        "label": item.label,
        "value": item.value
      }
    })
  }))], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "销售员名称："
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.searchSaleName),
      callback: function($$v) {
        _vm.searchSaleName = $$v
      },
      expression: "searchSaleName"
    }
  })], 1), _vm._v(" "), _c('el-form-item', [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.search()
      }
    }
  }, [_vm._v("查询")])], 1)], 1)], 1), _vm._v(" "), _c('el-table', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "data": _vm.userList,
      "border": ""
    }
  }, [_c('el-table-column', {
    attrs: {
      "prop": "trueName",
      "align": "center",
      "label": "用户姓名"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "phone",
      "align": "center",
      "label": "手机号"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "companyName",
      "align": "center",
      "label": "单位名称"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "type",
      "align": "center",
      "label": "类型"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [(scope.row.type == 1) ? _c('span', [_vm._v("个人")]) : _vm._e(), _vm._v(" "), (scope.row.type == 2) ? _c('span', [_vm._v("机构")]) : _vm._e()]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "isBindSale",
      "align": "center",
      "label": "是否绑定销售"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [(scope.row.isBindSale == 1) ? _c('span', [_vm._v("是")]) : _c('span', [_vm._v("否")])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "saleName",
      "align": "center",
      "label": "销售员姓名"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "操作",
      "align": "center"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [(scope.row.isBindSale == 1) ? _c('el-button', {
          attrs: {
            "type": "text"
          },
          on: {
            "click": function($event) {
              _vm.cancelBindSale(scope.$index, scope.row)
            }
          }
        }, [_vm._v("取消绑定")]) : _c('el-button', {
          attrs: {
            "type": "text"
          },
          on: {
            "click": function($event) {
              _vm.addBindSale(scope.$index, scope.row)
            }
          }
        }, [_vm._v("绑定销售")]), _vm._v(" "), _c('el-button', {
          attrs: {
            "type": "text"
          },
          on: {
            "click": function($event) {
              _vm.details(scope.$index, scope.row)
            }
          }
        }, [_vm._v("详情")])]
      }
    }])
  })], 1)], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "绑定销售员",
      "visible": _vm.showBindSalAlert
    },
    on: {
      "update:visible": function($event) {
        _vm.showBindSalAlert = $event
      }
    }
  }, [_c('el-form', {
    attrs: {
      "inline": true
    }
  }, [_c('el-form-item', [_c('el-select', {
    attrs: {
      "placeholder": "请选择"
    },
    model: {
      value: (_vm.bindSaleSearchType),
      callback: function($$v) {
        _vm.bindSaleSearchType = $$v
      },
      expression: "bindSaleSearchType"
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
  })], 1)], 1), _vm._v(" "), _c('el-form-item', [_c('el-input', {
    attrs: {
      "placeholder": "请输入内容"
    },
    model: {
      value: (_vm.bindSaleSearchCont),
      callback: function($$v) {
        _vm.bindSaleSearchCont = $$v
      },
      expression: "bindSaleSearchCont"
    }
  }, [_c('el-button', {
    attrs: {
      "icon": "search"
    },
    on: {
      "click": function($event) {
        _vm.searchSalse()
      }
    },
    slot: "append"
  })], 1)], 1)], 1), _vm._v(" "), _c('el-table', {
    attrs: {
      "height": "500",
      "data": _vm.salesList,
      "border": ""
    }
  }, [_c('el-table-column', {
    attrs: {
      "align": "center",
      "property": "phone",
      "label": "手机号"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
      "property": "trueName",
      "label": "真实姓名",
      "width": "200"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
      "property": "hehushu",
      "label": "操作"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-button', {
          attrs: {
            "type": "text"
          },
          on: {
            "click": function($event) {
              _vm.bandThisSale(scope.$index, scope.row)
            }
          }
        }, [_vm._v("绑定")])]
      }
    }])
  })], 1)], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "custom-class": "asgagewgf",
      "title": "用户详情",
      "visible": _vm.showUserDetailInfor
    },
    on: {
      "update:visible": function($event) {
        _vm.showUserDetailInfor = $event
      }
    }
  }, [_c('div', {
    staticClass: "personalInfor"
  }, [_c('img', {
    attrs: {
      "src": _vm.someOneUserDetails.userPic,
      "alt": ""
    }
  }), _vm._v(" "), _c('h3', [_vm._v("个人信息")]), _vm._v(" "), _c('div', {}, [_c('span', [_vm._v("用户编号：" + _vm._s(_vm.someOneUserDetails.userId))]), _vm._v(" "), _c('span', [_vm._v("真实姓名：" + _vm._s(_vm.someOneUserDetails.trueName))])]), _vm._v(" "), _c('div', {}, [_c('span', [_vm._v("手机号：" + _vm._s(_vm.someOneUserDetails.phone))]), _vm._v(" "), _c('span', [_vm._v("性别：" + _vm._s(_vm.someOneUserDetails.sex))])]), _vm._v(" "), _c('div', {}, [_c('span', [_vm._v("生日：" + _vm._s(_vm.someOneUserDetails.birthday))]), _vm._v(" "), _c('span', [_vm._v("QQ：" + _vm._s(_vm.someOneUserDetails.qq))])])]), _vm._v(" "), _c('div', {
    staticClass: "certification"
  }, [_c('h3', [_vm._v("资质认证")]), _vm._v(" "), _c('div', {}, [_c('span', [_vm._v("类型：" + _vm._s(_vm._f("calculateUserType")(_vm.someOneUserDetails.type)))]), _vm._v(" "), _c('span', [_vm._v("单位名称：" + _vm._s(_vm.someOneUserDetails.companyName))])]), _vm._v(" "), _c('div', {}, [_c('span', [_vm._v("所在地：" + _vm._s(_vm.someOneUserDetails.part))]), _vm._v(" "), _c('span', [_vm._v("详细地址：" + _vm._s(_vm.someOneUserDetails.workAddress))])]), _vm._v(" "), _c('div', {}, [_c('span', [_vm._v("口腔执业医师资格证：")]), _vm._v(" "), _c('img', {
    staticStyle: {
      "width": "100px",
      "height": "100px",
      "display": "block"
    },
    attrs: {
      "src": _vm.someOneUserDetails.doctorPic,
      "alt": ""
    }
  })])]), _vm._v(" "), _c('h3', [_vm._v("绑定的销售")]), _vm._v(" "), _c('el-table', {
    attrs: {
      "data": _vm.someOneUserDetails.bindSales,
      "border": ""
    }
  }, [_c('el-table-column', {
    attrs: {
      "align": "center",
      "property": "bianhao",
      "label": "销售员编号",
      "width": "150"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
      "property": "name",
      "label": "真实姓名",
      "width": "200"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
      "property": "phone",
      "label": "手机号"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
      "property": "time",
      "label": "注册时间"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
      "property": "hehushu",
      "label": "客户数"
    }
  })], 1), _vm._v(" "), _c('h3', [_vm._v("收货地址")]), _vm._v(" "), _c('el-table', {
    attrs: {
      "data": _vm.someOneUserDetails.Receiver
    }
  }, [_c('el-table-column', {
    attrs: {
      "align": "center",
      "property": "receiverName",
      "label": "收货人",
      "width": "150"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
      "label": "所在地区",
      "width": "200"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('span', [_vm._v(_vm._s(scope.row.province))]), _vm._v(" "), _c('span', [_vm._v(_vm._s(scope.row.city))]), _vm._v(" "), _c('span', [_vm._v(_vm._s(scope.row.county))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
      "property": "receiverDetail",
      "label": "详细地址"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
      "property": "receiverPhone",
      "label": "手机/电话"
    }
  })], 1)], 1)], 1)
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=27.6f2380e800b320990adb.js.map