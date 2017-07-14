webpackJsonp([14],{

/***/ 308:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(718)
}
var Component = __webpack_require__(8)(
  /* script */
  __webpack_require__(439),
  /* template */
  __webpack_require__(850),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-fb2612a6",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 330:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(333)
}
var Component = __webpack_require__(8)(
  /* script */
  __webpack_require__(331),
  /* template */
  __webpack_require__(334),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-47323ed3",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 331:
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

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "paging0",
  data() {
    return {
      goToPage: 1,
      showPageNum: 8,
      currentPage: 0,
      showPageBegin: 0,
      showPageEnd: 7
    };
  },
  props: ["childmsg"],
  watch: {
    currentPage: function () {
      this.goToPage = this.currentPage + 1;
    }
  },
  methods: {
    onClickChild: function () {
      this.$emit('childSay', this.currentPage + 1);
    },
    prev: function () {
      if (this.currentPage == 0) {
        this.$alert("已经是第一页了！", { confirmButtonText: '确定' });
      } else {
        this.currentPage--;
        if (this.showPageEnd < 8) {} else {
          this.showPageEnd--;
        }
        this.showPageBegin--;
      }
    },
    next: function () {
      if (this.currentPage >= this.childmsg.totalPage - 1) {
        this.$alert("已经是最后一页了！", { confirmButtonText: '确定' });
      } else {
        this.currentPage++;
        this.showPageEnd++;
        this.showPageBegin++;
      }
    },
    goToThisPage: function (index) {
      this.currentPage = index;
    },
    goToInputPage: function () {
      var num = this.goToPage;
      if (this.goToPage < 8) {
        this.showPageBegin = 0;
        this.showPageEnd = 7;
        this.currentPage = num - 1;
      }
      if (this.goToPage > this.childmsg.totalPage) {
        this.$alert("输入页码过大，请重新输入", { confirmButtonText: '确定' });
        this.currentPage = this.childmsg.pageNum - 1;
      } else {
        this.showPageEnd = this.goToPage;
        this.showPageBegin = this.showPageEnd - 8;
        this.currentPage = num - 1;
      }
    },
    goIndex: function () {
      this.currentPage = 0;
      this.showPageEnd = 7;
      this.showPageBegin = 0;
    }
  }
});

/***/ }),

/***/ 332:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(292)(true);
// imports


// module
exports.push([module.i, ".paging0 span[data-v-47323ed3]{margin-left:5px;display:inline-block;cursor:pointer;line-height:40px}.paging0 input[data-v-47323ed3],.paging0 span[data-v-47323ed3]{border:1px solid #5db7e8;border-radius:3px;height:38px;width:38px;text-align:center}.paging0 input[data-v-47323ed3]{position:relative;top:-2px;left:10px;margin-right:10px}.paging0 input[data-v-47323ed3]:focus{outline:none}.paging0 .currentPageStyle[data-v-47323ed3]{color:#fff;background:#5db7e8}.paging0 .noBorder[data-v-47323ed3]{border:none}.paging0 .pageAdd[data-v-47323ed3],.paging0 .pageRedue[data-v-47323ed3]{width:100px}.paging0 .sure[data-v-47323ed3]{width:60px;height:38px}", "", {"version":3,"sources":["/Users/daifeili/yayi-web/src/components/website/brandLib/paging0.vue"],"names":[],"mappings":"AACA,+BAKE,gBAAiB,AACjB,qBAAsB,AACtB,eAAgB,AAChB,gBAAkB,CAEnB,AACD,+DAVE,yBAA0B,AAC1B,kBAAmB,AACnB,YAAa,AACb,WAAW,AAKX,iBAAmB,CAYpB,AAVD,gCAKE,kBAAmB,AACnB,SAAU,AACV,UAAW,AACX,iBAAmB,CAEpB,AACD,sCACE,YAAc,CACf,AACD,4CACE,WAAa,AACb,kBAAoB,CACrB,AACD,oCACE,WAAa,CACd,AAID,wEACE,WAAa,CACd,AACD,gCACE,WAAY,AACZ,WAAa,CACd","file":"paging0.vue","sourcesContent":["\n.paging0 span[data-v-47323ed3]{\r\n  border: 1px solid #5db7e8;\r\n  border-radius: 3px;\r\n  height: 38px;\r\n  width:38px;\r\n  margin-left: 5px;\r\n  display: inline-block;\r\n  cursor: pointer;\r\n  line-height: 40px;\r\n  text-align: center;\n}\n.paging0 input[data-v-47323ed3]{\r\n  width: 38px;\r\n  height: 38px;\r\n  border: 1px solid #5db7e8;\r\n  border-radius: 3px;\r\n  position: relative;\r\n  top: -2px;\r\n  left: 10px;\r\n  margin-right: 10px;\r\n  text-align: center;\n}\n.paging0 input[data-v-47323ed3]:focus{\r\n  outline: none;\n}\n.paging0 .currentPageStyle[data-v-47323ed3]{\r\n  color: white;\r\n  background: #5db7e8;\n}\n.paging0 .noBorder[data-v-47323ed3]{\r\n  border: none;\n}\n.paging0 .pageRedue[data-v-47323ed3]{\r\n  width: 100px;\n}\n.paging0 .pageAdd[data-v-47323ed3]{\r\n  width: 100px;\n}\n.paging0 .sure[data-v-47323ed3]{\r\n  width: 60px;\r\n  height: 38px;\n}\r\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 333:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(332);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(293)("40ded9a7", content, true);

/***/ }),

/***/ 334:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "paging0",
    on: {
      "click": function($event) {
        _vm.onClickChild()
      }
    }
  }, [_c('span', {
    staticClass: "pageRedue",
    on: {
      "click": function($event) {
        _vm.prev()
      }
    }
  }, [_vm._v("上一页")]), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.currentPage > 0),
      expression: "currentPage>0"
    }],
    attrs: {
      "calss": "indexPage"
    },
    on: {
      "click": function($event) {
        _vm.goIndex()
      }
    }
  }, [_vm._v("首页")]), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showPageBegin > 0),
      expression: "showPageBegin>0"
    }],
    staticClass: "noBorder"
  }, [_vm._v("...")]), _vm._v(" "), _vm._l((_vm.childmsg.totalPage), function(item, index) {
    return _c('span', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (index >= _vm.showPageBegin && index <= _vm.showPageEnd),
        expression: "index >= showPageBegin && index <= showPageEnd"
      }],
      class: {
        currentPageStyle: _vm.currentPage == index
      },
      on: {
        "click": function($event) {
          _vm.goToThisPage(index)
        }
      }
    }, [_vm._v(_vm._s(item))])
  }), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.childmsg.pageNum > _vm.showPageNum && _vm.currentPage < _vm.childmsg.pageNum - 1),
      expression: "childmsg.pageNum>showPageNum && currentPage<childmsg.pageNum-1"
    }],
    staticClass: "noBorder"
  }, [_vm._v("...")]), _vm._v(" "), _c('span', {
    staticClass: "pageAdd",
    on: {
      "click": function($event) {
        _vm.next()
      }
    }
  }, [_vm._v("下一页")]), _vm._v("\n  共" + _vm._s(_vm.childmsg.totalPage) + "页，到第"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.goToPage),
      expression: "goToPage"
    }],
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.goToPage)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.goToPage = $event.target.value
      }
    }
  }), _c('span', {
    staticClass: "sure",
    on: {
      "click": function($event) {
        _vm.goToInputPage()
      }
    }
  }, [_vm._v("确定")])], 2)
},staticRenderFns: []}

/***/ }),

/***/ 439:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global_global__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__website_brandLib_paging0__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__website_brandLib_paging0___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__website_brandLib_paging0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
						optSelect: [{
								value: '1',
								label: '单位名称'
						}, {
								value: '2',
								label: '联系人'
						}, {
								value: '3',
								label: '联系电话'
						}],
						pageProps: {
								pageNum: 1,
								totalPage: 1
						},
						sel_value: '1',
						selectInput: '',
						customerList: [],
						customerVisible: false,
						isEdit: false,
						companyName: '',
						companyAdd: '',
						linkMan: '',
						contact_: '',
						cusId: ''
				};
		},
		components: {
				paging: __WEBPACK_IMPORTED_MODULE_1__website_brandLib_paging0___default.a
		},
		created() {
				this.queryHandler();
		},
		methods: {
				selectOpt(key) {
						this.sel_value = key;
						this.selectInput = '';
				},
				pageHandler(data) {
						this.pageProps.pageNum = data;
						this.queryHandler();
				},
				queryHandler() {
						var params;
						if (this.sel_value == '1') {
								params = {
										companyName: this.selectInput,
										companyAdd: '',
										linkMan: ''
								};
						} else if (this.sel_value == '2') {
								params = {
										companyName: '',
										companyAdd: this.selectInput,
										linkMan: ''
								};
						} else if (this.sel_value == '3') {
								params = {
										companyName: '',
										companyAdd: '',
										linkMan: this.selectInput
								};
						}
						__WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].axiosPostReq('/cus/show', params).then(res => {
								if (res.data.callStatus === 'SUCCEED') {
										this.customerList = res.data.data;
								}
						});
				},
				saveHandler() {
						if (this.isEdit) {
								let params = {
										cusId: this.cusId,
										unitName: this.companyName,
										unitAddress: this.companyAdd,
										contacts: this.linkMan,
										contactsPhone: this.contact_
								};

								__WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].axiosPostReq('/cus/update', params).then(res => {
										if (res.data.callStatus === 'SUCCEED') {
												this.$message({
														message: '修改成功',
														type: 'success'
												});
												this.customerVisible = false;
												this.queryHandler();
										}
								});
						} else if (!this.isEdit) {
								let params = {
										unitName: this.companyName,
										unitAddress: this.companyAdd,
										contacts: this.linkMan,
										contactsPhone: this.contact_
								};
								__WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].axiosPostReq('/cus/insert', params).then(res => {
										if (res.data.callStatus === 'SUCCEED') {
												this.$message({
														message: '新增成功',
														type: 'success'
												});
												this.customerVisible = false;
												this.queryHandler();
										}
								});
						}
				},
				customerAddHandler() {
						this.customerVisible = true;
						this.isEdit = false;
						this.companyName = '', this.companyAdd = '', this.linkMan = '', this.contact_ = '';
				},
				handleEdit(index, row) {
						this.customerVisible = true;
						this.isEdit = true;
						this.companyName = row.unitName, this.companyAdd = row.unitAddress, this.linkMan = row.contacts, this.contact_ = row.contactsPhone, this.cusId = row.cusId;
				},
				handleDel(index, row) {
						this.$confirm('确定删除吗？').then(_ => {
								__WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].axiosPostReq('/cus/delete', { cusId: row.cusId }).then(res => {
										if (res.data.callStatus === 'SUCCEED') {
												this.$message({
														message: '删除成功',
														type: 'success'
												});
												this.queryHandler();
										} else {
												this.$message({
														message: '删除失败',
														type: 'success'
												});
										}
								});
						}).catch(_ => {});
				}
		}
});

/***/ }),

/***/ 582:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(292)(true);
// imports


// module
exports.push([module.i, ".fl[data-v-fb2612a6]{float:left}.clearfix[data-v-fb2612a6]{zoom:1}.clearfix[data-v-fb2612a6]:after{content:\"\";clear:both;display:block}.t_input_w[data-v-fb2612a6]{width:320px!important}.t_select_width[data-v-fb2612a6]{width:110px}.add_btn[data-v-fb2612a6]{float:right;margin:20px 118px 20px 0}.i_col_red[data-v-fb2612a6]{color:red;font-style:normal}.customer_wrap li[data-v-fb2612a6]{height:40px;line-height:40px}.span_nav[data-v-fb2612a6]{display:inline-block;width:84px;padding-right:6px}.btn_[data-v-fb2612a6]{margin-left:92px}", "", {"version":3,"sources":["/Users/daifeili/yayi-web/src/components/admin/salesManner/customerManner.vue"],"names":[],"mappings":"AACA,qBACE,UAAW,CACZ,AACD,2BACE,MAAO,CACR,AACD,iCACE,WAAW,AACX,WAAW,AACX,aAAc,CACf,AACD,4BACI,qBAAsB,CACzB,AACD,iCACI,WAAY,CACf,AACD,0BACE,YAAY,AACZ,wBAA0B,CAC3B,AACD,4BACG,UAAW,AACX,iBAAmB,CACrB,AACD,mCACE,YAAa,AACb,gBAAkB,CACnB,AACD,2BACE,qBAAsB,AACtB,WAAY,AACZ,iBAAmB,CACpB,AACD,uBACG,gBAAkB,CACpB","file":"customerManner.vue","sourcesContent":["\n.fl[data-v-fb2612a6]{\n\t\tfloat:left;\n}\n.clearfix[data-v-fb2612a6]{\n\t\tzoom:1;\n}\n.clearfix[data-v-fb2612a6]:after{\n\t\tcontent:\"\";\n\t\tclear:both;\n\t\tdisplay:block;\n}\n.t_input_w[data-v-fb2612a6]{\n    width:320px!important;\n}\n.t_select_width[data-v-fb2612a6]{\n    width:110px;\n}\n.add_btn[data-v-fb2612a6]{\n\t\tfloat:right;\n\t\tmargin: 20px 118px 20px 0;\n}\n.i_col_red[data-v-fb2612a6]{\n\t  color: red;\n\t  font-style: normal;\n}\n.customer_wrap li[data-v-fb2612a6]{\n\t\theight: 40px;\n\t\tline-height: 40px;\n}\n.span_nav[data-v-fb2612a6]{\n\t\tdisplay: inline-block;\n\t\twidth: 84px;\n\t\tpadding-right: 6px;\n}\n.btn_[data-v-fb2612a6]{\n\t  margin-left: 92px;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 718:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(582);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(293)("600a4e57", content, true);

/***/ }),

/***/ 850:
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
  }, [_c('el-breadcrumb-item', [_c('b', [_vm._v("销售员管理")])]), _vm._v(" "), _c('el-breadcrumb-item', [_vm._v("客户资源管理")])], 1)], 1), _vm._v(" "), _c('el-col', {
    staticClass: "warp-main",
    attrs: {
      "span": 24
    }
  }, [_c('el-form', {
    staticClass: "clearfix",
    attrs: {
      "inline": true
    }
  }, [_c('el-input', {
    staticClass: "fl t_input_w",
    model: {
      value: (_vm.selectInput),
      callback: function($$v) {
        _vm.selectInput = $$v
      },
      expression: "selectInput"
    }
  }, [_c('el-select', {
    staticClass: "fl t_select_width",
    on: {
      "change": _vm.selectOpt
    },
    slot: "prepend",
    model: {
      value: (_vm.sel_value),
      callback: function($$v) {
        _vm.sel_value = $$v
      },
      expression: "sel_value"
    }
  }, _vm._l((_vm.optSelect), function(item) {
    return _c('el-option', {
      key: item.value,
      attrs: {
        "label": item.label,
        "value": item.value
      }
    })
  }))], 1), _vm._v(" "), _c('el-form-item', {
    staticClass: "fl",
    staticStyle: {
      "margin-left": "10px"
    }
  }, [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.queryHandler
    }
  }, [_vm._v("查询")])], 1)], 1)], 1), _vm._v(" "), _c('el-button', {
    staticClass: "add_btn",
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.customerAddHandler
    }
  }, [_vm._v("+添加新客户")]), _vm._v(" "), _c('el-table', {
    attrs: {
      "data": _vm.customerList,
      "border": ""
    }
  }, [_c('el-table-column', {
    attrs: {
      "prop": "unitName",
      "label": "单位名称",
      "span": 12,
      "align": "center"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "unitAddress",
      "label": "单位地址",
      "span": 12,
      "align": "center"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "contacts",
      "label": "联系人",
      "span": 12,
      "align": "center"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "contactsPhone",
      "label": "联系电话",
      "span": 12,
      "align": "center"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "handle",
      "label": "操作",
      "span": 12,
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
        }, [_vm._v("修改")]), _vm._v(" "), _c('el-button', {
          attrs: {
            "size": "small",
            "type": "danger"
          },
          on: {
            "click": function($event) {
              _vm.handleDel(scope.$index, scope.row)
            }
          }
        }, [_vm._v("删除")])]
      }
    }])
  })], 1), _vm._v(" "), _c('paging', {
    staticStyle: {
      "text-align": "center",
      "margin-top": "20px"
    },
    attrs: {
      "childmsg": _vm.pageProps
    },
    on: {
      "childSay": _vm.pageHandler
    }
  }), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": !_vm.isEdit ? '添加客户信息' : '修改客户信息',
      "size": "tiny",
      "close-on-click-modal": true
    },
    model: {
      value: (_vm.customerVisible),
      callback: function($$v) {
        _vm.customerVisible = $$v
      },
      expression: "customerVisible"
    }
  }, [_c('ul', {
    staticClass: "customer_wrap"
  }, [_c('li', {
    staticClass: "clearfix"
  }, [_c('span', {
    staticClass: "fl span_nav"
  }, [_c('span', {
    staticClass: "fr"
  }, [_c('i', {
    staticClass: "i_col_red"
  }, [_vm._v("*")]), _vm._v("单位名称：")])]), _vm._v(" "), _c('el-input', {
    staticClass: "fl",
    staticStyle: {
      "width": "200px"
    },
    model: {
      value: (_vm.companyName),
      callback: function($$v) {
        _vm.companyName = $$v
      },
      expression: "companyName"
    }
  })], 1), _vm._v(" "), _c('li', {
    staticClass: "clearfix"
  }, [_c('span', {
    staticClass: "fl span_nav"
  }, [_c('span', {
    staticClass: "fr"
  }, [_c('i', {
    staticClass: "i_col_red"
  }, [_vm._v("*")]), _vm._v("单位地址：")])]), _vm._v(" "), _c('el-input', {
    staticClass: "fl",
    staticStyle: {
      "width": "200px"
    },
    model: {
      value: (_vm.companyAdd),
      callback: function($$v) {
        _vm.companyAdd = $$v
      },
      expression: "companyAdd"
    }
  })], 1), _vm._v(" "), _c('li', {
    staticClass: "clearfix"
  }, [_c('span', {
    staticClass: "fl span_nav"
  }, [_c('span', {
    staticClass: "fr"
  }, [_c('i', {
    staticClass: "i_col_red"
  }, [_vm._v("*")]), _vm._v("联系人：")])]), _vm._v(" "), _c('el-input', {
    staticClass: "fl",
    staticStyle: {
      "width": "200px"
    },
    model: {
      value: (_vm.linkMan),
      callback: function($$v) {
        _vm.linkMan = $$v
      },
      expression: "linkMan"
    }
  })], 1), _vm._v(" "), _c('li', {
    staticClass: "clearfix"
  }, [_c('span', {
    staticClass: "fl span_nav"
  }, [_c('span', {
    staticClass: "fr"
  }, [_c('i', {
    staticClass: "i_col_red"
  }, [_vm._v("*")]), _vm._v("联系电话：")])]), _vm._v(" "), _c('el-input', {
    staticClass: "fl",
    staticStyle: {
      "width": "200px"
    },
    model: {
      value: (_vm.contact_),
      callback: function($$v) {
        _vm.contact_ = $$v
      },
      expression: "contact_"
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
      "click": _vm.saveHandler
    }
  }, [_vm._v("保存")])], 1)])], 1)
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=14.e623061c371400072f5f.js.map