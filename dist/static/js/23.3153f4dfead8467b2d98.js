webpackJsonp([23],{363:function(t,a,e){function s(t){e(732)}var n=e(4)(e(480),e(843),s,"data-v-fb2612a6",null);t.exports=n.exports},480:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e(34),n=e(112),l=e.n(n);a.default={data:function(){return{optSelect:[{value:"1",label:"单位名称"},{value:"2",label:"联系人"},{value:"3",label:"联系电话"}],pageProps:{pageNum:1,totalPage:1},sel_value:"1",selectInput:"",customerList:[],customerVisible:!1,isEdit:!1,companyName:"",companyAdd:"",linkMan:"",contact_:"",cusId:""}},components:{paging:l.a},created:function(){this.queryHandler()},methods:{selectOpt:function(t){this.sel_value=t,this.selectInput=""},pageHandler:function(t){this.pageProps.pageNum=t,this.queryHandler()},queryHandler:function(){var t,a=this;"1"==this.sel_value?t={companyName:this.selectInput,companyAdd:"",linkMan:""}:"2"==this.sel_value?t={companyName:"",companyAdd:this.selectInput,linkMan:""}:"3"==this.sel_value&&(t={companyName:"",companyAdd:"",linkMan:this.selectInput}),s.a.axiosPostReq("/cus/show",t).then(function(t){"SUCCEED"===t.data.callStatus&&(a.customerList=t.data.data)})},saveHandler:function(){var t=this;if(this.isEdit){var a={cusId:this.cusId,unitName:this.companyName,unitAddress:this.companyAdd,contacts:this.linkMan,contactsPhone:this.contact_};s.a.axiosPostReq("/cus/update",a).then(function(a){"SUCCEED"===a.data.callStatus&&(t.$message({message:"修改成功",type:"success"}),t.customerVisible=!1,t.queryHandler())})}else if(!this.isEdit){var e={unitName:this.companyName,unitAddress:this.companyAdd,contacts:this.linkMan,contactsPhone:this.contact_};s.a.axiosPostReq("/cus/insert",e).then(function(a){"SUCCEED"===a.data.callStatus&&(t.$message({message:"新增成功",type:"success"}),t.customerVisible=!1,t.queryHandler())})}},customerAddHandler:function(){this.customerVisible=!0,this.isEdit=!1,this.companyName="",this.companyAdd="",this.linkMan="",this.contact_=""},handleEdit:function(t,a){this.customerVisible=!0,this.isEdit=!0,this.companyName=a.unitName,this.companyAdd=a.unitAddress,this.linkMan=a.contacts,this.contact_=a.contactsPhone,this.cusId=a.cusId},handleDel:function(t,a){var e=this;this.$confirm("确定删除吗？").then(function(t){s.a.axiosPostReq("/cus/delete",{cusId:a.cusId}).then(function(t){"SUCCEED"===t.data.callStatus?(e.$message({message:"删除成功",type:"success"}),e.queryHandler()):e.$message({message:"删除失败",type:"success"})})}).catch(function(t){})}}}},605:function(t,a,e){a=t.exports=e(347)(!0),a.push([t.i,'.fl[data-v-fb2612a6]{float:left}.clearfix[data-v-fb2612a6]{zoom:1}.clearfix[data-v-fb2612a6]:after{content:"";clear:both;display:block}.t_input_w[data-v-fb2612a6]{width:320px!important}.t_select_width[data-v-fb2612a6]{width:110px}.add_btn[data-v-fb2612a6]{float:right;margin:20px 118px 20px 0}.i_col_red[data-v-fb2612a6]{color:red;font-style:normal}.customer_wrap li[data-v-fb2612a6]{height:40px;line-height:40px}.span_nav[data-v-fb2612a6]{display:inline-block;width:84px;padding-right:6px}.btn_[data-v-fb2612a6]{margin-left:92px}',"",{version:3,sources:["/Users/daifeili/yayi-web/src/components/admin/salesManner/customerManner.vue"],names:[],mappings:"AACA,qBACE,UAAW,CACZ,AACD,2BACE,MAAO,CACR,AACD,iCACE,WAAW,AACX,WAAW,AACX,aAAc,CACf,AACD,4BACI,qBAAsB,CACzB,AACD,iCACI,WAAY,CACf,AACD,0BACE,YAAY,AACZ,wBAA0B,CAC3B,AACD,4BACG,UAAW,AACX,iBAAmB,CACrB,AACD,mCACE,YAAa,AACb,gBAAkB,CACnB,AACD,2BACE,qBAAsB,AACtB,WAAY,AACZ,iBAAmB,CACpB,AACD,uBACG,gBAAkB,CACpB",file:"customerManner.vue",sourcesContent:['\n.fl[data-v-fb2612a6]{\n\t\tfloat:left;\n}\n.clearfix[data-v-fb2612a6]{\n\t\tzoom:1;\n}\n.clearfix[data-v-fb2612a6]:after{\n\t\tcontent:"";\n\t\tclear:both;\n\t\tdisplay:block;\n}\n.t_input_w[data-v-fb2612a6]{\n    width:320px!important;\n}\n.t_select_width[data-v-fb2612a6]{\n    width:110px;\n}\n.add_btn[data-v-fb2612a6]{\n\t\tfloat:right;\n\t\tmargin: 20px 118px 20px 0;\n}\n.i_col_red[data-v-fb2612a6]{\n\t  color: red;\n\t  font-style: normal;\n}\n.customer_wrap li[data-v-fb2612a6]{\n\t\theight: 40px;\n\t\tline-height: 40px;\n}\n.span_nav[data-v-fb2612a6]{\n\t\tdisplay: inline-block;\n\t\twidth: 84px;\n\t\tpadding-right: 6px;\n}\n.btn_[data-v-fb2612a6]{\n\t  margin-left: 92px;\n}\n'],sourceRoot:""}])},732:function(t,a,e){var s=e(605);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);e(348)("600a4e57",s,!0)},843:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("el-row",{staticClass:"userListWrap"},[e("el-col",{staticClass:"warp-breadcrum",attrs:{span:24}},[e("el-breadcrumb",{attrs:{separator:"/"}},[e("el-breadcrumb-item",[e("b",[t._v("销售员管理")])]),t._v(" "),e("el-breadcrumb-item",[t._v("客户资源管理")])],1)],1),t._v(" "),e("el-col",{staticClass:"warp-main",attrs:{span:24}},[e("el-form",{staticClass:"clearfix",attrs:{inline:!0}},[e("el-input",{staticClass:"fl t_input_w",model:{value:t.selectInput,callback:function(a){t.selectInput=a},expression:"selectInput"}},[e("el-select",{staticClass:"fl t_select_width",on:{change:t.selectOpt},slot:"prepend",model:{value:t.sel_value,callback:function(a){t.sel_value=a},expression:"sel_value"}},t._l(t.optSelect,function(t){return e("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),e("el-form-item",{staticClass:"fl",staticStyle:{"margin-left":"10px"}},[e("el-button",{attrs:{type:"primary"},on:{click:t.queryHandler}},[t._v("查询")])],1)],1)],1),t._v(" "),e("el-button",{staticClass:"add_btn",attrs:{type:"primary"},on:{click:t.customerAddHandler}},[t._v("+添加新客户")]),t._v(" "),e("el-table",{attrs:{data:t.customerList,border:""}},[e("el-table-column",{attrs:{prop:"unitName",label:"单位名称",span:12,align:"center"}}),t._v(" "),e("el-table-column",{attrs:{prop:"unitAddress",label:"单位地址",span:12,align:"center"}}),t._v(" "),e("el-table-column",{attrs:{prop:"contacts",label:"联系人",span:12,align:"center"}}),t._v(" "),e("el-table-column",{attrs:{prop:"contactsPhone",label:"联系电话",span:12,align:"center"}}),t._v(" "),e("el-table-column",{attrs:{prop:"handle",label:"操作",span:12,align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-button",{attrs:{size:"small",type:"info"},on:{click:function(e){t.handleEdit(a.$index,a.row)}}},[t._v("修改")]),t._v(" "),e("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(e){t.handleDel(a.$index,a.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),e("paging",{staticStyle:{"text-align":"center","margin-top":"20px"},attrs:{childmsg:t.pageProps},on:{childSay:t.pageHandler}}),t._v(" "),e("el-dialog",{attrs:{title:t.isEdit?"修改客户信息":"添加客户信息",size:"tiny","close-on-click-modal":!0},model:{value:t.customerVisible,callback:function(a){t.customerVisible=a},expression:"customerVisible"}},[e("ul",{staticClass:"customer_wrap"},[e("li",{staticClass:"clearfix"},[e("span",{staticClass:"fl span_nav"},[e("span",{staticClass:"fr"},[e("i",{staticClass:"i_col_red"},[t._v("*")]),t._v("单位名称：")])]),t._v(" "),e("el-input",{staticClass:"fl",staticStyle:{width:"200px"},model:{value:t.companyName,callback:function(a){t.companyName=a},expression:"companyName"}})],1),t._v(" "),e("li",{staticClass:"clearfix"},[e("span",{staticClass:"fl span_nav"},[e("span",{staticClass:"fr"},[e("i",{staticClass:"i_col_red"},[t._v("*")]),t._v("单位地址：")])]),t._v(" "),e("el-input",{staticClass:"fl",staticStyle:{width:"200px"},model:{value:t.companyAdd,callback:function(a){t.companyAdd=a},expression:"companyAdd"}})],1),t._v(" "),e("li",{staticClass:"clearfix"},[e("span",{staticClass:"fl span_nav"},[e("span",{staticClass:"fr"},[e("i",{staticClass:"i_col_red"},[t._v("*")]),t._v("联系人：")])]),t._v(" "),e("el-input",{staticClass:"fl",staticStyle:{width:"200px"},model:{value:t.linkMan,callback:function(a){t.linkMan=a},expression:"linkMan"}})],1),t._v(" "),e("li",{staticClass:"clearfix"},[e("span",{staticClass:"fl span_nav"},[e("span",{staticClass:"fr"},[e("i",{staticClass:"i_col_red"},[t._v("*")]),t._v("联系电话：")])]),t._v(" "),e("el-input",{staticClass:"fl",staticStyle:{width:"200px"},model:{value:t.contact_,callback:function(a){t.contact_=a},expression:"contact_"}})],1)]),t._v(" "),e("div",{staticStyle:{"margin-top":"30px"}},[e("el-button",{staticClass:"btn_",attrs:{type:"primary"},on:{click:t.saveHandler}},[t._v("保存")])],1)])],1)},staticRenderFns:[]}}});
//# sourceMappingURL=23.3153f4dfead8467b2d98.js.map