webpackJsonp([19],{363:function(e,t,a){function i(e){a(735),a(736)}var s=a(4)(a(490),a(850),i,"data-v-78a92ad3",null);e.exports=s.exports},490:function(e,t,a){"use strict";function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}Object.defineProperty(t,"__esModule",{value:!0});var s=(a(114),"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e});t.default={data:function(){var e,t;return t={tableData:[],cargo:{id:"",name:"",class:[],brand:""},options1:[{label:"全部",value:"1"},{label:"是",value:"2"},{label:"否",value:"3"}],options2:[{label:"全部",value:""},{label:"已上架",value:1},{label:"已下架",value:0}],list:!0,coinValue:"",stateValue:"",dialogTableVisible:!1,ruleForm:{cargoId:"",name:"",type:[],brand:"",rgAcount:"",qian:""},rules:(e={cargoId:[{required:!0,message:"请填写商品编号",trigger:"blur"}],name:[{required:!0,message:"请填写商品名称",trigger:"blur"}],type:[{required:!0,message:"请选择商品分类",trigger:"change"}],brand:[{required:!0,message:"请选择品牌名称",trigger:"change"}],rgAcount:[{required:!0,message:"请填写注册账号",trigger:"blur"}],qian:[{required:!0,message:"请选择是否乾币抵扣状态",trigger:"change"}],date1:[{type:"date",required:!0,message:"请选择日期",trigger:"change"}],date2:[{type:"date",required:!0,message:"请选择时间",trigger:"change"}]},i(e,"type",[{type:"array",required:!0,message:"请至少选择一个活动性质",trigger:"change"}]),i(e,"desc",[{required:!0,message:"请填写活动形式",trigger:"blur"}]),e),radio:"",labelPosition:"right",multipleSelection:[]},i(t,"dialogTableVisible",!1),i(t,"items",[]),i(t,"checkedItems",[]),i(t,"input_sku",""),i(t,"input_price",""),i(t,"input_percent",""),i(t,"input_coin",""),i(t,"input_stock",""),i(t,"input_enable",!1),i(t,"details",{itemId:"",itemBrand:{itemBrandName:""},itemDetail:{video:""}}),i(t,"propertyList",[]),i(t,"editCargo",{}),i(t,"options",[]),i(t,"brandOptions",[]),i(t,"pagesize",10),i(t,"currentPage",1),i(t,"totalCount",0),t},created:function(){var e=this;e.getItemInfo(),e.getAllClassify()},mounted:function(){var e=this;if(void 0==e.$route.params.list||void 0==e.$route.params.addMerchandise)return!1;e.list=e.$route.params.list,e.addMerchandise=e.$route.params.addMerchandise},methods:{handleCurrentChange:function(e){var t=this;t.currentPage=e,t.search(e)},getItemInfo:function(){var e=this,t={currentPage:e.currentPage,numberPerPage:e.pagesize};e.global.axiosPostReq("/item/itemInfoList",t).then(function(t){if("SUCCEED"===t.data.callStatus){console.log(t,"op"),e.tableData=t.data.data,e.totalCount=t.data.totalNumber;for(var a=0;a<e.tableData.length;a++)e.tableData[a].classify=e.tableData[a].oneClassify+"/"+e.tableData[a].twoClassify+"/"+e.tableData[a].threeClassify}else e.$message.error("网络出错，请稍后再试！")})},getAllClassify:function(){var e=this;e.global.axiosGetReq("/item/getAllClassifyAndBrand").then(function(t){if("SUCCEED"===t.data.callStatus){e.options=t.data.data.classifyList,e.brandOptions=t.data.data.itemBrandList;for(var a=0;a<e.options.length;a++){e.options[a].label=e.options[a].oneClassify,e.options[a].children=e.options[a].classifyTwoList;for(var i in e.options[a].children){e.options[a].children[i].label=e.options[a].children[i].classifyTwoName,e.options[a].children[i].children=e.options[a].children[i].classifyThreeList;for(var s in e.options[a].children[i].children)e.options[a].children[i].children[s].label=e.options[a].children[i].children[s].classifyThreeName}}}else e.$message.error("网络出错，请稍后再试！")})},showMsgFromChild:function(e){var t=this;t.list=e,t.addMerchandise=!1},search:function(e){var t=this;if(void 0==e||"object"==(void 0===e?"undefined":s(e))?t.currentPage=1:t.currentPage=e,1==t.cargo.class.length)var a={itemId:t.cargo.id,itemName:t.cargo.name,itemClassify:t.cargo.class[0],itemBrandName:t.cargo.brand.itemBrandName,state:t.stateValue,currentPage:t.currentPage,numberPerPage:t.pagesize};else if(2==t.cargo.class.length)var a={itemId:t.cargo.id,itemName:t.cargo.name,itemClassify:t.cargo.class[1],itemBrandName:t.cargo.brand.itemBrandName,state:t.stateValue,currentPage:t.currentPage,numberPerPage:t.pagesize};else if(3==t.cargo.class.length)var a={itemId:t.cargo.id,itemName:t.cargo.name,itemClassify:t.cargo.class[2],itemBrandName:t.cargo.brand.itemBrandName,state:t.stateValue,currentPage:t.currentPage,numberPerPage:t.pagesize};else if(0==t.cargo.class.length)var a={itemId:t.cargo.id,itemName:t.cargo.name,itemClassify:t.cargo.class[2],itemBrandName:t.cargo.brand.itemBrandName,state:t.stateValue,currentPage:t.currentPage,numberPerPage:t.pagesize};t.global.axiosPostReq("/item/itemInfoList",a).then(function(e){if("SUCCEED"===e.data.callStatus){t.tableData=e.data.data,t.totalCount=e.data.totalNumber;for(var a=0;a<t.tableData.length;a++)t.tableData[a].classify=t.tableData[a].oneClassify+"/"+t.tableData[a].twoClassify+"/"+t.tableData[a].threeClassify;console.log(e.data,"999999")}else t.$message.error("网络出错，请稍后再试！")})},clearWord:function(){var e=this;e.cargo.id="",e.cargo.name="",e.cargo.class=[],e.cargo.brand="",e.stateValue=""},add:function(){var e=this;e.list=!1,window.sessionStorage.removeItem("editCargo"),e.$router.push({path:"/admin/addMerchandise"})},edit:function(e){var t=this,a={itemId:e.row.itemId};t.global.axiosPostReq("/item/itemDetailDes",a).then(function(e){if("SUCCEED"===e.data.callStatus){if(t.editCargo=e.data.data,t.editCargo!=={})if(""==t.editCargo.propertyList[0].propertyName)t.editCargo.shopType="2",window.sessionStorage.setItem("editCargo",JSON.stringify(t.editCargo)),t.$router.push({name:"addMerchandise"}),console.log(t.editCargo,"shopType2否");else{t.editCargo.shopType="1";for(var a=0;a<t.editCargo.itemValueList.length;a++)delete t.editCargo.itemValueList[a].itemSKU,delete t.editCargo.itemValueList[a].itemValueId,delete t.editCargo.itemValueList[a].itemId,""==t.editCargo.itemValueList[a].itemPropertySixName&&""==t.editCargo.itemValueList[a].itemPropertySixValue?(delete t.editCargo.itemValueList[a].itemPropertySixName,delete t.editCargo.itemValueList[a].itemPropertySixValue):t.editCargo.itemValueList[a][t.editCargo.itemValueList[a].itemPropertySixName]=t.editCargo.itemValueList[a].itemPropertySixValue,""==t.editCargo.itemValueList[a].itemPropertyFiveName&&""==t.editCargo.itemValueList[a].itemPropertyFiveValue?(delete t.editCargo.itemValueList[a].itemPropertyFiveName,delete t.editCargo.itemValueList[a].itemPropertyFiveValue):t.editCargo.itemValueList[a][t.editCargo.itemValueList[a].itemPropertyFiveName]=t.editCargo.itemValueList[a].itemPropertyFiveValue,""==t.editCargo.itemValueList[a].itemPropertyFourName&&""==t.editCargo.itemValueList[a].itemPropertyFourValue?(delete t.editCargo.itemValueList[a].itemPropertyFourName,delete t.editCargo.itemValueList[a].itemPropertyFourValue):t.editCargo.itemValueList[a][t.editCargo.itemValueList[a].itemPropertyFourName]=t.editCargo.itemValueList[a].itemPropertyFourValue,""==t.editCargo.itemValueList[a].itemPropertyNameThree&&""==t.editCargo.itemValueList[a].itemPropertyThreeValue?(delete t.editCargo.itemValueList[a].itemPropertyNameThree,delete t.editCargo.itemValueList[a].itemPropertyThreeValue):t.editCargo.itemValueList[a][t.editCargo.itemValueList[a].itemPropertyNameThree]=t.editCargo.itemValueList[a].itemPropertyThreeValue,""==t.editCargo.itemValueList[a].itemPropertyNameTwo&&""==t.editCargo.itemValueList[a].itemPropertyTwoValue?(delete t.editCargo.itemValueList[a].itemPropertyNameTwo,delete t.editCargo.itemValueList[a].itemPropertyTwoValue):t.editCargo.itemValueList[a][t.editCargo.itemValueList[a].itemPropertyNameTwo]=t.editCargo.itemValueList[a].itemPropertyTwoValue,""==t.editCargo.itemValueList[a].itemPropertyInfo&&""==t.editCargo.itemValueList[a].itemPropertyName?(delete t.editCargo.itemValueList[a].itemPropertyInfo,delete t.editCargo.itemValueList[a].itemPropertyName):t.editCargo.itemValueList[a][t.editCargo.itemValueList[a].itemPropertyName]=t.editCargo.itemValueList[a].itemPropertyInfo;window.sessionStorage.setItem("editCargo",JSON.stringify(t.editCargo)),t.$router.push({name:"addMerchandise"}),console.log(t.editCargo,"shopType1是")}}else t.$message.error("网络出错，请稍后再试！")})},preview:function(e){window.open("/preview/"+e.row.itemId)},detail:function(e){var t=this,a={itemId:e.row.itemId,token:null};t.global.axiosPostReq("/item/itemDetailDes",a).then(function(e){if("SUCCEED"===e.data.callStatus){t.details=e.data.data;var a=t.details.propertyList;t.propertyList=a.filter(function(e,t,a){return""!==e.propertyName}),console.log(t.details,"ppp")}else t.$message.error("网络出错，请稍后再试！")}),t.dialogTableVisible=!0},grounding:function(e){var t=this;t.$confirm("确定上架该商品吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var a={itemId:e.row.itemId};t.global.axiosPostReq("/item/up",a).then(function(e){"SUCCEED"===e.data.callStatus?(t.getItemInfo(),t.$message({type:"success",message:"上架成功!"})):t.$message.error("网络出错，请稍后再试！")})}).catch(function(){t.$message({type:"info",message:"已取消操作"})})},soldOut:function(e){var t=this;t.$confirm("确定下架该商品吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var a={itemId:e.row.itemId};t.global.axiosPostReq("/item/down",a).then(function(e){"SUCCEED"===e.data.callStatus?(t.getItemInfo(),t.clearWord(),t.$message({type:"success",message:"下架成功!"})):t.$message.error("网络出错，请稍后再试！")})}).catch(function(){t.$message({type:"info",message:"已取消操作"})})},remove:function(e){var t=this;t.$confirm("确定删除该商品吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var a={itemId:e.row.itemId};t.global.axiosPostReq("/item/delete",a).then(function(e){"SUCCEED"===e.data.callStatus?(console.log(e.data),t.getItemInfo(),t.clearWord(),t.$message({type:"success",message:"删除成功!"})):t.$message.error("网络出错，请稍后再试！")})}).catch(function(){t.$message({type:"info",message:"已取消操作"})})}}}},605:function(e,t,a){t=e.exports=a(349)(!0),t.push([e.i,".detail_word img{width:100%;height:100%;display:block;margin:auto}","",{version:3,sources:["F:/yayi-web/src/components/admin/merchantMessage/merchantMessage.vue"],names:[],mappings:"AACA,iBACE,WAAY,AACZ,YAAa,AACb,cAAe,AACf,WAAa,CACd",file:"merchantMessage.vue",sourcesContent:["\n.detail_word img {\r\n  width: 100%;\r\n  height: 100%;\r\n  display: block;\r\n  margin: auto;\n}\r\n"],sourceRoot:""}])},606:function(e,t,a){t=e.exports=a(349)(!0),t.push([e.i,"table[data-v-78a92ad3]{border-collapse:collapse;border-spacing:0}td[data-v-78a92ad3],th[data-v-78a92ad3]{padding:0}.left[data-v-78a92ad3]{float:left}.activeTable_box[data-v-78a92ad3]{width:100%;border:1px solid #dfe6ec}.activeTable_title[data-v-78a92ad3]{width:100%;height:40px;line-height:40px;border-bottom:1px solid #dfe6ec}.des_type1[data-v-78a92ad3],.type1[data-v-78a92ad3]{width:8%;text-align:center;font-size:14px;border-right:1px solid #dfe6ec}.coin[data-v-78a92ad3],.des_coin[data-v-78a92ad3],.des_percent[data-v-78a92ad3],.des_price[data-v-78a92ad3],.des_skuCode[data-v-78a92ad3],.des_stock[data-v-78a92ad3],.percent[data-v-78a92ad3],.price[data-v-78a92ad3],.skuCode[data-v-78a92ad3],.stock[data-v-78a92ad3]{width:12.5%;text-align:center;font-size:14px;border-right:1px solid #dfe6ec}.des_enable[data-v-78a92ad3],.enable[data-v-78a92ad3]{width:12.5%;text-align:center;font-size:14px}.activeTable_des[data-v-78a92ad3]{width:100%;border-bottom:1px solid #dfe6ec}.detail_box[data-v-78a92ad3]{width:100%;height:100%;margin-bottom:10px}.detail_cargo[data-v-78a92ad3]{font-size:15px;display:inline-block}.detail_word[data-v-78a92ad3]{font-size:14px;color:#000;line-height:25px;display:inline-block}","",{version:3,sources:["F:/yayi-web/src/components/admin/merchantMessage/merchantMessage.vue"],names:[],mappings:"AACA,uBACC,yBAAyB,AACzB,gBAAiB,CACjB,AACD,wCACC,SAAW,CACX,AACD,uBACE,UAAY,CACb,AACD,kCACE,WAAY,AACZ,wBAA0B,CAC3B,AACD,oCACE,WAAY,AACZ,YAAa,AACb,iBAAkB,AAClB,+BAAiC,CAClC,AACD,oDACE,SAAU,AACV,kBAAmB,AACnB,eAAgB,AAChB,8BAAgC,CACjC,AAyBD,0QACE,YAAa,AACb,kBAAmB,AACnB,eAAgB,AAChB,8BAAgC,CACjC,AACD,sDACE,YAAa,AACb,kBAAmB,AACnB,cAAgB,CACjB,AACD,kCACE,WAAY,AAGZ,+BAAiC,CAClC,AACD,6BACE,WAAY,AACZ,YAAa,AACb,kBAAoB,CACrB,AACD,+BACE,eAAgB,AAChB,oBAAsB,CACvB,AACD,8BACE,eAAgB,AAChB,WAAY,AACZ,iBAAkB,AAClB,oBAAsB,CACvB",file:"merchantMessage.vue",sourcesContent:["\ntable[data-v-78a92ad3] {\r\n border-collapse:collapse;\r\n border-spacing:0;\n}\nth[data-v-78a92ad3],td[data-v-78a92ad3] {\r\n padding: 0;\n}\n.left[data-v-78a92ad3] {\r\n  float: left;\n}\n.activeTable_box[data-v-78a92ad3] {\r\n  width: 100%;\r\n  border: 1px solid #dfe6ec;\n}\n.activeTable_title[data-v-78a92ad3] {\r\n  width: 100%;\r\n  height: 40px;\r\n  line-height: 40px;\r\n  border-bottom: 1px solid #dfe6ec;\n}\n.type1[data-v-78a92ad3], .des_type1[data-v-78a92ad3]{\r\n  width: 8%;\r\n  text-align: center;\r\n  font-size: 14px;\r\n  border-right: 1px solid #dfe6ec;\n}\n.skuCode[data-v-78a92ad3], .des_skuCode[data-v-78a92ad3]{\r\n  width: 12.5%;\r\n  text-align: center;\r\n  font-size: 14px;\r\n  border-right: 1px solid #dfe6ec;\n}\n.price[data-v-78a92ad3], .des_price[data-v-78a92ad3]{\r\n  width: 12.5%;\r\n  text-align: center;\r\n  font-size: 14px;\r\n  border-right: 1px solid #dfe6ec;\n}\n.percent[data-v-78a92ad3], .des_percent[data-v-78a92ad3]{\r\n  width: 12.5%;\r\n  text-align: center;\r\n  font-size: 14px;\r\n  border-right: 1px solid #dfe6ec;\n}\n.coin[data-v-78a92ad3], .des_coin[data-v-78a92ad3]{\r\n  width: 12.5%;\r\n  text-align: center;\r\n  font-size: 14px;\r\n  border-right: 1px solid #dfe6ec;\n}\n.stock[data-v-78a92ad3], .des_stock[data-v-78a92ad3]{\r\n  width: 12.5%;\r\n  text-align: center;\r\n  font-size: 14px;\r\n  border-right: 1px solid #dfe6ec;\n}\n.enable[data-v-78a92ad3], .des_enable[data-v-78a92ad3]{\r\n  width: 12.5%;\r\n  text-align: center;\r\n  font-size: 14px;\n}\n.activeTable_des[data-v-78a92ad3] {\r\n  width: 100%;\r\n  /*height: 100px;*/\r\n  /*line-height: 100px;*/\r\n  border-bottom: 1px solid #dfe6ec;\n}\n.detail_box[data-v-78a92ad3] {\r\n  width: 100%;\r\n  height: 100%;\r\n  margin-bottom: 10px;\n}\n.detail_cargo[data-v-78a92ad3] {\r\n  font-size: 15px;\r\n  display: inline-block;\n}\n.detail_word[data-v-78a92ad3] {\r\n  font-size: 14px;\r\n  color: #000;\r\n  line-height: 25px;\r\n  display: inline-block;\n}\r\n"],sourceRoot:""}])},735:function(e,t,a){var i=a(605);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a(350)("5b207011",i,!0)},736:function(e,t,a){var i=a(606);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a(350)("395caaff",i,!0)},850:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-row",{directives:[{name:"show",rawName:"v-show",value:e.list,expression:"list"}],staticClass:"warp"},[a("el-col",{staticClass:"warp-breadcrum",attrs:{span:24}},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/admin/merchantMessage"}}},[a("b",[e._v("商品信息管理")])]),e._v(" "),a("el-breadcrumb-item",[e._v("商品列表")])],1)],1),e._v(" "),a("el-col",{staticClass:"warp-main",attrs:{span:24}},[a("el-col",{staticClass:"toolbar",staticStyle:{"padding-bottom":"0px"},attrs:{span:24}},[a("el-form",{attrs:{inline:!0,model:e.cargo}},[a("el-form-item",{attrs:{label:"商品编号："}},[a("el-input",{model:{value:e.cargo.id,callback:function(t){e.cargo.id=t},expression:"cargo.id"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商品名称："}},[a("el-input",{model:{value:e.cargo.name,callback:function(t){e.cargo.name=t},expression:"cargo.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商品分类"}},[a("el-cascader",{staticClass:"cascader",attrs:{props:{value:"label"},options:e.options,"show-all-levels":!1,"change-on-select":""},model:{value:e.cargo.class,callback:function(t){e.cargo.class=t},expression:"cargo.class"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"品牌名称"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.cargo.brand,callback:function(t){e.cargo.brand=t},expression:"cargo.brand"}},e._l(e.brandOptions,function(e){return a("el-option",{key:e,attrs:{label:e.itemBrandName,value:e}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"商品状态："}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.stateValue,callback:function(t){e.stateValue=t},expression:"stateValue"}},e._l(e.options2,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.search()}}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.clearWord()}}},[e._v("重置")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.add()}}},[e._v("添加商品")])],1)],1),e._v(" "),a("div",{staticClass:"clearfix"}),e._v(" "),a("el-table",{staticStyle:{"margin-top":"26px",width:"100%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{label:"商品编号",prop:"itemId"}}),e._v(" "),a("el-table-column",{attrs:{label:"商品名称",prop:"itemName"}}),e._v(" "),a("el-table-column",{attrs:{label:"商品分类",prop:"classify"}}),e._v(" "),a("el-table-column",{attrs:{label:"品牌名称",prop:"itemBrand.itemBrandName"}}),e._v(" "),a("el-table-column",{attrs:{label:"推荐"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.isThrow?a("span",[e._v("是")]):e._e(),e._v(" "),0==t.row.isThrow?a("span",[e._v("否")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"商品状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.state?a("span",[e._v("已上架")]):e._e(),e._v(" "),0==t.row.state?a("span",[e._v("已下架")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.state?a("div",[a("el-button",{attrs:{size:"small"},on:{click:function(a){e.detail(t)}}},[e._v("详情")]),e._v(" "),a("el-button",{attrs:{size:"small"},on:{click:function(a){e.soldOut(t)}}},[e._v("下架")])],1):a("div",[a("el-button",{attrs:{size:"small"},on:{click:function(a){e.detail(t)}}},[e._v("详情")]),e._v(" "),a("el-button",{attrs:{size:"small"},on:{click:function(a){e.edit(t)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{size:"small"},on:{click:function(a){e.preview(t)}}},[e._v("预览")]),e._v(" "),a("el-button",{attrs:{size:"small"},on:{click:function(a){e.grounding(t)}}},[e._v("上架")]),e._v(" "),a("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(a){e.remove(t)}}},[e._v("删除")])],1)]}}])})],1),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:this.totalCount>this.pagesize,expression:"this.totalCount > this.pagesize"}],attrs:{"current-page":e.currentPage,"page-size":e.pagesize,layout:"prev, pager, next, jumper",total:e.totalCount},on:{"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t}}})],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"商品详情",visible:e.dialogTableVisible,size:"small"},on:{"update:visible":function(t){e.dialogTableVisible=t}}},[a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[a("div",{staticClass:"detail_box"},[a("div",{staticClass:"detail_cargo"},[e._v("商品编号：")]),e._v(" "),a("p",{staticClass:"detail_word"},[e._v(e._s(e.details.itemId))])]),e._v(" "),a("div",{staticClass:"detail_box"},[a("div",{staticClass:"detail_cargo"},[e._v("商品名称：")]),e._v(" "),a("p",{staticClass:"detail_word"},[e._v(e._s(e.details.itemName))])]),e._v(" "),a("div",{staticClass:"detail_box"},[a("div",{staticClass:"detail_cargo"},[e._v("商品分类：")]),e._v(" "),a("p",{staticClass:"detail_word"},[e._v(e._s(e.details.oneClassify)+"/"+e._s(e.details.twoClassify)+"/"+e._s(e.details.threeClassify))])]),e._v(" "),a("div",{staticClass:"detail_box"},[a("div",{staticClass:"detail_cargo"},[e._v("品牌名称：")]),e._v(" "),a("p",{staticClass:"detail_word"},[e._v(e._s(e.details.itemBrand.itemBrandName))])]),e._v(" "),a("div",{staticClass:"detail_box"},[a("div",{staticClass:"detail_cargo"},[e._v("注册证号：")]),e._v(" "),a("p",{staticClass:"detail_word"},[e._v(e._s(e.details.itemDetail.registerId))])]),e._v(" "),a("div",{staticClass:"detail_box"},[a("div",{staticClass:"detail_cargo"},[e._v("商品类型：")]),e._v(" "),a("p",{staticClass:"detail_word"},[e._v(e._s(e.details.itemSort))])]),e._v(" "),a("div",{staticClass:"detail_box"},[a("div",{staticClass:"detail_cargo"},[e._v("商品属性：")])]),e._v(" "),a("table",{staticClass:"activeTable_box",attrs:{border:"1"}},[a("tr",{staticClass:"activeTable_title"},[e._l(e.propertyList,function(t){return a("th",{staticClass:"type1"},[e._v(e._s(t.propertyName))])}),e._v(" "),a("th",{staticClass:"skuCode"},[e._v("SKU代码")]),e._v(" "),a("th",{staticClass:"price"},[e._v("价格")]),e._v(" "),a("th",{staticClass:"percent"},[e._v("提成（%）")]),e._v(" "),a("th",{staticClass:"coin"},[e._v("乾币（%）")]),e._v(" "),a("th",{staticClass:"stock"},[e._v("库存")]),e._v(" "),a("th",{staticClass:"enable"},[e._v("是否启用")])],2),e._v(" "),e._l(e.details.itemValueList,function(t,i){return a("tr",{key:t,staticClass:"activeTable_des"},[t.itemPropertyInfo?a("td",[a("span",[e._v(e._s(t.itemPropertyInfo))])]):e._e(),e._v(" "),t.itemPropertyTwoValue?a("td",[a("span",[e._v(e._s(t.itemPropertyTwoValue))])]):e._e(),e._v(" "),t.itemPropertyThreeValue?a("td",[a("span",[e._v(e._s(t.itemPropertyThreeValue))])]):e._e(),e._v(" "),t.itemPropertyFourValue?a("td",[a("span",[e._v(e._s(t.itemPropertyFourValue))])]):e._e(),e._v(" "),t.itemPropertyFiveValue?a("td",[a("span",[e._v(e._s(t.itemPropertyFiveValue))])]):e._e(),e._v(" "),t.itemPropertySixValue?a("td",[a("span",[e._v(e._s(t.itemPropertySixValue))])]):e._e(),e._v(" "),a("td",{staticClass:"des_skuCode"},[a("span",[e._v(e._s(t.itemSKU))])]),e._v(" "),a("td",{staticClass:"des_price"},[a("span",[e._v(e._s(t.itemSkuPrice))])]),e._v(" "),a("td",{staticClass:"des_percent"},[a("span",[e._v(e._s(t.tiChen))])]),e._v(" "),a("td",{staticClass:"des_coin"},[a("span",[e._v(e._s(t.itemQb))])]),e._v(" "),a("td",{staticClass:"des_stock"},[a("span",[e._v(e._s(t.stockNum))])]),e._v(" "),a("td",{staticClass:"des_enable"},[a("span",[e._v(e._s(e._f("canUse")(t.canUse)))])])])})],2),e._v(" "),a("div",{staticClass:"detail_box"},[a("div",{staticClass:"detail_cargo"},[e._v("商家货号：")]),e._v(" "),a("p",{staticClass:"detail_word"},[e._v(e._s(e.details.itemDetail.storeItemId))])]),e._v(" "),a("div",{staticClass:"detail_box"},[a("div",{staticClass:"detail_cargo"},[e._v("器械类别：")]),e._v(" "),a("p",{staticClass:"detail_word"},[e._v(e._s(e.details.itemDetail.apparatusType))])]),e._v(" "),a("div",{staticClass:"detail_box"},[a("div",{staticClass:"detail_cargo"},[e._v("单位：")]),e._v(" "),a("p",{staticClass:"detail_word"},[e._v(e._s(e.details.itemDetail.unit))])]),e._v(" "),a("div",{staticClass:"detail_box"},[a("div",{staticClass:"detail_cargo"},[e._v("生产企业：")]),e._v(" "),a("p",{staticClass:"detail_word"},[e._v(e._s(e.details.itemDetail.producePompany))])]),e._v(" "),a("div",{staticClass:"detail_box"},[a("div",{staticClass:"detail_cargo"},[e._v("注册证有效期／备案日期：")]),e._v(" "),a("p",{staticClass:"detail_word"},[e._v(e._s(e.details.itemDetail.registerDate))])]),e._v(" "),a("div",{staticClass:"detail_box"},[a("div",{staticClass:"detail_cargo"},[e._v("产品包装：")]),e._v(" "),a("p",{staticClass:"detail_word"},[e._v(e._s(e.details.itemDetail.itemPacking))])]),e._v(" "),a("div",{staticClass:"detail_box"},[a("div",{staticClass:"detail_cargo"},[e._v("产品标准：")]),e._v(" "),a("p",{staticClass:"detail_word"},[e._v(e._s(e.details.itemDetail.itemLevels))])]),e._v(" "),a("div",{staticClass:"detail_box"},[a("div",{staticClass:"detail_cargo"},[e._v("使用范围：")]),e._v(" "),a("p",{staticClass:"detail_word"},[e._v(e._s(e.details.itemDetail.itemRange))])]),e._v(" "),a("div",{staticClass:"detail_box"},[a("div",{staticClass:"detail_cargo"},[e._v("其他：")]),e._v(" "),a("p",{staticClass:"detail_word"},[e._v(e._s(e.details.itemDetail.remark))])]),e._v(" "),a("div",{staticClass:"detail_box"},[a("div",{staticClass:"detail_cargo"},[e._v("商品详情：")]),e._v(" "),a("p",{staticClass:"detail_word",domProps:{innerHTML:e._s(e.details.itemDetail.itemDesc)}})]),e._v(" "),a("div",{staticClass:"detail_box"},[a("div",{staticClass:"detail_cargo"},[e._v("图片说明：")]),e._v(" "),a("p",{staticClass:"detail_word",domProps:{innerHTML:e._s(e.details.itemDetail.itemUse)}})]),e._v(" "),a("div",{staticClass:"detail_box"},[a("div",{staticClass:"detail_cargo"},[e._v("视频说明：")]),e._v(" "),a("p",{staticClass:"detail_word"},[e._v(e._s(e.details.itemPnamea))])])])],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=19.ffe461c37d99e68ec580.js.map