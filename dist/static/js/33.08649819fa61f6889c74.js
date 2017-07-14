webpackJsonp([33],{

/***/ 297:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(654)
}
var Component = __webpack_require__(8)(
  /* script */
  __webpack_require__(426),
  /* template */
  __webpack_require__(797),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-2f5ea2f5",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 426:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global_global__ = __webpack_require__(53);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      advertList: [],
      qiNiuToken: null,
      qiNiuUrl: __WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].qiNiuUrl,
      advertVisible: false,
      input_adv: '',
      img_src: '',
      advNo: '',
      advertType: '',
      fileList: [{ name: '', url: '' }]
    };
  },
  created() {
    this.init();
    //获取七牛token
    __WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].axiosGetReq('/file/getUpToken', null).then(res => {
      if (res.data.callStatus === 'SUCCEED') {
        this.qiNiuToken = {
          token: res.data.msg
        };
      }
    });
  },
  methods: {
    init() {
      __WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].axiosGetReq('/adv/showAdv', {}).then(res => {
        if (res.data.callStatus === 'SUCCEED') {
          this.advertList = res.data.data;
          this.img_src = res.data.data.advImg;
        } else {
          this.$message.error('获取广告数据失败！');
        }
      });
    },
    handleEdit(index, row) {
      this.advertVisible = true;
      this.advNo = row.advId;
      this.advertType = row.advType;
      this.input_adv = row.advName;
      this.img_src = row.advUrl;
      this.fileList[0].url = this.img_src;
    },
    uploadFile(res, file) {
      this.advUrl = __WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].qiniuShUrl + file.response.key;
      this.img_src = __WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].qiniuShUrl + file.response.key;
      this.fileList = [];
      this.fileList.push({
        name: '',
        url: this.img_src
      });
    },
    handlePreview() {},
    saveBtn() {
      let params = {
        advImg: this.img_src,
        advName: this.input_adv,
        advUrl: this.img_src,
        advType: this.advertType,
        advId: this.advNo
        //验证表单
      };if (!this.input_adv) {
        this.$message.error('请填写广告名称！');
        return false;
      }

      if (!this.img_src) {
        this.$message.error('请上传广告图片！');
        return false;
      }
      //保存广告设置
      __WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].axiosPostReq('/adv/updateAdv', params).then(res => {
        if (res.data.callStatus === 'SUCCEED') {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.init();
        } else {
          this.$message.error('修改失败！');
        }
        this.advertVisible = false;
      });
    },
    celSave() {
      this.advertVisible = false;
    }
  }
});

/***/ }),

/***/ 518:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(292)(true);
// imports


// module
exports.push([module.i, ".el-table th>.cell[data-v-2f5ea2f5]{text-align:center}.fl[data-v-2f5ea2f5]{float:left}.fr[data-v-2f5ea2f5]{float:right}.clearfix[data-v-2f5ea2f5]{zoom:1}.clearfix[data-v-2f5ea2f5]:after{content:\"\";clear:both;display:block}.i_col_red[data-v-2f5ea2f5]{color:red;font-style:normal}.margin_l_30[data-v-2f5ea2f5]{margin-left:30px}.t_input_width[data-v-2f5ea2f5]{width:340px}.adv_wrap li[data-v-2f5ea2f5]{height:40px;line-height:40px}.span_nav[data-v-2f5ea2f5]{display:inline-block;width:84px;padding-right:6px}.btn_[data-v-2f5ea2f5]{margin-left:92px}.add_btn[data-v-2f5ea2f5]{float:right;margin:20px 118px 20px 0}", "", {"version":3,"sources":["/Users/daifeili/yayi-web/src/components/admin/advertSets/adv.vue"],"names":[],"mappings":"AACA,oCACE,iBAAmB,CACpB,AACD,qBACC,UAAW,CACX,AACD,qBACC,WAAY,CACZ,AACD,2BACC,MAAO,CACP,AACD,iCACC,WAAW,AACX,WAAW,AACX,aAAc,CACd,AACD,4BACE,UAAW,AACX,iBAAmB,CACpB,AACD,8BACE,gBAAkB,CACnB,AACD,gCACC,WAAY,CACZ,AACD,8BACC,YAAa,AACb,gBAAkB,CAClB,AACD,2BACC,qBAAsB,AACtB,WAAY,AACZ,iBAAmB,CACnB,AACD,uBACE,gBAAkB,CACnB,AACD,0BACC,YAAY,AACZ,wBAA0B,CAC1B","file":"adv.vue","sourcesContent":["\n.el-table th>.cell[data-v-2f5ea2f5]{\n  text-align: center;\n}\n.fl[data-v-2f5ea2f5]{\n\tfloat:left;\n}\n.fr[data-v-2f5ea2f5]{\n\tfloat:right;\n}\n.clearfix[data-v-2f5ea2f5]{\n\tzoom:1;\n}\n.clearfix[data-v-2f5ea2f5]:after{\n\tcontent:\"\";\n\tclear:both;\n\tdisplay:block;\n}\n.i_col_red[data-v-2f5ea2f5]{\n  color: red;\n  font-style: normal;\n}\n.margin_l_30[data-v-2f5ea2f5]{\n  margin-left: 30px;\n}\n.t_input_width[data-v-2f5ea2f5]{\n\twidth:340px;\n}\n.adv_wrap li[data-v-2f5ea2f5]{\n\theight: 40px;\n\tline-height: 40px;\n}\n.span_nav[data-v-2f5ea2f5]{\n\tdisplay: inline-block;\n\twidth: 84px;\n\tpadding-right: 6px;\n}\n.btn_[data-v-2f5ea2f5]{\n  margin-left: 92px;\n}\n.add_btn[data-v-2f5ea2f5]{\n\tfloat:right;\n\tmargin: 20px 118px 20px 0;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 654:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(518);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(293)("369685f9", content, true);

/***/ }),

/***/ 797:
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
  }, [_c('el-breadcrumb-item', [_c('b', [_vm._v("广告设置")])])], 1)], 1), _vm._v(" "), _c('el-table', {
    attrs: {
      "data": _vm.advertList,
      "border": ""
    }
  }, [_c('el-table-column', {
    attrs: {
      "prop": "advId",
      "label": "序号",
      "width": "80",
      "align": "center"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "advName",
      "label": "名称",
      "span": 4,
      "align": "center"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "advImg",
      "label": "图片",
      "span": 4,
      "align": "center"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('img', {
          staticStyle: {
            "width": "100px"
          },
          attrs: {
            "src": scope.row.advImg,
            "alt": "该图片无法显示",
            "align": "center"
          }
        })]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "advUrl",
      "label": "链接",
      "width": "300",
      "align": "center"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "advType",
      "label": "类型",
      "span": 4,
      "align": "center"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "handle",
      "label": "操作",
      "span": 4,
      "align": "center"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-button', {
          attrs: {
            "size": "small",
            "type": "info"
          },
          on: {
            "click": function($event) {
              _vm.handleEdit(scope.$index, scope.row)
            }
          }
        }, [_vm._v("修改")])]
      }
    }])
  })], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "修改广告",
      "size": "tiny",
      "close-on-click-modal": true
    },
    model: {
      value: (_vm.advertVisible),
      callback: function($$v) {
        _vm.advertVisible = $$v
      },
      expression: "advertVisible"
    }
  }, [_c('ul', {
    staticClass: "adv_wrap"
  }, [_c('li', {
    staticClass: "clearfix"
  }, [_c('span', {
    staticClass: "fl span_nav"
  }, [_c('span', {
    staticClass: "fr"
  }, [_c('i', {
    staticClass: "i_col_red"
  }, [_vm._v("*")]), _vm._v("序号：")])]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.advNo))])]), _vm._v(" "), _c('li', {
    staticClass: "clearfix"
  }, [_c('span', {
    staticClass: "fl span_nav"
  }, [_c('span', {
    staticClass: "fr"
  }, [_c('i', {
    staticClass: "i_col_red"
  }, [_vm._v("*")]), _vm._v("类型：")])]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.advertType))])]), _vm._v(" "), _c('li', {
    staticClass: "clearfix"
  }, [_c('span', {
    staticClass: "fl span_nav"
  }, [_c('span', {
    staticClass: "fr"
  }, [_c('i', {
    staticClass: "i_col_red"
  }, [_vm._v("*")]), _vm._v("广告名称：")])]), _vm._v(" "), _c('el-input', {
    staticClass: "fl",
    staticStyle: {
      "width": "230px"
    },
    model: {
      value: (_vm.input_adv),
      callback: function($$v) {
        _vm.input_adv = $$v
      },
      expression: "input_adv"
    }
  })], 1), _vm._v(" "), _c('li', {
    staticClass: "clearfix"
  }, [_c('span', {
    staticClass: "fl span_nav"
  }, [_c('span', {
    staticClass: "fr"
  }, [_c('i', {
    staticClass: "i_col_red"
  }, [_vm._v("*")]), _vm._v("广告图：")])]), _vm._v(" "), _c('el-upload', {
    staticClass: "upload-demo fl",
    attrs: {
      "action": _vm.qiNiuUrl,
      "on-preview": _vm.handlePreview,
      "on-success": _vm.uploadFile,
      "file-list": _vm.fileList,
      "data": _vm.qiNiuToken,
      "list-type": "picture"
    }
  }, [_c('el-button', {
    attrs: {
      "size": "small",
      "type": "primary"
    }
  }, [_vm._v("选择")])], 1)], 1), _vm._v(" "), _c('li', {
    staticClass: "clearfix"
  }, [_c('span', {
    staticClass: "fl span_nav"
  }, [_c('span', {
    staticClass: "fr"
  }, [_c('i', {
    staticClass: "i_col_red"
  }, [_vm._v("*")]), _vm._v("链接：")])]), _vm._v(" "), _c('el-input', {
    staticClass: "fl",
    staticStyle: {
      "width": "230px"
    },
    model: {
      value: (_vm.img_src),
      callback: function($$v) {
        _vm.img_src = $$v
      },
      expression: "img_src"
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-top": "30px"
    }
  }, [_c('el-button', {
    staticClass: "btn_",
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.saveBtn
    }
  }, [_vm._v("保存")]), _vm._v(" "), _c('el-button', {
    staticClass: "btn_",
    on: {
      "click": _vm.celSave
    }
  }, [_vm._v("取消")])], 1)])], 1)
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=33.08649819fa61f6889c74.js.map