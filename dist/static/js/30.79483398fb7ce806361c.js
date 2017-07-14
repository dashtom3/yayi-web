webpackJsonp([30],{

/***/ 300:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(652)
}
var Component = __webpack_require__(8)(
  /* script */
  __webpack_require__(429),
  /* template */
  __webpack_require__(795),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 429:
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

/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      ruleForm: {
        upClass: [],
        classname: '',
        oldClassname: '',
        itemId: null,
        itemClassifyGrade: null
      },
      searchClassfyName: '',
      searchParentClassfyName: '',
      PreviousClassify: '',
      // 1是增加，2是修改
      classfyOperaType: 1,
      classfyChangeIndex: null,
      options: [],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      bindTitle: null,
      // -----------------------------
      tableData: [],
      rules: {
        upClass: [{ type: 'array', required: true, message: '请选择上级分类', trigger: 'blur' }],
        classname: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      },
      a: [],
      addNew: true
      // formLabelWidth: '120px'
      // -----------------------------------
    };
  },
  watch: {},
  components: {
    // abc
  },
  created: function () {
    var that = this;
    that.getClassify();
    that.getAllClassify();
  },
  methods: {
    //获取分类列表
    getClassify: function () {
      var that = this;
      that.global.axiosGetReq('/item/showItemClassify').then(res => {
        if (res.data.callStatus === 'SUCCEED') {
          that.tableData = res.data.data;
          // console.log(that.tableData)
        } else {
          that.$message.error('网络出错，请稍后再试！');
        }
      }
      // console.log(that.tableData,'hahahaha')
      );
    },
    //获取所有分类列表
    getAllClassify: function () {
      var that = this;
      that.global.axiosGetReq('/item/getAllClassifyAndBrand').then(res => {
        // console.log(res.data);
        if (res.data.callStatus === 'SUCCEED') {
          that.options = res.data.data.classifyList;
          for (var i = 0; i < that.options.length; i++) {
            that.options[i].label = that.options[i].oneClassify;
            that.options[i].children = that.options[i].classifyTwoList;
            for (var k in that.options[i].children) {
              that.options[i].children[k].label = that.options[i].children[k].classifyTwoName;
            }
          }
          var optionsNew = [{
            label: '根节点',
            children: []
          }];
          optionsNew[0].children = that.options;
          that.options = optionsNew;
        } else {
          that.$message.error('网络出错，请稍后再试！');
        }
      });
    },
    // 添加商品分类
    addClassfy: function () {
      var that = this;
      that.bindTitle = "添加商品分类";
      that.dialogFormVisible = true;
      that.addNew = true;
    },
    // 查询分类
    search: function () {
      var that = this;
      var obj = {
        itemClassifyName: that.searchClassfyName,
        itemPreviousClassify: that.searchParentClassfyName
      };
      that.global.axiosPostReq('/item/showItemClassify', obj).then(res => {
        if (res.data.callStatus === 'SUCCEED') {
          that.tableData = res.data.data;
          console.log(that.tableData, '23232323');
        } else {
          that.$message.error('网络出错，请稍后再试！');
        }
      });
    },
    // 删除分类
    DELEONE: function (scope) {
      var that = this;
      // console.log(scope.row.itemClassifyId);
      that.$confirm('确定删除该属性吗, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var obj = {
          itemClassifyId: scope.row.itemClassifyId,
          itemClassifyName: scope.row.itemClassifyName,
          itemClassifyGrade: scope.row.itemClassifyGrade
        };
        console.log(obj, '23232');
        that.global.axiosPostReq('/item/deleteItemClassify', obj).then(res => {
          if (res.data.callStatus === 'SUCCEED') {
            // console.log(res.data);
            that.getClassify();
            that.getAllClassify();
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
          message: '已取消删除'
        });
      });
    },
    // 修改商品分类
    changeOneAttr: function (scope) {
      var that = this;
      console.log(scope.row);
      //that.ruleForm.upClass.push(scope.row.itemPreviousClassify);
      that.bindTitle = "修改商品分类";
      that.dialogFormVisible = true;
      that.PreviousClassify = scope.row.itemPreviousClassify;
      that.ruleForm.classname = scope.row.itemClassifyName;
      that.ruleForm.oldClassname = scope.row.itemClassifyName;
      that.ruleForm.itemId = scope.row.itemClassifyId;
      that.ruleForm.itemClassifyGrade = scope.row.itemClassifyGrade;
      that.addNew = false;
      // if (scope.row.itemClassifyGrade == 1) {
      //   that.ruleForm.upClass.push(scope.row.itemPreviousClassify);
      //   that.bindTitle = "修改商品分类";
      //   that.dialogFormVisible = true;
      //   that.ruleForm.classname = scope.row.itemClassifyName;
      //   that.ruleForm.oldClassname = scope.row.itemClassifyName;
      //   that.ruleForm.itemId = scope.row.itemClassifyId;
      //   that.ruleForm.itemClassifyGrade = scope.row.itemClassifyGrade;
      //   that.addNew = false
      //   return false
      // }
      // if (scope.row.itemClassifyGrade == 2) {
      //   that.ruleForm.upClass.push('根节点');
      //   that.ruleForm.upClass.push(scope.row.itemPreviousClassify);
      //   that.bindTitle = "修改商品分类";
      //   that.dialogFormVisible = true;
      //   that.ruleForm.classname = scope.row.itemClassifyName;
      //   that.ruleForm.oldClassname = scope.row.itemClassifyName;
      //   that.ruleForm.itemId = scope.row.itemClassifyId;
      //   that.ruleForm.itemClassifyGrade = scope.row.itemClassifyGrade;
      //   that.addNew = false
      //   return false
      // }
      // if (scope.row.itemClassifyGrade == 3) {
      //   console.log('333333');
      //   that.ruleForm.upClass.push('根节点');
      //   that.ruleForm.upClass.push(scope.row.itemPreviousClassify);
      //   that.bindTitle = "修改商品分类";
      //   that.dialogFormVisible = true;
      //   that.ruleForm.classname = scope.row.itemClassifyName;
      //   that.ruleForm.oldClassname = scope.row.itemClassifyName;
      //   that.ruleForm.itemId = scope.row.itemClassifyId;
      //   that.ruleForm.itemClassifyGrade = scope.row.itemClassifyGrade;
      //   that.addNew = false
      //   //console.log(scope.row);
      //   return false
      // }
    },
    // 保存商品分类
    saveOneAttrs: function (formName) {
      var that = this;
      // console.log(that.ruleForm);
      that.$refs[formName].validate(valid => {
        if (valid) {
          if (that.bindTitle == "添加商品分类") {
            var obj = {
              itemClassifyName: that.ruleForm.classname,
              itemPreviousClassify: that.ruleForm.upClass.slice(-1)[0],
              itemClassifyGrade: that.ruleForm.upClass.length
            };
            that.global.axiosPostReq('/item/addItemClassify', obj).then(res => {
              if (res.data.callStatus === 'SUCCEED') {
                that.getClassify();
                that.getAllClassify();
                that.ruleForm.classname = '';
                that.ruleForm.upClass = [];
                that.dialogFormVisible = false;
                that.$message({
                  type: 'success',
                  message: '添加成功!'
                });
                that.tableData = res.data.data;
              } else {
                that.$message.error('网络出错，请稍后再试！');
              }
            });
          } else {
            var obj = {
              itemClassifyId: that.ruleForm.itemId,
              itemClassifyName: that.ruleForm.classname,
              itemOldName: that.ruleForm.oldClassname,
              itemClassifyGrade: that.ruleForm.itemClassifyGrade
            };
            console.log(that.ruleForm, '22222222');
            that.global.axiosPostReq('/item/updateItemClassify', obj).then(res => {
              if (res.data.callStatus === 'SUCCEED') {
                that.getClassify();
                that.getAllClassify();
                that.ruleForm.classname = '';
                that.ruleForm.upClass = [];
                that.ruleForm.itemId = null;
                that.ruleForm.itemClassifyGrade = null;
                that.dialogFormVisible = false;
                that.$message({
                  type: 'success',
                  message: '修改成功!'
                });
                that.tableData = res.data.data;
              } else {
                that.$message.error('网络出错，请稍后再试！');
              }
            });
          }
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    // 关闭面板时候
    handleClose: function () {
      var that = this;
      that.ruleForm.classname = '';
      that.ruleForm.upClass = [];
      that.ruleForm.itemId = null;
      that.ruleForm.itemClassifyGrade = null;
      that.dialogFormVisible = false;
    }
  }
});

/***/ }),

/***/ 516:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(292)(true);
// imports


// module
exports.push([module.i, ".classfy .el-dialog__footer{margin-left:120px;text-align:left}.cascader{width:260px}", "", {"version":3,"sources":["/Users/daifeili/yayi-web/src/components/admin/bsseInfoManner/classfy.vue"],"names":[],"mappings":"AACA,4BACE,kBAAmB,AACnB,eAAiB,CAClB,AACD,UACE,WAAa,CACd","file":"classfy.vue","sourcesContent":["\n.classfy  .el-dialog__footer{\n  margin-left: 120px;\n  text-align: left;\n}\n.cascader {\n  width: 260px;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 652:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(516);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(293)("ebc4ed1a", content, true);

/***/ }),

/***/ 795:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('el-row', {
    staticClass: "warp classfy"
  }, [_c('el-col', {
    staticClass: "warp-breadcrum",
    attrs: {
      "span": 24
    }
  }, [_c('el-breadcrumb', {
    attrs: {
      "separator": "/"
    }
  }, [_c('el-breadcrumb-item', [_c('b', [_vm._v("商品基础资料管理")])]), _vm._v(" "), _c('el-breadcrumb-item', [_vm._v("商品分类管理")])], 1)], 1), _vm._v(" "), _c('el-col', {
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
  }, [_c('el-form-item', {
    attrs: {
      "label": "分类名称："
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.searchClassfyName),
      callback: function($$v) {
        _vm.searchClassfyName = $$v
      },
      expression: "searchClassfyName"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "上级分类："
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.searchParentClassfyName),
      callback: function($$v) {
        _vm.searchParentClassfyName = $$v
      },
      expression: "searchParentClassfyName"
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
        _vm.addClassfy()
      }
    }
  }, [_vm._v("+添加商品分类")])], 1), _vm._v(" "), _c('el-table', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "data": _vm.tableData,
      "border": ""
    }
  }, [_c('el-table-column', {
    attrs: {
      "prop": "itemClassifyName",
      "align": "center",
      "label": "分类名称"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "itemPreviousClassify",
      "align": "center",
      "label": "上级分类"
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
          attrs: {
            "type": "text"
          },
          on: {
            "click": function($event) {
              _vm.changeOneAttr(scope)
            }
          }
        }, [_vm._v("修改")]), _vm._v(" "), _c('el-button', {
          attrs: {
            "type": "text"
          },
          on: {
            "click": function($event) {
              _vm.DELEONE(scope)
            }
          }
        }, [_vm._v("删除")])]
      }
    }])
  })], 1)], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": _vm.bindTitle,
      "visible": _vm.dialogFormVisible,
      "before-close": _vm.handleClose
    },
    on: {
      "update:visible": function($event) {
        _vm.dialogFormVisible = $event
      }
    }
  }, [_c('el-form', {
    ref: "ruleForm",
    attrs: {
      "model": _vm.ruleForm,
      "rules": _vm.rules
    }
  }, [(_vm.addNew) ? _c('el-form-item', {
    attrs: {
      "label": "上级分类：",
      "prop": "upClass",
      "label-width": _vm.formLabelWidth
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
      value: (_vm.ruleForm.upClass),
      callback: function($$v) {
        _vm.ruleForm.upClass = $$v
      },
      expression: "ruleForm.upClass"
    }
  }, [_c('el-button', {
    attrs: {
      "icon": "search"
    },
    slot: "append"
  })], 1)], 1) : _c('el-form-item', {
    attrs: {
      "label": "上级分类：",
      "label-width": _vm.formLabelWidth
    }
  }, [_c('p', [_vm._v(_vm._s(_vm.PreviousClassify))])]), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "分类名称：",
      "prop": "classname",
      "label-width": _vm.formLabelWidth
    }
  }, [_c('el-input', {
    attrs: {
      "auto-complete": "off"
    },
    model: {
      value: (_vm.ruleForm.classname),
      callback: function($$v) {
        _vm.ruleForm.classname = $$v
      },
      expression: "ruleForm.classname"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    staticStyle: {
      "text-align": "right"
    }
  }, [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.saveOneAttrs('ruleForm')
      }
    }
  }, [_vm._v("保存")])], 1)], 1)], 1)], 1)
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=30.79483398fb7ce806361c.js.map