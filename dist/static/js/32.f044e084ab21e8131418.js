webpackJsonp([32],{

/***/ 298:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(675)
}
var Component = __webpack_require__(8)(
  /* script */
  __webpack_require__(427),
  /* template */
  __webpack_require__(813),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 427:
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


/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      formData: {
        addGoodAttrName: null,
        addGoodAttrOneVal: null
      },
      rules1: {
        addGoodAttrName: { required: true, message: '请输入属性名称', trigger: 'blur' },
        addGoodAttrOneVal: { required: true, message: '请输入属性值', trigger: 'blur' }
      },
      bindTitle: null,
      addGoodAttrValues: [],
      searchAttrName: null,
      changeThisAll: null,
      changAttrIndex: null,
      // 1是增加，2是修改
      attOperaType: 1,
      wantAddAttr: {
        addName: null,
        willname: null,
        addAttrValues: []
      },
      addAttrShow: [],
      tableData: [
        // {itemPropertyName:"sdfg",itempropertydList:[{name:"1"},{name:"1"},{name:"1"}]},
      ],
      showAddGoodAttr: false,
      channgAttrId: null,
      flag1: true
    };
  },
  created: function () {
    var that = this;
    that.getGoodAttrList();
  },
  methods: {
    getGoodAttrList: function () {
      var that = this;
      that.global.axiosGetReq('/item/queryProperty').then(res => {
        if (res.data.callStatus === 'SUCCEED') {
          console.log(res.data.data, "getGoodAttrList");
          var data = res.data.data;
          that.tableData = data;
        } else {
          that.$message.error('网络出错，请稍后再试！');
        }
      }, err => {
        that.$message.error('网络出错，请稍后再试！');
      });
    },
    addGoodAttr: function () {
      var that = this;
      that.bindTitle = "添加商品属性";
      that.showAddGoodAttr = true;
      that.attOperaType = 1;
      that.formData.addGoodAttrName = null;
      that.addGoodAttrValues = [];
      that.flag1 = false;
    },
    changThisAttrVal: function (index, e, item) {
      var that = this;
      if (e.target._value) {
        if (that.attOperaType == 2) {
          //修改已有属性属性值
          that.$confirm('确定修改该属性值吗, 是否继续?', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
            var obj = {
              itemPparam: e.target._value,
              itemSKU: item.itemSKU
            };
            that.global.axiosPostReq('/item/updatePropertyd', obj).then(res => {
              that.addGoodAttrValues[index].itemPparam = e.target._value;
              that.changeThisAll = null;
              that.flag1 = true;
            });
          });
        }
      } else {
        this.$alert('请填写完整商品的属性值', { confirmButtonText: '确定' });
        that.flag1 = false;
      }
    },
    changeThisAttr: function (index, item) {
      // console.log(item)
      this.changeThisAll = index;
      this.flag1 = false;
      this.attOperaType = 2;
    },
    search: function () {
      var that = this;
      var obj = {
        itemPropertyName: that.searchAttrName,
        token: "awfa"
        // if(that.searchAttrName){
      };that.global.axiosPostReq('/item/queryProperty', obj).then(res => {
        // console.log(res.data.data,"search")
        if (res.data.callStatus === 'SUCCEED') {
          that.tableData = res.data.data;
          // console.log(that.tableData)
          // that.searchAttrName = null;//清空收索内容
        } else {
          that.$message.error('网络出错，请稍后再试！');
        }
      }
      // }else{
      //   this.$alert('请输入属性名', {confirmButtonText: '确定',});
      // }
      );
    },
    DELEONE: function (index, item) {
      var that = this;
      that.$confirm('确定删除该属性吗?', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
        var obj = {
          itemPropertyId: item.itemPropertyId
        };
        console.log(obj);
        that.global.axiosPostReq('/item/deleteProperty', obj).then(res => {
          if (res.data.callStatus === 'SUCCEED') {
            that.$message({ type: 'success', message: '删除成功!' });
            that.tableData.splice(index, 1);
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        });
      });
    },
    alertMsg: function (msg) {
      var that = this;
      that.$alert(msg, { confirmButtonText: '确定' });
    },
    changeOneAttr: function (index, item) {
      var that = this;
      that.bindTitle = "修改商品属性";
      that.formData.addGoodAttrName = item.itemPropertyName;
      that.addGoodAttrValues = item.itempropertydList;
      that.channgAttrId = item.itemPropertyId;
      that.changAttrIndex = index;
      that.attOperaType = 2;
      that.showAddGoodAttr = true;
    },
    saveOneAttrs: function () {
      var that = this;
      if (that.attOperaType == 1) {
        //添加
        if (that.flag1) {
          var obj = {};
          var arr = [];
          var arr2 = [];
          for (let i in that.addGoodAttrValues) {
            arr.push(that.addGoodAttrValues[i].itemPparam);
            arr2.push({ itemPparam: that.addGoodAttrValues[i].itemPparam });
          }
          obj.itemPparamList = arr;
          obj.itemPropertyName = that.formData.addGoodAttrName;
          that.global.axiosPostReq('/item/addPropertydAndPropertyName', obj).then(res => {
            console.log(res);
            if (res.data.callStatus === 'SUCCEED') {
              obj.itempropertydList = arr2;
              that.tableData.push(obj);
              that.addGoodAttrValues = [];
              that.formData.addGoodAttrName = null;
              that.showAddGoodAttr = false;
            } else {
              that.$message.error('网络出错，请稍后再试！');
            }
          });
        } else {
          this.$alert('请填写完整商品的属性名或属性值', { confirmButtonText: '确定' });
        }
      }
      if (that.attOperaType == 2) {
        // 修改
        if (that.flag1) {
          var obj2 = {
            itemPropertyId: that.channgAttrId,
            itemPropertyName: that.formData.addGoodAttrName
          };
          console.log(that.tableData[that.changAttrIndex]);
          that.global.axiosPostReq('/item/updateProperty', obj2).then(res => {
            if (res.data.callStatus === 'SUCCEED') {
              that.tableData[that.changAttrIndex].itemPropertyName = that.formData.addGoodAttrName;
              that.tableData[that.changAttrIndex].itempropertydList = that.addGoodAttrValues;
              that.showAddGoodAttr = false;
            } else {
              that.$message.error('网络出错，请稍后再试！');
            }
          });
        } else {
          this.$alert('请填写完整商品的属性名或属性值', { confirmButtonText: '确定' });
        }
      }
    },
    deleOneAttrVal: function (index, item) {
      var that = this;
      if (that.attOperaType == 2) {
        that.$confirm('确定删除该属性值吗, 是否继续?', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
          var obj = {
            itemSKU: item.itemSKU
          };

          that.global.axiosPostReq('/item/deletePropertyd', obj).then(res => {
            if (res.data.callStatus === 'SUCCEED') {
              that.addGoodAttrValues.splice(index, 1);
              that.changeThisAll = null;
            } else {
              that.$message.error('网络出错，请稍后再试！');
            }
          });
        });
      } else {
        that.addGoodAttrValues.splice(index, 1);
        that.changeThisAll = null;
      }
    },
    addOneAttrVal: function (formName) {
      var that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          if (that.attOperaType == 2) {
            var msg = true;
            for (let i in that.addGoodAttrValues) {
              if (that.addGoodAttrValues[i].itemPparam == that.formData.addGoodAttrOneVal) {
                msg = "填写的属性值有重复项，请重新填写";
              }
            }
            if (msg == true) {
              var obj = {
                itemPid: that.tableData[that.changAttrIndex].itemPropertyId,
                itemPparam: that.formData.addGoodAttrOneVal
              };
              that.global.axiosPostReq('/item/addToPropertyd', obj).then(res => {
                if (res.data.callStatus === 'SUCCEED') {
                  var aa = {};
                  aa.itemPparam = that.formData.addGoodAttrOneVal;
                  that.addGoodAttrValues.push(aa);
                  that.formData.addGoodAttrOneVal = null;
                  that.flag1 = true;
                } else {
                  that.$message.error('网络出错，请稍后再试！');
                }
              });
            } else {
              that.alertMsg(msg);
            }
          } else {
            var msg = true;
            for (let i in that.addGoodAttrValues) {
              if (that.addGoodAttrValues[i].itemPparam == that.formData.addGoodAttrOneVal) {
                msg = "填写的属性值有重复项，请重新填写";
              }
            }
            if (msg == true) {
              var aa = {};
              aa.itemPparam = that.formData.addGoodAttrOneVal;
              that.addGoodAttrValues.push(aa);
              that.formData.addGoodAttrOneVal = null;
              that.flag1 = true;
            } else {
              that.alertMsg(msg);
            }
          }
        } else {
          that.alertMsg("请填写完整商品的属性名或属性值!");
          that.flag1 = false;
          return false;
        }
      });
    }
  }
});

/***/ }),

/***/ 539:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(292)(true);
// imports


// module
exports.push([module.i, ".demo-table-expand label{font-weight:700}.warp .warp-main .el-input{width:100%;padding-right:0}.warp .el-input{width:70%}", "", {"version":3,"sources":["/Users/daifeili/yayi-web/src/components/admin/bsseInfoManner/attr.vue"],"names":[],"mappings":"AACA,yBACE,eAAkB,CACnB,AACD,2BACE,WAAY,AACZ,eAAmB,CACpB,AACD,gBACE,SAAW,CAEZ","file":"attr.vue","sourcesContent":["\n.demo-table-expand label {\n  font-weight: bold;\n}\n.warp  .warp-main .el-input{\n  width: 100%;\n  padding-right: 0px;\n}\n.warp .el-input{\n  width: 70%;\n  /*padding-right: 20px;*/\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 675:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(539);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(293)("849ba278", content, true);

/***/ }),

/***/ 813:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('el-row', {
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
  }, [_c('el-breadcrumb-item', [_c('b', [_vm._v("商品基础资料管理")])]), _vm._v(" "), _c('el-breadcrumb-item', [_vm._v("商品属性管理")])], 1)], 1), _vm._v(" "), _c('el-col', {
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
    attrs: {
      "placeholder": "请输入属性名称"
    },
    model: {
      value: (_vm.searchAttrName),
      callback: function($$v) {
        _vm.searchAttrName = $$v
      },
      expression: "searchAttrName"
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
  }, [_vm._v("查询")])], 1)], 1)], 1), _vm._v(" "), _c('el-col', {
    staticStyle: {
      "text-align": "right",
      "line-height": "40px"
    }
  }, [_c('el-button', {
    attrs: {
      "type": "text"
    },
    on: {
      "click": function($event) {
        _vm.addGoodAttr()
      }
    }
  }, [_vm._v("+添加商品属性")])], 1), _vm._v(" "), _c('el-table', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "data": _vm.tableData,
      "border": ""
    }
  }, [_c('el-table-column', {
    attrs: {
      "type": "index",
      "width": "200px",
      "align": "center",
      "label": "序号"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "itemPropertyName",
      "align": "center",
      "label": "属性名"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "itempropertydList",
      "align": "center",
      "label": "属性值"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return _vm._l((scope.row.itempropertydList), function(one, index) {
          return _c('span', [_vm._v("\n            " + _vm._s(one.itemPparam) + "\n            "), (index != scope.row.itempropertydList.length - 1) ? _c('span', [_vm._v("/")]) : _vm._e()])
        })
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
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
              _vm.changeOneAttr(scope.$index, scope.row)
            }
          }
        }, [_vm._v("修改")]), _vm._v(" "), _c('el-button', {
          attrs: {
            "type": "text"
          },
          on: {
            "click": function($event) {
              _vm.DELEONE(scope.$index, scope.row)
            }
          }
        }, [_vm._v("删除")])]
      }
    }])
  })], 1)], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": _vm.bindTitle,
      "visible": _vm.showAddGoodAttr
    },
    on: {
      "update:visible": function($event) {
        _vm.showAddGoodAttr = $event
      }
    }
  }, [_c('el-form', {
    ref: "formData",
    staticClass: "demo-dynamic",
    attrs: {
      "label-width": "100px",
      "model": _vm.formData,
      "rules": _vm.rules1
    }
  }, [_c('el-form-item', {
    attrs: {
      "prop": "addGoodAttrName",
      "label": "属性名称："
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.formData.addGoodAttrName),
      callback: function($$v) {
        _vm.formData.addGoodAttrName = $$v
      },
      expression: "formData.addGoodAttrName"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "prop": "addGoodAttrOneVal",
      "label": "属性值："
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.formData.addGoodAttrOneVal),
      callback: function($$v) {
        _vm.formData.addGoodAttrOneVal = $$v
      },
      expression: "formData.addGoodAttrOneVal"
    }
  }), _vm._v(" "), _c('el-button', {
    on: {
      "click": function($event) {
        _vm.addOneAttrVal('formData')
      }
    }
  }, [_vm._v("添加")])], 1)], 1), _vm._v(" "), _c('el-table', {
    staticStyle: {
      "windth": "80%"
    },
    attrs: {
      "border": "",
      "data": _vm.addGoodAttrValues
    }
  }, [_c('el-table-column', {
    attrs: {
      "align": "center",
      "property": "itemPparam",
      "label": "属性值"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-input', {
          attrs: {
            "minlength": 5,
            "disabled": scope.$index != _vm.changeThisAll,
            "value": scope.row.itemPparam
          },
          on: {
            "blur": function($event) {
              _vm.changThisAttrVal(scope.$index, $event, scope.row)
            }
          }
        })]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
      "label": "操作",
      "width": "100"
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
              _vm.deleOneAttrVal(scope.$index, scope.row)
            }
          }
        }, [_vm._v("删除")])]
      }
    }])
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "dialog-footer",
    slot: "footer"
  }, [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.saveOneAttrs()
      }
    }
  }, [_vm._v("保存")])], 1)], 1)], 1)
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=32.f044e084ab21e8131418.js.map