<template>
<div>
  <el-row class="warp" v-show="list">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin/merchantMessage' }"><b>商品信息管理</b></el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24" class="warp-main">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="cargo">
          <el-form-item label="商品编号：">
            <el-input v-model="cargo.id"></el-input>
          </el-form-item>
          <el-form-item label="商品名称：">
            <el-input v-model="cargo.name"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader class="cascader" :props="{value:'label'}" :options="options" :show-all-levels="false" v-model="cargo.class" change-on-select>
            </el-cascader>
          </el-form-item>
          <el-form-item label="品牌名称">
            <el-select v-model="cargo.brand" placeholder="请选择">
              <el-option v-for="brand in brandOptions" :key="brand.itemBrandName" :label="brand.itemBrandName" :value="brand.itemBrandName">
              </el-option>
            </el-select>
          </el-form-item>
<!--           <el-form-item label="推荐：">
            <el-select v-model="coinValue" placeholder="请选择">
              <el-option v-for="coin in options1" :key="coin.value" :label="coin.label" :value="coin.value">
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="商品状态：">
            <el-select v-model="stateValue" placeholder="请选择">
              <el-option v-for="state in options2" :key="state.value" :label="state.label" :value="state.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="search()">查询</el-button>
        <el-button type="primary" @click="clearWord()">重置</el-button>
        <el-button type="primary" @click="add()">添加商品</el-button>
      </el-col>
    </el-col>
      <div class="clearfix"></div>
      <el-table :data="tableData" border style="margin-top: 26px;width: 100%">
        <el-table-column label="商品编号" prop="itemId"></el-table-column>
        <el-table-column label="商品名称" prop="itemName"></el-table-column>
        <el-table-column label="商品分类" prop="classify"></el-table-column>
        <el-table-column label="品牌名称" prop="itemBrand.itemBrandName"></el-table-column>
        <el-table-column label="推荐">
          <template scope="scope">
            <span v-if="scope.row.isThrow == 1">是</span>
            <span v-if="scope.row.isThrow == 0">否</span>
          </template>
        </el-table-column>
        <el-table-column label="商品状态">
          <template scope="scope">
            <span v-if="scope.row.state == true">已上架</span>
            <span v-if="scope.row.state == false">已下架</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <div v-if="scope.row.state == true">
              <el-button size="small" @click="detail(scope)">详情</el-button>
              <el-button size="small" @click="soldOut(scope)">下架</el-button>
            </div>
            <div v-else>
              <el-button size="small" @click="detail(scope)">详情</el-button>
              <el-button size="small" @click="edit(scope)">编辑</el-button>
              <el-button size="small" @click="preview(scope)">预览</el-button>
              <el-button size="small" @click="grounding(scope)">上架</el-button>
              <el-button size="small" type="danger" @click="remove(scope)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <!-- 分页 -->
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" layout="prev, pager, next, jumper" :total="totalCount" v-show="this.totalCount > this.pagesize">
        </el-pagination>
        <!-- 分页 -->
      </div>
  </el-row>
  <!-- 查看商品属性详情面板 开始 -->
  <el-dialog title="商品详情" :visible.sync="dialogTableVisible" size="small">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="detail_box">
        <div class="detail_cargo">商品编号：</div>
        <p class="detail_word">{{details.itemId}}</p>
      </div>
      <div class="detail_box">
        <div class="detail_cargo">商品名称：</div>
        <p class="detail_word">{{details.itemName}}</p>
      </div>
      <div class="detail_box">
        <div class="detail_cargo">商品分类：</div>
        <p class="detail_word">{{details.oneClassify}}/{{details.twoClassify}}/{{details.threeClassify}}</p>
      </div>
      <div class="detail_box">
        <div class="detail_cargo">品牌名称：</div>
        <p class="detail_word">{{details.itemBrand.itemBrandName}}</p>
      </div>
      <div class="detail_box">
        <div class="detail_cargo">注册证号：</div>
        <p class="detail_word">{{details.itemDetail.registerId}}</p>
      </div>
      <div class="detail_box">
        <div class="detail_cargo">商品类型：</div>
        <p class="detail_word">{{details.itemSort}}</p>
      </div>
      <div class="detail_box">
        <div class="detail_cargo">商品属性：</div>
      </div>
      <table class="activeTable_box" border="1">
        <tr class="activeTable_title">
          <th class="type1" v-for="property in propertyList">{{property.propertyName}}</th>
          <th class="skuCode">SKU代码</th>
          <th class="price">价格</th>
          <th class="percent">提成（%）</th>
          <th class="coin">乾币（%）</th>
          <th class="stock">库存</th>
          <th class="enable">是否启用</th>
        </tr>
        <tr class="activeTable_des" v-for="(table,index) in details.itemValueList" :key="table.itemPropertyInfo">
          <td v-if="table.itemPropertyInfo">
           <span>{{table.itemPropertyInfo}}</span>
          </td>
          <td v-if="table.itemPropertyTwoValue">
           <span>{{table.itemPropertyTwoValue}}</span>
          </td>
          <td v-if="table.itemPropertyThreeValue">
           <span>{{table.itemPropertyThreeValue}}</span>
          </td>
          <td v-if="table.itemPropertyFourValue">
           <span>{{table.itemPropertyFourValue}}</span>
          </td>
          <td v-if="table.itemPropertyFiveValue">
           <span>{{table.itemPropertyFiveValue}}</span>
          </td>
          <td v-if="table.itemPropertySixValue">
           <span>{{table.itemPropertySixValue}}</span>
          </td>
          <td class="des_skuCode">
            <span>{{table.itemSKU}}</span>
          </td>
          <td class="des_price">
            <span>{{table.itemSkuPrice}}</span>
          </td>
          <td class="des_percent">
            <span>{{table.tiChen}}</span>
          </td>
          <td class="des_coin">
            <span>{{table.itemQb}}</span>
          </td>
          <td class="des_stock">
            <span>{{table.stockNum}}</span>
          </td>
          <td class="des_enable">
            <span>{{table.canUse | canUse}}</span>
          </td>
        </tr>
      </table>
      <div class="detail_box">
        <div class="detail_cargo">商家货号：</div>
        <p class="detail_word">{{details.itemDetail.storeItemId}}</p>
      </div>
      <div class="detail_box">
        <div class="detail_cargo">器械类别：</div>
        <p class="detail_word">{{details.itemDetail.apparatusType}}</p>
      </div>
      <div class="detail_box">
        <div class="detail_cargo">单位：</div>
        <p class="detail_word">{{details.itemDetail.unit}}</p>
      </div>
      <div class="detail_box">
        <div class="detail_cargo">生产企业：</div>
        <p class="detail_word">{{details.itemDetail.producePompany}}</p>
      </div>
      <div class="detail_box">
        <div class="detail_cargo">注册证有效期／备案日期：</div>
        <p class="detail_word">{{details.itemDetail.registerDate}}</p>
      </div>
      <div class="detail_box">
        <div class="detail_cargo">产品包装：</div>
        <p class="detail_word">{{details.itemDetail.itemPacking}}</p>
      </div>
      <div class="detail_box">
        <div class="detail_cargo">产品标准：</div>
        <p class="detail_word">{{details.itemDetail.itemLevels}}</p>
      </div>
      <div class="detail_box">
        <div class="detail_cargo">使用范围：</div>
        <p class="detail_word">{{details.itemDetail.itemRange}}</p>
      </div>
      <div class="detail_box">
        <div class="detail_cargo">其他：</div>
        <p class="detail_word">{{details.itemDetail.remark}}</p>
      </div>
      <div class="detail_box">
        <div class="detail_cargo">商品详情：</div>
        <p class="detail_word" v-html="details.itemDetail.itemDesc"></p>
      </div>
      <div class="detail_box">
        <div class="detail_cargo">图片说明：</div>
        <p class="detail_word" v-html="details.itemDetail.itemUse"></p>
      </div>
      <div class="detail_box">
        <div class="detail_cargo">视频说明：</div>
<!--         <video style="width:100%;height:100%;" :src=details.itemDetail.video controls="controls"></video> -->
        <p class="detail_word">{{details.itemPnamea}}</p>
      </div>
    </el-form>
  </el-dialog>
  <!-- 查看商品属性详情面板 结束 -->
</div>
</template>
<script>
  import util from '../../../common/util'
  export default{
    data () {
      return {
        tableData: [],
        cargo: {
          id: '',
          name: '',
          class: [],
          brand: '',
        },
        options1: [{
          label: '全部',
          value: '1'
        },{
          label: '是',
          value: '2'
        },{
          label: '否',
          value: '3'
        }],
        options2: [{
          label: '全部',
          value: '',
        },{
          label: '已上架',
          value: 1
        },{
          label: '已下架',
          value: 0
        }],
        list: true,
        coinValue: '',
        stateValue: '',
        dialogTableVisible: false,
        ruleForm: {
          cargoId: '',
          name: '',
          type: [],
          brand: '',
          rgAcount:'',
          qian: '',
        },
        rules: {
          cargoId: [ 
            { required: true, message: '请填写商品编号', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请填写商品名称', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择商品分类', trigger: 'change' }
          ],
          brand: [
            { required: true, message: '请选择品牌名称', trigger: 'change' }
          ],
          rgAcount: [
            { required: true, message: '请填写注册账号', trigger: 'blur' }
          ],
          qian: [
            { required: true, message: '请选择是否乾币抵扣状态', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
        radio: '',
        labelPosition: 'right',
        multipleSelection: [],
        dialogTableVisible: false,
        items: [],
        checkedItems: [],
        input_sku: '',
        input_price: '',
        input_percent: '',
        input_coin: '',
        input_stock: '',
        input_enable: false,
        details: {
          itemId:'',
          itemBrand: {
            itemBrandName:'',
          },
          itemDetail: {
            video:'',
          },
        },
        propertyList: [],
        editCargo: {},
        options: [],
        brandOptions: [],
        //默认每页数据量
        pagesize: 10,
        //当前页码
        currentPage: 1,
        //默认数据总数
        totalCount: 0,
      }
    },
    created: function() {
      var that = this;
      that.getItemInfo();
      that.getAllClassify();
    },
    mounted: function() {
      var that = this;
      if (that.$route.params.list == undefined || that.$route.params.addMerchandise == undefined) {
        return false
      } else {
        that.list = that.$route.params.list;
        that.addMerchandise = that.$route.params.addMerchandise;
      }
    },
    methods: {
      handleCurrentChange(val) {
        var that = this
        that.currentPage = val
        that.search(val)
      },
      // 获取商品列表
      getItemInfo: function() {
        var that = this;
        var obj = {
          currentPage: that.currentPage,
          numberPerPage: that.pagesize,
        }
        that.global.axiosPostReq('/item/itemInfoList',obj).then((res) => {
          console.log(res)
          if (res.data.callStatus === 'SUCCEED') {
            console.log(res,'op')
            that.tableData = res.data.data;
            that.totalCount = res.data.totalNumber;
            for (var i = 0; i < that.tableData.length; i++) {
              that.tableData[i].classify = that.tableData[i].oneClassify + '/' + that.tableData[i].twoClassify + '/' + that.tableData[i].threeClassify
            }
          } else {
            that.$message.error('网络出错，请稍后再试！1');
          }
        })
      },
      //获取所有分类列表
      getAllClassify: function() {
        var that = this;
        that.global.axiosGetReq('/item/getAllClassifyAndBrand').then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.options = res.data.data.classifyList;
            that.brandOptions = res.data.data.itemBrandList;
            for (var i = 0; i < that.options.length; i++) {
              that.options[i].label = that.options[i].oneClassify
              that.options[i].children = that.options[i].classifyTwoList
              for (var k in that.options[i].children) {
                that.options[i].children[k].label = that.options[i].children[k].classifyTwoName
                that.options[i].children[k].children = that.options[i].children[k].classifyThreeList
                for (var j in that.options[i].children[k].children) {
                  that.options[i].children[k].children[j].label = that.options[i].children[k].children[j].classifyThreeName
                }
              }
            }
          } else {
            that.$message.error('网络出错，请稍后再试！2');
          }
        })
      },
      // 组件传值
      showMsgFromChild: function(data) {
        var that = this;
        that.list = data;
        that.addMerchandise = false;
        //console.log(data);
      },
      // 查询
      search: function(val) {
        var that = this;
        if (val == undefined || typeof(val) == 'object') {
          that.currentPage = 1
        } else {
          that.currentPage = val
        }
        if (that.cargo.class.length == 1) {
          var obj = {
            itemId: that.cargo.id,
            itemName: that.cargo.name,
            itemClassify: that.cargo.class[0],
            itemBrandName: that.cargo.brand,
            state: that.stateValue,
            currentPage: that.currentPage,
            numberPerPage: that.pagesize,
          }
        }else if (that.cargo.class.length == 2) {
          var obj = {
            itemId: that.cargo.id,
            itemName: that.cargo.name,
            itemClassify: that.cargo.class[1],
            itemBrandName: that.cargo.brand,
            state: that.stateValue,
            currentPage: that.currentPage,
            numberPerPage: that.pagesize,
          }
        }else if (that.cargo.class.length == 3) {
          var obj = {
            itemId: that.cargo.id,
            itemName: that.cargo.name,
            itemClassify: that.cargo.class[2],
            itemBrandName: that.cargo.brand,
            state: that.stateValue,
            currentPage: that.currentPage,
            numberPerPage: that.pagesize,
          }
        } else if (that.cargo.class.length == 0) {
          var obj = {
            itemId: that.cargo.id,
            itemName: that.cargo.name,
            itemClassify: that.cargo.class[2],
            itemBrandName: that.cargo.brand,
            state: that.stateValue,
            currentPage: that.currentPage,
            numberPerPage: that.pagesize,
          }
        }
        console.log(that.cargo,'90909090')
        that.global.axiosPostReq('/item/itemInfoList',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.tableData = res.data.data;            
            that.totalCount = res.data.totalNumber;
            for (var i = 0; i < that.tableData.length; i++) {
              that.tableData[i].classify = that.tableData[i].oneClassify + '/' + that.tableData[i].twoClassify + '/' + that.tableData[i].threeClassify
            }
            console.log(res.data,'999999');
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      //清空
      clearWord: function() {
        var that = this
        that.cargo.id = ''
        that.cargo.name = ''
        that.cargo.class = []
        that.cargo.brand = ''
        that.stateValue = ''
      },
      //添加商品
      add: function() {
        var that = this;
        that.list = false;
        window.sessionStorage.removeItem('editCargo');
        that.$router.push({ path: '/admin/addMerchandise'});
      },
      //编辑商品属性
      edit: function(scope) {
        var that = this;
        var obj = {
          itemId: scope.row.itemId,
        }
        that.global.axiosPostReq('/item/itemDetailDes',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.editCargo = res.data.data
            if (that.editCargo !== {}) {
              if (that.editCargo.propertyList[0].propertyName == '') {
                that.editCargo.shopType = '2'
                window.sessionStorage.setItem('editCargo', JSON.stringify(that.editCargo))
                that.$router.push({ name: 'addMerchandise'});
                console.log(that.editCargo,'shopType2否');
              }else {
                that.editCargo.shopType = '1'
                for (var i = 0; i < that.editCargo.itemValueList.length; i++) {
                  delete that.editCargo.itemValueList[i].itemSKU
                  delete that.editCargo.itemValueList[i].itemValueId
                  delete that.editCargo.itemValueList[i].itemId
                  // six
                  if( that.editCargo.itemValueList[i].itemPropertySixName == '' && that.editCargo.itemValueList[i].itemPropertySixValue == '') {
                     delete that.editCargo.itemValueList[i].itemPropertySixName
                     delete that.editCargo.itemValueList[i].itemPropertySixValue
                  } else {
                    that.editCargo.itemValueList[i][that.editCargo.itemValueList[i].itemPropertySixName] = that.editCargo.itemValueList[i].itemPropertySixValue
                  }
                  // five
                  if( that.editCargo.itemValueList[i].itemPropertyFiveName == '' && that.editCargo.itemValueList[i].itemPropertyFiveValue == '') {
                     delete that.editCargo.itemValueList[i].itemPropertyFiveName
                     delete that.editCargo.itemValueList[i].itemPropertyFiveValue
                  } else {
                    that.editCargo.itemValueList[i][that.editCargo.itemValueList[i].itemPropertyFiveName] = that.editCargo.itemValueList[i].itemPropertyFiveValue
                  }
                  // four
                  if( that.editCargo.itemValueList[i].itemPropertyFourName == '' && that.editCargo.itemValueList[i].itemPropertyFourValue == '') {
                     delete that.editCargo.itemValueList[i].itemPropertyFourName
                     delete that.editCargo.itemValueList[i].itemPropertyFourValue
                  } else {
                    that.editCargo.itemValueList[i][that.editCargo.itemValueList[i].itemPropertyFourName] = that.editCargo.itemValueList[i].itemPropertyFourValue
                  }
                  // three
                  if( that.editCargo.itemValueList[i].itemPropertyNameThree == '' && that.editCargo.itemValueList[i].itemPropertyThreeValue == '') {
                     delete that.editCargo.itemValueList[i].itemPropertyNameThree
                     delete that.editCargo.itemValueList[i].itemPropertyThreeValue
                  } else {
                    that.editCargo.itemValueList[i][that.editCargo.itemValueList[i].itemPropertyNameThree] = that.editCargo.itemValueList[i].itemPropertyThreeValue
                  }
                  // two
                  if( that.editCargo.itemValueList[i].itemPropertyNameTwo == '' && that.editCargo.itemValueList[i].itemPropertyTwoValue == '') {
                     delete that.editCargo.itemValueList[i].itemPropertyNameTwo
                     delete that.editCargo.itemValueList[i].itemPropertyTwoValue
                  } else {
                    that.editCargo.itemValueList[i][that.editCargo.itemValueList[i].itemPropertyNameTwo] = that.editCargo.itemValueList[i].itemPropertyTwoValue
                  }
                  // one
                  if( that.editCargo.itemValueList[i].itemPropertyInfo == '' && that.editCargo.itemValueList[i].itemPropertyName == '') {
                     delete that.editCargo.itemValueList[i].itemPropertyInfo
                     delete that.editCargo.itemValueList[i].itemPropertyName
                  } else {
                    that.editCargo.itemValueList[i][that.editCargo.itemValueList[i].itemPropertyName] = that.editCargo.itemValueList[i].itemPropertyInfo
                  }
                }
                window.sessionStorage.setItem('editCargo', JSON.stringify(that.editCargo))
                that.$router.push({ name: 'addMerchandise'});
                console.log(that.editCargo,'shopType1是');
              }
            }
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      //预览商品
      preview: function(scope) {
        var that = this;
      // that.$router.push({path: '/details/' + item.itemId})
      // window.scroll(0,0);
        window.open('/preview/' + scope.row.itemId)
      },
      //商品属性详情
      detail: function(scope) {
        var that = this;
        var obj = {
          itemId: scope.row.itemId
        }
        that.global.axiosPostReq('/item/itemDetailDes',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.details = res.data.data
            var a = that.details.propertyList;
            that.propertyList = a.filter(function(ele,index,arr) {
                // console.log(ele);
                return ele.propertyName !== '';   
            });
            console.log(that.details,'ppp');
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
        that.dialogTableVisible = true;
      },
      //上架商品
      grounding: function(scope) {
        var that = this;
        that.$confirm('确定上架该商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var obj = {
            itemId: scope.row.itemId,
          }
          that.global.axiosPostReq('/item/up',obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              // that.getItemInfo();
              that.search();
              that.$message({
                type: 'success',
                message: '上架成功!'
              });
            } else {
              that.$message.error('网络出错，请稍后再试！');
            }
          })
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
      },
      //下架商品
      soldOut: function(scope) {
        var that = this;
        that.$confirm('确定下架该商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var obj = {
            itemId: scope.row.itemId,
          }
          that.global.axiosPostReq('/item/down',obj).then((res) => {
            console.log(res,'xiajia')
            if (res.data.callStatus === 'SUCCEED') {
              that.search();
              // that.getItemInfo();
              // that.clearWord();
              that.$message({
                type: 'success',
                message: '下架成功!'
              });
            } else {
              that.$message.error('网络出错，请稍后再试！');
            }
          })
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
      },
      //删除商品
      remove: function(scope) {
        var that = this;
        that.$confirm('确定删除该商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var obj = {
            itemId: scope.row.itemId,
          }
          that.global.axiosPostReq('/item/delete',obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              console.log(res.data);
              that.getItemInfo();
              that.clearWord();
              that.$message({
                type: 'success',
                message: '删除成功!'
              });
            } else {
              that.$message.error('网络出错，请稍后再试！');
            }
          })
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
      },
    }
  }
</script>
<style>
.detail_word img {
  width: 100%;
  height: 100%;
  display: block;
  margin: auto;
}
</style>
<style scoped>
table {
 border-collapse:collapse;
 border-spacing:0;
}
th,td {
 padding: 0;
}
.left {
  float: left;
}
.activeTable_box {
  width: 100%;
  border: 1px solid #dfe6ec;
}
.activeTable_title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #dfe6ec;
}
.type1, .des_type1{
  width: 8%;
  text-align: center;
  font-size: 14px;
  border-right: 1px solid #dfe6ec;
}
.skuCode, .des_skuCode{
  width: 12.5%;
  text-align: center;
  font-size: 14px;
  border-right: 1px solid #dfe6ec;
}
.price, .des_price{
  width: 12.5%;
  text-align: center;
  font-size: 14px;
  border-right: 1px solid #dfe6ec;
}
.percent, .des_percent{
  width: 12.5%;
  text-align: center;
  font-size: 14px;
  border-right: 1px solid #dfe6ec;
}
.coin, .des_coin{
  width: 12.5%;
  text-align: center;
  font-size: 14px;
  border-right: 1px solid #dfe6ec;
}
.stock, .des_stock{
  width: 12.5%;
  text-align: center;
  font-size: 14px;
  border-right: 1px solid #dfe6ec;
}
.enable, .des_enable{
  width: 12.5%;
  text-align: center;
  font-size: 14px;
}
.activeTable_des {
  width: 100%;
  /*height: 100px;*/
  /*line-height: 100px;*/
  border-bottom: 1px solid #dfe6ec;
}
.detail_box {
  width: 100%;
  height: 100%;
  margin-bottom: 10px;
}
.detail_cargo {
  font-size: 15px;
  display: inline-block;
}
.detail_word {
  font-size: 14px;
  color: #000;
  line-height: 25px;
  display: inline-block;
}
</style>
