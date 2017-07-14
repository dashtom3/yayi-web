webpackJsonp([10],{

/***/ 307:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(712)
}
var Component = __webpack_require__(8)(
  /* script */
  __webpack_require__(437),
  /* template */
  __webpack_require__(846),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-d06e5848",
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

/***/ 437:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__thirdStep__ = __webpack_require__(740);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__thirdStep___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__thirdStep__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_util__ = __webpack_require__(336);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'secondStep',
  data() {
    return {
      secondStep: true,
      thirdStep: false,
      secondForm: {
        storeItemId: '', //商家货号
        apparatusType: '', //器械类别
        unit: '', //商品单位
        producePompany: '', //生产单位
        registerDate: '', //注册日期
        itemPacking: '', //商品包装
        itemLevels: '', //产品标准
        itemRange: '', //商品使用范围
        remark: '' //其他
      },
      ruleForm: {},
      newForm: {},
      message: {},
      rules: {
        registerDate: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }]
      }
    };
  },
  components: {
    thirdStep: __WEBPACK_IMPORTED_MODULE_0__thirdStep___default.a
  },
  created: function () {
    var that = this;
    that.editCargo = JSON.parse(window.sessionStorage.getItem('editCargo'));
    if (that.editCargo !== null) {
      that.ruleForm = that.$route.params.ruleForm;
      that.secondForm.storeItemId = that.editCargo.itemDetail.storeItemId;
      that.secondForm.apparatusType = that.editCargo.itemDetail.apparatusType;
      that.secondForm.unit = that.editCargo.itemDetail.unit;
      that.secondForm.producePompany = that.editCargo.itemDetail.producePompany;
      that.secondForm.registerDate = that.editCargo.itemDetail.registerDate;
      that.secondForm.itemPacking = that.editCargo.itemDetail.itemPacking;
      that.secondForm.itemLevels = that.editCargo.itemDetail.itemLevels;
      that.secondForm.itemRange = that.editCargo.itemDetail.itemRange;
    } else {
      that.ruleForm = that.$route.params.ruleForm;
    }
    //console.log(that.ruleForm);
  },
  methods: {
    nextToThird: function (formName) {
      var that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          if (that.editCargo !== null) {
            that.secondForm.registerDate = __WEBPACK_IMPORTED_MODULE_1__common_util__["a" /* default */].formatDate.format(new Date(that.secondForm.registerDate));
            Object.assign(that.newForm, that.secondForm, that.ruleForm);
            // that.newForm.apparatusType = parseInt(that.newForm.apparatusType);
            that.secondStep = false;
            that.thirdStep = true;
          } else {
            that.secondForm.registerDate = __WEBPACK_IMPORTED_MODULE_1__common_util__["a" /* default */].formatDate.format(that.secondForm.registerDate);
            Object.assign(that.newForm, that.secondForm, that.ruleForm);
            // that.newForm.apparatusType = parseInt(that.newForm.apparatusType);
            that.secondStep = false;
            that.thirdStep = true;
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    returnFrist: function () {
      var that = this;
      that.$router.push({ name: 'addMerchandise', params: { ruleForm: that.ruleForm } });
    },
    showMsgFromThirdStep: function (data) {
      var that = this;
      that.thirdStep = data;
      that.secondStep = true;
    }
  }
});

/***/ }),

/***/ 438:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global_global__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'thirdStep',
  props: ['message'],
  data() {
    return {
      fileList2: [],
      fileList: [],
      thirdForm: {
        itemPica: '',
        itemPicb: '',
        itemPicc: '',
        itemPicd: '',
        itemPice: '',
        itemDesc: '',
        itemUse: '',
        video: ''
      },
      options: [],
      thirdStep: true,
      qiNiuToken: {},
      qiNiuUrl: __WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].qiNiuUrl,
      dialogVisible: false,
      imageUrl: '',
      fwb: '',
      state: null
    };
  },
  created: function () {
    var that = this;
    that.editCargo = JSON.parse(window.sessionStorage.getItem('editCargo'));
    if (that.editCargo !== null) {
      that.thirdForm.video = that.editCargo.itemDetail.video;
      that.state = 1;
      console.log('buweikong'
      // 获取七牛云token
      );__WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].axiosGetReq('/file/getUpToken').then(res => {
        if (res.data.callStatus === 'SUCCEED') {
          that.qiNiuToken = {
            token: res.data.msg
          };
          console.log(that.qiNiuToken.token);
        }
      });
      that.queryHandler();
    } else {
      // 获取七牛云token
      __WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].axiosGetReq('/file/getUpToken').then(res => {
        if (res.data.callStatus === 'SUCCEED') {
          that.qiNiuToken = {
            token: res.data.msg
          };
          console.log(that.qiNiuToken.token);
        }
      });
      that.queryHandler();
    }
  },
  mounted: function () {
    var that = this;
    //商品详情
    that.quill1 = new Quill('#editor1', {
      modules: {
        toolbar: '#toolbar1'
      },
      placeholder: '',
      theme: 'snow'
      // imageHandler: that.imageHandler
    });
    //图片说明
    that.quill2 = new Quill('#editor2', {
      modules: {
        toolbar: '#toolbar2'
      },
      placeholder: '',
      theme: 'snow'
      // imageHandler: that.imageHandler
    });
  },
  methods: {
    // 插入图片至富文本框
    insertImg() {
      var that = this;
      var insert = {
        image: that.imageUrl
        // var delta = that.quill1.getContents();
        // delta.push(insert);
        // console.log(delta,'ppp')
        //var i = that.quill1.getContents().ops.length;
        // console.log(i,'333')
      };if (that.fwb == 0) {
        that.quill1.insertEmbed(0, 'image', that.imageUrl);
      } else {
        that.quill2.insertEmbed(0, 'image', that.imageUrl);
      }
      that.dialogVisible = false;
    },
    uploaImage: function () {
      var that = this;
      that.imageUrl = '';
      that.fwb = 0, that.dialogVisible = true;
    },
    uploaImage1: function () {
      var that = this;
      that.imageUrl = '';
      that.fwb = 1;
      that.dialogVisible = true;
    },
    handleAvatarSuccess(file, fileList) {
      var that = this;
      // console.log(file,fileList)
      that.imageUrl = __WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].qiniuShUrl + file.key;
      console.log(that.imageUrl);
    },
    // 富文本上传图片至七牛云
    // imageHandler: function(image, callback) {
    //   var that = this;
    //   var data = new FormData();
    //   var url = "http://upload-z2.qiniu.com/"; //非华东空间需要根据注意事项 1 修改上传域名
    //   data.append('image', image);
    //   var xhr = new XMLHttpRequest();
    //   xhr.open('POST', url, true);
    //   xhr.setRequestHeader('Authorization', "UpToken " + that.qiNiuToken);
    //   xhr.onreadystatechange = function() {
    //     if (xhr.readyState === 4) {
    //       var response = JSON.parse(xhr.responseText);
    //       if (response.status === 200 && response.success) {
    //         callback(response.data.link);
    //       } else {
    //         var reader = new FileReader();
    //         reader.onload = function(e) {
    //           callback(e.target.result);
    //         };
    //         reader.readAsDataURL(image);
    //       }
    //     }
    //   }
    //   xhr.send(data);
    // },
    // 获取视频链接
    queryHandler() {
      var that = this;
      __WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].axiosPostReq('/vid/showVid', {}).then(res => {
        if (res.data.callStatus === 'SUCCEED') {
          that.options = res.data.data;
          console.log(that.options, 'xs');
        } else {
          that.$message.error('查询失败！');
        }
      });
    },
    // 上传图片成功之后
    uploadFile(file, fileList) {
      var that = this;
      var img_src = '';
      img_src = __WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].qiniuShUrl + file.key;
      that.fileList.push(img_src);
    },
    // 删除图片触发的钩子
    handleRemove(file, fileList) {
      var that = this;
      var img_src = __WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].qiniuShUrl + file.response.key;
      // console.log(img_src);
      var b = that.fileList.filter(function (ele, index, arr) {
        //console.log(ele,'3333333');
        return ele !== img_src;
      });
      that.fileList = b;
    },
    // 保存新增商品
    save: function () {
      var that = this;
      if (that.state !== 1) {
        // that.quill1.insertText(1, 'Hello', 'bold', true);
        that.thirdForm.itemDesc = that.quill1.container.firstChild.innerHTML;
        that.thirdForm.itemUse = that.quill2.container.firstChild.innerHTML;
        // console.log(that.thirdForm.itemDesc,that.thirdForm.itemUse);
        that.thirdForm.itemPica = that.fileList[0];
        that.thirdForm.itemPicb = that.fileList[1];
        that.thirdForm.itemPicc = that.fileList[2];
        that.thirdForm.itemPicd = that.fileList[3];
        that.thirdForm.itemPice = that.fileList[4];
        Object.assign(that.thirdForm, that.message);
        delete that.thirdForm.itemBrand;
        delete that.thirdForm.type;
        delete that.thirdForm.shopType;
        delete that.thirdForm.items;
        var itemValueList = JSON.stringify(that.thirdForm.itemValueList
        // console.log(itemValueList)
        );var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://47.93.48.111:8080/api/item/insertItemValue");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(itemValueList);
        xhr.onreadystatechange = function () {
          // var succeed = JSON.parse(xhr.response.callStatus)
          // console.log(succeed)
          var succeed = JSON.parse(xhr.response);
          if (succeed.callStatus == 'SUCCEED') {
            delete that.thirdForm.itemValueList;
            __WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].axiosPostReq('/item/insert', that.thirdForm).then(res => {
              if (res.data.callStatus === 'SUCCEED') {
                console.log(res, '保存成功！');
                that.$message('保存成功！');
                that.$router.push({ name: '商品信息管理', params: { list: true, addMerchandise: false } });
              } else {
                that.$message.error('网络出错，请稍后再试！');
              }
            });
          } else {
            that.$message.error('保存失败！');
          }
        };
      } else {
        console.log('xiugai'
        // that.quill1.insertText(1, 'Hello', 'bold', true);
        );that.thirdForm.itemDesc = that.quill1.container.firstChild.innerHTML;
        that.thirdForm.itemUse = that.quill2.container.firstChild.innerHTML;
        console.log(that.thirdForm.itemDesc, that.thirdForm.itemUse);
        that.thirdForm.itemPica = that.fileList[0];
        that.thirdForm.itemPicb = that.fileList[1];
        that.thirdForm.itemPicc = that.fileList[2];
        that.thirdForm.itemPicd = that.fileList[3];
        that.thirdForm.itemPice = that.fileList[4];
        Object.assign(that.thirdForm, that.message);
        delete that.thirdForm.itemBrand;
        delete that.thirdForm.type;
        delete that.thirdForm.shopType;
        delete that.thirdForm.items;
        var itemValueList = JSON.stringify(that.thirdForm.itemValueList);
        console.log(itemValueList);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://47.93.48.111:8080/api/item/updateItemValue");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(itemValueList);
        xhr.onreadystatechange = function () {
          // var succeed = JSON.parse(xhr.response.callStatus)
          // console.log(succeed)
          var succeed = JSON.parse(xhr.response);
          if (succeed.callStatus == 'SUCCEED') {
            delete that.thirdForm.itemValueList;
            __WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* default */].axiosPostReq('/item/update', that.thirdForm).then(res => {
              if (res.data.callStatus === 'SUCCEED') {
                console.log(res, '修改商品成功！');
                that.$message('修改商品成功！');
                window.sessionStorage.removeItem('editCargo');
                that.$router.push({ name: '商品信息管理', params: { list: true, addMerchandise: false } });
              } else {
                that.$message.error('网络出错，请稍后再试！');
              }
            });
          } else {
            that.$message.error('保存失败！');
          }
        };
      }
    },
    // 返回上一步
    returnSecond: function () {
      var that = this;
      that.thirdStep = false;
      that.$emit('listenToSecond', that.thirdStep);
    }
  },
  components: {
    // quillEditor,
  }
});

/***/ }),

/***/ 547:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(292)(true);
// imports


// module
exports.push([module.i, ".firstTitle[data-v-64668d87]{margin-top:15px;margin-bottom:15px;font-size:15px;padding-bottom:10px;border-bottom:1px solid #e9e9e9}.secondTitle[data-v-64668d87],.thirdTitle[data-v-64668d87]{margin-top:50px;margin-bottom:15px;font-size:15px;padding-bottom:10px;border-bottom:1px solid #e9e9e9}.fouthTitle[data-v-64668d87],.selectTv[data-v-64668d87]{float:left;margin-top:50px}#editor-container[data-v-64668d87]{height:375px}.avatar-uploader .el-upload[data-v-64668d87]{border:1px dashed #d9d9d9;border-radius:6px;cursor:pointer;position:relative;overflow:hidden}.avatar-uploader .el-upload[data-v-64668d87]:hover{border-color:#20a0ff}.avatar-uploader-icon[data-v-64668d87]{font-size:28px;color:#8c939d;width:178px;height:178px;line-height:178px;text-align:center;background:#eaeaea}.avatar[data-v-64668d87]{width:178px;height:178px;display:block}", "", {"version":3,"sources":["/Users/daifeili/yayi-web/src/components/admin/merchantMessage/thirdStep.vue"],"names":[],"mappings":"AACA,6BACE,gBAAiB,AACjB,mBAAoB,AACpB,eAAgB,AAChB,oBAAqB,AACrB,+BAAiC,CAClC,AACD,2DACE,gBAAiB,AACjB,mBAAoB,AACpB,eAAgB,AAChB,oBAAqB,AACrB,+BAAiC,CAClC,AAKD,wDAHE,WAAY,AACZ,eAAiB,CAKlB,AAGD,mCACE,YAAc,CACf,AACD,6CACE,0BAA2B,AAC3B,kBAAmB,AACnB,eAAgB,AAChB,kBAAmB,AACnB,eAAiB,CAClB,AACD,mDACE,oBAAsB,CACvB,AACD,uCACE,eAAgB,AAChB,cAAe,AACf,YAAa,AACb,aAAc,AACd,kBAAmB,AACnB,kBAAmB,AACnB,kBAAoB,CACrB,AACD,yBACE,YAAa,AACb,aAAc,AACd,aAAe,CAChB","file":"thirdStep.vue","sourcesContent":["\n.firstTitle[data-v-64668d87] {\n  margin-top: 15px;\n  margin-bottom: 15px;\n  font-size: 15px;\n  padding-bottom: 10px;\n  border-bottom: 1px solid #e9e9e9;\n}\n.secondTitle[data-v-64668d87],.thirdTitle[data-v-64668d87]{\n  margin-top: 50px;\n  margin-bottom: 15px;\n  font-size: 15px;\n  padding-bottom: 10px;\n  border-bottom: 1px solid #e9e9e9;\n}\n.fouthTitle[data-v-64668d87] {\n  float: left;\n  margin-top: 50px;\n}\n.selectTv[data-v-64668d87] {\n  float: left;\n  margin-top: 50px;\n}\n.upload-demo[data-v-64668d87] {\n}\n#editor-container[data-v-64668d87] {\n  height: 375px;\n}\n.avatar-uploader .el-upload[data-v-64668d87] {\n  border: 1px dashed #d9d9d9;\n  border-radius: 6px;\n  cursor: pointer;\n  position: relative;\n  overflow: hidden;\n}\n.avatar-uploader .el-upload[data-v-64668d87]:hover {\n  border-color: #20a0ff;\n}\n.avatar-uploader-icon[data-v-64668d87] {\n  font-size: 28px;\n  color: #8c939d;\n  width: 178px;\n  height: 178px;\n  line-height: 178px;\n  text-align: center;\n  background: #eaeaea;\n}\n.avatar[data-v-64668d87] {\n  width: 178px;\n  height: 178px;\n  display: block;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 576:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(292)(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"secondStep.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 683:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(547);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(293)("23bdc03e", content, true);

/***/ }),

/***/ 712:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(576);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(293)("2d72684a", content, true);

/***/ }),

/***/ 740:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(683)
}
var Component = __webpack_require__(8)(
  /* script */
  __webpack_require__(438),
  /* template */
  __webpack_require__(821),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-64668d87",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 821:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.thirdStep),
      expression: "thirdStep"
    }],
    staticClass: "thirdStep"
  }, [_c('div', {
    staticClass: "firstTitle"
  }, [_vm._v("商品图片：(最多5个)")]), _vm._v(" "), _c('el-upload', {
    staticClass: "upload-demo",
    attrs: {
      "on-remove": _vm.handleRemove,
      "on-success": _vm.uploadFile,
      "data": _vm.qiNiuToken,
      "action": _vm.qiNiuUrl,
      "file-list": _vm.fileList2,
      "list-type": "picture"
    }
  }, [_c('el-button', {
    attrs: {
      "size": "small",
      "type": "primary"
    }
  }, [_vm._v("添加图片")]), _vm._v(" "), _c('div', {
    staticClass: "el-upload__tip",
    slot: "tip"
  }, [_vm._v("只能上传jpg/png文件，且不超过500kb")])], 1), _vm._v(" "), _c('div', {
    staticClass: "clearfix"
  }), _vm._v(" "), _c('div', {
    staticClass: "second_box"
  }, [_c('div', {
    staticClass: "secondTitle"
  }, [_vm._v("商品详情：")]), _vm._v(" "), _c('div', {
    attrs: {
      "id": "toolbar1"
    }
  }, [_vm._m(0), _vm._v(" "), _c('button', {
    staticClass: "ql-bold"
  }), _vm._v(" "), _c('button', {
    staticClass: "ql-italic"
  }), _vm._v(" "), _c('button', {
    staticClass: "ql-script",
    attrs: {
      "value": "sub"
    }
  }), _vm._v(" "), _c('button', {
    staticClass: "ql-script",
    attrs: {
      "value": "super"
    }
  }), _vm._v(" "), _c('button', {
    staticClass: "ql-Image",
    on: {
      "click": _vm.uploaImage
    }
  }, [_vm._v("image")])]), _vm._v(" "), _c('div', {
    attrs: {
      "id": "editor1"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "third_box"
  }, [_c('div', {
    staticClass: "thirdTitle"
  }, [_vm._v("图片说明：")]), _vm._v(" "), _c('div', {
    attrs: {
      "id": "toolbar2"
    }
  }, [_vm._m(1), _vm._v(" "), _c('button', {
    staticClass: "ql-bold"
  }), _vm._v(" "), _c('button', {
    staticClass: "ql-italic"
  }), _vm._v(" "), _c('button', {
    staticClass: "ql-script",
    attrs: {
      "value": "sub"
    }
  }), _vm._v(" "), _c('button', {
    staticClass: "ql-script",
    attrs: {
      "value": "super"
    }
  }), _vm._v(" "), _c('button', {
    staticClass: "ql-Image",
    on: {
      "click": _vm.uploaImage1
    }
  }, [_vm._v("image")])]), _vm._v(" "), _c('div', {
    attrs: {
      "id": "editor2"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "fouth_box"
  }, [_c('div', {
    staticClass: "fouthTitle"
  }, [_vm._v("视频说明：")]), _vm._v(" "), _c('el-select', {
    staticClass: "selectTv",
    attrs: {
      "filterable": "",
      "placeholder": "请选择"
    },
    model: {
      value: (_vm.thirdForm.video),
      callback: function($$v) {
        _vm.thirdForm.video = $$v
      },
      expression: "thirdForm.video"
    }
  }, _vm._l((_vm.options), function(item) {
    return _c('el-option', {
      key: item.vidRoute,
      attrs: {
        "label": item.vidName,
        "value": item.vidRoute
      }
    })
  }))], 1), _vm._v(" "), _c('div', {
    staticClass: "clearfix"
  }), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-left": "30px",
      "margin-top": "50px"
    }
  }, [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.save()
      }
    }
  }, [_vm._v("保存")]), _vm._v(" "), _c('el-button', {
    on: {
      "click": function($event) {
        _vm.returnSecond()
      }
    }
  }, [_vm._v("返回")])], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "上传图片",
      "visible": _vm.dialogVisible,
      "size": "small"
    },
    on: {
      "update:visible": function($event) {
        _vm.dialogVisible = $event
      }
    }
  }, [_c('el-upload', {
    staticClass: "avatar-uploader",
    attrs: {
      "data": _vm.qiNiuToken,
      "action": _vm.qiNiuUrl,
      "show-file-list": false,
      "on-success": _vm.handleAvatarSuccess
    }
  }, [(_vm.imageUrl) ? _c('img', {
    staticClass: "avatar",
    attrs: {
      "src": _vm.imageUrl
    }
  }) : _c('i', {
    staticClass: "el-icon-plus avatar-uploader-icon"
  })]), _vm._v(" "), _c('span', {
    staticClass: "dialog-footer",
    slot: "footer"
  }, [_c('el-button', {
    on: {
      "click": function($event) {
        _vm.dialogVisible = false
      }
    }
  }, [_vm._v("取 消")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.insertImg
    }
  }, [_vm._v("插入图片")])], 1)], 1)], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('select', {
    staticClass: "ql-size"
  }, [_c('option', {
    attrs: {
      "value": "small"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "selected": ""
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "large"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "huge"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('select', {
    staticClass: "ql-size"
  }, [_c('option', {
    attrs: {
      "value": "small"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "selected": ""
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "large"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "huge"
    }
  })])
}]}

/***/ }),

/***/ 846:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "secondStep"
  }, [_c('el-form', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.secondStep),
      expression: "secondStep"
    }],
    ref: "secondForm",
    staticClass: "secondStep_box",
    staticStyle: {
      "margin-top": "20px"
    },
    attrs: {
      "inline": true,
      "model": _vm.secondForm,
      "rules": _vm.rules
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "商家货号"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.secondForm.storeItemId),
      callback: function($$v) {
        _vm.secondForm.storeItemId = $$v
      },
      expression: "secondForm.storeItemId"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "器械类别"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.secondForm.apparatusType),
      callback: function($$v) {
        _vm.secondForm.apparatusType = $$v
      },
      expression: "secondForm.apparatusType"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "单位"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.secondForm.unit),
      callback: function($$v) {
        _vm.secondForm.unit = $$v
      },
      expression: "secondForm.unit"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "生产企业"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.secondForm.producePompany),
      callback: function($$v) {
        _vm.secondForm.producePompany = $$v
      },
      expression: "secondForm.producePompany"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "注册证有效期／备案日期",
      "prop": "registerDate"
    }
  }, [_c('el-date-picker', {
    attrs: {
      "format": "yyyy-MM-dd",
      "type": "date",
      "placeholder": "选择日期"
    },
    model: {
      value: (_vm.secondForm.registerDate),
      callback: function($$v) {
        _vm.secondForm.registerDate = $$v
      },
      expression: "secondForm.registerDate"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "产品包装"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.secondForm.itemPacking),
      callback: function($$v) {
        _vm.secondForm.itemPacking = $$v
      },
      expression: "secondForm.itemPacking"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "产品标准"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.secondForm.itemLevels),
      callback: function($$v) {
        _vm.secondForm.itemLevels = $$v
      },
      expression: "secondForm.itemLevels"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "使用范围"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.secondForm.itemRange),
      callback: function($$v) {
        _vm.secondForm.itemRange = $$v
      },
      expression: "secondForm.itemRange"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "其他"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.secondForm.remark),
      callback: function($$v) {
        _vm.secondForm.remark = $$v
      },
      expression: "secondForm.remark"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-left": "30px"
    }
  }, [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.nextToThird('secondForm')
      }
    }
  }, [_vm._v("下一步")]), _vm._v(" "), _c('el-button', {
    on: {
      "click": function($event) {
        _vm.returnFrist()
      }
    }
  }, [_vm._v("返回")])], 1)], 1), _vm._v(" "), _c('thirdStep', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.thirdStep),
      expression: "thirdStep"
    }],
    attrs: {
      "message": _vm.newForm
    },
    on: {
      "listenToSecond": _vm.showMsgFromThirdStep
    }
  })], 1)
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=10.a81cbda9f1062ca139b9.js.map