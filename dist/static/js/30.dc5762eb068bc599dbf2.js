webpackJsonp([30],{

/***/ 300:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(658)
}
var Component = __webpack_require__(8)(
  /* script */
  __webpack_require__(426),
  /* template */
  __webpack_require__(782),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
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
//
//
//
//
//
//
//
//
//
//
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
      options: [{
        value: '',
        label: '全部'
      }, {
        value: '国产',
        label: '国产'
      }, {
        value: '进口',
        label: '进口'
      }],
      value: '',
      bindTitle: null,
      itemBrandId: null,
      itemBrandName: null,
      itemBrandHome: null,
      itemBrandLogo: null,
      // 1增加。2修改
      brandOperaType: 1,
      formLabelWidth: "120px",
      imageUrl: null,
      tableData: [],
      qiNiuToken: null,
      itemBrandNameAdd: null,
      itemBrandHomeAdd: null,
      itemBrandLogoAdd: null,
      qiNiuUrl: __WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].qiNiuUrl,
      showAddBrandAlert: false,
      ifShowBigImg: false,
      bigImgSrc: null
    };
  },
  created() {
    //获取七牛token
    __WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].axiosGetReq('/file/getUpToken', null).then(res => {
      if (res.data.callStatus === 'SUCCEED') {
        this.qiNiuToken = {
          token: res.data.msg
        };
      }
    });
    this.queryHandler(); //初始化请求
  },
  methods: {
    uploadFile(res, file) {
      this.itemBrandLogoAdd = __WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].qiniuShUrl + file.response.key;
      this.imageUrl = __WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].qiniuShUrl + file.response.key;
    },
    beforeAvatarUpload(file) {
      // console.log(file)
      // const isJPG = file.type === 'image/jpeg';
      // const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      // return isJPG && isLt2M;
    },
    queryHandler: function () {
      let params = {
        itemBrandName: this.itemBrandName,
        itemBrandHome: this.itemBrandHome
      };
      __WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].axiosPostReq('/item/queryItemBrand', params).then(res => {
        if (res.data.callStatus === 'SUCCEED') {
          this.tableData = res.data.data;
        } else {
          this.$message.error('查询商品品牌失败！');
        }
      });
    },
    addGoodBrand: function () {
      this.bindTitle = "添加商品品牌";

      this.itemBrandNameAdd = null;
      this.itemBrandHomeAdd = null;
      this.itemBrandLogoAdd = null;
      this.showAddBrandAlert = true;
      this.imageUrl = null;
      this.brandOperaType = 1;
    },
    showBigImg: function (index) {
      this.ifShowBigImg = true;
      this.bigImgSrc = this.tableData[index].itemBrandLogo;
    },
    DELEONE: function (index) {
      var that = this;
      this.$confirm('确定删除该品牌吗, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          itemBrandId: that.tableData[index].itemBrandId
        };
        __WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].axiosPostReq('/item/deleteItemBrand', params).then(res => {
          if (res.data.callStatus === 'SUCCEED') {
            that.$message({
              message: '删除成功',
              type: 'success'
            });
            that.queryHandler();
          } else {
            that.$message.error('该品牌下已有商品，不能删除！');
          }
        });
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    changeOneBrand: function (index) {
      this.bindTitle = "修改商品品牌";
      this.showAddBrandAlert = true;
      var thisData = this.tableData[index];
      this.itemBrandHomeAdd = thisData.itemBrandHome;
      this.itemBrandNameAdd = thisData.itemBrandName;
      this.itemBrandLogoAdd = thisData.itemBrandLogo;
      this.itemBrandId = thisData.itemBrandId;
      this.imageUrl = this.itemBrandLogoAdd;
      this.brandOperaType = 2;
    },
    saveOneBrand: function () {
      var that = this;
      //增加商品信息
      if (this.brandOperaType == 1) {
        let params = {
          itemBrandName: this.itemBrandNameAdd,
          itemBrandHome: this.itemBrandHomeAdd,
          itemBrandLogo: this.itemBrandLogoAdd
          //验证是否填写品牌名称
        };if (!this.itemBrandNameAdd) {
          this.$message.error('请填写品牌名称！');
          return false;
        }

        //验证是否选择产地
        if (!this.itemBrandHomeAdd) {
          this.$message.error('请选择品牌产地');
          return false;
        }

        //验证是否上传图片
        if (!this.itemBrandLogoAdd) {
          this.$message.error('请上传品牌LOGO');
          return false;
        }

        __WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].axiosPostReq('/item/addItemBrand', params).then(res => {
          if (res.data.callStatus === 'SUCCEED') {
            this.$message({
              message: '商品品牌添加成功',
              type: 'success'
            });
            that.queryHandler();
          } else {
            this.$message.error('商品品牌添加失败！');
          }
        });
      }
      //修改商品信息
      if (this.brandOperaType == 2) {
        var params = {
          itemBrandId: this.itemBrandId,
          itemBrandName: this.itemBrandNameAdd,
          itemBrandHome: this.itemBrandHomeAdd,
          itemBrandLogo: this.itemBrandLogoAdd
        };
        __WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].axiosPostReq('/item/updateItemBrand', params).then(res => {
          if (res.data.callStatus === 'SUCCEED') {
            this.$message({
              message: '商品品牌修改成功',
              type: 'success'
            });
            that.queryHandler();
          } else {
            this.$message.error('商品品牌修改失败！');
          }
        });
      }
      this.showAddBrandAlert = false;
    }
  }
});

/***/ }),

/***/ 531:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(293)(true);
// imports


// module
exports.push([module.i, ".clearfix{zoom:1}.clearfix:after{content:\"\";clear:both;display:block}.brandWarp .avatar-uploader .el-upload{border:1px dashed #d9d9d9;border-radius:6px;cursor:pointer;position:relative;overflow:hidden}.brandWarp .avatar-uploader .el-upload:hover{border-color:#20a0ff}.brandWarp .avatar-uploader-icon{font-size:28px;width:178px;height:178px;line-height:178px}.brandWarp .avatar{width:178px;height:178px;display:block}.add_btn{float:right;margin:20px 118px 20px 0}.item_w_input{width:216px}", "", {"version":3,"sources":["/Users/daifeili/yayi-web/src/components/admin/bsseInfoManner/brand.vue"],"names":[],"mappings":"AACA,UACE,MAAO,CACR,AACD,gBACE,WAAW,AACX,WAAW,AACX,aAAc,CACf,AACD,uCACI,0BAA2B,AAC3B,kBAAmB,AACnB,eAAgB,AAChB,kBAAmB,AACnB,eAAiB,CACpB,AACD,6CACI,oBAAsB,CACzB,AACD,iCACI,eAAgB,AAChB,YAAa,AACb,aAAc,AACd,iBAAmB,CACtB,AACD,mBACI,YAAa,AACb,aAAc,AACd,aAAe,CAClB,AACD,SACE,YAAY,AACZ,wBAA0B,CAC3B,AACD,cACE,WAAa,CACd","file":"brand.vue","sourcesContent":["\n.clearfix{\n  zoom:1;\n}\n.clearfix:after{\n  content:\"\";\n  clear:both;\n  display:block;\n}\n.brandWarp .avatar-uploader .el-upload {\n    border: 1px dashed #d9d9d9;\n    border-radius: 6px;\n    cursor: pointer;\n    position: relative;\n    overflow: hidden;\n}\n.brandWarp   .avatar-uploader .el-upload:hover {\n    border-color: #20a0ff;\n}\n.brandWarp  .avatar-uploader-icon {\n    font-size: 28px;\n    width: 178px;\n    height: 178px;\n    line-height: 178px;\n}\n.brandWarp   .avatar {\n    width: 178px;\n    height: 178px;\n    display: block;\n}\n.add_btn{\n  float:right;\n  margin: 20px 118px 20px 0;\n}\n.item_w_input{\n  width: 216px;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 658:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(531);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(294)("30033031", content, true);

/***/ }),

/***/ 782:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('el-row', {
    staticClass: "brandWarp"
  }, [_c('el-col', {
    staticClass: "warp-breadcrum",
    attrs: {
      "span": 24
    }
  }, [_c('el-breadcrumb', {
    attrs: {
      "separator": "/"
    }
  }, [_c('el-breadcrumb-item', [_c('b', [_vm._v("商品基础资料管理")])]), _vm._v(" "), _c('el-breadcrumb-item', [_vm._v("商品品牌管理")])], 1)], 1), _vm._v(" "), _c('el-col', {
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
    staticClass: "demo-form-inline",
    attrs: {
      "inline": true
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "品牌名称："
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.itemBrandName),
      callback: function($$v) {
        _vm.itemBrandName = $$v
      },
      expression: "itemBrandName"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "产地："
    }
  }, [_c('el-select', {
    model: {
      value: (_vm.itemBrandHome),
      callback: function($$v) {
        _vm.itemBrandHome = $$v
      },
      expression: "itemBrandHome"
    }
  }, _vm._l((_vm.options), function(item) {
    return _c('el-option', {
      key: item.value,
      attrs: {
        "label": item.label,
        "value": item.value
      }
    })
  }))], 1), _vm._v(" "), _c('el-form-item', [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.queryHandler
    }
  }, [_vm._v("查询")])], 1)], 1)], 1), _vm._v(" "), _c('el-col', {
    staticStyle: {
      "text-align": "right",
      "line-height": "40px"
    }
  }, [_c('el-button', {
    staticClass: "add_btn",
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.addGoodBrand()
      }
    }
  }, [_vm._v("+添加商品品牌")])], 1), _vm._v(" "), _c('el-table', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "data": _vm.tableData,
      "border": ""
    }
  }, [_c('el-table-column', {
    attrs: {
      "prop": "itemBrandName",
      "align": "center",
      "label": "品牌名称"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "itemBrandLogo",
      "align": "center",
      "label": "logo"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('img', {
          staticStyle: {
            "cursor": "pointer",
            "width": "150px",
            "height": "150px"
          },
          attrs: {
            "src": _vm.tableData[scope.$index].itemBrandLogo,
            "alt": "点击查看大图",
            "title": "点击查看大图"
          },
          on: {
            "click": function($event) {
              _vm.showBigImg(scope.$index)
            }
          }
        })]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "itemBrandHome",
      "align": "center",
      "label": "产地"
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
              _vm.changeOneBrand(scope.$index)
            }
          }
        }, [_vm._v("修改")]), _vm._v(" "), _c('el-button', {
          attrs: {
            "type": "text"
          },
          on: {
            "click": function($event) {
              _vm.DELEONE(scope.$index)
            }
          }
        }, [_vm._v("删除")])]
      }
    }])
  })], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "clearfix"
  }), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "照片大图",
      "visible": _vm.ifShowBigImg
    },
    on: {
      "update:visible": function($event) {
        _vm.ifShowBigImg = $event
      }
    }
  }, [_c('img', {
    staticStyle: {
      "width": "350px",
      "height": "350px",
      "display": "block",
      "margin": "auto"
    },
    attrs: {
      "src": _vm.bigImgSrc
    }
  })]), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": _vm.bindTitle,
      "size": "tiny",
      "visible": _vm.showAddBrandAlert
    },
    on: {
      "update:visible": function($event) {
        _vm.showAddBrandAlert = $event
      }
    }
  }, [_c('el-form', [_c('el-form-item', {
    attrs: {
      "label": "品牌名称：",
      "label-width": _vm.formLabelWidth
    }
  }, [_c('el-input', {
    staticClass: "item_w_input fl",
    model: {
      value: (_vm.itemBrandNameAdd),
      callback: function($$v) {
        _vm.itemBrandNameAdd = $$v
      },
      expression: "itemBrandNameAdd"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "产地：",
      "label-width": _vm.formLabelWidth
    }
  }, [_c('el-select', {
    model: {
      value: (_vm.itemBrandHomeAdd),
      callback: function($$v) {
        _vm.itemBrandHomeAdd = $$v
      },
      expression: "itemBrandHomeAdd"
    }
  }, [_c('el-option', {
    attrs: {
      "label": "国产",
      "value": "国产"
    }
  }), _vm._v(" "), _c('el-option', {
    attrs: {
      "label": "进口",
      "value": "进口"
    }
  })], 1)], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "logo：",
      "label-width": _vm.formLabelWidth
    }
  }, [_c('el-upload', {
    staticClass: "avatar-uploader",
    attrs: {
      "on-success": _vm.uploadFile,
      "action": _vm.qiNiuUrl,
      "before-upload": _vm.beforeAvatarUpload,
      "show-file-list": false,
      "data": _vm.qiNiuToken
    }
  }, [(_vm.imageUrl) ? _c('img', {
    staticClass: "avatar",
    attrs: {
      "src": _vm.imageUrl
    }
  }) : _c('i', {
    staticClass: "el-icon-plus avatar-uploader-icon"
  })])], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "dialog-footer",
    slot: "footer"
  }, [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.saveOneBrand()
      }
    }
  }, [_vm._v("保存")])], 1)], 1)], 1)
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=30.dc5762eb068bc599dbf2.js.map