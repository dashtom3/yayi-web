webpackJsonp([34],{

/***/ 296:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(707)
}
var Component = __webpack_require__(8)(
  /* script */
  __webpack_require__(425),
  /* template */
  __webpack_require__(841),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-ab7c0c58",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 425:
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


/* harmony default export */ __webpack_exports__["default"] = ({
	data() {
		return {
			realName: '',
			userName: '',
			pwd1: '',
			realName1: '',
			userName1: '',
			adminList: [{
				userName: '某一',
				pwd: '123456',
				realName: '张三'
			}, {
				userName: '某二',
				pwd: '123456',
				realName: '李四'
			}, {
				userName: '某三',
				pwd: '123456',
				realName: '王五'
			}],
			adminAddBtn: false,
			adminstratorId: '',
			isEdit: false
		};
	},
	created() {
		this.queryHandler();
	},
	methods: {
		queryHandler() {
			let params = {
				phone: this.userName,
				trueName: this.realName
			};

			__WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].axiosPostReq('/adminstrator/query', params).then(res => {
				if (res.data.callStatus === 'SUCCEED') {
					this.adminList = res.data.data;
				} else {
					this.$message.error('查询评论失败！');
				}
			});
		},
		adminAddHandler() {
			this.adminAddBtn = true;
			this.userName1 = '';
			this.pwd1 = '';
			this.realName1 = '';
			this.isEdit = false;
		},
		addOkHandler() {
			//添加管理员
			if (!this.isEdit) {
				let params = {
					phone: this.userName1,
					adminstratorPwd: this.pwd1,
					trueName: this.realName1
				};
				__WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].axiosPostReq('/adminstrator/add', params).then(res => {
					if (res.data.callStatus === 'SUCCEED') {
						this.$message({
							message: '添加成功',
							type: 'success'
						});
						this.adminAddBtn = false;
						this.queryHandler();
					} else {
						this.$message.error('添加失败！');
					}
				});
			} else if (this.isEdit) {
				//修改管理员
				let params = {
					adminstratorId: this.adminstratorId,
					phone: this.userName1,
					adminstratorPwd: this.pwd1,
					trueName: this.realName1
				};
				__WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].axiosPostReq('/adminstrator/update', params).then(res => {
					if (res.data.callStatus === 'SUCCEED') {
						this.$message({
							message: '修改成功',
							type: 'success'
						});
						this.adminAddBtn = false;
						this.queryHandler();
					} else {
						this.$message.error('修改失败！');
					}
				});
			}
		},
		handleEdit(index, row) {
			this.adminAddBtn = true;
			this.userName1 = row.phone;
			this.pwd1 = row.adminstratorPwd;
			this.realName1 = row.trueName;
			this.adminstratorId = row.adminstratorId;
			this.isEdit = true;
		},
		handleDel(index, row) {
			this.$confirm('确定删除吗？').then(_ => {
				let params = {
					adminstratorId: row.adminstratorId
				};
				__WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].axiosPostReq('/adminstrator/delete', params).then(res => {
					if (res.data.callStatus === 'SUCCEED') {
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.queryHandler();
					} else {
						this.$message.error('删除失败！');
					}
				});
			}).catch(_ => {});
		}
	}
});

/***/ }),

/***/ 571:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(292)(true);
// imports


// module
exports.push([module.i, ".fl[data-v-ab7c0c58]{float:left}.clearfix[data-v-ab7c0c58]{zoom:1}.clearfix[data-v-ab7c0c58]:after{content:\"\";clear:both;display:block}.t_input_width[data-v-ab7c0c58]{width:300px}.btn_[data-v-ab7c0c58]{margin-left:154px}.btn_box[data-v-ab7c0c58]{width:260px;margin:20px auto}.add_btn[data-v-ab7c0c58]{float:right;margin-right:118px;margin-bottom:20px}.admin_layout[data-v-ab7c0c58]{height:40px;line-height:40px;padding-left:80px}", "", {"version":3,"sources":["/Users/daifeili/yayi-web/src/components/admin/adminManner/admin.vue"],"names":[],"mappings":"AACA,qBACC,UAAW,CACX,AACD,2BACC,MAAO,CACP,AACD,iCACC,WAAW,AACX,WAAW,AACX,aAAc,CACd,AACD,gCACC,WAAY,CACZ,AACD,uBACE,iBAAmB,CACpB,AACD,0BACE,YAAa,AACb,gBAAkB,CACnB,AACD,0BACC,YAAY,AACZ,mBAAmB,AACnB,kBAAmB,CACnB,AACD,+BACC,YAAY,AACZ,iBAAiB,AACjB,iBAAkB,CAClB","file":"admin.vue","sourcesContent":["\n.fl[data-v-ab7c0c58]{\n\tfloat:left;\n}\n.clearfix[data-v-ab7c0c58]{\n\tzoom:1;\n}\n.clearfix[data-v-ab7c0c58]:after{\n\tcontent:\"\";\n\tclear:both;\n\tdisplay:block;\n}\n.t_input_width[data-v-ab7c0c58]{\n\twidth:300px;\n}\n.btn_[data-v-ab7c0c58]{\n  margin-left: 154px;\n}\n.btn_box[data-v-ab7c0c58]{\n  width: 260px;\n  margin: 20px auto;\n}\n.add_btn[data-v-ab7c0c58]{\n\tfloat:right;\n\tmargin-right:118px;\n\tmargin-bottom:20px;\n}\n.admin_layout[data-v-ab7c0c58]{\n\theight:40px;\n\tline-height:40px;\n\tpadding-left:80px;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 707:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(571);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(293)("313102c8", content, true);

/***/ }),

/***/ 841:
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
  }, [_c('el-breadcrumb-item', [_c('b', [_vm._v("管理员列表")])])], 1)], 1), _vm._v(" "), _c('el-col', {
    staticClass: "warp-main",
    attrs: {
      "span": 24
    }
  }, [_c('el-form', {
    staticClass: "clearfix",
    attrs: {
      "label-width": "80px"
    }
  }, [_c('el-form-item', {
    staticClass: "fl t_input_width",
    attrs: {
      "label": "真实姓名"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.realName),
      callback: function($$v) {
        _vm.realName = $$v
      },
      expression: "realName"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    staticClass: "fl t_input_width",
    attrs: {
      "label": "用户名"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.userName),
      callback: function($$v) {
        _vm.userName = $$v
      },
      expression: "userName"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    staticClass: "fl"
  }, [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.queryHandler
    }
  }, [_vm._v("查询")])], 1)], 1), _vm._v(" "), _c('el-button', {
    staticClass: "add_btn",
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.adminAddHandler
    }
  }, [_vm._v("+添加管理员")]), _vm._v(" "), _c('el-table', {
    attrs: {
      "data": _vm.adminList,
      "border": ""
    }
  }, [_c('el-table-column', {
    attrs: {
      "prop": "phone",
      "label": "用户名",
      "span": 4,
      "align": "center"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "adminstratorPwd",
      "label": "密码",
      "span": 4,
      "align": "center"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "trueName",
      "label": "真实姓名",
      "span": 4,
      "align": "center"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "handle",
      "label": "操作",
      "span": 8,
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
  })], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": !_vm.isEdit ? '添加管理员' : '修改管理员',
      "size": "tiny",
      "close-on-click-modal": true
    },
    model: {
      value: (_vm.adminAddBtn),
      callback: function($$v) {
        _vm.adminAddBtn = $$v
      },
      expression: "adminAddBtn"
    }
  }, [_c('div', {
    staticClass: "admin_layout"
  }, [_c('span', [_vm._v("用户名：")]), _vm._v(" "), [_c('el-input', {
    staticStyle: {
      "width": "225px",
      "margin-left": "13px"
    },
    attrs: {
      "size": "small"
    },
    model: {
      value: (_vm.userName1),
      callback: function($$v) {
        _vm.userName1 = $$v
      },
      expression: "userName1"
    }
  })]], 2), _vm._v(" "), _c('div', {
    staticClass: "admin_layout"
  }, [_c('span', [_vm._v("密码：")]), _vm._v(" "), [_c('el-input', {
    staticStyle: {
      "width": "225px",
      "margin-left": "27px"
    },
    attrs: {
      "size": "small"
    },
    model: {
      value: (_vm.pwd1),
      callback: function($$v) {
        _vm.pwd1 = $$v
      },
      expression: "pwd1"
    }
  })]], 2), _vm._v(" "), _c('div', {
    staticClass: "admin_layout"
  }, [_c('span', [_vm._v("真实姓名：")]), _vm._v(" "), [_c('el-input', {
    staticStyle: {
      "width": "225px"
    },
    attrs: {
      "size": "small"
    },
    model: {
      value: (_vm.realName1),
      callback: function($$v) {
        _vm.realName1 = $$v
      },
      expression: "realName1"
    }
  })]], 2), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-top": "30px"
    }
  }, [_c('el-button', {
    staticClass: "btn_",
    on: {
      "click": _vm.addOkHandler
    }
  }, [_vm._v("确定")]), _vm._v(" "), _c('el-button', {
    staticStyle: {
      "margin-left": "60px"
    },
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.adminAddBtn = false
      }
    }
  }, [_vm._v("取消")])], 1)])], 1)], 1)
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=34.4c0c0d395056dec428d7.js.map