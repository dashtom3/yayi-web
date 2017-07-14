webpackJsonp([26],{

/***/ 317:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(717)
}
var Component = __webpack_require__(8)(
  /* script */
  __webpack_require__(448),
  /* template */
  __webpack_require__(849),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-eafc63a8",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 448:
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


/* harmony default export */ __webpack_exports__["default"] = ({
	data() {
		return {
			videoList: [],
			qiNiuToken: null,
			qiNiuUrl: __WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].qiNiuUrl,
			videoVisible: false,
			radio: '1',
			viId: '',
			input_video: '',
			video_link: '',
			isEdit: false,
			fileList: []
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
		this.queryHandler();
	},
	computed: {
		ifPlaceHolder: function () {
			return this.radio === '1' ? this.ifPlaceHolder = '' : this.ifPlaceHolder = '请输入视频地址';
		}
	},
	methods: {
		queryHandler() {
			__WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].axiosPostReq('/vid/showVid', {}).then(res => {
				if (res.data.callStatus === 'SUCCEED') {
					this.videoList = res.data.data;
				} else {
					this.$message.error('查询失败！');
				}
			});
		},
		videoAddHandler() {
			this.videoVisible = true;
			this.isEdit = false;
			this.input_video = '';
			this.video_link = '';
			this.fileList = [];
		},
		uploadFile(res, file) {
			this.video_link = __WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].qiniuShUrl + file.response.key;
			this.fileList = [];
			this.fileList.push({
				name: this.video_link,
				url: this.video_link
			});
		},
		cancelVideo() {
			this.videoVisible = false;
		},
		validate() {
			if (!this.input_video) {
				this.$message.error('请填写视频名称！');
				return false;
			}
			if (!this.video_link) {
				this.$message.error('请完成视频上传！');
				return false;
			}
		},
		saveVideo() {
			if (!this.isEdit) {
				let params = {
					vidName: this.input_video,
					videoType: this.radio,
					vidRoute: this.video_link
				};
				this.validate();
				__WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].axiosPostReq('/vid/insertVid', params).then(res => {
					if (res.data.callStatus === 'SUCCEED') {
						this.$message({
							message: '添加成功',
							type: 'success'
						});
						this.fileList = [];
						this.videoVisible = false;
						this.queryHandler();
					} else {
						this.$message.error('添加失败！');
					}
				});
			} else {
				let params = {
					viId: this.viId,
					vidName: this.input_video,
					vidType: this.radio,
					vidRoute: this.video_link
				};
				this.validate();
				__WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].axiosPostReq('/vid/updateVid', params).then(res => {
					if (res.data.callStatus === 'SUCCEED') {
						this.$message({
							message: '修改成功',
							type: 'success'
						});
						this.fileList = [];
						this.videoVisible = false;
						this.queryHandler();
					} else {
						this.$message.error('修改失败！');
					}
				});
			}
		},
		handleEdit(index, row) {
			this.videoVisible = true;
			this.isEdit = true;
			this.input_video = row.vidName;
			this.radio = row.videoType;
			this.video_link = row.vidRoute, this.viId = row.viId;
		},
		handleDel(index, row) {
			this.$confirm('确定删除吗？').then(_ => {
				let params = {
					viId: row.viId
				};
				__WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].axiosPostReq('/vid/deleteVid', params).then(res => {
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

/***/ 581:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(292)(true);
// imports


// module
exports.push([module.i, ".fl[data-v-eafc63a8]{float:left}.fr[data-v-eafc63a8]{float:right}.clearfix[data-v-eafc63a8]{zoom:1}.clearfix[data-v-eafc63a8]:after{content:\"\";clear:both;display:block}.i_col_red[data-v-eafc63a8]{color:red;font-style:normal}.video_wrap li[data-v-eafc63a8]{height:40px;line-height:40px}.span_nav[data-v-eafc63a8]{display:inline-block;width:84px;padding-right:6px}.btn_[data-v-eafc63a8]{width:80px;margin-left:92px}.add_btn[data-v-eafc63a8]{float:right;margin:20px 118px 20px 0}", "", {"version":3,"sources":["/Users/daifeili/yayi-web/src/components/admin/videoManner/video.vue"],"names":[],"mappings":"AACA,qBACC,UAAW,CACX,AACD,qBACC,WAAY,CACZ,AACD,2BACC,MAAO,CACP,AACD,iCACC,WAAW,AACX,WAAW,AACX,aAAc,CACd,AACD,4BACE,UAAW,AACX,iBAAmB,CACpB,AACD,gCACC,YAAa,AACb,gBAAkB,CAClB,AACD,2BACC,qBAAsB,AACtB,WAAY,AACZ,iBAAmB,CACnB,AACD,uBACC,WAAY,AACX,gBAAkB,CACnB,AACD,0BACC,YAAY,AACZ,wBAA0B,CAC1B","file":"video.vue","sourcesContent":["\n.fl[data-v-eafc63a8]{\n\tfloat:left;\n}\n.fr[data-v-eafc63a8]{\n\tfloat:right;\n}\n.clearfix[data-v-eafc63a8]{\n\tzoom:1;\n}\n.clearfix[data-v-eafc63a8]:after{\n\tcontent:\"\";\n\tclear:both;\n\tdisplay:block;\n}\n.i_col_red[data-v-eafc63a8]{\n  color: red;\n  font-style: normal;\n}\n.video_wrap li[data-v-eafc63a8]{\n\theight: 40px;\n\tline-height: 40px;\n}\n.span_nav[data-v-eafc63a8]{\n\tdisplay: inline-block;\n\twidth: 84px;\n\tpadding-right: 6px;\n}\n.btn_[data-v-eafc63a8]{\n\twidth: 80px;\n  margin-left: 92px;\n}\n.add_btn[data-v-eafc63a8]{\n\tfloat:right;\n\tmargin: 20px 118px 20px 0;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 717:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(581);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(293)("782be73a", content, true);

/***/ }),

/***/ 849:
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
  }, [_c('el-breadcrumb-item', [_c('b', [_vm._v("视频管理")])])], 1)], 1), _vm._v(" "), _c('el-button', {
    staticClass: "add_btn",
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.videoAddHandler
    }
  }, [_vm._v("+添加视频")]), _vm._v(" "), _c('el-table', {
    attrs: {
      "data": _vm.videoList,
      "border": ""
    }
  }, [_c('el-table-column', {
    attrs: {
      "prop": "vidName",
      "label": "视频",
      "span": 8,
      "align": "center"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "vidRoute",
      "label": "链接",
      "span": 8,
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
      "title": !_vm.isEdit ? '添加视频' : '修改视频',
      "size": "tiny",
      "close-on-click-modal": true
    },
    model: {
      value: (_vm.videoVisible),
      callback: function($$v) {
        _vm.videoVisible = $$v
      },
      expression: "videoVisible"
    }
  }, [_c('ul', {
    staticClass: "video_wrap"
  }, [_c('li', {
    staticClass: "clearfix"
  }, [_c('span', {
    staticClass: "fl span_nav"
  }, [_c('span', {
    staticClass: "fr"
  }, [_c('i', {
    staticClass: "i_col_red"
  }, [_vm._v("*")]), _vm._v("视频名称：")])]), _vm._v(" "), _c('el-input', {
    staticClass: "fl",
    staticStyle: {
      "width": "200px"
    },
    model: {
      value: (_vm.input_video),
      callback: function($$v) {
        _vm.input_video = $$v
      },
      expression: "input_video"
    }
  })], 1), _vm._v(" "), _c('li', {
    staticClass: "clearfix"
  }, [_c('span', {
    staticClass: "fl span_nav"
  }, [_c('span', {
    staticClass: "fr"
  }, [_c('i', {
    staticClass: "i_col_red"
  }, [_vm._v("*")]), _vm._v("上传方式：")])]), _vm._v(" "), _c('el-radio', {
    staticClass: "radio",
    attrs: {
      "label": "1"
    },
    model: {
      value: (_vm.radio),
      callback: function($$v) {
        _vm.radio = $$v
      },
      expression: "radio"
    }
  }, [_vm._v("本地上传")]), _vm._v(" "), _c('el-radio', {
    staticClass: "radio",
    attrs: {
      "label": "2"
    },
    model: {
      value: (_vm.radio),
      callback: function($$v) {
        _vm.radio = $$v
      },
      expression: "radio"
    }
  }, [_vm._v("输入外部视频网址")])], 1), _vm._v(" "), _c('li', {
    staticClass: "clearfix",
    staticStyle: {
      "padding-left": "92px",
      "padding-bottom": "20px"
    }
  }, [_c('el-input', {
    staticClass: "fl",
    staticStyle: {
      "width": "200px",
      "padding-right": "20px"
    },
    attrs: {
      "placeholder": _vm.ifPlaceHolder
    },
    model: {
      value: (_vm.video_link),
      callback: function($$v) {
        _vm.video_link = $$v
      },
      expression: "video_link"
    }
  }), _vm._v(" "), _c('el-upload', {
    staticClass: "upload-demo",
    attrs: {
      "action": _vm.qiNiuUrl,
      "on-success": _vm.uploadFile,
      "data": _vm.qiNiuToken,
      "file-list": _vm.fileList
    }
  }, [(_vm.radio === '1') ? _c('el-button', {
    attrs: {
      "type": "primary"
    },
    slot: "trigger"
  }, [_vm._v("选择")]) : _vm._e()], 1)], 1)]), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-top": "30px"
    }
  }, [_c('el-button', {
    staticClass: "btn_",
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.saveVideo
    }
  }, [_vm._v("保存")]), _vm._v(" "), _c('el-button', {
    staticClass: "btn_",
    on: {
      "click": _vm.cancelVideo
    }
  }, [_vm._v("取消")])], 1)])], 1)
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=26.a8d8edb02366ccbfe679.js.map