webpackJsonp([30],{353:function(t,a,e){function r(t){e(695)}var o=e(4)(e(468),e(812),r,null,null);t.exports=o.exports},468:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default={data:function(){return{formData:{addGoodAttrName:null,addGoodAttrOneVal:null},rules1:{addGoodAttrName:{required:!0,message:"请输入属性名称",trigger:"blur"},addGoodAttrOneVal:{required:!0,message:"请输入属性值",trigger:"blur"}},bindTitle:null,addGoodAttrValues:[],searchAttrName:null,changeThisAll:null,changAttrIndex:null,attOperaType:1,wantAddAttr:{addName:null,willname:null,addAttrValues:[]},addAttrShow:[],tableData:[],showAddGoodAttr:!1,channgAttrId:null,flag1:!0}},created:function(){this.getGoodAttrList()},methods:{getGoodAttrList:function(){var t=this;t.global.axiosGetReq("/item/queryProperty").then(function(a){if("SUCCEED"===a.data.callStatus){console.log(a.data.data,"getGoodAttrList");var e=a.data.data;t.tableData=e}else t.$message.error("网络出错，请稍后再试！")},function(a){t.$message.error("网络出错，请稍后再试！")})},addGoodAttr:function(){var t=this;t.bindTitle="添加商品属性",t.showAddGoodAttr=!0,t.attOperaType=1,t.formData.addGoodAttrName=null,t.addGoodAttrValues=[],t.flag1=!1},changThisAttrVal:function(t,a,e){var r=this;a.target._value?2==r.attOperaType&&r.$confirm("确定修改该属性值吗, 是否继续?",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var o={itemPparam:a.target._value,itemSKU:e.itemSKU};r.global.axiosPostReq("/item/updatePropertyd",o).then(function(e){r.addGoodAttrValues[t].itemPparam=a.target._value,r.changeThisAll=null,r.flag1=!0})}):(this.$alert("请填写完整商品的属性值",{confirmButtonText:"确定"}),r.flag1=!1)},changeThisAttr:function(t,a){this.changeThisAll=t,this.flag1=!1,this.attOperaType=2},search:function(){var t=this,a={itemPropertyName:t.searchAttrName,token:"awfa"};t.global.axiosPostReq("/item/queryProperty",a).then(function(a){"SUCCEED"===a.data.callStatus?t.tableData=a.data.data:t.$message.error("网络出错，请稍后再试！")})},DELEONE:function(t,a){var e=this;e.$confirm("确定删除该属性吗?",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var r={itemPropertyId:a.itemPropertyId};console.log(r),e.global.axiosPostReq("/item/deleteProperty",r).then(function(a){"SUCCEED"===a.data.callStatus?(e.$message({type:"success",message:"删除成功!"}),e.tableData.splice(t,1)):e.$message.error("网络出错，请稍后再试！")})})},alertMsg:function(t){this.$alert(t,{confirmButtonText:"确定"})},changeOneAttr:function(t,a){var e=this;e.bindTitle="修改商品属性",e.formData.addGoodAttrName=a.itemPropertyName,e.addGoodAttrValues=a.itempropertydList,e.channgAttrId=a.itemPropertyId,e.changAttrIndex=t,e.attOperaType=2,e.showAddGoodAttr=!0},saveOneAttrs:function(){var t=this;if(1==t.attOperaType)if(t.flag1){var a={},e=[],r=[];for(var o in t.addGoodAttrValues)e.push(t.addGoodAttrValues[o].itemPparam),r.push({itemPparam:t.addGoodAttrValues[o].itemPparam});a.itemPparamList=e,a.itemPropertyName=t.formData.addGoodAttrName,t.global.axiosPostReq("/item/addPropertydAndPropertyName",a).then(function(e){console.log(e),"SUCCEED"===e.data.callStatus?(a.itempropertydList=r,t.tableData.push(a),t.addGoodAttrValues=[],t.formData.addGoodAttrName=null,t.showAddGoodAttr=!1):t.$message.error("网络出错，请稍后再试！")})}else this.$alert("请填写完整商品的属性名或属性值",{confirmButtonText:"确定"});if(2==t.attOperaType)if(t.flag1){var n={itemPropertyId:t.channgAttrId,itemPropertyName:t.formData.addGoodAttrName};console.log(t.tableData[t.changAttrIndex]),t.global.axiosPostReq("/item/updateProperty",n).then(function(a){"SUCCEED"===a.data.callStatus?(t.tableData[t.changAttrIndex].itemPropertyName=t.formData.addGoodAttrName,t.tableData[t.changAttrIndex].itempropertydList=t.addGoodAttrValues,t.showAddGoodAttr=!1):t.$message.error("网络出错，请稍后再试！")})}else this.$alert("请填写完整商品的属性名或属性值",{confirmButtonText:"确定"})},deleOneAttrVal:function(t,a){var e=this;2==e.attOperaType?e.$confirm("确定删除该属性值吗, 是否继续?",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var r={itemSKU:a.itemSKU};e.global.axiosPostReq("/item/deletePropertyd",r).then(function(a){"SUCCEED"===a.data.callStatus?(e.addGoodAttrValues.splice(t,1),e.changeThisAll=null):e.$message.error("网络出错，请稍后再试！")})}):(e.addGoodAttrValues.splice(t,1),e.changeThisAll=null)},addOneAttrVal:function(t){var a=this;a.$refs[t].validate(function(t){if(!t)return a.alertMsg("请填写完整商品的属性名或属性值!"),a.flag1=!1,!1;if(2==a.attOperaType){var e=!0;for(var r in a.addGoodAttrValues)a.addGoodAttrValues[r].itemPparam==a.formData.addGoodAttrOneVal&&(e="填写的属性值有重复项，请重新填写");if(1==e){var o={itemPid:a.tableData[a.changAttrIndex].itemPropertyId,itemPparam:a.formData.addGoodAttrOneVal};a.global.axiosPostReq("/item/addToPropertyd",o).then(function(t){if("SUCCEED"===t.data.callStatus){var e={};e.itemPparam=a.formData.addGoodAttrOneVal,a.addGoodAttrValues.push(e),a.formData.addGoodAttrOneVal=null,a.flag1=!0}else a.$message.error("网络出错，请稍后再试！")})}else a.alertMsg(e)}else{var e=!0;for(var n in a.addGoodAttrValues)a.addGoodAttrValues[n].itemPparam==a.formData.addGoodAttrOneVal&&(e="填写的属性值有重复项，请重新填写");if(1==e){var l={};l.itemPparam=a.formData.addGoodAttrOneVal,a.addGoodAttrValues.push(l),a.formData.addGoodAttrOneVal=null,a.flag1=!0}else a.alertMsg(e)}})}}}},568:function(t,a,e){a=t.exports=e(347)(!0),a.push([t.i,".demo-table-expand label{font-weight:700}.warp .warp-main .el-input{width:100%;padding-right:0}.warp .el-input{width:70%}","",{version:3,sources:["/Users/daifeili/yayi-web/src/components/admin/bsseInfoManner/attr.vue"],names:[],mappings:"AACA,yBACE,eAAkB,CACnB,AACD,2BACE,WAAY,AACZ,eAAmB,CACpB,AACD,gBACE,SAAW,CAEZ",file:"attr.vue",sourcesContent:["\n.demo-table-expand label {\n  font-weight: bold;\n}\n.warp  .warp-main .el-input{\n  width: 100%;\n  padding-right: 0px;\n}\n.warp .el-input{\n  width: 70%;\n  /*padding-right: 20px;*/\n}\n"],sourceRoot:""}])},695:function(t,a,e){var r=e(568);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);e(348)("849ba278",r,!0)},812:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("el-row",{staticClass:"warp"},[e("el-col",{staticClass:"warp-breadcrum",attrs:{span:24}},[e("el-breadcrumb",{attrs:{separator:"/"}},[e("el-breadcrumb-item",[e("b",[t._v("商品基础资料管理")])]),t._v(" "),e("el-breadcrumb-item",[t._v("商品属性管理")])],1)],1),t._v(" "),e("el-col",{staticClass:"warp-main",attrs:{span:24}},[e("el-col",{staticClass:"toolbar",staticStyle:{"padding-bottom":"0px"}},[e("el-form",{attrs:{inline:!0}},[e("el-form-item",[e("el-input",{attrs:{placeholder:"请输入属性名称"},model:{value:t.searchAttrName,callback:function(a){t.searchAttrName=a},expression:"searchAttrName"}})],1),t._v(" "),e("el-form-item",[e("el-button",{attrs:{type:"primary"},on:{click:function(a){t.search()}}},[t._v("查询")])],1)],1)],1),t._v(" "),e("el-col",{staticStyle:{"text-align":"right","line-height":"40px"}},[e("el-button",{attrs:{type:"text"},on:{click:function(a){t.addGoodAttr()}}},[t._v("+添加商品属性")])],1),t._v(" "),e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[e("el-table-column",{attrs:{type:"index",width:"200px",align:"center",label:"序号"}}),t._v(" "),e("el-table-column",{attrs:{prop:"itemPropertyName",align:"center",label:"属性名"}}),t._v(" "),e("el-table-column",{attrs:{prop:"itempropertydList",align:"center",label:"属性值"},scopedSlots:t._u([{key:"default",fn:function(a){return t._l(a.row.itempropertydList,function(r,o){return e("span",[t._v("\n            "+t._s(r.itemPparam)+"\n            "),o!=a.row.itempropertydList.length-1?e("span",[t._v("/")]):t._e()])})}}])}),t._v(" "),e("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-button",{attrs:{type:"text"},on:{click:function(e){t.changeOneAttr(a.$index,a.row)}}},[t._v("修改")]),t._v(" "),e("el-button",{attrs:{type:"text"},on:{click:function(e){t.DELEONE(a.$index,a.row)}}},[t._v("删除")])]}}])})],1)],1),t._v(" "),e("el-dialog",{attrs:{title:t.bindTitle,visible:t.showAddGoodAttr},on:{"update:visible":function(a){t.showAddGoodAttr=a}}},[e("el-form",{ref:"formData",staticClass:"demo-dynamic",attrs:{"label-width":"100px",model:t.formData,rules:t.rules1}},[e("el-form-item",{attrs:{prop:"addGoodAttrName",label:"属性名称："}},[e("el-input",{model:{value:t.formData.addGoodAttrName,callback:function(a){t.formData.addGoodAttrName=a},expression:"formData.addGoodAttrName"}})],1),t._v(" "),e("el-form-item",{attrs:{prop:"addGoodAttrOneVal",label:"属性值："}},[e("el-input",{model:{value:t.formData.addGoodAttrOneVal,callback:function(a){t.formData.addGoodAttrOneVal=a},expression:"formData.addGoodAttrOneVal"}}),t._v(" "),e("el-button",{on:{click:function(a){t.addOneAttrVal("formData")}}},[t._v("添加")])],1)],1),t._v(" "),e("el-table",{staticStyle:{windth:"80%"},attrs:{border:"",data:t.addGoodAttrValues}},[e("el-table-column",{attrs:{align:"center",property:"itemPparam",label:"属性值"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-input",{attrs:{minlength:5,disabled:a.$index!=t.changeThisAll,value:a.row.itemPparam},on:{blur:function(e){t.changThisAttrVal(a.$index,e,a.row)}}})]}}])}),t._v(" "),e("el-table-column",{attrs:{align:"center",label:"操作",width:"100"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-button",{attrs:{type:"text"},on:{click:function(e){t.deleOneAttrVal(a.$index,a.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),e("div",{staticClass:"dialog-footer",slot:"footer"},[e("el-button",{attrs:{type:"primary"},on:{click:function(a){t.saveOneAttrs()}}},[t._v("保存")])],1)],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=30.f7234eedce2057d15658.js.map