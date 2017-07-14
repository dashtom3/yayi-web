webpackJsonp([6],{

/***/ 313:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(667)
  __webpack_require__(668)
}
var Component = __webpack_require__(8)(
  /* script */
  __webpack_require__(444),
  /* template */
  __webpack_require__(806),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-49faeb30",
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

/***/ 444:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__website_brandLib_paging0__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__website_brandLib_paging0___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__website_brandLib_paging0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      // wuliu:[
      //   {value:"申通快递",label:"申通快递"}
      // ],
      pageProps: null,
      nowOrderDetails: null,
      wuLiuBianHao: null,
      wuliu: "申通快递",
      //订单状态
      state: [{ value: '', label: '全部' }, { value: '1', label: '等待买家付款' }, { value: '2', label: '买家已付款' }, { value: '5', label: '订单已确认' }, { value: '3', label: '卖家已发货' }, { value: '4', label: '交易成功' }, { value: '0', label: '交易关闭' }],
      //是否退款
      drawback: [{
        value1: '0',
        label1: '全部'
      }, {
        value1: '1',
        label1: '是'
      }, {
        value1: '2',
        label1: '否'
      }],
      orderCode: '', //订单编号
      buyerInfo: '', //买家信息
      value: '全部', //订单状态的value
      value1: '全部', //是否退款的value
      value3: [],
      // value3: [new Date(2017, 10, 10, 10, 10), new Date(2017, 10, 11, 10, 10)],//下单时间
      //订单列表
      orderList: [],
      detailVisible: false, //详情界面开关
      dialogVisible: false, //关闭开关
      deliveryVisible: false, //仓库发货开关
      refundVisible: false, //退款处理开关
      //收货信息
      receivingInfo: [{
        userCode: 'xxxxxx',
        userName: '张三',
        localtion: '上海市静安区',
        detailAddr: '共和新路街道洛川中路1100弄31号103（居委会）'
      }],
      //订单信息
      orderInfo: {
        orderDate: '2017-05-27',
        orderNo: '173828478CSJHC',
        orderTime: 'xxxxxxxxxxx',
        totalPrice: 156,
        refundAmt: 78,
        outCoins: 2,
        untread: 6,
        freight: 68,
        deductible: 2,
        //商品信息
        goodsInfo: [{
          goodsSrc: '',
          goodsName: '商品名称1',
          SKUCode: 'xxxxxxxxx',
          price: 39,
          goodsNum: 2,
          checked: false,
          count: 1 //退款数量
        }, {
          goodsSrc: '',
          goodsName: '商品名称2',
          SKUCode: 'xxxxxxxxx',
          price: 39,
          goodsNum: 1,
          checked: false,
          count: 1 //退款数量
        }, {
          goodsSrc: '',
          goodsName: '商品名称3',
          SKUCode: 'xxxxxxxxx',
          price: 39,
          goodsNum: 1,
          checked: false,
          count: 1 //退款数量
        }]
      }
    };
  },
  components: {
    paging: __WEBPACK_IMPORTED_MODULE_0__website_brandLib_paging0___default.a
  },
  created: function () {
    var that = this;
    that.getOrderList();
  },
  methods: {
    pageHandler: function (data) {
      this.fenYeGetData(data);
    },
    fenYeGetData: function (data) {
      var that = this;
      var obj = {};
      obj.currentPage = data;
      obj.numberPerpage = 10;
      console.log(obj);
      that.global.axiosGetReq('/showUserOrderManage/showOrder', obj).then(res => {
        console.log(res, "getOrderList");
        if (res.data.callStatus === 'SUCCEED') {
          that.orderList = res.data.data;
        } else {
          that.$message.error('网络出错，请稍后再试！');
        }
      });
    },
    sureFaHuo: function () {
      var that = this;
      var obj = {};
      obj.logisticsName = that.wuliu;
      obj.orderId = that.faHuoOrder.orderId;
      obj.logisticsCode = that.wuLiuBianHao;
      if (that.wuLiuBianHao) {
        that.global.axiosPostReq('/showUserOrderManage/warehouseDelivery', obj).then(res => {
          if (res.data.callStatus === 'SUCCEED') {
            that.orderList[that.fahuoIndex].state = "3";
            that.deliveryVisible = false;
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        });
      } else {
        that.$alert('请填写物流编号！', { confirmButtonText: '确定' });
      }
    },
    search: function () {
      var that = this;
      var obj = {};
      var flag = false;
      if (that.orderCode) {
        obj.orderId = that.orderCode;
      }
      if (that.buyerInfo) {
        obj.buyerInfo = that.buyerInfo;
      }
      if (that.value) {
        // 订单状态
        // {value: '0',label: '全部'},
        // for(let b in that.state){
        //   if(that.state[b].label==that.value&&that.state[b].value!="0"){
        //     obj.state = that.state[b].value;
        //   }
        // }
        // obj.state = that.value;
      }
      if (that.value3.length != 0) {
        var date1, date2;
        date1 = that.value3[0].toLocaleString();
        date2 = that.value3[1].toLocaleString();
        date1 = date1.split(" ");
        date2 = date2.split(" ");
        date1 = date1[0].split("/").join("-");
        date2 = date2[0].split("/").join("-");
        obj.orderCTime = date1;
        obj.orderETime = date2;
      }
      if (that.value1) {
        // 退款状态
        for (let a in that.drawback) {
          if (that.value1 == that.drawback[a].label1 && that.drawback[a].value1 != "0") {
            obj.isRefund = that.drawback[a].value1;
          }
        }
      }
      console.log(obj, "searchObj");
      that.global.axiosPostReq('/showUserOrderManage/showOrder', obj).then(res => {
        console.log(res, "searchOrderList");
        if (res.data.callStatus === 'SUCCEED') {
          that.orderList = res.data.data;
          var obj = {
            totalPage: res.data.totalPage,
            totalNumber: res.data.totalNumber,
            numberPerPage: res.data.numberPerPage
          };
          that.pageProps = obj;
        } else {
          that.$message.error('网络出错，请稍后再试！');
        }
      });
    },
    getOneOrderDetailsById: function (index, oneOrder) {
      var that = this;
      var obj = {
        orderId: oneOrder.orderId
      };
      console.log(oneOrder);
      that.global.axiosPostReq('/showUserOrderManage/queryOrderDetails', obj).then(res => {
        console.log(res, "getOneOrderDetailsById");
        if (res.data.callStatus === 'SUCCEED') {
          this.detailVisible = true;
          this.nowOrderDetails = res.data.data;
          this.receivingInfo = [];
          this.receivingInfo.push(res.data.data.receiver);
        } else {
          that.$message.error('网络出错，请稍后再试！');
        }
      });
    },
    getOrderList: function () {
      var that = this;
      var obj = {
        orderId: "",
        buyerInfo: "",
        state: "",
        orderCTime: "",
        orderETime: "",
        isRefund: ""
      };
      that.global.axiosPostReq('/showUserOrderManage/showOrder').then(res => {
        console.log(res, "getOrderList");
        if (res.data.callStatus === 'SUCCEED') {
          that.orderList = res.data.data;
          var obj = {
            totalPage: res.data.totalPage,
            totalNumber: res.data.totalNumber,
            numberPerPage: res.data.numberPerPage
          };
          that.pageProps = obj;
        } else {
          that.$message.error('网络出错，请稍后再试！');
        }
      });
    },
    //详情
    handleDetail(index, row) {
      var that = this;
      this.detailVisible = true;
      that.getOneOrderDetailsById(row.orderId);
    },
    //关闭交易
    handleClose(index, row) {
      var that = this;
      that.$confirm('确认关闭交易吗？').then(_ => {
        var obj = {};
        obj.orderId = row.orderId;
        obj.flagBit = "0";
        that.global.axiosPostReq('/showUserOrderManage/closeTrading', obj).then(res => {
          if (res.data.callStatus === 'SUCCEED') {
            that.orderList[index].state = "0";
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        });
      }).catch(_ => {});
    },
    //确认订单
    handleSure(index, row) {
      var that = this;
      that.$confirm('该订单的款已到账？').then(_ => {
        var obj = {};
        obj.orderId = row.orderId;
        obj.flagBit = "5";
        that.global.axiosPostReq('/showUserOrderManage/closeTrading', obj).then(res => {
          if (res.data.callStatus === 'SUCCEED') {
            that.orderList[index].state = "5";
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        });
      }).catch(_ => {});
    },
    //退款处理
    handleDrawback(index, row) {
      this.refundVisible = true;
    },
    //仓库发货
    handleDelivery(index, row) {
      var that = this;
      that.deliveryVisible = true;
      that.faHuoOrder = row;
      that.fahuoIndex = index;
    },
    reduceCount(index, item) {
      if (item.checked && this.orderInfo.goodsInfo[index].count !== 1) {
        this.orderInfo.goodsInfo[index].count -= 1;
      }
    },
    addCount(index, item) {
      if (item.checked && this.orderInfo.goodsInfo[index].count < this.orderInfo.goodsInfo[index].goodsNum) {
        this.orderInfo.goodsInfo[index].count += 1;
      }
    },
    goToBackMoney: function () {}
  }
});

/***/ }),

/***/ 531:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(292)(true);
// imports


// module
exports.push([module.i, "#inputCenter input{text-align:center}", "", {"version":3,"sources":["/Users/daifeili/yayi-web/src/components/admin/tradeManner/order.vue"],"names":[],"mappings":"AACA,mBACE,iBAAmB,CACpB","file":"order.vue","sourcesContent":["\n#inputCenter input{\n  text-align: center;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 532:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(292)(true);
// imports


// module
exports.push([module.i, ".el-table th>.cell[data-v-49faeb30]{text-align:center}.fl[data-v-49faeb30]{float:left}.clearfix[data-v-49faeb30]{zoom:1}.clearfix[data-v-49faeb30]:after{content:\"\";clear:both;display:block}.t_input_width[data-v-49faeb30]{width:300px}.t_select_width[data-v-49faeb30]{width:220px}.t_data_width[data-v-49faeb30]{width:400px}.detail_h3[data-v-49faeb30]{margin-bottom:16px}.detail_h4[data-v-49faeb30]{border-bottom:1px solid #ccc;margin-bottom:8px;padding-bottom:4px}.order_header[data-v-49faeb30]{background:#eee;line-height:40px}.order_box[data-v-49faeb30]{position:relative;border:1px solid #eee}.order_content[data-v-49faeb30]{width:70%;padding:20px 0;border-right:1px solid #eee;border-top:1px solid #eee;box-sizing:border-box}.order_sum[data-v-49faeb30]{position:absolute;right:0;top:-1px;width:30%;border-left:none;text-align:center;box-sizing:border-box}.order_content[data-v-49faeb30]:first-of-type{border-top:none}.order_h[data-v-49faeb30]{line-height:31px}.img_list[data-v-49faeb30]{text-align:center;margin-left:18px;border:1px solid #ccc;padding-left:6px}.goods_common[data-v-49faeb30]{height:80px;line-height:80px;text-align:center}.i_col_red[data-v-49faeb30]{color:red;font-style:normal}.margin_l_30[data-v-49faeb30]{margin-left:30px}.pay_info[data-v-49faeb30]{padding-bottom:30px}.pay_info li[data-v-49faeb30]{height:40px;line-height:40px}.seller_remark[data-v-49faeb30]{height:120px;padding-top:20px;border-top:1px solid #666}.remark_content[data-v-49faeb30]{padding-left:60px}.refund_info[data-v-49faeb30]{padding-top:20px;border-top:1px solid #666}.refund_tb[data-v-49faeb30]{width:100%;border-collapse:collapse;border:none;margin-top:20px}.refund_tb tr[data-v-49faeb30]{width:100%;height:46px;border:1px solid #ccc}.bgc[data-v-49faeb30]{background:#eee}.refund_tb td[data-v-49faeb30]{text-align:center;padding:4px 2px;border:1px solid #ccc}.icon_i_l[data-v-49faeb30]{font-style:normal;font-size:20px;padding-right:12px;cursor:pointer}.icon_i_r[data-v-49faeb30]{font-style:normal;font-size:20px;padding-left:12px;cursor:pointer}.i_disabled[data-v-49faeb30]{color:#ccc;cursor:default}.btn_[data-v-49faeb30]{margin-left:154px}.btn_box[data-v-49faeb30]{width:260px;margin:20px auto}._btn[data-v-49faeb30]{width:120px}", "", {"version":3,"sources":["/Users/daifeili/yayi-web/src/components/admin/tradeManner/order.vue"],"names":[],"mappings":"AACA,oCACE,iBAAmB,CACpB,AACD,qBACC,UAAW,CACX,AACD,2BACC,MAAO,CACP,AACD,iCACC,WAAW,AACX,WAAW,AACX,aAAc,CACd,AACD,gCACC,WAAY,CACZ,AACD,iCACC,WAAY,CACZ,AACD,+BACC,WAAY,CACZ,AACD,4BACE,kBAAmB,CACpB,AACD,4BACE,6BAA6B,AAC7B,kBAAkB,AAClB,kBAAmB,CACpB,AAED,+BACE,gBAAiB,AAEjB,gBAAkB,CACnB,AACD,4BACE,kBAAmB,AACnB,qBAAuB,CACxB,AACD,gCACE,UAAW,AACX,eAAgB,AAChB,4BAA6B,AAC7B,0BAA0B,AAC1B,qBAAsB,CACvB,AACD,4BACE,kBAAmB,AACnB,QAAS,AACT,SAAU,AACV,UAAW,AACX,iBAAkB,AAClB,kBAAmB,AACnB,qBAAsB,CACvB,AACD,8CACE,eAAiB,CAClB,AACD,0BAEE,gBAAkB,CACnB,AACD,2BACE,kBAAmB,AACnB,iBAAkB,AAClB,sBAAuB,AACvB,gBAAkB,CACnB,AACD,+BACE,YAAa,AACb,iBAAkB,AAClB,iBAAmB,CACpB,AACD,4BACE,UAAW,AACX,iBAAmB,CACpB,AACD,8BACE,gBAAkB,CACnB,AAED,2BACE,mBAAqB,CACtB,AACD,8BACE,YAAa,AACb,gBAAkB,CACnB,AAED,gCACE,aAAc,AACd,iBAAkB,AAClB,yBAA2B,CAC5B,AACD,iCACE,iBAAmB,CACpB,AAED,8BACE,iBAAkB,AAClB,yBAA2B,CAC5B,AACD,4BACE,WAAY,AACZ,yBAA0B,AAC1B,YAAa,AACb,eAAiB,CAClB,AACD,+BACE,WAAY,AACZ,YAAa,AACb,qBAAuB,CACxB,AACD,sBACE,eAAiB,CAClB,AACD,+BACE,kBAAmB,AACnB,gBAAiB,AACjB,qBAAuB,CACxB,AACD,2BACE,kBAAkB,AAClB,eAAe,AACf,mBAAmB,AACnB,cAAgB,CACjB,AACD,2BACE,kBAAkB,AAClB,eAAe,AACf,kBAAkB,AAClB,cAAgB,CACjB,AACD,6BACE,WAAY,AACZ,cAAgB,CACjB,AAGD,uBACE,iBAAmB,CACpB,AACD,0BACE,YAAa,AACb,gBAAkB,CACnB,AACD,uBACE,WAAa,CACd","file":"order.vue","sourcesContent":["\n.el-table th>.cell[data-v-49faeb30]{\n  text-align: center;\n}\n.fl[data-v-49faeb30]{\n\tfloat:left;\n}\n.clearfix[data-v-49faeb30]{\n\tzoom:1;\n}\n.clearfix[data-v-49faeb30]:after{\n\tcontent:\"\";\n\tclear:both;\n\tdisplay:block;\n}\n.t_input_width[data-v-49faeb30]{\n\twidth:300px;\n}\n.t_select_width[data-v-49faeb30]{\n\twidth:220px;\n}\n.t_data_width[data-v-49faeb30]{\n\twidth:400px;\n}\n.detail_h3[data-v-49faeb30]{\n  margin-bottom:16px;\n}\n.detail_h4[data-v-49faeb30]{\n  border-bottom:1px solid #ccc;\n  margin-bottom:8px;\n  padding-bottom:4px;\n}\n/*订单信息*/\n.order_header[data-v-49faeb30]{\n  background: #eee;\n  /*height: 40px;*/\n  line-height: 40px;\n}\n.order_box[data-v-49faeb30]{\n  position: relative;\n  border: 1px solid #eee;\n}\n.order_content[data-v-49faeb30]{\n  width: 70%;\n  padding: 20px 0;\n  border-right: 1px solid #eee;\n  border-top:1px solid #eee;\n  box-sizing:border-box;\n}\n.order_sum[data-v-49faeb30]{\n  position: absolute;\n  right: 0;\n  top: -1px;\n  width: 30%;\n  border-left: none;\n  text-align: center;\n  box-sizing:border-box;\n}\n.order_content[data-v-49faeb30]:nth-of-type(1){\n  border-top: none;\n}\n.order_h[data-v-49faeb30]{\n  /*padding-top: 18px;*/\n  line-height: 31px;\n}\n.img_list[data-v-49faeb30]{\n  text-align: center;\n  margin-left: 18px;\n  border: 1px solid #ccc;\n  padding-left: 6px;\n}\n.goods_common[data-v-49faeb30]{\n  height: 80px;\n  line-height: 80px;\n  text-align: center;\n}\n.i_col_red[data-v-49faeb30]{\n  color: red;\n  font-style: normal;\n}\n.margin_l_30[data-v-49faeb30]{\n  margin-left: 30px;\n}\n/*支付方式*/\n.pay_info[data-v-49faeb30]{\n  padding-bottom: 30px;\n}\n.pay_info li[data-v-49faeb30]{\n  height: 40px;\n  line-height: 40px;\n}\n/*卖家备注*/\n.seller_remark[data-v-49faeb30]{\n  height: 120px;\n  padding-top: 20px;\n  border-top: 1px solid #666;\n}\n.remark_content[data-v-49faeb30]{\n  padding-left: 60px;\n}\n/*退款信息*/\n.refund_info[data-v-49faeb30]{\n  padding-top: 20px;\n  border-top: 1px solid #666;\n}\n.refund_tb[data-v-49faeb30]{\n  width: 100%;\n  border-collapse: collapse;/* 边框合并属性  */\n  border: none;\n  margin-top: 20px;\n}\n.refund_tb tr[data-v-49faeb30]{\n  width: 100%;\n  height: 46px;\n  border: 1px solid #ccc;\n}\n.bgc[data-v-49faeb30]{\n  background: #eee;\n}\n.refund_tb td[data-v-49faeb30]{\n  text-align: center;\n  padding: 4px 2px;\n  border: 1px solid #ccc;\n}\n.icon_i_l[data-v-49faeb30]{\n  font-style:normal;\n  font-size:20px;\n  padding-right:12px;\n  cursor: pointer;\n}\n.icon_i_r[data-v-49faeb30]{\n  font-style:normal;\n  font-size:20px;\n  padding-left:12px;\n  cursor: pointer;\n}\n.i_disabled[data-v-49faeb30]{\n  color: #ccc;\n  cursor: default;\n}\n\n/* 仓库发货 */\n.btn_[data-v-49faeb30]{\n  margin-left: 154px;\n}\n.btn_box[data-v-49faeb30]{\n  width: 260px;\n  margin: 20px auto;\n}\n._btn[data-v-49faeb30]{\n  width: 120px;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 667:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(531);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(293)("377deb3f", content, true);

/***/ }),

/***/ 668:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(532);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(293)("ec9259da", content, true);

/***/ }),

/***/ 806:
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
  }, [_c('el-breadcrumb-item', [_c('b', [_vm._v("交易管理")])]), _vm._v(" "), _c('el-breadcrumb-item', [_vm._v("订单管理")])], 1)], 1), _vm._v(" "), _c('el-col', {
    staticClass: "warp-main"
  }, [_c('el-form', {
    staticClass: "clearfix",
    attrs: {
      "label-width": "80px"
    }
  }, [_c('el-form-item', {
    staticClass: "fl t_input_width",
    attrs: {
      "label": "订单编号"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.orderCode),
      callback: function($$v) {
        _vm.orderCode = $$v
      },
      expression: "orderCode"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    staticClass: "fl t_input_width",
    attrs: {
      "label": "买家信息"
    }
  }, [_c('el-input', {
    attrs: {
      "placeholder": "输入收件人姓名或手机号"
    },
    model: {
      value: (_vm.buyerInfo),
      callback: function($$v) {
        _vm.buyerInfo = $$v
      },
      expression: "buyerInfo"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    staticClass: "fl",
    attrs: {
      "label": "订单状态"
    }
  }, [_c('el-select', {
    staticClass: "t_select_width",
    attrs: {
      "placeholder": "全部"
    },
    model: {
      value: (_vm.value),
      callback: function($$v) {
        _vm.value = $$v
      },
      expression: "value"
    }
  }, _vm._l((_vm.state), function(item) {
    return _c('el-option', {
      key: item.value,
      attrs: {
        "label": item.label,
        "value": item.value
      }
    })
  }))], 1), _vm._v(" "), _c('el-form-item', {
    staticClass: "fl",
    attrs: {
      "label": "是否退款"
    }
  }, [_c('el-select', {
    staticClass: "fl t_select_width",
    model: {
      value: (_vm.value1),
      callback: function($$v) {
        _vm.value1 = $$v
      },
      expression: "value1"
    }
  }, _vm._l((_vm.drawback), function(item) {
    return _c('el-option', {
      key: item.value1,
      attrs: {
        "label": item.label1,
        "value": item.value1
      }
    })
  }))], 1), _vm._v(" "), _c('el-form-item', {
    staticClass: "fl",
    staticStyle: {
      "width": "300px",
      "margin-right": "12px"
    },
    attrs: {
      "label": "下单时间"
    }
  }, [_c('el-date-picker', {
    attrs: {
      "type": "daterange",
      "placeholder": "选择时间范围"
    },
    model: {
      value: (_vm.value3),
      callback: function($$v) {
        _vm.value3 = $$v
      },
      expression: "value3"
    }
  })], 1), _vm._v(" "), _c('el-button', {
    staticClass: "fl",
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.search()
      }
    }
  }, [_vm._v("查询")])], 1), _vm._v(" "), _c('el-table', {
    attrs: {
      "data": _vm.orderList,
      "border": ""
    }
  }, [_c('el-table-column', {
    attrs: {
      "prop": "orderId",
      "label": "订单编号",
      "width": "180",
      "align": "center"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "totalFee",
      "label": "总价（元）",
      "width": "120",
      "align": "center"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "qbDed",
      "label": "乾币抵扣（元）",
      "width": "140",
      "align": "center"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "actualPay",
      "label": "实际付款（元）",
      "width": "140",
      "align": "center"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "phone",
      "label": "买家信息",
      "width": "120",
      "align": "center"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "created",
      "label": "下单时间",
      "min-width": "120",
      "align": "center"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('span', [_vm._v(_vm._s(scope.row.created))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "state",
      "label": "订单状态",
      "min-width": "120",
      "align": "center"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [(scope.row.state == '1') ? _c('span', [_vm._v("等待买家付款")]) : _vm._e(), _vm._v(" "), (scope.row.state == '2') ? _c('span', [_vm._v("买家已付款")]) : _vm._e(), _vm._v(" "), (scope.row.state == '5') ? _c('span', [_vm._v("订单已确认")]) : _vm._e(), _vm._v(" "), (scope.row.state == '3') ? _c('span', [_vm._v("卖家已发货")]) : _vm._e(), _vm._v(" "), (scope.row.state == '4') ? _c('span', [_vm._v("交易成功")]) : _vm._e(), _vm._v(" "), (scope.row.state == '0') ? _c('span', [_vm._v("交易关闭")]) : _vm._e()]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "shippingName",
      "label": "物流信息",
      "min-width": "150",
      "align": "center"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('span', [_vm._v(_vm._s(scope.row.shippingName))]), _c('br'), _vm._v(" "), _c('span', [_vm._v(_vm._s(scope.row.shippingCode))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "refund",
      "label": "是否退款",
      "min-width": "100",
      "align": "center"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [(scope.row.refund == '0') ? _c('span', [_vm._v("否")]) : _vm._e(), _vm._v(" "), (scope.row.refund == '1') ? _c('span', [_vm._v("是")]) : _vm._e()]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "handle",
      "label": "操作",
      "min-width": "180",
      "align": "center"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-button', {
          attrs: {
            "size": "mini",
            "type": "info"
          },
          on: {
            "click": function($event) {
              _vm.getOneOrderDetailsById(scope.$index, scope.row)
            }
          }
        }, [_vm._v("详情")]), _vm._v(" "), _c('el-button', {
          directives: [{
            name: "show",
            rawName: "v-show",
            value: (scope.row.state != 0 && scope.row.state != 4),
            expression: "scope.row.state!=0&&scope.row.state!=4"
          }],
          attrs: {
            "size": "mini"
          },
          on: {
            "click": function($event) {
              _vm.handleClose(scope.$index, scope.row)
            }
          }
        }, [_vm._v("关闭交易")]), _vm._v(" "), _c('el-button', {
          directives: [{
            name: "show",
            rawName: "v-show",
            value: (scope.row.state === "2"),
            expression: "scope.row.state === \"2\""
          }],
          attrs: {
            "size": "mini",
            "type": "success"
          },
          on: {
            "click": function($event) {
              _vm.handleSure(scope.$index, scope.row)
            }
          }
        }, [_vm._v("确认订单")]), _vm._v(" "), _c('el-button', {
          directives: [{
            name: "show",
            rawName: "v-show",
            value: (scope.row.state >= 2 && scope.row.state <= 5),
            expression: "scope.row.state>=2&&scope.row.state<=5"
          }],
          attrs: {
            "size": "mini",
            "type": "danger"
          },
          on: {
            "click": function($event) {
              _vm.handleDrawback(scope.$index, scope.row)
            }
          }
        }, [_vm._v("退款处理")]), _vm._v(" "), _c('el-button', {
          directives: [{
            name: "show",
            rawName: "v-show",
            value: (scope.row.state === "5"),
            expression: "scope.row.state === \"5\""
          }],
          attrs: {
            "size": "mini",
            "type": "primary"
          },
          on: {
            "click": function($event) {
              _vm.handleDelivery(scope.$index, scope.row)
            }
          }
        }, [_vm._v("仓库发货")])]
      }
    }])
  })], 1), _vm._v(" "), (_vm.pageProps) ? _c('paging', {
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
  }) : _vm._e(), _vm._v(" "), (_vm.nowOrderDetails) ? _c('el-dialog', {
    attrs: {
      "title": "订单详情",
      "size": "small",
      "close-on-click-modal": true
    },
    model: {
      value: (_vm.detailVisible),
      callback: function($$v) {
        _vm.detailVisible = $$v
      },
      expression: "detailVisible"
    }
  }, [_c('h3', {
    staticClass: "detail_h3"
  }, [_vm._v("订单状态:"), _c('span', {
    staticStyle: {
      "padding-left": "20px"
    }
  }, [_vm._v(_vm._s(_vm._f("frisco")(_vm.nowOrderDetails.state)))])]), _vm._v(" "), _c('h4', {
    staticClass: "detail_h4"
  }, [_vm._v("收货信息")]), _vm._v(" "), [_c('el-table', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "data": _vm.receivingInfo
    }
  }, [_c('el-table-column', {
    attrs: {
      "prop": "userId",
      "label": "用户编号",
      "span": 3,
      "align": "center"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "receiverName",
      "label": "收货人",
      "span": 3,
      "align": "center"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "所在地区",
      "span": 3,
      "align": "center"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('span', [_vm._v(_vm._s(scope.row.province) + " ")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(scope.row.city) + " ")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(scope.row.county) + " ")])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "receiverDetail",
      "label": "详细地址",
      "width": "500"
    }
  })], 1)], _vm._v(" "), _c('h4', {
    staticClass: "detail_h4"
  }, [_vm._v("订单信息")]), _vm._v(" "), _c('el-row', {
    staticClass: "order_header"
  }, [_c('el-col', {
    attrs: {
      "span": 8,
      "align": "center"
    }
  }, [(_vm.nowOrderDetails.created) ? _c('span', [_vm._v("下单时间：" + _vm._s(_vm.nowOrderDetails.created))]) : _vm._e(), _c('div', {
    staticClass: "grid-content bg-purple"
  })]), _vm._v(" "), _c('el-col', {
    staticStyle: {
      "overflow": "hidden"
    },
    attrs: {
      "span": 8,
      "align": "center"
    }
  }, [_vm._v("订单号：" + _vm._s(_vm.nowOrderDetails.orderId)), _c('div', {
    staticClass: "grid-content bg-purple-light"
  })]), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 8,
      "align": "center"
    }
  }, [(_vm.nowOrderDetails.endTime) ? _c('span', [_vm._v("签收时间：" + _vm._s(_vm.nowOrderDetails.endTime))]) : _vm._e(), _c('div', {
    staticClass: "grid-content bg-purple"
  })])], 1), _vm._v(" "), _c('div', {
    staticClass: "order_header"
  }, [_c('el-col', {
    attrs: {
      "span": 3,
      "align": "center"
    }
  }, [_c('div', {
    staticClass: "grid-content bg-purple"
  }, [_vm._v(" ")])]), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 3,
      "align": "center"
    }
  }, [_vm._v("商品"), _c('div', {
    staticClass: "grid-content bg-purple"
  })]), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 4,
      "align": "center"
    }
  }, [_vm._v("SKU代码"), _c('div', {
    staticClass: "grid-content bg-purple"
  })]), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 3,
      "align": "center"
    }
  }, [_vm._v("单价"), _c('div', {
    staticClass: "grid-content bg-purple"
  })]), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 4,
      "align": "center"
    }
  }, [_vm._v("数量"), _c('div', {
    staticClass: "grid-content bg-purple"
  })]), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 7
    }
  }, [_c('div', {
    staticClass: "grid-content bg-purple"
  })])], 1), _vm._v(" "), _c('div', {
    staticClass: "order_box clearfix"
  }, [_vm._l((_vm.nowOrderDetails.orderitemList), function(item) {
    return _c('div', {
      staticClass: "order_content fl"
    }, [_c('el-col', {
      attrs: {
        "span": 4,
        "align": "center"
      }
    }, [_c('div', {
      staticClass: "grid-content bg-purple"
    }, [_c('img', {
      staticStyle: {
        "width": "50px"
      },
      attrs: {
        "src": item.picPath,
        "alt": "图片无法显示"
      }
    })])]), _vm._v(" "), _c('el-col', {
      attrs: {
        "span": 5,
        "align": "center"
      }
    }, [_vm._v(_vm._s(item.price)), _c('div', {
      staticClass: "grid-content bg-purple"
    })]), _vm._v(" "), _c('el-col', {
      attrs: {
        "span": 5,
        "align": "center"
      }
    }, [_vm._v(_vm._s(item.itemSKU)), _c('div', {
      staticClass: "grid-content bg-purple"
    })]), _vm._v(" "), _c('el-col', {
      attrs: {
        "span": 5,
        "align": "center"
      }
    }, [_vm._v(_vm._s(item.price)), _c('div', {
      staticClass: "grid-content bg-purple"
    })]), _vm._v(" "), _c('el-col', {
      attrs: {
        "span": 5,
        "align": "center"
      }
    }, [_vm._v(_vm._s(item.num)), _c('div', {
      staticClass: "grid-content bg-purple"
    })])], 1)
  }), _vm._v(" "), _c('div', {
    staticClass: "order_sum fl"
  }, [_c('div', {
    staticClass: "order_h"
  }, [_vm._v(_vm._s('￥' + _vm.nowOrderDetails.actualPay))]), _vm._v(" "), _c('div', {
    staticClass: "order_h"
  }, [_vm._v(_vm._s('（含运费: ' + _vm.nowOrderDetails.postFee + '）'))]), _vm._v(" "), _c('div', {
    staticClass: "order_h"
  }, [_vm._v(_vm._s('（乾币已抵扣: ' + _vm.nowOrderDetails.qbDed + '）'))])])], 2), _vm._v(" "), _c('div', {
    staticClass: "pay_info clearfix"
  }, [_c('ul', {
    staticClass: "fl",
    staticStyle: {
      "width": "130px"
    }
  }, [_c('li', [_vm._v("支付方式")]), _vm._v(" "), _c('li', [_vm._v("发票")]), _vm._v(" "), _c('li', [_vm._v("产品注册证")]), _vm._v(" "), _c('li', [_vm._v("订单留言")])]), _vm._v(" "), _c('ul', {
    staticClass: "fl"
  }, [_c('li', [_vm._v(_vm._s(_vm.nowOrderDetails.payType))]), _vm._v(" "), _c('li', [_c('div', [_vm._v("不申请发票"), _c('i', {
    staticClass: "i_col_red margin_l_30"
  }, [_vm._v("申请发票")]), _c('i', {
    staticClass: "i_col_red margin_l_30"
  }, [_vm._v("发票抬头：xxxxxx")])])]), _vm._v(" "), _c('li', [_c('div', [_vm._v("不需要产品认证"), _c('i', {
    staticClass: "i_col_red margin_l_30"
  }, [_vm._v("不需要产品认证")])])]), _vm._v(" "), (!_vm.nowOrderDetails.buyerMessage) ? _c('li', [_vm._v("留言为空")]) : _c('li', [_vm._v(_vm._s(_vm.nowOrderDetails.buyerMessage))])])]), _vm._v(" "), _c('div', {
    staticClass: "refund_info"
  }, [_c('div', [_vm._v("退款信息")]), _vm._v(" "), _c('table', {
    staticClass: "refund_tb"
  }, [_c('tr', {
    staticClass: "bgc"
  }, [_c('td', {
    staticStyle: {
      "text-align": "left"
    },
    attrs: {
      "colspan": "7"
    }
  }, [_c('span', {
    staticStyle: {
      "padding-left": "20px"
    }
  }, [_vm._v("实付款：" + _vm._s('￥' + _vm.orderInfo.totalPrice.toFixed(2)))]), _c('span', {
    staticStyle: {
      "padding-left": "100px"
    }
  }, [_vm._v("运费：包邮")]), _c('span', {
    staticStyle: {
      "padding-left": "100px"
    }
  }, [_vm._v("乾币抵扣：" + _vm._s('￥' + _vm.orderInfo.deductible.toFixed(2)))])])]), _vm._v(" "), _c('tr', {
    staticClass: "bgc"
  }, [_c('td', [_vm._v("sku代码")]), _vm._v(" "), _c('td', [_vm._v("商品名称+属性")]), _vm._v(" "), _c('td', [_vm._v("价格*数量")]), _vm._v(" "), _c('td', [_vm._v("退货数量")]), _vm._v(" "), _c('td', [_vm._v("退款金额")]), _vm._v(" "), _c('td', [_vm._v("退回的乾币数")]), _vm._v(" "), _c('td', [_vm._v("扣除的乾币数")])]), _vm._v(" "), _vm._l((_vm.orderInfo.goodsInfo), function(item, index) {
    return _c('tr', {
      key: index
    }, [_c('td'), _vm._v(" "), _c('td', [_vm._v(_vm._s(item.goodsName))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(item.price + '*' + item.goodsNum))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(item.backNo > item.goodsNum ? "" : item.count))]), _vm._v(" "), (index == 0) ? _c('td', {
      attrs: {
        "rowspan": _vm.orderInfo.goodsInfo.length
      }
    }, [_vm._v(_vm._s(_vm.orderInfo.refundAmt))]) : _vm._e(), _vm._v(" "), (index == 0) ? _c('td', {
      attrs: {
        "rowspan": _vm.orderInfo.goodsInfo.length
      }
    }, [_vm._v(_vm._s(_vm.orderInfo.untread))]) : _vm._e(), _vm._v(" "), (index == 0) ? _c('td', {
      attrs: {
        "rowspan": _vm.orderInfo.goodsInfo.length
      }
    }, [_vm._v(_vm._s(_vm.orderInfo.outCoins))]) : _vm._e()])
  })], 2)]), _vm._v(" "), _c('div', {
    staticClass: "dialog-footer",
    slot: "footer"
  }, [_c('el-button', {
    on: {
      "click": function($event) {
        _vm.detailVisible = false
      }
    }
  }, [_vm._v("关闭")])], 1)], 2) : _vm._e(), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "发货",
      "size": "tiny",
      "close-on-click-modal": true
    },
    model: {
      value: (_vm.deliveryVisible),
      callback: function($$v) {
        _vm.deliveryVisible = $$v
      },
      expression: "deliveryVisible"
    }
  }, [_c('div', {
    staticStyle: {
      "height": "40px",
      "padding-left": "60px"
    }
  }, [_c('i', {
    staticClass: "i_col_red"
  }, [_vm._v("*")]), _vm._v(" "), _c('span', [_vm._v("物流公司：")]), _vm._v(" "), [_c('el-select', {
    attrs: {
      "size": "small"
    },
    model: {
      value: (_vm.wuliu),
      callback: function($$v) {
        _vm.wuliu = $$v
      },
      expression: "wuliu"
    }
  })]], 2), _vm._v(" "), _c('div', {
    staticStyle: {
      "height": "40px",
      "padding-left": "60px"
    }
  }, [_c('i', {
    staticClass: "i_col_red"
  }, [_vm._v("*")]), _vm._v(" "), _c('span', [_vm._v("快递单号：")]), _vm._v(" "), [_c('el-input', {
    staticStyle: {
      "width": "215px"
    },
    attrs: {
      "size": "small"
    },
    model: {
      value: (_vm.wuLiuBianHao),
      callback: function($$v) {
        _vm.wuLiuBianHao = $$v
      },
      expression: "wuLiuBianHao"
    }
  })]], 2), _vm._v(" "), _c('div', [_c('el-button', {
    staticClass: "btn_",
    on: {
      "click": function($event) {
        _vm.sureFaHuo()
      }
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
        _vm.deliveryVisible = false
      }
    }
  }, [_vm._v("取消")])], 1)]), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "退款处理",
      "close-on-click-modal": true
    },
    model: {
      value: (_vm.refundVisible),
      callback: function($$v) {
        _vm.refundVisible = $$v
      },
      expression: "refundVisible"
    }
  }, [_c('table', {
    staticClass: "refund_tb"
  }, [_c('tr', {
    staticClass: "bgc"
  }, [_c('td', {
    staticStyle: {
      "text-align": "left"
    },
    attrs: {
      "colspan": "7"
    }
  }, [_c('span', {
    staticStyle: {
      "padding-left": "20px"
    }
  }, [_vm._v("订单编号：" + _vm._s(_vm.orderInfo.orderNo))]), _c('span', {
    staticStyle: {
      "padding-left": "100px"
    }
  }, [_vm._v("乾币抵扣：" + _vm._s(_vm.orderInfo.deductible))])])]), _vm._v(" "), _c('tr', {
    staticClass: "bgc"
  }, [_c('td', [_vm._v("是否退款")]), _vm._v(" "), _c('td', [_vm._v("商品名称+属性")]), _vm._v(" "), _c('td', [_vm._v("价格*数量")]), _vm._v(" "), _c('td', [_vm._v("退货数量")]), _vm._v(" "), _c('td', [_vm._v("退款金额")]), _vm._v(" "), _c('td', [_vm._v("退回乾币数")]), _vm._v(" "), _c('td', [_vm._v("扣除乾币数")])]), _vm._v(" "), _vm._l((_vm.orderInfo.goodsInfo), function(item, index) {
    return _c('tr', {
      key: index,
      staticStyle: {
        "height": "46px"
      }
    }, [_c('td', [
      [_c('el-checkbox', {
        attrs: {
          "size": "small"
        },
        model: {
          value: (item.checked),
          callback: function($$v) {
            item.checked = $$v
          },
          expression: "item.checked"
        }
      })]
    ], 2), _vm._v(" "), _c('td', [_vm._v(_vm._s(item.goodsName))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(item.price + '*' + item.goodsNum))]), _vm._v(" "), _c('td', {
      staticStyle: {
        "width": "200px",
        "position": "relative"
      }
    }, [_c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (item.goodsNum),
        expression: "item.goodsNum"
      }],
      staticStyle: {
        "position": "absolute",
        "top": "4px"
      },
      attrs: {
        "id": "inputCenter"
      }
    }, [_c('i', {
      staticClass: "icon_i_l",
      class: {
        i_disabled: !item.checked
      },
      staticStyle: {
        "position": "absolute",
        "left": "30px",
        "top": "2px"
      },
      on: {
        "click": function($event) {
          _vm.reduceCount(index, item)
        }
      }
    }, [_vm._v("-")]), _vm._v(" "), _c('el-input', {
      staticStyle: {
        "width": "88px",
        "position": "absolute",
        "left": "60px"
      },
      attrs: {
        "disabled": !item.checked
      },
      model: {
        value: (item.count),
        callback: function($$v) {
          item.count = $$v
        },
        expression: "item.count"
      }
    }), _vm._v(" "), _c('i', {
      staticClass: "icon_i_r",
      class: {
        i_disabled: !item.checked
      },
      staticStyle: {
        "position": "absolute",
        "left": "150px",
        "top": "2px"
      },
      on: {
        "click": function($event) {
          _vm.addCount(index, item)
        }
      }
    }, [_vm._v("+")])], 1)]), _vm._v(" "), (index == 0) ? _c('td', {
      attrs: {
        "rowspan": _vm.orderInfo.goodsInfo.length
      }
    }, [_vm._v(_vm._s(_vm.orderInfo.refundAmt))]) : _vm._e(), _vm._v(" "), (index == 0) ? _c('td', {
      attrs: {
        "rowspan": _vm.orderInfo.goodsInfo.length
      }
    }, [_vm._v(_vm._s(_vm.orderInfo.untread))]) : _vm._e(), _vm._v(" "), (index == 0) ? _c('td', {
      attrs: {
        "rowspan": _vm.orderInfo.goodsInfo.length
      }
    }, [_vm._v(_vm._s(_vm.orderInfo.outCoins))]) : _vm._e()])
  })], 2), _vm._v(" "), _c('div', {
    staticClass: "btn_box"
  }, [_c('el-button', {
    staticClass: "_btn",
    attrs: {
      "type": "primary"
    },
    on: {
      "goToBackMoney()": function($event) {}
    }
  }, [_vm._v("保存")]), _vm._v(" "), _c('el-button', {
    staticClass: "_btn",
    on: {
      "click": function($event) {
        _vm.refundVisible = false
      }
    }
  }, [_vm._v("取消")])], 1)])], 1)], 1)
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=6.2f561e1102c916d2bd7f.js.map