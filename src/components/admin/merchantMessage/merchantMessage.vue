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
          <el-form-item label="商品分类：">
            <el-input v-model="cargo.class"></el-input>
          </el-form-item>
          <el-form-item label="品牌名称：">
            <el-input v-model="cargo.brand"></el-input>
          </el-form-item>
          <el-form-item label="乾币抵扣：">
            <el-select v-model="coinValue" placeholder="请选择">
              <el-option v-for="coin in options1" :key="coin.value" :label="coin.label" :value="coin.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品状态：">
            <el-select v-model="stateValue" placeholder="请选择">
              <el-option v-for="state in options2" :key="state.value" :label="state.label" :value="state.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="search()">查询</el-button>
        <el-button type="primary" @click="add()">添加商品</el-button>
      </el-col>
    </el-col>
      <div class="clearfix"></div>
      <el-table :data="tableData" border style="margin-top: 26px;width: 100%">
        <el-table-column label="商品编号" prop="id"></el-table-column>
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="商品分类" prop="class"></el-table-column>
        <el-table-column label="品牌名称" prop="brand"></el-table-column>
        <el-table-column label="支持乾币抵扣">
          <template scope="scope">
            <span v-if="scope.row.coin == 1">是</span>
            <span v-if="scope.row.coin == 0">否</span>
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
              <el-button size="small" @click="detail()">详情</el-button>
              <el-button size="small" @click="soldOut()">下架</el-button>
            </div>
            <div v-else>
              <el-button size="small" @click="detail()">详情</el-button>
              <el-button size="small" @click="edit()">编辑</el-button>
              <el-button size="small" @click="preview()">预览</el-button>
              <el-button size="small" @click="grounding()">上架</el-button>
              <el-button size="small" type="danger" @click="remove()">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
  </el-row>
  <addMerchandise :message="parentMsg" v-on:listenToChildEvent="showMsgFromChild" v-show="addMerchandise"></addMerchandise>
</div>
</template>
<script>
  import util from '../../../common/util'
  import addMerchandise from './addMerchandise'
  export default{
    data () {
      return {
        parentMsg: 'hello',
        cargo: {
          id: '',
          name: '',
          class: '',
          brand: '',
        },
        options1: [{
          label: '全部',
          value: '1'
        },{
          label: '支持',
          value: '2'
        },{
          label: '不支持',
          value: '3'
        }],
        options2: [{
          label: '全部',
          value: '1'
        },{
          label: '已上架',
          value: '2'
        },{
          label: '已下架',
          value: '3'
        }],
        tableData: [{
          id: '1122334455667788',
          name: '朗力 口洁宝抑菌含漱液',
          class: '漱口水',
          brand: '武汉朗力生物',
          coin: 1,
          state: true,
        }, {
          id: '1122334455667788',
          name: '武汉金光 脸颊牵开器-T型 小',
          class: '漱口水',
          brand: '武汉朗力生物',
          coin: 0,
          state: true,
        }, {
          id: '1122334455667788',
          name: '朗力 口洁宝抑菌含漱液',
          class: '漱口水',
          brand: '武汉朗力生物',
          coin: 0,
          state: false,
        }],
        list: true,
        addMerchandise: false,
        coinValue: '',
        stateValue: '',
      }
    },
    components: {
      addMerchandise,
    },
    methods: {
      showMsgFromChild: function(data) {
        var that = this;
        that.list = data;
        that.addMerchandise = false;
        //console.log(data);
      },
      search: function() {
        var that = this;
      },
      //添加商品
      add: function() {
        var that = this;
        that.list = false;
        that.addMerchandise = true;
      },
      //上架
      grounding: function() {
        var that = this;
        that.$confirm('确定上架该商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$message({
            type: 'success',
            message: '上架成功!'
          });
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
      },
      //下架
      soldOut: function() {
        var that = this;
        that.$confirm('确定下架该商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$message({
            type: 'success',
            message: '下架成功!'
          });
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
      },
      //删除
      remove: function() {
        var that = this;
        that.$confirm('确定删除该商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$message({
            type: 'success',
            message: '删除成功!'
          });
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
<style scoped>
</style>
